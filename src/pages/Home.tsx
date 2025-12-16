import SearchPage from "./Search";
import { type Artwork } from "../schemas/artworkSchema";
import { useState, useEffect } from "react";

type HomeProps = {
  onAddToGallery: (artwork: Artwork) => void;
  galleryIds: number[];
};

export default function Home({ onAddToGallery, galleryIds }: HomeProps) {
  // ANIMATION FÜR HERO
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div
      className={`flex flex-col gap-6 ${
        animate ? "animate-fade-up" : "opacity-0"
      }`}
    >
      {/* HERO */}
      <section className="max-w-7xl mx-auto p-6">
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
          {" "}
          Suche nach Kunstwerken und sammle deine persönlichen Highlights.
        </p>
        <SearchPage onAddToGallery={onAddToGallery} galleryIds={galleryIds} />
      </section>
    </div>
  );
}
