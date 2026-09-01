import { HeroPinned } from "@/components/hero/HeroPinned";
import { Gallery } from "@/components/gallery/Gallery";
import { ArtistStatement } from "@/components/statement/ArtistStatement";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="bg-[#0d0d0d]">
      <HeroPinned />
      <Gallery />
      <ArtistStatement />
      <Footer />
    </main>
  );
}
