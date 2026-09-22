import type { Metadata } from "next";
import { ogImages } from "@/lib/seo";
import { getAllArticles } from "@/lib/sanity.queries";
import BlogClient from "./BlogClient";

const BLOG_TITLE = "Blog voyage bas carbone & slow tourisme";
const BLOG_DESC =
  "Articles, guides et inspirations pour voyager éco responsable : itinéraires en train, écotourisme et slow tourisme en Europe et en Asie.";
const BLOG_OG_TITLE = `${BLOG_TITLE} | Slowmundo`;
const BLOG_OG_DESC =
  "Guides et récits pour organiser un voyage éco responsable en train, en Europe et en Asie.";
const BLOG_IMAGE = "/img/slowmundo/paysage-italie.webp";
const BLOG_IMAGE_ALT = "Blog Slowmundo — voyage bas carbone & slow tourisme";

export const metadata: Metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESC,
  alternates: { canonical: "/blog" },
  robots: { index: true, follow: true },
  openGraph: {
    title: BLOG_OG_TITLE,
    description: BLOG_OG_DESC,
    images: ogImages(BLOG_IMAGE, BLOG_IMAGE_ALT),
  },
  twitter: {
    card: "summary_large_image",
    title: BLOG_OG_TITLE,
    description: BLOG_OG_DESC,
    images: [BLOG_IMAGE],
  },
};

export default async function Page() {
  const articles = await getAllArticles();
  return <BlogClient articles={articles} />;
}
