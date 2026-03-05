import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function authenticateBot(
  req: NextRequest,
  requiredPermission?: string
) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { error: NextResponse.json({ error: "Missing or invalid Authorization header" }, { status: 401 }), client: null };
  }

  const apiKey = authHeader.slice(7);
  const client = await prisma.apiClient.findUnique({ where: { apiKey } });

  if (!client || !client.active) {
    return { error: NextResponse.json({ error: "Invalid or inactive API key" }, { status: 401 }), client: null };
  }

  if (requiredPermission && !client.permissions.includes(requiredPermission)) {
    return { error: NextResponse.json({ error: "Insufficient permissions" }, { status: 403 }), client: null };
  }

  return { error: null, client };
}
