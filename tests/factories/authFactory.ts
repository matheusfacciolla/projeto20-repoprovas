import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

import { prisma } from "../../src/config/database.js";

export function createSignUp(email = "teste@gmail.com", passwordLength = 10) {
  const password = faker.internet.password(passwordLength);
  return {
    email,
    password,
    confirmPassword: password
  };
}

interface Login {
  email: string;
  password: string;
  confirmPassword: string;
}


export async function createUser(login: Login){
  const password = bcrypt.hashSync(login.password, 10);
  const user = await prisma.users.create({
    data: {
      email: login.email,
      password,
    }
  });

  return user;
}
