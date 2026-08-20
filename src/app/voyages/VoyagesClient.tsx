"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Select from '@/components/ui/Select';
import { TRIPS, getStoredTrips } from '@/data/trips';
import { slugify } from '@/utils/slugify';

function getDaysCount(durationStr: string): number {
  if (!durationStr) return 7;
  if (durationStr.toLowerCase().includes('weekend')) return 3;
  if (durationStr.includes('1 semaine')) return 7;
  if (durationStr.includes('2 semaines')) return 14;
  if (durationStr.includes('3 semaines')) return 21;
  if (durationStr.includes('4 semaines')) return 28;
  const match = durationStr.match(/(\d+)\s*jour/i);
  if (match) return parseInt(match[1], 10);
  return 7;
}

function matchesDurationFilter(durationStr: string, filterVal: string): boolean {
  if (filterVal === 'Toutes') return true;
  const days = getDaysCount(durationStr);
  if (filterVal === '6 à 10 jours') return days >= 6 && days <= 10;
  if (filterVal === '11 à 15 jours') return days >= 11 && days <= 15;
  if (filterVal === '16 à 20 jours') return days >= 16 && days <= 20;
  if (filterVal === 'Plus de 20 jours') return days > 20;
  return true;
}

export default function Voyages() {
  
  const searchParams = useSearchParams();
  const urlCountry = searchParams?.get('country') ?? null;
  const urlType = searchParams?.get('type') ?? null;

  const [filterRegion, setFilterRegion] = useState(() => {
    if (urlCountry) {
      const trip = TRIPS.find(t => t.country === urlCountry);
      if (trip) return trip.continent;
    }
    if (urlType) {
      const trip = TRIPS.find(t => t.type === urlType);
      if (trip) return trip.continent;
    }
    return 'Tout';
  });
  const [filterCountry, setFilterCountry] = useState(urlCountry || 'Toutes');
  const [filterType, setFilterType] = useState(urlType || 'Tous');
  const [filterDuration, setFilterDuration] = useState('Toutes');

  // We could also do an effect to sync URL changes if the user navigates while on the same page
  useEffect(() => {
    if (urlCountry) {
      setFilterCountry(urlCountry);
      const trip = TRIPS.find(t => t.country === urlCountry);
      if (trip) setFilterRegion(trip.continent);
    }
    if (urlType) {
      setFilterType(urlType);
      const trip = TRIPS.find(t => t.type === urlType);
      if (trip && !urlCountry) setFilterRegion(trip.continent);
    }
  }, [urlCountry, urlType]);


  const allTrips = getStoredTrips();
  const filteredTrips = allTrips.filter(trip => {
    if (filterRegion !== 'Tout' && trip.continent !== filterRegion) return false;
    if (filterCountry !== 'Toutes' && trip.country !== filterCountry) return false;
    if (filterType !== 'Tous' && trip.type !== filterType) return false;
    if (filterDuration !== 'Toutes' && !matchesDurationFilter(trip.duration, filterDuration)) return false;
    return true;
  });

  const allowedEurope = ["France", "Italie", "Royaume-Uni", "Macédoine du Nord", "Belgique", "Pays-Bas", "Allemagne", "Suisse", "Autriche", "Liechtenstein", "Slovénie", "Slovaquie", "Pologne", "Tchéquie", "Albanie", "Grèce", "Espagne", "Portugal", "Islande", "Irlande"];
  const allowedAsia = ["Inde", "Japon", "Vietnam", "Malaisie"];

  const uniqueCountries = filterRegion === 'Europe' 
    ? [...allowedEurope].sort()
    : filterRegion === 'Asie'
      ? [...allowedAsia].sort()
      : [...allowedEurope, ...allowedAsia].sort();

  // Reset country when region changes
  const handleRegionChange = (region: string) => {
    if (region !== filterRegion) {
      setFilterRegion(region);
      setFilterCountry('Toutes');
    }
  };

  return (
    <main className="flex-1 w-full bg-background pt-36 md:pt-44 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-text-main leading-tight"
          >
            Explorez le monde,<br/>préservez l'avenir.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-muted max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Découvrez nos itinéraires conçus avec soin pour vous offrir un dépaysement total tout en limitant votre empreinte carbone.
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16"
        >
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto max-w-4xl px-6 md:px-0">
            <Select 
              value={filterRegion}
              onChange={handleRegionChange}
              options={[
                { value: 'Tout', label: 'Tout' },
                { value: 'Europe', label: 'Europe' },
                { value: 'Asie', label: 'Asie' }
              ]}
              displayValue={filterRegion === 'Tout' ? 'Continent' : filterRegion}
              className="w-full md:min-w-[160px]"
              buttonClassName="w-full bg-white border border-gray-200 text-text-main px-4 md:px-6 py-3 md:py-2.5 rounded-xl md:rounded-full font-semibold hover:border-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm flex items-center justify-between text-sm"
            />

            <Select 
              value={filterCountry}
              onChange={setFilterCountry}
              options={[
                { value: 'Toutes', label: 'Toutes' },
                ...uniqueCountries.map(c => ({ value: c, label: c }))
              ]}
              displayValue={filterCountry === 'Toutes' ? 'Destination' : filterCountry}
              className="w-full md:min-w-[200px]"
              buttonClassName="w-full bg-white border border-gray-200 text-text-main px-4 md:px-6 py-3 md:py-2.5 rounded-xl md:rounded-full font-semibold hover:border-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm flex items-center justify-between text-sm"
            />

            <Select 
              value={filterType}
              onChange={setFilterType}
              options={[
                { value: 'Tous', label: 'Tous' },
                { value: 'Culturel', label: 'Culturel' },
                { value: 'Familial', label: 'Familial' },
                { value: 'Romantique', label: 'Romantique' },
                { value: 'Sportif', label: 'Sportif' },
                { value: 'Nature & Aventure', label: 'Nature & Aventure' },
                { value: 'Solo & Amis', label: 'Solo & Amis' }
              ]}
              displayValue={filterType === 'Tous' ? 'Type' : filterType}
              className="w-full md:min-w-[160px]"
              buttonClassName="w-full bg-white border border-gray-200 text-text-main px-4 md:px-6 py-3 md:py-2.5 rounded-xl md:rounded-full font-semibold hover:border-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm flex items-center justify-between text-sm"
            />

            <Select 
              value={filterDuration}
              onChange={setFilterDuration}
              options={[
                { value: 'Toutes', label: 'Toutes' },
                { value: '6 à 10 jours', label: '6 à 10 jours' },
                { value: '11 à 15 jours', label: '11 à 15 jours' },
                { value: '16 à 20 jours', label: '16 à 20 jours' },
                { value: 'Plus de 20 jours', label: 'Plus de 20 jours' }
              ]}
              displayValue={filterDuration === 'Toutes' ? 'Durée' : filterDuration}
              className="w-full md:min-w-[180px]"
              buttonClassName="w-full bg-white border border-gray-200 text-text-main px-4 md:px-6 py-3 md:py-2.5 rounded-xl md:rounded-full font-semibold hover:border-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm flex items-center justify-between text-sm"
            />
          </div>
        </motion.div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 mb-24">
          <AnimatePresence mode="popLayout">
            {filteredTrips.map((card, idx) => (
              <motion.div 
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer flex flex-col h-full"
              >
                <Link href={`/voyages/${slugify(card.country)}/${slugify(card.title)}`} className="flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-md mb-6">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                    
                    {/* Top-left Badges: Price & Duration */}
                    <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
                      <span className="bg-white/95 backdrop-blur-md text-text-main text-sm font-bold px-3.5 py-2 rounded-full shadow-md border border-gray-100 flex items-center gap-1">
                        À partir de <span className="text-primary font-extrabold text-base">{card.price}€</span>
                      </span>
                      <span className="bg-white/95 backdrop-blur-md text-text-main text-sm font-bold px-3.5 py-2 rounded-full shadow-md border border-gray-100">
                        {card.duration}
                      </span>
                    </div>

                    <img 
                      src={card.image} 
                      alt={card.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Text content */}
                  <div className="flex flex-col flex-grow px-2">
                    <h3 className="text-2xl font-bold text-text-main mb-3 group-hover:text-primary transition-colors">
                      {card.title}
                    </h3>
                    
                    {/* Destination & Type de voyage matching top filters */}
                    <div className="flex flex-wrap items-center gap-2 text-text-muted text-sm font-medium mt-auto">
                      <div className="flex items-center gap-1.5 text-text-main font-semibold">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        {card.country}
                      </div>
                      <span className="text-gray-300">•</span>
                      <div className="text-primary font-bold text-xs bg-primary/10 px-2.5 py-1 rounded-full">
                        {card.type}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredTrips.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center text-text-muted text-lg bg-white rounded-[2rem] shadow-sm px-8"
            >
              {allTrips.length === 0 ? (
                <>
                  <p className="mb-2 text-text-main font-semibold text-xl">Nos itinéraires arrivent bientôt.</p>
                  <p className="mb-6 max-w-xl mx-auto">
                    Chaque voyage Slowmundo est conçu sur mesure. Parlez-nous de votre envie, on construit votre itinéraire bas carbone avec vous.
                  </p>
                  <Link href="/contact" className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                    Créer mon voyage sur mesure
                  </Link>
                </>
              ) : filterCountry !== 'Toutes' ? (
                <>
                  <p className="mb-4">Aucun itinéraire prédéfini n&apos;est encore disponible pour : {filterCountry}.</p>
                  <Link href="/contact" className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">
                    Créer un voyage sur mesure
                  </Link>
                </>
              ) : (
                "Aucun voyage ne correspond à vos critères. Essayez de modifier vos filtres."
              )}
            </motion.div>
          )}
        </div>

        {/* Bottom CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-primary text-white rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
        >
          {/* Decorative background shape */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          {/* Photo side */}
          <div className="w-full md:w-5/12 h-48 md:h-auto relative">
             <img 
               src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop" 
               alt="Vue spectaculaire sur un lac de montagne"
               className="w-full h-full object-cover"
             />
          </div>

          {/* Content side */}
          <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative z-10">
            <h2 className="font-bold mb-4 md:mb-6 leading-tight text-3xl">
              Prêt à créer votre propre aventure ?
            </h2>
            <p className="text-white/90 text-[15px] md:text-base mb-6 md:mb-8 leading-relaxed max-w-lg">
              Si nos inspirations ne correspondent pas exactement à vos envies, nous pouvons créer un itinéraire sur-mesure rien que pour vous.
            </p>
            <Link 
              href="/contact"
              className="inline-block bg-black text-white font-bold py-2.5 px-6 rounded-lg hover:bg-gray-900 transition-all duration-300 shadow-md hover:shadow-lg text-base w-fit"
            >
              Demander un devis personnalisé
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
