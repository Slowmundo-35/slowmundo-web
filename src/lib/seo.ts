import type { Trip } from "@/data/trips";
import type { Article } from "@/data/articlesData";
import { getCountrySlug, getTripSlug } from "@/data/trips";

export const SITE_URL = "https://www.slowmundo.fr";
export const SITE_NAME = "Slowmundo";

/** Fallback OG image used when a page doesn't ship its own. Raw Slowmundo photo, no overlay. */
export const OG_DEFAULT_IMAGE = "/img/slowmundo/gotthard-tessin/ascona-lac-majeur.webp";

/** Wrap a single OG image URL in the shape Next expects for `metadata.openGraph.images`. */
export function ogImages(url: string, alt: string) {
  return [{ url, width: 1200, height: 630, alt }];
}

/** JSON-LD schema.org — Slowmundo as a TravelAgency (site-wide). */
export const travelAgencySchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Agence de voyage bas carbone à Rennes. Slowmundo organise vos voyages personnalisés en train à travers l'Europe et l'Asie.",
  logo: `${SITE_URL}/img/slowmundo/alexis-portrait.webp`,
  image: `${SITE_URL}/img/slowmundo/gotthard-tessin/locarno-lac-majeur.webp`,
  telephone: "+33-6-76-37-18-39",
  email: "alexisjupin@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rennes",
    addressCountry: "FR",
  },
  areaServed: [
    { "@type": "Continent", name: "Europe" },
    { "@type": "Continent", name: "Asie" },
  ],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Organisation de voyages bas carbone sur mesure",
    },
  },
};

/** JSON-LD schema.org — one specific trip. */
export function tripSchema(trip: Trip) {
  const url = `${SITE_URL}/voyages/${getCountrySlug(trip)}/${getTripSlug(trip)}`;
  const itinerary =
    trip.itinerary?.map((day) => ({
      "@type": "TouristAttraction",
      name: day.title,
      description: day.desc,
      ...(day.lat && day.lng
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: day.lat,
              longitude: day.lng,
            },
          }
        : {}),
    })) ?? [];

  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trip.title,
    description: trip.description,
    image: [
      trip.image.startsWith("http") ? trip.image : `${SITE_URL}${trip.image}`,
      ...(trip.images ?? []).map((img) =>
        img.startsWith("http") ? img : `${SITE_URL}${img}`
      ),
    ],
    url,
    touristType: trip.type,
    provider: { "@type": "TravelAgency", name: SITE_NAME, url: SITE_URL },
    offers: {
      "@type": "Offer",
      price: trip.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url,
    },
    itinerary,
  };
}

/** JSON-LD schema.org — one blog article. */
export function articleSchema(article: Article) {
  const url = `${SITE_URL}/blog/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image?.startsWith("http")
      ? article.image
      : `${SITE_URL}${article.image}`,
    datePublished: article.date,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/img/slowmundo/alexis-portrait.webp`,
      },
    },
    mainEntityOfPage: url,
  };
}

/** JSON-LD schema.org — breadcrumb navigation. */
export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
