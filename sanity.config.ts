import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { projectId, dataset } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemas";

/**
 * Sanity Studio config — embedded in the Next.js app at /studio.
 * Alexis logs in with his Google account (contact@slowmundo.fr) and edits
 * trips + articles from the same domain as the public site.
 */
export default defineConfig({
  name: "slowmundo-studio",
  title: "Slowmundo",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool()],
});
