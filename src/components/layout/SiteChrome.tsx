"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import GoogleAnalytics from "../GoogleAnalytics";
import CookieBanner from "../CookieBanner";

/**
 * Wraps the public site with Navbar + Footer + ScrollToTop.
 * Skipped on /studio — Sanity Studio brings its own full-screen chrome.
 * GA4 is loaded here too, so it stays out of the Studio route (fewer
 * bogus pageviews, tighter CSP surface for the Studio SPA).
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <GoogleAnalytics />
      <CookieBanner />
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
}
