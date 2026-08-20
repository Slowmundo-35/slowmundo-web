const fs = require('fs');
let code = fs.readFileSync('src/pages/VoyageDetails.tsx', 'utf8');

// Add useState to imports
code = code.replace(/import \{ useEffect \} from 'react';/, "import { useEffect, useState } from 'react';");
code = code.replace(/const trip = TRIPS.find/, "const [showFullItinerary, setShowFullItinerary] = useState(false);\n  const trip = TRIPS.find");
code = code.replace(/import \{ ArrowLeft, MapPin, Clock, Train, ArrowRight, Camera, Check, X, Star, Home \} from 'lucide-react';/, "import { ArrowLeft, MapPin, Clock, Train, ArrowRight, Camera, Check, X, Star, Home, ChevronDown, ChevronUp, Download, Map } from 'lucide-react';");

const newItinerarySection = `<div className="mb-12">
                <h3 className="text-2xl font-bold mb-8 text-text-main">Aperçu de l'itinéraire</h3>
                <div className="space-y-8 relative">
                  {trip.itinerary.slice(0, showFullItinerary ? trip.itinerary.length : 3).map((step, idx) => (
                    <div key={idx} className="flex gap-6 relative">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shrink-0 z-10 relative">
                          {step.day}
                        </div>
                        {idx !== (showFullItinerary ? trip.itinerary.length : 3) - 1 && (
                          <div className="absolute top-12 bottom-[-2rem] w-0.5 bg-primary/20 left-[1.4rem]"></div>
                        )}
                      </div>
                      <div className="pb-4 w-full">
                        <h4 className="text-xl font-bold text-text-main mb-2">Jour {step.day} : {step.title}</h4>
                        <div className="flex flex-col md:flex-row gap-4">
                          <p className="text-text-muted flex-grow">{step.desc}</p>
                          {/* Placeholder pour une image de l'étape */}
                          <div className="w-full md:w-32 h-24 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                            <img src={"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=400&auto=format&fit=crop"} alt={step.title} className="w-full h-full object-cover opacity-80" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {trip.itinerary.length > 3 && (
                    <div className="pt-4 text-center">
                      <button 
                        onClick={() => setShowFullItinerary(!showFullItinerary)}
                        className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-hover transition-colors"
                      >
                        {showFullItinerary ? (
                          <>Voir moins <ChevronUp className="w-4 h-4" /></>
                        ) : (
                          <>Dérouler l'itinéraire complet <ChevronDown className="w-4 h-4" /></>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Carte de l'itinéraire */}
              <div className="mb-12 bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold mb-4 text-text-main flex items-center gap-2">
                  <Map className="w-6 h-6 text-primary" /> Carte de l'itinéraire
                </h3>
                <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-gray-200 rounded-xl overflow-hidden relative flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop" alt="Carte" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full font-bold text-text-main shadow-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Itinéraire interactif avec points de passage
                  </div>
                </div>
              </div>`;

code = code.replace(/<div className="mb-12">\s*<h3 className="text-2xl font-bold mb-8 text-text-main">Aperçu de l'itinéraire<\/h3>\s*<div className="space-y-8">\s*\{trip.itinerary.map\(\(step, idx\) => \([\s\S]*?\}\)\s*<\/div>\s*<\/div>/, newItinerarySection);

// Add CTA Télécharger brochure
code = code.replace(/<a \n\s*href="#contact"[\s\S]*?<\/a>/, `<a 
                href="#contact"
                className="w-full inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3.5 rounded-xl font-bold text-[15px] hover:bg-gray-900 transition-all duration-300 shadow-md mb-4"
              >
                Demander un devis <ArrowRight className="w-4 h-4" />
              </a>
              <button 
                className="w-full inline-flex items-center justify-center gap-2 bg-white text-primary border-2 border-primary px-6 py-3.5 rounded-xl font-bold text-[15px] hover:bg-primary/5 transition-all duration-300"
              >
                <Download className="w-4 h-4" /> Télécharger la brochure
              </button>`);

fs.writeFileSync('src/pages/VoyageDetails.tsx', code);
