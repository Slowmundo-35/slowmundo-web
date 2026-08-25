import type { Metadata } from "next";
import HomeClient from "./HomeClient";

// Page racine — override the layout defaults to keep title distinct from the template `%s | Slowmundo`.
export const metadata: Metadata = {
  title: {
    absolute: "Slowmundo — Agence de voyage bas carbone en train | Europe & Asie",
  },
  description:
    "Voyage éco responsable en train à travers l'Europe et l'Asie. Slowmundo, agence de voyage bas carbone à Rennes, conçoit vos itinéraires personnalisés en slow tourisme.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomeClient />;
}
