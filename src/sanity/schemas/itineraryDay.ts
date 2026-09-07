import { defineField, defineType } from "sanity";

/**
 * Embedded inside a Trip. NOT a standalone document.
 * Mirrors the ItineraryDay TS type used by VoyageDetailsClient.
 */
export const itineraryDay = defineType({
  name: "itineraryDay",
  title: "Jour d'itinéraire",
  type: "object",
  fields: [
    defineField({
      name: "day",
      title: "Numéro du jour",
      type: "number",
      validation: (r) => r.required().integer().min(1),
    }),
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "desc",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (r) => r.required().max(2000),
    }),
    defineField({
      name: "rhythm",
      title: "Rythme",
      type: "string",
      options: {
        list: [
          { title: "Doux", value: "Doux" },
          { title: "Modéré", value: "Modéré" },
          { title: "Soutenu", value: "Soutenu" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "locationName",
      title: "Lieu (nom lisible)",
      type: "string",
      description: 'Ex : "Lucerne", "Mont Rigi", "Brione (Verzasca)"',
    }),
    defineField({
      name: "lat",
      title: "Latitude",
      type: "number",
      description: "Pour afficher le point sur la carte interactive Leaflet",
    }),
    defineField({
      name: "lng",
      title: "Longitude",
      type: "number",
    }),
    defineField({
      name: "images",
      title: "Photos du jour",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Texte alternatif (accessibilité + SEO)",
              type: "string",
            },
          ],
        },
      ],
      validation: (r) => r.max(6),
    }),
  ],
  preview: {
    select: { day: "day", title: "title", location: "locationName" },
    prepare({ day, title, location }) {
      return {
        title: `Jour ${day} : ${title}`,
        subtitle: location ?? "",
      };
    },
  },
});
