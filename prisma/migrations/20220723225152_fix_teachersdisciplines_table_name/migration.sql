/*
  Warnings:

  - You are about to drop the column `teachersDisciplineId` on the `tests` table. All the data in the column will be lost.
  - Added the required column `teachersDisciplinesId` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_teachersDisciplineId_fkey";

-- AlterTable
ALTER TABLE "tests" DROP COLUMN "teachersDisciplineId",
ADD COLUMN     "teachersDisciplinesId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_teachersDisciplinesId_fkey" FOREIGN KEY ("teachersDisciplinesId") REFERENCES "teachersDisciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
