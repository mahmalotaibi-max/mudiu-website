"use client";

import { useState } from "react";

export function BuyBox({
  productSlug,
  price,
  currency,
}: {
  productSlug: string;
  price: number;
  currency: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, customerName: name, customerEmail: email }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error ?? "تعذّر بدء عملية الدفع، حاول مرة أخرى.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("تعذّر بدء عملية الدفع، حاول مرة أخرى.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleBuy} className="flex flex-col gap-4">
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-semibold text-ink">
          {price.toLocaleString("ar-SA")}
        </span>
        <span className="text-sm text-muted">{currency}</span>
      </div>

      <input
        type="text"
        required
        placeholder="الاسم"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
      />
      <input
        type="email"
        required
        placeholder="البريد الإلكتروني"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink"
      />

      {error && <p className="text-sm text-orange">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy hover:shadow-[0_16px_32px_-16px_rgba(63,74,60,0.5)] disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        {loading ? "جارِ التحويل إلى الدفع..." : "سجّل الآن"}
      </button>

      <p className="text-center text-xs text-muted">دفع آمن عبر Stripe</p>
    </form>
  );
}
