import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { donations } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(donations).orderBy(desc(donations.createdAt));
    return NextResponse.json({ donations: all });
  } catch {
    return NextResponse.json({ donations: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await db.insert(donations).values({
      donorName: data.donorName,
      email: data.email || null,
      phone: data.phone || null,
      amount: data.amount,
      currency: data.currency || "USD",
      method: data.method,
      purpose: data.purpose || "general",
      reference: data.reference || null,
      status: "pending",
    }).returning();
    return NextResponse.json({ donation: result[0] });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
