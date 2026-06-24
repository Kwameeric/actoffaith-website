import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { uploadedVideos } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(uploadedVideos);
    return NextResponse.json({ videos: all });
  } catch {
    return NextResponse.json({ videos: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await db.insert(uploadedVideos).values({
      title: data.title,
      videoData: data.videoData,
      description: data.description || null,
    }).returning();
    return NextResponse.json({ video: result[0] });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await db.delete(uploadedVideos).where(eq(uploadedVideos.id, id));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
