import type { Metadata } from "next";
import { articlesData } from "@/data/articlesData";
import JsonLd from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
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
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.image ? [{ url: article.image }] : undefined,
      type: "article",
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = articlesData.find((a) => a.slug === slug);
  return (
    <>
      {article && (
        <>
          <JsonLd data={articleSchema(article)} />
          <JsonLd
            data={breadcrumbSchema([
              { name: "Accueil", url: "/" },
              { name: "Blog", url: "/blog" },
              { name: article.title, url: `/blog/${article.slug}` },
            ])}
          />
        </>
      )}
      <ArticleClient />
    </>
  );
}
