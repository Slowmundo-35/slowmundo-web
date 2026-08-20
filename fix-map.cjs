const fs = require('fs');
let code = fs.readFileSync('src/components/InteractiveMap.tsx', 'utf8');
code = code.replace(
  `import { slugify } from '../utils/slugify';`,
  `import { slugify } from '../utils/slugify';\nimport { countryTranslations } from '../data/countries';`
);

// Remove the inline countryTranslations
code = code.replace(/const countryTranslations: Record<string, string> = \{[\s\S]*?\};\n/, '');

fs.writeFileSync('src/components/InteractiveMap.tsx', code);
