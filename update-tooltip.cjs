const fs = require('fs');
let code = fs.readFileSync('src/components/InteractiveMap.tsx', 'utf8');

code = code.replace('{tooltipContent && (\n        <div \n          className="fixed bg-white px-4 py-2 rounded-lg shadow-lg font-bold text-text-main pointer-events-none z-50"\n          style={{ top: tooltipPos.y - 50, left: tooltipPos.x + 15 }}\n        >\n          {tooltipContent}\n        </div>\n      )}',
  '{tooltipContent && (\n        <div \n          className="fixed bg-white px-4 py-2 rounded-lg shadow-lg font-bold text-text-main pointer-events-none z-50"\n          style={{ top: tooltipPos.y - 15, left: tooltipPos.x - 15, transform: \'translate(-100%, -100%)\' }}\n        >\n          {tooltipContent}\n        </div>\n      )}');

fs.writeFileSync('src/components/InteractiveMap.tsx', code);
