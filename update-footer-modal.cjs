const fs = require('fs');
let code = fs.readFileSync('src/components/layout/Footer.tsx', 'utf8');

code = code.replace(
  "import { Link } from 'react-router-dom';\nimport { Facebook, Instagram, MapPin } from 'lucide-react';",
  "import { useState } from 'react';\nimport { Link } from 'react-router-dom';\nimport { Facebook, Instagram, MapPin, X } from 'lucide-react';\nimport { motion, AnimatePresence } from 'motion/react';"
);

const modalStateStr = `  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'newsletter' | 'cahier'>('newsletter');

  const openModal = (type: 'newsletter' | 'cahier', e: React.MouseEvent) => {
    e.preventDefault();
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    alert('Merci ! Votre demande a été prise en compte.');
    closeModal();
  };`;

code = code.replace(
  'export default function Footer() {\n  return (',
  `export default function Footer() {\n${modalStateStr}\n  return (`
);

const modalHtmlStr = `      {/* Modal */}
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
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-text-main mb-2">
                  {modalType === 'newsletter' ? 'S\\'inscrire à la newsletter' : 'Recevoir le cahier de bord'}
                </h3>
                <p className="text-text-main/70 text-sm leading-relaxed">
                  {modalType === 'newsletter' 
                    ? 'Rejoignez notre communauté et recevez nos meilleures idées d\\'itinéraires bas carbone.'
                    : 'Indiquez votre adresse e-mail pour recevoir gratuitement notre cahier de bord du voyageur slow.'}
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
                  {modalType === 'newsletter' ? 'Je m\\'inscris' : 'Recevoir le document'}
                </button>
              </form>
              <p className="text-xs text-text-main/50 text-center mt-4">
                Vos données sont en sécurité. Désinscription possible à tout moment.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>`;

code = code.replace(
  '    </footer>',
  modalHtmlStr
);

code = code.replace(
  '<li><Link to="#" className="hover:text-white transition-colors">Cahier de bord</Link></li>',
  '<li><a href="#" onClick={(e) => openModal(\'cahier\', e)} className="hover:text-white transition-colors">Cahier de bord</a></li>'
);

code = code.replace(
  '<li><Link to="#" className="hover:text-white transition-colors">Newsletter</Link></li>',
  '<li><a href="#" onClick={(e) => openModal(\'newsletter\', e)} className="hover:text-white transition-colors">Newsletter</a></li>'
);

fs.writeFileSync('src/components/layout/Footer.tsx', code);
