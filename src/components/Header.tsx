import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-vanilla/70">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold tracking-tight">
          ChiArt
        </Link>

        {/* Navigation */}
        <nav className="flex gap-8 text-sm font-medium">
          <Link to="/" className="hover:opacity-70">
            Home
          </Link>
          <Link to="/gallery" className="hover:opacity-70">
            Galerie
          </Link>
        </nav>

        {/* CTA */}
        <button className="btn btn-sm rounded-full bg-dark text-vanilla hover:bg-dark/80">
          Explore
        </button>
      </div>
    </header>
  );
}
