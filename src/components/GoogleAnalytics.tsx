"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Manual page_view tracker for client-side navigation (App Router).
 *
 * We disable the automatic initial page_view in the config below
 * (`send_page_view: false`) and fire one from here on every route change
 * — including the first render. This avoids double-counting the initial
 * visit while still catching every soft navigation.
 *
 * `useSearchParams` opts pages out of static generation, so the caller
 * wraps this inner component in a Suspense boundary to keep it isolated.
 */
function GoogleAnalyticsRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID || typeof window === "undefined") return;
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag !== "function") return;

    const qs = searchParams?.toString();
    const page_path = qs ? `${pathname}?${qs}` : pathname;
    gtag("event", "page_view", {
      page_path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

/**
 * Loads GA4 (Global Site Tag / gtag.js) — public site only.
 * Reads the measurement ID from NEXT_PUBLIC_GA_ID; renders nothing when
 * the env var is missing (local dev without analytics, preview builds,
 * or the Studio route where SiteChrome deliberately omits this).
 *
 * GA4 anonymises IPs by default, so we don't need the legacy
 * `anonymize_ip` flag. Consent Mode / cookie banner is out of scope for
 * now — add it when a proper CNIL-compliant banner ships.
 */
export default function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <GoogleAnalyticsRouteTracker />
      </Suspense>
    </>
  );
}
