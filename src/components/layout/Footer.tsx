export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-[#0d0d0d] px-6 py-12 sm:px-10 md:px-16 lg:px-24">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-2xl tracking-[0.12em] text-[#f5f5f5]">
            SENY
          </p>
          <p className="mt-2 font-sans text-[11px] tracking-[0.2em] text-[#888888]">
            Exposition 2026 — Novembre
          </p>
        </div>
        <nav
          className="flex flex-col gap-2 font-sans text-[11px] tracking-[0.18em] text-[#888888] md:items-end"
          aria-label="Liens"
        >
          <a
            href="mailto:studio@seny.art"
            className="transition-colors duration-500 hover:text-[#f5f5f5]"
          >
            studio@seny.art
          </a>
          <a
            href="https://www.artsy.net/artist/seny"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-500 hover:text-[#f5f5f5]"
          >
            Artsy
          </a>
        </nav>
      </div>
      <p className="mt-12 font-sans text-[10px] tracking-[0.16em] text-[#5c5c5c]">
        © {year} Seny. Tous droits réservés.
      </p>
    </footer>
  );
}
