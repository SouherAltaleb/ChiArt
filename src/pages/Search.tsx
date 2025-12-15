import { useState } from "react";
import { type Artwork } from "../schemas/artworkSchema";
import { searchArtworks } from "../api/searchArtworks";
import ArtworkCard from "../components/ArtworkCard";

type SearchPageProps = {
  onAddToGallery: (artwork: Artwork) => void;
};
export default function Search({ onAddToGallery }: SearchPageProps) {
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
    <div>
      <h2>Suche</h2>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Künstler oder Titel suchen..."
      />
      <button onClick={handleSearch}>Suchen</button>

      {loading && <p>Lade...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="grid">
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onAddToGallery={onAddToGallery}
          />
        ))}
      </div>
    </div>
  );
}
