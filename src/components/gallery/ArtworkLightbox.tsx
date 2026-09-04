"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Artwork } from "@/components/gallery/ArtworkCard";
import { X } from "lucide-react";

type ArtworkLightboxProps = {
  artwork: Artwork;
  isOpen: boolean;
  onClose: () => void;
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ArtworkLightbox({
  artwork,
  isOpen,
  onClose,
}: ArtworkLightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Vue plein écran — ${artwork.title}`}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 sm:p-8 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/92 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={onClose}
          />

          {/* Top Bar */}
          <div className="relative z-10 flex w-full max-w-7xl items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-sans text-[10px] uppercase tracking-[0.38em] text-[#888888]">
                Vue Détaillée
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer le plein écran"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#161616]/70 text-[#f5f5f5] transition-all duration-300 hover:border-white/30 hover:bg-[#202020] hover:scale-105"
            >
              <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>

          {/* Image Container */}
          <motion.div
            className="relative z-10 flex h-full max-h-[75vh] w-full max-w-5xl flex-1 items-center justify-center p-2 sm:p-4"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square h-full max-h-[72vh] w-auto max-w-full overflow-hidden rounded-sm shadow-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <Image
                src={artwork.imageUrl}
                alt={`${artwork.title}, ${artwork.year}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 85vw"
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Bottom Info Bar */}
          <motion.div
            className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-1 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.05 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-serif text-2xl italic font-normal tracking-wide text-[#f5f5f5] sm:text-3xl">
              {artwork.title}
              <span className="ml-3 font-sans text-xs not-italic tracking-[0.2em] text-[#888888]">
                {artwork.year}
              </span>
            </h3>
            <p className="font-sans text-[12px] tracking-[0.06em] text-[#888888]">
              {artwork.medium}
              <span className="mx-2 text-[#4a4a4a]" aria-hidden="true">
                ·
              </span>
              {artwork.dimensions}
            </p>
            {artwork.artsyUrl && (
              <a
                href={artwork.artsyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 font-sans text-[11px] tracking-[0.16em] text-[#888888] transition-colors duration-300 hover:text-[#f5f5f5]"
              >
                Consulter sur Artsy
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}