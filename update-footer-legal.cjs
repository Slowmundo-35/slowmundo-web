const fs = require('fs');
let code = fs.readFileSync('src/components/layout/Footer.tsx', 'utf8');

code = code.replace(
  '<li><Link to="#" className="hover:text-white transition-colors">Mentions légales</Link></li>',
  '<li><Link to="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>'
);

code = code.replace(
  '<li><Link to="#" className="hover:text-white transition-colors">Conditions générales de vente</Link></li>',
  '<li><Link to="/cgv" className="hover:text-white transition-colors">Conditions générales de vente</Link></li>'
);

code = code.replace(
  '<li><Link to="#" className="hover:text-white transition-colors">Politique de confidentialité</Link></li>',
  '<li><Link to="/politique-confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link></li>'
);

fs.writeFileSync('src/components/layout/Footer.tsx', code);
