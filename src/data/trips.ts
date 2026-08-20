import { slugify } from '@/utils/slugify';

export interface ItineraryActivity {
  time: string;
  title: string;
  desc?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  desc: string;
  rhythm?: 'Doux' | 'Modéré' | 'Soutenu';
  images?: string[];
  activities?: ItineraryActivity[];
  locationName?: string;
  coords?: { x: number; y: number };
  lat?: number;
  lng?: number;
}

export interface Trip {
  id: number;
  title: string;
  image: string;
  continent: string;
  country: string;
  type: string;
  transport: string;
  duration: string;
  tag: string;
  price: number;
  description?: string;
  images?: string[];
  itinerary?: ItineraryDay[];
  highlights?: string[];
  included?: string[];
  notIncluded?: string[];
  accommodation?: string;
  idealPeriod?: string;
}

/**
 * Real Slowmundo trips. Additional trips will be added via Sanity CMS.
 * Images are Slowmundo placeholders — replace with the real brochure shots when available.
 */
export const TRIPS: Trip[] = [
  {
    id: 1,
    title: "De Lucerne à Milan via le Gotthard Panorama Express et le Tessin",
    image: "/img/slowmundo/gotthard-tessin/locarno-lac-majeur.webp",
    continent: "Europe",
    country: "Suisse",
    type: "Nature & Panoramique",
    transport: "Train panoramique, bateau & vélo",
    duration: "12 jours",
    price: 2540,
    tag: "Signature",
    description:
      "Oubliez la voiture et laissez-vous porter au rythme des rails jusqu'en Suisse et en Italie. Ce voyage de 12 jours vous emmène à la découverte du Tessin, une région unique où les Alpes rencontrent l'influence méditerranéenne. Après une première immersion à Lucerne et sur les hauteurs du Mont Rigi, vous traversez les Alpes à bord du Gotthard Panorama Express pour rejoindre le Tessin. Autour du Lac de Lugano et du Lac Majeur, l'ambiance devient plus douce et méditerranéenne. Le voyage se poursuit dans la vallée sauvage de la Verzasca, entre eaux cristallines, villages de pierre et paysages préservés, puis à bord du train des Centovalli pour une courte incursion en Italie. Enfin, vous prolongez cette immersion en rejoignant Milan pour une dernière étape plus culturelle.",
    images: [
      "/img/slowmundo/gotthard-tessin/morcote-eglise-santa-maria.webp",
      "/img/slowmundo/gotthard-tessin/intragna-train-centovalli.webp",
      "/img/slowmundo/gotthard-tessin/sonogno-vue-vallee.webp",
    ],
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
    itinerary: [
      {
        day: 1,
        title: "Paris – Lucerne",
        locationName: "Lucerne",
        lat: 47.0502,
        lng: 8.3093,
        rhythm: "Doux",
        images: [
          "/img/slowmundo/gotthard-tessin/lucerne-pont-de-la-chapelle.webp",
          "/img/slowmundo/gotthard-tessin/lucerne-vue-riviere.webp",
        ],
        desc: "Trajet en train Paris → Zurich (4h04) puis Zurich → Lucerne (41 min). Arrivée en milieu d'après-midi. Immersion dans la vieille ville piétonne : Pont de la Chapelle (le plus ancien pont en bois couvert d'Europe), places historiques (Weinmarkt, Hirschenplatz), monument du Lion. Balade au coucher du soleil le long du lac ou sur les terrasses de la Reuss. Transport : train (5h25) et marche.",
      },
      {
        day: 2,
        title: "Balade au Mont Rigi",
        locationName: "Mont Rigi",
        lat: 47.0577,
        lng: 8.4844,
        rhythm: "Modéré",
        images: [
          "/img/slowmundo/gotthard-tessin/mont-rigi-vue-telepherique.webp",
          "/img/slowmundo/gotthard-tessin/mont-rigi-randonnee.webp",
        ],
        desc: "Train jusqu'à Arth-Goldau (27 min) puis train à crémaillère vers le Mont Rigi (1 798 m). Vue dégagée sur 13 lacs et la chaîne des Alpes. Randonnée du sentier panoramique jusqu'à Rigi Kaltbad (1 433 m) avec visite d'une fromagerie d'alpage. Descente en train à crémaillère vers Vitznau puis croisière panoramique jusqu'à Lucerne.",
      },
      {
        day: 3,
        title: "Lucerne – Bellinzona – Lugano",
        locationName: "Lugano",
        lat: 46.0037,
        lng: 8.9511,
        rhythm: "Doux",
        images: [
          "/img/slowmundo/gotthard-tessin/train-lucerne-bellinzona.webp",
          "/img/slowmundo/gotthard-tessin/bellinzona-place-centrale.webp",
        ],
        desc: "Embarquement à bord du Gotthard Panorama Express : bateau à vapeur sur le lac des Quatre-Cantons jusqu'à Flüelen (prairie du Grütli, rocher de Schiller, chapelle de Tell), puis train à voitures panoramiques jusqu'à Bellinzona. Trois angles de vue sur l'église de Wassen pendant l'ascension. Pause à Bellinzona pour ses trois châteaux médiévaux classés UNESCO, puis train pour Lugano.",
      },
      {
        day: 4,
        title: "Le Monte Brè et Gandria",
        locationName: "Gandria",
        lat: 46.0084,
        lng: 9.0068,
        rhythm: "Modéré",
        images: [
          "/img/slowmundo/gotthard-tessin/lugano-monte-bre.webp",
          "/img/slowmundo/gotthard-tessin/lugano-sentiero-dellolivo.webp",
        ],
        desc: "Funiculaire vers le Monte Brè (vue sur le lac de Lugano et le Monte San Salvatore). Descente à pied (1h30–2h) par la forêt et les terrasses jusqu'au village piéton de Gandria. Déjeuner sur place, puis retour à Lugano par le Sentiero dell'Olivo qui longe le lac dans une végétation méditerranéenne. Fin de journée libre : parc Ciani ou Lido.",
      },
      {
        day: 5,
        title: "Monte San Salvatore & Morcote",
        locationName: "Morcote",
        lat: 45.9345,
        lng: 8.9101,
        rhythm: "Modéré",
        images: [
          "/img/slowmundo/gotthard-tessin/morcote-eglise-santa-maria.webp",
          "/img/slowmundo/gotthard-tessin/morcote-escalier.webp",
        ],
        desc: "Funiculaire vers le Monte San Salvatore (913 m), vue panoramique sur le lac de Lugano. Descente à pied (~3h) jusqu'au village de Morcote sur sa péninsule : escalier de 404 marches vers l'église Santa Maria del Sasso, parc Scherrer. Retour à Lugano en bateau, découverte de la côte et des villages depuis l'eau.",
      },
      {
        day: 6,
        title: "Lugano – Locarno – Ascona & îles de Brissago",
        locationName: "Ascona",
        lat: 46.1553,
        lng: 8.771,
        rhythm: "Doux",
        images: [
          "/img/slowmundo/gotthard-tessin/ascona-lac-majeur.webp",
          "/img/slowmundo/gotthard-tessin/ascona-ville.webp",
        ],
        desc: "Train Lugano → Locarno (33 min). Bus vers Ascona (12 min), village de pêcheurs au bord du lac Majeur. Montée au Monte Verità puis déjeuner au bord de l'eau. L'après-midi, bateau vers les îles de Brissago (15 min) : jardin botanique et espèces exotiques favorisées par le microclimat. Retour à Locarno en bateau (40 min).",
      },
      {
        day: 7,
        title: "Madonna del Sasso & Cimetta",
        locationName: "Locarno",
        lat: 46.1712,
        lng: 8.7947,
        rhythm: "Modéré",
        images: [
          "/img/slowmundo/gotthard-tessin/madonna-del-sasso.webp",
          "/img/slowmundo/gotthard-tessin/locarno-lac-majeur.webp",
        ],
        desc: "Funiculaire historique Locarno → Orselina et sanctuaire de Madonna del Sasso (premier panorama sur le lac Majeur). Téléphérique vers Cardada puis télésiège jusqu'à Cimetta (1 670 m) : par temps clair, vue simultanée sur le lac et la Pointe Dufour. Sentiers du plateau puis retour à Locarno pour une baignade dans le lac.",
      },
      {
        day: 8,
        title: "Excursion dans les Centovalli",
        locationName: "Intragna / Domodossola",
        lat: 46.1176,
        lng: 8.2926,
        rhythm: "Doux",
        images: [
          "/img/slowmundo/gotthard-tessin/intragna-train-centovalli.webp",
          "/img/slowmundo/gotthard-tessin/ponte-romano-intragna.webp",
          "/img/slowmundo/gotthard-tessin/intragna-centovalli.webp",
        ],
        desc: "Train panoramique des Centovalli : 52 km reliant la Suisse à l'Italie, 83 ponts et 31 tunnels au-dessus des gorges et forêts sauvages. Escale à Intragna (village au clocher le plus haut du Tessin, viaduc impressionnant) puis Domodossola en Italie pour son centre historique. Retour vers Locarno en fin de journée.",
      },
      {
        day: 9,
        title: "Randonnée dans la vallée de Verzasca",
        locationName: "Brione (Verzasca)",
        lat: 46.2497,
        lng: 8.7929,
        rhythm: "Soutenu",
        images: [
          "/img/slowmundo/gotthard-tessin/sonogno-vue-vallee.webp",
        ],
        desc: "Bus depuis Locarno (1h) vers la vallée de la Verzasca : passage au barrage de 220 m (décor de GoldenEye), installation à Brione. Randonnée à travers les villages traditionnels jusqu'à Lavertezzo et son Ponte dei Salti (pont médiéval à double arche sur les eaux cristallines). Baignade dans les piscines naturelles.",
      },
      {
        day: 10,
        title: "Journée vélo à Sonogno",
        locationName: "Sonogno",
        lat: 46.3492,
        lng: 8.7876,
        rhythm: "Soutenu",
        images: [
          "/img/slowmundo/gotthard-tessin/sonogno-village.webp",
          "/img/slowmundo/gotthard-tessin/sonogno-vue-vallee.webp",
        ],
        desc: "Vélo (électrique) pour remonter la vallée jusqu'à Sonogno, dernier village de la vallée : maisons en pierre, toits en lauze, atmosphère alpine paisible. Marche courte vers la cascade de La Froda. Petit musée du Val Verzasca pour découvrir le mode de vie traditionnel. Baignade et contemplation avant le retour à Brione.",
      },
      {
        day: 11,
        title: "Brione – Milan",
        locationName: "Milan",
        lat: 45.4642,
        lng: 9.19,
        rhythm: "Doux",
        desc: "Bus Brione → Locarno (50 min) puis train pour Milan (1h55). Arrivée en fin de matinée. Après-midi dans le cœur historique : Duomo, Galleria Vittorio Emanuele II, théâtre de la Scala, Quadrilatero della Moda. Fin de journée détente au Parco Sempione.",
      },
      {
        day: 12,
        title: "Départ pour la France",
        locationName: "Paris",
        lat: 48.8566,
        lng: 2.3522,
        rhythm: "Doux",
        desc: "Train Milan → Paris (7h03). Arrivée prévue dans l'après-midi selon l'horaire de départ.",
      },
    ],
  },
];

