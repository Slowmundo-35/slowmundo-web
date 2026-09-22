import { NextRequest, NextResponse } from "next/server";

/**
 * Geocoding proxy for the Sanity Studio "Générer les coordonnées" button.
 *
 * We proxy through our own server for two reasons:
 *   1. Nominatim's usage policy requires an identifying User-Agent — the
 *      browser can't set one, but Node can.
 *   2. Keeps the Studio CSP simple (connect-src 'self' is enough); the
 *      cross-origin call to Nominatim happens server-side.
 */
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim();
  if (!q) {
    return NextResponse.json({ error: "Missing q" }, { status: 400 });
  }
  if (q.length > 200) {
    return NextResponse.json({ error: "Query too long" }, { status: 400 });
  }

  const url =
    `https://nominatim.openstreetmap.org/search?` +
    new URLSearchParams({
      q,
      format: "json",
      limit: "1",
      "accept-language": "fr",
    });

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Slowmundo Studio (contact@slowmundo.fr)",
        Accept: "application/json",
      },
      // 8 s hard cap: Nominatim usually answers < 500 ms; anything slower is stuck
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Nominatim HTTP ${res.status}` },
        { status: 502 },
      );
    }
    const data = (await res.json()) as Array<{
      lat: string;
      lon: string;
      display_name?: string;
    }>;
    if (data.length === 0) {
      return NextResponse.json({ error: "No results", results: [] });
    }
    const first = data[0];
    const lat = Number.parseFloat(first.lat);
    const lng = Number.parseFloat(first.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return NextResponse.json(
        { error: "Invalid coordinates from Nominatim" },
        { status: 502 },
      );
    }
    return NextResponse.json({
      lat,
      lng,
      displayName: first.display_name ?? null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Geocoder unreachable: ${message}` },
      { status: 502 },
    );
  }
}
