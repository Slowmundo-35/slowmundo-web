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
    question: "Que prend en charge Slow Mundo dans l'organisation de mon voyage ?",
    answer:
      "Slow Mundo s'occupe de votre voyage de sa conception jusqu'à votre départ : itinéraire, transports, hébergements et activités prévues au programme. Vous recevez également un carnet de voyage détaillé et bénéficiez d'une assistance pendant votre séjour. L'objectif : vous laisser profiter du voyage sans avoir à gérer toute son organisation.",
  },
  {
    question: "Quelle est la spécificité de Slow Mundo par rapport à une agence de voyage classique ?",
    answer:
      "Slow Mundo associe le sur-mesure à une autre façon de voyager. Plutôt que de proposer des circuits standardisés, chaque itinéraire est construit selon vos envies, votre rythme et votre budget, avec une préférence pour le train et les mobilités moins carbonées lorsque cela est possible. L'idée : prendre davantage le temps, donner une vraie place au trajet et limiter l'impact des déplacements, sans jamais vous imposer une seule façon de voyager.",
  },
  {
    question: "Faut-il renoncer à l'avion pour voyager avec Slow Mundo ?",
    answer:
      "Non. Slow Mundo privilégie le train et les mobilités moins carbonées lorsqu'elles constituent une alternative adaptée, mais l'avion peut tout à fait faire partie d'un voyage. Pour les destinations lointaines, l'idée est plutôt de prendre davantage le temps sur place, de limiter les vols intérieurs et de privilégier le train, le bus ou le ferry pour se déplacer une fois arrivé. Une autre façon de voyager, sans vous imposer un modèle unique.",
  },
  {
    question: "Comment se passe la création d'un voyage sur mesure ?",
    answer:
      "Tout commence par un échange pour comprendre vos envies, votre budget et votre rythme. À partir de ces éléments, je construis une première proposition d'itinéraire que nous affinons ensemble. Une fois le voyage validé, je m'occupe des réservations et vous transmets votre carnet de voyage détaillé avant le départ.",
  },
  {
    question: "Êtes-vous basés à Rennes ?",
    answer:
      "Slow Mundo est basé en Bretagne, près de Rennes, mais j'accompagne des voyageurs partout en France. Les échanges peuvent facilement se faire à distance, par téléphone ou en visioconférence. Et si vous êtes dans la région, nous pouvons également nous rencontrer en personne.",
  },
];
