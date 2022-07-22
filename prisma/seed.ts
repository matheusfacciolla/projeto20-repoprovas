import bcrypt from "bcrypt";

import { prisma } from "../src/config/database.js";

async function main() {
  const SALT = 10;
  const hashedPassword = bcrypt.hashSync("admin", SALT);
  const email = "admin@gmail.com";

  await prisma.users.upsert({
    where: { email: email },
    update: {},
    create: {
      email: email,
      password: hashedPassword,
    },
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
