import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article de blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "slug",
      title: "Slug URL",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          "Guide du Train",
          "Astuces Éco-Voyage",
          "Idées d'itinéraires",
          "Esprit Slow Travel",
        ].map((v) => ({ title: v, value: v })),
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Résumé (chapô)",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(400),
    }),
    defineField({
      name: "image",
      title: "Image de couverture",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "readTime",
      title: "Temps de lecture",
      type: "string",
      description: 'Ex : "6 min de lecture"',
    }),
    defineField({
      name: "date",
      title: "Date de publication",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Contenu (portable text)",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt" }],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
  orderings: [
    {
      title: "Date (récent → ancien)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
