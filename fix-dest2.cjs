const fs = require('fs');
let code = fs.readFileSync('src/pages/Destination.tsx', 'utf8');

const replacement = `{/* Trips List */}
        {destinationTrips.length === 0 ? (
          <div className="text-center text-text-muted mt-8 bg-white p-12 rounded-2xl shadow-sm">
            <p className="mb-4 text-lg">Aucun itinéraire prédéfini n'est encore disponible pour cette destination.</p>
            <Link to="/contact" className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">
              Créer un voyage sur mesure
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">`;

code = code.replace(/\{\/\* Trips List \*\/\}\n\s*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">/, replacement);
// We also need to add the closing brace for the ternary
code = code.replace(/<\/div>\n      <\/div>\n    <\/main>/, `</div>\n        )}\n      </div>\n    </main>`);

fs.writeFileSync('src/pages/Destination.tsx', code);
