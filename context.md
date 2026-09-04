# Contexte projet — « novembre »

> Fichier de contexte destiné aux LLM / agents de code.
> Il résume l'architecture, les mécanismes clés et les conventions du projet
> pour éviter de re-faire l'exploration. À mettre à jour si le code évolue.

## 1. Vue d'ensemble

Site vitrine **monopage** pour une exposition d'art : l'artiste « Seny »,
exposition *Novembre 2026*. Style minimaliste / luxe (niveau Awwwards),
palette sombre. **Aucune logique serveur, aucun état, aucune API, aucune base
de données** : 100 % statique et présentationnel. Le scroll **est** le
contenu : un hero épinglé synchronise vidéo + typographie sur la progression
du scroll, puis une galerie asymétrique se révèle carte par carte.

## 2. Stack

| Rôle | Librairie |
|---|---|
| Framework | Next.js 16 (App Router) — ⚠️ version récente, lire la doc dans `node_modules/next/dist/docs/` avant d'écrire du code (voir `AGENTS.md`) |
| UI | React 19, TypeScript (types explicites, pas de `any`) |
| Styles | Tailwind CSS 4 (`@import "tailwindcss"` + `@theme inline` dans `globals.css`) |
| Animations | Framer Motion (`useScroll`, `useTransform`, `whileInView`) |
| Smooth scroll | Lenis (`lenis/react` → `ReactLenis`) |
| Images | `next/image` |
| Polices | `next/font/google` : Inter (sans) + Cormorant Garamond (serif) |
| Utilitaires | `clsx` + `tailwind-merge` via `src/lib/cn.ts` |

Scripts : `npm run dev` / `build` / `start` / `lint`.

## 3. Arborescence

```
src/
├── app/
│   ├── layout.tsx          → racine : polices (variables CSS), metadata, <SmoothScroll>
│   ├── page.tsx            → assemble les 4 sections : Hero → Gallery → Statement → Footer
│   ├── globals.css         → tokens Tailwind 4 (@theme), couleurs, ::selection, reduced-motion
│   └── favicon.ico
├── components/
│   ├── providers/SmoothScroll.tsx    → wrapper Lenis (lerp 0.1, smoothWheel, autoRaf)
│   ├── hero/HeroPinned.tsx           → hero « épinglé » 450vh + vidéo de fond
│   ├── gallery/Gallery.tsx           → grille éditoriale (server component)
│   ├── gallery/ArtworkCard.tsx       → carte d'œuvre + reveal au scroll (client)
│   ├── statement/ArtistStatement.tsx → note curatoriale (client)
│   └── layout/Footer.tsx             → email, lien Artsy, copyright
├── data/artworks.ts        → données statiques des 6 toiles (type Artwork importé depuis ArtworkCard)
└── lib/cn.ts               → cn() = twMerge(clsx(...))
```

`public/assets/` : `1.png` … `6.png` (toiles, ~3–5 Mo chacune), `intro.mp4` (~30 Mo).

## 4. Mécanismes clés

### 4.1 Smooth scroll global
`SmoothScroll` (client) enveloppe tout le site dans `<ReactLenis root options={{ lerp: 0.1, smoothWheel: true, autoRaf: true }} />`.
Lenis pilote le scroll natif (pas un transform), donc `useScroll` de Framer Motion fonctionne normalement.

### 4.2 Hero épinglé (`HeroPinned.tsx`) — LE mécanisme central
- Le `<section>` fait **450vh** ; à l'intérieur, un `div.sticky.top-0.h-screen` reste épinglé pendant que la section défile.
- `useScroll({ target: containerRef, offset: ["start start", "end end"] })` → `scrollYProgress` de 0 à 1 sur les 450vh.
- `useTransform` mappe la progression :
  - `titleOpacity` : `[0, 0.05, 0.35, 0.78, 0.95] → [0, 1, 1, 1, 0]` — le titre « SENY » apparaît presque dès les premiers scroll et reste visible jusqu'à la fin de la séquence ;
  - `titleScale` : `0.94 → 1 → 0.98` (zoom subtil) ;
  - `subtitleOpacity` : fondu entre 15 % et 82 % ; `subtitleY` : `16px → 0` (glisse vers le haut) — reste un peu plus longtemps avant le fondu ;
  - `videoScale` : `1 → 1.06` sur toute la durée (zoom lent de la vidéo) ;
  - `stageOpacity` : `1 → 0` entre 78 % et 100 % — toute la scène (vidéo incluse) s'estompe pour laisser place à la galerie.
- Vidéo de fond : `/assets/intro.mp4` avec `muted autoPlay loop playsInline` (indispensable pour le mobile), overlay gradient sombre, titre en Cormorant `text-[18vw]` (responsive via vw, `md:text-[11rem]`).

### 4.3 Galerie (`Gallery.tsx` + `ArtworkCard.tsx`)
- `Gallery` est un **server component** : il lit `artworks` et compose une grille éditoriale asymétrique — 1 toile pleine largeur (`max-w-5xl`), puis paires 7/5 et 5/7 en `grid-cols-12` avec décalages verticaux (`md:mb-24`, `md:mt-32`) pour le rythme. `artworkAt(i)` lève une erreur explicite si une œuvre manque.
- `ArtworkCard` (client) :
  - reveal au scroll : `initial={{ opacity: 0, y: 36 }}` → `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, amount: 0.22 }}`, `duration: 0.95`, ease `[0.16, 1, 0.3, 1]` ;
  - image `next/image` lazy, `fill` + `aspect-ratio` piloté par `artwork.aspect` (ex. `"16/9"`) ;
  - hover : `group-hover:scale-[1.03]` sur 1.4 s ;
  - contenu : titre serif italique + année, technique · dimensions, lien « Consulter sur Artsy ↗ » (`target="_blank" rel="noopener noreferrer"`).

### 4.4 Note curatoriale & footer
- `ArtistStatement` : même pattern de reveal (`once: true, amount: 0.4`, durée 1 s), citation en Cormorant + paragraphe en Inter.
- `Footer` : serveur, simple, `border-t border-white/8`.

## 5. Système de design

- **Couleurs** : fond `#0d0d0d`, texte `#f5f5f5`, muted `#888888`, séparateurs `#4a4a4a` / `#5c5c5c` ; tokens définis dans `globals.css` (`--background`, `--foreground`, `--muted` → `@theme inline`).
- **Typographie** : Cormorant Garamond (serif) pour les titres, Inter (sans) pour le reste ; micro-labels en uppercase avec tracking très large (`tracking-[0.38em]`), tailles minuscules (`text-[10px]`–`text-[11px]`) pour les méta.
- **Motion** : une seule courbe partout — `cubic-bezier(0.16, 1, 0.3, 1)` (constante `EASE` dans les composants) ; transitions subtiles, 60 fps, pas de parallaxe agressive.
- **Whitespace** : padding généreux (`px-6 → lg:px-24`, `py-28 → lg:py-40`), hiérarchie éditoriale, zéro encombrement.
- **Accessibilité** : `aria-label`/`aria-labelledby` sur les sections, `sr-only` sur le titre du statement, `prefers-reduced-motion` géré dans `globals.css`.

## 6. Conventions d'ingénierie (fichées dans `.cursorrules`)

- TypeScript avec types explicites, jamais de `any`.
- `'use client'` uniquement quand nécessaire (état, scroll, hooks motion).
- Sync scroll ↔ Framer Motion : `useScroll({ target, offset })` + `useTransform()`.
- Vidéos : toujours `muted playsInline autoPlay loop`.
- Structure modulaire : `src/components/<section>/`, `src/data/`.
