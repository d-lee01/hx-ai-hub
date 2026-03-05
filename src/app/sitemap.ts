export const dynamic = "force-dynamic";

import { MetadataRoute } from "next";
import { prisma } from "@/lib/db/prisma";
import { SECTIONS } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || "https://ai.holidayextras.com";

  const pages = await prisma.page.findMany({
    where: { published: true },
    select: { slug: true, section: true, updatedAt: true },
  });

  return pages.map((page) => ({
    url: `${baseUrl}/${SECTIONS[page.section].slug}/${page.slug}`,
    lastModified: page.updatedAt,
  }));
}
