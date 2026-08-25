import type { Metadata } from "next";
import { getTripsByCountrySlug, TRIPS } from "@/data/trips";
import { countryTranslations } from "@/data/countries";
import { slugify } from "@/utils/slugify";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, OG_DEFAULT_IMAGE, ogImages } from "@/lib/seo";
import CountryClient from "./CountryClient";

type Params = { country: string };

/** Prettify a country slug for display : "pays-bas" → "Pays-Bas", "grece" → "Grèce" */
function prettify(slug: string, trips = TRIPS): string {
  // 1st: a real trip's country (Sanity/TRIPS is source of truth once populated)
  const tripMatch = trips.find((t) => slugify(t.country) === slug.toLowerCase());
  if (tripMatch) return tripMatch.country;
  // 2nd: the shared French country dictionary
  const dictMatch = Object.values(countryTranslations).find(
    (fr) => slugify(fr) === slug.toLowerCase()
  );
  if (dictMatch) return dictMatch;
  // Fallback: naïve capitalization
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
  const pretty = prettify(country);
  const trips = getTripsByCountrySlug(country);
  const canonical = `/voyages/${country}`;
  if (trips.length === 0) {
    return {
      title: `Voyage organisé en train en ${pretty}`,
      description: `Voyage bas carbone en ${pretty} : nos itinéraires slow tourisme arrivent bientôt. Contactez Slowmundo pour créer votre voyage éco responsable sur mesure.`,
      alternates: { canonical },
    };
  }
  const count = trips.length;
  const descLead =
    count === 1
      ? `découvrez notre itinéraire`
      : `découvrez nos ${count} itinéraires`;
  const ogLead = count === 1 ? "Notre itinéraire" : `Nos ${count} itinéraires`;
  // Use the first available trip photo for the country, else the fallback.
  const heroImage = trips[0]?.image ?? OG_DEFAULT_IMAGE;
  return {
    title: `Voyage organisé en train en ${pretty}`,
    description: `Voyage organisé en train en ${pretty} : ${descLead} bas carbone Slowmundo. Voyage éco responsable et slow tourisme.`,
    alternates: { canonical },
    openGraph: {
      title: `Voyage organisé en train en ${pretty} | Slowmundo`,
      description: `${ogLead} bas carbone en ${pretty}, en train et en slow tourisme.`,
      images: ogImages(heroImage, `Voyage bas carbone en ${pretty} — Slowmundo`),
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { country } = await params;
  const pretty = prettify(country);
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Voyages", url: "/voyages" },
          { name: `Voyages en ${pretty}`, url: `/voyages/${country}` },
        ])}
      />
      <CountryClient countrySlug={country} countryName={pretty} />
    </>
  );
}
