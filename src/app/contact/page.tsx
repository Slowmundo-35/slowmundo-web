import type { Metadata } from "next";
import { ogImages } from "@/lib/seo";
import ContactClient from "./ContactClient";

const CONTACT_OG_TITLE = "Contact | Slowmundo";
const CONTACT_OG_DESC =
  "Créez votre voyage bas carbone sur mesure en train. Devis gratuit avec Alexis, à Rennes.";
const CONTACT_IMAGE = "/img/slowmundo/alexis-devant-train.webp";

export const metadata: Metadata = {
  title: "Contact — Créez votre voyage bas carbone sur mesure",
  description:
    "Contactez Slowmundo pour concevoir votre voyage éco responsable sur mesure en train, en Europe ou en Asie. Devis gratuit et personnalisé.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: CONTACT_OG_TITLE,
    description: CONTACT_OG_DESC,
    images: ogImages(CONTACT_IMAGE, "Contactez Alexis, fondateur de Slowmundo"),
  },
  twitter: {
    card: "summary_large_image",
    title: CONTACT_OG_TITLE,
    description: CONTACT_OG_DESC,
    images: [CONTACT_IMAGE],
  },
};

export default function Page() {
  return <ContactClient />;
}
