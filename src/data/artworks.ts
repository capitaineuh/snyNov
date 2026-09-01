export interface Artwork {
  id: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  imageUrl: string;
  artsyUrl: string;
  aspect: number;
}

export const EXHIBITION_NAME = "Novembre";
export const EXHIBITION_YEAR = 2026;
export const ARTIST_NAME = "Seny";

export const artworks: Artwork[] = [
  {
    id: "nocturne-iv",
    title: "Nocturne IV",
    year: 2025,
    medium: "Huile sur lin",
    dimensions: "180 × 140 cm",
    imageUrl:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1800&q=80",
    artsyUrl: "https://www.artsy.net/artwork/seny-nocturne-iv",
    aspect: 0.78,
  },
  {
    id: "chambre-ocre",
    title: "Chambre ocre",
    year: 2024,
    medium: "Huile et cire sur toile",
    dimensions: "120 × 160 cm",
    imageUrl:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1600&q=80",
    artsyUrl: "https://www.artsy.net/artwork/seny-chambre-ocre",
    aspect: 1.25,
  },
  {
    id: "seuil",
    title: "Seuil",
    year: 2025,
    medium: "Acrylique et pigment sur coton",
    dimensions: "90 × 70 cm",
    imageUrl:
      "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=1400&q=80",
    artsyUrl: "https://www.artsy.net/artwork/seny-seuil",
    aspect: 0.72,
  },
  {
    id: "pluie-de-cendres",
    title: "Pluie de cendres",
    year: 2023,
    medium: "Technique mixte sur toile",
    dimensions: "200 × 160 cm",
    imageUrl:
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1800&q=80",
    artsyUrl: "https://www.artsy.net/artwork/seny-pluie-de-cendres",
    aspect: 0.82,
  },
  {
    id: "horizon-bas",
    title: "Horizon bas",
    year: 2024,
    medium: "Huile sur bois",
    dimensions: "65 × 81 cm",
    imageUrl:
      "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=1400&q=80",
    artsyUrl: "https://www.artsy.net/artwork/seny-horizon-bas",
    aspect: 1.15,
  },
  {
    id: "memoire-bleue",
    title: "Mémoire bleue",
    year: 2025,
    medium: "Huile sur lin",
    dimensions: "150 × 110 cm",
    imageUrl:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?auto=format&fit=crop&w=1600&q=80",
    artsyUrl: "https://www.artsy.net/artwork/seny-memoire-bleue",
    aspect: 0.68,
  },
];
