"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Leaf, MapPin, Clock, ArrowRight } from 'lucide-react';
import { TRIPS } from '@/data/trips';
import { slugify } from '@/utils/slugify';

export default function StyleVoyage() {
  const { styleSlug } = useParams<{ styleSlug: string }>();
  
  const styleTrips = TRIPS.filter(trip => slugify(trip.type) === styleSlug);
  const styleName = styleTrips.length > 0 ? styleTrips[0].type : styleSlug;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [styleSlug]);

  if (styleTrips.length === 0) {
    return (
      <div className="pt-48 md:pt-56 pb-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Style introuvable</h1>
        <Link href="/voyages" className="text-primary hover:underline">
          Retour à la liste des voyages
        </Link>
      </div>
    );
  }

  return (
    <main className="flex-1 w-full bg-background pt-32 md:pt-40 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-6 font-medium">
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Leaf className="w-5 h-5 text-primary" />
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Styles de Voyage</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-text-main leading-tight capitalize"
          >
            {styleName}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-muted max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Parcourez nos suggestions d'itinéraires spécialement pensées pour ce style d'exploration.
          </motion.p>
        </div>

        {/* Trips List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {styleTrips.map((trip, index) => (
            <motion.div 
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              <Link href={`/voyages/${slugify(trip.country)}/${slugify(trip.title)}`} className="flex flex-col h-full">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                  <img 
                    src={trip.image} 
                    alt={trip.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-sm text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {trip.country}
                    </span>
                    <span className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {trip.transport}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-text-main mb-3 group-hover:text-primary transition-colors">
                    {trip.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-text-muted mb-6">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {trip.duration}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-primary" />
                      {trip.country}
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm font-bold text-text-main">Découvrir l'itinéraire</span>
                    <ArrowRight className="w-5 h-5 text-primary transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
