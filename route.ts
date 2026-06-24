import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { notificationSubscribers } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(notificationSubscribers).orderBy(desc(notificationSubscribers.createdAt));
    return NextResponse.json({ subscribers: all });
  } catch {
    return NextResponse.json({ subscribers: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await db.insert(notificationSubscribers).values({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
    }).returning();
    return NextResponse.json({ subscriber: result[0] });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
