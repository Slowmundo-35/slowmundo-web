const fs = require('fs');
let code = fs.readFileSync('src/data/trips.ts', 'utf8');

// Remove one of the duplicate price keys
code = code.replace(/price: \d+,\n\s+price: \d+,/g, (match) => {
  return match.split('\n')[1]; // keep the second one
});

fs.writeFileSync('src/data/trips.ts', code);
