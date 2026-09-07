"use client";

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { Search, Clock, ArrowRight, Sparkles, Calendar, BookOpen, X, Train, Leaf, Compass, Coffee } from 'lucide-react';
import type { SanityArticle } from '@/lib/sanity.queries';

interface BlogClientProps {
  articles: SanityArticle[];
}

const MotionLink = motion.create(Link);

const categories = [
  "Guide du Train",
  "Astuces Éco-Voyage",
  "Idées d'itinéraires",
  "Esprit Slow Travel"
];

const categoryIcons: Record<string, React.ElementType> = {
  "Guide du Train": Train,
  "Astuces Éco-Voyage": Leaf,
  "Idées d'itinéraires": Compass,
  "Esprit Slow Travel": Coffee,
};

export default function Blog({ articles }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allArticles = articles;

  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchesCategory = !activeCategory || article.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, allArticles]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach((cat) => {
      counts[cat] = allArticles.filter((a) => a.category === cat).length;
    });
    return counts;
  }, [allArticles]);

  const featuredArticle = allArticles[0];
  const showFeatured = !activeCategory && !searchQuery && !!featuredArticle;

  return (
    <main className="w-full pt-32 md:pt-40 pb-20 min-h-screen bg-[#FBFBFB] font-sans">
      
      {/* 1. HERO HEADER */}
      <section className="w-full px-6 max-w-4xl mx-auto text-center mb-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs md:text-sm tracking-wide uppercase mb-6"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Carnet d'inspirations Slowmundo</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl md:text-5xl font-bold text-text-main mb-6 leading-[1.15]"
        >
          Le Blog du <span className="text-primary">Voyage Durable</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-text-main/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Guides ferroviaires, conseils écoresponsables et récits d'itinéraires inspirants pour explorer le monde au rythme du slow tourisme.
        </motion.p>
      </section>

      {/* 2. SEARCH & STICKY FILTER BAR */}
      <div className="sticky top-20 z-40 bg-[#FBFBFB]/90 backdrop-blur-md py-4 mb-12 border-b border-gray-200/80 transition-all shadow-xs">
        <section className="w-full px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Rechercher un article, lieu, astuce..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-white rounded-full border border-gray-200 text-sm text-text-main placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-text-main p-0.5 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none w-full md:w-auto">
            <button
              onClick={() => {
                setActiveCategory(null);
              }}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
                activeCategory === null
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-text-main border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              <span>Tous</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] ${
                activeCategory === null ? 'bg-white/20 text-white' : 'bg-gray-100 text-text-muted'
              }`}>
                {allArticles.length}
              </span>
            </button>

            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(isActive ? null : category);
                  }}
                  className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-white text-text-main border border-gray-200 hover:border-primary hover:text-primary'
                  }`}
                >
                  <span>{category}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-text-muted'
                  }`}>
                    {categoryCounts[category] || 0}
                  </span>
                </button>
              );
            })}
          </div>

        </section>
      </div>

      {/* 3. FEATURED ARTICLE (À la une) */}
      {showFeatured && (
        <section className="w-full px-6 max-w-7xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-3xl p-6 md:p-8 lg:p-10 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden relative shadow-sm">
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.imageAlt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-primary text-white font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> À la une
                    </span>
                    <span className="bg-white/90 backdrop-blur-md text-primary font-bold text-xs px-3 py-1.5 rounded-full shadow-sm">
                      {featuredArticle.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2 flex flex-col items-start">
                <div className="flex items-center gap-4 text-xs md:text-sm font-medium text-text-muted mb-4">
                  {featuredArticle.date && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-primary" /> {featuredArticle.date}
                    </span>
                  )}
                  {featuredArticle.readTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-primary" /> {featuredArticle.readTime}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-main group-hover:text-primary transition-colors leading-tight mb-4">
                  {featuredArticle.title}
                </h2>

                <p className="text-text-main/75 text-base md:text-lg leading-relaxed mb-8 line-clamp-3">
                  {featuredArticle.excerpt}
                </p>

                <Link 
                  href={`/blog/${featuredArticle.slug}`} 
                  className="inline-flex items-center gap-2 bg-primary text-white font-bold text-sm md:text-base px-6 py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-sm hover:shadow-md hover:gap-3"
                >
                  <span>Lire l'article complet</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* 4. MAIN ARTICLES GRID */}
      <section className="w-full px-6 max-w-7xl mx-auto mb-20">
        
        {/* Section Header */}
        {(activeCategory || searchQuery) && (
          <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-text-main flex items-center gap-2.5">
              {activeCategory && categoryIcons[activeCategory] ? (
                (() => {
                  const CategoryHeaderIcon = categoryIcons[activeCategory];
                  return <CategoryHeaderIcon className="w-6 h-6 text-primary shrink-0" />;
                })()
              ) : searchQuery ? (
                <Search className="w-6 h-6 text-primary shrink-0" />
              ) : null}
              <span>
                {activeCategory ? activeCategory : `Résultats pour "${searchQuery}"`}
              </span>
              <span className="text-sm font-normal text-text-muted ml-1">
                ({filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''})
              </span>
            </h2>

            {(activeCategory || searchQuery) && (
              <button 
                onClick={() => {
                  setActiveCategory(null);
                  setSearchQuery('');
                }}
                className="text-sm text-primary hover:underline font-semibold flex items-center gap-1"
              >
                <span>Voir tous les articles</span>
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Empty State */}
        {filteredArticles.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-12 text-center border border-gray-100 max-w-xl mx-auto shadow-xs"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-2">Aucun article trouvé</h3>
            <p className="text-text-main/70 text-sm mb-6">
              Nous n'avons pas trouvé d'articles correspondant à votre recherche. Essayez avec d'autres mots-clés ou réinitialisez les filtres.
            </p>
            <button
              onClick={() => {
                setActiveCategory(null);
                setSearchQuery('');
              }}
              className="bg-primary text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Réinitialiser la recherche
            </button>
          </motion.div>
        ) : (
          /* Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles
              // If showing all articles and featured is displayed, don't duplicate featured article at top
              .filter(article => !showFeatured || article.id !== featuredArticle.id)
              .map((article, index) => (
                <MotionLink
                  href={`/blog/${article.slug}`}
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 3) * 0.1 }}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden group hover:-translate-y-1.5"
                >
                  {/* Card Image */}
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden relative m-3 mb-0 bg-gray-100">
                    <img 
                      src={article.image} 
                      alt={article.imageAlt || article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-primary font-bold text-[11px] px-3 py-1 rounded-full shadow-xs">
                      {article.category}
                    </span>
                    {article.readTime && (
                      <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3 text-white/80" />
                        {article.readTime.replace(' de lecture', '')}
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-1">
                    {article.date && (
                      <span className="text-xs font-medium text-text-muted mb-2 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {article.date}
                      </span>
                    )}

                    <h3 className="text-text-main font-bold text-lg leading-snug group-hover:text-primary transition-colors mb-3 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-text-main/70 text-sm leading-relaxed line-clamp-3 mb-6">
                      {article.excerpt}
                    </p>

                    {/* Card Footer Link */}
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs md:text-sm font-semibold text-primary">
                      <span>Lire l'article</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </MotionLink>
              ))}
          </div>
        )}

      </section>

      {/* 5. ELEGANT CTA SECTION */}
      <section className="w-full px-6 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/10 via-white to-primary/15 rounded-3xl p-8 md:p-12 border border-primary/20 shadow-sm flex flex-col md:flex-row gap-8 items-center justify-between relative overflow-hidden"
        >
          {/* Decorative background circle */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">
              <BookOpen className="w-3.5 h-3.5" /> Carnet sur mesure
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-main leading-tight mb-4">
              Inspiré par nos récits ? <br/>
              <span className="text-primary">Concevons votre prochain voyage.</span>
            </h2>
            <p className="text-text-main/80 text-sm md:text-base leading-relaxed">
              De l'itinéraire ferroviaire aux hébergements écoresponsables, nous organisons votre séjour bas carbone de A à Z.
            </p>
          </div>

          <div className="shrink-0 relative z-10">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 bg-black text-white font-bold text-sm md:text-base px-7 py-4 rounded-xl hover:bg-gray-900 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <span>Demander un devis sur mesure</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
