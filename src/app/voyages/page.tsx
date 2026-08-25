import type { Metadata } from "next";
import { Suspense } from "react";
import VoyagesClient from "./VoyagesClient";

export const metadata: Metadata = {
  title: "Nos voyages",
  description:
    "Découvrez tous les voyages bas carbone Slowmundo — itinéraires en train à travers l'Europe et l'Asie, filtrables par pays, style et durée.",
  alternates: { canonical: "/voyages" },
};

export default function Page() {
  // Voyages uses useSearchParams → wrap in Suspense (Next 15 requirement)
  return (
    <Suspense fallback={null}>
      <VoyagesClient />
    </Suspense>
  );
}
