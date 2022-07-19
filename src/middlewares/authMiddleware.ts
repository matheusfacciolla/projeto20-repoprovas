import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function ensureAuthenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization)
    throw { type: "Unauthorized", message: "Missing authorization header" };

  const token = authorization.replace("Bearer ", "");
  if (!token) throw { type: "Unauthorized", message: "Token not found" };

  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    const { userId } = jwt.verify(token, JWT_SECRET) as { userId: number };

    if (!userId) {
      throw { type: "Not_Found", message: "User not found" };
    }

    res.locals.user = userId;

    next();
  } catch {
    throw { type: "Unauthorized", message: "Invalid token" };
  }
}
