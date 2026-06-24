import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { bibleSchoolEnrollments } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(bibleSchoolEnrollments).orderBy(desc(bibleSchoolEnrollments.createdAt));
    return NextResponse.json({ enrollments: all });
  } catch {
    return NextResponse.json({ enrollments: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await db.insert(bibleSchoolEnrollments).values({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || null,
      age: data.age || null,
      address: data.address || null,
      course: data.course || null,
      experience: data.experience || null,
      message: data.message || null,
      status: "pending",
    }).returning();
    return NextResponse.json({ enrollment: result[0] });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
