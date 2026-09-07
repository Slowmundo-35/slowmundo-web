"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Leaf, MapPin } from "lucide-react";
import type { Trip } from "@/data/trips";
import { getTripSlug } from "@/data/trips";

interface CountryClientProps {
  countrySlug: string;
  countryName: string;
  trips: Trip[];
}

export default function CountryClient({ countrySlug, countryName, trips }: CountryClientProps) {

  return (
    <main className="w-full pt-32 md:pt-40 pb-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <Link
          href="/voyages"
          className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à tous les voyages
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-main">
            Voyages en <span className="text-primary">{countryName}</span>
          </h1>
          <p className="text-lg text-text-muted mb-12 max-w-2xl">
            {trips.length === 0
              ? `Aucun itinéraire prédéfini n'est encore disponible en ${countryName}. Contactez-nous pour créer votre voyage sur mesure.`
              : trips.length === 1
                ? `Notre itinéraire bas carbone en ${countryName}, imaginé pour voyager slow.`
                : `Nos ${trips.length} itinéraires bas carbone en ${countryName}, imaginés pour voyager slow.`}
          </p>
        </motion.div>

        {trips.length === 0 ? (
          <div className="text-center py-12">
            <Link
              href="/contact"
              className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Créer un voyage sur mesure
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                <Link href={`/voyages/${countrySlug}/${getTripSlug(trip)}`} className="flex flex-col h-full">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-text-main text-xs font-bold px-3 py-1.5 rounded-full">
                      À partir de {trip.price}€
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow p-6">
                    <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{trip.country}</span>
                      <span>•</span>
                      <span>{trip.type}</span>
                    </div>
                    <h3 className="text-lg font-bold text-text-main mb-3 leading-snug flex-grow">
                      {trip.title}
                    </h3>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
                        <Clock className="w-3.5 h-3.5" />
                        {trip.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold">
                        <Leaf className="w-3.5 h-3.5" />
                        Bas carbone
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-primary font-semibold mt-6 group-hover:gap-3 transition-all">
                      Voir l&apos;itinéraire
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
