import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { authenticateBot } from "@/lib/api/bot-auth";
import { updatePageSchema } from "@/lib/api/validation";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { error } = await authenticateBot(req, "pages:read");
  if (error) return error;

  const { slug } = await params;
  const page = await prisma.page.findUnique({ where: { slug } });

  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  return NextResponse.json({ page });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { error } = await authenticateBot(req, "pages:write");
  if (error) return error;

  const { slug } = await params;
  const existing = await prisma.page.findUnique({ where: { slug } });

  if (!existing) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  const body = await req.json();
  const result = updatePageSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const page = await prisma.page.update({
    where: { slug },
    data: result.data,
  });

  return NextResponse.json({ page });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { error } = await authenticateBot(req, "pages:write");
  if (error) return error;

  const { slug } = await params;
  const existing = await prisma.page.findUnique({ where: { slug } });

  if (!existing) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }

  // Archive instead of delete
  const page = await prisma.page.update({
    where: { slug },
    data: { published: false },
  });

  return NextResponse.json({ page, message: "Page archived (published=false)" });
}
