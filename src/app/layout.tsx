import type { Metadata } from "next";
import { Nunito, Quicksand } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import JsonLd from "@/components/JsonLd";
import { travelAgencySchema } from "@/lib/seo";
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
    default: "Slowmundo — Voyager autrement",
    template: "%s | Slowmundo",
  },
  description:
    "Agence de voyage bas carbone basée à Rennes. Voyagez à votre rythme, l'esprit libre. Slowmundo organise vos voyages personnalisés en Europe et en Asie.",
  metadataBase: new URL("https://www.slowmundo.fr"),
  openGraph: {
    title: "Slowmundo — Voyager autrement",
    description:
      "Agence de voyage bas carbone. Voyagez à votre rythme, l'esprit libre.",
    type: "website",
    locale: "fr_FR",
    siteName: "Slowmundo",
  },
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
