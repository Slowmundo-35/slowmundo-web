import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { getAllArticles, getArticleBySlug } from "@/lib/sanity.queries";
import type { Article } from "@/data/articlesData";
import ArticleClient from "./ArticleClient";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
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
  const article = await getArticleBySlug(slug);
  // Fetch up to 3 other articles as "related" — cheap because we already
  // cache the /blog list; Sanity dedups the query at the CDN level.
  const allArticles = article ? await getAllArticles() : [];
  const relatedArticles = allArticles.filter((a) => a.slug !== slug).slice(0, 3);
  return (
    <>
      {article && (
        <>
          <JsonLd
            data={articleSchema({
              slug: article.slug,
              title: article.title,
              excerpt: article.excerpt,
              image: article.image,
              date: article.date,
            } as Article)}
          />
          <JsonLd
            data={breadcrumbSchema([
              { name: "Accueil", url: "/" },
              { name: "Blog", url: "/blog" },
              { name: article.title, url: `/blog/${article.slug}` },
            ])}
          />
        </>
      )}
      <ArticleClient article={article} relatedArticles={relatedArticles} />
    </>
  );
}
