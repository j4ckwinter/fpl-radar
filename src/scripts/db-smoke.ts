import { prisma } from "../lib/prisma";

async function main() {
  const row = await prisma.healthcheck.create({ data: {} });
  const count = await prisma.healthcheck.count();
  console.log({ insertedId: row.id, count });
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
