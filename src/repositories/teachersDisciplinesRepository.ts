import { prisma } from "../config/database.js";

export async function findTeacherDisciplineById(teacherDisciplineId: number) {
    const teacherDiscipline = await prisma.teachersDisciplines.findFirst({ where: {id: teacherDisciplineId} });
    return teacherDiscipline;
}