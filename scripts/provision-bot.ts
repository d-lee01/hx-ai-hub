import { randomBytes } from "crypto";
import { PrismaClient } from "@prisma/client";

async function main() {
  const name = process.argv[2];
  if (!name) {
    console.error("Usage: npm run provision-bot <bot-name>");
    process.exit(1);
  }

  const prisma = new PrismaClient();

  try {
    const apiKey = `hxai_${randomBytes(32).toString("hex")}`;

    const client = await prisma.apiClient.create({
      data: {
        name,
        apiKey,
        permissions: ["pages:read", "pages:write"],
        active: true,
      },
    });

    console.log("\n=== Bot Provisioned ===");
    console.log(`Name:    ${client.name}`);
    console.log(`API Key: ${apiKey}`);
    console.log(`\nSave this key — it will not be shown again.\n`);
  } catch (err: unknown) {
    if (err && typeof err === "object" && "code" in err && (err as { code: string }).code === "P2002") {
      console.error(`Error: A bot with name "${name}" already exists.`);
      process.exit(1);
    }
    throw err;
  } finally {
    await prisma.$disconnect();
  }
}

main();
