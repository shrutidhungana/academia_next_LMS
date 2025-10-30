// src/database.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => console.log("🚀 Connected to PostgreSQL via Prisma"))
  .catch((err: unknown) => console.error("❌ Prisma Connection Error:", err));

export default prisma;
