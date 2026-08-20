const fs = require('fs');
let code = fs.readFileSync('src/data/trips.ts', 'utf8');

// Add price property to Trip type
code = code.replace(/duration: string;\n\s+tag: string;/, "duration: string;\n  tag: string;\n  price: number;");

// Generate prices between 800 and 3500
code = code.replace(/(tag: '.*?',\n\s+description:)/g, (match, p1) => {
  const price = Math.floor(Math.random() * (3500 - 800 + 1) + 800);
  return `price: ${price},\n    ` + p1;
});

// For trip id 1, 2, etc, they might not match perfectly, let's just do it with a function
let count = 0;
code = code.replace(/(tag: '.*?',\n\s+description:)/g, function(match) {
   count++;
   const price = 800 + (count * 250);
   return `price: ${price},\n    description:`;
});

fs.writeFileSync('src/data/trips.ts', code);
console.log(count);
