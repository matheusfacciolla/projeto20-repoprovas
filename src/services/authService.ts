import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as authRepository from "../repositories/authRepository.js";
import { CreateUserData } from "../repositories/authRepository.js";

export async function signUp(user: CreateUserData) {
  const isEmailExist = await authRepository.findUserByEmail(user.email);
  const SALT = 10;

  if (!isEmailExist) {
    user.password = bcrypt.hashSync(user.password, SALT);
    await authRepository.createUser(user);
  } else {
    throw {
      type: "Conflict",
      message: "E-mail already exist",
    };
  }

  return;
}

export async function signIn(user: CreateUserData) {
  const userInfo = await authRepository.findUserByEmail(user.email);
  const isCorrectPassword = bcrypt.compareSync(user.password, userInfo.password);

  if (!userInfo) {
    throw {
      type: "Not_Found",
      message: "E-mail not register",
    };
  }

  if (!isCorrectPassword) {
    throw {
      type: "Unauthorized",
      message: "Wrong password",
    };
  }

  const key = process.env.JWT_SECRET;
  const expiresAt = { expiresIn: 60 * 60 * 24 };
  const token = jwt.sign({ userId: userInfo.id, email: user.email }, key, expiresAt);

  return token;
}