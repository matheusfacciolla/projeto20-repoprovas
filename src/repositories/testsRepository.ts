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
          teacherDisciplines: {
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
