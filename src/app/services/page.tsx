import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Slowmundo conçoit vos voyages sur mesure : itinéraires ferroviaires, hébergements engagés, accompagnement de A à Z.",
};

export default function Page() {
  return <ServicesClient />;
}
