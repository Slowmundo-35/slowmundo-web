const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// 1. Check if useNavigate is already imported, if not add it
if (!code.includes('useNavigate')) {
  code = code.replace("import { Link } from 'react-router-dom';", "import { Link, useNavigate } from 'react-router-dom';");
}

// 2. Add useNavigate hook to Home component
code = code.replace("export default function Home() {\n  const [currentTripIndex, setCurrentTripIndex] = useState(0);", "export default function Home() {\n  const navigate = useNavigate();\n  const [currentTripIndex, setCurrentTripIndex] = useState(0);");

// 3. Add onClick to the category card
code = code.replace('className="group relative h-48 md:h-56 lg:h-48 rounded-2xl overflow-hidden cursor-pointer shadow-lg"', 
'className="group relative h-48 md:h-56 lg:h-48 rounded-2xl overflow-hidden cursor-pointer shadow-lg"\n                onClick={() => navigate(`/voyages?type=${encodeURIComponent(style.title)}`)}');

fs.writeFileSync('src/pages/Home.tsx', code);
