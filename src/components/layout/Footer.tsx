"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, MapPin, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"newsletter" | "brochure">("newsletter");

  const openModal = (type: "newsletter" | "brochure", e: React.MouseEvent) => {
    e.preventDefault();
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    alert("Merci ! Votre demande a été prise en compte.");
    closeModal();
  };
  return (
    <footer className="bg-primary text-white py-16 px-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-10">

        {/* Brand Column */}
        <div className="lg:col-span-2 flex flex-col items-start pr-8">
          <Link href="/" className="flex flex-col items-center mb-6">
            <div className="flex items-center text-[1.8rem] md:text-3xl font-bold tracking-widest leading-none text-white gap-1.5">
              <div className="flex items-center">
                <span>SL</span>
                <span className="relative flex items-center justify-center w-6 mx-1">
                  <MapPin className="absolute w-[1.6rem] h-[1.6rem] md:w-7 md:h-7 stroke-[2.5] text-white" />
                </span>
                <span>W</span>
              </div>
              <span>MUNDO</span>
            </div>
            <span className="text-[15px] md:text-base tracking-wide mt-2 text-white">Voyager autrement</span>
          </Link>
          <p className="text-white/90 text-sm leading-relaxed mt-4">
            Agence de voyage bas carbone basée à Rennes. Voyagez à votre rythme, l&apos;esprit libre.
          </p>
        </div>

        {/* Pages principales */}
        <div>
          <h4 className="text-[16px] font-semibold mb-6 underline underline-offset-4 decoration-white/50">Navigation</h4>
          <ul className="space-y-4 text-[15px] text-white/90">
            <li><Link href="/voyages" className="hover:text-white transition-colors">Voyages</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link href="/a-propos" className="hover:text-white transition-colors">A Propos</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Destinations */}
        <div>
          <h4 className="text-[16px] font-semibold mb-6 underline underline-offset-4 decoration-white/50">Top destinations</h4>
          <ul className="space-y-4 text-[15px] text-white/90">
            <li><Link href="/voyages/italie" className="hover:text-white transition-colors">Italie</Link></li>
            <li><Link href="/voyages/suisse" className="hover:text-white transition-colors">Suisse</Link></li>
            <li><Link href="/voyages/allemagne" className="hover:text-white transition-colors">Allemagne</Link></li>
            <li><Link href="/voyages/espagne" className="hover:text-white transition-colors">Espagne</Link></li>
          </ul>
        </div>

        {/* Nos ressources */}
        <div>
          <h4 className="text-[16px] font-semibold mb-6 underline underline-offset-4 decoration-white/50">Inspirations</h4>
          <ul className="space-y-4 text-[15px] text-white/90">
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><a href="#" onClick={(e) => openModal("brochure", e)} className="hover:text-white transition-colors">Brochure</a></li>
          </ul>
        </div>

        {/* Pages légales */}
        <div>
          <h4 className="text-[16px] font-semibold mb-6 underline underline-offset-4 decoration-white/50">Informations pratiques</h4>
          <ul className="space-y-4 text-[15px] text-white/90">
            <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
            <li><Link href="/cgv" className="hover:text-white transition-colors">Conditions générales de vente</Link></li>
            <li><Link href="/politique-confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link></li>
            <li><Link href="/#faq" className="hover:text-white transition-colors">F.A.Q</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[16px] font-semibold mb-6 underline underline-offset-4 decoration-white/50">Contact</h4>
          <ul className="space-y-4 text-[15px] text-white/90">
            <li><a href="tel:0676371839" className="hover:text-white transition-colors">06 76 37 18 39</a></li>
            <li><a href="mailto:alexisjupin@gmail.com" className="hover:text-white transition-colors">alexisjupin@gmail.com</a></li>
          </ul>
          <div className="flex gap-4 mt-6">
            <a href="#" className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center hover:bg-gray-100 transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5 fill-current" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center hover:bg-gray-100 transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full relative z-10 shadow-xl"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-primary transition-colors bg-gray-100 rounded-full"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-text-main mb-2">
                  {modalType === "newsletter" ? "S'inscrire à la newsletter" : "Recevoir le brochure"}
                </h3>
                <p className="text-text-main/70 text-sm leading-relaxed">
                  {modalType === "newsletter"
                    ? "Rejoignez notre communauté et recevez nos meilleures idées d'itinéraires bas carbone."
                    : "Indiquez votre adresse e-mail pour recevoir gratuitement notre brochure du voyageur slow."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">Adresse e-mail</label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-main"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
                >
                  {modalType === "newsletter" ? "Je m'inscris" : "Recevoir le document"}
                </button>
              </form>
              <p className="text-xs text-text-main/50 text-center mt-4">
                Vos données sont en sécurité. Désinscription possible à tout moment.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
