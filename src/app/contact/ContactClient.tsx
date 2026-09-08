"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Select from '@/components/ui/Select';
import MultiSelect from '@/components/ui/MultiSelect';

const EUROPE_COUNTRIES = [
  'France',
  'Italie',
  'Royaume-Uni',
  'Macédoine du Nord',
  'Belgique',
  'Pays-Bas',
  'Allemagne',
  'Suisse',
  'Autriche',
  'Liechtenstein',
  'Slovénie',
  'Slovaquie',
  'Pologne',
  'Tchéquie',
  'Albanie',
  'Grèce',
  'Espagne',
  'Portugal',
  'Islande',
  'Irlande',
];

const ASIA_COUNTRIES = ['Inde', 'Japon', 'Vietnam', 'Malaisie'];

const ALL_COUNTRIES = [...EUROPE_COUNTRIES, ...ASIA_COUNTRIES].sort();

export default function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    continent: 'Europe',
    destinations: [] as string[],
    projet: '',
    consentement: false,
    // Honeypot — must stay empty.
    website: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'contact',
          firstName: formData.prenom,
          lastName: formData.nom,
          email: formData.email,
          phone: formData.telephone,
          continent: formData.continent,
          destinations: formData.destinations,
          message: formData.projet,
          consent: formData.consentement,
          website: formData.website,
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      setSubmitted(true);
    } catch (err) {
      console.error('Contact submit failed:', err);
      setError(
        "Une erreur est survenue lors de l'envoi. Merci de réessayer, ou de nous écrire directement à contact@slowmundo.fr"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleContinentChange = (newContinent: string) => {
    setFormData(prev => {
      let updatedDestinations = prev.destinations;
      if (newContinent === 'Europe') {
        updatedDestinations = prev.destinations.filter(d => EUROPE_COUNTRIES.includes(d));
      } else if (newContinent === 'Asie') {
        updatedDestinations = prev.destinations.filter(d => ASIA_COUNTRIES.includes(d));
      }
      return {
        ...prev,
        continent: newContinent,
        destinations: updatedDestinations
      };
    });
  };

  const removeDestination = (dest: string) => {
    setFormData(prev => ({
      ...prev,
      destinations: prev.destinations.filter(d => d !== dest)
    }));
  };

  const getAvailableCountries = () => {
    if (formData.continent === 'Europe') return EUROPE_COUNTRIES;
    if (formData.continent === 'Asie') return ASIA_COUNTRIES;
    return ALL_COUNTRIES;
  };

  return (
    <main className="w-full pt-32 md:pt-40 pb-20 min-h-screen font-sans bg-primary text-white">
      {/* Header Section */}
      <section className="w-full px-6 max-w-4xl mx-auto text-center mb-6 md:mb-8 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
        >
          Prêt à concevoir votre <span className="text-white/80 font-serif italic">échappée</span> ?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Dites-moi tout sur vos envies d'évasion bas carbone. Nous construirons ensemble l'itinéraire parfait.
        </motion.p>
      </section>

      {/* Form Section - White Card Container */}
      <section className="w-full px-6 max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white text-text-main rounded-[2.5rem] p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-5 lg:gap-12 items-stretch shadow-2xl border border-white/20"
        >
          {/* Image Side */}
          <div className="w-full lg:w-5/12 min-h-[200px] sm:min-h-[300px] lg:min-h-[500px] flex">
            <div className="h-full rounded-3xl overflow-hidden shadow-md w-full relative">
              <img 
                src="https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?q=80&w=800&auto=format&fit=crop" 
                alt="Voyageur en train" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
                <p className="text-white text-sm font-medium leading-snug">
                  "Chaque voyage commence par un premier échange. Hâte de vous lire !"
                  <br /><span className="text-xs text-white/80 font-semibold">— Alexis, Fondateur de Slowmundo</span>
                </p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-4 w-full" noValidate>
              {/* Honeypot: hidden from real users, catches naive bots. */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
                <label htmlFor="website">Ne pas remplir</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nom */}
                <div className="space-y-1.5">
                  <label htmlFor="nom" className="block text-sm font-semibold text-text-main">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    required
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl text-text-main bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>

                {/* Prénom */}
                <div className="space-y-1.5">
                  <label htmlFor="prenom" className="block text-sm font-semibold text-text-main">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    required
                    value={formData.prenom}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl text-text-main bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>

                {/* Adresse mail */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-sm font-semibold text-text-main">
                    Adresse mail <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl text-text-main bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>

                {/* Téléphone */}
                <div className="space-y-1.5">
                  <label htmlFor="telephone" className="block text-sm font-semibold text-text-main">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    required
                    value={formData.telephone}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl text-text-main bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>

              {/* Continent et Destination(s) principale(s) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* Continent souhaité */}
                <div className="space-y-1.5">
                  <label htmlFor="continent" className="block text-sm font-semibold text-text-main">
                    Continent souhaité <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.continent}
                    onChange={handleContinentChange}
                    options={[
                      { value: 'Europe', label: 'Europe' },
                      { value: 'Asie', label: 'Asie' },
                      { value: 'Tout', label: 'Tout' },
                    ]}
                    buttonClassName="w-full px-3.5 py-2.5 text-sm rounded-xl text-text-main bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary font-medium flex items-center justify-between"
                  />
                </div>

                {/* Destination(s) principale(s) */}
                <div className="space-y-1.5">
                  <label htmlFor="destination" className="block text-sm font-semibold text-text-main">
                    Destination(s) principale(s) <span className="text-red-500">*</span>
                  </label>
                  <MultiSelect
                    values={formData.destinations}
                    onChange={(vals) =>
                      setFormData((prev) => ({ ...prev, destinations: vals }))
                    }
                    placeholder="Sélectionner une ou plusieurs destinations"
                    options={getAvailableCountries().map((c) => ({ value: c, label: c }))}
                    buttonClassName="w-full px-3.5 py-2.5 text-sm rounded-xl text-text-main bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary font-medium flex items-center justify-between"
                  />
                </div>
              </div>

              {/* Badges des destinations sélectionnées */}
              {formData.destinations.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1 pb-1">
                  {formData.destinations.map((dest) => (
                    <span
                      key={dest}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20"
                    >
                      <span>{dest}</span>
                      <button
                        type="button"
                        onClick={() => removeDestination(dest)}
                        className="hover:bg-primary/20 rounded-full p-0.5 transition-colors cursor-pointer"
                        aria-label={`Supprimer ${dest}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Dites-moi en plus */}
              <div className="space-y-1.5 w-full pt-1">
                <label htmlFor="projet" className="block text-sm font-semibold text-text-main">
                  Dites-moi en plus
                </label>
                <textarea
                  id="projet"
                  name="projet"
                  rows={4}
                  value={formData.projet || ''}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl text-text-main bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder="Dates estimées, nombre de voyageurs, activités souhaitées..."
                />
              </div>

              {/* Checkbox Consentement */}
              <div className="pt-3 pb-1">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="consentement"
                    required
                    checked={formData.consentement}
                    onChange={handleChange}
                    className="w-5 h-5 mt-0.5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer shrink-0"
                  />
                  <span className="text-xs md:text-sm text-text-muted leading-relaxed">
                    En soumettant ce formulaire, j'accepte que les informations saisies soient utilisées par Slowmundo pour me recontacter et concevoir mon voyage.
                  </span>
                </label>
              </div>

              {/* Error message */}
              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              {/* Success message (inline — the form stays visible below) */}
              {submitted && !error && (
                <div className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                  ✅ Merci ! Votre demande a bien été envoyée. Nous vous recontacterons sous 24 à 48 heures.
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting || submitted}
                  className="w-full sm:w-auto bg-primary text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Envoi en cours…' : submitted ? 'Demande envoyée' : 'Envoyer la demande'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
