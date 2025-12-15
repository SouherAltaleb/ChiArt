import SearchPage from "./Search";
import { type Artwork } from "../schemas/artworkSchema";

type HomeProps = {
  onAddToGallery: (artwork: Artwork) => void;
  galleryIds: number[];
};

export default function Home({ onAddToGallery, galleryIds }: HomeProps) {
  return (
    <div>
      <SearchPage onAddToGallery={onAddToGallery} galleryIds={galleryIds} />
    </div>
  );
}
