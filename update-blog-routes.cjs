const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  "import Contact from './pages/Contact';",
  "import Contact from './pages/Contact';\nimport Blog from './pages/Blog';"
);

code = code.replace(
  '<Route path="/contact" element={<Contact />} />',
  '<Route path="/contact" element={<Contact />} />\n            <Route path="/blog" element={<Blog />} />'
);

fs.writeFileSync('src/App.tsx', code);
