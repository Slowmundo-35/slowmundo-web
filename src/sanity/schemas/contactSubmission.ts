import { defineField, defineType } from "sanity";

/**
 * Contact form submission — created by the /api/contact route
 * every time a visitor fills out either the trip-page form or the
 * generic /contact form. Alexis reads and manages these in Studio.
 */
export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Demande de contact",
  type: "document",
  // Locked so only server-side writes with the write token can create them;
  // once a submission is stored, Alexis edits the workflow fields (status,
  // notes) but can't easily overwrite the submitter's original data.
  fields: [
    defineField({
      name: "status",
      title: "Statut",
      type: "string",
      initialValue: "nouveau",
      options: {
        list: [
          { title: "🔴 Nouveau", value: "nouveau" },
          { title: "🟡 En cours", value: "en_cours" },
          { title: "🟢 Répondu", value: "repondu" },
          { title: "⚫ Archivé", value: "archive" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "source",
      title: "Origine",
      type: "string",
      description: "Formulaire d'où provient la demande",
      options: {
        list: [
          { title: "Fiche voyage", value: "trip" },
          { title: "Page contact", value: "contact" },
        ],
      },
      validation: (r) => r.required(),
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Date de réception",
      type: "datetime",
      validation: (r) => r.required(),
      readOnly: true,
    }),

    // ---- Contact info ----
    defineField({
      name: "firstName",
      title: "Prénom",
      type: "string",
      validation: (r) => r.required(),
      readOnly: true,
    }),
    defineField({
      name: "lastName",
      title: "Nom",
      type: "string",
      validation: (r) => r.required(),
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (r) => r.required().email(),
      readOnly: true,
    }),
    defineField({
      name: "phone",
      title: "Téléphone",
      type: "string",
      validation: (r) => r.required(),
      readOnly: true,
    }),

    // ---- Trip form specific ----
    defineField({
      name: "tripCountry",
      title: "Pays du voyage (fiche voyage)",
      type: "string",
      readOnly: true,
      hidden: ({ document }) => document?.source !== "trip",
    }),
    defineField({
      name: "tripTitle",
      title: "Titre du voyage",
      type: "string",
      readOnly: true,
      hidden: ({ document }) => document?.source !== "trip",
    }),
    defineField({
      name: "groupSize",
      title: "Nombre de personnes",
      type: "string",
      readOnly: true,
      hidden: ({ document }) => document?.source !== "trip",
    }),
    defineField({
      name: "residence",
      title: "Région de résidence",
      type: "string",
      readOnly: true,
      hidden: ({ document }) => document?.source !== "trip",
    }),

    // ---- Contact form specific ----
    defineField({
      name: "continent",
      title: "Continent souhaité",
      type: "string",
      readOnly: true,
      hidden: ({ document }) => document?.source !== "contact",
    }),
    defineField({
      name: "destinations",
      title: "Destinations souhaitées",
      type: "array",
      of: [{ type: "string" }],
      readOnly: true,
      hidden: ({ document }) => document?.source !== "contact",
    }),

    // ---- Free text ----
    defineField({
      name: "message",
      title: "Message du client",
      type: "text",
      rows: 6,
      readOnly: true,
    }),

    // ---- Internal workflow ----
    defineField({
      name: "internalNotes",
      title: "Notes internes",
      type: "text",
      rows: 4,
      description: "Notes privées de suivi (non visibles par le client)",
    }),

    // ---- Metadata ----
    defineField({
      name: "userAgent",
      title: "Navigateur",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "ipHash",
      title: "IP hashée (RGPD)",
      type: "string",
      description: "Hash SHA-256 de l'IP — utile pour anti-spam sans stocker l'IP en clair",
      readOnly: true,
      hidden: true,
    }),
  ],

  preview: {
    select: {
      firstName: "firstName",
      lastName: "lastName",
      status: "status",
      source: "source",
      tripTitle: "tripTitle",
      continent: "continent",
      submittedAt: "submittedAt",
    },
    prepare({ firstName, lastName, status, source, tripTitle, continent, submittedAt }) {
      const statusIcons: Record<string, string> = {
        nouveau: "🔴",
        en_cours: "🟡",
        repondu: "🟢",
        archive: "⚫",
      };
      const context =
        source === "trip"
          ? tripTitle || "Voyage"
          : continent
            ? `Contact · ${continent}`
            : "Contact";
      const date = submittedAt
        ? new Date(submittedAt).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";
      return {
        title: `${statusIcons[status] ?? ""} ${firstName ?? ""} ${lastName ?? ""}`.trim(),
        subtitle: date ? `${context} · ${date}` : context,
      };
    },
  },

  orderings: [
    {
      title: "Date (récent → ancien)",
      name: "dateDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Statut",
      name: "statusAsc",
      by: [
        { field: "status", direction: "asc" },
        { field: "submittedAt", direction: "desc" },
      ],
    },
  ],
});
