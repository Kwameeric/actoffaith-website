import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projectUpdates } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(projectUpdates);
    return NextResponse.json({ projects: all });
  } catch {
    return NextResponse.json({ projects: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await db.insert(projectUpdates).values({
      title: data.title,
      description: data.description || null,
      imageUrl: data.imageUrl || null,
      progress: data.progress || 0,
    }).returning();
    return NextResponse.json({ project: result[0] });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await db.delete(projectUpdates).where(eq(projectUpdates.id, id));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
