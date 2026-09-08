"use client";

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import Select from './ui/Select';

interface TripContactFormProps {
  country: string;
  tripTitle?: string;
}

function getCountryGrammar(country: string): string {
  const c = country.trim();
  if (/^[AEIOUÉÈIÔ]/i.test(c)) {
    return `en ${c}`;
  }
  const masculineCountries = ['Japon', 'Portugal', 'Vietnam', 'Royaume-Uni', 'Mexique'];
  if (masculineCountries.includes(c)) {
    return `au ${c}`;
  }
  return `en ${c}`;
}

export const TripContactForm: React.FC<TripContactFormProps> = ({ country, tripTitle }) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    nombrePersonnes: '2',
    residence: 'Bretagne',
    message: '',
    // Honeypot — must stay empty. Hidden from real users via CSS.
    website: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
          source: 'trip',
          firstName: formData.prenom,
          lastName: formData.nom,
          email: formData.email,
          phone: formData.telephone,
          tripCountry: country,
          tripTitle,
          groupSize: formData.nombrePersonnes,
          residence: formData.residence,
          message: formData.message,
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

  const prep = getCountryGrammar(country);

  if (submitted) {
    return (
      <div className="w-full bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-text-main">
          Votre demande pour {country} a bien été transmise !
        </h3>
        <p className="text-text-muted max-w-md mx-auto text-sm md:text-base leading-relaxed">
          Merci {formData.prenom} ! Notre équipe prépare votre proposition sur-mesure et vous recontactera sous 24 à 48 heures.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-xs font-bold text-primary hover:underline uppercase tracking-wider"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100/80">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-main mb-3 leading-tight">
          Prêt à partir {prep} ?
        </h2>
        <p className="text-text-muted text-sm md:text-base leading-relaxed">
          Remplissez ce formulaire et nous concevrons ensemble votre voyage sur-mesure {prep}.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto" noValidate>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Nom */}
          <div className="space-y-1.5">
            <label htmlFor="nom" className="block text-xs font-bold text-text-main uppercase tracking-wider">
              Nom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              required
              placeholder="Votre nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm rounded-xl text-text-main bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>

          {/* Prénom */}
          <div className="space-y-1.5">
            <label htmlFor="prenom" className="block text-xs font-bold text-text-main uppercase tracking-wider">
              Prénom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              required
              placeholder="Votre prénom"
              value={formData.prenom}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm rounded-xl text-text-main bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>

          {/* Adresse mail */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-bold text-text-main uppercase tracking-wider">
              Adresse mail <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="votre.email@exemple.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm rounded-xl text-text-main bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>

          {/* Téléphone */}
          <div className="space-y-1.5">
            <label htmlFor="telephone" className="block text-xs font-bold text-text-main uppercase tracking-wider">
              Téléphone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              required
              placeholder="06 12 34 56 78"
              value={formData.telephone}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm rounded-xl text-text-main bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>

          {/* Nombre de personnes */}
          <div className="space-y-1.5">
            <label htmlFor="nombrePersonnes" className="block text-xs font-bold text-text-main uppercase tracking-wider">
              Nombre de personnes <span className="text-red-500">*</span>
            </label>
            <Select
              value={formData.nombrePersonnes}
              onChange={(val) => setFormData((prev) => ({ ...prev, nombrePersonnes: val }))}
              options={[
                { value: '1', label: '1 personne (Solo)' },
                { value: '2', label: '2 personnes (Duo)' },
                { value: '3', label: '3 personnes' },
                { value: '4', label: '4 personnes (Famille / Amis)' },
                { value: '5', label: '5 personnes' },
                { value: '6+', label: '6 personnes ou plus' },
              ]}
              buttonClassName="w-full px-4 py-3 text-sm rounded-xl text-text-main bg-gray-50 border border-gray-200 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium flex items-center justify-between"
            />
          </div>

          {/* Bretagne ou Hors Bretagne */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-text-main uppercase tracking-wider">
              Région de résidence <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2 pt-0.5">
              <label
                className={`flex items-center justify-center py-2.5 px-3 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                  formData.residence === 'Bretagne'
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-gray-50 text-text-main border-gray-200 hover:bg-gray-100'
                }`}
              >
                <input
                  type="radio"
                  name="residence"
                  value="Bretagne"
                  checked={formData.residence === 'Bretagne'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span>Bretagne</span>
              </label>

              <label
                className={`flex items-center justify-center py-2.5 px-3 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                  formData.residence === 'Hors Bretagne'
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-gray-50 text-text-main border-gray-200 hover:bg-gray-100'
                }`}
              >
                <input
                  type="radio"
                  name="residence"
                  value="Hors Bretagne"
                  checked={formData.residence === 'Hors Bretagne'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span>Hors Bretagne</span>
              </label>
            </div>
          </div>
        </div>

        {/* Zone de texte pour détailler son voyage */}
        <div className="space-y-1.5 pt-2">
          <label htmlFor="message" className="block text-xs font-bold text-text-main uppercase tracking-wider">
            Détails de votre voyage <span className="text-gray-400 font-normal font-sans">(Optionnel)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Détaillez vos souhaits, dates envisagées, préférences d'étapes ou questions particulières..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 text-sm rounded-xl text-text-main bg-gray-50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-y"
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="text-center text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {/* Submit button */}
        <div className="text-center pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2.5 bg-primary text-white px-8 py-3.5 rounded-xl font-bold text-sm md:text-base hover:bg-primary-hover transition-all shadow-lg hover:shadow-xl w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            <span>{submitting ? 'Envoi en cours…' : 'Envoyer ma demande de voyage'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
