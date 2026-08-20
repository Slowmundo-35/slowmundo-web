import type { Metadata } from "next";
import StyleVoyageClient from "./StyleVoyageClient";

type Params = { styleSlug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { styleSlug } = await params;
  const pretty = decodeURIComponent(styleSlug).replace(/-/g, " ");
  return {
    title: `Style de voyage : ${pretty}`,
    description: `Découvrez nos voyages "${pretty}" — sélection Slowmundo d'itinéraires bas carbone.`,
  };
}

export default function Page() {
  return <StyleVoyageClient />;
}
