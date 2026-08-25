import type { Metadata } from "next";
import { getCountrySlug, getTripByCountryAndSlug, getTripSlug } from "@/data/trips";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, tripSchema } from "@/lib/seo";
import VoyageDetailsClient from "./VoyageDetailsClient";

type Params = { country: string; slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { country, slug } = await params;
  const trip = getTripByCountryAndSlug(country, slug);
  if (!trip) {
    return { title: "Voyage introuvable" };
  }
  const canonical = `/voyages/${getCountrySlug(trip)}/${getTripSlug(trip)}`;
  return {
    title: trip.title,
    description:
      trip.description?.slice(0, 160) ??
      `Découvrez notre voyage ${trip.title} — un itinéraire bas carbone Slowmundo.`,
    alternates: { canonical },
    openGraph: {
      title: trip.title,
      description: trip.description?.slice(0, 200),
      images: [trip.image],
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { country, slug } = await params;
  const trip = getTripByCountryAndSlug(country, slug);

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
      <VoyageDetailsClient />
    </>
  );
}
