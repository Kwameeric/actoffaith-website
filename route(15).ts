import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { siteContent } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const keysParam = req.nextUrl.searchParams.get("keys");
    if (keysParam) {
      const keys = keysParam.split(",");
      const rows = await db.select().from(siteContent).where(inArray(siteContent.key, keys));
      const result: Record<string, string> = {};
      rows.forEach(r => { result[r.key] = r.value; });
      return NextResponse.json(result);
    }
    const all = await db.select().from(siteContent);
    return NextResponse.json({ content: all });
  } catch {
    return NextResponse.json({ content: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { key, value } = await req.json();
    if (!key || value === undefined) return NextResponse.json({ error: "Missing key or value" }, { status: 400 });

    const existing = await db.select().from(siteContent).where(eq(siteContent.key, key)).limit(1);
    if (existing.length > 0) {
      await db.update(siteContent).set({ value, updatedAt: new Date() }).where(eq(siteContent.key, key));
    } else {
      await db.insert(siteContent).values({ key, value });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
