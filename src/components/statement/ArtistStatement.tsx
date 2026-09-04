"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ArtistStatement() {
  return (
    <section
      id="statement"
      className="relative bg-[#0d0d0d] px-6 py-28 sm:px-10 md:px-16 lg:px-24 lg:py-36"
      aria-labelledby="statement-heading"
    >
      <motion.div
        className="mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <p className="mb-10 font-sans text-[10px] uppercase tracking-[0.38em] text-[#888888]">
          Note curatoriale
        </p>
        <h2
          id="statement-heading"
          className="sr-only"
        >
          Démarche de l’artiste
        </h2>
        <blockquote className="font-serif text-2xl font-normal leading-[1.45] tracking-tight text-[#f5f5f5] sm:text-3xl md:text-[2.15rem] md:leading-[1.4]">
          « La peinture n’illumine pas. Elle retient. Chaque couche est une
          mémoire qui refuse de se dissoudre — un silence coloré, tenu juste
          assez longtemps pour qu’on y entre. »
        </blockquote>
        <p className="mt-10 max-w-xl font-sans text-sm leading-7 tracking-[0.02em] text-[#888888]">
          Seny is a street artist from the suburbs of Paris. Educated at the École Boulle, Seny’s technical mastery originated in his childhood spent drawing and experimenting with collage, sculpture, and painting. This curiosity and his sensitivity led the young artist to take a unique and personal look at the world of innocence. A vision inspired by the powerful expressions of his models, but also by his own experience, relays his interpretation of the world. He makes his works from stencils, mixing spray-paint, acrylic, and Posca. He likes to experiment and risk new combinations of materials and supports.
        </p>
        <p className="mt-8 font-sans text-[11px] uppercase tracking-[0.28em] text-[#888888]">
          Seny — Paris, 2026
        </p>
      </motion.div>
    </section>
  );
}
