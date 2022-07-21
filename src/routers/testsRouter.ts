import { Router } from "express";
import { insertTest, getAllTestsByDisciplines, getAllTestsByTeachers } from "../controllers/testsController.js";
import { schemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { testsSchema } from "../schemas/testsSchema.js";
import { ensureAuthenticatedMiddleware } from "../middlewares/authMiddleware.js";

const testRouter = Router();

testRouter.post("/createtest", ensureAuthenticatedMiddleware, schemaMiddleware(testsSchema), insertTest);
testRouter.get("/testsbydisciplines", ensureAuthenticatedMiddleware, getAllTestsByDisciplines);
testRouter.get("/testsbyteachers", ensureAuthenticatedMiddleware, getAllTestsByTeachers);

export default testRouter;