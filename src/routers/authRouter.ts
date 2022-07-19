import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import { schemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { authSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/signup", schemaMiddleware(authSchema.signUpSchema), signUp);
authRouter.post("/signin", schemaMiddleware(authSchema.signInSchema), signIn);

export default authRouter;