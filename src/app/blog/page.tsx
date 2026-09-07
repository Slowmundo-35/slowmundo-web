import type { Metadata } from "next";
import { ogImages } from "@/lib/seo";
import { getAllArticles } from "@/lib/sanity.queries";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog voyage bas carbone & slow tourisme",
  description:
    "Articles, guides et inspirations pour voyager éco responsable : itinéraires en train, écotourisme et slow tourisme en Europe et en Asie.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog voyage bas carbone & slow tourisme | Slowmundo",
    description:
      "Guides et récits pour organiser un voyage éco responsable en train, en Europe et en Asie.",
    images: ogImages(
      "/img/slowmundo/paysage-italie.webp",
      "Blog Slowmundo — voyage bas carbone & slow tourisme"
    ),
  },
};

export default async function Page() {
  const articles = await getAllArticles();
  return <BlogClient articles={articles} />;
}
