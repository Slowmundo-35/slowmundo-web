const fs = require('fs');
let code = fs.readFileSync('src/pages/APropos.tsx', 'utf8');

const oldStr = "Basé près de Rennes, je privilégie les échanges directs pour co-créer votre projet.";
const newStr = "L'agence est basée sur la région rennaise, avec la possibilité de se rencontrer en personne, ou en visio si vous êtes ailleurs.";

code = code.split(oldStr).join(newStr);

fs.writeFileSync('src/pages/APropos.tsx', code);
