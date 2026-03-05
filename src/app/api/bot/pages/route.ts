import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { authenticateBot } from "@/lib/api/bot-auth";
import { createPageSchema } from "@/lib/api/validation";
import type { Section } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { error } = await authenticateBot(req, "pages:read");
  if (error) return error;

  const url = req.nextUrl;
  const section = url.searchParams.get("section")?.toUpperCase() as Section | undefined;
  const capability = url.searchParams.get("capability");
  const published = url.searchParams.get("published");

  const where: Record<string, unknown> = {};
  if (section && ["NEWS", "AT_HX", "TOOLS"].includes(section)) {
    where.section = section;
  }
  if (capability) {
    where.capabilities = { hasSome: [capability] };
  }
  if (published !== null && published !== undefined) {
    where.published = published !== "false";
  }

  const pages = await prisma.page.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ pages });
}

export async function POST(req: NextRequest) {
  const { error } = await authenticateBot(req, "pages:write");
  if (error) return error;

  const body = await req.json();
  const result = createPageSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const existing = await prisma.page.findUnique({ where: { slug: result.data.slug } });
  if (existing) {
    return NextResponse.json({ error: "Page with this slug already exists" }, { status: 409 });
  }

  const page = await prisma.page.create({ data: result.data });
  return NextResponse.json({ page }, { status: 201 });
}
