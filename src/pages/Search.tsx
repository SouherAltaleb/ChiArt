import { useState } from "react";
import { type Artwork } from "../schemas/artworkSchema";
import { searchArtworks } from "../api/searchArtworks";
import ArtworkCard from "../components/ArtworkCard";

type SearchPageProps = {
  onAddToGallery: (artwork: Artwork) => void;
  galleryIds?: number[];
};
export default function Search({
  onAddToGallery,
  galleryIds,
}: SearchPageProps) {
  // suche
  const [query, setQuery] = useState("");
  // liste der suchergebnisse
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  // Loading
  const [loading, setLoading] = useState(false);
  // error
  const [error, setError] = useState<string | null>(null);

  // Such-Funktion
  async function handleSearch() {
    if (!query.trim()) return; //Kein leerer Text erlaubt

    try {
      setLoading(true); // loading an
      setError(null); // alte error löschen
      const results = await searchArtworks(query); // api wird aufgerufen, wartet auf ergebniss
      setArtworks(results); // ergebniss im state speichern
    } catch (err) {
      console.error(err);
      setError(" Fehler beim Laden der Daten"); // معالجة الاخطا
    } finally {
      setLoading(false); // loading stoppen
    }
  }

  return (
    <div className="flex flex-col gap-10">
      {/* SEARCH BLOCK */}
      <section
        className="
        rounded-full
        p-8
        bg-dark/90
        text-vanilla
        flex
        flex-col
        gap-6
      "
      >
        {/* Header */}
        {/* <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold">Explore</h2>
          </div>
        </div> */}

        {/* Input row */}
        <div className="flex gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="artworks suchen ..."
            className="
            flex-1
            rounded-full
            px-4
            py-3
            bg-transparent
            border
            border-(--color-dark)
            text-vanilla
            placeholder:text-vanilla/40
            focus:outline-none
            focus:border-vanilla
          "
          />

          <button
            onClick={handleSearch}
            className="
            px-6
            rounded-full
            bg-(--color-lila)
            text-(--color-dark)
            font-medium
          transition duration-300 hover:bg-(--color-mint) hover:shadow-lg active:scale-95
          "
          >
            Search
          </button>
        </div>

        {/* Quick picks */}
        {/* <div className="flex flex-wrap gap-3 text-sm">
          {[
            "monet",
            "picasso",
            "cats",
            "portrait",
            "impressionism",
            "ukiyo-e",
          ].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setQuery(tag);
                handleSearch();
              }}
              className="
                px-3
                py-1.5
                rounded-full
                bg-vanilla/10
                hover:bg-vanilla/20
                transition
              "
            >
              {tag}
            </button>
          ))}
        </div> */}
      </section>

      {/* STATUS */}
      {loading && <p className="opacity-70">Lade…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* RESULT INFO */}
      {artworks.length > 0 && (
        <p className="text-sm opacity-70">
          Found <span className="font-medium">{artworks.length}</span>
        </p>
      )}

      {/* RESULTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onAddToGallery={onAddToGallery}
            isSaved={galleryIds?.includes(artwork.id) ?? false}
          />
        ))}
      </div>
    </div>
  );
}
