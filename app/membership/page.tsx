import type { Metadata } from "next";
import { getSettings } from "@/lib/content";
import MembershipForm from "@/components/MembershipForm";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Join B'nai Israel Congregation — membership options for individuals, families, and young professionals at downtown Baltimore's historic shul.",
};

const tiers = [
  {
    name: "Young Professional",
    price: "$180 / year",
    blurb:
      "For members under 35 — full membership, High Holiday seats, and a community that wants to know your name.",
  },
  {
    name: "Individual",
    price: "$360 / year",
    blurb:
      "Full membership for one adult, including High Holiday seats and voting rights.",
  },
  {
    name: "Family",
    price: "$540 / year",
    blurb:
      "Full membership for your household, including High Holiday seats for the family.",
  },
  {
    name: "Supporter",
    price: "Any amount",
    blurb:
      "Live far away but love this place? Become a supporting member and help keep the historic doors open.",
  },
];

export default function MembershipPage() {
  const s = getSettings();
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-navy-800">Membership</h1>
      <p className="mt-2 max-w-2xl text-lg text-gold-600">
        Be part of the community keeping 150 years of downtown Jewish life going
        strong
      </p>
      <p className="mt-4 max-w-2xl leading-relaxed">
        Membership supports the minyan, the kiddush, the building, and
        everything that happens inside it. Dues shown are sample tiers for the
        preview site — no one is ever turned away for inability to pay; contact
        the office to discuss.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="rounded-xl border border-parchment bg-white p-6"
          >
            <h2 className="font-serif text-xl font-bold text-navy-800">
              {tier.name}
            </h2>
            <p className="mt-1 text-lg font-semibold text-gold-600">
              {tier.price}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">
              {tier.blurb}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-10 rounded-xl border border-parchment bg-white p-6 sm:p-8">
        <h2 className="font-serif text-2xl font-bold text-navy-800">
          Join or Renew
        </h2>
        <p className="mt-2 text-sm text-ink/70">
          Leave your details and the office will follow up — or call {s.phone}.
        </p>
        <div className="mt-5">
          <MembershipForm />
        </div>
      </section>
    </div>
  );
}
