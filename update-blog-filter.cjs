const fs = require('fs');
let code = fs.readFileSync('src/pages/Blog.tsx', 'utf8');

code = code.replace(
  "{articlesData.slice(1).map((article, index) => (",
  "{articlesData.filter(article => !activeCategory || article.category === activeCategory).map((article, index) => ("
);

// We need to make sure the featured article isn't duplicated if we don't slice, or we can just filter it. 
// Actually, if it's filtered, maybe we shouldn't show the featured article if a category is selected. 
// For now, let's just make it filter all articles including the featured one if a category is selected,
// OR just hide featured article when category is active, but that's a bit more work.
// Let's just do:
code = code.replace(
  "{articlesData.filter(article => !activeCategory || article.category === activeCategory).map((article, index) => (",
  "{articlesData.filter(article => (!activeCategory && article.id !== '1') || (activeCategory && article.category === activeCategory)).map((article, index) => ("
);

fs.writeFileSync('src/pages/Blog.tsx', code);
