import type { Metadata } from "next";
import { ogImages } from "@/lib/seo";
import AProposClient from "./AProposClient";

const APROPOS_OG_TITLE = "Agence de voyage bas carbone à Rennes | Slowmundo";
const APROPOS_OG_DESC =
  "Notre approche du slow tourisme et notre vision d'un voyage éco responsable en train, avec Alexis à Rennes.";
const APROPOS_IMAGE = "/img/slowmundo/alexis-portrait.webp";

export const metadata: Metadata = {
  title: "À propos — Agence de voyage bas carbone à Rennes",
  description:
    "Slowmundo est une agence de voyage bas carbone basée à Rennes. Découvrez Alexis, notre approche du slow tourisme et notre vision d'un voyage éco responsable en train.",
  alternates: { canonical: "/a-propos" },
  openGraph: {
    title: APROPOS_OG_TITLE,
    description: APROPOS_OG_DESC,
    images: ogImages(APROPOS_IMAGE, "Alexis, fondateur de Slowmundo"),
  },
  twitter: {
    card: "summary_large_image",
    title: APROPOS_OG_TITLE,
    description: APROPOS_OG_DESC,
    images: [APROPOS_IMAGE],
  },
};

export default function Page() {
  return <AProposClient />;
}
