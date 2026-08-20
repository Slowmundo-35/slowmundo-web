const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes("import Article from './pages/Article';")) {
  code = code.replace(
    "import Blog from './pages/Blog';",
    "import Blog from './pages/Blog';\nimport Article from './pages/Article';"
  );
}

if (!code.includes('<Route path="/blog/:slug" element={<Article />} />')) {
  code = code.replace(
    '<Route path="/blog" element={<Blog />} />',
    '<Route path="/blog" element={<Blog />} />\n            <Route path="/blog/:slug" element={<Article />} />'
  );
}

fs.writeFileSync('src/App.tsx', code);
