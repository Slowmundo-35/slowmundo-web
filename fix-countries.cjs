const fs = require('fs');

// Fix trips.ts
let tripsCode = fs.readFileSync('src/data/trips.ts', 'utf8');
tripsCode = tripsCode.replace(/country: 'Écosse',/g, "country: 'Royaume-Uni',");
tripsCode = tripsCode.replace(/country: 'Asie Centrale',/g, "country: 'Ouzbékistan',");
fs.writeFileSync('src/data/trips.ts', tripsCode);

// Fix InteractiveMap.tsx
let mapCode = fs.readFileSync('src/components/InteractiveMap.tsx', 'utf8');
mapCode = mapCode.replace(/"Vietnam": "Viêt Nam"/g, '"Vietnam": "Vietnam"');
fs.writeFileSync('src/components/InteractiveMap.tsx', mapCode);
