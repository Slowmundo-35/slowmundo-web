/**
 * Real Slowmundo photos, served from /public/img/slowmundo/.
 * As more shots arrive, add them here and replace Unsplash URLs
 * across `data/trips.ts`, `data/articlesData.tsx`, and any page component.
 */
export const SLOWMUNDO_PHOTOS = {
  // People / brand
  alexisPortrait: "/img/slowmundo/alexis-portrait.webp",
  alexisInFrontOfTrain: "/img/slowmundo/alexis-devant-train.webp",
  alexisBoardingTrain: "/img/slowmundo/alexis-monte-dans-train.webp",
  alexisSwissMountains: "/img/slowmundo/alexis-montagnes-suisse.webp",

  // Landscapes
  austriaMountain: "/img/slowmundo/paysage-autriche-montagne.webp",
  italySea: "/img/slowmundo/paysage-italie-mer.webp",
  italyLandscape: "/img/slowmundo/paysage-italie.webp",
  trainEurope: "/img/slowmundo/train-europe.webp",
} as const;

export type SlowmundoPhoto = keyof typeof SLOWMUNDO_PHOTOS;
