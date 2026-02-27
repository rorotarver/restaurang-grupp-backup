"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteNavbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Hem" },
    { href: "/booking", label: "Boka bord" },
    { href: "/contact", label: "Kontakt" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 text-sm text-zinc-100">
        <Link href="/" className="font-semibold tracking-wide text-amber-300">
          Fantastic Four
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${isActive ? "text-amber-300 underline underline-offset-4" : "hover:text-amber-300"}`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
