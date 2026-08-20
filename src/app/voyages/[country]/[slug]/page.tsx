import type { Metadata } from "next";
import { getTripByCountryAndSlug } from "@/data/trips";
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
  return {
    title: trip.title,
    description:
      trip.description?.slice(0, 160) ??
      `Découvrez notre voyage ${trip.title} — un itinéraire bas carbone Slowmundo.`,
  };
}

export default function Page() {
  return <VoyageDetailsClient />;
}
