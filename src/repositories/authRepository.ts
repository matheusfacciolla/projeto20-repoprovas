import { prisma } from "../config/database.js";
import { users } from "@prisma/client";

export type CreateUserData = Omit<users, "id">;
export type CreateUserDataAndConfirmPassword = CreateUserData & { confirmPassword: string};

export async function findUserByEmail(email: string) {
  const user = await prisma.users.findFirst({ where: { email } });
  return user;
}

export async function createUser(user: CreateUserData) {
  await prisma.users.create({ data: user });
}
