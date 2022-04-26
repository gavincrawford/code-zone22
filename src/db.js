import { PrismaClient } from "@prisma/client";

// https://dev.to/iamluisj/how-to-fix-warning-10-prisma-clients-are-already-running-j14

let prisma;

if (process.env.NODE_ENV == "production") {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export { prisma };
