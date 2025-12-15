import { Link } from "react-router";

function Header() {
  return (
    <header>
      <nav>
        <Link to="/" className="">
          Home
        </Link>
        <Link to="gallery" className="">
          Gallery
        </Link>
      </nav>
    </header>
  );
}

export default Header;
