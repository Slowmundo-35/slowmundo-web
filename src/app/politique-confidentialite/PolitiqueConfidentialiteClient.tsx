"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PolitiqueConfidentialite() {
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
          Politique de Confidentialité
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm space-y-8 text-text-main leading-relaxed"
        >
          <div>
            <h2 className="text-xl font-bold mb-4">1. Collecte des données personnelles</h2>
            <p>
              Dans le cadre de l'utilisation de nos services, Slowmundo peut être amené à collecter des données personnelles (nom, prénom, adresse e-mail, numéro de téléphone, préférences de voyage) via nos formulaires de contact.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">2. Utilisation des données</h2>
            <p>
              Les données collectées sont utilisées exclusivement pour :
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Le traitement de vos demandes de devis et la conception de votre voyage</li>
              <li>La gestion de la relation client</li>
              <li>L'envoi de communications liées à nos services, si vous y avez consenti</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">3. Protection des données</h2>
            <p>
              Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour garantir la sécurité et la confidentialité de vos données personnelles, afin d'empêcher leur altération, destruction ou accès par des tiers non autorisés.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">4. Droits des utilisateurs</h2>
            <p>
              Conformément à la réglementation applicable (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Vous pouvez exercer ces droits en nous contactant à l'adresse suivante : contact@slowmundo.fr
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">5. Cookies</h2>
            <p>
              Notre site utilise des cookies essentiels pour assurer son bon fonctionnement. Nous utilisons également des cookies d'analyse d'audience pour améliorer votre expérience utilisateur. Vous pouvez paramétrer vos préférences concernant ces cookies à tout moment.
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
