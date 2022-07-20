import joi from "joi";
import { CreateUserData, CreateUserDataAndConfirmPassword } from "../repositories/authRepository";

const signUpSchema = joi.object<CreateUserDataAndConfirmPassword>({
  email: joi.string().email().required(),
  password: joi.string().required().min(10),
  confirmPassword: joi.ref('password')
});

const signInSchema = joi.object<CreateUserData>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const authSchema = {
  signUpSchema,
  signInSchema,
};