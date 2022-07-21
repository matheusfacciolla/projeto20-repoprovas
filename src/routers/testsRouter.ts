import { Router } from "express";
import { insertTest } from "../controllers/testsController.js";
import { schemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { testsSchema } from "../schemas/testsSchema.js";

const authRouter = Router();

authRouter.post("/createtest", schemaMiddleware(testsSchema), insertTest);

export default authRouter;