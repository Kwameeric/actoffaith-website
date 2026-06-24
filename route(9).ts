import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { events } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(events);
    return NextResponse.json({ events: all });
  } catch {
    return NextResponse.json({ events: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await db.insert(events).values({
      title: data.title,
      description: data.description || null,
      date: data.date,
      time: data.time || null,
      location: data.location || null,
      imageUrl: data.imageUrl || null,
    }).returning();
    return NextResponse.json({ event: result[0] });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    await db.update(events).set({
      title: data.title,
      description: data.description,
      date: data.date,
      time: data.time,
      location: data.location,
      imageUrl: data.imageUrl,
    }).where(eq(events.id, data.id));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await db.delete(events).where(eq(events.id, id));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
