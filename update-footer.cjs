const fs = require('fs');
let code = fs.readFileSync('src/components/layout/Footer.tsx', 'utf8');

code = code.replace(
  '<li><Link to="#" className="hover:text-white transition-colors">Italie</Link></li>',
  '<li><Link to="/destinations/italie" className="hover:text-white transition-colors">Italie</Link></li>'
);

code = code.replace(
  '<li><Link to="#" className="hover:text-white transition-colors">Suisse</Link></li>',
  '<li><Link to="/destinations/suisse" className="hover:text-white transition-colors">Suisse</Link></li>'
);

code = code.replace(
  '<li><Link to="#" className="hover:text-white transition-colors">Allemagne</Link></li>',
  '<li><Link to="/destinations/allemagne" className="hover:text-white transition-colors">Allemagne</Link></li>'
);

code = code.replace(
  '<li><Link to="#" className="hover:text-white transition-colors">Espagne</Link></li>',
  '<li><Link to="/destinations/espagne" className="hover:text-white transition-colors">Espagne</Link></li>'
);

fs.writeFileSync('src/components/layout/Footer.tsx', code);
