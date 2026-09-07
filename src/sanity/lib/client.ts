import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Read-only Sanity client for the public site (SSG/ISR).
 * No token here — this client is safe to bundle client-side too.
 * For draft previews or mutations, create a separate authenticated client.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // fast global CDN — fine for public read
  perspective: "published",
});
