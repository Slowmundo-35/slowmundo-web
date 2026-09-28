import type { Metadata } from "next";
import { getAllTrips } from "@/lib/sanity.queries";
import { getTripTypes, matchesTripType } from "@/data/trips";
import { slugify } from "@/utils/slugify";
import StyleVoyageClient from "./StyleVoyageClient";

type Params = { styleSlug: string };

// Fallback labels for the 8 styles the homepage advertises — used when
// no trip in Sanity carries that type yet, so we can still show a
// friendly "aucun itinéraire pour l'instant" page instead of a 404.
const HOMEPAGE_STYLE_LABELS: Record<string, string> = {
  "culture-et-patrimoine": "Culture et patrimoine",
  "gastronomie": "Gastronomie",
  "en-train": "En train",
  "bas-carbone": "Bas carbone",
  "nature-et-grands-espaces": "Nature et grands espaces",
  "hors-des-sentiers-battus": "Hors des sentiers battus",
  "itineraires-transfrontaliers": "Itinéraires transfrontaliers",
  "romantique": "Romantique",
};

/**
 * Resolve the human-readable style name that a URL slug points to.
 * Looks first at every type carried by every published trip; when no
 * trip uses that type yet, falls back to the homepage's fixed style
 * labels so the page still renders (empty) instead of 404-ing.
 */
async function resolveStyle(styleSlug: string) {
  const trips = await getAllTrips();
  const decoded = decodeURIComponent(styleSlug);
  const matchedTypeName = trips
    .flatMap(getTripTypes)
    .find((t) => slugify(t) === decoded);

  const name =
    matchedTypeName ?? HOMEPAGE_STYLE_LABELS[decoded] ?? decoded.replace(/-/g, " ");
  const styleTrips = matchedTypeName
    ? trips.filter((t) => matchesTripType(t, matchedTypeName))
    : [];
  return { name, trips: styleTrips };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { styleSlug } = await params;
  const { name, trips } = await resolveStyle(styleSlug);
  return {
    title: `Voyages ${name} — style d'exploration`,
    description: `Découvrez nos voyages « ${name} » — sélection Slowmundo d'itinéraires bas carbone.`,
    alternates: { canonical: `/styles/${styleSlug}` },
    // Only index when at least one trip actually matches, otherwise
    // this is a thin/empty page and shouldn't compete in search.
    robots: trips.length > 0 ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export async function generateStaticParams(): Promise<Params[]> {
  const trips = await getAllTrips();
  const slugs = new Set<string>(Object.keys(HOMEPAGE_STYLE_LABELS));
  for (const trip of trips) for (const type of getTripTypes(trip)) slugs.add(slugify(type));
  return [...slugs].map((styleSlug) => ({ styleSlug }));
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { styleSlug } = await params;
  const { name, trips } = await resolveStyle(styleSlug);
  return <StyleVoyageClient styleName={name} trips={trips} />;
}
