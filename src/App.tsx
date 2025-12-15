import { useState } from "react";
import { type Artwork } from "./schemas/artworkSchema";
import { searchArtworks } from "./api/searchArtworks";
import ArtworkCard from "./components/ArtworkCard";

// import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';

function App() {
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
      setError(" Fehler beim Laden der Daten"); // معالجة الاخطا
    } finally {
      setLoading(false); // loading stoppen
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // console.log(e.target.value);
  };

  // add to gallery/fav
  function addToGallery(artwork: Artwork) {
    console.log("Zur Galerie hinzugefügt:", artwork);
  }

  return (
    <div>
      <h1>ChiArt</h1>
      <input
        type="text"
        placeholder="Künster oder title suchen..."
        value={query}
        onChange={handleChange}
      />
      <button onClick={handleSearch} className="btn">
        Suchen
      </button>

      {loading && <p>Lade...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Liste rendern, key ist pflicht */}
      <div className="grid gab-4 p-6">
        {artworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            onAddToGallery={addToGallery}
          />
        ))}
      </div>

      {/* <ul>
        {artworks.map((artwork) => (
          <li key={artwork.id}>
            <strong>{artwork.title}</strong> – {artwork.artist_title}
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
