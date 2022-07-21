import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import { schemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { authSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", schemaMiddleware(authSchema.signUpSchema), signUp);
authRouter.post("/sign-in", schemaMiddleware(authSchema.signInSchema), signIn);

export default authRouter;