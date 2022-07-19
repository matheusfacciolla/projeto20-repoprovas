import joi from "joi";
import { CreateUserData } from "../repositories/authRepository";

const signUpSchema = joi.object<CreateUserData>({
  email: joi.string().email().required(),
  password: joi.string().required().min(10),
  //confirmPassword: joi.ref('password')
});

const signInSchema = joi.object<CreateUserData>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const authSchema = {
  signUpSchema,
  signInSchema,
};