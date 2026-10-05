import type { Metadata } from "next";
import CGVClient from "./CGVClient";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "Conditions générales de vente de l'agence de voyage Slow Mundo.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <CGVClient />;
}
