import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Slowmundo pour concevoir votre voyage bas carbone sur mesure en Europe ou en Asie.",
};

export default function Page() {
  return <ContactClient />;
}
