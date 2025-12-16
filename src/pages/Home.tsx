import SearchPage from "./Search";
import { type Artwork } from "../schemas/artworkSchema";
import { useState, useEffect } from "react";
import { searchArtworks } from "../api/searchArtworks";
import ArtworkCard from "../components/ArtworkCard";

type HomeProps = {
  onAddToGallery: (artwork: Artwork) => void;
  galleryIds: number[];
};

export default function Home({ onAddToGallery, galleryIds }: HomeProps) {
  // Artworks
  const [examples, setExamples] = useState<Artwork[]>([]);

  useEffect(() => {
    async function loadExamples() {
      try {
        const result = await searchArtworks("impressionism");
        setExamples(result.slice(0, 6));
      } catch (err) {
        console.error("Beispiel-Artworks konnten nicht geladen werden", err);
      }
    }

    loadExamples();
  }, []);

  // ANIMATION FÜR HERO
  // const [animate, setAnimate] = useState(false);

  // useEffect(() => {
  //   setAnimate(true);
  // }, []);

  return (
    <div className={`flex flex-col gap-6 `}>
      {/* HERO */}
      <section className="max-w-7xl mx-auto p-6 animate-fade-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="flex flex-col gap-6">
            <span className="text-sm tracking-wide uppercase ">
              Art Institute of Chicago
            </span>

            <h1 className="text-4xl md:text-5xl font-semibold leading-tight ">
              Entdecke Kunst
              <br />
              Deine Sammlung, Dein Stil.
            </h1>

            <p className="text-base max-w-md">
              Durchsuche tausende Kunstwerke aus der Sammlung des Art Institute
              of Chicago. Speichere deine Favoriten und ergänze persönliche
              Notizen – ganz in deinem eigenen Tempo.
            </p>
          </div>
          {/* Quote */}
          <div className="rounded-3xl bg-white/60 backdrop-blur p-10 flex flex-col justify-center gap-6">
            <p className="text-xl font-medium leading-relaxed ">
              “Art enables us to find ourselves and lose ourselves at the same
              time.”
            </p>
            <span className="text-sm">— Thomas Merton</span>
          </div>
        </div>
      </section>
      {/* suche */}
      <section className="">
        <p className="px-8">
          Suche nach Kunstwerken und sammle deine persönlichen Highlights.
        </p>
        <SearchPage onAddToGallery={onAddToGallery} galleryIds={galleryIds} />
      </section>

      {/* Beeispiele Artworks */}
      {examples.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-20">
          <h2 className="text-2xl font-semibold mb-8">Inspiration entdecken</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {examples.map((artwork) => (
              <div
                key={artwork.id}
                className=" bg-white/70 sm:backdrop-blur rounded-2xl  p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <ArtworkCard
                  artwork={artwork}
                  onAddToGallery={onAddToGallery}
                  isSaved={galleryIds.includes(artwork.id)}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
