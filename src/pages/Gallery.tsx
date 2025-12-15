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
  console.log("Gallery items:", gallery.length);

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
    <div className="flex flex-col gap-8">
      {/* Titel */}
      <h2 className="text-3xl font-semibold">Meine Galerie</h2>

      {/* Leer-Zustand */}
      {gallery.length === 0 && <p className="opacity-70">Galerie ist leer</p>}

      {/* GRID NUR für Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {gallery.map((artwork) => {
          const isEditing = editingId === artwork.id;

          return (
            <div
              key={artwork.id}
              className="  group  bg-white/70  backdrop-blur  rounded-2xl p-6 flex flex-col gap-4 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <ArtworkCard artwork={artwork} />

              {!isEditing ? (
                <>
                  <p className="text-sm">
                    <strong>Notiz:</strong> {artwork.note ? artwork.note : "—"}
                  </p>

                  <div className="flex gap-3">
                    <button
                      className=" flex-1 mt-3 btn-sm rounded-full bg-(--color-lila) text-(--color-dark) p-2 text-sm font-medium transition duration-300 hover:bg-(--color-mint) hover:shadow-lg active:scale-95 "
                      onClick={() => startEdit(artwork)}
                    >
                      Bearbeiten
                    </button>
                    <button
                      className="flex-1 mt-3 btn-sm rounded-full bg-(--color-hell-rosa) text-(--color-dark) p-2 text-sm font-medium transition duration-300 hover:bg-(--color-mint) hover:shadow-lg active:scale-95 "
                      onClick={() => onRemove(artwork.id)}
                    >
                      Entfernen
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <textarea
                    className="textarea textarea-bordered"
                    value={draftNote}
                    onChange={(e) => setDraftNote(e.target.value)}
                    placeholder="Notiz hinzufügen..."
                    maxLength={200}
                  />

                  <div className="flex gap-3">
                    <button
                      className="flex-1 mt-3 btn-sm rounded-full bg-(--color-lila) text-(--color-dark) p-2 text-sm font-medium transition duration-300 hover:bg-(--color-mint) hover:shadow-lg active:scale-95"
                      onClick={() => saveEdit(artwork.id)}
                    >
                      Speichern
                    </button>
                    <button
                      className="flex-1 mt-3 btn-sm rounded-full bg-(--color-hell-rosa) text-(--color-dark) p-2 text-sm font-medium transition duration-300 hover:bg-(--color-mint) hover:shadow-lg active:scale-95"
                      onClick={cancelEdit}
                    >
                      Abbrechen
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
