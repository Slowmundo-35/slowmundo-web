"use client";

import { useEffect } from "react";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Cookie consent banner (tarteaucitron.js) wired to GA4 Consent Mode v2.
 *
 * The gtag.js script itself is loaded early by <GoogleAnalytics /> with
 * every consent bucket set to "denied" (see that component); this banner
 * only owns the UI and, on Accept, calls
 * `gtag('consent', 'update', { analytics_storage: 'granted' })` so GA4
 * unlocks and back-fills the events it queued. On Deny (or on no
 * decision), the default `denied` state stays, and gtag drops instead
 * of sending. This is the CNIL-recommended pattern.
 *
 * tarteaucitron ships as three vanilla-JS files in /public/tarteaucitron;
 * we load them in order via next/script (afterInteractive) and initialise
 * from a useEffect that runs once the language file has attached
 * `window.tarteaucitron`.
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
  }
}

const CUSTOM_SERVICE_KEY = "gtagconsent";

function initTarteaucitron() {
  const tac = window.tarteaucitron;
  if (!tac) return;
  if (!GA_ID) return;

  // Register a custom "service" whose only job is to flip GA4 Consent Mode
  // when the visitor accepts or refuses analytics. It doesn't inject any
  // script of its own — gtag.js already ran under a denied default.
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
    // Anchor tarteaucitron opens itself on so "Gérer mes cookies" links
    // can navigate to `/#gestion-cookies` from anywhere.
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
    highPrivacy: true, // CNIL: no service loads until explicit consent
    handleBrowserDNTRequest: false,
    removeCredit: false,
    moreInfoLink: true,
    useExternalCss: false,
    readmoreLink: "/politique-confidentialite",
    mandatory: true,
    mandatoryCta: true,
  });

  // Queue our custom Consent Mode bridge for tarteaucitron to activate.
  (tac.job = tac.job || []).push(CUSTOM_SERVICE_KEY);
}

export default function CookieBanner() {
  useEffect(() => {
    // The scripts may already be present when this component re-mounts
    // (client navigation). Only re-init when tarteaucitron is available
    // AND has not been initialised for this SPA session yet.
    let attempts = 0;
    const maxAttempts = 40; // 40 * 100ms = 4s max wait
    const iv = setInterval(() => {
      attempts += 1;
      const tac = window.tarteaucitron;
      if (tac && tac.services) {
        clearInterval(iv);
        // Only init the first time — tarteaucitron doesn't guard against
        // double init and would render the banner twice.
        if (!tac.services[CUSTOM_SERVICE_KEY]) {
          initTarteaucitron();
        }
      } else if (attempts >= maxAttempts) {
        clearInterval(iv);
      }
    }, 100);
    return () => clearInterval(iv);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src="/tarteaucitron/tarteaucitron.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/tarteaucitron/tarteaucitron.services.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="/tarteaucitron/lang/tarteaucitron.fr.js"
        strategy="afterInteractive"
      />
    </>
  );
}
