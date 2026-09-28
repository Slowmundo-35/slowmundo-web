"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Leaf, MapPin, Clock, ArrowRight } from "lucide-react";
import type { Trip } from "@/data/trips";
import { getTripCountries, getTripUrl } from "@/data/trips";

type Props = {
  styleName: string;
  trips: Trip[];
};

export default function StyleVoyageClient({ styleName, trips }: Props) {
  return (
    <main className="flex-1 w-full bg-background pt-32 md:pt-40 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Retour à l&apos;accueil
        </Link>

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Leaf className="w-5 h-5 text-primary" />
            <span className="text-primary font-bold uppercase tracking-widest text-sm">
              Styles de voyage
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-text-main leading-tight"
          >
            {styleName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-text-muted max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Parcourez nos itinéraires bas carbone pensés pour ce style
            d&apos;exploration.
          </motion.p>
        </div>

        {trips.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="max-w-xl mx-auto mt-12 text-center bg-white rounded-2xl p-10 shadow-sm border border-gray-100"
          >
            <p className="text-text-main text-lg font-semibold mb-3">
              Aucun itinéraire dans ce style pour le moment.
            </p>
            <p className="text-text-muted mb-6 leading-relaxed">
              Notre catalogue s&apos;étoffe en continu. En attendant, parcourez
              tous nos voyages ou demandez-nous un itinéraire sur mesure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/voyages"
                className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all"
              >
                Voir tous les voyages
              </Link>
              <Link
                href="/contact"
                className="bg-white text-primary border border-primary px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all"
              >
                Demander un itinéraire sur mesure
              </Link>
            </div>
          </motion.div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip, index) => {
            const countries = getTripCountries(trip);
            return (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <Link href={getTripUrl(trip)} className="flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 z-20 flex gap-2 flex-wrap">
                      <span className="bg-white/90 backdrop-blur-sm text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {countries.join(" · ")}
                      </span>
                      {trip.transport && (
                        <span className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          {trip.transport}
                        </span>
                      )}
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
                        {countries.join(", ")}
                      </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-sm font-bold text-text-main">
                        Découvrir l&apos;itinéraire
                      </span>
                      <ArrowRight className="w-5 h-5 text-primary transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
        )}
      </div>
    </main>
  );
}
