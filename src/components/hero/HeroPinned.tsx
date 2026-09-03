"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  //ARTIST_NAME,
  //EXHIBITION_NAME,
  //EXHIBITION_YEAR,
} from "@/data/artworks";

export function HeroPinned() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.32, 0.58, 0.72, 1],
    [0, 0, 1, 1, 0],
  );
  const titleScale = useTransform(
    scrollYProgress,
    [0.32, 0.58, 0.72, 1],
    [0.94, 1, 1, 0.98],
  );
  const subtitleOpacity = useTransform(
    scrollYProgress,
    [0, 0.52, 0.74, 1],
    [0, 0, 1, 0],
  );
  const subtitleY = useTransform(scrollYProgress, [0.52, 0.74], [16, 0]);
  const stageOpacity = useTransform(scrollYProgress, [0.72, 1], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section
      ref={containerRef}
      className="relative h-[450vh] bg-[#0d0d0d]"
      aria-label={`'SENY', 'Novembre', '2026'`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          className="relative h-full w-full"
          style={{ opacity: stageOpacity }}
        >
          <motion.video
            className="absolute inset-0 h-full w-full object-cover"
            style={{ scale: videoScale }}
            src="/assets/intro.mp4"
            poster="/assets/intro-poster.jpg"
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            Votre navigateur ne prend pas en charge la lecture vidéo.
          </motion.video>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/35 via-[#0d0d0d]/20 to-[#0d0d0d]/70"
            aria-hidden="true"
          />

          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
            <motion.h1
              className="font-serif text-[18vw] font-medium leading-[0.85] tracking-[0.08em] text-[#f5f5f5] sm:text-[14vw] md:text-[11rem]"
              style={{ opacity: titleOpacity, scale: titleScale }}
            >
              {"SENY"}
            </motion.h1>
            <motion.p
              className="mt-8 max-w-xl font-sans text-[11px] uppercase tracking-[0.42em] text-[#f5f5f5]/80 sm:text-xs"
              style={{ opacity: subtitleOpacity, y: subtitleY }}
            >
              Exposition {"2026"} — {"Novembre"}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
