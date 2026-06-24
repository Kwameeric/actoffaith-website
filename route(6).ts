import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { livestreamSettings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(livestreamSettings);
    return NextResponse.json({ streams: all });
  } catch {
    return NextResponse.json({ streams: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await db.insert(livestreamSettings).values({
      platform: data.platform,
      embedUrl: data.embedUrl || null,
      channelUrl: data.channelUrl || null,
      isLive: data.isLive || false,
    }).returning();
    return NextResponse.json({ stream: result[0] });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await db.delete(livestreamSettings).where(eq(livestreamSettings.id, id));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
