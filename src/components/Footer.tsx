export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16">
      <div className="max-w-7xl mx-auto px-6 pb-10">
        {/* Top line */}
        <div className="h-px w-full bg-(--color-dark) mb-8" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Brand + small text */}
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold text-dark">ChiArt</p>
            <p className="text-sm text-dark/60 max-w-md">
              Entdecken Sie die Sammlung des Art Institute of Chicago, speichern
              Sie Ihre Favoriten und fügen Sie Ihre Notizen hinzu.
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            <img src="instagram.svg" alt="Instagram" className="w-10 h-10 " />
            <img src="in.svg" alt="LinkedIn" className="w-10 h-10 " />
            <img src="youtube.svg" alt="youtube" className="w-10 h-10 " />
          </div>
        </div>

        {/*   */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-dark/60">
          <p>© {year} ChiArt — erstellt mit React + TypeScript bei Souher.</p>
          <p className="italic">
            „Kunst wäscht den Staub des Alltags von der Seele“
          </p>
        </div>
      </div>
    </footer>
  );
}
