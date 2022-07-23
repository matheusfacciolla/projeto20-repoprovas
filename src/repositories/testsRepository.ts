import { prisma } from "../config/database.js";
import { tests } from "@prisma/client";

export type CreateTestData = Omit<tests, "id">;

export async function insertTest(test: CreateTestData) {
  await prisma.tests.create({ data: { ...test } });
  return;
}

export async function getAllTestsByDisciplines() {
  const tests = await prisma.terms.findMany({
    select: {
      number: true,
      disciplines: {
        select: {
          name: true,
          teachersDisciplines: {
            select: {
              teachers: {
                select: {
                  name: true,
                },
              },
              tests: {
                select: {
                  id: true,
                  name: true,
                  pdfUrl: true,
                  categories: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return tests;
}

export async function getAllTestsByTeachers() {
  const tests = await prisma.teachers.findMany({
    select: {
      name: true,
      teachersDisciplines: {
        select: {
          disciplines: {
            select: {
              name: true,
              terms: {
                select: {
                  number: true,
                },
              },
            },
          },
          tests: {
            select: {
              id: true,
              name: true,
              pdfUrl: true,
              categories: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return tests;
}
