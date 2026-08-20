const fs = require('fs');
let code = fs.readFileSync('src/components/InteractiveMap.tsx', 'utf8');

// Add useNavigate
code = code.replace("import { motion } from 'framer-motion';", "import { motion } from 'framer-motion';\nimport { useNavigate } from 'react-router-dom';");

// Inside InteractiveMap, get navigate
code = code.replace("const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });", "const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });\n  const navigate = useNavigate();");

// Add onClick to Geography
code = code.replace("onMouseLeave={() => setTooltipContent('')}", "onMouseLeave={() => setTooltipContent('')}\n                      onClick={() => navigate(`/voyages?country=${encodeURIComponent(countryTranslations[geo.properties.name] || geo.properties.name)}`)}");

fs.writeFileSync('src/components/InteractiveMap.tsx', code);
