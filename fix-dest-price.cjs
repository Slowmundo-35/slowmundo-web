const fs = require('fs');
let code = fs.readFileSync('src/pages/Destination.tsx', 'utf8');

const replacement = `<div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-text-muted">À partir de</span>
                      <span className="text-lg font-bold text-text-main">{trip.price}€</span>
                    </div>
                    <span className="text-sm font-bold text-primary flex items-center gap-1">Découvrir <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" /></span>
                  </div>`;

code = code.replace(/<div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">\s*<span className="text-sm font-bold text-text-main">Découvrir l'itinéraire<\/span>\s*<ArrowRight className="w-5 h-5 text-primary transform group-hover:translate-x-1 transition-transform" \/>\s*<\/div>/, replacement);

fs.writeFileSync('src/pages/Destination.tsx', code);
