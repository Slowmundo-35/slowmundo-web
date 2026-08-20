const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace("import VoyageDetails from './pages/VoyageDetails';", "import VoyageDetails from './pages/VoyageDetails';\nimport Destination from './pages/Destination';\nimport StyleVoyage from './pages/StyleVoyage';");

code = code.replace('<Route path="/voyages/:id" element={<VoyageDetails />} />', '<Route path="/voyages/:id" element={<VoyageDetails />} />\n            <Route path="/destinations/:countrySlug" element={<Destination />} />\n            <Route path="/styles/:styleSlug" element={<StyleVoyage />} />');

fs.writeFileSync('src/App.tsx', code);
