const fs = require('fs');
let code = fs.readFileSync('src/pages/Voyages.tsx', 'utf8');

// 1. Add useSearchParams to import from react-router-dom
code = code.replace("import { Link } from 'react-router-dom';", "import { Link, useSearchParams } from 'react-router-dom';\nimport { useEffect } from 'react';");

// 2. Add useSearchParams hook inside Voyages and initialize state properly
const hookCode = `
  const [searchParams] = useSearchParams();
  const urlCountry = searchParams.get('country');
  const urlType = searchParams.get('type');

  const [filterRegion, setFilterRegion] = useState(() => {
    if (urlCountry) {
      const trip = TRIPS.find(t => t.country === urlCountry);
      if (trip) return trip.continent;
    }
    if (urlType) {
      const trip = TRIPS.find(t => t.type === urlType);
      if (trip) return trip.continent;
    }
    return 'Europe';
  });
  const [filterCountry, setFilterCountry] = useState(urlCountry || 'Toutes');
  const [filterType, setFilterType] = useState(urlType || 'Tous');
  const [filterDuration, setFilterDuration] = useState('Toutes');

  // We could also do an effect to sync URL changes if the user navigates while on the same page
  useEffect(() => {
    if (urlCountry) {
      setFilterCountry(urlCountry);
      const trip = TRIPS.find(t => t.country === urlCountry);
      if (trip) setFilterRegion(trip.continent);
    }
    if (urlType) {
      setFilterType(urlType);
      const trip = TRIPS.find(t => t.type === urlType);
      if (trip && !urlCountry) setFilterRegion(trip.continent);
    }
  }, [urlCountry, urlType]);
`;

code = code.replace(/const \[filterRegion[\s\S]*?const \[filterDuration, setFilterDuration\] = useState\('Toutes'\);/, hookCode);

// 3. Remove "Nos inspirations" leaf
const leafBlock = `          <motion.div \n            initial={{ opacity: 0, y: 20 }}\n            animate={{ opacity: 1, y: 0 }}\n            className="flex items-center justify-center gap-2 mb-4"\n          >\n            <Leaf className="w-5 h-5 text-primary" />\n            <span className="text-primary font-bold uppercase tracking-widest text-sm">Nos inspirations</span>\n          </motion.div>\n`;
code = code.replace(leafBlock, "");

// 4. Update the Select options for filterType
const oldSelect = `options={[
              { value: 'Tous', label: 'Type : Tous' },
              { value: 'Culture', label: 'Culture' },
              { value: 'Aventure', label: 'Aventure' },
              { value: 'Détente', label: 'Détente' }
            ]}`;
const newSelect = `options={[
              { value: 'Tous', label: 'Type : Tous' },
              { value: 'En Solo ou entre Amis', label: 'En Solo ou entre Amis' },
              { value: 'Tribus & familles', label: 'Tribus & familles' },
              { value: 'Lunes de miel green', label: 'Lunes de miel green' },
              { value: 'Aventures ferroviaires', label: 'Aventures ferroviaires' },
              { value: 'Immersions culturelles', label: 'Immersions culturelles' },
              { value: 'Nature & Randonnée', label: 'Nature & Randonnée' }
            ]}`;
code = code.replace(oldSelect, newSelect);

fs.writeFileSync('src/pages/Voyages.tsx', code);
