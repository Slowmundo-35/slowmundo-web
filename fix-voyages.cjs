const fs = require('fs');
let code = fs.readFileSync('src/pages/Voyages.tsx', 'utf8');

const replacement = `<div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {card.duration}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-sm font-medium text-text-muted">À partir de <strong className="text-text-main text-lg">{card.price}€</strong></span>
                    </div>
                  </div>`;

code = code.replace(/<div className="flex items-center gap-1\.5">\s*<Clock className="w-4 h-4" \/>\s*\{card\.duration\}\s*<\/div>\s*<\/div>\s*<\/div>/, replacement);

fs.writeFileSync('src/pages/Voyages.tsx', code);
