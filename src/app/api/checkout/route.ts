import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProductBySlug } from "@/content/products";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { productSlug, customerName, customerEmail } = body ?? {};

  if (
    typeof productSlug !== "string" ||
    typeof customerName !== "string" ||
    !customerName.trim() ||
    typeof customerEmail !== "string" ||
    !customerEmail.trim()
  ) {
    return NextResponse.json({ error: "بيانات الطلب غير مكتملة." }, { status: 400 });
  }

  const product = getProductBySlug(productSlug);
  if (!product) {
    return NextResponse.json({ error: "المنتج غير موجود." }, { status: 404 });
  }
  if (!product.price || !product.currency) {
    return NextResponse.json(
      { error: "هذا المنتج غير متاح للشراء حاليًا. تواصل معنا لمعرفة التفاصيل." },
      { status: 400 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin;

  let stripe;
  try {
    stripe = getStripe();
  } catch {
    return NextResponse.json(
      { error: "خدمة الدفع غير مُهيّأة حاليًا. حاول لاحقًا أو تواصل معنا مباشرة." },
      { status: 503 }
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: customerEmail.trim(),
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: product.currency.toLowerCase(),
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.name,
            description: product.tagline,
          },
        },
      },
    ],
    metadata: {
      productSlug: product.slug,
      customerName: customerName.trim(),
    },
    success_url: `${siteUrl}/order/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout/cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
