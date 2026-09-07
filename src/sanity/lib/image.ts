import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Build a Sanity CDN URL for any image reference. Usage: urlFor(img).width(1200).url() */
export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