/** Country slug (first URL segment). */
export function getCountrySlug(trip: Pick<Trip, 'country'>): string {
  return slugify(trip.country);
}

/** Trip slug (second URL segment) — derived from the title. */
export function getTripSlug(trip: Pick<Trip, 'title'>): string {
  return slugify(trip.title);
}

/** Full URL path to a trip's detail page. */
export function getTripUrl(trip: Pick<Trip, 'country' | 'title'>): string {
  return `/voyages/${getCountrySlug(trip)}/${getTripSlug(trip)}`;
}

/** All trips matching a country slug. Empty array if unknown. */
export function getTripsByCountrySlug(
  countrySlug: string,
  trips: Trip[] = TRIPS
): Trip[] {
  const target = countrySlug.toLowerCase();
  return trips.filter((t) => slugify(t.country) === target);
}

/** Exact trip by country + trip slug. Undefined if unknown. */
export function getTripByCountryAndSlug(
  countrySlug: string,
  tripSlug: string,
  trips: Trip[] = TRIPS
): Trip | undefined {
  const country = countrySlug.toLowerCase();
  const slug = tripSlug.toLowerCase();
  return trips.find(
    (t) => slugify(t.country) === country && slugify(t.title) === slug
  );
}

/**
 * Legacy: single-trip-per-country lookup (used before nested routes).
 * Kept to ease incremental migration; new code should use getTripByCountryAndSlug.
 */
