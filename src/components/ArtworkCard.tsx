import { type Artwork } from "../schemas/artworkSchema";

// props typ
type ArtworkCardProps = {
  artwork: Artwork;
  onAddToGallery?: (artwork: Artwork) => void; // Wenn diese Funktion existiert --> add button anzeigen
};

export default function ArtworkCard({
  artwork,
  onAddToGallery,
}: ArtworkCardProps) {
  // Bild-URL
  const imageUrl = artwork.image_id
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`
    : null;

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt={artwork.title} />
      ) : (
        <p> Kein Bild verfügbar</p>
      )}
      <h3> {artwork.title}</h3>
      <p> {artwork.artist_title ?? "Unbekannter Künstler"} </p>

      {/* button */}
      {onAddToGallery && (
        <button
          onClick={() => onAddToGallery(artwork)}
          className="btn-primary bg-amber-800"
        >
          Zur Galerie hinzufügen
        </button>
      )}
    </div>
  );
}
