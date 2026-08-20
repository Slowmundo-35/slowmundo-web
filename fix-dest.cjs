const fs = require('fs');
let code = fs.readFileSync('src/pages/Destination.tsx', 'utf8');

const replacement = `import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Leaf, Clock, ArrowRight } from 'lucide-react';
import { TRIPS } from '../data/trips';
import { slugify } from '../utils/slugify';
import { countryTranslations } from '../data/countries';

const allowedCountries = [
  "Belgique", "Pays-Bas", "Allemagne", "Suisse", "Autriche", "Liechtenstein", 
  "Slovénie", "Slovaquie", "Pologne", "Tchéquie", "Albanie", "Grèce", 
  "Espagne", "Portugal", "Islande", "Angleterre", "Irlande",
  "Inde", "Japon", "Vietnam", "Malaisie"
];
const allowedSlugs = allowedCountries.map(c => slugify(c));

export default function Destination() {
  const { countrySlug } = useParams();
  const navigate = useNavigate();
  
  const isAllowed = allowedSlugs.includes(countrySlug || '');

  // Find the real country name from translations if possible, otherwise use the slug as fallback
  let countryName = countrySlug || '';
  Object.values(countryTranslations).forEach(name => {
    if (slugify(name) === countrySlug) {
      countryName = name;
    }
  });

  const destinationTrips = TRIPS.filter(trip => slugify(trip.country) === countrySlug);
  const continent = destinationTrips.length > 0 ? destinationTrips[0].continent : '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [countrySlug]);

  if (!isAllowed) {
    return (
      <main className="w-full pt-32 pb-24 min-h-screen font-sans bg-[#FBFBFB]">
        {/* Header Section */}
        <section className="w-full px-6 max-w-4xl mx-auto text-center mb-16">
          <Link to="/" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8 font-medium">
            <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-text-main leading-[1.2] mb-6 capitalize"
          >
            Vous souhaitez voyager en <span className="text-primary">{countryName}</span> ?
          </motion.h1>
          <p className="text-text-muted max-w-2xl mx-auto text-lg leading-relaxed">
            Nous n'avons pas encore d'itinéraires prédéfinis pour cette destination, mais nous pouvons créer votre voyage sur mesure ! Remplissez le formulaire ci-dessous.
          </p>
        </section>

        {/* Simplified Form Section */}
        <section className="w-full px-6 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-primary rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl"
          >
            <form onSubmit={(e) => {
              e.preventDefault();
              alert('Merci ! Votre demande pour ' + countryName + ' a bien été envoyée. Nous vous recontacterons très vite.');
              navigate('/');
            }} className="space-y-4 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="nom" className="block text-sm font-medium">Nom <span className="text-red-400">*</span></label>
                  <input type="text" id="nom" required className="w-full px-3 py-2 text-sm rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-black/50" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="prenom" className="block text-sm font-medium">Prénom <span className="text-red-400">*</span></label>
                  <input type="text" id="prenom" required className="w-full px-3 py-2 text-sm rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-black/50" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">Adresse mail <span className="text-red-400">*</span></label>
                  <input type="email" id="email" required className="w-full px-3 py-2 text-sm rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-black/50" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="telephone" className="block text-sm font-medium">Téléphone <span className="text-red-400">*</span></label>
                  <input type="tel" id="telephone" required className="w-full px-3 py-2 text-sm rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-black/50" />
                </div>
              </div>
              
              <div className="space-y-2 w-full pt-2">
                <label htmlFor="projet" className="block text-sm font-medium">Parlez-nous de votre projet <span className="text-red-400">*</span></label>
                <textarea id="projet" required rows={4} className="w-full px-3 py-2 text-sm rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-black/50"></textarea>
              </div>

              <div className="pt-6 pb-2">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-start pt-1">
                    <input type="checkbox" required className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer" />
                  </div>
                  <span className="text-[13px] md:text-[14px] text-white/90 leading-relaxed">
                    En soumettant ce formulaire, j'accepte que les informations saisies soient utilisées pour me recontacter concernant mon projet de voyage.
                  </span>
                </label>
              </div>

              <div className="text-left w-full mt-4">
                <button type="submit" className="bg-black text-white px-6 py-2.5 rounded-lg font-bold text-[15px] hover:bg-gray-900 transition-all duration-300 shadow-md">
                  Envoyer la demande
                </button>
              </div>
            </form>
          </motion.div>
        </section>
      </main>
    );
  }
`;

code = code.replace(/import \{ useEffect \} from 'react';\nimport \{ useParams, Link \} from 'react-router-dom';\nimport \{ motion \} from 'framer-motion';\nimport \{ ArrowLeft, MapPin, Leaf, Clock, ArrowRight \} from 'lucide-react';\nimport \{ TRIPS \} from '\.\.\/data\/trips';\nimport \{ slugify \} from '\.\.\/utils\/slugify';\n\nexport default function Destination\(\) \{\n  const \{ countrySlug \} = useParams\(\);\n  \n  const destinationTrips = TRIPS\.filter\(trip => slugify\(trip\.country\) === countrySlug\);\n  const countryName = destinationTrips\.length > 0 \? destinationTrips\[0\]\.country : countrySlug;\n  const continent = destinationTrips\.length > 0 \? destinationTrips\[0\]\.continent : '';\n\n  useEffect\(\(\) => \{\n    window\.scrollTo\(0, 0\);\n  \}, \[countrySlug\]\);\n\n  if \(destinationTrips\.length === 0\) \{\n    return \(\n      <div className="pt-32 pb-24 text-center">\n        <h1 className="text-2xl font-bold mb-4">Destination introuvable<\/h1>\n        <Link to="\/voyages" className="text-primary hover:underline">\n          Retour à la liste des voyages\n        <\/Link>\n      <\/div>\n    \);\n  \}/, replacement);

fs.writeFileSync('src/pages/Destination.tsx', code);
