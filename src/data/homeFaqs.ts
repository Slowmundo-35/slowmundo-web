/**
 * Home FAQ — single source of truth for both the HomeClient accordion
 * (still rendered as-is inside the page) and the FAQPage JSON-LD emitted
 * on the home server component. Keeps the schema.org markup and the
 * visible answers strictly in sync, which is what Google requires for
 * the FAQPage type to be considered valid.
 */
export interface HomeFaq {
  question: string;
  answer: string;
}

export const HOME_FAQS: HomeFaq[] = [
  {
    question: "Quelle est la différence entre Slowmundo et un simple travel planner ?",
    answer:
      "Slowmundo est une véritable agence de voyage spécialisée dans le bas carbone. Nous créons des itinéraires sur mesure, mais surtout nous achetons, réservons et garantissons 100% de vos prestations (transports, hébergements, activités) avec une protection juridique complète et une assistance continue.",
  },
  {
    question: 'Peut-on vraiment aller en Asie en mode "Slow tourisme" ?',
    answer:
      "Oui ! Bien que le train depuis l'Europe soit une option fantastique pour les passionnés du rail, nous pouvons aussi optimiser un voyage en avion en allongeant la durée du séjour sur place et en utilisant exclusivement des transports locaux terrestres ou maritimes une fois arrivé.",
  },
  {
    question: "Je ne suis pas un écologiste parfait, puis-je quand même faire appel à vous ?",
    answer:
      "Bien sûr ! Notre but n'est pas la perfection, mais de proposer de véritables alternatives sans aucun jugement. Chaque geste compte, et nous sommes là pour faciliter votre transition vers des voyages plus respectueux à votre propre rythme.",
  },
  {
    question: "Comment se passe la création d'un voyage sur mesure ?",
    answer:
      "Après un premier échange pour comprendre vos envies, votre budget et votre rythme, nous vous proposons une ébauche d'itinéraire personnalisée. Une fois validée, nous finalisons l'ensemble des réservations et vous fournissons votre carnet de voyage digital.",
  },
  {
    question: "Êtes-vous basés à Rennes ?",
    answer:
      "Oui, notre point d'ancrage est en Bretagne, près de Rennes. Toutefois, nous accompagnons des voyageurs de toute la France et d'ailleurs lors d'échanges en visioconférence pour co-créer leur voyage.",
  },
];
