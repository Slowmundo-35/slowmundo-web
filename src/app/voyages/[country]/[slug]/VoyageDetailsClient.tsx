"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Train, Check, X, Star, Home, Calendar, ChevronDown, ChevronUp, Download, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { TRIPS, Trip, ItineraryDay, getStoredTrips, getTripByCountryAndSlug } from '@/data/trips';
import { TripContactForm } from '@/components/TripContactForm';
import type { MapWaypoint } from '@/components/InteractiveItineraryMap';

// Leaflet touches window at module load → skip SSR
const InteractiveItineraryMap = dynamic(
  () => import('@/components/InteractiveItineraryMap').then((m) => m.InteractiveItineraryMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] rounded-2xl bg-gray-100 animate-pulse" />
    ),
  }
);

// Day Image Carousel Component (3 auto-sliding images per day)
const DayImageCarousel = ({ images, title }: { images: string[]; title: string }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images]);

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-md group bg-gray-100">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIdx}
          src={images[currentIdx] || images[0]}
          alt={`${title} - image ${currentIdx + 1}`}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Manual arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Indicator dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIdx(i);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentIdx ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Function to parse the exact number of days from duration string
function getDaysFromDuration(durationStr: string): number {
  if (!durationStr) return 7;
  const match = durationStr.match(/(\d+)\s*jour/i);
  if (match) return parseInt(match[1], 10);
  return 7;
}

function getTripIdealPeriod(trip: Trip): string {
  if (trip.idealPeriod) return trip.idealPeriod;
  const country = trip.country?.toLowerCase() || '';

  if (country.includes('grèce')) {
    return "D'avril à juin et de septembre à novembre : des températures douces et ensoleillées, idéales pour explorer les sites antiques et les villages sans l'affluence estivale.";
  }
  if (country.includes('islande')) {
    return "De juin à août pour de longues journées lumineuses et les randonnées, ou d'octobre à mars pour observer la magie des aurores boréales et les paysages enneigés.";
  }
  if (country.includes('suisse')) {
    return "De mai à octobre pour les randonnées alpines et les lacs étincelants, ou de décembre à avril pour les panoramas enneigés à bord des trains panoramiques.";
  }
  if (country.includes('japon')) {
    return "De mars à mai pour la floraison printanière des cerisiers (Sakura), ou d'octobre à novembre pour les spectaculaires couleurs de l'automne (Koyo).";
  }
  if (country.includes('espagne')) {
    return "De mars à juin et de septembre à novembre : un climat printanier ou automnal doux et lumineux, parfait pour arpenter l'Andalousie et ses cités historiques.";
  }
  if (country.includes('angleterre') || country.includes('royaume-uni')) {
    return "De mai à septembre : les plus longues journées de l'année, un climat tempéré et des paysages de campagne particulièrement verdoyants.";
  }
  if (country.includes('vietnam')) {
    return "De novembre à avril : saison sèche et températures clémentes, idéales pour traverser le pays du Nord au Sud le long de la ligne ferroviaire historique.";
  }
  if (country.includes('autriche')) {
    return "De mai à octobre pour les randonnées et l'exploration des cités impériales, ou en hiver pour l'ambiance féerique des marchés de Noël et des Alpes.";
  }
  if (country.includes('portugal')) {
    return "D'avril à octobre : un ensoleillement remarquable, la brise rafraîchissante de l'océan Atlantique et une lumière dorée propice aux balades côtières.";
  }
  if (country.includes('malaisie')) {
    return "De mars à octobre pour profiter au mieux des îles et parcs naturels, avec une température tropicale agréable tout au long de l'année.";
  }
  if (country.includes('belgique')) {
    return "D'avril à octobre : la belle saison pour flâner à pied ou à vélo le long des canaux historiques et savourer les terrasses animées.";
  }
  if (country.includes('pays-bas')) {
    return "D'avril à septembre : mention spéciale pour les mois d'avril et mai lors de la floraison spectaculaire des champs de tulipes et de jacinthes.";
  }
  if (country.includes('allemagne')) {
    return "De mai à octobre pour profiter des parcs naturels et châteaux bavarois, ou en hiver pour l'ambiance féerique des traditions de fin d'année.";
  }
  if (country.includes('liechtenstein')) {
    return "De juin à octobre : la période optimale pour accéder à l'ensemble des sentiers alpins et profiter de panoramas dégagés sur la vallée du Rhin.";
  }
  if (country.includes('slovénie')) {
    return "De mai à octobre : des températures très douces, idéales pour la baignade dans les lacs émeraude et les activités en pleine nature.";
  }
  if (country.includes('slovaquie')) {
    return "De juin à septembre pour la haute montagne dans les Tatras et l'exploration confortable des châteaux médiévaux.";
  }
  if (country.includes('pologne')) {
    return "De mai à septembre : un climat tempéré et agréable, parfait pour découvrir à son rythme le riche patrimoine historique de ses grandes villes.";
  }
  if (country.includes('tchéquie')) {
    return "D'avril à octobre pour découvrir Prague et la Bohême sous une météo clémente, ou en décembre pour son atmosphère romantique hivernale.";
  }
  if (country.includes('albanie')) {
    return "De mai à octobre : un climat méditerranéen généreux, parfait pour concilier découvertes culturelles et haltes le long de la mer Ionienne.";
  }
  if (country.includes('irlande')) {
    return "De mai à septembre : les mois les plus lumineux et doux de l'année pour contempler la beauté sauvage des landes et des falaises atlantiques.";
  }
  if (country.includes('inde')) {
    return "D'octobre à mars : saison sèche et températures très agréables pour explorer les palais du Rajasthan et les trésors de l'Inde du Nord.";
  }
  if (country.includes('france')) {
    return "D'avril à octobre : des journées ensoleillées et des températures idéales pour découvrir les régions à vélo, à pied ou en train régional.";
  }
  if (country.includes('italie')) {
    return "D'avril à juin et de septembre à octobre : une météo douce et lumineuse pour savourer la dolce vita loin des grosses chaleurs d'été.";
  }
  if (country.includes('macédoine')) {
    return "De mai à octobre : climat agréable et ensoleillé pour explorer le lac d'Ohrid et les massifs montagneux des Balkans.";
  }

  return "D'avril à octobre : les mois offrant les conditions climatiques les plus douces et propices aux mobilités douces et aux visites immersives.";
}

interface CountryMapConfig {
  lat: number;
  lng: number;
  zoom: number;
  waypoints: { city: string; title: string; desc: string; x: number; y: number }[];
}

