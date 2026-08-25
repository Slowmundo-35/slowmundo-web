"use client";

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { 
  Sparkles, Leaf, ShieldCheck, HeartHandshake, Compass, 
  MapPin, CheckCircle2, ArrowRight, ArrowLeft, Award, Train, Users, Clock
} from 'lucide-react';

export default function APropos() {
  return (
    <main className="flex-1 w-full bg-background pt-36 md:pt-44 pb-20 overflow-hidden">
      
      {/* SECTION 1: HERO */}
      <section className="w-full max-w-7xl mx-auto px-6 mb-24 lg:mb-32 relative">
        {/* Soft Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-primary/5 blur-3xl pointer-events-none -z-10" />

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-text-main leading-[1.15] mb-6 tracking-tight">
              L'art de <span className="text-primary relative inline-block">
                voyager
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-primary/30 pointer-events-none" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M 0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span> autrement
            </h1>

            <div className="space-y-5 text-text-muted text-base md:text-lg leading-relaxed mb-8">
              <p>
                Derrière Slowmundo, il y a une conviction profonde : celle que l'on peut explorer notre planète avec passion sans pour autant compromettre son avenir. Je m'appelle Alexis. Grand voyageur et amoureux des grands espaces, j'ai fondé cette agence pour mettre mon expérience du terrain au service de vos envies d'évasion.
              </p>
              <p>
                Mon rôle ? Concevoir pour vous des itinéraires fluides, immersifs et respectueux de l'environnement, sans aucun jugement sur votre manière de voyager.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link 
                href="/contact"
                className="bg-black text-white font-bold py-3.5 px-7 rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base inline-flex items-center justify-center gap-2.5"
              >
                <span>Planifier mon voyage avec Alexis</span>
              </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200/80">
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-extrabold text-primary">20+</span>
                <span className="text-xs md:text-sm font-medium text-text-muted">Destinations maîtrisées</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-extrabold text-primary">15 ans</span>
                <span className="text-xs md:text-sm font-medium text-text-muted">D'expérience terrain</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-extrabold text-primary">100%</span>
                <span className="text-xs md:text-sm font-medium text-text-muted">Sur-mesure & Serein</span>
              </div>
            </div>

          </motion.div>

          {/* Right Image Frame with Floating Badges */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-[360px] xl:w-[420px] relative shrink-0 mx-auto lg:mx-0"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl border-4 border-white bg-gray-100">
              <img
                src="/img/slowmundo/alexis-portrait.webp"
                alt="Alexis, fondateur de Slowmundo, agence de voyage bas carbone à Rennes"
                className="w-full h-full object-cover"
              />
            </div>

          </motion.div>
        </div>
      </section>

      {/* SECTION 2: UN NOUVEAU REGARD */}
      <section className="w-full max-w-7xl mx-auto px-6 mb-28 lg:mb-36 relative">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-main leading-tight">
            Un nouveau <span className="text-primary">regard</span> sur l'organisation de vos séjours
          </h2>
        </div>

        <div className="relative w-full max-w-6xl xl:max-w-7xl mx-auto">
          
          {/* Main Hero Photo */}
          <div className="w-full lg:w-[480px] xl:w-[580px] mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3] xl:aspect-[16/9] border-4 border-white bg-gray-100 relative group">
            <img
              src="/img/slowmundo/train-europe.webp"
              alt="Train de voyage en Europe — slow tourisme éco responsable Slowmundo"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Callout Texts - Desktop layout (located strictly in side margins OUTSIDE the image frame) */}
          <div className="hidden lg:block">
            
            {/* Top Left Callout */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="absolute top-4 left-0 xl:-left-2 w-[260px] xl:w-[320px] z-20"
            >
              <div className="flex items-center gap-3">
                <p className="text-text-main font-semibold text-xs xl:text-sm leading-relaxed flex-1">
                  Pas de circuit figé ni de groupe imposé. Votre voyage s'adapte à 100% à votre rythme et à vos envies.
                </p>
                <svg className="w-16 h-10 xl:w-24 xl:h-14 text-black shrink-0 overflow-visible" viewBox="0 0 60 30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 2 8 C 20 4, 40 8, 55 20" />
                  <path d="M 43 18 L 55 20 L 51 8" />
                </svg>
              </div>
            </motion.div>

            {/* Bottom Left Callout */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="absolute bottom-4 left-0 xl:-left-2 w-[260px] xl:w-[320px] z-20"
            >
              <div className="flex items-center gap-3">
                <p className="text-text-main font-semibold text-xs xl:text-sm leading-relaxed flex-1">
                  Basé près de Rennes, avec la possibilité de se rencontrer en personne ou en visio si vous êtes ailleurs.
                </p>
                <svg className="w-16 h-10 xl:w-24 xl:h-14 text-black shrink-0 overflow-visible" viewBox="0 0 60 30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 2 22 C 20 26, 40 22, 55 10" />
                  <path d="M 43 12 L 55 10 L 51 22" />
                </svg>
              </div>
            </motion.div>

            {/* Right Center Callout */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="absolute top-1/2 right-0 xl:-right-2 w-[260px] xl:w-[320px] transform -translate-y-1/2 z-20"
            >
              <div className="flex items-center gap-3">
                <svg className="w-16 h-10 xl:w-24 xl:h-14 text-black shrink-0 overflow-visible" viewBox="0 0 60 30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 58 15 C 40 10, 20 12, 5 15" />
                  <path d="M 17 7 L 5 15 L 17 23" />
                </svg>
                <p className="text-text-main font-semibold text-xs xl:text-sm leading-relaxed flex-1">
                  Transparence tarifaire totale : vous savez exactement ce que vous payez, sans frais cachés.
                </p>
              </div>
            </motion.div>

          </div>

          {/* Callout Texts - Mobile layout (without white cards, with curved black arrows pointing to concept) */}
          <div className="lg:hidden mt-8 space-y-5 max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <svg className="w-10 h-10 text-black shrink-0 mt-0.5 overflow-visible" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 8 15 C 28 8, 45 18, 50 42" />
                <path d="M 38 40 L 50 42 L 46 30" />
              </svg>
              <p className="text-text-main font-semibold text-sm leading-relaxed">
                Pas de circuit figé ni de groupe imposé. Votre voyage s'adapte à 100% à votre rythme et à vos envies.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-10 h-10 text-black shrink-0 mt-0.5 overflow-visible" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 8 15 C 28 8, 45 18, 50 42" />
                <path d="M 38 40 L 50 42 L 46 30" />
              </svg>
              <p className="text-text-main font-semibold text-sm leading-relaxed">
                Basé près de Rennes, avec la possibilité de se rencontrer en personne ou en visio si vous êtes ailleurs.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-10 h-10 text-black shrink-0 mt-0.5 overflow-visible" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 8 15 C 28 8, 45 18, 50 42" />
                <path d="M 38 40 L 50 42 L 46 30" />
              </svg>
              <p className="text-text-main font-semibold text-sm leading-relaxed">
                Transparence tarifaire totale : vous savez exactement ce que vous payez, sans frais cachés.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: ENGAGEMENTS */}
      <section className="w-full bg-primary text-white py-24 lg:py-32 px-6 my-20 relative overflow-hidden">
        {/* Soft blur shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 lg:mb-20 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Des engagements concrets pour un tourisme positif
            </h2>
            <p className="text-white/90 text-base md:text-lg leading-relaxed">
              Parce que concevoir des voyages sur mesure ne suffit pas, Slowmundo s'appuie sur trois valeurs clés pour guider chacune de vos aventures.
            </p>
          </motion.div>

          {/* 3 Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-left">
            {[
              {
                num: '01',
                icon: Leaf,
                title: "L'Environnement au centre",
                text: "Nous privilégions le train pour l'Europe et des séjours plus longs et immersifs pour l'Asie afin de réduire considérablement l'empreinte carbone globale."
              },
              {
                num: '02',
                icon: HeartHandshake,
                title: "La Bienveillance & Le Non-jugement",
                text: "Le voyage durable est un cheminement personnel. Nous vous accompagnons là où vous en êtes dans votre transition, avec une écoute positive et attentive."
              },
              {
                num: '03',
                icon: ShieldCheck,
                title: "La Responsabilité globale",
                text: "Nous ne sommes pas de simples conseillers : nous achetons, sécurisons et garantissons chaque prestation pour vous offrir une autonomie 100% sereine."
              }
            ].map((item, index) => {
              const IconComp = item.icon;
              return (
                <motion.div 
                  key={item.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white text-text-main rounded-[2.2rem] p-8 md:p-10 flex flex-col shadow-2xl hover:-translate-y-1 transition-transform duration-300 relative border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-xl shadow-md">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-extrabold text-primary/20">{item.num}</span>
                  </div>
                  <h3 className="text-xl font-bold text-text-main mb-4">
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-sm md:text-base leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
          >
            <Link 
              href="/contact"
              className="bg-black text-white font-bold py-3.5 px-8 rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 text-base inline-flex items-center justify-center"
            >
              <span>Organiser mon voyage avec Slowmundo</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: CTA FINAL */}
      <section className="w-full max-w-6xl mx-auto px-6 mb-24 lg:mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-primary text-white rounded-[2.8rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative border border-primary/20"
        >
          {/* Decorative background shape */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          {/* Photo side */}
          <div className="w-full md:w-5/12 h-64 md:h-auto relative">
             <img 
               src="https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=800&auto=format&fit=crop" 
               alt="Tramway en ville" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-primary/80 to-transparent" />
          </div>

          {/* Content side */}
          <div className="w-full md:w-7/12 p-8 md:p-12 lg:p-14 flex flex-col justify-center relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 mb-3">Commençons l'aventure</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              Prêt à tenter l'expérience du slow tourisme ?
            </h2>
            <p className="text-white/90 text-sm md:text-base mb-8 leading-relaxed max-w-lg">
              Ensemble, dessinons un itinéraire sur mesure qui respecte vos valeurs, vos envies et votre budget.
            </p>
            <Link 
              href="/contact"
              className="bg-black text-white font-bold py-3.5 px-6 md:px-7 rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-xl text-sm md:text-base w-fit inline-flex items-center justify-center text-center max-w-[90vw]"
            >
              <span>Demander mon carnet de voyage sur mesure</span>
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
