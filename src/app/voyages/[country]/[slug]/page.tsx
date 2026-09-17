import type { Metadata } from "next";
import { getCountrySlug, getTripSlug } from "@/data/trips";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, ogImages, tripSchema } from "@/lib/seo";
import { getTripByCountryAndSlug } from "@/lib/sanity.queries";
import VoyageDetailsClient from "./VoyageDetailsClient";

type Params = { country: string; slug: string };

/**
 * Trim a string to fit `max` characters, but cut at the last word boundary
 * before that limit and add an ellipsis — so meta descriptions never end
 * on a half-word like "…où les Alpes ren".
 */
function truncateWholeWord(s: string, max: number): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > 80 ? cut.slice(0, lastSpace) : cut;
  return base.replace(/[\s,;.:—-]+$/, "") + "…";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { country, slug } = await params;
  const trip = await getTripByCountryAndSlug(country, slug);
  if (!trip) {
    return { title: "Voyage introuvable", robots: { index: false, follow: false } };
  }
  const canonical = `/voyages/${getCountrySlug(trip)}/${getTripSlug(trip)}`;
  // Search engines truncate meta descriptions at ~155-160 characters, so
  // we keep two independent lengths: a short `description` that survives
  // Google's SERP snippet clean, and a fuller `rawDescription` that OG /
  // Twitter can afford (they render up to ~200-300 chars in previews).
  const rawDescription =
    trip.description?.slice(0, 200) ??
    `Voyage bas carbone en ${trip.country} : notre itinéraire ${trip.title}, en train et en slow tourisme.`;
  const keywordPrefix = `Voyage organisé en train en ${trip.country}, ${trip.duration}, à partir de ${trip.price}€. `;
  const description = truncateWholeWord(keywordPrefix + rawDescription, 155);
  return {
    title: trip.title,
    description,
    alternates: { canonical },
    keywords: [
      `voyage organisé en train en ${trip.country}`,
      `voyage bas carbone ${trip.country}`,
      "voyage éco responsable",
      "slow tourisme",
      ...trip.title.toLowerCase().split(/[\s—]+/).filter((w) => w.length > 4),
    ],
    openGraph: {
      title: trip.title,
      description: rawDescription,
      type: "website",
      images: ogImages(trip.image, `${trip.title} — Slowmundo`),
    },
    twitter: {
      card: "summary_large_image",
      title: trip.title,
      description: rawDescription,
      images: [trip.image],
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { country, slug } = await params;
  const trip = await getTripByCountryAndSlug(country, slug);

  return (
    <>
      {trip && (
        <>
          <JsonLd data={tripSchema(trip)} />
          <JsonLd
            data={breadcrumbSchema([
              { name: "Accueil", url: "/" },
              { name: "Voyages", url: "/voyages" },
              { name: `Voyages en ${trip.country}`, url: `/voyages/${getCountrySlug(trip)}` },
              { name: trip.title, url: `/voyages/${getCountrySlug(trip)}/${getTripSlug(trip)}` },
            ])}
          />
        </>
      )}
      <VoyageDetailsClient trip={trip} />
    </>
  );
}
