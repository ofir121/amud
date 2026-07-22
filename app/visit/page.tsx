import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Visit Us",
  description:
    "Plan your visit to B'nai Israel Congregation — what to expect at services, parking, kosher food nearby, and Shabbat hospitality in downtown Baltimore.",
};

const items = [
  {
    title: "What to expect",
    body: "Traditional Orthodox davening with a warm, unpretentious crowd. Services are in Hebrew with siddurim (with English translation) available at the door. Men are asked to wear a kippah (we have extras); dress is respectful but not fancy. Someone will happily help you find the place in the siddur — just ask.",
  },
  {
    title: "Shabbat hospitality",
    body: "Visiting for Shabbat? Join us for kiddush after davening every week — it's the best way to meet the community. If you'd like a Shabbat meal placement with a local family, email the office ahead of your visit and we'll do our best to arrange it.",
  },
  {
    title: "Getting here & parking",
    body: "We're at 27 Lloyd Street in historic Jonestown, a short walk from the Inner Harbor, Little Italy, and Harbor East hotels. Street parking is available nearby, and paid lots are within a block. On Shabbat, most visitors walk from downtown hotels — about 10–15 minutes from Harbor East.",
  },
  {
    title: "Kosher food nearby",
    body: "Attman's Delicatessen — a Baltimore institution since 1915 — is on the same block (kosher-style). Ask the office about the current list of certified-kosher options and Shabbat-friendly arrangements downtown.",
  },
  {
    title: "The historic building",
    body: "Our 1876 Moorish-revival sanctuary is one of the oldest in continuous use in America, next door to the Jewish Museum of Maryland and the Lloyd Street Synagogue. Group tours and weekday visits can be arranged through the office — and the best way to see it is at a service, when it's doing what it was built for.",
  },
];

export default function VisitPage() {
  const s = getSettings();
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-navy-800">Visit Us</h1>
      <p className="mt-2 text-lg text-gold-600">
        Everyone is welcome — here&rsquo;s everything you need to know
      </p>

      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <section
            key={item.title}
            className="rounded-xl border border-parchment bg-white p-6"
          >
            <h2 className="font-serif text-xl font-bold text-navy-800">
              {item.title}
            </h2>
            <p className="mt-2 leading-relaxed text-ink/90">{item.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-8 rounded-xl bg-navy-800 p-6 text-white">
        <h2 className="font-serif text-xl font-bold">Questions before you come?</h2>
        <p className="mt-2 text-navy-100">
          Call {s.phone} or email{" "}
          <a href={`mailto:${s.email}`} className="text-gold-400 underline">
            {s.email}
          </a>
          . For service times, see{" "}
          <Link href="/davening" className="text-gold-400 underline">
            the davening schedule
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
