import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Server-only Sanity client with write permissions.
 * Used by the /api/contact route to persist form submissions.
 * NEVER import from a client component — the token would leak.
 *
 * The token must have "Editor" role (same one that imports Gotthard trips
 * or any other content). If you keep SANITY_API_READ_TOKEN as an Editor
 * token, you can reuse it here as SANITY_API_WRITE_TOKEN — or set them
 * to the same value in env; separate names just make the intent explicit.
 */

const writeToken =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // writes must hit the live API, not the CDN
  token: writeToken,
});

export function assertWriteTokenPresent() {
  if (!writeToken) {
    throw new Error(
      "Missing Sanity write token: set SANITY_API_WRITE_TOKEN (or reuse SANITY_API_READ_TOKEN with Editor role)"
    );
  }
}
