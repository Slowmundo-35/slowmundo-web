import { defineField, defineType } from "sanity";
import { GeocodeLocationInput } from "../components/GeocodeLocationInput";

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
    // ---- Résumé pratique du jour (repas / transport / hébergement) ----
    // Chaque champ est facultatif — s'il est vide côté Sanity, le badge
    // correspondant ne s'affiche pas sur la fiche voyage. Format libre :
    // Alexis peut y mettre 1 mot ou une phrase courte.
    defineField({
      name: "meals",
      title: "Repas",
      type: "string",
      description: 'Ex : "Petit-déjeuner et dîner inclus", "Déjeuner libre"',
    }),
    defineField({
      name: "transport",
      title: "Transport",
      type: "string",
      description: 'Ex : "Train panoramique Gotthard", "Bateau + marche"',
    }),
    defineField({
      name: "accommodation",
      title: "Hébergement",
      type: "string",
      description: 'Ex : "Hôtel 3★ centre-ville", "Chalet en montagne"',
    }),
    defineField({
      name: "locationName",
      title: "Lieu (nom lisible)",
      type: "string",
      description:
        'Ex : "Lucerne", "Mont Rigi", "Brione (Verzasca)". Clique sur "Générer les coordonnées" en dessous pour remplir automatiquement latitude et longitude.',
      components: {
        input: GeocodeLocationInput,
      },
    }),
    defineField({
      name: "lat",
      title: "Latitude",
      type: "number",
      description:
        "Généré automatiquement depuis le champ Lieu au-dessus, ou modifiable manuellement.",
    }),
    defineField({
      name: "lng",
      title: "Longitude",
      type: "number",
      description:
        "Généré automatiquement depuis le champ Lieu au-dessus, ou modifiable manuellement.",
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
