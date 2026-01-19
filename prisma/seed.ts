import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "src/generated/prisma/client";
import { championsByRoles } from "src/data/champions";
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const roles = ['top', 'jungle', 'mid', 'adc', 'support'];

    console.log("Creating roles...");
    const roleMap: Record<string, number> = {};

    for (const roleName of roles) {
        const role = await prisma.role.upsert({
            where: { name: roleName },
            update: {},
            create: { name: roleName },
        });
        roleMap[roleName] = role.id;
    }

    console.log("Creating champions, links, and successes...");

    const championEntries = Object.entries(championsByRoles);

    await Promise.all(championEntries.map(async ([championName, details]) => {
        const champion = await prisma.champion.upsert({
            where: { name: championName },
            update: {},
            create: {
                name: championName,
                imgUrl: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_0.jpg`,
                roles: {
                    create: details.roles.map((roleName) => ({
                        role: {
                            connect: { name: roleName }
                        }
                    }))
                }
            }
        });

        await Promise.all(details.roles.map((roleName) => {
            const roleId = roleMap[roleName];

            return prisma.success.upsert({
                where: {
                    championId_roleId: {
                        championId: champion.id,
                        roleId: roleId
                    }
                },
                update: {},
                create: {
                    championId: champion.id,
                    roleId: roleId
                }
            });
        }));
    }));

    console.log(`Successfully seeded ${championEntries.length} champions and their successes.`);
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