const fs = require('fs');
let code = fs.readFileSync('src/pages/Blog.tsx', 'utf8');

code = code.replace(
  '        </motion.div>\n      </section>\n\n      {/* Article Grid */}',
  '        </motion.div>\n      </section>)}\n\n      {/* Article Grid */}'
);

fs.writeFileSync('src/pages/Blog.tsx', code);
