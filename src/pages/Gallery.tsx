import { type Artwork } from "../schemas/artworkSchema";
import ArtworkCard from "../components/ArtworkCard";

type GalleryPageProps = {
  gallery: Artwork[];
  onRemove: (id: number) => void;
  onUpdateNote: (id: number, note: string) => void;
};

export default function GalleryPage({
  gallery,
  onRemove,
  onUpdateNote,
}: GalleryPageProps) {
  return (
    <div>
      <h2>Meine Galerie</h2>

      {gallery.length === 0 && <p>Galerie ist leer</p>}

      <div className="grid">
        {gallery.map((artwork) => (
          <div key={artwork.id}>
            <ArtworkCard artwork={artwork} />

            <textarea
              placeholder="Notiz hinzufügen..."
              value={artwork.note ?? ""}
              onChange={(e) => onUpdateNote(artwork.id, e.target.value)}
              maxLength={200}
            />

            <button
              onClick={() => onRemove(artwork.id)}
              className="bg-amber-300 btn-primary"
            >
              Entfernen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
