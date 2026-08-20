const fs = require('fs');
let code = fs.readFileSync('src/components/layout/Footer.tsx', 'utf8');

code = code.replace(
  '<li><Link to="#" className="hover:text-white transition-colors">Blog</Link></li>',
  '<li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>'
);

fs.writeFileSync('src/components/layout/Footer.tsx', code);
