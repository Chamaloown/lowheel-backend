import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "src/generated/prisma/client";
import { championsByRoles } from "src/data/champions";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    const roles = ['top', 'jungle', 'mid', 'adc', 'support'];

    console.log("Creating roles...");
    await Promise.all(
        roles.map((roleName) =>
            prisma.role.upsert({
                where: { name: roleName },
                update: {},
                create: { name: roleName },
            })
        )
    );

    console.log("Creating champions and linking roles...");
    const championPromises = Object.entries(championsByRoles).map(async ([championName, details]) => {
        const champion = await prisma.champion.create({
            data: {
                name: championName,
                roles: {
                    create: details.roles.map((roleName) => ({
                        role: {
                            connect: { name: roleName }
                        }
                    }))
                }
            }
        });

        await prisma.success.create({
            data: {
                championId: champion.id,
            }
        });

        return champion;
    });

    const results = await Promise.all(championPromises);
    console.log(`Successfully seeded ${results.length} champions.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });