import { useState, useEffect } from "react";
import { type Artwork } from "./schemas/artworkSchema";

// import SearchPage from "./pages/Search";
import GalleryPage from "./pages/Gallery";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";

function App() {
  // Gallery state
  const [gallery, setGallery] = useState<Artwork[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("gallery");
    if (stored) setGallery(JSON.parse(stored));
  }, []);

  function addToGallery(artwork: Artwork) {
    setGallery((prev) => {
      if (prev.some((item) => item.id === artwork.id)) return prev;
      const updated = [...prev, artwork];
      localStorage.setItem("gallery", JSON.stringify(updated));
      return updated;
    });
  }

  // remove aus gallery
  function removeFromGallery(id: number) {
    setGallery((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("gallery", JSON.stringify(updated));
      return updated;
    });
  }

  // Note update
  function updateNote(id: number, note: string) {
    setGallery((prev) => {
      const updated = prev.map((artwork) =>
        artwork.id === id ? { ...artwork, note } : artwork
      );

      localStorage.setItem("gallery", JSON.stringify(updated));
      return updated;
    });
  }

  // suche input
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setQuery(e.target.value);
  //   // console.log(e.target.value);
  // };

  return (
    <BrowserRouter>
      <Routes>
        {/* LAYOUT ROUTE */}
        <Route path="/" element={<MainLayout />}>
          {/* HOME */}
          <Route index element={<Home onAddToGallery={addToGallery} />} />

          {/* GALLERY */}
          <Route
            path="gallery"
            element={
              <GalleryPage
                gallery={gallery}
                onRemove={removeFromGallery}
                onUpdateNote={updateNote}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
