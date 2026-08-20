const fs = require('fs');
let code = fs.readFileSync('src/pages/Blog.tsx', 'utf8');

// The new horizontal sticky category bar
const stickyCategoryBar = `      {/* Categories Filter (Sticky) */}
      <div className="sticky top-20 z-40 bg-[#FBFBFB]/90 backdrop-blur-md py-4 mb-8 border-b border-gray-200">
        <section className="w-full px-6 max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                setActiveCategory(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={\`px-5 py-2.5 rounded-full border border-gray-400 text-[15px] font-medium transition-colors \${
                activeCategory === null
                  ? 'bg-primary text-white border-primary'
                  : 'bg-transparent text-text-main hover:border-primary hover:text-primary'
              }\`}
            >
              Tous
            </button>
            {categories.map((category, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => {
                  setActiveCategory(category);
                  const el = document.getElementById(category.replace(/\\s+/g, '-').toLowerCase());
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 150;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className={\`px-5 py-2.5 rounded-full border border-gray-400 text-[15px] font-medium transition-colors \${
                  activeCategory === category
                    ? 'bg-primary text-white border-primary'
                    : 'bg-transparent text-text-main hover:border-primary hover:text-primary'
                }\`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </section>
      </div>`;

// Replace everything from {/* Featured Article */} to {/* CTA Section */}
// Wait, we need to extract the featured article and the article grid.

const newLayout = `${stickyCategoryBar}

      {/* Featured Article */}
      {!activeCategory && (
        <section className="w-full px-6 max-w-7xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-primary rounded-[2.5rem] p-6 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center shadow-sm"
          >
            <div className="w-full md:w-1/2">
              <div className="aspect-[4/3] rounded-[1.5rem] overflow-hidden">
                <img 
                  src={articlesData[0].image} 
                  alt={articlesData[0].title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-start text-white">
              <h2 className="text-2xl md:text-3xl lg:text-[2.2rem] font-bold mb-6 leading-tight">
                {articlesData[0].title}
              </h2>
              <p className="text-white/90 text-[15px] md:text-base leading-relaxed mb-8">
                {articlesData[0].excerpt}
              </p>
              <Link 
                to={\`/blog/\${articlesData[0].slug}\`} className="bg-black text-white px-6 py-3 rounded-xl font-semibold text-[15px] hover:bg-gray-900 transition-colors">
                Lire l'article complet
              </Link>
            </div>
          </motion.div>
        </section>
      )}

      {/* Main Content Layout */}
      <section className="w-full px-6 max-w-7xl mx-auto mb-24">
        <div className="flex flex-col gap-16">
          {categories
            .filter(category => !activeCategory || category === activeCategory)
            .map((category) => {
              const categoryArticles = articlesData.filter(a => a.category === category && (activeCategory ? true : a.id !== '1'));
              if (categoryArticles.length === 0) return null;
              
              return (
                <div key={category} id={category.replace(/\\s+/g, '-').toLowerCase()} className="scroll-mt-40">
                  <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-8 border-b border-gray-200 pb-3">
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

code = code.replace(/\{\/\* Featured Article \*\/\}[\s\S]*?\{\/\* CTA Section \*\/\}/, `${newLayout}\n\n      {/* CTA Section */}`);

fs.writeFileSync('src/pages/Blog.tsx', code);
