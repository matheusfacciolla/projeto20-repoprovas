import { Router } from "express";
import authRouter from "./authRouter.js";
import testRouter from "./testsRouter.js";

const router = Router();

router.use(authRouter);
router.use(testRouter)

export default router;