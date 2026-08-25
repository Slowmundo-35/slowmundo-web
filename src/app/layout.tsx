import type { Metadata } from "next";
import { Nunito, Quicksand } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import JsonLd from "@/components/JsonLd";
import { OG_DEFAULT_IMAGE, travelAgencySchema } from "@/lib/seo";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Slowmundo — Agence de voyage bas carbone en train | Europe & Asie",
    template: "%s | Slowmundo",
  },
  description:
    "Voyage éco responsable en train à travers l'Europe et l'Asie. Slowmundo, agence de voyage bas carbone à Rennes, conçoit vos itinéraires personnalisés en slow tourisme.",
  metadataBase: new URL("https://www.slowmundo.fr"),
  keywords: [
    "voyage éco responsable",
    "voyage bas carbone",
    "voyage organisé en train",
    "agence de voyage bas carbone",
    "slow tourisme",
    "voyage sans avion",
    "voyage en train Europe",
    "voyage en train Asie",
    "voyage responsable Rennes",
  ],
  authors: [{ name: "Slowmundo" }],
  creator: "Slowmundo",
  publisher: "Slowmundo",
  openGraph: {
    title: "Slowmundo — Agence de voyage bas carbone en train",
    description:
      "Voyage éco responsable en train à travers l'Europe et l'Asie. Slowmundo organise vos voyages personnalisés en slow tourisme.",
    type: "website",
    locale: "fr_FR",
    siteName: "Slowmundo",
    url: "https://www.slowmundo.fr",
    images: [
      {
        url: OG_DEFAULT_IMAGE,
        alt: "Slowmundo — Agence de voyage bas carbone en train",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Slowmundo — Agence de voyage bas carbone en train",
    description:
      "Voyage éco responsable en train à travers l'Europe et l'Asie. Voyages personnalisés en slow tourisme.",
    images: [OG_DEFAULT_IMAGE],
  },
  robots: { index: true, follow: true },
  category: "travel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${nunito.variable} ${quicksand.variable}`}>
      <body>
        <JsonLd data={travelAgencySchema} />
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