const COUNTRY_MAP_CONFIG: Record<string, CountryMapConfig> = {
  Grèce: {
    lat: 38.8,
    lng: 22.5,
    zoom: 7,
    waypoints: [
      { city: 'Athènes', title: 'Athènes Antique & Quartier de Plaka', desc: 'Arrivée à Athènes, visite guidée de l\'Acropole et déambulation dans Plaka.', x: 64, y: 66 },
      { city: 'Delphes', title: 'Sanctuaire de Delphes', desc: 'Trajet vers le mont Parnasse et découverte du site antique de Delphes.', x: 48, y: 50 },
      { city: 'Kalambaka', title: 'Monastères des Météores', desc: 'Exploration des monastères suspendus au sommet des pitons rocheux.', x: 42, y: 28 },
      { city: 'Nauplie', title: 'Nauplie & Péloponnèse', desc: 'Flânerie dans la cité côtière et visite du théâtre antique d\'Épidaure.', x: 52, y: 76 },
      { city: 'Olympie', title: 'Site d\'Olympie', desc: 'Découverte du berceau des Jeux Olympiques antiques.', x: 38, y: 72 },
      { city: 'Thessalonique', title: 'Thessalonique Cité Byzantine', desc: 'Visite de la capitale culturelle du nord et dégustations locales.', x: 55, y: 18 },
      { city: 'Santorin', title: 'Escale Cyclades & Oia', desc: 'Traversée maritime et découverte des célèbres villages blancs et bleus.', x: 78, y: 84 },
    ],
  },
  Islande: {
    lat: 64.8,
    lng: -18.5,
    zoom: 6,
    waypoints: [
      { city: 'Reykjavik', title: 'Reykjavik Éco-Capitale', desc: 'Découverte du vieux port, de l\'architecture nordique et des cafés.', x: 24, y: 62 },
      { city: 'Thingvellir', title: 'Cercle d\'Or & Geysers', desc: 'Failles tectoniques, geysers jaillissants et cascades de Gullfoss.', x: 35, y: 58 },
      { city: 'Vík í Mýrdal', title: 'Plages de sable noir de Vík', desc: 'Colonnes de basalte, falaises escarpées et faune marine.', x: 48, y: 74 },
      { city: 'Jökulsárlón', title: 'Lagon Glaciaire & Icebergs', desc: 'Contemplation des blocs de glace dérivant vers l\'océan.', x: 68, y: 65 },
      { city: 'Akureyri', title: 'Fjords du Nord', desc: 'Escale dans la capitale du nord et relaxation aux bains thermaux.', x: 56, y: 26 },
      { city: 'Snæfellsnes', title: 'Péninsule de Snæfellsnes', desc: 'Volcans mystiques, fjords et petits villages de pêcheurs.', x: 20, y: 44 },
    ],
  },
  Suisse: {
    lat: 46.8,
    lng: 8.2,
    zoom: 8,
    waypoints: [
      { city: 'Genève', title: 'Lac Léman & Genève', desc: 'Arrivée au bord du lac, jet d\'eau et vieille ville historique.', x: 20, y: 72 },
      { city: 'Interlaken', title: 'Oberland Bernois', desc: 'Train panoramique face aux sommets mythiques de l\'Eiger et du Jungfrau.', x: 48, y: 52 },
      { city: 'Zermatt', title: 'Village alpin au pied du Cervin', desc: 'Station piétonne éco-responsable et train à crémaillère.', x: 40, y: 78 },
      { city: 'Lucerne', title: 'Lucerne & Lac des Quatre-Cantons', desc: 'Traversée du lac en bateau à vapeur et pont de bois historique.', x: 56, y: 38 },
      { city: 'Chur', title: 'Bernina Express', desc: 'Embarquement à bord du train panoramique classé à l\'UNESCO.', x: 76, y: 48 },
      { city: 'Zurich', title: 'Zurich & les rives du lac', desc: 'Dernière escale entre culture contemporaine et sérénité alpage.', x: 62, y: 28 },
    ],
  },
  Japon: {
    lat: 36.2,
    lng: 138.2,
    zoom: 6,
    waypoints: [
      { city: 'Tokyo', title: 'Tokyo entre Tradition et Modernité', desc: 'Arrivée à Tokyo, quartier d\'Asakusa et jardins impériaux.', x: 68, y: 46 },
      { city: 'Hakone', title: 'Hakone, Mont Fuji & Onsen', desc: 'Sources chaudes naturelles et panoramas sur le Mont Fuji.', x: 62, y: 54 },
      { city: 'Takayama', title: 'Alpes Japonaises & Vieux Takayama', desc: 'Maisons de bois séculaires et marchés d\'artisans.', x: 52, y: 42 },
      { city: 'Kyoto', title: 'Kyoto Cité des Sanctuaires', desc: 'Pavillon d\'or, forêt de bambous d\'Arashiyama et geishas à Gion.', x: 40, y: 58 },
      { city: 'Nara', title: 'Nara & Parc des Cerfs', desc: 'Grand Bouddha de Todai-ji et cerfs en liberté.', x: 42, y: 64 },
      { city: 'Osaka', title: 'Osaka Cité Gastronomique', desc: 'Marchés animés de Dotonbori et street-food japonaise.', x: 36, y: 62 },
      { city: 'Hiroshima', title: 'Hiroshima & Île de Miyajima', desc: 'Mémorial de la Paix et grand Torii flottant sur l\'océan.', x: 22, y: 68 },
    ],
  },
  Espagne: {
    lat: 37.2,
    lng: -4.5,
    zoom: 7,
    waypoints: [
      { city: 'Séville', title: 'Séville & l\'Alcazar', desc: 'Arrivée dans la capitale andalouse, visite de l\'Alcazar et des patios.', x: 32, y: 50 },
      { city: 'Cordoue', title: 'Cordoue & la Mosquée-Cathédrale', desc: 'Trajet en train et balade dans les ruelles fleuries du centre.', x: 48, y: 36 },
      { city: 'Grenade', title: 'Grenade & Palais de l\'Alhambra', desc: 'Découverte du chef-d\'œuvre de l\'architecture mauresque.', x: 68, y: 54 },
      { city: 'Ronda', title: 'Ronda & les Villages Blancs', desc: 'Sentiers en balcon au-dessus du spectaculaire canyon du Tajo.', x: 42, y: 68 },
      { city: 'Malaga', title: 'Malaga & Côte Méditerranéenne', desc: 'Escale culturelle et détente au bord de l\'eau.', x: 54, y: 74 },
      { city: 'Cadix', title: 'Cadix l\'Océanique', desc: 'Flânerie dans la plus ancienne cité d\'Europe occidentale.', x: 24, y: 72 },
    ],
  },
  Angleterre: {
    lat: 53.0,
    lng: -1.8,
    zoom: 6,
    waypoints: [
      { city: 'Londres', title: 'Londres Verte & Musées', desc: 'Arrivée en Eurostar, grands parcs royaux et musées.', x: 68, y: 72 },
      { city: 'Oxford', title: 'Oxford Cité Universitaire', desc: 'Collèges gothiques historiques et promenades au bord de la rivière.', x: 54, y: 64 },
      { city: 'Cotswolds', title: 'Cottages des Cotswolds', desc: 'Randonnée douce à travers les villages en pierre dorée.', x: 46, y: 60 },
      { city: 'York', title: 'York & Ruelles Médiévales', desc: 'Cathédrale York Minster et quartier historique des Shambles.', x: 58, y: 34 },
      { city: 'Bath', title: 'Bath & Thermes Romains', desc: 'Architecture géorgienne remarquable et bains thermaux.', x: 42, y: 70 },
      { city: 'Lake District', title: 'Parc National du Lake District', desc: 'Randonnées sauvages au bord des grands lacs.', x: 38, y: 22 },
    ],
  },
  Vietnam: {
    lat: 16.0,
    lng: 106.0,
    zoom: 6,
    waypoints: [
      { city: 'Hanoï', title: 'Hanoï Vieux Quartier', desc: 'Promenade autour du lac Hoan Kiem et dégustation du café filtre.', x: 35, y: 20 },
      { city: 'Baie d\'Halong', title: 'Croisière dans la Baie de Lan Ha', desc: 'Navigation écologique au milieu des rochers karstiques.', x: 55, y: 24 },
      { city: 'Ninh Binh', title: 'Ninh Binh Baie d\'Halong Terrestre', desc: 'Balade en barque à rames sur la rivière entre les rizières.', x: 38, y: 30 },
      { city: 'Hue', title: 'Hue Cité Impériale', desc: 'Trajet en train de nuit et exploration de la citadelle.', x: 62, y: 52 },
      { city: 'Hoi An', title: 'Hoi An Cité des Lanternes', desc: 'Centre historique piéton illuminé aux lanternes en soie.', x: 68, y: 58 },
      { city: 'Ho Chi Minh', title: 'Saïgon & Mékong', desc: 'Découverte de l\'agitation du sud et des canaux du Mékong.', x: 48, y: 82 },
    ],
  },
  Autriche: {
    lat: 47.5,
    lng: 14.5,
    zoom: 7,
    waypoints: [
      { city: 'Vienne', title: 'Vienne l\'Impériale', desc: 'Palais de Schönbrunn, opéras et grands cafés viennois.', x: 78, y: 35 },
      { city: 'Salzbourg', title: 'Salzbourg Cité de Mozart', desc: 'Train vers Salzbourg et ruelles de la vieille ville.', x: 42, y: 48 },
      { city: 'Hallstatt', title: 'Hallstatt & Région des Lacs', desc: 'Village alpin pittoresque enchâssé au bord du lac.', x: 45, y: 56 },
      { city: 'Innsbruck', title: 'Innsbruck au Cœur du Tyrol', desc: 'Ascension en funiculaire vers les sommets tyroliens.', x: 22, y: 62 },
      { city: 'Graz', title: 'Graz Design & Gastronomie', desc: 'Capitale culinaire de l\'Autriche et architecture audacieuse.', x: 72, y: 68 },
      { city: 'Wachau', title: 'Vallée du Danube & Wachau', desc: 'Balade à vélo au milieu des vignobles bordant le fleuve.', x: 68, y: 32 },
    ],
  },
  Portugal: {
    lat: 39.5,
    lng: -8.0,
    zoom: 7,
    waypoints: [
      { city: 'Porto', title: 'Porto & Vallée du Douro', desc: 'Vieux centre classé UNESCO et croisière sur le Douro.', x: 48, y: 24 },
      { city: 'Aveiro', title: 'Aveiro la Venise Portugaise', desc: 'Promenade en bateau moliceiro le long des canaux.', x: 45, y: 36 },
      { city: 'Coimbra', title: 'Coimbra & sa Grande Université', desc: 'Visite de la bibliothèque baroque et ruelles médiévales.', x: 48, y: 46 },
      { city: 'Lisbonne', title: 'Lisbonne Cité des 7 Collines', desc: 'Tramway 28, quartier de l\'Alfama et Belém.', x: 40, y: 68 },
      { city: 'Sintra', title: 'Sintra & Palais de Pena', desc: 'Collines verdoyantes et châteaux romantiques.', x: 32, y: 66 },
      { city: 'Faro', title: 'Faro & Ria Formosa', desc: 'Lagunes sauvages et plages préservées de l\'Algarve.', x: 55, y: 88 },
    ],
  },
  Malaisie: {
    lat: 4.2,
    lng: 102.0,
    zoom: 6,
    waypoints: [
      { city: 'Kuala Lumpur', title: 'Kuala Lumpur & Tours Petronas', desc: 'Découverte des contrastes entre gratte-ciels et sanctuaires.', x: 38, y: 65 },
      { city: 'Cameron Highlands', title: 'Plantations de Thé de Cameron', desc: 'Randonnée rafraîchissante dans les collines de thé.', x: 42, y: 48 },
      { city: 'Penang', title: 'Penang & George Town', desc: 'Street art, patrimoine mondial UNESCO et saveurs d\'Asie.', x: 28, y: 32 },
      { city: 'Ipoh', title: 'Ipoh & Temples dans les Grottes', desc: 'Grottes calcaires sacrées et architecture coloniale.', x: 35, y: 42 },
      { city: 'Langkawi', title: 'Langkawi & Géoparc UNESCO', desc: 'Mangroves préservées et plages de sable blanc.', x: 22, y: 22 },
      { city: 'Taman Negara', title: 'Forêt Tropicale de Taman Negara', desc: 'Immersion au cœur d\'une forêt primaire millénaire.', x: 55, y: 50 },
    ],
  },
  Norvège: {
    lat: 61.0,
    lng: 8.5,
    zoom: 6,
    waypoints: [
      { city: 'Oslo', title: 'Oslo Cité Verte & Fjords', desc: 'Musée Munch, architecture contemporaine et fjord d\'Oslo.', x: 62, y: 72 },
      { city: 'Flåm', title: 'Train de Flåm & Nærøyfjord', desc: 'Ligne ferroviaire panoramique entre montagnes et cascades.', x: 38, y: 58 },
      { city: 'Bergen', title: 'Bergen Cité des Hanséatiques', desc: 'Quartier historique de Bryggen et marché aux poissons.', x: 26, y: 62 },
      { city: 'Geiranger', title: 'Geirangerfjord & Cascades', desc: 'Navigation au pied des falaises des Sept Sœurs.', x: 42, y: 44 },
      { city: 'Trondheim', title: 'Trondheim Cité Royale', desc: 'Cathédrale de Nidaros et maisons sur pilotis.', x: 52, y: 32 },
      { city: 'Lofoten', title: 'Îles Lofoten & Cabanes Rorbuer', desc: 'Montagnes surgissant de la mer et aurores boréales.', x: 68, y: 18 },
    ],
  },
  'Pays-Bas': {
    lat: 52.1, lng: 5.2, zoom: 7,
    waypoints: [
      { city: 'Amsterdam', title: 'Canaux d\'Amsterdam', desc: 'Promenade le long des canaux historiques.', x: 50, y: 30 },
      { city: 'Rotterdam', title: 'Architecture de Rotterdam', desc: 'Découverte du port et des maisons cubiques.', x: 40, y: 60 },
      { city: 'Utrecht', title: 'Charme d\'Utrecht', desc: 'Ruelles médiévales et ambiance étudiante.', x: 50, y: 50 },
      { city: 'La Haye', title: 'La Haye & Plages', desc: 'Musées royaux et front de mer.', x: 30, y: 50 },
      { city: 'Haarlem', title: 'Trésors de Haarlem', desc: 'Moulins à vent et champs de fleurs.', x: 40, y: 30 },
      { city: 'Maastricht', title: 'Maastricht', desc: 'Cité chaleureuse au sud du pays.', x: 70, y: 90 },
    ],
  },
  'Allemagne': {
    lat: 51.1, lng: 10.4, zoom: 6,
    waypoints: [
      { city: 'Munich', title: 'Traditions Bavaroises', desc: 'Marienplatz et parcs verdoyants.', x: 50, y: 80 },
      { city: 'Berlin', title: 'Berlin Historique', desc: 'Porte de Brandebourg et mur de Berlin.', x: 70, y: 30 },
      { city: 'Francfort', title: 'Francfort sur le Main', desc: 'Skyline impressionnante et vieille ville.', x: 30, y: 60 },
      { city: 'Nuremberg', title: 'Nuremberg Médiévale', desc: 'Château impérial et ruelles pavées.', x: 50, y: 70 },
      { city: 'Stuttgart', title: 'Musées & Automobiles', desc: 'Culture, industrie et vignobles.', x: 30, y: 75 },
      { city: 'Fribourg', title: 'Forêt-Noire', desc: 'Porte d\'entrée de la Forêt-Noire.', x: 20, y: 85 },
    ],
  },
  'Liechtenstein': {
    lat: 47.14, lng: 9.52, zoom: 10,
    waypoints: [
      { city: 'Vaduz', title: 'Vaduz & son Château', desc: 'Capitale alpine et résidence princière.', x: 50, y: 50 },
      { city: 'Malbun', title: 'Montagnes de Malbun', desc: 'Randonnées et vues panoramiques.', x: 70, y: 70 },
      { city: 'Schaan', title: 'Village de Schaan', desc: 'Découverte de l\'artisanat local.', x: 50, y: 30 },
      { city: 'Triesenberg', title: 'Triesenberg', desc: 'Héritage Walser et panoramas.', x: 60, y: 60 },
      { city: 'Balzers', title: 'Balzers', desc: 'Château de Gutenberg.', x: 40, y: 80 },
      { city: 'Steg', title: 'Vallée de Steg', desc: 'Nature préservée et lacs.', x: 80, y: 60 },
    ],
  },
  'Belgique': {
    lat: 50.8, lng: 4.3, zoom: 7,
    waypoints: [
      { city: 'Bruxelles', title: 'Bruxelles', desc: 'Grand-Place et institutions.', x: 50, y: 50 },
      { city: 'Bruges', title: 'Bruges', desc: 'La Venise du Nord.', x: 30, y: 30 },
      { city: 'Gand', title: 'Gand', desc: 'Cité médiévale et canaux.', x: 40, y: 40 },
      { city: 'Anvers', title: 'Anvers', desc: 'Diamants et port.', x: 50, y: 20 },
      { city: 'Liège', title: 'Liège', desc: 'Cité ardente.', x: 70, y: 60 },
      { city: 'Namur', title: 'Namur', desc: 'Citadelle de Namur.', x: 50, y: 70 },
    ],
  },
  'Albanie': {
    lat: 41.15, lng: 20.16, zoom: 7,
    waypoints: [
      { city: 'Tirana', title: 'Tirana', desc: 'Capitale animée et colorée.', x: 50, y: 50 },
      { city: 'Berat', title: 'Berat', desc: 'La ville aux mille fenêtres.', x: 50, y: 65 },
      { city: 'Gjirokastër', title: 'Gjirokastër', desc: 'Ville de pierre UNESCO.', x: 60, y: 80 },
      { city: 'Shkodër', title: 'Shkodër', desc: 'Porte des Alpes albanaises.', x: 40, y: 30 },
      { city: 'Saranda', title: 'Saranda', desc: 'Riviera albanaise.', x: 55, y: 90 },
      { city: 'Durrës', title: 'Durrës', desc: 'Amphithéâtre romain et plages.', x: 45, y: 55 },
    ],
  },
  'Irlande': {
    lat: 53.4, lng: -8.0, zoom: 6,
    waypoints: [
      { city: 'Dublin', title: 'Dublin', desc: 'Guinness Storehouse et Trinity College.', x: 70, y: 50 },
      { city: 'Galway', title: 'Galway', desc: 'Ambiance bohème et musique live.', x: 30, y: 50 },
      { city: 'Cork', title: 'Cork', desc: 'La rebelle du sud.', x: 50, y: 80 },
      { city: 'Killarney', title: 'Killarney', desc: 'Lacs et parc national.', x: 30, y: 85 },
      { city: 'Belfast', title: 'Belfast', desc: 'Titanic Belfast et chaussée des géants.', x: 80, y: 20 },
      { city: 'Dingle', title: 'Dingle', desc: 'Péninsule sauvage.', x: 10, y: 70 },
    ],
  },
  'Inde': {
    lat: 20.59, lng: 78.96, zoom: 5,
    waypoints: [
      { city: 'New Delhi', title: 'New Delhi', desc: 'Capitale tentaculaire et historique.', x: 40, y: 30 },
      { city: 'Agra', title: 'Agra', desc: 'Taj Mahal.', x: 45, y: 35 },
      { city: 'Jaipur', title: 'Jaipur', desc: 'La ville rose du Rajasthan.', x: 35, y: 40 },
      { city: 'Mumbai', title: 'Mumbai', desc: 'Porte de l\'Inde et Bollywood.', x: 30, y: 60 },
      { city: 'Varanasi', title: 'Varanasi', desc: 'Rives sacrées du Gange.', x: 60, y: 40 },
      { city: 'Goa', title: 'Goa', desc: 'Plages et héritage portugais.', x: 35, y: 70 },
    ],
  },
  'Pologne': {
    lat: 51.91, lng: 19.14, zoom: 6,
    waypoints: [
      { city: 'Varsovie', title: 'Varsovie', desc: 'Capitale dynamique et résiliente.', x: 60, y: 40 },
      { city: 'Cracovie', title: 'Cracovie', desc: 'Ancienne capitale royale.', x: 50, y: 70 },
      { city: 'Gdansk', title: 'Gdansk', desc: 'Perle de la Baltique.', x: 50, y: 20 },
      { city: 'Wroclaw', title: 'Wroclaw', desc: 'La ville aux nains et ponts.', x: 30, y: 60 },
      { city: 'Poznan', title: 'Poznan', desc: 'Place du marché colorée.', x: 35, y: 45 },
      { city: 'Zakopane', title: 'Zakopane', desc: 'Au pied des Tatras.', x: 50, y: 80 },
    ],
  },
  'Slovaquie': {
    lat: 48.66, lng: 19.69, zoom: 7,
    waypoints: [
      { city: 'Bratislava', title: 'Bratislava', desc: 'Capitale sur le Danube.', x: 20, y: 60 },
      { city: 'Kosice', title: 'Kosice', desc: 'Métropole de l\'Est.', x: 80, y: 50 },
      { city: 'Poprad', title: 'Poprad', desc: 'Porte des Hautes Tatras.', x: 65, y: 40 },
      { city: 'Zilina', title: 'Zilina', desc: 'Centre historique.', x: 40, y: 35 },
      { city: 'Banska Bystrica', title: 'Banska Bystrica', desc: 'Au cœur des montagnes.', x: 50, y: 55 },
      { city: 'Trnava', title: 'Trnava', desc: 'La petite Rome slovaque.', x: 30, y: 60 },
    ],
  },
  'Slovénie': {
    lat: 46.15, lng: 14.99, zoom: 8,
    waypoints: [
      { city: 'Ljubljana', title: 'Ljubljana', desc: 'Capitale verte et charmante.', x: 50, y: 50 },
      { city: 'Bled', title: 'Bled', desc: 'Lac alpin et château.', x: 35, y: 30 },
      { city: 'Piran', title: 'Piran', desc: 'Perle vénitienne sur l\'Adriatique.', x: 20, y: 80 },
      { city: 'Maribor', title: 'Maribor', desc: 'Vignobles et traditions.', x: 80, y: 25 },
      { city: 'Kranjska Gora', title: 'Kranjska Gora', desc: 'Station alpine.', x: 25, y: 25 },
      { city: 'Postojna', title: 'Postojna', desc: 'Grottes spectaculaires.', x: 40, y: 70 },
    ],
  },
  'Tchéquie': {
    lat: 49.81, lng: 15.47, zoom: 7,
    waypoints: [
      { city: 'Prague', title: 'Prague', desc: 'La ville aux cent clochers.', x: 40, y: 40 },
      { city: 'Brno', title: 'Brno', desc: 'Capitale morave.', x: 70, y: 70 },
      { city: 'Cesky Krumlov', title: 'Cesky Krumlov', desc: 'Joyau de Bohême du Sud.', x: 30, y: 80 },
      { city: 'Karlovy Vary', title: 'Karlovy Vary', desc: 'Ville thermale.', x: 20, y: 30 },
      { city: 'Plzen', title: 'Plzen', desc: 'Berceau de la Pilsner.', x: 30, y: 50 },
      { city: 'Olomouc', title: 'Olomouc', desc: 'Beauté baroque méconnue.', x: 80, y: 50 },
    ],
  },
  Italie: {
    lat: 43.0,
    lng: 12.5,
    zoom: 6,
    waypoints: [
      { city: 'Rome', title: 'Rome Cité Éternelle', desc: 'Colisée, Forum romain et ruelles vivantes de Trastevere.', x: 52, y: 62 },
      { city: 'Florence', title: 'Florence Joyau de la Renaissance', desc: 'Galerie des Offices, Duomo et Ponte Vecchio.', x: 45, y: 46 },
      { city: 'Cinque Terre', title: 'Cinque Terre & Villages suspendus', desc: 'Sentiers côtiers entre vignobles et mer Ligure.', x: 32, y: 42 },
      { city: 'Venise', title: 'Venise & la Lagune', desc: 'Canaux romantiques, Place Saint-Marc et gondoles.', x: 58, y: 32 },
      { city: 'Naples', title: 'Naples & Pompéi', desc: 'Cité historique, pizzas authentiques et ruines de Pompéi.', x: 60, y: 72 },
      { city: 'Côte Amalfitaine', title: 'Côte Amalfitaine & Positano', desc: 'Villages accrochés à la falaise et panoramas marins.', x: 62, y: 76 },
    ],
  },
};

