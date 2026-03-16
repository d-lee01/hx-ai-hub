import { prisma } from "./prisma";
import type { Section } from "@prisma/client";

export async function getPagesBySection(section: Section) {
  return prisma.page.findMany({
    where: { section, published: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPageBySlug(slug: string) {
  return prisma.page.findUnique({ where: { slug } });
}

export async function getAllPublishedPages() {
  return prisma.page.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getUserImageByName(name: string) {
  const user = await prisma.user.findFirst({
    where: { name: { equals: name, mode: "insensitive" } },
    select: { image: true },
  });
  return user?.image ?? null;
}

export async function getUserImagesByNames(names: string[]): Promise<Record<string, string>> {
  const unique = [...new Set(names.filter(Boolean))];
  if (unique.length === 0) return {};
  const users = await prisma.user.findMany({
    where: { name: { in: unique, mode: "insensitive" } },
    select: { name: true, image: true },
  });
  const map: Record<string, string> = {};
  for (const u of users) {
    if (u.name && u.image) map[u.name.toLowerCase()] = u.image;
  }
  return map;
}

export async function getToolsByCapabilities(capabilities: string[]) {
  if (capabilities.length === 0) {
    return getPagesBySection("TOOLS");
  }
  return prisma.page.findMany({
    where: {
      section: "TOOLS",
      published: true,
      capabilities: { hasSome: capabilities },
    },
    orderBy: { createdAt: "desc" },
  });
}
