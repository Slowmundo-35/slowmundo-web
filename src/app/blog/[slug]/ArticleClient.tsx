"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { 
  Clock, 
  Calendar, 
  ArrowRight, 
  ArrowLeft, 
  Share2, 
  Sparkles, 
  MapPin, 
  Train, 
  CheckCircle2, 
  BookOpen, 
  Mail,
  User,
  Heart,
  ChevronRight
} from 'lucide-react';
import { articlesData, Article as ArticleType, getStoredArticles } from '@/data/articlesData';
import { CarbonSimulatorWidget, BrochureDownloadWidget } from '@/components/ArticleLeadMagnet';

const MotionLink = motion.create(Link);

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<ArticleType[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const allArts = getStoredArticles();
    const found = allArts.find(a => a.slug === slug);
    if (!found) {
      router.push('/blog');
      return;
    }
    setArticle(found);
    
    // Find related articles
    const related = allArts.filter(a => a.id !== found.id).slice(0, 3);
    setRelatedArticles(related);
    
    window.scrollTo(0, 0);
  }, [slug, router]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!article) return null;

  return (
    <main className="w-full pt-36 md:pt-44 pb-20 min-h-screen bg-[#FBFBFB] font-sans">
      {/* Top Container */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-text-muted mb-6 flex-wrap">
          <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-primary font-medium">{article.category}</span>
        </nav>

        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 font-semibold text-sm transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Retour aux articles du blog</span>
        </Link>

        {/* Main Grid: Content (8 cols) + Sidebar (4 cols) */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          
          {/* Main Article Content */}
          <article className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider">
                  {article.category}
                </span>
                {article.readTime && (
                  <span className="bg-gray-100 text-text-muted px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    {article.readTime}
                  </span>
                )}
                {article.date && (
                  <span className="bg-gray-100 text-text-muted px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    {article.date}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-text-main leading-tight mb-6">
                {article.title}
              </h1>

              {/* Author & Share Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-200/80 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center overflow-hidden border border-primary/30">
                    <img 
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop" 
                      alt="Alexis - Fondateur"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-main">Alexis</p>
                    <p className="text-xs text-text-muted">Fondateur & Concepteur Slowmundo</p>
                  </div>
                </div>

                <button 
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 text-xs font-semibold text-text-main px-4 py-2 rounded-full hover:border-primary hover:text-primary transition-all shadow-xs"
                >
                  <Share2 className="w-3.5 h-3.5 text-primary" />
                  <span>{copied ? 'Lien copié !' : 'Partager cet article'}</span>
                </button>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="aspect-[2/1] rounded-[2rem] overflow-hidden mb-10 shadow-md border border-gray-100 relative group"
            >
              <img 
                src={article.image} 
                alt={article.imageAlt} 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
            </motion.div>

            {/* Key Takeaways Box */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Ce qu'il faut retenir de cet article</span>
              </h3>
              <p className="text-sm md:text-base text-text-main/90 leading-relaxed italic">
                "{article.excerpt}"
              </p>
            </div>

            {/* Article Content Rendered */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg max-w-none text-text-main leading-relaxed"
            >
              <div className="text-base md:text-lg text-text-main/90 space-y-6">
                {article.content()}
              </div>
            </motion.div>

            {/* Author Bio Card */}
            <div className="mt-16 bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-xs">
              <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-primary shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop" 
                  alt="Alexis - Fondateur" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left flex-1">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Auteur de l'article</span>
                <h4 className="text-xl font-bold text-text-main mb-2">Alexis • Fondateur de Slowmundo</h4>
                <p className="text-xs sm:text-sm text-text-main/80 leading-relaxed mb-4">
                  Passionné de voyages ferroviaires et engagé pour un tourisme responsable, je conçois des itinéraires uniques pour vous faire découvrir le monde sans empreinte inutile.
                </p>
                <Link href="/a-propos" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                  <span>En savoir plus sur notre démarche</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 mt-12 lg:mt-0 space-y-8 sticky top-36">
            
            {/* Sidebar Lead Magnet Widget */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2.5 mb-3 text-primary">
                <BookOpen className="w-5 h-5 shrink-0" />
                <span className="text-xs font-extrabold uppercase tracking-wider">Brochure Offerte</span>
              </div>
              <h3 className="text-lg font-bold text-text-main mb-2">
                Le Guide du Voyageur Bas Carbone 2024
              </h3>
              <p className="text-xs text-text-main/80 leading-relaxed mb-4">
                Recevez directement dans votre boîte mail nos meilleurs conseils d'itinéraires ferroviaires, les cartes des réseaux de nuit et nos astuces de réservation.
              </p>
              
              <form onSubmit={(e) => { e.preventDefault(); alert("Merci ! La brochure vous a été envoyée par e-mail."); }} className="space-y-2">
                <input 
                  type="email" 
                  required 
                  placeholder="Votre e-mail..." 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary text-text-main"
                />
                <button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Recevoir le guide PDF</span>
                </button>
              </form>
            </div>

            {/* Sidebar Trip CTA Card */}
            <div className="bg-gradient-to-br from-primary via-primary/90 to-emerald-800 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full inline-block mb-3">
                Sur-Mesure
              </span>
              <h3 className="text-xl font-bold mb-2 leading-tight">
                Envie d'un voyage conçu spécialement pour vous ?
              </h3>
              <p className="text-xs text-white/80 leading-relaxed mb-5">
                Alexis crée votre carnet de route personnalisé en fonction de vos dates, budget et envies de slow tourisme.
              </p>
              <Link 
                href="/contact" 
                className="no-underline w-full bg-white text-primary font-bold py-3 px-5 rounded-xl text-xs sm:text-sm hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Créer mon voyage</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Sidebar Featured Trips / Maillage Internes */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-base font-bold text-text-main mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Nos voyages coups de cœur</span>
              </h3>

              <div className="space-y-4">
                <Link href="/destination/espagne" className="flex items-center gap-3 group">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1558642084-fd07fae5282e?q=80&w=200&auto=format&fit=crop" 
                      alt="Espagne" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-main group-hover:text-primary transition-colors line-clamp-1">
                      Séville & Merveilles d'Andalousie
                    </h4>
                    <p className="text-[11px] text-text-muted">10 jours • Espagne</p>
                    <span className="text-xs font-bold text-primary">À partir de 1 290€</span>
                  </div>
                </Link>

                <div className="border-t border-gray-100 pt-3">
                  <Link href="/destination/japon" className="flex items-center gap-3 group">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=200&auto=format&fit=crop" 
                        alt="Japon" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-text-main group-hover:text-primary transition-colors line-clamp-1">
                        Shinkansen & Culture Nippone
                      </h4>
                      <p className="text-[11px] text-text-muted">14 jours • Japon</p>
                      <span className="text-xs font-bold text-primary">À partir de 2 890€</span>
                    </div>
                  </Link>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <Link href="/voyages" className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline">
                    <span>Voir tout le catalogue de voyages</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </div>

      {/* Suggested Articles Section */}
      <section className="max-w-7xl mx-auto px-6 mt-20 border-t border-gray-200/80 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider text-primary">Continuer la lecture</span>
          <h2 className="text-2xl md:text-4xl font-bold text-text-main mt-1">
            Articles recommandés pour vous
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedArticles.map((related, index) => (
            <MotionLink
              href={`/blog/${related.slug}`}
              key={related.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden group hover:-translate-y-1.5"
            >
              <div className="aspect-[16/10] rounded-2xl overflow-hidden relative m-3 mb-0 bg-gray-100">
                <img 
                  src={related.image} 
                  alt={related.imageAlt} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-primary font-bold text-[11px] px-3 py-1 rounded-full shadow-xs">
                  {related.category}
                </span>
                {related.readTime && (
                  <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3 text-white/80" />
                    {related.readTime.replace(' de lecture', '')}
                  </span>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-text-main font-bold text-base md:text-lg leading-snug group-hover:text-primary transition-colors mb-3 line-clamp-2">
                  {related.title}
                </h3>
                <p className="text-text-main/70 text-sm leading-relaxed line-clamp-2 mb-4">
                  {related.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs md:text-sm font-semibold text-primary">
                  <span>Lire l'article</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </div>
            </MotionLink>
          ))}
        </div>
      </section>
    </main>
  );
}
