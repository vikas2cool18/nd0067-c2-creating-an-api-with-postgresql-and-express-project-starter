import {Prisma, PrismaClient} from "@prisma/client";
import environment from "../environment";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

declare global {
    var prisma: PrismaClient | undefined
}

const prisma: PrismaClient = global.prisma || new PrismaClient();


if (!environment.isProduction()) global.prisma = prisma;
export default prisma;