import joi from "joi";
import { CreateTestData } from "../repositories/testsRepository";

export const testsSchema = joi.object<CreateTestData>({
  name: joi.string().required(),
  pdfUrl: joi.string().uri().required(),
  categoryId: joi.number().required(),
  teacherDisciplineId: joi.number().required()
});
