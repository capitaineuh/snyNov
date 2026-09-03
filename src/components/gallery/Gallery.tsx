import { artworks } from "@/data/artworks";
import { ArtworkCard } from "@/components/gallery/ArtworkCard";

function artworkAt(index: number) {
  const artwork = artworks[index];
  if (!artwork) {
    throw new Error(`Œuvre manquante à l’index ${index}`);
  }
  return artwork;
}

export function Gallery() {
  const featured = artworkAt(0);
  const second = artworkAt(1);
  const third = artworkAt(2);
  const fourth = artworkAt(3);
  const fifth = artworkAt(4);
  const sixth = artworkAt(5);

  return (
    <section
      id="galerie"
      className="relative bg-[#0d0d0d] px-6 py-28 sm:px-10 md:px-16 lg:px-24 lg:py-40"
      aria-labelledby="galerie-heading"
    >
      <header className="mb-20 flex items-end justify-between gap-8 md:mb-28">
        <div>
          <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.38em] text-[#888888]">
            Œuvres
          </p>
          <h2
            id="galerie-heading"
            className="font-serif text-4xl font-normal tracking-tight text-[#f5f5f5] sm:text-5xl"
          >
            Sélection
          </h2>
        </div>
        <p className="hidden max-w-xs text-right font-sans text-[11px] leading-relaxed tracking-[0.08em] text-[#888888] md:block">
          Six toiles présentées pour Novembre 2026.
        </p>
      </header>

      <div className="flex flex-col gap-28 lg:gap-40">
        <ArtworkCard
          artwork={featured}
          className="mx-auto w-full max-w-5xl"
          sizes="(max-width: 1024px) 100vw, 64vw"
        />

        <div className="grid grid-cols-1 items-end gap-16 md:grid-cols-12 md:gap-10 lg:gap-16">
          <ArtworkCard
            artwork={second}
            className="md:col-span-7"
            sizes="(max-width: 768px) 100vw, 55vw"
          />
          <ArtworkCard
            artwork={third}
            className="md:col-span-5 md:mb-24"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>

        <ArtworkCard
          artwork={fourth}
          className="mx-auto w-full max-w-6xl"
          sizes="(max-width: 1024px) 100vw, 72vw"
        />

        <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-12 md:gap-10 lg:gap-20">
          <ArtworkCard
            artwork={fifth}
            className="md:col-span-5 md:mt-32"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <ArtworkCard
            artwork={sixth}
            className="md:col-span-7"
            sizes="(max-width: 768px) 100vw, 55vw"
          />
        </div>
      </div>
    </section>
  );
}