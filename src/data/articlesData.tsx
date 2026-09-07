/**
 * Blog articles now come from Sanity (see src/lib/sanity.queries.ts).
 * This file is kept only to preserve the `Article` TS shape referenced by
 * a few call sites (SEO helpers, page metadata). No more hardcoded data.
 */

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  imageAlt?: string;
  excerpt: string;
  readTime?: string;
  date?: string;
  /** Legacy render function. Sanity articles use PortableText instead. */
  content?: () => React.ReactNode;
}

/**
 * Empty stub. Real articles are fetched via getAllArticles() / getArticleBySlug()
 * from src/lib/sanity.queries.ts.
 */
export const articlesData: Article[] = [];
