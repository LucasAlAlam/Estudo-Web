import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker/locale/pt_BR"
import auth from "../../config/auth";

const prisma = new PrismaClient();

interface User {
    email: string,
    jobTitle: string,
    department: string,
    hash: string,
    salt: string,
}

let data: Array<User> = []

const {hash, salt} = auth.generatePassword(faker.internet.password());

for (let i = 0; i < 50; i++) {
    data.push({
        email: faker.internet.email(),
        jobTitle: faker.person.jobTitle(),
        department: faker.commerce.department(),
        hash: hash,
        salt: salt
    })
}

export async function userSeed() {
    await prisma.user.createMany({data})
}