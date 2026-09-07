import { z } from 'zod';
import { slugify } from '@/utils/slugify';

/**
 * Validation schema for a Trip stored in localStorage.
 * Anyone can write to localStorage via DevTools or an XSS in the future,
 * so we treat the parsed content as untrusted input.
 */
const StoredTripSchema = z.object({
  id: z.number().int(),
  title: z.string().min(1).max(300),
  image: z.string().min(1).max(600),
  continent: z.string().min(1).max(60),
  country: z.string().min(1).max(60),
  type: z.string().min(1).max(100),
  transport: z.string().min(1).max(100),
  duration: z.string().min(1).max(60),
  tag: z.string().max(60),
  price: z.number().nonnegative(),
  description: z.string().max(3000).optional(),
  images: z.array(z.string().max(600)).max(20).optional(),
  accommodation: z.string().max(200).optional(),
  idealPeriod: z.string().max(200).optional(),
  highlights: z.array(z.string().max(400)).max(30).optional(),
  included: z.array(z.string().max(400)).max(50).optional(),
  notIncluded: z.array(z.string().max(400)).max(50).optional(),
  itinerary: z.array(z.any()).max(100).optional(),
  brochure: z.string().max(600).optional(),
});

export interface ItineraryActivity {
  time: string;
  title: string;
  desc?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  desc: string;
  rhythm?: 'Doux' | 'Modéré' | 'Soutenu';
  images?: string[];
  activities?: ItineraryActivity[];
  locationName?: string;
  coords?: { x: number; y: number };
  lat?: number;
  lng?: number;
}

export interface Trip {
  id: number;
  title: string;
  image: string;
  continent: string;
  country: string;
  type: string;
  transport: string;
  duration: string;
  tag: string;
  price: number;
  description?: string;
  images?: string[];
  itinerary?: ItineraryDay[];
  highlights?: string[];
  included?: string[];
  notIncluded?: string[];
  accommodation?: string;
  idealPeriod?: string;
  /** Absolute path to the brochure PDF served from /public. */
  brochure?: string;
}

/**
 * Real Slowmundo trips. Additional trips will be added via Sanity CMS.
 * Images are Slowmundo placeholders — replace with the real brochure shots when available.
 */
export const TRIPS: Trip[] = [];

/** Country slug (first URL segment). */
export function getCountrySlug(trip: Pick<Trip, 'country'>): string {
  return slugify(trip.country);
}

/** Trip slug (second URL segment) — derived from the title. */
export function getTripSlug(trip: Pick<Trip, 'title'>): string {
  return slugify(trip.title);
}

/** Full URL path to a trip's detail page. */
export function getTripUrl(trip: Pick<Trip, 'country' | 'title'>): string {
  return `/voyages/${getCountrySlug(trip)}/${getTripSlug(trip)}`;
}

/** All trips matching a country slug. Empty array if unknown. */
export function getTripsByCountrySlug(
  countrySlug: string,
  trips: Trip[] = TRIPS
): Trip[] {
  const target = countrySlug.toLowerCase();
  return trips.filter((t) => slugify(t.country) === target);
}

/** Exact trip by country + trip slug. Undefined if unknown. */
export function getTripByCountryAndSlug(
  countrySlug: string,
  tripSlug: string,
  trips: Trip[] = TRIPS
): Trip | undefined {
  const country = countrySlug.toLowerCase();
  const slug = tripSlug.toLowerCase();
  return trips.find(
    (t) => slugify(t.country) === country && slugify(t.title) === slug
  );
}

/**
 * Legacy: single-trip-per-country lookup (used before nested routes).
 * Kept to ease incremental migration; new code should use getTripByCountryAndSlug.
 */
export function getTripByCountrySlug(slug: string, trips: Trip[] = TRIPS): Trip | undefined {
  const target = slug.toLowerCase();
  return trips.find((t) => slugify(t.country) === target);
}

export function getStoredTrips(): Trip[] {
  // Guard SSR : localStorage is client-only.
  if (typeof window === 'undefined') return TRIPS;
  try {
    const raw = localStorage.getItem('slowmundo_custom_trips');
    if (!raw) return TRIPS;
    const parsed = JSON.parse(raw);
    // Only keep entries that pass the schema — silently drop the rest.
    const safeTrips = z.array(StoredTripSchema).safeParse(parsed);
    if (safeTrips.success) return [...TRIPS, ...(safeTrips.data as Trip[])];
    // Partial success: filter valid ones from a mixed array
    if (Array.isArray(parsed)) {
      const valid = parsed
        .map((item) => StoredTripSchema.safeParse(item))
        .filter((r) => r.success)
        .map((r) => r.data as Trip);
      return [...TRIPS, ...valid];
    }
  } catch {
    // JSON.parse failure or storage unavailable — fall through
  }
  return TRIPS;
}

export function saveNewTrip(tripData: Omit<Trip, 'id'>): Trip {
  const current = getStoredTrips();
  const nextId = current.length > 0 ? Math.max(...current.map(t => t.id)) + 1 : 1;
  const newTrip: Trip = { ...tripData, id: nextId };

  try {
    const customRaw = localStorage.getItem('slowmundo_custom_trips');
    const customList: Trip[] = customRaw ? JSON.parse(customRaw) : [];
    customList.push(newTrip);
    localStorage.setItem('slowmundo_custom_trips', JSON.stringify(customList));
  } catch (e) {
    console.error('Error saving new trip to localStorage', e);
  }

  return newTrip;
}
