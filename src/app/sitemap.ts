import type { MetadataRoute } from "next";
import { getAllTripSlugs } from "@/lib/sanity.queries";
import { articlesData } from "@/data/articlesData";

const BASE_URL = "https://www.slowmundo.fr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Fixed public routes (excludes legal pages which are noindex)
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/voyages`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  // Trips + per-country listing pages, all derived from Sanity
  const tripPairs = await getAllTripSlugs();
  const countrySlugs = Array.from(new Set(tripPairs.map((p) => p.country)));

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

  // Articles remain in-code for now (blog will move to Sanity in a next pass).
  const articleRoutes: MetadataRoute.Sitemap = articlesData.map((article) => {
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
