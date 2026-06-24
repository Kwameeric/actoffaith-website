import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { churchMembers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(churchMembers);
    return NextResponse.json({ members: all });
  } catch {
    return NextResponse.json({ members: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await db.insert(churchMembers).values({
      fullName: data.fullName,
      email: data.email || null,
      phone: data.phone || null,
      role: data.role || null,
      imageUrl: data.imageUrl || null,
    }).returning();
    return NextResponse.json({ member: result[0] });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await db.delete(churchMembers).where(eq(churchMembers.id, id));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
