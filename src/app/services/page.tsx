import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Nos services — Voyage bas carbone sur mesure",
  description:
    "Voyage bas carbone sur mesure : Slowmundo conçoit vos itinéraires ferroviaires, sélectionne vos hébergements engagés et vous accompagne de A à Z pour un voyage éco responsable.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Voyage bas carbone sur mesure | Slowmundo",
    description:
      "Itinéraires ferroviaires, hébergements engagés, accompagnement de A à Z. Slowmundo, votre agence de voyage bas carbone.",
  },
};

export default function Page() {
  return <ServicesClient />;
}
