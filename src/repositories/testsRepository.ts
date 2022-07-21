import { prisma } from "../config/database.js";
import { categories, disciplines, teachersDisciplines, tests } from "@prisma/client";

export type CreateTestData = Omit<tests, "id">;
export type CreateCategoriesData = Omit<categories, "id">;
export type CreateDisciplinesData = Omit<disciplines, "id">;
export type CreateTeachersDisciplinesData = Omit<teachersDisciplines, "id">;

export async function findCategoryById(categoryId: number) {
    const categoryName = await prisma.categories.findUnique({ where: {id: categoryId} });
    return categoryName;
}

export async function findTeacherDisciplineById(teacherDisciplineId: number) {
    const teacherDiscipline = await prisma.teachersDisciplines.findFirst({ where: {id: teacherDisciplineId} });
    return teacherDiscipline;
}

export async function insertTest(test: CreateTestData) {
  await prisma.tests.create({ data: { ...test } });
  return;
}
