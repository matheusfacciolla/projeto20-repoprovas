import * as testsRepository from "../repositories/testsRepository.js";
import { CreateTestData } from "../repositories/testsRepository.js";

export async function insertTest(test: CreateTestData) {
  const categoryId = await testsRepository.findCategoryById(test.categoryId);
  if(!categoryId){
    throw {
      type: "Not_Found",
      message: "Category not found",
    };
  }

  const teacherDisciplineId = await testsRepository.findTeacherDisciplineById(test.teacherDisciplineId);
  if(!teacherDisciplineId){
    throw {
      type: "Not_Found",
      message: "Teacher discipline not found",
    };
  }

  await testsRepository.insertTest(test);
  return;
}
