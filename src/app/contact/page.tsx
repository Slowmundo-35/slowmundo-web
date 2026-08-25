import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — Créez votre voyage bas carbone sur mesure",
  description:
    "Contactez Slowmundo pour concevoir votre voyage éco responsable sur mesure en train, en Europe ou en Asie. Devis gratuit et personnalisé.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Slowmundo",
    description:
      "Créez votre voyage bas carbone sur mesure en train. Devis gratuit avec Alexis, à Rennes.",
  },
};

export default function Page() {
  return <ContactClient />;
}
