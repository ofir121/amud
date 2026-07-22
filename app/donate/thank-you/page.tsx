import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string; amount?: string; frequency?: string }>;
}) {
  const { demo, amount, frequency } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <p className="font-serif text-5xl text-gold-500" aria-hidden="true">
        תודה רבה
      </p>
      <h1 className="mt-4 font-serif text-4xl font-bold text-navy-800">
        Thank you!
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink/80">
        {demo ? (
          <>
            This preview simulated a{" "}
            <strong>
              ${amount}
              {frequency === "monthly" ? "/month" : ""}
            </strong>{" "}
            donation. On the live site, you&rsquo;d complete secure checkout
            here and receive an email receipt automatically.
          </>
        ) : (
          <>
            Your donation supports 150 years of Jewish life in downtown
            Baltimore. A receipt is on its way to your email.
          </>
        )}
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-navy-700 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-navy-600"
        >
          Back to home
        </Link>
        <Link
          href="/events"
          className="rounded-full border border-navy-600 px-6 py-2.5 font-semibold text-navy-700 transition-colors hover:bg-navy-50"
        >
          See upcoming events
        </Link>
      </div>
    </div>
  );
}
