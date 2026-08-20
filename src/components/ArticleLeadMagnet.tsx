"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { 
  Calculator, 
  Train, 
  Plane, 
  Leaf, 
  Download, 
  Mail, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  MapPin,
  BookOpen
} from 'lucide-react';

// 1. Carbon Simulator Widget
export function CarbonSimulatorWidget() {
  const [route, setRoute] = useState<'paris-vienne' | 'paris-barcelone' | 'paris-berlin' | 'paris-rome'>('paris-vienne');
  const [passengers, setPassengers] = useState(2);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const routeData = {
    'paris-vienne': {
      name: 'Paris ➔ Vienne',
      distance: '1 240 km',
      trainCo2: 4,
      planeCo2: 120,
      time: '14h en train de nuit'
    },
    'paris-barcelone': {
      name: 'Paris ➔ Barcelone',
      distance: '1 050 km',
      trainCo2: 3.5,
      planeCo2: 110,
      time: '6h45 en TGV InOui'
    },
    'paris-berlin': {
      name: 'Paris ➔ Berlin',
      distance: '1 080 km',
      trainCo2: 3.8,
      planeCo2: 105,
      time: '8h en train rapide'
    },
    'paris-rome': {
      name: 'Paris ➔ Rome',
      distance: '1 420 km',
      trainCo2: 5,
      planeCo2: 145,
      time: '12h en train + correspondance'
    }
  };

  const current = routeData[route];
  const trainTotal = Math.round(current.trainCo2 * passengers * 10) / 10;
  const planeTotal = Math.round(current.planeCo2 * passengers * 10) / 10;
  const savedCo2 = Math.round((planeTotal - trainTotal) * 10) / 10;
  const treesEquivalent = Math.round(savedCo2 / 20); // ~20kg CO2 per tree per year

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="not-prose my-10 bg-gradient-to-br from-primary/5 via-primary/10 to-emerald-50/50 rounded-3xl p-6 sm:p-8 border border-primary/20 shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-primary">Simulateur Interactif</span>
          <h3 className="text-xl font-bold text-text-main">Calculez votre économie de CO₂ en train</h3>
        </div>
      </div>

      <p className="text-sm text-text-main/80 mb-6 leading-relaxed">
        Comparez l'impact environnemental réel entre le voyage en train et en avion pour vos prochaines vacances en Europe.
      </p>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-text-main mb-1.5">Choisissez un itinéraire :</label>
          <select 
            value={route} 
            onChange={(e) => setRoute(e.target.value as any)}
            className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-text-main focus:outline-none focus:border-primary"
          >
            <option value="paris-vienne">Paris ➔ Vienne (Nightjet)</option>
            <option value="paris-barcelone">Paris ➔ Barcelone (TGV)</option>
            <option value="paris-berlin">Paris ➔ Berlin (ICE / Nightjet)</option>
            <option value="paris-rome">Paris ➔ Rome (TGV + Frecciarossa)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-main mb-1.5">Nombre de voyageurs : {passengers}</label>
          <input 
            type="range" 
            min="1" 
            max="6" 
            value={passengers} 
            onChange={(e) => setPassengers(Number(e.target.value))}
            className="w-full accent-primary mt-2 cursor-pointer"
          />
        </div>
      </div>

      {/* Comparison Visual */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs mb-6">
        <div className="space-y-4">
          {/* Train Bar */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold mb-1.5">
              <span className="flex items-center gap-1.5 text-primary">
                <Train className="w-4 h-4" /> En Train ({current.time})
              </span>
              <span className="text-primary font-extrabold">{trainTotal} kg CO₂</span>
            </div>
            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.max(4, (trainTotal / planeTotal) * 100)}%` }}
              />
            </div>
          </div>

          {/* Plane Bar */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold mb-1.5">
              <span className="flex items-center gap-1.5 text-gray-500">
                <Plane className="w-4 h-4" /> En Avion
              </span>
              <span className="text-gray-600">{planeTotal} kg CO₂</span>
            </div>
            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
              <div className="bg-red-400 h-full rounded-full w-full" />
            </div>
          </div>
        </div>

        {/* Total Saved Badge */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 bg-emerald-50/60 p-3.5 rounded-xl">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs font-bold text-emerald-900">
              Économie de CO₂ : <strong className="text-sm font-extrabold text-emerald-700">{savedCo2} kg</strong>
            </span>
          </div>
          <span className="text-xs text-emerald-800 font-medium">
            🌳 Soit l'équivalent de <strong>{treesEquivalent} arbre(s)</strong> préservé(s) pendant un an !
          </span>
        </div>
      </div>

      {/* Lead capture form */}
      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-primary/15">
          <p className="text-xs font-semibold text-text-main mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-primary" />
            Recevez la fiche itinéraire détaillée + conseils de réservation par e-mail :
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              required 
              placeholder="Votre adresse email..." 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-primary text-text-main"
            />
            <button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shrink-0 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Recevoir le guide</span>
            </button>
          </div>
        </form>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-100 border border-emerald-300 text-emerald-900 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium"
        >
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold">Merci ! Votre fiche itinéraire a été envoyée à {email}.</p>
            <p className="text-xs text-emerald-800 mt-0.5">Vérifiez votre boîte de réception pour télécharger le dossier complet.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// 2. Brochure Download Magnet
export function BrochureDownloadWidget({ title = "Guide Gratuit du Voyageur Bas Carbone", description = "Téléchargez notre brochure exclusive avec plus de 20 itinéraires en train, astuces de réservation et hébergements engagés en Europe." }: { title?: string; description?: string }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="not-prose my-10 bg-gradient-to-r from-text-main to-gray-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
          <BookOpen className="w-10 h-10 text-primary" />
        </div>

        <div className="flex-1 text-center md:text-left">
          <span className="inline-block bg-primary text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            Brochure Offerte (PDF)
          </span>
          <h3 className="text-xl sm:text-2xl font-bold mb-2 leading-tight">{title}</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">{description}</p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-lg">
              <input 
                type="email" 
                required 
                placeholder="Entrez votre email..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md shrink-0"
              >
                <Mail className="w-4 h-4" />
                <span>Recevoir par mail</span>
              </button>
            </form>
          ) : (
            <div className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 p-3.5 rounded-xl flex items-center gap-3 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Brochure envoyée avec succès à <strong>{email}</strong> !</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 3. Internal Maillage Banner Card
export function InternalTripBanner({ 
  title, 
  subtitle, 
  buttonText = "Découvrir les voyages", 
  linkUrl = "/voyages",
  imageUrl = "https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?q=80&w=800&auto=format&fit=crop"
}: { 
  title: string; 
  subtitle: string; 
  buttonText?: string; 
  linkUrl?: string;
  imageUrl?: string;
}) {
  return (
    <div className="not-prose my-8 rounded-2xl overflow-hidden relative shadow-lg group border border-gray-100 flex flex-col md:flex-row min-h-[180px]">
      <div className="md:w-5/12 relative min-h-[180px] w-full self-stretch overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover !m-0 !p-0 group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 md:from-transparent via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="md:w-7/12 bg-primary/10 p-6 sm:p-8 flex flex-col justify-center items-start text-text-main">
        <div className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>Séjours Slowmundo</span>
        </div>
        <h4 className="text-lg font-bold mb-2 leading-tight text-text-main">{title}</h4>
        <p className="text-xs sm:text-sm text-text-main/80 mb-4 leading-relaxed">{subtitle}</p>
        
        <Link
          href={linkUrl}
          className="no-underline inline-flex items-center gap-2 bg-primary text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all shadow-xs group-hover:shadow-md"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
