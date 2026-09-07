import { defineField, defineType } from "sanity";

/**
 * A Slowmundo trip — a full itinerary with pricing, inclusions, and per-day details.
 * Mirrors the Trip TS type currently used by src/data/trips.ts.
 */
export const trip = defineType({
  name: "trip",
  title: "Voyage",
  type: "document",
  groups: [
    { name: "essentials", title: "Essentiel", default: true },
    { name: "content", title: "Contenu" },
    { name: "practical", title: "Pratique" },
    { name: "itinerary", title: "Itinéraire" },
    { name: "seo", title: "SEO & assets" },
  ],
  fields: [
    // --- Essentiel ---
    defineField({
      name: "title",
      title: "Titre du voyage",
      type: "string",
      group: "essentials",
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "slug",
      title: "Slug URL",
      type: "slug",
      group: "essentials",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "country",
      title: "Pays",
      type: "string",
      group: "essentials",
      description: "Ex : Suisse, Japon, Italie — sert aussi à générer /voyages/[country]",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "continent",
      title: "Continent",
      type: "string",
      group: "essentials",
      options: {
        list: [
          { title: "Europe", value: "Europe" },
          { title: "Asie", value: "Asie" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "type",
      title: "Type de voyage",
      type: "string",
      group: "essentials",
      options: {
        list: [
          "Culturel",
          "Familial",
          "Romantique",
          "Sportif",
          "Nature & Aventure",
          "Solo & Amis",
        ].map((v) => ({ title: v, value: v })),
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "transport",
      title: "Transport principal",
      type: "string",
      group: "essentials",
      description: 'Ex : "Train panoramique, bateau & vélo"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "duration",
      title: "Durée (texte)",
      type: "string",
      group: "essentials",
      description: 'Ex : "12 jours"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "Prix (à partir de, en €)",
      type: "number",
      group: "essentials",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "tag",
      title: "Étiquette",
      type: "string",
      group: "essentials",
      description: 'Ex : "Signature", "Nouveau", "Populaire"',
    }),

    // --- Contenu ---
    defineField({
      name: "description",
      title: "Description commerciale",
      type: "text",
      group: "content",
      rows: 8,
      validation: (r) => r.max(3000),
    }),
    defineField({
      name: "highlights",
      title: "Points forts",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      validation: (r) => r.max(20),
    }),

    // --- Pratique ---
    defineField({
      name: "accommodation",
      title: "Hébergement",
      type: "string",
      group: "practical",
      description: 'Ex : "Hôtels 3★"',
    }),
    defineField({
      name: "idealPeriod",
      title: "Période idéale",
      type: "string",
      group: "practical",
      description: 'Ex : "De mai à mi-octobre"',
    }),
    defineField({
      name: "included",
      title: "Ce qui est inclus",
      type: "array",
      group: "practical",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "notIncluded",
      title: "Ce qui n'est pas inclus",
      type: "array",
      group: "practical",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "brochure",
      title: "Brochure PDF",
      type: "file",
      group: "practical",
      options: { accept: "application/pdf" },
    }),

    // --- Itinéraire ---
    defineField({
      name: "itinerary",
      title: "Jour par jour",
      type: "array",
      group: "itinerary",
      of: [{ type: "itineraryDay" }],
      validation: (r) => r.max(60),
    }),

    // --- SEO & assets ---
    defineField({
      name: "image",
      title: "Image principale (cover)",
      type: "image",
      group: "seo",
      options: { hotspot: true },
      fields: [
        { name: "alt", title: "Texte alternatif", type: "string" },
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "images",
      title: "Galerie d'images",
      type: "array",
      group: "seo",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt" }],
        },
      ],
      validation: (r) => r.max(20),
    }),
  ],
  preview: {
    select: {
      title: "title",
      country: "country",
      duration: "duration",
      media: "image",
    },
    prepare({ title, country, duration, media }) {
      return {
        title,
        subtitle: [country, duration].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
