import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { mediaItems } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(mediaItems);
    return NextResponse.json({ media: all });
  } catch {
    return NextResponse.json({ media: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await db.insert(mediaItems).values({
      title: data.title,
      type: data.type || "image",
      url: data.url,
      thumbnail: data.thumbnail || null,
      description: data.description || null,
    }).returning();
    return NextResponse.json({ item: result[0] });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await db.delete(mediaItems).where(eq(mediaItems.id, id));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
