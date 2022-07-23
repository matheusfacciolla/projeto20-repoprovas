import { faker } from "@faker-js/faker";

export function validInput() {
  const validInput = {
    name: faker.random.words(1),
    pdfUrl: "https://javascript.pdf",
    categoryId: 1,
    teacherDisciplineId: 1,
  };
  return validInput;
}

export function invalidInput() {
  const invalidInput = {
    name: faker.random.numeric(),
    pdfUrl: faker.random.words(3),
    categoryId: faker.random.numeric(15),
    teacherDisciplineId: faker.random.numeric(15),
  };
  return invalidInput;
}

export function invalidToken() {
  const invalidToken = faker.random.numeric();
  return invalidToken;
}