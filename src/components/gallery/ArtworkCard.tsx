"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ArtworkLightbox } from "@/components/gallery/ArtworkLightbox";
import { Maximize2 } from "lucide-react";

export type Artwork = {
  title: string;
  description: string;
  image: string;
  aspect: string;
  imageUrl: string;
  year: string;
  medium: string;
  dimensions: string;
  artsyUrl: string;
};

type ArtworkCardProps = {
  artwork: Artwork;
  className?: string;
  sizes?: string;
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ArtworkCard({
  artwork,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ArtworkCardProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      <motion.article
        className={cn("group flex flex-col gap-5", className)}
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.22 }}
        transition={{ duration: 0.95, ease: EASE }}
      >
        <div
          role="button"
          tabIndex={0}
          aria-label={`Agrandir ${artwork.title} en plein écran`}
          onClick={() => setIsFullscreen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsFullscreen(true);
            }
          }}
          className="relative w-full cursor-zoom-in overflow-hidden bg-[#161616] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          style={{ aspectRatio: artwork.aspect }}
        >
          <Image
            src={artwork.imageUrl}
            alt={`${artwork.title}, ${artwork.year}`}
            fill
            sizes={sizes}
            loading="lazy"
            className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
          {/* Subtle Hover overlay hint */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/20">
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.2em] text-[#f5f5f5] opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
              <Maximize2 className="h-3 w-3" />
              Plein écran
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <h3 className="font-serif text-xl italic font-normal tracking-wide text-[#f5f5f5] sm:text-2xl">
            {artwork.title}
            <span className="ml-2 font-sans text-[11px] not-italic tracking-[0.18em] text-[#888888]">
              {artwork.year}
            </span>
          </h3>
          <p className="font-sans text-[12px] leading-relaxed tracking-[0.04em] text-[#888888]">
            {artwork.medium}
            <span className="mx-2 text-[#4a4a4a]" aria-hidden="true">
              ·
            </span>
            {artwork.dimensions}
          </p>
          <a
            href={artwork.artsyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-fit font-sans text-[11px] tracking-[0.16em] text-[#888888] transition-colors duration-500 hover:text-[#f5f5f5]"
          >
            Consulter sur Artsy
          </a>
        </div>
      </motion.article>

      <ArtworkLightbox
        artwork={artwork}
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
      />
    </>
  );
}