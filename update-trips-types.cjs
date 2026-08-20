const fs = require('fs');
let code = fs.readFileSync('src/data/trips.ts', 'utf8');

// Updating the type interface definition if it's there
// Actually, `type: string;` is in the interface.

// Let's replace the types sequentially.
const newTypes = {
  1: "Immersions culturelles", // Dolce Vita Italienne
  2: "Nature & Randonnée",     // Fjords et Aurores
  3: "Nature & Randonnée",     // Evasion Alpine
  4: "Immersions culturelles", // Immersion Nippone
  5: "En Solo ou entre Amis",  // Andalousie
  6: "Aventures ferroviaires", // Highlands
  7: "Immersions culturelles", // Vietnam
  8: "Lunes de miel green",    // Autriche
  9: "Tribus & familles",      // Portugal
  10: "Nature & Randonnée",    // Echappée Nordique
  11: "Aventures ferroviaires",// Route soie
  12: "Lunes de miel green",   // Dolce Vita en Train
};

// We need to carefully replace the `type: '...'` for each item.
// A regex replacement might be easiest.

code = code.replace(/id:\s*(\d+),([\s\S]*?)type:\s*'[^']+',/g, (match, id, between) => {
  const newType = newTypes[id] || 'Immersions culturelles';
  return `id: ${id},${between}type: '${newType}',`;
});

fs.writeFileSync('src/data/trips.ts', code);
