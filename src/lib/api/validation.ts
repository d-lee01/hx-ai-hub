import { z } from "zod";

export const createPageSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase alphanumeric with hyphens"),
  section: z.enum(["NEWS", "AT_HX", "TOOLS", "MODEL_RELEASES"]),
  title: z.string().min(1).max(300),
  body: z.string().min(1),
  sourceUrl: z.string().url().optional().nullable(),
  capabilities: z.array(z.string()).optional().default([]),
  logoUrl: z.string().url().optional().nullable(),
  accessUrl: z.string().url().optional().nullable(),
  hxContact: z.string().max(200).optional().nullable(),
  author: z.string().max(200).optional().nullable(),
  published: z.boolean().optional().default(true),
});

export const updatePageSchema = createPageSchema.partial().omit({ slug: undefined });

export type CreatePageInput = z.infer<typeof createPageSchema>;
export type UpdatePageInput = z.infer<typeof updatePageSchema>;
