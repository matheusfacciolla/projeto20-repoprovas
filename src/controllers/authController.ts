import { Request, Response } from "express";
import * as authService from "../services/authService.js";
import { CreateUserData } from "../repositories/authRepository.js";

export async function signUp(req: Request, res: Response) {
  const user: CreateUserData = req.body;

  await authService.signUp(user);
  return res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const user: CreateUserData = req.body;

  const token = await authService.signIn(user);
  return res.status(200).send(token);
}

// export async function logOut(req: Request, res: Response) {
//   res.cookie('token', '', { httpOnly: true });
//   return res.sendStatus(200);
// }