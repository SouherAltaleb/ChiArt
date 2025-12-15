import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Suche</Link> | <Link to="/gallery">Galerie</Link>
      </nav>
    </header>
  );
}
