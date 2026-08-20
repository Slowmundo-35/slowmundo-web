import type { Metadata } from "next";
import AProposClient from "./AProposClient";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Slowmundo est une agence de voyage bas carbone basée à Rennes. Découvrez notre histoire, notre équipe et notre vision du slow travel.",
};

export default function Page() {
  return <AProposClient />;
}
