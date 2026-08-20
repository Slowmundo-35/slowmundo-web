const fs = require('fs');

let code = fs.readFileSync('src/data/trips.ts', 'utf8');
code = code.replace(/1522814867962-421711fc1d8b/g, '1528127269322-539801943592');
code = code.replace(/1513407987258-294b0d01fb29/g, '1530122037265-a5f1f91d3b99');

fs.writeFileSync('src/data/trips.ts', code);
console.log('Fixed');
