import Link from "next/link";

export default function SiteNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 text-sm text-zinc-100">
        <Link href="/" className="font-semibold tracking-wide text-amber-300">
          Fantastic Four
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="hover:text-amber-300 transition-colors">Hem</Link>
          <Link href="/booking" className="hover:text-amber-300 transition-colors">Boka bord</Link>
          <Link href="/contact" className="hover:text-amber-300 transition-colors">Kontakt</Link>
          <Link href="/admin" className="hover:text-amber-300 transition-colors">Admin</Link>
        </div>
      </nav>
    </header>
  );
}
