import { prisma } from "../config/database.js";

export async function findCategoryById(categoryId: number) {
    const categoryName = await prisma.categories.findUnique({ where: {id: categoryId} });
    return categoryName;
}