import type { Metadata } from "next";
import DonateForm from "@/components/DonateForm";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support B'nai Israel Congregation — one-time and monthly giving, yahrzeit and kiddush dedications, by card, Apple Pay, Google Pay, PayPal, Venmo, or Zelle.",
  openGraph: {
    title: "Support B'nai Israel Congregation",
    description:
      "Keep 150 years of downtown Baltimore Jewish life going strong. Give in under a minute.",
  },
};

export default function DonatePage() {
  const s = getSettings();
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-4xl font-bold text-navy-800">
          Support B&rsquo;nai Israel
        </h1>
        <p className="mt-3 text-lg text-ink/80">
          Your gift keeps the minyan davening, the kiddush flowing, and the
          doors of our 1876 landmark open — as they have been for 150 years.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-5">
        <div className="rounded-xl border border-parchment bg-white p-6 sm:p-8 lg:col-span-3">
          <DonateForm />
        </div>

        <div className="space-y-4 lg:col-span-2">
          <h2 className="font-serif text-xl font-bold text-navy-800">
            Other ways to give
          </h2>

          <div className="rounded-xl border border-parchment bg-white p-5">
            <h3 className="flex items-center gap-2 font-semibold text-navy-800">
              <span className="rounded bg-[#008CFF] px-2 py-0.5 text-xs font-bold text-white">
                Venmo
              </span>
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              Send to <strong>{s.venmoHandle}</strong> — add a note like
              &ldquo;kiddush&rdquo; or &ldquo;yahrzeit for …&rdquo; so we can
              record it correctly.
            </p>
            <p className="mt-2 text-xs text-ink/60">
              (Preview site — handle is a placeholder.)
            </p>
          </div>

          <div className="rounded-xl border border-parchment bg-white p-5">
            <h3 className="flex items-center gap-2 font-semibold text-navy-800">
              <span className="rounded bg-[#6d1ed4] px-2 py-0.5 text-xs font-bold text-white">
                Zelle
              </span>
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              Send via your banking app to <strong>{s.zelleAddress}</strong> —
              no fees, the shul receives every dollar. Include your name and
              purpose in the memo.
            </p>
            <p className="mt-2 text-xs text-ink/60">
              (Preview site — address is a placeholder.)
            </p>
          </div>

          <div className="rounded-xl border border-parchment bg-white p-5">
            <h3 className="font-semibold text-navy-800">By mail or in person</h3>
            <p className="mt-2 text-sm leading-relaxed">
              Checks payable to <strong>{s.name}</strong>, {s.address}.
            </p>
          </div>

          <p className="text-xs leading-relaxed text-ink/60">
            B&rsquo;nai Israel Congregation is a 501(c)(3) organization;
            donations are tax-deductible to the extent allowed by law. Questions
            about giving, dedications, or larger gifts? Contact the office at{" "}
            {s.phone}.
          </p>
        </div>
      </div>
    </div>
  );
}
