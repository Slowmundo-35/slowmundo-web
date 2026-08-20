const fs = require('fs');
let code = fs.readFileSync('src/pages/Contact.tsx', 'utf8');

const replacement = `                  </div>
                </div>
              </div>

              {/* Détails du projet */}
              <div className="space-y-2 w-full pt-2">
                <label htmlFor="projet" className="block text-sm font-medium">
                  Détails du projet / Commentaires
                </label>
                <textarea
                  id="projet"
                  name="projet"
                  rows={4}
                  value={formData.projet || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-black/50"
                  placeholder="Dates, nombre de voyageurs, budget, envies particulières..."
                />
              </div>

              {/* Checkbox Consentement */}`;

code = code.replace(/                  <\/div>\s*<\/div>\s*<\/div>\s*\{\/\* Checkbox Consentement \*\/\}/, replacement);

fs.writeFileSync('src/pages/Contact.tsx', code);
