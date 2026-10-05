import type { Metadata } from "next";
import PolitiqueConfidentialiteClient from "./PolitiqueConfidentialiteClient";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de Slow Mundo — traitement des données personnelles.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <PolitiqueConfidentialiteClient />;
}
