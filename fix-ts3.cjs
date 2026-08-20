const fs = require('fs');

let tripsCode = fs.readFileSync('src/data/trips.ts', 'utf8');

tripsCode = tripsCode.replace(/description:\n\s+tag: '.*?',\n\s+description:/g, "tag: 'Aventure',\n    description:");

fs.writeFileSync('src/data/trips.ts', tripsCode);
