import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { updateOrderBySessionId } from "@/lib/orders";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 400 });
  }

  const rawBody = await request.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status === "paid") {
        await updateOrderBySessionId(session.id, {
          paymentStatus: "paid",
          stripePaymentIntentId:
            typeof session.payment_intent === "string" ? session.payment_intent : null,
        });
        // Digital delivery hook: trigger product access / confirmation email here
        // once an email provider is connected (e.g. Resend, SendGrid).
      }
      break;
    }
    case "checkout.session.async_payment_failed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await updateOrderBySessionId(session.id, { paymentStatus: "failed" });
      break;
    }
    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      await updateOrderBySessionId(session.id, { paymentStatus: "cancelled" });
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
