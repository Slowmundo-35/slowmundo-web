const fs = require('fs');
let code = fs.readFileSync('src/components/InteractiveMap.tsx', 'utf8');

code = code.replace("import { useNavigate } from 'react-router-dom';", "import { useNavigate } from 'react-router-dom';\nimport { slugify } from '../utils/slugify';");

code = code.replace(/onClick=\{\(\) => navigate\(\`\/voyages\?country=\$\{\w+\(countryTranslations\[geo\.properties\.name\] \|\| geo\.properties\.name\)\}\`\)\}/g, "onClick={() => navigate(`/destinations/${slugify(countryTranslations[geo.properties.name] || geo.properties.name)}`)}");

fs.writeFileSync('src/components/InteractiveMap.tsx', code);
