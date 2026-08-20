const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const target = `{/* Dotted Curved Lines connecting the cards */}
              <div className="hidden md:block absolute top-[55%] left-[16.66%] right-[16.66%] h-1 z-0 pointer-events-none">
                <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none" className="overflow-visible">
                  {/* Wavy line from card 1 to card 2 to card 3 */}
                  <path d="M 0 0 C 15 -150, 35 150, 50 0 C 65 -120, 85 100, 100 0" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="3" style={{ strokeDasharray: '12, 16' }} vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                </svg>
              </div>`;

const replacement = `{/* Dotted Curved Lines connecting the cards */}
              <div className="hidden md:block absolute top-[55%] left-[16.66%] right-[16.66%] h-24 -translate-y-1/2 z-0 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none" fill="none" className="overflow-visible">
                  {/* Wavy line from card 1 to card 2 to card 3 */}
                  <path d="M 0 50 C 250 -50, 250 150, 500 50 C 750 -50, 750 150, 1000 50" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="4" style={{ strokeDasharray: '12, 16' }} vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                </svg>
              </div>`;

if(code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/pages/Home.tsx', code);
  console.log("Replaced successfully");
} else {
  console.log("Target not found!");
}
