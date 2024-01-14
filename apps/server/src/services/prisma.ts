import { PrismaClient } from "@prisma/client";
// declare global {
//     var prisma: PrismaClient | undefined;
// }
const prismaClient = new PrismaClient({
    log: ["query"],
});

export default prismaClient;
// export default globalThis.prisma || prismaClient;