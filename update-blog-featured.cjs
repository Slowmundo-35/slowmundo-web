const fs = require('fs');
let code = fs.readFileSync('src/pages/Blog.tsx', 'utf8');

code = code.replace(
  '{/* Featured Article */}\n      <section className="w-full px-6 max-w-6xl mx-auto mb-16">',
  '{/* Featured Article */}\n      {!activeCategory && (<section className="w-full px-6 max-w-6xl mx-auto mb-16">'
);

code = code.replace(
  '</Link>\n          </div>\n        </motion.div>\n      </section>\n      {/* Article Grid */}',
  '</Link>\n          </div>\n        </motion.div>\n      </section>)}\n      {/* Article Grid */}'
);

fs.writeFileSync('src/pages/Blog.tsx', code);
