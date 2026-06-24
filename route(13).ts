import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { books } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const all = await db.select().from(books);
    return NextResponse.json({ books: all });
  } catch {
    return NextResponse.json({ books: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await db.insert(books).values({
      title: data.title,
      author: data.author,
      description: data.description || null,
      price: data.price,
      currency: data.currency || "USD",
      imageUrl: data.imageUrl || null,
      available: data.available ?? true,
    }).returning();
    return NextResponse.json({ book: result[0] });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    await db.update(books).set({
      title: data.title,
      author: data.author,
      description: data.description,
      price: data.price,
      currency: data.currency,
      imageUrl: data.imageUrl,
      available: data.available,
    }).where(eq(books.id, data.id));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await db.delete(books).where(eq(books.id, id));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
