import type { Metadata } from "next";
import { Suspense } from "react";
import { OG_DEFAULT_IMAGE, ogImages } from "@/lib/seo";
import { getAllTrips } from "@/lib/sanity.queries";
import VoyagesClient from "./VoyagesClient";

const VOYAGES_OG_TITLE = "Voyages organisés en train en Europe & Asie | Slowmundo";
const VOYAGES_OG_DESC =
  "Nos itinéraires bas carbone en train à travers l'Europe et l'Asie, en slow tourisme.";

export const metadata: Metadata = {
  title: "Voyages organisés en train en Europe & Asie",
  description:
    "Voyage organisé en train en Europe et en Asie : découvrez tous nos itinéraires bas carbone Slowmundo. Voyages éco responsables filtrables par pays, style et durée.",
  alternates: { canonical: "/voyages" },
  openGraph: {
    title: VOYAGES_OG_TITLE,
    description: VOYAGES_OG_DESC,
    images: ogImages(OG_DEFAULT_IMAGE, "Nos voyages Slowmundo"),
  },
  twitter: {
    card: "summary_large_image",
    title: VOYAGES_OG_TITLE,
    description: VOYAGES_OG_DESC,
    images: [OG_DEFAULT_IMAGE],
  },
};

export default async function Page() {
  const trips = await getAllTrips();
  return (
    <Suspense fallback={null}>
      <VoyagesClient trips={trips} />
    </Suspense>
  );
}
