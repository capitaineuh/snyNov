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
          Seny travaille l’huile comme une matière lente. Les toiles de{" "}
          <em className="not-italic text-[#c8c8c8]">Novembre</em> explorent le
          seuil entre figure et atmosphère : des chambres d’ocre, des horizons
          abaissés, des bleus qui se souviennent de la nuit. L’exposition
          rassemble six œuvres récentes, conçues pour être vues de loin, puis
          approchées jusqu’au grain.
        </p>
        <p className="mt-8 font-sans text-[11px] uppercase tracking-[0.28em] text-[#888888]">
          Seny — Paris, 2026
        </p>
      </motion.div>
    </section>
  );
}
