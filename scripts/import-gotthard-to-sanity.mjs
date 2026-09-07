/**
 * One-off import script: pushes the Gotthard/Tessin trip currently held in
 * src/data/trips.ts into the Sanity content lake.
 *
 * Run once with:   npm run sanity:import:gotthard
 *
 * Requires SANITY_API_READ_TOKEN in .env.local to have "Editor" role
 * (Sanity → API → Tokens). A Viewer-only token will fail on the write.
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { config as dotenvConfig } from "dotenv";

// Load .env.local
const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
dotenvConfig({ path: join(projectRoot, ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_READ_TOKEN;

if (!projectId || !dataset || !token) {
  throw new Error(
    "Missing SANITY env vars in .env.local (need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_READ_TOKEN)"
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

const PUBLIC = join(projectRoot, "public");

/** Upload a file from /public/... and return a Sanity image reference block. */
async function uploadImage(publicPath, alt) {
  const abs = join(PUBLIC, publicPath.replace(/^\//, ""));
  const buffer = readFileSync(abs);
  const filename = basename(abs);
  console.log(`  ↑ uploading image ${filename}…`);
  const asset = await client.assets.upload("image", buffer, { filename });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    ...(alt ? { alt } : {}),
  };
}

/** Upload a PDF from /public/... and return a Sanity file reference block. */
async function uploadFile(publicPath) {
  const abs = join(PUBLIC, publicPath.replace(/^\//, ""));
  const buffer = readFileSync(abs);
  const filename = basename(abs);
  console.log(`  ↑ uploading file  ${filename}…`);
  const asset = await client.assets.upload("file", buffer, { filename });
  return {
    _type: "file",
    asset: { _type: "reference", _ref: asset._id },
  };
}

// Random-ish key generator for array items (Sanity requires _key on every array element)
let keyCounter = 0;
const genKey = (prefix) => `${prefix}-${(++keyCounter).toString(36)}`;

async function main() {
  console.log(`\n→ Sanity project: ${projectId} / ${dataset}\n`);

  console.log("Uploading assets…");

  // Cover
  const image = await uploadImage(
    "/img/slowmundo/gotthard-tessin/lucerne-pont-de-la-chapelle.webp",
    "Pont de la Chapelle à Lucerne — départ du voyage bas carbone Slowmundo"
  );

  // Gallery
  const images = await Promise.all([
    uploadImage(
      "/img/slowmundo/gotthard-tessin/morcote-eglise-santa-maria.webp",
      "Église Santa Maria del Sasso à Morcote"
    ),
    uploadImage(
      "/img/slowmundo/gotthard-tessin/intragna-train-centovalli.webp",
      "Train panoramique des Centovalli à Intragna"
    ),
    uploadImage(
      "/img/slowmundo/gotthard-tessin/sonogno-vue-vallee.webp",
      "Vue sur le village et la vallée de Sonogno"
    ),
  ]);

  // Brochure PDF
  const brochure = await uploadFile("/brochures/de-lucerne-a-milan-gotthard-tessin.pdf");

  // Per-day itinerary — matches trip.itinerary in src/data/trips.ts
  const days = [
    {
      day: 1,
      title: "Paris – Lucerne",
      locationName: "Lucerne",
      lat: 47.0502,
      lng: 8.3093,
      rhythm: "Doux",
      desc:
        "Trajet en train Paris → Zurich (4h04) puis Zurich → Lucerne (41 min). Arrivée en milieu d'après-midi. Immersion dans la vieille ville piétonne : Pont de la Chapelle (le plus ancien pont en bois couvert d'Europe), places historiques (Weinmarkt, Hirschenplatz), monument du Lion. Balade au coucher du soleil le long du lac ou sur les terrasses de la Reuss. Transport : train (5h25) et marche.",
      images: [
        "/img/slowmundo/gotthard-tessin/lucerne-pont-de-la-chapelle.webp",
        "/img/slowmundo/gotthard-tessin/lucerne-vue-riviere.webp",
      ],
    },
    {
      day: 2,
      title: "Balade au Mont Rigi",
      locationName: "Mont Rigi",
      lat: 47.0577,
      lng: 8.4844,
      rhythm: "Modéré",
      desc:
        "Train jusqu'à Arth-Goldau (27 min) puis train à crémaillère vers le Mont Rigi (1 798 m). Vue dégagée sur 13 lacs et la chaîne des Alpes. Randonnée du sentier panoramique jusqu'à Rigi Kaltbad (1 433 m) avec visite d'une fromagerie d'alpage. Descente en train à crémaillère vers Vitznau puis croisière panoramique jusqu'à Lucerne.",
      images: [
        "/img/slowmundo/gotthard-tessin/mont-rigi-vue-telepherique.webp",
        "/img/slowmundo/gotthard-tessin/mont-rigi-randonnee.webp",
      ],
    },
    {
      day: 3,
      title: "Lucerne – Bellinzona – Lugano",
      locationName: "Lugano",
      lat: 46.0037,
      lng: 8.9511,
      rhythm: "Doux",
      desc:
        "Embarquement à bord du Gotthard Panorama Express : bateau à vapeur sur le lac des Quatre-Cantons jusqu'à Flüelen (prairie du Grütli, rocher de Schiller, chapelle de Tell), puis train à voitures panoramiques jusqu'à Bellinzona. Trois angles de vue sur l'église de Wassen pendant l'ascension. Pause à Bellinzona pour ses trois châteaux médiévaux classés UNESCO, puis train pour Lugano.",
      images: [
        "/img/slowmundo/gotthard-tessin/train-lucerne-bellinzona.webp",
        "/img/slowmundo/gotthard-tessin/bellinzona-place-centrale.webp",
      ],
    },
    {
      day: 4,
      title: "Le Monte Brè et Gandria",
      locationName: "Gandria",
      lat: 46.0084,
      lng: 9.0068,
      rhythm: "Modéré",
      desc:
        "Funiculaire vers le Monte Brè (vue sur le lac de Lugano et le Monte San Salvatore). Descente à pied (1h30–2h) par la forêt et les terrasses jusqu'au village piéton de Gandria. Déjeuner sur place, puis retour à Lugano par le Sentiero dell'Olivo qui longe le lac dans une végétation méditerranéenne. Fin de journée libre : parc Ciani ou Lido.",
      images: [
        "/img/slowmundo/gotthard-tessin/lugano-monte-bre.webp",
        "/img/slowmundo/gotthard-tessin/lugano-sentiero-dellolivo.webp",
      ],
    },
    {
      day: 5,
      title: "Monte San Salvatore & Morcote",
      locationName: "Morcote",
      lat: 45.9345,
      lng: 8.9101,
      rhythm: "Modéré",
      desc:
        "Funiculaire vers le Monte San Salvatore (913 m), vue panoramique sur le lac de Lugano. Descente à pied (~3h) jusqu'au village de Morcote sur sa péninsule : escalier de 404 marches vers l'église Santa Maria del Sasso, parc Scherrer. Retour à Lugano en bateau, découverte de la côte et des villages depuis l'eau.",
      images: [
        "/img/slowmundo/gotthard-tessin/morcote-eglise-santa-maria.webp",
        "/img/slowmundo/gotthard-tessin/morcote-escalier.webp",
      ],
    },
    {
      day: 6,
      title: "Lugano – Locarno – Ascona & îles de Brissago",
      locationName: "Ascona",
      lat: 46.1553,
      lng: 8.771,
      rhythm: "Doux",
      desc:
        "Train Lugano → Locarno (33 min). Bus vers Ascona (12 min), village de pêcheurs au bord du lac Majeur. Montée au Monte Verità puis déjeuner au bord de l'eau. L'après-midi, bateau vers les îles de Brissago (15 min) : jardin botanique et espèces exotiques favorisées par le microclimat. Retour à Locarno en bateau (40 min).",
      images: [
        "/img/slowmundo/gotthard-tessin/ascona-lac-majeur.webp",
        "/img/slowmundo/gotthard-tessin/ascona-ville.webp",
      ],
    },
    {
      day: 7,
      title: "Madonna del Sasso & Cimetta",
      locationName: "Locarno",
      lat: 46.1712,
      lng: 8.7947,
      rhythm: "Modéré",
      desc:
        "Funiculaire historique Locarno → Orselina et sanctuaire de Madonna del Sasso (premier panorama sur le lac Majeur). Téléphérique vers Cardada puis télésiège jusqu'à Cimetta (1 670 m) : par temps clair, vue simultanée sur le lac et la Pointe Dufour. Sentiers du plateau puis retour à Locarno pour une baignade dans le lac.",
      images: [
        "/img/slowmundo/gotthard-tessin/madonna-del-sasso.webp",
        "/img/slowmundo/gotthard-tessin/locarno-lac-majeur.webp",
      ],
    },
    {
      day: 8,
      title: "Excursion dans les Centovalli",
      locationName: "Intragna / Domodossola",
      lat: 46.1176,
      lng: 8.2926,
      rhythm: "Doux",
      desc:
        "Train panoramique des Centovalli : 52 km reliant la Suisse à l'Italie, 83 ponts et 31 tunnels au-dessus des gorges et forêts sauvages. Escale à Intragna (village au clocher le plus haut du Tessin, viaduc impressionnant) puis Domodossola en Italie pour son centre historique. Retour vers Locarno en fin de journée.",
      images: [
        "/img/slowmundo/gotthard-tessin/intragna-train-centovalli.webp",
        "/img/slowmundo/gotthard-tessin/ponte-romano-intragna.webp",
        "/img/slowmundo/gotthard-tessin/intragna-centovalli.webp",
      ],
    },
    {
      day: 9,
      title: "Randonnée dans la vallée de Verzasca",
      locationName: "Brione (Verzasca)",
      lat: 46.2497,
      lng: 8.7929,
      rhythm: "Soutenu",
      desc:
        "Bus depuis Locarno (1h) vers la vallée de la Verzasca : passage au barrage de 220 m (décor de GoldenEye), installation à Brione. Randonnée à travers les villages traditionnels jusqu'à Lavertezzo et son Ponte dei Salti (pont médiéval à double arche sur les eaux cristallines). Baignade dans les piscines naturelles.",
      images: ["/img/slowmundo/gotthard-tessin/sonogno-vue-vallee.webp"],
    },
    {
      day: 10,
      title: "Journée vélo à Sonogno",
      locationName: "Sonogno",
      lat: 46.3492,
      lng: 8.7876,
      rhythm: "Soutenu",
      desc:
        "Vélo (électrique) pour remonter la vallée jusqu'à Sonogno, dernier village de la vallée : maisons en pierre, toits en lauze, atmosphère alpine paisible. Marche courte vers la cascade de La Froda. Petit musée du Val Verzasca pour découvrir le mode de vie traditionnel. Baignade et contemplation avant le retour à Brione.",
      images: [
        "/img/slowmundo/gotthard-tessin/sonogno-village.webp",
        "/img/slowmundo/gotthard-tessin/sonogno-vue-vallee.webp",
      ],
    },
    {
      day: 11,
      title: "Brione – Milan",
      locationName: "Milan",
      lat: 45.4642,
      lng: 9.19,
      rhythm: "Doux",
      desc:
        "Bus Brione → Locarno (50 min) puis train pour Milan (1h55). Arrivée en fin de matinée. Après-midi dans le cœur historique : Duomo, Galleria Vittorio Emanuele II, théâtre de la Scala, Quadrilatero della Moda. Fin de journée détente au Parco Sempione.",
      images: [],
    },
    {
      day: 12,
      title: "Départ pour la France",
      locationName: "Paris",
      lat: 48.8566,
      lng: 2.3522,
      rhythm: "Doux",
      desc: "Train Milan → Paris (7h03). Arrivée prévue dans l'après-midi selon l'horaire de départ.",
      images: [],
    },
  ];

  // Upload every unique per-day image once, keep a cache to avoid re-uploading
  const uploadedCache = new Map();
  async function cachedUpload(path, alt) {
    if (uploadedCache.has(path)) return uploadedCache.get(path);
    const ref = await uploadImage(path, alt);
    uploadedCache.set(path, ref);
    return ref;
  }

  console.log("\nUploading per-day images (dedup)…");
  const itinerary = [];
  for (const d of days) {
    const dayImages = [];
    for (const p of d.images) {
      const ref = await cachedUpload(p, d.title);
      // Array items in Sanity need a unique _key
      dayImages.push({ ...ref, _key: genKey("img") });
    }
    itinerary.push({
      _type: "itineraryDay",
      _key: genKey("day"),
      day: d.day,
      title: d.title,
      locationName: d.locationName,
      lat: d.lat,
      lng: d.lng,
      rhythm: d.rhythm,
      desc: d.desc,
      images: dayImages,
    });
  }

  // Attach _key to top-level gallery too
  const galleryWithKeys = images.map((img) => ({ ...img, _key: genKey("gallery") }));

  const doc = {
    _type: "trip",
    // Deterministic ID so re-running the script updates instead of duplicating
    _id: "trip-gotthard-tessin",
    title: "De Lucerne à Milan via le Gotthard Panorama Express et le Tessin",
    slug: {
      _type: "slug",
      current: "de-lucerne-a-milan-via-le-gotthard-panorama-express-et-le-tessin",
    },
    country: "Suisse",
    continent: "Europe",
    type: "Nature & Aventure",
    transport: "Train panoramique, bateau & vélo",
    duration: "12 jours",
    price: 2540,
    tag: "Signature",
    description:
      "Voyage organisé en train en Suisse et en Italie, bas carbone et en slow tourisme. Oubliez la voiture et laissez-vous porter au rythme des rails de Lucerne au Tessin, une région unique où les Alpes rencontrent l'influence méditerranéenne. Après une immersion à Lucerne et sur les hauteurs du Mont Rigi, vous traversez les Alpes à bord du Gotthard Panorama Express. Autour du Lac de Lugano et du Lac Majeur, l'ambiance devient douce et méditerranéenne. Le voyage se poursuit dans la vallée sauvage de la Verzasca — eaux cristallines, villages de pierre, paysages préservés — puis à bord du train panoramique des Centovalli pour une courte incursion en Italie. Enfin, vous prolongez cette immersion éco responsable en rejoignant Milan pour une dernière étape culturelle.",
    accommodation: "Hôtels 3★",
    idealPeriod: "De mai à mi-octobre",
    highlights: [
      "Plusieurs liaisons panoramiques emblématiques (Gotthard Panorama Express, Centovalli)",
      "La nature sauvage du Val Verzasca et des Centovalli",
      "Des lacs et villages d'exception (Lugano, Lac Majeur, Morcote, Ascona)",
      "Des panoramas à 360° depuis le Mont Rigi, le Monte Brè et Cimetta",
    ],
    included: [
      "L'hébergement en hôtel 3★ avec petit-déjeuner",
      "L'acheminement Paris ⇄ Zurich / Milan ⇄ Paris en train 2ème classe",
      "Le Swiss Travel Pass 8 jours (2ème classe) — accès illimité aux réseaux ferroviaire, routier et de navigation en Suisse (J1 à J8)",
      "Le Gothard Panorama Express (Lucerne – Lugano) avec le tronçon en bateau à vapeur en 1ère classe",
      "Le train des Centovalli aller-retour (avec deux arrêts)",
      "Le train du Rigi, funiculaire du Monte Brè, funiculaire du Monte San Salvatore",
      "Le trajet en bus + train Brione – Locarno – Milan (J11)",
      "L'entrée à l'île de Brissago (J6)",
      "La location d'un vélo électrique à Brione (J10)",
      "L'assistance francophone Slow Mundo pendant toute la durée du séjour",
      "Un carnet de voyage détaillé en version numérique",
    ],
    notIncluded: [
      "Les assurances voyage",
      "La taxe de séjour à régler sur place dans les hôtels",
      "Les repas et boissons non mentionnés",
      "Les dépenses personnelles",
      "Les activités optionnelles",
      "Les transports publics à Milan",
      "Le funiculaire à Locarno et le téléphérique Orselina – Cimetta (J7)",
    ],
    image,
    images: galleryWithKeys,
    brochure,
    itinerary,
  };

  console.log("\nCreating/updating document trip-gotthard-tessin…");
  const created = await client.createOrReplace(doc);

  console.log(`\n✓ Done. Document _id = ${created._id}`);
  console.log(`  Sanity Studio: http://localhost:5173/studio/desk/trip;${created._id}`);
}

main().catch((e) => {
  console.error("\n✗ Import failed:");
  console.error(e?.message || e);
  process.exit(1);
});
