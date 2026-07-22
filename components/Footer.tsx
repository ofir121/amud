import Link from "next/link";
import { getSettings } from "@/lib/content";

export default function Footer() {
  const s = getSettings();
  return (
    <footer className="mt-16 bg-navy-900 text-navy-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <h2 className="mb-2 font-serif text-lg font-bold text-white">
            {s.name}
          </h2>
          <p className="text-sm leading-relaxed">
            {s.address}
            <br />
            {s.phone}
            <br />
            <a href={`mailto:${s.email}`} className="underline hover:text-gold-400">
              {s.email}
            </a>
          </p>
        </div>
        <div>
          <h2 className="mb-2 font-serif text-lg font-bold text-white">
            Quick Links
          </h2>
          <ul className="space-y-1 text-sm">
            <li><Link href="/davening" className="hover:text-gold-400">Davening Times</Link></li>
            <li><Link href="/events" className="hover:text-gold-400">Events Calendar</Link></li>
            <li><Link href="/this-week" className="hover:text-gold-400">This Week at B&rsquo;nai Israel</Link></li>
            <li><Link href="/visit" className="hover:text-gold-400">Plan Your Visit</Link></li>
            <li><Link href="/donate" className="hover:text-gold-400">Support the Shul</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-2 font-serif text-lg font-bold text-white">
            A Living Landmark
          </h2>
          <p className="text-sm leading-relaxed">
            Davening in the same historic sanctuary since 1876 — the heart of
            Jewish downtown Baltimore, on America&rsquo;s oldest synagogue street.
          </p>
        </div>
      </div>
      <div className="border-t border-navy-800 py-4 text-center text-xs text-navy-100/70">
        © {new Date().getFullYear()} {s.name} · {s.address}
      </div>
    </footer>
  );
}
