import * as testsRepository from "../repositories/testsRepository.js";
import * as categoriesRepository from "../repositories/categoriesRepository.js";
import * as tecahersDisciplinesRepository from "../repositories/teachersDisciplinesRepository.js";
import { CreateTestData } from "../repositories/testsRepository.js";

export async function insertTest(test: CreateTestData) {
  const categoryId = await categoriesRepository.findCategoryById(test.categoryId);
  if(!categoryId){
    throw {
      type: "Not_Found",
      message: "Category not found",
    };
  }

  const teacherDisciplineId = await tecahersDisciplinesRepository.findTeacherDisciplineById(test.teacherDisciplineId);
  if(!teacherDisciplineId){
    throw {
      type: "Not_Found",
      message: "Teacher discipline not found",
    };
  }

  await testsRepository.insertTest(test);
  return;
}

export async function getAllTestsByDisciplines() {
  const tests = await testsRepository.getAllTestsByDisciplines();
  return tests;
}