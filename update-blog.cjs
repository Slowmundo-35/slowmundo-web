const fs = require('fs');
let code = fs.readFileSync('src/pages/Blog.tsx', 'utf8');

const newLayout = `      {/* Main Content Layout */}
      <section className="w-full px-6 max-w-7xl mx-auto mb-24 flex flex-col lg:flex-row gap-12">
        {/* Left Navigation / Filters */}
        <div className="lg:w-1/4">
          <div className="sticky top-32 flex flex-col gap-3">
            <h3 className="text-lg font-bold text-text-main mb-2">Catégories</h3>
            <button
              onClick={() => {
                setActiveCategory(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={\`text-left px-5 py-3 rounded-xl border border-gray-400 text-[15px] transition-colors \${
                activeCategory === null
                  ? 'bg-primary text-white border-primary'
                  : 'bg-transparent text-text-main hover:border-primary hover:text-primary'
              }\`}
            >
              Tous les articles
            </button>
            {categories.map((category, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => {
                  setActiveCategory(category);
                  const el = document.getElementById(category.replace(/\\s+/g, '-').toLowerCase());
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className={\`text-left px-5 py-3 rounded-xl border border-gray-400 text-[15px] transition-colors \${
                  activeCategory === category
                    ? 'bg-primary text-white border-primary'
                    : 'bg-transparent text-text-main hover:border-primary hover:text-primary'
                }\`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Content: Grouped by Category */}
        <div className="lg:w-3/4 flex flex-col gap-16">
          {categories
            .filter(category => !activeCategory || category === activeCategory)
            .map((category) => {
              const categoryArticles = articlesData.filter(a => a.category === category && (activeCategory ? true : a.id !== '1'));
              if (categoryArticles.length === 0) return null;
              
              return (
                <div key={category} id={category.replace(/\\s+/g, '-').toLowerCase()} className="scroll-mt-32">
                  <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-8 border-b border-gray-200 pb-3">
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {categoryArticles.map((article, index) => (
                      <MotionLink
                        to={\`/blog/\${article.slug}\`} key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-primary rounded-[2rem] p-6 flex flex-col group hover:-translate-y-1 transition-transform duration-300 shadow-sm"
                      >
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                          <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <h3 className="text-white font-medium md:text-lg leading-snug text-center mt-auto px-2">
                          {article.title}
                        </h3>
                      </MotionLink>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </section>`;

// Replace old Categories filter + old Article Grid
code = code.replace(/\{\/\* Categories Filter \*\/\}[\s\S]*?\{\/\* CTA Section \*\/\}/, `${newLayout}\n\n      {/* CTA Section */}`);

fs.writeFileSync('src/pages/Blog.tsx', code);
