import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { onlineMembers } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(onlineMembers).orderBy(desc(onlineMembers.createdAt));
    return NextResponse.json({ members: all });
  } catch {
    return NextResponse.json({ members: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await db.insert(onlineMembers).values({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || null,
      country: data.country || null,
      prayerRequest: data.prayerRequest || null,
    }).returning();
    return NextResponse.json({ member: result[0] });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
