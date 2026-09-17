import type { Metadata } from "next";
import { countryTranslations } from "@/data/countries";
import { slugify } from "@/utils/slugify";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, OG_DEFAULT_IMAGE, ogImages } from "@/lib/seo";
import { getTripsByCountrySlug } from "@/lib/sanity.queries";
import CountryClient from "./CountryClient";

type Params = { country: string };

/**
 * Prettify a country slug for display : "pays-bas" → "Pays-Bas", "grece" → "Grèce".
 * Prefers a real trip's country name, then the shared French dictionary, then
 * naïve capitalisation.
 */
function prettify(slug: string, tripCountry?: string): string {
  const dictMatch = Object.values(countryTranslations).find(
    (fr) => slugify(fr) === slug.toLowerCase()
  );
  if (dictMatch) return dictMatch;
  if (tripCountry && slugify(tripCountry) === slug.toLowerCase()) return tripCountry;
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("-");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { country } = await params;
  const trips = await getTripsByCountrySlug(country);
  const pretty = prettify(country, trips[0]?.country);
  const canonical = `/voyages/${country}`;
  if (trips.length === 0) {
    // Empty country listings are noindex so Google doesn't crawl a
    // thin-content page. `follow: true` still lets link equity flow, and
    // the page will flip back to indexable as soon as a trip lands in
    // Sanity for this country.
    const desc = `Voyage bas carbone en ${pretty} : nos itinéraires slow tourisme arrivent bientôt. Contactez Slowmundo pour créer votre voyage éco responsable sur mesure.`;
    return {
      title: `Voyage organisé en train en ${pretty}`,
      description: desc,
      alternates: { canonical },
      robots: { index: false, follow: true },
      openGraph: {
        title: `Voyage organisé en train en ${pretty} | Slowmundo`,
        description: desc,
        images: ogImages(OG_DEFAULT_IMAGE, `Voyage bas carbone en ${pretty} — Slowmundo`),
      },
      twitter: {
        card: "summary_large_image",
        title: `Voyage organisé en train en ${pretty} | Slowmundo`,
        description: desc,
        images: [OG_DEFAULT_IMAGE],
      },
    };
  }
  const count = trips.length;
  const descLead =
    count === 1 ? `découvrez notre itinéraire` : `découvrez nos ${count} itinéraires`;
  const ogLead = count === 1 ? "Notre itinéraire" : `Nos ${count} itinéraires`;
  const heroImage = trips[0]?.image ?? OG_DEFAULT_IMAGE;
  const ogTitle = `Voyage organisé en train en ${pretty} | Slowmundo`;
  const ogDesc = `${ogLead} bas carbone en ${pretty}, en train et en slow tourisme.`;
  return {
    title: `Voyage organisé en train en ${pretty}`,
    description: `Voyage organisé en train en ${pretty} : ${descLead} bas carbone Slowmundo. Voyage éco responsable et slow tourisme.`,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      images: ogImages(heroImage, `Voyage bas carbone en ${pretty} — Slowmundo`),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDesc,
      images: [heroImage],
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { country } = await params;
  const trips = await getTripsByCountrySlug(country);
  const pretty = prettify(country, trips[0]?.country);
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Voyages", url: "/voyages" },
          { name: `Voyages en ${pretty}`, url: `/voyages/${country}` },
        ])}
      />
      <CountryClient countrySlug={country} countryName={pretty} trips={trips} />
    </>
  );
}
