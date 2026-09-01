"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Artwork } from "@/data/artworks";
import { cn } from "@/lib/cn";

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
  return (
    <motion.article
      className={cn("group flex flex-col gap-5", className)}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.95, ease: EASE }}
    >
      <div
        className="relative w-full overflow-hidden bg-[#161616]"
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
          Consulter sur Artsy ↗
        </a>
      </div>
    </motion.article>
  );
}
