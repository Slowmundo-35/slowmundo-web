import type { Metadata } from "next";
import { getTripsByCountrySlug, TRIPS } from "@/data/trips";
import { countryTranslations } from "@/data/countries";
import { slugify } from "@/utils/slugify";
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
  if (trips.length === 0) {
    return {
      title: `Voyages en ${pretty}`,
      description: `Nos itinéraires bas carbone à venir en ${pretty}.`,
    };
  }
  return {
    title: `Voyages en ${pretty}`,
    description: `Découvrez nos ${trips.length} voyage${trips.length > 1 ? "s" : ""} bas carbone en ${pretty} — itinéraires en train imaginés par Slowmundo.`,
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { country } = await params;
  return <CountryClient countrySlug={country} countryName={prettify(country)} />;
}
