import type { MetadataRoute } from "next";
import { getAllArticles, getAllTripSlugs } from "@/lib/sanity.queries";

const BASE_URL = "https://slowmundo.fr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Blog articles first so we know whether the /blog index is indexable
  // (we noindex the empty listing to avoid a thin-content signal, so
  // when there are no articles we also drop it from the sitemap to
  // keep those two signals in sync).
  const articles = await getAllArticles();
  const blogIsIndexable = articles.length > 0;

  // Fixed public routes (excludes legal pages which are noindex)
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/voyages`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    ...(blogIsIndexable
      ? [{
          url: `${BASE_URL}/blog`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        }]
      : []),
  ];

  // Trips + per-country listing pages, all derived from Sanity
  const tripPairs = await getAllTripSlugs();
  const countrySlugs = Array.from(new Set(tripPairs.flatMap((p) => p.countries)));

  const countryRoutes: MetadataRoute.Sitemap = countrySlugs.map((slug) => ({
    url: `${BASE_URL}/voyages/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const tripRoutes: MetadataRoute.Sitemap = tripPairs.map(({ country, slug }) => ({
    url: `${BASE_URL}/voyages/${country}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Individual blog articles (the /blog index itself is added above only
  // when we have at least one article, matching the noindex on the page).
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => {
    const parsed = article.date ? new Date(article.date) : null;
    return {
      url: `${BASE_URL}/blog/${article.slug}`,
      lastModified: parsed && !Number.isNaN(parsed.getTime()) ? parsed : now,
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });

  return [...staticRoutes, ...countryRoutes, ...tripRoutes, ...articleRoutes];
}
