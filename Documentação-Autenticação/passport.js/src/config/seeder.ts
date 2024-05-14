import { PrismaClient } from "@prisma/client";
import { userSeed } from "../models/seeders/userSeed"

const prisma = new PrismaClient();

async function main() {
    await userSeed();
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect();
        process.exit(1);
    });