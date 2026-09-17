import type { MetadataRoute } from "next";

const BASE_URL = "https://slowmundo.fr";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Legal pages are now indexable — for a travel agency they carry
        // trust signals (Atout France registration, garant financier, RC pro)
        // Google looks for. Only the API surface stays disallowed.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
