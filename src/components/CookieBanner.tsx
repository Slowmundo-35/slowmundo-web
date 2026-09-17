"use client";

import Script from "next/script";
import { useCallback } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Cookie consent banner (tarteaucitron.js) wired to GA4 Consent Mode v2.
 *
 * The gtag.js script itself is loaded early by <GoogleAnalytics /> with
 * every consent bucket set to "denied"; this banner only owns the UI
 * and, on Accept, calls
 * `gtag('consent', 'update', { analytics_storage: 'granted' })` so GA4
 * unlocks and back-fills the events it queued. On Deny (or on no
 * decision), the default `denied` state stays. That's the CNIL pattern.
 *
 * We load a single script (`tarteaucitron.min.js`) — tarteaucitron then
 * auto-loads its own services and language files from the same folder,
 * so we don't have to sequence them ourselves. The language is pinned
 * via `tarteaucitronForceLanguage` set BEFORE the script executes.
 */
declare global {
  interface Window {
    tarteaucitron?: {
      init: (opts: Record<string, unknown>) => void;
      services: Record<string, unknown>;
      user: Record<string, unknown>;
      job?: string[];
      userInterface?: {
        openPanel?: () => void;
      };
    };
    gtag?: (...args: unknown[]) => void;
    tarteaucitronForceLanguage?: string;
  }
}

const CUSTOM_SERVICE_KEY = "gtagconsent";

export default function CookieBanner() {
  // Once tarteaucitron.min.js has loaded and attached to window, we
  // register our GA4 consent-bridge service and call init(). Doing this
  // in an onLoad callback (not a polling useEffect) avoids the race
  // where init() ran before the script parsed.
  const onScriptLoad = useCallback(() => {
    const tac = window.tarteaucitron;
    if (!tac || !GA_ID) return;

    // Custom service — doesn't inject its own script; only flips GA4
    // Consent Mode based on user choice. The gtag.js load happens
    // separately in <GoogleAnalytics /> under a denied default.
    tac.services[CUSTOM_SERVICE_KEY] = {
      key: CUSTOM_SERVICE_KEY,
      type: "analytic",
      name: "Google Analytics 4",
      uri: "https://policies.google.com/privacy",
      needConsent: true,
      cookies: ["_ga", "_gid", /^_ga_[A-Z0-9]+$/i],
      js: function () {
        if (typeof window.gtag === "function") {
          window.gtag("consent", "update", {
            analytics_storage: "granted",
          });
        }
      },
      fallback: function () {
        if (typeof window.gtag === "function") {
          window.gtag("consent", "update", {
            analytics_storage: "denied",
          });
        }
      },
    };

    tac.init({
      privacyUrl: "/politique-confidentialite",
      hashtag: "#gestion-cookies",
      cookieName: "slowmundo-consent",
      orientation: "bottom",
      groupServices: false,
      showAlertSmall: false,
      cookieslist: true,
      closePopup: false,
      showIcon: true,
      iconPosition: "BottomRight",
      adblocker: false,
      DenyAllCta: true,
      AcceptAllCta: true,
      // CNIL: no service loads until the visitor decides.
      highPrivacy: true,
      handleBrowserDNTRequest: false,
      removeCredit: false,
      moreInfoLink: true,
      useExternalCss: false,
      readmoreLink: "/politique-confidentialite",
      mandatory: true,
      mandatoryCta: false,
    });

    (tac.job = tac.job || []).push(CUSTOM_SERVICE_KEY);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      {/* Pin the language BEFORE tarteaucitron.min.js parses so it
          auto-loads lang/tarteaucitron.fr.min.js from the same folder.
          strategy="beforeInteractive" is only allowed for scripts
          declared in the app root, which is the case here via
          SiteChrome. */}
      <Script id="tac-lang-pin" strategy="beforeInteractive">
        {`window.tarteaucitronForceLanguage = 'fr';`}
      </Script>
      <Script
        src="/tarteaucitron/tarteaucitron.min.js"
        strategy="afterInteractive"
        onLoad={onScriptLoad}
      />
    </>
  );
}
