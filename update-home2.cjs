const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const target = `<svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none" fill="none" className="overflow-visible">
                  {/* Wavy line from card 1 to card 2 to card 3 */}
                  <path d="M 0 50 C 250 -50, 250 150, 500 50 C 750 -50, 750 150, 1000 50" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="4" style={{ strokeDasharray: '12, 16' }} vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                </svg>`;

const replacement = `<svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="xMidYMid visible" fill="none" className="overflow-visible">
                  {/* Wavy line from card 1 to card 2 to card 3 */}
                  <path d="M 0 50 C 250 -50, 250 150, 500 50 C 750 -50, 750 150, 1000 50" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="4" style={{ strokeDasharray: '12, 16' }} vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                </svg>`;

if(code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/pages/Home.tsx', code);
  console.log("Replaced successfully");
} else {
  console.log("Target not found!");
}
