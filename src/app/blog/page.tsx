import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog & inspirations",
  description:
    "Articles, guides et inspirations pour voyager bas carbone : itinéraires en train, écotourisme, slow travel en Europe et en Asie.",
};

export default function Page() {
  return <BlogClient />;
}
