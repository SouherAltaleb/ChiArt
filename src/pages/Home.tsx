import SearchPage from "./Search";
import { type Artwork } from "../schemas/artworkSchema";

type HomeProps = {
  onAddToGallery: (artwork: Artwork) => void;
};

export default function Home({ onAddToGallery }: HomeProps) {
  return (
    <div>
      <SearchPage onAddToGallery={onAddToGallery} />
    </div>
  );
}
