import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { galleryImages } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(galleryImages).orderBy(galleryImages.sortOrder);
    return NextResponse.json({ images: all });
  } catch {
    return NextResponse.json({ images: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await db.insert(galleryImages).values({
      title: data.title,
      imageUrl: data.imageUrl,
      category: data.category || "general",
      sortOrder: data.sortOrder || 0,
    }).returning();
    return NextResponse.json({ image: result[0] });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await db.delete(galleryImages).where(eq(galleryImages.id, id));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
