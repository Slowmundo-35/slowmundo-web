"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

/**
 * Renders Sanity Portable Text with sensible defaults for a blog article.
 * - Headings map to h2/h3/h4 (h1 belongs to the page, not the body)
 * - Images use the Sanity CDN with sensible sizes
 * - Internal links use next/link, external links open safely in a new tab
 */
const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const src = urlFor(value).width(1200).auto("format").url();
      const alt = value.alt || "";
      return (
        <figure className="my-8 not-prose">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="w-full h-auto rounded-2xl shadow-sm"
          />
          {alt && (
            <figcaption className="text-xs text-text-muted mt-2 text-center italic">
              {alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-text-main mt-12 mb-4 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold text-text-main mt-8 mb-3 leading-snug">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold text-text-main mt-6 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/40 pl-4 italic text-text-muted my-6">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-text-main text-base">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-1.5 text-text-main">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1.5 text-text-main">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-text-main">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = (value?.href ?? "#") as string;
      const isExternal = /^https?:\/\//i.test(href);
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold underline hover:text-primary/80"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className="text-primary font-semibold underline hover:text-primary/80"
        >
          {children}
        </Link>
      );
    },
  },
};

export default function PortableTextRenderer({ value }: { value?: PortableTextBlock[] }) {
  if (!value || value.length === 0) return null;
  return <PortableText value={value} components={components} />;
}
