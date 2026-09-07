"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

/**
 * Client-only wrapper — Sanity Studio uses React Context and can't run
 * inside a React Server Component. Rendered by the sibling page.tsx.
 */
export default function Studio() {
  return <NextStudio config={config} />;
}
