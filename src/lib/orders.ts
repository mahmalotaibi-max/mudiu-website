import { appendRecord, readRecords } from "@/lib/fileStore";

export type OrderStatus = "pending" | "paid" | "failed" | "cancelled";

export type Order = {
  id: string;
  productSlug: string;
  productName: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  paymentStatus: OrderStatus;
  stripeCheckoutSessionId: string;
  stripePaymentIntentId: string | null;
  createdAt: string;
  updatedAt: string;
};

const ORDERS_FILE = "orders.json";

export async function createOrder(
  order: Omit<Order, "createdAt" | "updatedAt">
): Promise<Order> {
  const now = new Date().toISOString();
  const record: Order = { ...order, createdAt: now, updatedAt: now };
  await appendRecord<Order>(ORDERS_FILE, record);
  return record;
}

export async function updateOrderBySessionId(
  sessionId: string,
  patch: Partial<Pick<Order, "paymentStatus" | "stripePaymentIntentId">>
): Promise<void> {
  const orders = await readRecords<Order>(ORDERS_FILE);
  const index = orders.findIndex((o) => o.stripeCheckoutSessionId === sessionId);
  if (index === -1) return;

  orders[index] = { ...orders[index], ...patch, updatedAt: new Date().toISOString() };

  const { promises: fs } = await import("fs");
  const path = await import("path");
  const filePath = path.join(process.cwd(), ".data", ORDERS_FILE);
  await fs.writeFile(filePath, JSON.stringify(orders, null, 2), "utf-8");
}

export async function getOrderBySessionId(sessionId: string): Promise<Order | undefined> {
  const orders = await readRecords<Order>(ORDERS_FILE);
  return orders.find((o) => o.stripeCheckoutSessionId === sessionId);
}
