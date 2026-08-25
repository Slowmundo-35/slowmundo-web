/**
 * Inline JSON-LD structured data (server component).
 * Google reads `<script type="application/ld+json">` inside <body> just as well
 * as inside <head>, so we avoid the App Router Head-hack.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify is safe here — everything is server-authored.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
