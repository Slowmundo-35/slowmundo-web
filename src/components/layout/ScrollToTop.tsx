"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll behaviour on navigation:
 * - If URL has a hash, smooth-scroll to the matching element.
 * - Otherwise, scroll to top.
 *
 * `usePathname()` only tracks the path (not the hash). We re-read `window.location.hash`
 * on every path change; for pure hash changes we also listen to `hashchange`.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const handle = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      window.scrollTo(0, 0);
    };

    handle();
    window.addEventListener("hashchange", handle);
    return () => window.removeEventListener("hashchange", handle);
  }, [pathname]);

  return null;
}
