/** @type {import('next').NextConfig} */

import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV !== "production";

/**
 * Public site CSP — strict-by-default with only the origins the site uses.
 * `/studio/*` (Sanity) gets a much looser CSP via a separate matcher below.
 */
const publicCspDirectives = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",             // Next injects small inline bootstraps
    "https://core.sanity-cdn.com", // Sanity preview / visual editing bridge
    ...(isDev ? ["'unsafe-eval'"] : []),
  ],
  "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  "img-src": [
    "'self'",
    "data:",
    "blob:",
    "https://images.unsplash.com",           // trip / blog placeholder images
    "https://*.tile.openstreetmap.org",       // Leaflet OSM tiles
    "https://*.basemaps.cartocdn.com",        // Leaflet CartoDB tiles
    "https://cdn.sanity.io",                  // Sanity images CDN
  ],
  "font-src": ["'self'", "data:", "https://fonts.gstatic.com"],
  "connect-src": [
    "'self'",
    "https://*.apicdn.sanity.io",             // Sanity GROQ queries (CDN)
    "https://*.api.sanity.io",                // Sanity GROQ queries (direct)
    "https://core.sanity-cdn.com",            // Sanity preview bridge
    ...(isDev ? ["ws://localhost:5173", "http://localhost:5173"] : []),
  ],
  "frame-ancestors": ["'none'"],              // no external iframe embedding
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "object-src": ["'none'"],
  ...(isDev ? {} : { "upgrade-insecure-requests": [] }),
};

/**
 * Studio CSP — Sanity Studio is a complex SPA that needs eval, blob
 * workers, WebSockets, and Sanity's own CDN. Applied only to /studio/*.
 * Access to /studio itself is gated by Sanity's own auth (Google login),
 * so relaxing the browser CSP here is acceptable.
 */
const studioCspDirectives = {
  "default-src": ["'self'", "https://*.sanity.io", "https://*.sanity.studio"],
  "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'", "blob:", "https://*.sanity.io"],
  "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  "img-src": ["'self'", "data:", "blob:", "https://cdn.sanity.io", "https://*.sanity.io"],
  "font-src": ["'self'", "data:", "https://fonts.gstatic.com"],
  "connect-src": [
    "'self'",
    "https://*.api.sanity.io",
    "https://*.apicdn.sanity.io",
    "https://*.sanity.io",
    "wss://*.api.sanity.io",
    ...(isDev ? ["ws://localhost:5173", "http://localhost:5173"] : []),
  ],
  "worker-src": ["'self'", "blob:"],
  "frame-src": ["'self'", "https://*.sanity.io", "https://*.sanity.studio"],
  "frame-ancestors": ["'self'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'", "https://*.sanity.io"],
};

function cspHeader(directives) {
  return Object.entries(directives)
    .map(([k, v]) => (v.length ? `${k} ${v.join(" ")}` : k))
    .join("; ");
}

const publicHeaders = [
  { key: "Content-Security-Policy", value: cspHeader(publicCspDirectives) },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
];

const studioHeaders = [
  { key: "Content-Security-Policy", value: cspHeader(studioCspDirectives) },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Studio needs to be embeddable in its own frames — SAMEORIGIN instead of DENY
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,   // stop leaking "X-Powered-By: Next.js"
  outputFileTracingRoot: projectRoot,
  async headers() {
    // First match wins — /studio* rules are applied to Studio, everything else stays strict.
    return [
      { source: "/studio/:path*", headers: studioHeaders },
      { source: "/studio", headers: studioHeaders },
      { source: "/:path*", headers: publicHeaders },
    ];
  },
};

export default nextConfig;
