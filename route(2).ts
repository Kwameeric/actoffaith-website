import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
    return NextResponse.json({ messages: all });
  } catch {
    return NextResponse.json({ messages: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await db.insert(contactMessages).values({
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      subject: data.subject || null,
      message: data.message,
      source: data.source || "website",
    }).returning();
    return NextResponse.json({ message: result[0] });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
