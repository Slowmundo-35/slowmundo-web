const fs = require('fs');

// Fix trips.ts tags
let tripsCode = fs.readFileSync('src/data/trips.ts', 'utf8');
const tags = [
  "City Trip", "Aventure", "Nature", "Dépaysement", "Soleil", "Sauvage", 
  "Authentique", "Classique", "Plage", "Aventure", "Authentique", "Gastronomie"
];
let i = 0;
tripsCode = tripsCode.replace(/price: \d+,\n\s+description:/g, (match) => {
  return `${match.split('\\n')[0]}\n    tag: '${tags[i++]}',\n    description:`;
});
fs.writeFileSync('src/data/trips.ts', tripsCode);

// Fix Contact.tsx types
let contactCode = fs.readFileSync('src/pages/Contact.tsx', 'utf8');
contactCode = contactCode.replace(/telephone: '',\n\s+destination: '',/, "telephone: '',\n    destination: '',\n    projet: '',");
contactCode = contactCode.replace(/const handleChange = \(e: React.ChangeEvent<HTMLInputElement \| HTMLSelectElement>\) => \{/, "const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {");
contactCode = contactCode.replace(/telephone: string;\n\s+destination: string;\n\s+consentement: boolean;/, "telephone: string;\n  destination: string;\n  projet: string;\n  consentement: boolean;");
fs.writeFileSync('src/pages/Contact.tsx', contactCode);
