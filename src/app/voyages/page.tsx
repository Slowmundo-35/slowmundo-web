import type { Metadata } from "next";
import { Suspense } from "react";
import VoyagesClient from "./VoyagesClient";

export const metadata: Metadata = {
  title: "Voyages organisés en train en Europe & Asie",
  description:
    "Voyage organisé en train en Europe et en Asie : découvrez tous nos itinéraires bas carbone Slowmundo. Voyages éco responsables filtrables par pays, style et durée.",
  alternates: { canonical: "/voyages" },
  openGraph: {
    title: "Voyages organisés en train en Europe & Asie | Slowmundo",
    description:
      "Nos itinéraires bas carbone en train à travers l'Europe et l'Asie, en slow tourisme.",
  },
};

export default function Page() {
  // Voyages uses useSearchParams → wrap in Suspense (Next 15 requirement)
  return (
    <Suspense fallback={null}>
      <VoyagesClient />
    </Suspense>
  );
}
