import type { Metadata } from "next";
import MentionsLegalesClient from "./MentionsLegalesClient";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de Slowmundo — agence de voyage bas carbone.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <MentionsLegalesClient />;
}
