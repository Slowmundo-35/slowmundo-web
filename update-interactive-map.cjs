const fs = require('fs');
let code = fs.readFileSync('src/components/InteractiveMap.tsx', 'utf8');

const translations = `
const countryTranslations: Record<string, string> = {
  "United Kingdom": "Royaume-Uni",
  "France": "France",
  "Spain": "Espagne",
  "Portugal": "Portugal",
  "Germany": "Allemagne",
  "Italy": "Italie",
  "Switzerland": "Suisse",
  "Austria": "Autriche",
  "Belgium": "Belgique",
  "Netherlands": "Pays-Bas",
  "Luxembourg": "Luxembourg",
  "Ireland": "Irlande",
  "Norway": "Norvège",
  "Sweden": "Suède",
  "Finland": "Finlande",
  "Denmark": "Danemark",
  "Poland": "Pologne",
  "Czechia": "Tchéquie",
  "Slovakia": "Slovaquie",
  "Hungary": "Hongrie",
  "Slovenia": "Slovénie",
  "Croatia": "Croatie",
  "Bosnia and Herz.": "Bosnie-Herzégovine",
  "Serbia": "Serbie",
  "Montenegro": "Monténégro",
  "Albania": "Albanie",
  "Macedonia": "Macédoine du Nord",
  "Greece": "Grèce",
  "Bulgaria": "Bulgarie",
  "Romania": "Roumanie",
  "Andorra": "Andorre",
  "Monaco": "Monaco",
  "Liechtenstein": "Liechtenstein",
  "San Marino": "Saint-Marin",
  "Vatican": "Vatican",
  "Kosovo": "Kosovo",
  "Jersey": "Jersey",
  "Guernsey": "Guernesey",
  "Isle of Man": "Île de Man",
  "China": "Chine",
  "Macao": "Macao",
  "Hong Kong": "Hong Kong",
  "India": "Inde",
  "Japan": "Japon",
  "South Korea": "Corée du Sud",
  "North Korea": "Corée du Nord",
  "Mongolia": "Mongolie",
  "Taiwan": "Taïwan",
  "Vietnam": "Viêt Nam",
  "Thailand": "Thaïlande",
  "Myanmar": "Birmanie",
  "Cambodia": "Cambodge",
  "Laos": "Laos",
  "Philippines": "Philippines",
  "Malaysia": "Malaisie",
  "Indonesia": "Indonésie",
  "Singapore": "Singapour",
  "Brunei": "Brunei",
  "Timor-Leste": "Timor oriental",
  "Nepal": "Népal",
  "Bhutan": "Bhoutan",
  "Bangladesh": "Bangladesh",
  "Sri Lanka": "Sri Lanka",
  "Maldives": "Maldives",
  "Pakistan": "Pakistan",
  "Afghanistan": "Afghanistan",
  "Iran": "Iran",
  "Iraq": "Irak",
  "Syria": "Syrie",
  "Lebanon": "Liban",
  "Israel": "Israël",
  "Palestine": "Palestine",
  "Jordan": "Jordanie",
  "Saudi Arabia": "Arabie Saoudite",
  "Yemen": "Yémen",
  "Oman": "Oman",
  "United Arab Emirates": "Émirats Arabes Unis",
  "Qatar": "Qatar",
  "Bahrain": "Bahreïn",
  "Kuwait": "Koweït",
  "Kazakhstan": "Kazakhstan",
  "Uzbekistan": "Ouzbékistan",
  "Turkmenistan": "Turkménistan",
  "Kyrgyzstan": "Kirghizistan",
  "Tajikistan": "Tadjikistan",
  "Turkey": "Turquie",
  "Georgia": "Géorgie",
  "Armenia": "Arménie",
  "Azerbaijan": "Azerbaïdjan"
};
`;

code = code.replace("const europeCountries = [", translations + "\nconst europeCountries = [");

code = code.replace("const [tooltipContent, setTooltipContent] = useState('');", 
  "const [tooltipContent, setTooltipContent] = useState('');\n  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });\n\n  const handleMouseMove = (e: React.MouseEvent) => {\n    setTooltipPos({ x: e.clientX, y: e.clientY });\n  };");

code = code.replace('<div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">', 
  '<div \n      className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center"\n      onMouseMove={handleMouseMove}\n    >\n      {/* Fade vers le blanc en haut */}\n      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent z-20 pointer-events-none" />\n');

code = code.replace('<path d="M 150 250 Q 250 300 350 250" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />',
  '<path d="M 80 250 Q 150 300 250 250" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />');

code = code.replace('className="absolute top-[35%] left-[10%] w-12 h-12 bg-white border-2 border-primary rounded-xl flex items-center justify-center text-primary shadow-lg"',
  'className="absolute top-[35%] left-[5%] w-12 h-12 bg-white border-2 border-primary rounded-xl flex items-center justify-center text-primary shadow-lg"');

code = code.replace("onMouseEnter={() => setTooltipContent(geo.properties.name)}",
  "onMouseEnter={() => setTooltipContent(countryTranslations[geo.properties.name] || geo.properties.name)}");

code = code.replace('{tooltipContent && (\n        <div className="absolute top-10 right-10 bg-white px-4 py-2 rounded-lg shadow-lg font-bold text-text-main pointer-events-none z-10 transition-opacity">\n          {tooltipContent}\n        </div>\n      )}',
  '{tooltipContent && (\n        <div \n          className="fixed bg-white px-4 py-2 rounded-lg shadow-lg font-bold text-text-main pointer-events-none z-50"\n          style={{ top: tooltipPos.y - 50, left: tooltipPos.x + 15 }}\n        >\n          {tooltipContent}\n        </div>\n      )}');

fs.writeFileSync('src/components/InteractiveMap.tsx', code);
