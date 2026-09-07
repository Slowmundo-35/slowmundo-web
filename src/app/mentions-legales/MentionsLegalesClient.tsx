"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MentionsLegales() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full pt-32 md:pt-40 pb-16 min-h-screen bg-[#FBFBFB]">
      <section className="max-w-4xl mx-auto px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold text-text-main mb-8 md:mb-10"
        >
          Mentions Légales
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm space-y-8 text-text-main leading-relaxed"
        >
          <div>
            <h2 className="text-xl font-bold mb-4">1. Éditeur du site</h2>
            <p>
              Le site <strong>Slowmundo</strong> est édité par :<br />
              Slowmundo SAS<br />
              Capital social : 10 000 €<br />
              RCS Rennes B 123 456 789<br />
              Siège social : 1 Rue de la Paix, 35000 Rennes, France<br />
              Directeur de la publication : Alexis Jupin
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">2. Hébergement</h2>
            <p>
              Le site est hébergé par :<br />
              Google Cloud Platform<br />
              8 rue de Londres, 75009 Paris, France
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">3. Propriété intellectuelle</h2>
            <p>
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">4. Contact</h2>
            <p>
              Pour toute question ou demande concernant le site, vous pouvez nous contacter :<br />
              Par email : contact@slowmundo.fr<br />
              Par téléphone : 06 76 37 18 39
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
