import type { MetadataRoute } from "next";
import { TRIPS, getCountrySlug, getTripSlug } from "@/data/trips";
import { articlesData } from "@/data/articlesData";

const BASE_URL = "https://www.slowmundo.fr";

export default function sitemap(): MetadataRoute.Sitemap {
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

  // Distinct country pages derived from TRIPS
  const countrySlugs = Array.from(new Set(TRIPS.map(getCountrySlug)));
  const countryRoutes: MetadataRoute.Sitemap = countrySlugs.map((slug) => ({
    url: `${BASE_URL}/voyages/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Every trip detail page
  const tripRoutes: MetadataRoute.Sitemap = TRIPS.map((trip) => ({
    url: `${BASE_URL}/voyages/${getCountrySlug(trip)}/${getTripSlug(trip)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Every article — article.date is a display string ("12 Mai 2024"),
  // not an ISO date, so we fall back to `now` when Date parsing fails.
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
