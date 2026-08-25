import type { MetadataRoute } from "next";

const BASE_URL = "https://www.slowmundo.fr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/mentions-legales",
          "/cgv",
          "/politique-confidentialite",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