export function getTripByCountrySlug(slug: string, trips: Trip[] = TRIPS): Trip | undefined {
  const target = slug.toLowerCase();
  return trips.find((t) => slugify(t.country) === target);
}

export function getStoredTrips(): Trip[] {
  // Guard SSR : localStorage is client-only.
  if (typeof window === 'undefined') return TRIPS;
  try {
    const custom = localStorage.getItem('slowmundo_custom_trips');
    if (custom) {
      const parsed = JSON.parse(custom);
      return [...TRIPS, ...parsed];
    }
  } catch (e) {
    console.error('Error reading custom trips from localStorage', e);
  }
  return TRIPS;
}

export function saveNewTrip(tripData: Omit<Trip, 'id'>): Trip {
  const current = getStoredTrips();
  const nextId = current.length > 0 ? Math.max(...current.map(t => t.id)) + 1 : 1;
  const newTrip: Trip = { ...tripData, id: nextId };

  try {
    const customRaw = localStorage.getItem('slowmundo_custom_trips');
    const customList: Trip[] = customRaw ? JSON.parse(customRaw) : [];
    customList.push(newTrip);
    localStorage.setItem('slowmundo_custom_trips', JSON.stringify(customList));
  } catch (e) {
    console.error('Error saving new trip to localStorage', e);
  }

  return newTrip;
}
