import { categoriesTable } from '../models/categories';
import { GetAllCategoriesFilter } from './filters/categoriesFilter';
import db from '../connection';
import { and, ilike, eq } from 'drizzle-orm';

type Categories = typeof categoriesTable.$inferSelect;

export const create = async (payload: Categories): Promise<Categories> => {
    const category = await db.insert(categoriesTable).values(payload).returning();
    return category[0] as Categories;
};

export const getAll = async (filter?: GetAllCategoriesFilter): Promise<Categories[]> => {
    const conditions = [];
    if (filter?.categoryName) {
        conditions.push(ilike(categoriesTable.categoryName, `%${filter.categoryName}%`));
    }
    if (filter?.userId) {
        conditions.push(ilike(categoriesTable.userId, `%${filter.userId}%`));
    }

    const categories = await db
        .select()
        .from(categoriesTable)
        .where(and(...conditions));
    return categories;
};

export const getById = async (id: string): Promise<Categories | null> => {
    const category = await db.select().from(categoriesTable).where(eq(categoriesTable.categoryId, id));
    if (!category) {
        throw new Error('Category not found');
    }
    return category[0] as Categories;
};

export const update = async (id: string, payload: Categories): Promise<Categories> => {
    const category = await db.update(categoriesTable).set(payload).where(eq(categoriesTable.categoryId, id)).returning();
    return category[0] as Categories;
};

export const deleteCategory = async (id: string): Promise<Categories> => {
    const category = await db.update(categoriesTable).set({ deletedAt: new Date() }).where(eq(categoriesTable.categoryId, id)).returning();
    return category[0] as Categories;
};

export const restoreCategory = async (id: string): Promise<Categories> => {
    const category = await db.update(categoriesTable).set({ deletedAt: null }).where(eq(categoriesTable.categoryId, id)).returning();
    return category[0] as Categories;
};
