import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { faqPageSchema } from "@/lib/seo";
import { HOME_FAQS } from "@/data/homeFaqs";
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
  return (
    <>
      {/* Emit FAQPage JSON-LD from the same source the home accordion
          uses, so schema.org markup and rendered answers stay strictly in
          sync — required for Google to consider the schema valid. */}
      <JsonLd data={faqPageSchema(HOME_FAQS)} />
      <HomeClient />
    </>
  );
}
