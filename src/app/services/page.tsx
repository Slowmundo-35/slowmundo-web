import type { Metadata } from "next";
import { faqPageSchema, ogImages } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { SERVICES_FAQS } from "@/data/servicesFaqs";
import ServicesClient from "./ServicesClient";

const SERVICES_OG_TITLE = "Voyage bas carbone sur mesure | Slowmundo";
const SERVICES_OG_DESC =
  "Itinéraires ferroviaires, hébergements engagés, accompagnement de A à Z. Slowmundo, votre agence de voyage bas carbone.";
const SERVICES_IMAGE = "/img/slowmundo/train-europe.webp";

export const metadata: Metadata = {
  title: "Nos services — Voyage bas carbone sur mesure",
  description:
    "Voyage bas carbone sur mesure : Slowmundo conçoit vos itinéraires ferroviaires, sélectionne vos hébergements engagés et vous accompagne de A à Z pour un voyage éco responsable.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: SERVICES_OG_TITLE,
    description: SERVICES_OG_DESC,
    images: ogImages(SERVICES_IMAGE, "Slowmundo — voyage bas carbone sur mesure"),
  },
  twitter: {
    card: "summary_large_image",
    title: SERVICES_OG_TITLE,
    description: SERVICES_OG_DESC,
    images: [SERVICES_IMAGE],
  },
};

export default function Page() {
  return (
    <>
      {/* Emit FAQPage JSON-LD from the same source the UI accordion uses,
          so the answers Googlebot sees are exactly the ones the page shows. */}
      <JsonLd data={faqPageSchema(SERVICES_FAQS)} />
      <ServicesClient />
    </>
  );
}
