"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/davening", label: "Davening" },
  { href: "/events", label: "Events" },
  { href: "/this-week", label: "This Week" },
  { href: "/visit", label: "Visit Us" },
  { href: "/membership", label: "Membership" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-navy-800 text-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex flex-col leading-tight"
          onClick={() => setOpen(false)}
        >
          <span className="font-serif text-lg font-bold tracking-wide sm:text-xl">
            B&rsquo;nai Israel
          </span>
          <span className="text-[11px] uppercase tracking-widest text-gold-400">
            Historic Downtown Baltimore · Est. 1873
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-gold-400 ${
                pathname.startsWith(link.href) ? "text-gold-400" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/donate"
            className="rounded-full bg-gold-500 px-5 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
          >
            Donate
          </Link>
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href="/donate"
            className="rounded-full bg-gold-500 px-4 py-1.5 text-sm font-semibold text-navy-900"
          >
            Donate
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className="rounded p-1.5 hover:bg-navy-700"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              {open ? (
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-navy-600 bg-navy-800 px-4 pb-4 lg:hidden"
          aria-label="Mobile"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-navy-700 py-3 text-base hover:text-gold-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
