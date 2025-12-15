import { type Artwork } from "../schemas/artworkSchema";
import ArtworkCard from "../components/ArtworkCard";
import { NoteSchema } from "../schemas/artworkSchema";
import { useState } from "react";

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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draftNote, setDraftNote] = useState("");

  function startEdit(artwork: Artwork) {
    setEditingId(artwork.id);
    setDraftNote(artwork.note ?? "");
  }

  function cancelEdit() {
    setEditingId(null);
    setDraftNote("");
  }

  function saveEdit(id: number) {
    const result = NoteSchema.safeParse(draftNote);
    if (!result.success) {
      alert(result.error.issues[0]?.message ?? "Ungültige Notiz");
      return;
    }

    onUpdateNote(id, draftNote);
    setEditingId(null);
    setDraftNote("");
  }
  return (
    <div>
      <h2>Meine Galerie</h2>

      {gallery.length === 0 && <p>Galerie ist leer</p>}

      <div className="grid">
        {gallery.map((artwork) => {
          const isEditing = editingId === artwork.id;

          return (
            <div
              key={artwork.id}
              style={{ border: "1px solid #ccc", padding: 12 }}
            >
              <ArtworkCard artwork={artwork} />

              {!isEditing ? (
                <>
                  <p>
                    <strong>Notiz:</strong> {artwork.note ? artwork.note : "—"}
                  </p>

                  <button onClick={() => startEdit(artwork)}>Bearbeiten</button>
                  <button onClick={() => onRemove(artwork.id)}>
                    Entfernen
                  </button>
                </>
              ) : (
                <>
                  <textarea
                    value={draftNote}
                    onChange={(e) => setDraftNote(e.target.value)}
                    placeholder="Notiz hinzufügen..."
                    maxLength={200}
                  />

                  <button onClick={() => saveEdit(artwork.id)}>
                    Speichern
                  </button>
                  <button onClick={cancelEdit}>Abbrechen</button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
