/**
 * Centralized env vars for Sanity — throws early if any is missing at build/dev.
 * NEXT_PUBLIC_ vars are safe to expose client-side (projectId, dataset).
 * SANITY_API_READ_TOKEN is server-only.
 */

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing env var: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing env var: NEXT_PUBLIC_SANITY_DATASET"
);

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

/** Server-only: never expose to the client. */
export const readToken = process.env.SANITY_API_READ_TOKEN;

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}
