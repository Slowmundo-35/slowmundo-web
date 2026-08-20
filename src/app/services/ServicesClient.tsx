"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ArrowRight, ChevronLeft, Sparkles, ShieldCheck, 
  MapPin, CheckCircle2, Train, Compass, Clock, HeartHandshake, PhoneCall, FileText 
} from 'lucide-react';
import Link from 'next/link';

const Services = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const faqs = [
    {
      question: "Que se passe-t-il en cas d'annulation ou de retard de train ?",
      answer: "En cas de retard ou d'annulation, nous nous occupons de tout. Notre équipe d'assistance est disponible pour trouver une solution alternative immédiate et minimiser l'impact sur votre voyage."
    },
    {
      question: "Le carnet de voyage est-il disponible sur smartphone ?",
      answer: "Oui, votre carnet de voyage est entièrement digitalisé et accessible depuis votre smartphone via une application dédiée, consultable même hors ligne avec toutes vos réservations et étapes."
    },
    {
      question: "Est-ce que les repas sont inclus dans vos propositions ?",
      answer: "Cela dépend entièrement de vos préférences. Nous pouvons inclure la demi-pension ou pension complète, ou vous laisser libres de vos choix en vous fournissant nos meilleures recommandations gourmandes et éthiques locales."
    },
    {
      question: "Combien de temps à l'avance faut-il vous contacter ?",
      answer: "Nous recommandons de nous contacter 2 à 6 mois avant votre départ pour garantir les meilleures options de train et les hébergements les plus charmants, surtout pour la haute saison."
    },
    {
      question: "Proposez-vous des voyages pour les groupes ou les entreprises ?",
      answer: "Absolument. Nous concevons des itinéraires sur mesure pour les groupes d'amis, les familles nombreuses, ou les séminaires d'entreprise et team building, toujours dans une démarche écoresponsable."
    }
  ];

  const sliderImages = [
    {
      url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop",
      caption: "Transports bas carbone prioritaires (train, ferry)"
    },
    {
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
      caption: "Hébergements écoresponsables sélectionnés avec soin"
    },
    {
      url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
      caption: "Carnet de voyage digital sur-mesure & interactif"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  return (
    <main className="w-full pt-36 md:pt-44 pb-20 min-h-screen font-sans bg-background overflow-hidden">
      
      {/* SECTION 1: HEADER / HERO */}
      <section className="w-full px-6 max-w-4xl mx-auto text-center mb-20 lg:mb-32 relative">

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold text-text-main mb-6 leading-tight tracking-tight"
        >
          Notre méthode : un accompagnement<br className="hidden md:block"/> sur mesure de <span className="text-primary">A à Z</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-base md:text-lg text-text-muted mb-8 leading-relaxed max-w-3xl mx-auto"
        >
          De notre premier échange à votre retour de vacances, Slowmundo s'occupe de l'intégralité des détails logistiques. Découvrez les étapes simples pour donner vie à votre projet écoresponsable, en toute sérénité.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link 
            href="/contact"
            className="bg-black text-white font-bold py-3.5 px-6 md:px-8 rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm md:text-base inline-flex items-center justify-center text-center max-w-[90vw]"
          >
            <span>Planifier mon voyage avec Slowmundo</span>
          </Link>
        </motion.div>
      </section>

      {/* SECTION 2: TIMELINE (ETAPES DE METHODE) */}
      <section className="w-full max-w-6xl mx-auto px-6 mb-28 lg:mb-36 relative">
        <div className="space-y-20 md:space-y-32 relative z-10">
          
          {/* Connecting Line background */}
          <div className="hidden md:block absolute top-[10%] bottom-[10%] left-0 right-0 pointer-events-none -z-10 opacity-30">
            <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none">
              <path d="M 75 0 C 75 16, 25 16, 25 33.33 M 25 33.33 C 25 50, 75 50, 75 66.66 M 75 66.66 C 75 83, 25 83, 25 100" stroke="#064E3B" strokeWidth="0.5" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 relative z-10">
            <div className="w-full md:w-1/2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3.5 py-1.5 rounded-full inline-block mb-4">
                Étape 01 • Premier Échange
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-4 leading-tight">
                1. Partagez vos <span className="text-primary">envies</span> d'évasion
              </h2>
              <p className="text-text-muted text-base leading-relaxed mb-4">
                Remplissez notre questionnaire interactif en quelques clics ou contactez-nous directement par téléphone ou e-mail.
              </p>
              <p className="text-text-muted text-base leading-relaxed mb-6">
                Nous étudions vos aspirations, vos contraintes et votre budget pour comprendre le voyage qui vous ressemble. Ici, aucun jugement : nous nous adaptons à votre propre rythme de transition écoresponsable.
              </p>
              <div className="flex items-center gap-3 text-xs font-bold text-primary">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Sans aucun engagement initial
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="w-full max-w-[400px] mx-auto aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-gray-100 group">
                <img 
                  src="https://images.unsplash.com/photo-1506125840744-167167210587?q=80&w=800&auto=format&fit=crop" 
                  alt="Paysage vu depuis un tunnel" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16 relative z-10">
            <div className="w-full md:w-1/2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3.5 py-1.5 rounded-full inline-block mb-4">
                Étape 02 • Conception Sur-Mesure
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-4 leading-tight">
                2. Donnez vie à votre <span className="text-primary">projet</span>
              </h2>
              <p className="text-text-muted text-base leading-relaxed mb-4">
                Nous concevons une première proposition d'itinéraire sur mesure en Europe ou en Asie.
              </p>
              <p className="text-text-muted text-base leading-relaxed mb-6">
                Nous ajustons ensemble chaque étape, chaque hébergement et chaque mode de transport jusqu'à ce que le programme réponde à 100% à vos attentes.
              </p>
              <div className="flex items-center gap-3 text-xs font-bold text-primary">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Transparence budgétaire totale
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="w-full max-w-[400px] mx-auto aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-gray-100 group">
                <img 
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop" 
                  alt="Préparation et conception d'un itinéraire de voyage" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 relative z-10">
            <div className="w-full md:w-1/2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3.5 py-1.5 rounded-full inline-block mb-4">
                Étape 03 • Réservation & Garantie Agence
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-4 leading-tight">
                3. <span className="text-primary">Partez</span> l'esprit 100% tranquille
              </h2>
              <p className="text-text-muted text-base leading-relaxed mb-4">
                Contrairement à un simple travel planner, Slowmundo est une agence de voyage certifiée qui achète, sécurise et garantit l'intégralité de vos prestations (hébergements, transports, activités).
              </p>
              <p className="text-text-muted text-base leading-relaxed mb-6">
                Vous bénéficiez d'une protection juridique complète et d'un interlocuteur unique pour l'ensemble de votre périple.
              </p>
              <div className="flex items-center gap-3 text-xs font-bold text-primary">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Assurance & Garanties professionnelles
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="w-full max-w-[400px] mx-auto aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-gray-100 group">
                <img 
                  src="https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=800&auto=format&fit=crop" 
                  alt="Rue animée au Japon" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16 relative z-10">
            <div className="w-full md:w-1/2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3.5 py-1.5 rounded-full inline-block mb-4">
                Étape 04 • Sur le terrain
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-4 leading-tight">
                4. Explorez en totale <span className="text-primary">indépendance</span>
              </h2>
              <p className="text-text-muted text-base leading-relaxed mb-4">
                Quelques semaines avant votre départ, vous recevez votre carnet de voyage ultra-détaillé et personnalisé sur votre smartphone.
              </p>
              <p className="text-text-muted text-base leading-relaxed mb-6">
                Sur place, vous avancez en toute liberté, tout en sachant que notre équipe reste réactive et joignable à tout moment en cas d'imprévu.
              </p>
              <div className="flex items-center gap-3 text-xs font-bold text-primary">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Application carnets de voyage offline
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="w-full max-w-[400px] mx-auto aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-gray-100 group">
                <img 
                  src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop" 
                  alt="Temple au Japon" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: CE QUI EST INCLUS */}
      <section className="w-full bg-primary text-white py-24 lg:py-32 px-6 my-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-16 relative z-10">
          
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Ce qui est inclus dans votre formule Slowmundo
            </h2>
            <div className="flex flex-wrap gap-2.5 mb-6">
              <span className="bg-white text-primary px-3.5 py-1 rounded-full font-bold text-xs shadow-xs">Zéro frais cachés</span>
              <span className="bg-white text-primary px-3.5 py-1 rounded-full font-bold text-xs shadow-xs">Garantie agence de voyage</span>
              <span className="bg-white text-primary px-3.5 py-1 rounded-full font-bold text-xs shadow-xs">Assistance voyage 24/7</span>
            </div>
            <p className="text-white/90 text-sm md:text-base mb-8 leading-relaxed">
              Nos tarifs sont totalement transparents et comprennent l'intégralité des prestations sélectionnées ensemble pour votre confort et votre sécurité administrative.
            </p>
            <Link 
              href="/contact"
              className="bg-black text-white font-bold py-3.5 px-7 rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-xl text-base inline-flex items-center justify-center"
            >
              <span>Demander un devis estimatif gratuit</span>
            </Link>
          </div>
          
          {/* Interactive Slide Showcase */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
            <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 bg-black/20">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={sliderImages[currentSlide].url}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                  alt={`Slide ${currentSlide + 1}`}
                />
              </AnimatePresence>

              {/* Controls Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-4 pointer-events-none">
                <div className="flex justify-between pointer-events-auto">
                  <button 
                    onClick={prevSlide}
                    className="w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md cursor-pointer transition-all"
                    aria-label="Slide précédente"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md cursor-pointer transition-all"
                    aria-label="Slide suivante"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-xs text-white/90 font-bold bg-black/60 p-2.5 rounded-xl backdrop-blur-xs text-center border border-white/10">
                  {sliderImages[currentSlide].caption}
                </div>
              </div>
            </div>

            {/* Slide Dots */}
            <div className="flex gap-2 mt-4">
              {sliderImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === currentSlide ? 'bg-white w-6' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: FAQ */}
      <section className="w-full py-20 px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-6 leading-tight">
            Des questions sur notre <span className="text-primary">fonctionnement</span> ?
          </h2>
          
          <div className="space-y-3.5 mb-14 text-left">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * idx }}
                  className="bg-white border-2 border-primary/20 hover:border-primary rounded-2xl overflow-hidden transition-all duration-300 shadow-xs hover:shadow-md"
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
                        <div className="px-6 pb-5 pt-1 text-text-muted text-[15px] leading-relaxed border-t border-gray-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <Link 
            href="/contact"
            className="bg-black text-white font-bold py-3.5 px-8 rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-xl text-base inline-flex items-center justify-center"
          >
            <span>Lancer mon projet avec Slowmundo</span>
          </Link>
        </div>
      </section>

      {/* SECTION 5: CTA FINAL */}
      <section className="w-full max-w-6xl mx-auto px-6 mb-24 lg:mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-primary text-white rounded-[2.8rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative border border-primary/20"
        >
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          <div className="w-full md:w-5/12 h-64 md:h-auto relative">
             <img 
               src="https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=800&auto=format&fit=crop" 
               alt="Tramway en ville" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-primary/80 to-transparent" />
          </div>

          <div className="w-full md:w-7/12 p-8 md:p-12 lg:p-14 flex flex-col justify-center relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 mb-3">Voyagez Autrement</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Prêt à tenter l'expérience du slow tourisme ?
            </h2>
            <p className="text-white/90 text-sm md:text-base mb-8 leading-relaxed max-w-lg">
              Ensemble, dessinons un itinéraire sur mesure qui respecte vos valeurs et votre budget.
            </p>
            <form 
              className="flex flex-col sm:flex-row gap-3 w-full max-w-md" 
              onSubmit={(e) => {
                e.preventDefault();
                alert('Merci ! Notre catalogue a été envoyé à votre adresse e-mail.');
                (e.target as HTMLFormElement).reset();
              }}
            >
              <input 
                type="email" 
                placeholder="Votre adresse e-mail" 
                className="flex-1 px-4 py-3.5 rounded-xl text-text-main focus:outline-none focus:ring-2 focus:ring-black" 
                required 
              />
              <button 
                type="submit" 
                className="bg-black text-white font-bold py-3.5 px-6 md:px-7 rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-xl text-sm md:text-base whitespace-nowrap inline-flex items-center justify-center text-center"
              >
                <span>Télécharger notre catalogue</span>
              </button>
            </form>
          </div>
        </motion.div>
      </section>

    </main>
  );
};

export default Services;
