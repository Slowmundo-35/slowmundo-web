import Studio from "./Studio";

/**
 * Sanity Studio route at /studio.
 * The Studio itself is a client component (see Studio.tsx) because Sanity
 * relies on React Context which is not available in Server Components.
 */
export const dynamic = "force-static";

export const metadata = {
  title: "Slowmundo Studio",
  robots: { index: false, follow: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content" as const,
};

export default function StudioPage() {
  return <Studio />;
}