const CITY_GPS_COORDINATES: Record<string, { lat: number; lng: number }> = {
  // Pays-Bas
  'Amsterdam': { lat: 52.3676, lng: 4.9041 },
  'Rotterdam': { lat: 51.9244, lng: 4.4777 },
  'Utrecht': { lat: 52.0907, lng: 5.1214 },
  'La Haye': { lat: 52.0705, lng: 4.3007 },
  'Haarlem': { lat: 52.3874, lng: 4.6462 },
  'Maastricht': { lat: 50.8514, lng: 5.6910 },

  // Allemagne
  'Munich': { lat: 48.1351, lng: 11.5820 },
  'Berlin': { lat: 52.5200, lng: 13.4050 },
  'Francfort': { lat: 50.1109, lng: 8.6821 },
  'Nuremberg': { lat: 49.4521, lng: 11.0767 },
  'Stuttgart': { lat: 48.7758, lng: 9.1829 },
  'Fribourg': { lat: 47.9990, lng: 7.8421 },

  // Liechtenstein
  'Vaduz': { lat: 47.1410, lng: 9.5215 },
  'Malbun': { lat: 47.1030, lng: 9.6090 },
  'Schaan': { lat: 47.1664, lng: 9.5100 },
  'Triesenberg': { lat: 47.1187, lng: 9.5398 },
  'Balzers': { lat: 47.0667, lng: 9.5000 },
  'Steg': { lat: 47.1167, lng: 9.5667 },

  // Belgique
  'Bruxelles': { lat: 50.8503, lng: 4.3517 },
  'Bruges': { lat: 51.2093, lng: 3.2247 },
  'Gand': { lat: 51.0543, lng: 3.7167 },
  'Anvers': { lat: 51.2194, lng: 4.4025 },
  'Liège': { lat: 50.6326, lng: 5.5663 },
  'Namur': { lat: 50.4674, lng: 4.8719 },

  // Albanie
  'Tirana': { lat: 41.3275, lng: 19.8187 },
  'Berat': { lat: 40.7086, lng: 19.9436 },
  'Gjirokastër': { lat: 40.0758, lng: 20.1388 },
  'Shkodër': { lat: 42.0683, lng: 19.5126 },
  'Saranda': { lat: 39.8739, lng: 20.0051 },
  'Durrës': { lat: 41.3246, lng: 19.4565 },

  // Irlande
  'Dublin': { lat: 53.3498, lng: -6.2603 },
  'Galway': { lat: 53.2707, lng: -9.0568 },
  'Cork': { lat: 51.8985, lng: -8.4756 },
  'Killarney': { lat: 52.0599, lng: -9.5065 },
  'Belfast': { lat: 54.5973, lng: -5.9301 },
  'Dingle': { lat: 52.1409, lng: -10.2640 },

  // Inde
  'New Delhi': { lat: 28.6139, lng: 77.2090 },
  'Agra': { lat: 27.1767, lng: 78.0081 },
  'Jaipur': { lat: 26.9124, lng: 75.7873 },
  'Mumbai': { lat: 19.0760, lng: 72.8777 },
  'Varanasi': { lat: 25.3176, lng: 82.9739 },
  'Goa': { lat: 15.2993, lng: 74.1240 },

  // Pologne
  'Varsovie': { lat: 52.2297, lng: 21.0122 },
  'Cracovie': { lat: 50.0647, lng: 19.9450 },
  'Gdansk': { lat: 54.3520, lng: 18.6466 },
  'Wroclaw': { lat: 51.1079, lng: 17.0385 },
  'Poznan': { lat: 52.4064, lng: 16.9252 },
  'Zakopane': { lat: 49.2992, lng: 19.9496 },

  // Slovaquie
  'Bratislava': { lat: 48.1486, lng: 17.1077 },
  'Kosice': { lat: 48.7164, lng: 21.2611 },
  'Poprad': { lat: 49.0560, lng: 20.3006 },
  'Zilina': { lat: 49.2231, lng: 18.7394 },
  'Banska Bystrica': { lat: 48.7395, lng: 19.1535 },
  'Trnava': { lat: 48.3774, lng: 17.5872 },

  // Slovénie
  'Ljubljana': { lat: 46.0569, lng: 14.5058 },
  'Bled': { lat: 46.3683, lng: 14.1146 },
  'Piran': { lat: 45.5283, lng: 13.5682 },
  'Maribor': { lat: 46.5547, lng: 15.6459 },
  'Kranjska Gora': { lat: 46.4845, lng: 13.7857 },
  'Postojna': { lat: 45.7744, lng: 14.2153 },

  // Tchéquie
  'Prague': { lat: 50.0755, lng: 14.4378 },
  'Brno': { lat: 49.1951, lng: 16.6068 },
  'Cesky Krumlov': { lat: 48.8109, lng: 14.3152 },
  'Karlovy Vary': { lat: 50.2294, lng: 12.8710 },
  'Plzen': { lat: 49.7384, lng: 13.3736 },
  'Olomouc': { lat: 49.5938, lng: 17.2509 },

  // Espagne
  'Séville': { lat: 37.3891, lng: -5.9845 },
  'Cordoue': { lat: 37.8882, lng: -4.7794 },
  'Grenade': { lat: 37.1773, lng: -3.5986 },
  'Ronda': { lat: 36.7462, lng: -5.1612 },
  'Malaga': { lat: 36.7213, lng: -4.4214 },
  'Cadix': { lat: 36.5271, lng: -6.2886 },

  // Grèce
  'Athènes': { lat: 37.9838, lng: 23.7275 },
  'Delphes': { lat: 38.4824, lng: 22.5010 },
  'Kalambaka': { lat: 39.7044, lng: 21.6269 },
  'Nauplie': { lat: 37.5673, lng: 22.8016 },
  'Olympie': { lat: 37.6384, lng: 21.6303 },
  'Thessalonique': { lat: 40.6401, lng: 22.9444 },
  'Santorin': { lat: 36.3932, lng: 25.4615 },

  // Islande
  'Reykjavik': { lat: 64.1466, lng: -21.9426 },
  'Thingvellir': { lat: 64.2559, lng: -21.1299 },
  'Vík í Mýrdal': { lat: 63.4194, lng: -19.0060 },
  'Jökulsárlón': { lat: 64.0784, lng: -16.2306 },
  'Akureyri': { lat: 65.6835, lng: -18.0878 },
  'Snæfellsnes': { lat: 64.8000, lng: -23.5000 },

  // Suisse
  'Genève': { lat: 46.2044, lng: 6.1432 },
  'Interlaken': { lat: 46.6863, lng: 7.8632 },
  'Zermatt': { lat: 46.0207, lng: 7.7491 },
  'Lucerne': { lat: 47.0502, lng: 8.3093 },
  'Chur': { lat: 46.8508, lng: 9.5320 },
  'Zurich': { lat: 47.3769, lng: 8.5417 },

  // Japon
  'Tokyo': { lat: 35.6762, lng: 139.6503 },
  'Hakone': { lat: 35.2323, lng: 139.1069 },
  'Takayama': { lat: 36.1408, lng: 137.2513 },
  'Kyoto': { lat: 35.0116, lng: 135.7681 },
  'Nara': { lat: 34.6851, lng: 135.8048 },
  'Osaka': { lat: 34.6937, lng: 135.5023 },
  'Hiroshima': { lat: 34.3853, lng: 132.4553 },

  // Angleterre
  'Londres': { lat: 51.5074, lng: -0.1278 },
  'Oxford': { lat: 51.7520, lng: -1.2577 },
  'Cotswolds': { lat: 51.8330, lng: -1.8430 },
  'York': { lat: 53.9590, lng: -1.0815 },
  'Bath': { lat: 51.3811, lng: -2.3590 },
  'Lake District': { lat: 54.4609, lng: -3.0886 },

  // Vietnam
  'Hanoï': { lat: 21.0285, lng: 105.8542 },
  'Baie d\'Halong': { lat: 20.9101, lng: 107.1839 },
  'Ninh Binh': { lat: 20.2506, lng: 105.9745 },
  'Hue': { lat: 16.4637, lng: 107.5909 },
  'Hoi An': { lat: 15.8801, lng: 108.3380 },
  'Ho Chi Minh': { lat: 10.8231, lng: 106.6297 },

  // Autriche
  'Vienne': { lat: 48.2082, lng: 16.3738 },
  'Salzbourg': { lat: 47.8095, lng: 13.0550 },
  'Hallstatt': { lat: 47.5622, lng: 13.6493 },
  'Innsbruck': { lat: 47.2692, lng: 11.4041 },
  'Graz': { lat: 47.0707, lng: 15.4395 },
  'Wachau': { lat: 48.3333, lng: 15.4167 },

  // Portugal
  'Porto': { lat: 41.1579, lng: -8.6291 },
  'Aveiro': { lat: 40.6405, lng: -8.6538 },
  'Coimbra': { lat: 40.2033, lng: -8.4103 },
  'Lisbonne': { lat: 38.7223, lng: -9.1393 },
  'Sintra': { lat: 38.8029, lng: -9.3817 },
  'Faro': { lat: 37.0194, lng: -7.9304 },

  // Malaisie
  'Kuala Lumpur': { lat: 3.1390, lng: 101.6869 },
  'Cameron Highlands': { lat: 4.4721, lng: 101.3758 },
  'Penang': { lat: 5.4164, lng: 100.3327 },
  'Ipoh': { lat: 4.5975, lng: 101.0901 },
  'Langkawi': { lat: 6.3500, lng: 99.8000 },
  'Taman Negara': { lat: 4.3833, lng: 102.4000 },

  // Norvège
  'Oslo': { lat: 59.9139, lng: 10.7522 },
  'Flåm': { lat: 60.8632, lng: 7.1132 },
  'Bergen': { lat: 60.3929, lng: 5.3242 },
  'Geiranger': { lat: 62.1008, lng: 7.2059 },
  'Trondheim': { lat: 63.4305, lng: 10.3951 },
  'Lofoten': { lat: 68.2343, lng: 14.5682 },

  // Italie
  'Rome': { lat: 41.9028, lng: 12.4964 },
  'Florence': { lat: 43.7696, lng: 11.2558 },
  'Cinque Terre': { lat: 44.1461, lng: 9.6439 },
  'Venise': { lat: 45.4408, lng: 12.3155 },
  'Naples': { lat: 40.8518, lng: 14.2681 },
  'Côte Amalfitaine': { lat: 40.6340, lng: 14.6027 },
};

