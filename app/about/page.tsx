import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "About & Our History",
  description:
    "B'nai Israel Congregation has davened in its landmark 1876 Moorish-revival sanctuary on Lloyd Street — America's oldest synagogue street — for 150 years.",
};

export default function AboutPage() {
  const s = getSettings();
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-navy-800">
        Our Story
      </h1>
      <p className="mt-2 text-lg text-gold-600">
        A living landmark in Jewish downtown Baltimore
      </p>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl">
        <Image
          src="/photos/sanctuary.jpg"
          alt="The Moorish-revival sanctuary at B'nai Israel Congregation"
          fill
          sizes="(min-width: 1024px) 896px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-8 space-y-5 leading-relaxed">
        <p>
          B&rsquo;nai Israel Congregation was founded in 1873, and since 1876 we
          have davened in the same magnificent Moorish-revival sanctuary at 27
          Lloyd Street — making ours one of the oldest synagogue buildings in
          continuous use in the United States. Lloyd Street itself is
          America&rsquo;s oldest synagogue street, and our building anchors the
          historic Jonestown neighborhood where Baltimore&rsquo;s Jewish
          community first put down roots.
        </p>
        <p>
          Generations of immigrants davened here, celebrated here, and built
          Jewish Baltimore from this block. When the community moved to the
          suburbs, B&rsquo;nai Israel stayed — and today we are proudly
          <em> not a museum</em>: a traditional Orthodox congregation with
          Shabbat and weekday minyanim, kiddush every week, learning, and a
          growing community of members, young professionals, and downtown
          residents.
        </p>
        <p>
          The sanctuary&rsquo;s hand-carved ark, cast-iron columns, and
          stained-glass windows are worth the trip on their own. But what keeps
          this building alive is the davening inside it. Come for the history —
          stay for the community.
        </p>
      </div>

      <section className="mt-10 flex flex-col gap-5 rounded-xl border border-parchment bg-white p-6 sm:flex-row sm:items-start">
        <div className="relative aspect-square w-full flex-shrink-0 overflow-hidden rounded-lg sm:w-32">
          <Image
            src="/photos/rabbi-mintz.jpg"
            alt={s.rabbi}
            fill
            sizes="128px"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold text-navy-800">
            Rabbi &amp; Leadership
          </h2>
          <p className="mt-3 leading-relaxed">
            <strong>{s.rabbi}</strong> leads the congregation with a warm,
            thoughtful approach to Torah and community, welcoming everyone
            from lifelong members to first-time visitors. The shul is guided
            by a volunteer board of directors drawn from the community.
          </p>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-parchment bg-white p-6">
        <h2 className="font-serif text-2xl font-bold text-navy-800">
          Contact &amp; Directions
        </h2>
        <p className="mt-3 leading-relaxed">
          {s.address}
          <br />
          {s.phone} ·{" "}
          <a className="text-navy-600 underline" href={`mailto:${s.email}`}>
            {s.email}
          </a>
        </p>
        <div className="mt-4 overflow-hidden rounded-lg border border-parchment">
          <iframe
            title="Map to B'nai Israel Congregation, 27 Lloyd Street, Baltimore"
            src="https://www.google.com/maps?q=27+Lloyd+Street,+Baltimore,+MD+21202&output=embed"
            className="h-72 w-full"
            loading="lazy"
          />
        </div>
        <p className="mt-4 text-sm text-ink/70">
          Planning to join us for Shabbat?{" "}
          <Link href="/visit" className="font-semibold text-navy-600 underline">
            See what to expect →
          </Link>
        </p>
      </section>
    </div>
  );
}
