import "server-only";
import { client } from "@/sanity/lib/client";
import type { ItineraryDay, Trip } from "@/data/trips";

/**
 * Trip fetchers. All queries dereference Sanity image / file assets to a plain
 * URL string, so the returned objects match the existing `Trip` TS shape
 * consumed by the client components. Zero mapping work at the call site.
 */

// Fields common to every projection — kept in one place to stay DRY.
const TRIP_LIST_FIELDS = `
  "id": _id,
  title,
  "slug": slug.current,
  country,
  continent,
  type,
  transport,
  duration,
  price,
  tag,
  description,
  "image": image.asset->url
`;

const TRIP_DETAIL_FIELDS = `
  ${TRIP_LIST_FIELDS},
  "images": images[].asset->url,
  accommodation,
  idealPeriod,
  highlights,
  included,
  notIncluded,
  "brochure": brochure.asset->url,
  itinerary[] {
    day,
    title,
    locationName,
    lat,
    lng,
    rhythm,
    desc,
    "images": images[].asset->url
  }
`;

const ORDER_BY_PRICE = `order(price asc)`;

// Every field returned by GROQ is `unknown` — declare the raw shape once so we
// can narrow at the boundary and hand the rest of the app a real `Trip`.
type SanityTripRaw = {
  id?: string;
  title?: string;
  slug?: string;
  country?: string;
  continent?: string;
  type?: string;
  transport?: string;
  duration?: string;
  price?: number;
  tag?: string;
  description?: string;
  image?: string;
  images?: (string | null)[];
  accommodation?: string;
  idealPeriod?: string;
  highlights?: string[];
  included?: string[];
  notIncluded?: string[];
  brochure?: string;
  itinerary?: Array<
    Partial<ItineraryDay> & { images?: (string | null)[] }
  >;
};

function normalize(raw: SanityTripRaw): Trip {
  return {
    id: (raw.id ?? "unknown-id") as unknown as Trip["id"],
    title: raw.title ?? "",
    image: raw.image ?? "",
    continent: raw.continent ?? "Europe",
    country: raw.country ?? "",
    type: raw.type ?? "",
    transport: raw.transport ?? "",
    duration: raw.duration ?? "",
    tag: raw.tag ?? "",
    price: raw.price ?? 0,
    description: raw.description,
    images: (raw.images ?? []).filter((u): u is string => !!u),
    accommodation: raw.accommodation,
    idealPeriod: raw.idealPeriod,
    highlights: raw.highlights,
    included: raw.included,
    notIncluded: raw.notIncluded,
    brochure: raw.brochure,
    itinerary: raw.itinerary?.map((d) => ({
      day: d.day ?? 0,
      title: d.title ?? "",
      desc: d.desc ?? "",
      locationName: d.locationName,
      lat: d.lat,
      lng: d.lng,
      rhythm: d.rhythm,
      images: (d.images ?? []).filter((u): u is string => !!u),
    })) as ItineraryDay[] | undefined,
  };
}

/** All trips, sorted by price ascending. Used by the /voyages grid + sitemap. */
export async function getAllTrips(): Promise<Trip[]> {
  const query = `*[_type == "trip"] | ${ORDER_BY_PRICE} { ${TRIP_LIST_FIELDS} }`;
  const raw = await client.fetch<SanityTripRaw[]>(query, {}, {
    next: { revalidate: 60, tags: ["trips"] },
  });
  return (raw ?? []).map(normalize);
}

/**
 * Trips filtered by their `country` field slugified in JS (not GROQ) — the
 * data model doesn't store a country slug directly, and Sanity's regex is
 * more limited than a proper slugify. Cheap enough given trip count.
 */
export async function getTripsByCountrySlug(countrySlug: string): Promise<Trip[]> {
  const all = await getAllTrips();
  const target = countrySlug.toLowerCase();
  return all.filter((t) => slugify(t.country) === target);
}

/** Full trip detail (with itinerary + gallery + brochure). Returns null if unknown. */
export async function getTripByCountryAndSlug(
  countrySlug: string,
  tripSlug: string
): Promise<Trip | null> {
  const query = `*[_type == "trip" && slug.current == $slug][0] { ${TRIP_DETAIL_FIELDS} }`;
  const raw = await client.fetch<SanityTripRaw | null>(
    query,
    { slug: tripSlug },
    { next: { revalidate: 60, tags: ["trips", `trip:${tripSlug}`] } }
  );
  if (!raw) return null;
  const trip = normalize(raw);
  // Verify the country slug in the URL matches the trip's actual country
  if (slugify(trip.country) !== countrySlug.toLowerCase()) return null;
  return trip;
}

/** Slug tuples used by sitemap.ts to enumerate every /voyages/[country]/[slug]. */
export async function getAllTripSlugs(): Promise<
  Array<{ country: string; slug: string }>
> {
  const query = `*[_type == "trip" && defined(slug.current) && defined(country)] { country, "slug": slug.current }`;
  const raw = await client.fetch<Array<{ country: string; slug: string }>>(
    query,
    {},
    { next: { revalidate: 60, tags: ["trips"] } }
  );
  return (raw ?? []).map((t) => ({
    country: slugify(t.country),
    slug: t.slug,
  }));
}

// Local slugify (avoids the shared @/utils/slugify import to keep this file
// self-contained and importable from `sitemap.ts` at build time).
function slugify(text: string | undefined | null): string {
  if (!text) return "";
  return text
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}
