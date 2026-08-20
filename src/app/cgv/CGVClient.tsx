"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CGV() {
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
          Conditions Générales de Vente
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm space-y-8 text-text-main leading-relaxed"
        >
          <div>
            <h2 className="text-xl font-bold mb-4">1. Préambule</h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) s'appliquent à l'ensemble des prestations de services proposées par Slowmundo, spécialisée dans la création de voyages sur mesure bas carbone.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">2. Réservation et Inscription</h2>
            <p>
              Toute demande de réservation doit être formulée par écrit ou via notre formulaire de contact. La réservation n'est définitive qu'après versement d'un acompte de 30% du montant total du voyage et l'acceptation expresse des présentes CGV.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">3. Prix et Modalités de Paiement</h2>
            <p>
              Les prix sont exprimés en euros et TTC. Le solde du voyage doit être réglé au plus tard 30 jours avant la date du départ. En cas d'inscription à moins de 30 jours du départ, la totalité du montant est exigible à l'inscription.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">4. Annulation par le Client</h2>
            <p>
              Toute annulation doit être notifiée par écrit. Les frais d'annulation varient selon la date d'annulation par rapport au départ :
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Plus de 60 jours avant le départ : 10% du prix total</li>
              <li>De 59 à 30 jours : 30% du prix total</li>
              <li>De 29 à 15 jours : 50% du prix total</li>
              <li>Moins de 15 jours : 100% du prix total</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">5. Responsabilité</h2>
            <p>
              Slowmundo s'engage à sélectionner les meilleurs prestataires pour votre voyage. Toutefois, nous ne saurions être tenus responsables des retards de transports ou modifications de programme indépendants de notre volonté (météo, grèves, événements politiques...).
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
