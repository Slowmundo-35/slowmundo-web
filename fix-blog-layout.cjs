const fs = require('fs');
let code = fs.readFileSync('src/pages/Blog.tsx', 'utf8');

const featuredSection = `      {/* Featured Article */}
      {!activeCategory && (<section className="w-full px-6 max-w-7xl mx-auto mb-16">
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
      </section>)}
`;

if (!code.includes('{/* Featured Article */}')) {
  code = code.replace('{/* Main Content Layout */}', featuredSection + '\n      {/* Main Content Layout */}');
  fs.writeFileSync('src/pages/Blog.tsx', code);
}
