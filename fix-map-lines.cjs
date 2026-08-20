const fs = require('fs');
let code = fs.readFileSync('src/components/InteractiveMap.tsx', 'utf8');

const newPaths = `{/* Lignes pointillées reliant chaque icône vers le centre (la carte) */}
          <path d="M 850 100 Q 675 175 500 250" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="8, 10" strokeLinecap="round" opacity="0.6" />
          <path d="M 50 175 Q 275 212 500 250" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="8, 10" strokeLinecap="round" opacity="0.6" />
          <path d="M 750 475 Q 625 362 500 250" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="8, 10" strokeLinecap="round" opacity="0.6" />`;

code = code.replace(/\{.*?Continuous curved dotted line.*?\}/, "");
code = code.replace(/<path\s+d="M 80 200 C 250 80, 600 70, 800 130 C 880 250, 850 380, 710 430 C 500 480, 250 400, 80 200"\s+fill="none"\s+stroke="currentColor"\s+strokeWidth="3"\s+strokeDasharray="10, 12"\s+vectorEffect="non-scaling-stroke"\s+strokeLinecap="round"\s+\/>/, newPaths);

fs.writeFileSync('src/components/InteractiveMap.tsx', code);
