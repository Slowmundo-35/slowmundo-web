/**
 * Services FAQ — single source of truth used by both the ServicesClient
 * accordion UI and the services/page.tsx server component that emits the
 * FAQPage JSON-LD. Keeping them here means the question/answer text in
 * the page and the schema.org output never drift.
 */
export interface ServicesFaq {
  question: string;
  answer: string;
}

export const SERVICES_FAQS: ServicesFaq[] = [
  {
    question: "Que se passe-t-il en cas d'annulation ou de retard de train ?",
    answer:
      "En cas de retard ou d'annulation, nous nous occupons de tout. Notre équipe d'assistance est disponible pour trouver une solution alternative immédiate et minimiser l'impact sur votre voyage.",
  },
  {
    question: "Le carnet de voyage est-il disponible sur smartphone ?",
    answer:
      "Oui, votre carnet de voyage est entièrement digitalisé et accessible depuis votre smartphone via une application dédiée, consultable même hors ligne avec toutes vos réservations et étapes.",
  },
  {
    question: "Est-ce que les repas sont inclus dans vos propositions ?",
    answer:
      "Cela dépend entièrement de vos préférences. Nous pouvons inclure la demi-pension ou pension complète, ou vous laisser libres de vos choix en vous fournissant nos meilleures recommandations gourmandes et éthiques locales.",
  },
  {
    question: "Combien de temps à l'avance faut-il vous contacter ?",
    answer:
      "Nous recommandons de nous contacter 2 à 6 mois avant votre départ pour garantir les meilleures options de train et les hébergements les plus charmants, surtout pour la haute saison.",
  },
  {
    question: "Proposez-vous des voyages pour les groupes ou les entreprises ?",
    answer:
      "Absolument. Nous concevons des itinéraires sur mesure pour les groupes d'amis, les familles nombreuses, ou les séminaires d'entreprise et team building, toujours dans une démarche écoresponsable.",
  },
];
