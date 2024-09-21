import { PrismaClient } from "@prisma/client";
// Instantiate PrismaClient
const prisma = new PrismaClient({
    log: ["error", "query"],
    errorFormat: "pretty"
});
// Export the Prisma client instance
export default prisma;
