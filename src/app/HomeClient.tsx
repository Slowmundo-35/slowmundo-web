"use client";

import { useState } from 'react';
import { 
  ArrowRight, ChevronLeft, ChevronRight, MapPin, Compass, 
  Globe, Cloud, Mountain, ShieldCheck, HeartHandshake, Train, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { slugify } from '@/utils/slugify';
import { TRIPS } from '@/data/trips';

// react-simple-maps hits window/fetch on mount → skip SSR
const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] md:h-[520px] rounded-3xl bg-gray-100 animate-pulse" />
  ),
});

const faqs = [
  { question: "Quelle est la différence entre Slowmundo et un simple travel planner ?", answer: "Slowmundo est une véritable agence de voyage spécialisée dans le bas carbone. Nous créons des itinéraires sur mesure, mais surtout nous achetons, réservons et garantissons 100% de vos prestations (transports, hébergements, activités) avec une protection juridique complète et une assistance continue." },
  { question: "Peut-on vraiment aller en Asie en mode \"Slow tourisme\" ?", answer: "Oui ! Bien que le train depuis l'Europe soit une option fantastique pour les passionnés du rail, nous pouvons aussi optimiser un voyage en avion en allongeant la durée du séjour sur place et en utilisant exclusivement des transports locaux terrestres ou maritimes une fois arrivé." },
  { question: "Je ne suis pas un écologiste parfait, puis-je quand même faire appel à vous ?", answer: "Bien sûr ! Notre but n'est pas la perfection, mais de proposer de véritables alternatives sans aucun jugement. Chaque geste compte, et nous sommes là pour faciliter votre transition vers des voyages plus respectueux à votre propre rythme." },
  { question: "Comment se passe la création d'un voyage sur mesure ?", answer: "Après un premier échange pour comprendre vos envies, votre budget et votre rythme, nous vous proposons une ébauche d'itinéraire personnalisée. Une fois validée, nous finalisons l'ensemble des réservations et vous fournissons votre carnet de voyage digital." },
  { question: "Êtes-vous basés à Rennes ?", answer: "Oui, notre point d'ancrage est en Bretagne, près de Rennes. Toutefois, nous accompagnons des voyageurs de toute la France et d'ailleurs lors d'échanges en visioconférence pour co-créer leur voyage." },
];

const trips: Array<{ id: number; title: string; description: string; duration: string; destination: string; type: string; price: string; mainImage: string; smallImage1: string; smallImage2: string }> = [];

