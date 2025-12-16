import { type Artwork } from "../schemas/artworkSchema";

// props typ
type ArtworkCardProps = {
  artwork: Artwork;
  onAddToGallery?: (artwork: Artwork) => void; // Wenn diese Funktion existiert --> add button anzeigen
  isSaved?: boolean;
};

export default function ArtworkCard({
  artwork,
  onAddToGallery,
  isSaved,
}: ArtworkCardProps) {
  // Bild-URL
  const imageUrl = artwork.image_id
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`
    : null;

  return (
    <div className="flex flex-col gap-3">
      {/* Bild */}
      <div className="relative h-48 overflow-hidden rounded-xl ">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={artwork.title}
            loading="lazy"
            className=" h-full w-full object-cover  transition  duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-sm opacity-60">
            Kein Bild
          </div>
        )}
        {/* add herz button */}
        {onAddToGallery && (
          <button
            onClick={() => onAddToGallery(artwork)}
            aria-label="Add to gallery"
            className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center  backdrop-blur  transition duration-300
                        ${
                          isSaved
                            ? "bg-rose-400 text-white scale-110"
                            : "bg-white/80 text-rose-400 hover:bg-rose-400 hover:text-white hover:scale-110"
                        }
                         active:scale-95
                     `}
          >
            {isSaved ? "♥︎" : "♡"}
          </button>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold leading-snug">
          {artwork.title}
        </h3>
        <p className="text-sm opacity-70">
          {artwork.artist_title ?? "Unbekannter Künstler"}
        </p>
      </div>
    </div>
  );
}
