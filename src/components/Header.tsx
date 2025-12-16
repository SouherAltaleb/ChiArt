import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold tracking-tight">
          <img src="logo.svg" alt="logo" className="w-20" />
        </Link>

        {/* Navigation */}
        <nav className="flex gap-8 text-md font-medium">
          <Link to="/" className="hover:text-(--color-vanilla) ">
            Home
          </Link>
          <Link to="/gallery" className="hover:text-(--color-vanilla)">
            Galerie
          </Link>
        </nav>
      </div>
    </header>
  );
}
