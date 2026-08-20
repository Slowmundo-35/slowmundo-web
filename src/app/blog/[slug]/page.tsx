import type { Metadata } from "next";
import { articlesData } from "@/data/articlesData";
import ArticleClient from "./ArticleClient";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articlesData.find((a) => a.slug === slug);
  if (!article) {
    return { title: "Article introuvable" };
  }
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.image ? [{ url: article.image }] : undefined,
      type: "article",
    },
  };
}

export default function Page() {
  return <ArticleClient />;
}
