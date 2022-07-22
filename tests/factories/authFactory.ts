import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

import { prisma } from "../../src/config/database.js";

export function createLogin(email = "teste@gmail.com", passwordLength = 10) {
  return {
    email,
    password: faker.internet.password(passwordLength),
    // confirmPassword
  };
}

interface Login {
  email: string;
  password: string;
}


export async function userAndToken(login: Login){
  const user = await prisma.users.create({
    data: {
      email: login.email,
      password: bcrypt.hashSync(login.password, 10)
    }
  });
  
  return user;
}