"use client";

import React, { useState, useMemo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { Train, Bus, Ship, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { countryTranslations } from '@/data/countries';
import { slugify } from '@/utils/slugify';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

interface InteractiveMapProps {
  region: 'europe' | 'asia';
}

const europeCountries = [
  "Iceland", "United Kingdom", "France", "Spain", "Portugal", "Germany", "Italy", 
  "Switzerland", "Austria", "Belgium", "Netherlands", "Luxembourg", 
  "Ireland", "Norway", "Sweden", "Finland", "Denmark", 
  "Poland", "Czechia", "Slovakia", "Hungary", "Slovenia", "Croatia", 
  "Bosnia and Herz.", "Serbia", "Montenegro", "Albania", "Macedonia", 
  "Greece", "Bulgaria", "Romania", "Andorra", "Monaco", "Liechtenstein", 
  "San Marino", "Vatican", "Kosovo", "Jersey", "Guernsey", "Isle of Man", "Malta"
];

const asiaCountries = [
  "China", "Macao", "Hong Kong", "India", "Japan", "South Korea", "North Korea", 
  "Mongolia", "Taiwan", "Vietnam", "Thailand", "Myanmar", "Cambodia", 
  "Laos", "Philippines", "Malaysia", "Indonesia", "Singapore", "Brunei", 
  "Timor-Leste", "Nepal", "Bhutan", "Bangladesh", "Sri Lanka", "Maldives", 
  "Pakistan", "Afghanistan", "Iran", "Iraq", "Syria", "Lebanon", "Israel", 
  "Palestine", "Jordan", "Saudi Arabia", "Yemen", "Oman", "United Arab Emirates", 
  "Qatar", "Bahrain", "Kuwait", "Kazakhstan", "Uzbekistan", "Turkmenistan", 
  "Kyrgyzstan", "Tajikistan", "Turkey", "Georgia", "Armenia", "Azerbaijan"
];

export default function InteractiveMap({ region }: InteractiveMapProps) {
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const router = useRouter();

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const projectionConfig = useMemo(() => {
    return region === 'europe' 
      ? { scale: 650, center: [12, 54] as [number, number] } // Zoom in on West Europe, but keep Nordics
      : { scale: 280, center: [90, 35] as [number, number] }; // Asia
  }, [region]);

  const targetCountries = region === 'europe' ? europeCountries : asiaCountries;
  const projectionType = "geoMercator";

  return (
    <div 
      className="relative w-full h-[420px] md:h-[520px] flex items-center justify-center overflow-hidden rounded-3xl"
      onMouseMove={handleMouseMove}
    >
      {/* Top and Bottom Fades */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />

      {/* Region Indicator Badge */}
      <div className="absolute top-4 left-6 z-30 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={region}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-gray-200/80 shadow-xs text-xs font-bold text-text-main"
          >
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>{region === 'europe' ? 'Réseau Européen' : 'Réseau Asiatique'}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decorative dashed lines connecting floating icons (boat, bus, train) */}
      <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
        <svg className="w-full h-full absolute inset-0 text-primary pointer-events-none" viewBox="0 0 1000 500" preserveAspectRatio="none">
          <path d="M 800 125 Q 660 110 520 200" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="8, 8" strokeLinecap="round" opacity="0.35" />
          <path d="M 112 200 Q 250 140 450 230" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="8, 8" strokeLinecap="round" opacity="0.35" />
          <path d="M 710 380 Q 600 400 480 310" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="8, 8" strokeLinecap="round" opacity="0.35" />
        </svg>

        {/* Floating Icons */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[23%] right-[12%] w-12 h-12 bg-white border-2 border-primary rounded-xl flex items-center justify-center text-primary shadow-md z-10"
        >
          <Train strokeWidth={2} className="w-6 h-6" />
        </motion.div>

        <motion.div 
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[35%] left-[5%] w-11 h-11 bg-white border-2 border-primary rounded-xl flex items-center justify-center text-primary shadow-md z-10"
        >
          <Bus strokeWidth={2} className="w-5 h-5" />
        </motion.div>

        <motion.div 
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-[14%] right-[20%] w-14 h-14 bg-white border-2 border-primary rounded-xl flex items-center justify-center text-primary shadow-md z-10"
        >
          <Ship strokeWidth={2} className="w-8 h-8" />
        </motion.div>
      </div>

      <div className="w-full h-full relative z-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={region}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: { 
                duration: 0.65, 
                ease: [0.16, 1, 0.3, 1],
                opacity: { duration: 0.5, ease: "easeOut" }
              } 
            }}
            exit={{ 
              opacity: 0, 
              scale: 1.02, 
              y: -8,
              transition: { duration: 0.25, ease: "easeIn" } 
            }}
            className="w-full h-full flex items-center justify-center"
          >
            <ComposableMap
              projection={projectionType}
              projectionConfig={projectionConfig}
              width={800}
              height={600}
              style={{ width: "100%", height: "100%" }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies
                    .filter(geo => targetCountries.includes(geo.properties.name))
                    .map((geo) => {
                      const isAsia = region === 'asia';
                      const baseFill = isAsia ? "#1F2937" : "#107C54";
                      const hoverFill = isAsia ? "#374151" : "#0B5C3E";
                      const pressedFill = isAsia ? "#111827" : "#08422C";
                      const strokeColor = isAsia ? "#4B5563" : "#1B9A6C";

                      const frenchName = countryTranslations[geo.properties.name] || geo.properties.name;
                      const isOffered = [
                        "France", "Italie", "Royaume-Uni", "Macédoine du Nord",
                        "Belgique", "Pays-Bas", "Allemagne", "Suisse", "Autriche", "Liechtenstein", 
                        "Slovénie", "Slovaquie", "Pologne", "Tchéquie", "Albanie", "Grèce", 
                        "Espagne", "Portugal", "Islande", "Irlande",
                        "Inde", "Japon", "Vietnam", "Malaisie"
                      ].includes(frenchName);

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          className={`transition-colors duration-300 outline-none ${isOffered ? 'cursor-pointer' : 'cursor-default'}`}
                          onMouseEnter={() => {
                            if (isOffered) setTooltipContent(frenchName);
                          }}
                          onMouseLeave={() => setTooltipContent('')}
                          onClick={() => {
                            if (isOffered) router.push(`/voyages/${slugify(frenchName)}`);
                          }}
                          style={{
                            default: {
                              fill: isOffered ? baseFill : "#e5e7eb",
                              stroke: isOffered ? strokeColor : "#d1d5db",
                              strokeWidth: 0.6,
                              outline: "none"
                            },
                            hover: {
                              fill: isOffered ? hoverFill : "#e5e7eb",
                              stroke: isOffered ? "#ffffff" : "#d1d5db",
                              strokeWidth: isOffered ? 1.2 : 0.6,
                              outline: "none",
                              cursor: isOffered ? "pointer" : "default"
                            },
                            pressed: {
                              fill: isOffered ? pressedFill : "#e5e7eb",
                              outline: "none"
                            }
                          }}
                        />
                      );
                  })
                }
              </Geographies>
            </ComposableMap>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {tooltipContent && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.15 }}
          className="fixed bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-xl font-bold text-text-main text-sm pointer-events-none z-50 border border-gray-100 flex items-center gap-1.5"
          style={{ top: tooltipPos.y - 15, left: tooltipPos.x - 15, transform: 'translate(-100%, -100%)' }}
        >
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span>{tooltipContent}</span>
        </motion.div>
      )}
    </div>
  );
}
