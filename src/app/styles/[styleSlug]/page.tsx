import { permanentRedirect } from "next/navigation";
import { getAllTrips } from "@/lib/sanity.queries";
import { getTripTypes } from "@/data/trips";
import { slugify } from "@/utils/slugify";

type Params = { styleSlug: string };

// Fallback labels for the 8 styles the homepage advertises — used when
// no trip in Sanity carries that type yet, so /styles/<slug> still
// forwards to the voyages listing with the right filter pre-selected
// instead of dropping the visitor at a wall.
const HOMEPAGE_STYLE_LABELS: Record<string, string> = {
  "culture-et-patrimoine": "Culture et patrimoine",
  "gastronomie": "Gastronomie",
  "en-train": "En train",
  "bas-carbone": "Bas carbone",
  "nature-et-grands-espaces": "Nature et grands espaces",
  "hors-des-sentiers-battus": "Hors des sentiers battus",
  "itineraires-transfrontaliers": "Itinéraires transfrontaliers",
  "romantique": "Romantique",
};

/**
 * The dedicated /styles/<slug> route used to render its own listing
 * that always came out empty because the filter logic + design lived
 * in /voyages. We now 301 to /voyages?type=<Name> so the visitor lands
 * on the real listing with the type filter pre-selected and every
 * other filter (continent, destinations, duration) still available.
 */
export default async function Page({ params }: { params: Promise<Params> }) {
  const { styleSlug } = await params;
  const decoded = decodeURIComponent(styleSlug);

  const trips = await getAllTrips();
  const matchedTypeName =
    trips.flatMap(getTripTypes).find((t) => slugify(t) === decoded) ??
    HOMEPAGE_STYLE_LABELS[decoded];

  const target = matchedTypeName
    ? `/voyages?type=${encodeURIComponent(matchedTypeName)}`
    : "/voyages";
  permanentRedirect(target);
}
