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
  // Prefix the description with the target keyword when it's absent, so meta stays SEO-focused.
  const rawDescription =
    trip.description?.slice(0, 200) ??
    `Voyage bas carbone en ${trip.country} : notre itinéraire ${trip.title}, en train et en slow tourisme.`;
  const keywordPrefix = `Voyage organisé en train en ${trip.country}, ${trip.duration}, à partir de ${trip.price}€. `;
  const description = (keywordPrefix + rawDescription).slice(0, 300);
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