/**
 * Build the itinerary rendered by the page.
 *
 * If the trip already ships a real `itinerary`, use it verbatim and only
 * back-fill the fields the UI depends on (images / activities / coords)
 * so nothing crashes. Otherwise, fall back to the placeholder generator
 * below that used to serve every voyage before real data existed.
 */
function buildRichItinerary(trip: Trip): ItineraryDay[] {
  if (trip.itinerary && trip.itinerary.length > 0) {
    const fallbackImg = trip.image;
    return trip.itinerary.map((d, idx) => ({
      ...d,
      images:
        d.images && d.images.length > 0
          ? d.images
          : trip.images && trip.images.length > 0
            ? [trip.images[idx % trip.images.length]]
            : [fallbackImg],
      // Percent-based coords (x/y) are only used by the decorative SVG line — safe defaults.
      coords: d.coords ?? { x: 20 + (idx * 15) % 60, y: 30 + (idx * 12) % 40 },
      // The UI iterates `activities.map(...)` — always provide at least an empty array.
      activities: d.activities ?? [],
    }));
  }

  const defaultImagePools: Record<string, string[]> = {
    Italie: [
      'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop',
    ],
    Norvège: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=800&auto=format&fit=crop',
    ],
    Japon: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=800&auto=format&fit=crop',
    ],
  };

  const pool = defaultImagePools[trip.country] || [
    trip.image,
    ...(trip.images || []),
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop',
  ];

  const daysCount = getDaysFromDuration(trip.duration);
  const rhythms: ('Doux' | 'Modéré' | 'Soutenu')[] = ['Doux', 'Modéré', 'Doux', 'Modéré', 'Soutenu', 'Doux'];
  const mapConfig = COUNTRY_MAP_CONFIG[trip.country];
  const waypoints = mapConfig?.waypoints || [];

  // Track assigned GPS coordinates to prevent overlaps so every single day is 100% visible on the map
  const assignedGPS: { lat: number; lng: number }[] = [];

  return Array.from({ length: daysCount }).map((_, idx) => {
    const dayNum = idx + 1;
    const waypoint = waypoints[idx % Math.max(1, waypoints.length)] || {
      city: `${trip.country}`,
      title: `Étape ${dayNum} : Immersions & Découvertes`,
      desc: `Journée privilégiée pour découvrir les trésors locaux et échanger avec les habitants.`,
      x: 20 + (idx * 15) % 60,
      y: 30 + (idx * 12) % 40,
    };

    const rawGps = CITY_GPS_COORDINATES[waypoint.city] || {
      lat: (mapConfig?.lat || 40.0) + (idx - daysCount / 2) * 0.3,
      lng: (mapConfig?.lng || 0.0) + (idx - daysCount / 2) * 0.3,
    };

    let lat = rawGps.lat;
    let lng = rawGps.lng;

    // Check if this point is too close to a previously assigned day
    let duplicateIndex = 0;
    for (const prev of assignedGPS) {
      const dist = Math.hypot(prev.lat - lat, prev.lng - lng);
      if (dist < 0.035) {
        duplicateIndex++;
      }
    }

    if (duplicateIndex > 0) {
      // Offset position using golden angle spiral so repeated visits stay distinct and visible
      const angle = duplicateIndex * 2.39996; // ~137.5 degrees
      const radius = 0.05 + duplicateIndex * 0.025; // ~5-10km displacement
      lat = rawGps.lat + Math.sin(angle) * radius;
      lng = rawGps.lng + Math.cos(angle) * radius;
    }

    assignedGPS.push({ lat, lng });

    let titleText = waypoint.title;
    if (duplicateIndex > 0) {
      titleText = `${waypoint.title} (Étape ${duplicateIndex + 1})`;
    }

    const img1 = pool[(idx * 3) % pool.length];
    const img2 = pool[(idx * 3 + 1) % pool.length];
    const img3 = pool[(idx * 3 + 2) % pool.length];

    return {
      day: dayNum,
      title: `Jour ${dayNum} : ${titleText}`,
      desc: waypoint.desc,
      rhythm: rhythms[idx % rhythms.length],
      images: [img1, img2, img3],
      locationName: waypoint.city,
      coords: { x: waypoint.x, y: waypoint.y },
      lat,
      lng,
      activities: [
        {
          time: '09h00 - 11h30',
          title: 'Matinée guidée & patrimoine local',
          desc: `Accueil par un guide passionné à ${waypoint.city} et immersion culturelle.`,
        },
        {
          time: '12h00 - 14h00',
          title: 'Pause gourmande & spécialités régionales',
          desc: 'Déjeuner zéro kilomètre dans une adresse engagée.',
        },
        {
          time: '14h30 - 18h00',
          title: 'Exploration douce & panoramas',
          desc: `Balade au cœur de ${waypoint.city} et ses environs préservés.`,
        },
      ],
    };
  });
}