export default function Home() {
  const router = useRouter();
  const [currentTripIndex, setCurrentTripIndex] = useState(0);
  const [mapRegion, setMapRegion] = useState('Europe');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const nextTrip = () => {
    setCurrentTripIndex((prev) => (prev + 1) % trips.length);
  };

  const prevTrip = () => {
    setCurrentTripIndex((prev) => (prev - 1 + trips.length) % trips.length);
  };

  const activeTrip = trips[currentTripIndex];

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      
      {/* SECTION 1: HERO */}
      <section className="pt-36 md:pt-44 pb-16 md:pb-24 px-6 relative">
        {/* Soft Ambient Background Glows */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none -z-10" />
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-12 items-center min-h-[60vh]">
            
            {/* Left Column - Text Content */}
            <div className="flex flex-col justify-center max-w-xl">

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-text-main leading-[1.15] mb-6 tracking-tight"
              >
                Slowmundo - votre <br/>
                <span className="text-primary relative inline-block">
                  voyage
                  <svg className="absolute -bottom-1 left-0 w-full h-2 text-primary/30 pointer-events-none" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M 0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                  </svg>
                </span> à bas carbone
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-base md:text-lg text-text-muted font-normal leading-relaxed mb-8 max-w-lg"
              >
                Vous rêvez d'évasion sans pour autant renoncer à vos engagements environnementaux ? Slowmundo organise de A à Z votre voyage personnalisé en Europe et en Asie.
              </motion.p>
              
              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link 
                  href="/contact" 
                  className="bg-black text-white px-7 py-3 rounded-xl font-bold text-[15px] hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center"
                >
                  <span>Planifier mon voyage</span>
                </Link>
                <Link 
                  href="/voyages" 
                  className="bg-white border-2 border-black/80 text-black px-7 py-3 rounded-xl font-bold text-[15px] hover:bg-gray-50 transition-all duration-300 flex items-center justify-center shadow-xs"
                >
                  Découvrir nos inspirations
                </Link>
              </motion.div>

            </div>

            {/* Right Column - Image Grid */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[420px] md:h-[480px] w-full max-w-[520px] mx-auto lg:ml-auto lg:mr-0 mt-8 lg:mt-0"
            >
              {/* Outer Decorative Glow */}
              <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-2xl -z-10 transform scale-95" />

              {/* Main Image Frame */}
              <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden shadow-2xl bg-gray-100 border border-gray-100">
                <img
                  src="/img/slowmundo/paysage-italie-mer.webp"
                  alt="Village italien au bord de la mer"
                  className="w-full h-full object-cover"
                />
                
                {/* Small Overlay Image - contained inside large image */}
                <div className="absolute bottom-0 left-0 w-[62%] sm:w-[58%] aspect-[4/3] rounded-tr-[2.2rem] overflow-hidden border-t-6 border-r-6 border-white shadow-2xl z-20 bg-gray-100 group">
                  <img
                    src="/img/slowmundo/alexis-devant-train.webp"
                    alt="Alexis, fondateur de Slowmundo, en voyage devant un train"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating badge inside overlay */}
                  <div className="absolute bottom-3 left-3 bg-black/80 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5">
                    <Train className="w-3 h-3 text-emerald-400" />
                    <span>Voyage en train</span>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 2: COMMENT ÇA MARCHE */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        {/* Decorative Shapes */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Notre concept en 3 étapes
            </h2>
            <p className="text-base md:text-lg text-white/90 font-normal">
              Un itinéraire clair et sans stress pour préparer votre prochaine aventure de manière respectueuse et 100% sereine.
            </p>
          </div>

          <div className="relative pt-4">
            
            {/* Connecting Wave Dotted Line behind steps across full width */}
            <div className="hidden md:block absolute top-[210px] left-0 right-0 w-full z-0 pointer-events-none">
              <svg className="w-full h-20 overflow-visible" viewBox="0 0 1200 80" preserveAspectRatio="none" fill="none">
                <path 
                  d="M 0 40 C 150 10, 250 70, 400 40 C 550 10, 650 70, 800 40 C 950 10, 1050 70, 1200 40" 
                  stroke="rgba(255, 255, 255, 0.45)" 
                  strokeWidth="3" 
                  strokeDasharray="8 8" 
                  strokeLinecap="round" 
                />
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              
              {/* Step 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative flex flex-col pt-7 md:pt-8"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 md:w-16 md:h-16 bg-white border-[3px] border-primary text-primary rounded-full flex items-center justify-center font-bold text-xl md:text-2xl z-20 shadow-xl">
                  1
                </div>
                <div className="bg-white text-text-main rounded-[2.2rem] p-8 pt-12 shadow-2xl flex-grow flex flex-col border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-center mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">Étape 01</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-text-main mb-3 text-center leading-snug">
                    Choisissez votre destination
                  </h3>
                  <p className="text-sm md:text-base text-text-muted leading-relaxed mb-6 flex-grow text-center">
                    Parcourez nos pépites en Europe ou en Asie et choisissez l'ambiance qui fait vibrer vos envies d'évasion.
                  </p>
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mt-auto shadow-inner group relative">
                    <img
                      src="/img/slowmundo/paysage-italie.webp"
                      alt="Paysage italien à explorer"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-xs font-bold flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Europe & Asie</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative flex flex-col pt-7 md:pt-8"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 md:w-16 md:h-16 bg-white border-[3px] border-primary text-primary rounded-full flex items-center justify-center font-bold text-xl md:text-2xl z-20 shadow-xl">
                  2
                </div>
                <div className="bg-white text-text-main rounded-[2.2rem] p-8 pt-12 shadow-2xl flex-grow flex flex-col border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-center mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">Étape 02</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-text-main mb-3 text-center leading-snug">
                    Personnalisez le parcours
                  </h3>
                  <p className="text-sm md:text-base text-text-muted leading-relaxed mb-6 flex-grow text-center">
                    Ajustez les étapes, vos hébergements écoresponsables et vos activités pour créer un voyage à votre image.
                  </p>
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mt-auto shadow-inner group relative">
                    <img
                      src="/img/slowmundo/alexis-monte-dans-train.webp"
                      alt="Alexis embarquant dans un train pour partir en voyage"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-xs font-bold flex items-center gap-1.5"><HeartHandshake className="w-3.5 h-3.5" /> Sur-mesure complet</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative flex flex-col pt-7 md:pt-8"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 md:w-16 md:h-16 bg-white border-[3px] border-primary text-primary rounded-full flex items-center justify-center font-bold text-xl md:text-2xl z-20 shadow-xl">
                  3
                </div>
                <div className="bg-white text-text-main rounded-[2.2rem] p-8 pt-12 shadow-2xl flex-grow flex flex-col border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-center mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">Étape 03</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-text-main mb-3 text-center leading-snug">
                    Voyagez l'esprit léger
                  </h3>
                  <p className="text-sm md:text-base text-text-muted leading-relaxed mb-6 flex-grow text-center">
                    De la réservation des billets de train à l'assistance 24/7, nous nous occupons de tout. Vous n'avez qu'à savourer !
                  </p>
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mt-auto shadow-inner group relative">
                    <img
                      src="/img/slowmundo/alexis-montagnes-suisse.webp"
                      alt="Alexis en immersion dans les montagnes suisses"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-xs font-bold flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Agence & Protection</span>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

            <div className="flex justify-center mt-12">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link 
                  href="/services" 
                  className="bg-black text-white px-8 py-3.5 rounded-xl font-bold text-sm md:text-base text-center transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center justify-center"
                >
                  <span>Découvrir le fonctionnement détaillé</span>
                </Link>
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 3: VOYAGES TYPES (CAROUSEL) — hidden until real trips are wired */}
      {trips.length > 0 && activeTrip && (
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex justify-center mb-4">
              <span className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-xs">
                <Globe className="w-6 h-6" strokeWidth={2} />
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl leading-tight font-bold text-text-main mb-4">
              Nos inspirations de voyages<br/>
              <span className="text-primary">écoresponsables</span> et sur mesure
            </h2>
            <p className="text-base text-text-muted leading-relaxed">
              Laissez-vous inspirer par nos itinéraires phares, entièrement personnalisables selon vos envies et conçus pour maximiser la découverte tout en minimisant l'empreinte carbone.
            </p>
          </div>

          {/* Carousel Area */}
          <div className="relative">
            {/* Desktop Navigation Arrows (Outside) */}
            <button 
              onClick={prevTrip}
              className="absolute left-[-45px] lg:left-[-65px] top-1/2 -translate-y-1/2 hidden md:flex w-12 h-12 rounded-full bg-white text-black hover:bg-black hover:text-white transition-all duration-300 items-center justify-center shadow-lg border border-gray-100 cursor-pointer z-30"
              aria-label="Inspiration précédente"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <button 
              onClick={nextTrip}
              className="absolute right-[-45px] lg:right-[-65px] top-1/2 -translate-y-1/2 hidden md:flex w-12 h-12 rounded-full bg-white text-black hover:bg-black hover:text-white transition-all duration-300 items-center justify-center shadow-lg border border-gray-100 cursor-pointer z-30"
              aria-label="Inspiration suivante"
            >
              <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
            </button>

            {/* Main Green Container */}
            <div className="bg-primary rounded-[2.5rem] p-6 sm:p-8 md:p-12 relative shadow-2xl overflow-hidden border border-primary/20">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTrip.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 md:gap-14 items-center"
                >
                  {/* Images Grid */}
                  <div className="grid grid-cols-2 gap-4 h-[340px] md:h-[400px]">
                    {/* Main Large Image */}
                    <div className="col-span-2 relative rounded-2xl overflow-hidden group h-[210px] md:h-[250px] shadow-lg">
                      <img 
                        src={activeTrip.mainImage} 
                        alt={activeTrip.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-black/75 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{activeTrip.destination}</span>
                      </div>
                    </div>
                    {/* Two Smaller Images Below */}
                    <div className="col-span-1 relative rounded-2xl overflow-hidden group shadow-md">
                       <img 
                          src={activeTrip.smallImage1} 
                          alt="Détail du voyage" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <div className="col-span-1 relative rounded-2xl overflow-hidden group shadow-md">
                        <img 
                          src={activeTrip.smallImage2} 
                          alt="Détail du voyage" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col justify-center text-white md:pr-2">
                     <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 mb-2">Itinéraire recommandé</span>
                     <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                      {activeTrip.title}
                    </h3>
                    
                    {/* Tags (Without emojis) */}
                    <div className="flex flex-wrap gap-2.5 mb-6">
                      <span className="inline-flex items-center px-4 py-1.5 bg-white rounded-full text-xs font-bold text-text-main shadow-xs">
                        {activeTrip.duration}
                      </span>
                      <span className="inline-flex items-center px-4 py-1.5 bg-white rounded-full text-xs font-bold text-text-main shadow-xs">
                        {activeTrip.type}
                      </span>
                      <span className="inline-flex items-center px-4 py-1.5 bg-emerald-900/80 text-emerald-100 rounded-full text-xs font-bold border border-emerald-700">
                        {activeTrip.price}
                      </span>
                    </div>
                    
                    <p className="text-sm md:text-base text-white/90 leading-relaxed mb-8">
                      {activeTrip.description}
                    </p>
                    
                    <Link
                      href={(() => {
                        // Home carousel exposes { destination, title }; find the matching TRIPS entry to build the nested URL
                        const countrySlug = slugify(activeTrip.destination);
                        const match = TRIPS.find((t) => slugify(t.country) === countrySlug);
                        return match
                          ? `/voyages/${countrySlug}/${slugify(match.title)}`
                          : `/voyages/${countrySlug}`;
                      })()}
                      className="bg-black text-white px-7 py-3 rounded-xl font-bold text-sm md:text-[15px] hover:bg-gray-900 transition-all duration-300 w-fit shadow-lg inline-flex items-center justify-center"
                    >
                      <span>Découvrir cet itinéraire</span>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Navigation Controls */}
            <div className="flex md:hidden gap-4 justify-center mt-6">
              <button 
                onClick={prevTrip}
                className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-md border border-gray-100"
              >
                <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
              </button>
              <button 
                onClick={nextTrip}
                className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center shadow-md border border-gray-100"
              >
                <ChevronRight className="w-6 h-6" strokeWidth={2.5} />
              </button>
            </div>

            {/* Dots Pagination */}
            <div className="flex justify-center items-center gap-2.5 mt-8">
              {trips.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTripIndex(index)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    index === currentTripIndex ? 'w-8 h-3 bg-primary' : 'w-3 h-3 bg-primary/30 hover:bg-primary/50'
                  }`}
                  aria-label={`Aller à l'inspiration ${index + 1}`}
                />
              ))}
            </div>
            
          </div>
        </div>
      </section>
      )}

      {/* SECTION 4: A PROPOS / RENCONTREZ ALEXIS */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Decorative elements - Cloud on top left, Mountain on bottom right */}
        <div className="absolute left-10 md:left-20 top-12 text-primary/30 hidden md:block">
          <Cloud className="w-12 h-12" strokeWidth={1.5} />
        </div>
        <div className="absolute right-10 md:right-20 bottom-12 text-primary/30 hidden md:block">
          <Mountain className="w-12 h-12" strokeWidth={1.5} />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-6 leading-tight">
                Rencontrez Alexis, votre <span className="text-primary">voyageur expert</span> basé en Bretagne
              </h2>
              
              <div className="space-y-4 text-base md:text-lg text-text-muted leading-relaxed mb-8">
                <p>
                  Passionné par la richesse des cultures internationales et convaincu qu'un autre tourisme est possible, j'ai fondé Slowmundo pour réconcilier le désir d'ailleurs et la préservation de notre planète.
                </p>
                <p>
                  Basé près de Rennes, je mets mon expérience du terrain au service des voyageurs du Grand Ouest (et d'ailleurs !) pour concevoir des itinéraires sur mesure fluides, authentiques et sans jugement.
                </p>
              </div>

              <Link 
                href="/a-propos" 
                className="bg-black text-white px-7 py-3 rounded-xl font-bold text-[15px] hover:bg-gray-900 transition-all duration-300 shadow-lg inline-flex items-center justify-center"
              >
                <span>En savoir plus sur ma démarche</span>
              </Link>
            </motion.div>

            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[420px] md:h-[480px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <img
                src="/img/slowmundo/paysage-autriche-montagne.webp"
                alt="Paysage autrichien en montagne, un des voyages proposés par Alexis"
                className="w-full h-full object-cover"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 5: STYLES DE VOYAGE */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Des voyages adaptés à votre style d'exploration
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-12">
            {[
              { title: 'Culturel', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop', badge: 'Musées & Histoire' },
              { title: 'Familial', image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop', badge: 'Tous âges' },
              { title: 'Romantique', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop', badge: 'Évasion à deux' },
              { title: 'Sportif', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop', badge: 'Randonnée & Vélo' },
              { title: 'Nature & Aventure', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop', badge: 'Grands Espaces' },
              { title: 'Solo & Amis', image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=800&auto=format&fit=crop', badge: 'Liberté totale' },
            ].map((style, idx) => (
              <motion.div
                key={style.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative h-52 rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-white/10"
                onClick={() => router.push(`/styles/${slugify(style.title)}`)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 group-hover:from-black/70 transition-colors duration-500 z-10" />
                <img 
                  src={style.image} 
                  alt={style.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                    {style.badge}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {style.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link 
              href="/voyages" 
              className="bg-black text-white px-8 py-3.5 rounded-xl font-bold text-[15px] hover:bg-gray-900 transition-all duration-300 shadow-2xl inline-flex items-center justify-center"
            >
              <span>Découvrir tous les styles de voyage</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: CARTE INTERACTIVE */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-text-main mb-6 leading-tight"
            >
              Où souhaitez-vous <span className="text-primary">ralentir</span> ?
            </motion.h2>

            {/* Segmented Tab Switcher with Sliding Pill Indicator */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200/80 shadow-xs relative">
                {['Europe', 'Asie'].map((reg) => {
                  const isActive = mapRegion === reg;
                  return (
                    <button
                      key={reg}
                      onClick={() => setMapRegion(reg)}
                      className={`relative px-8 py-2.5 rounded-xl font-bold text-sm md:text-base transition-colors duration-300 z-10 cursor-pointer ${
                        isActive ? 'text-white' : 'text-text-main hover:text-black'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="mapTabIndicator"
                          className="absolute inset-0 bg-black rounded-xl shadow-md -z-10"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span>{reg}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative min-h-[420px] md:min-h-[520px]"
          >
            <InteractiveMap region={mapRegion.toLowerCase() as 'europe' | 'asia'} />
          </motion.div>

        </div>
      </section>

      {/* SECTION 7: FAQ */}
      <section id="faq" className="py-24 bg-background relative overflow-hidden flex flex-col items-center">
        <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
          
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-main mb-4 leading-tight"
            >
              Vos questions sur le voyage bas carbone avec <span className="text-primary">Slowmundo</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-muted text-base max-w-2xl mx-auto"
            >
              Vous avez des doutes ou des interrogations sur le slow tourisme ? Trouvez des réponses simples et transparentes ici.
            </motion.p>
          </div>

          <div className="space-y-4 mb-14">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * idx }}
                  className="bg-white border-2 border-primary/30 hover:border-primary rounded-2xl overflow-hidden transition-all duration-300 shadow-xs hover:shadow-md"
                >
                  <button 
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between font-bold text-primary text-base md:text-lg focus:outline-none cursor-pointer"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <div className={`w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-90 bg-primary text-white' : ''}`}>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-text-muted text-[15px] md:text-base leading-relaxed border-t border-gray-100/80">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/contact" 
                className="bg-black text-white px-8 py-3.5 rounded-xl font-bold text-[15px] hover:bg-gray-900 transition-all duration-300 shadow-xl inline-flex items-center justify-center"
              >
                <span>Demander mon itinéraire sur mesure</span>
              </Link>
            </motion.div>
          </div>

        </div>
      </section>

    </main>
  );
}
