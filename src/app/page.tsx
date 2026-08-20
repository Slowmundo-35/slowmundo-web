import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Slowmundo — Voyager autrement",
  description:
    "Slowmundo, agence de voyage bas carbone à Rennes. Organisation de voyages personnalisés en Europe et en Asie, en train et en slow travel.",
};

export default function Page() {
  return <HomeClient />;
}
