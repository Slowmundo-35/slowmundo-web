import type { Metadata } from "next";
import { ogImages } from "@/lib/seo";
import AProposClient from "./AProposClient";

export const metadata: Metadata = {
  title: "À propos — Agence de voyage bas carbone à Rennes",
  description:
    "Slowmundo est une agence de voyage bas carbone basée à Rennes. Découvrez Alexis, notre approche du slow tourisme et notre vision d'un voyage éco responsable en train.",
  alternates: { canonical: "/a-propos" },
  openGraph: {
    title: "Agence de voyage bas carbone à Rennes | Slowmundo",
    description:
      "Notre approche du slow tourisme et notre vision d'un voyage éco responsable en train, avec Alexis à Rennes.",
    images: ogImages(
      "/img/slowmundo/alexis-portrait.webp",
      "Alexis, fondateur de Slowmundo"
    ),
  },
};

export default function Page() {
  return <AProposClient />;
}
