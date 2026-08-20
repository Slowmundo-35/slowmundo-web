const fs = require('fs');
let code = fs.readFileSync('src/pages/Article.tsx', 'utf8');

if (!code.includes('const MotionLink')) {
  code = code.replace(
    "import { useParams, Link, useNavigate } from 'react-router-dom';",
    "import { useParams, Link, useNavigate } from 'react-router-dom';\nconst MotionLink = motion.create(Link);"
  );
  fs.writeFileSync('src/pages/Article.tsx', code);
}
