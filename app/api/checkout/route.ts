import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Creates a Stripe Checkout session for one-time or monthly gifts.
// Without STRIPE_SECRET_KEY set (preview deployments), responds with
// { demo: true } and the client shows a simulated confirmation instead.

const dedicationLabels: Record<string, string> = {
  general: "General donation",
  yahrzeit: "Yahrzeit / memorial",
  honor: "In honor of",
  kiddush: "Kiddush sponsorship",
  building: "Building fund",
};

export async function POST(req: NextRequest) {
  const { amount, frequency, dedication, dedicationName } = await req.json();

  if (!Number.isInteger(amount) || amount < 100 || amount > 100_000_00) {
    return NextResponse.json(
      { error: "Please enter an amount between $1 and $100,000." },
      { status: 400 }
    );
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ demo: true });
  }

  const stripe = new Stripe(secretKey);
  const origin = req.nextUrl.origin;
  const label = dedicationLabels[dedication] ?? dedicationLabels.general;
  const description = dedicationName ? `${label} — ${dedicationName}` : label;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: frequency === "monthly" ? "subscription" : "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: amount,
            product_data: {
              name: "Donation to B'nai Israel Congregation",
              description,
            },
            ...(frequency === "monthly"
              ? { recurring: { interval: "month" as const } }
              : {}),
          },
          quantity: 1,
        },
      ],
      metadata: { dedication, dedicationName: dedicationName ?? "" },
      success_url: `${origin}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Could not start checkout — please try again." },
      { status: 500 }
    );
  }
}
