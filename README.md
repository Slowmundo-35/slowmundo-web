# Slowmundo

Site de l'agence de voyage bas carbone Slowmundo, construite en **Next.js 15 (App Router)** + **React 19** + **Tailwind v4** + **motion/react** + **Leaflet**.

## Développement local

```bash
npm install --legacy-peer-deps
npm run dev
```

Ouvre http://localhost:5173

## Structure

```
src/
├── app/            # App Router — 1 dossier = 1 route
│   ├── layout.tsx  # Navbar / Footer / fonts / metadata racine
│   ├── page.tsx    # Home
│   ├── voyages/
│   │   ├── page.tsx                   # Grille de tous les voyages
│   │   ├── [country]/page.tsx         # Voyages par pays
│   │   └── [country]/[slug]/page.tsx  # Fiche détaillée d'un voyage
│   ├── blog/, services/, a-propos/, contact/, …
├── components/     # UI réutilisable (Navbar, Footer, cartes interactives…)
├── data/           # trips.ts, articlesData.tsx, images.ts (temporaire, en attente Sanity)
└── utils/          # slugify, helpers
```

## Scripts

| Commande         | Rôle                                         |
|------------------|----------------------------------------------|
| `npm run dev`    | Serveur de dev (port 5173)                   |
| `npm run build`  | Build de prod                                |
| `npm run start`  | Serveur de prod (port 5173)                  |
| `npm run lint`   | Lint Next                                    |
| `npm run typecheck` | Vérification TypeScript stricte           |

## Déploiement (Vercel)

```bash
npx vercel        # premier déploiement (interactif)
npx vercel --prod # déploiement en production
```

Une fois branché à un repo GitHub, chaque `git push` déclenche un preview auto.

## Env vars

Voir `.env.example`. Les variables Sanity + Resend seront branchées quand les comptes seront créés.

## Roadmap

- [ ] Sanity CMS — schéma `trip` / `article`, Studio embarqué à `/studio`
- [ ] Formulaire de contact — API route Next + Resend
- [ ] Lead magnet brochure (download direct puis capture email)
- [ ] Bascule `<img>` → `next/image` + sitemap + Open Graph
- [ ] Domaine slowmundo.fr (via OVH → Vercel DNS)