export default function VoyageDetails() {
  const { country, slug } = useParams<{ country: string; slug: string }>();
  const [showFullItinerary, setShowFullItinerary] = useState(false);
  const [activeMapDay, setActiveMapDay] = useState<number>(1);
  const trip = getTripByCountryAndSlug(country, slug, getStoredTrips());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [country, slug]);

  if (!trip) {
    return (
      <div className="pt-24 md:pt-32 pb-24 text-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Voyage introuvable</h1>
        <Link href="/voyages" className="text-primary hover:underline font-semibold">
          Retour à la liste des voyages
        </Link>
      </div>
    );
  }

  const fullItinerary = buildRichItinerary(trip);
  const displayedDays = showFullItinerary ? fullItinerary : fullItinerary.slice(0, 3);
  const activeDayData = fullItinerary.find((d) => d.day === activeMapDay) || fullItinerary[0];

  const handleScrollToMap = (dayNumber: number) => {
    setActiveMapDay(dayNumber);
    const mapElem = document.getElementById('carte-itineraire');
    if (mapElem) {
      mapElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleScrollToDay = (dayNumber: number) => {
    setActiveMapDay(dayNumber);
    const element = document.getElementById(`step-day-${dayNumber}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Fixed country/region Google Maps view with exact lat, lng, zoom
  const countryMapCfg = COUNTRY_MAP_CONFIG[trip.country];
  const googleMapsIframeUrl = countryMapCfg
    ? `https://maps.google.com/maps?q=${countryMapCfg.lat},${countryMapCfg.lng}&t=m&z=${countryMapCfg.zoom}&output=embed`
    : `https://maps.google.com/maps?q=${encodeURIComponent(trip.country)}&t=m&z=6&output=embed`;

  // SVG curved path connecting all waypoints on top of the map
  const svgPathData = fullItinerary.reduce((acc, d, i) => {
    if (!d.coords) return acc;
    if (i === 0) return `M ${d.coords.x} ${d.coords.y}`;
    const prev = fullItinerary[i - 1].coords;
    if (!prev) return `${acc} L ${d.coords.x} ${d.coords.y}`;
    const cx = Math.round((prev.x + d.coords.x) / 2);
    return `${acc} Q ${cx} ${prev.y}, ${d.coords.x} ${d.coords.y}`;
  }, '');

  return (
    <main className="flex-1 w-full bg-background pt-32 md:pt-40 pb-16 font-sans">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Top Header with Back button and CTA Download Brochure */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            href="/voyages"
            className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors font-medium text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4" /> Retour aux voyages
          </Link>

          <button
            onClick={() => alert(`Téléchargement de la brochure pour : ${trip.title}`)}
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-hover transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Download className="w-4 h-4" /> Télécharger la brochure
          </button>
        </div>

        {/* Main Hero Header */}
        <div className="mb-10 md:mb-12">
          <div className="flex flex-row items-center gap-2 md:gap-3 mb-4 w-full overflow-x-auto hide-scrollbar pb-1">
            <span className="bg-primary/10 text-primary px-3 py-1.5 md:px-3.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0">
              À partir de {trip.price}€
            </span>
            <span className="bg-gray-100 text-text-main px-3 py-1.5 md:px-3.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap shrink-0">
              {trip.type}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-main leading-tight mb-6">
            {trip.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 md:gap-10 text-text-main font-semibold mb-8">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-base md:text-lg">{trip.country}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-base md:text-lg">{trip.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Train className="w-5 h-5 text-primary" />
              <span className="text-base md:text-lg">{trip.transport}</span>
            </div>
          </div>

          {/* Hero Main Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full aspect-[21/9] md:aspect-[24/9] rounded-[2.5rem] overflow-hidden shadow-2xl relative"
          >
            <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* Full-width Description & Highlights (Clean without bg or shadow) */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-text-main">À propos de ce voyage</h2>
          <p className="text-base md:text-lg text-text-muted leading-relaxed mb-10">
            {trip.description ||
              `Laissez-vous tenter par ce voyage exceptionnel en ${trip.country}. Ce séjour de ${trip.duration} vous permettra de découvrir les merveilles de la région tout en privilégiant des modes de transport doux comme le ${trip.transport.toLowerCase()}.`}
          </p>

          {trip.highlights && trip.highlights.length > 0 && (
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-text-main flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" /> Les points forts du séjour
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trip.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 py-1">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-text-main font-medium text-sm md:text-base">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section APERÇU DE L'ITINÉRAIRE (Clean design without bg or shadow) */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-2">Aperçu de l'itinéraire</h2>
              <p className="text-text-muted text-base">
                Un itinéraire sur-mesure de {trip.duration} conçu pour savourer chaque étape.
              </p>
            </div>
          </div>

          {/* List of Days (Without bg or shadow) */}
          <div className="divide-y divide-gray-100">
            {displayedDays.map((step) => (
              <motion.div
                key={step.day}
                id={`step-day-${step.day}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="py-10 first:pt-0 flex flex-col lg:flex-row gap-8 items-start scroll-mt-28"
              >
                {/* 3 Images Carousel for this Day */}
                <div className="w-full lg:w-5/12 shrink-0">
                  <DayImageCarousel images={step.images} title={step.title} />
                </div>

                {/* Day Details */}
                <div className="w-full lg:w-7/12 flex flex-col justify-between h-full">
                  <div>
                    {/* Header line: Day Badge, Title & Rhythm */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-base shadow-sm">
                          J{step.day}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-text-main">{step.title}</h3>
                      </div>
                    </div>

                    <p className="text-text-muted text-sm md:text-base leading-relaxed mb-6">
                      {step.desc}
                    </p>

                    {/* Activities Schedule Breakdown */}
                    {step.activities && step.activities.length > 0 && (
                      <div className="py-2 mb-6 space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                          Programme & Horaires de la journée ({step.locationName})
                        </h4>
                        {step.activities.map((act, actIdx) => (
                          <div key={actIdx} className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm border-b border-gray-100 pb-2.5 last:border-0 last:pb-0">
                            <span className="font-bold text-primary text-xs bg-gray-100 px-2.5 py-1 rounded-md shrink-0 w-fit">
                              {act.time}
                            </span>
                            <span className="font-semibold text-text-main">{act.title}</span>
                            {act.desc && <span className="text-text-muted text-xs hidden md:inline">— {act.desc}</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Button "Voir sur la carte" */}
                  <div className="pt-2 flex justify-start">
                    <button
                      onClick={() => handleScrollToMap(step.day)}
                      className="inline-flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300"
                    >
                      <Compass className="w-4 h-4" /> Voir sur la carte Google Maps
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Expand Toggle Button if collapsed */}
          {!showFullItinerary && fullItinerary.length > 3 && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowFullItinerary(true)}
                className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-3.5 rounded-xl font-bold text-sm md:text-base hover:bg-gray-800 transition-all shadow-lg w-[90%] md:w-auto"
              >
                <ChevronDown className="w-5 h-5" /> Voir l'itinéraire complet ({fullItinerary.length} jours)
              </button>
            </div>
          )}
          {showFullItinerary && fullItinerary.length > 3 && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowFullItinerary(false)}
                className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-3.5 rounded-xl font-bold text-sm md:text-base hover:bg-gray-800 transition-all shadow-lg w-[90%] md:w-auto"
              >
                <ChevronUp className="w-5 h-5" /> Masquer l'itinéraire
              </button>
            </div>
          )}
        </div>

        {/* SECTION CARTE DE L'ITINÉRAIRE INTERACTIVE GOOGLE MAPS EMBED */}
        <div id="carte-itineraire" className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-text-main mb-2">Carte interactive du voyage</h2>
              <p className="text-text-muted text-sm md:text-base">
                Tous les points de l'itinéraire sont affichés ci-dessous. Cliquez sur un point pour afficher ses détails.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-primary bg-primary/10 px-4 py-2 rounded-xl w-fit">
              <MapPin className="w-4 h-4" />
              <span>{activeDayData ? `Jour ${activeDayData.day} : ${activeDayData.locationName}` : trip.country}</span>
            </div>
          </div>

          {/* Interactive Day Selector Tabs Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
            {fullItinerary.map((d) => (
              <button
                key={d.day}
                onClick={() => setActiveMapDay(d.day)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold shrink-0 transition-all ${
                  activeMapDay === d.day
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-text-main hover:bg-gray-200'
                }`}
              >
                J{d.day} : {d.locationName}
              </button>
            ))}
          </div>

          {/* Leaflet Real Geographic Interactive Map */}
          <InteractiveItineraryMap
            country={trip.country}
            waypoints={fullItinerary.map((d) => ({
              day: d.day,
              title: d.title,
              locationName: d.locationName || trip.country,
              desc: d.desc,
              images: d.images || [trip.image],
              lat: d.lat || 40.0,
              lng: d.lng || 0.0,
            }))}
            activeMapDay={activeMapDay}
            setActiveMapDay={setActiveMapDay}
            handleScrollToDay={handleScrollToDay}
          />
        </div>

        {/* What's included & Not included full-width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-text-main">Ce qui est inclus</h3>
            <ul className="space-y-3">
              {(trip.included || [
                'Hébergement en boutique-hôtels ou chambres d’hôtes de charme',
                'Petits-déjeuners bio et locaux inclus',
                'L’intégralité des billets de train et transports doux sur place',
                'Carnet de voyage digitalisé personnalisé'
              ]).map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-text-muted text-sm md:text-base">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-text-main">Non inclus</h3>
            <ul className="space-y-3">
              {(trip.notIncluded || [
                'Repas non mentionnés au programme',
                'Assurance annulation et assistance voyage',
                'Dépenses personnelles et souvenirs',
                'Activités facultatives en option'
              ]).map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-text-muted text-sm md:text-base">
                  <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Accommodation section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4 text-text-main flex items-center gap-2">
            <Home className="w-6 h-6 text-primary" /> L'hébergement
          </h3>
          <p className="text-text-muted text-base md:text-lg leading-relaxed">
            {trip.accommodation ||
              "Nous sélectionnons avec soin des hébergements de charme (boutique-hôtels, maisons d'hôtes ou écolodges), privilégiant l'authenticité, le confort et les engagements éco-responsables de nos partenaires locaux."}
          </p>
        </div>

        {/* Ideal Period section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-4 text-text-main flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" /> Période idéale
          </h3>
          <p className="text-text-muted text-base md:text-lg leading-relaxed">
            {trip.idealPeriod || getTripIdealPeriod(trip)}
          </p>
        </div>

      </div>

      {/* Formulaire de contact en bas de page pour personnalisation / demande de devis */}
      <div id="contact" className="pt-8 pb-20 max-w-4xl mx-auto px-6">
        <TripContactForm country={trip.country} tripTitle={trip.title} />
      </div>
    </main>
  );
}
