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
