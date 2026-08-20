const fs = require('fs');
let code = fs.readFileSync('src/pages/Blog.tsx', 'utf8');

// Replace the articles import
if (!code.includes("import { articlesData } from '../data/articlesData';")) {
  code = code.replace(
    "import { Link } from 'react-router-dom';",
    "import { Link } from 'react-router-dom';\nimport { articlesData } from '../data/articlesData';"
  );
  
  // Remove the old 'articles' and 'categories' const definition
  code = code.replace(/const categories = \[[\s\S]*?\];/m, 'const categories = [\n  "Guide du Train",\n  "Astuces Éco-Voyage",\n  "Idées d\'itinéraires",\n  "Esprit Slow Travel"\n];');
  code = code.replace(/const articles = \[[\s\S]*?\];/m, '');
  
  // Replace references from 'articles' to 'articlesData'
  code = code.replace(/articles\.map/g, 'articlesData.slice(1).map');
  
  // Update the featured article link
  code = code.replace(/to="#"[\s]*className="bg-black text-white px-6 py-3 rounded-xl font-semibold text-\[15px\] hover:bg-gray-900 transition-colors"[\s]*>[\s]*Lire l'article complet/g, 
    'to={`/blog/${articlesData[0].slug}`} className="bg-black text-white px-6 py-3 rounded-xl font-semibold text-[15px] hover:bg-gray-900 transition-colors">\n              Lire l\'article complet');
  
  // Update the grid items link
  code = code.replace(/to="#"[\s]*key={article.id}/g, 'to={`/blog/${article.slug}`} key={article.id}');
}

fs.writeFileSync('src/pages/Blog.tsx', code);
