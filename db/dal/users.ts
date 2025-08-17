import { hashPassword } from '@/utils/Bcrypt';
import { usersTable } from '../models/users';
import { GetAllUsersFilter } from './filters/usersFilter';
import db from '../connection';
import { and, ilike, eq } from 'drizzle-orm';

type Users = typeof usersTable.$inferSelect;

export const create = async (payload: Users): Promise<Users> => {
    payload.password = await hashPassword(payload.password);
    const user = await db.insert(usersTable).values(payload).returning();
    return user[0] as Users;
};

export const getAll = async (filter?: GetAllUsersFilter): Promise<Users[]> => {
    const users = await db
        .select()
        .from(usersTable)
        .where(
            and(ilike(usersTable.fullname, `%${filter?.fullname ?? ''}%`), ilike(usersTable.email, `%${filter?.email ?? ''}%`))
        );
    return users;
};

export const getById = async (id: string): Promise<Users | null> => {
    const user = await db.select().from(usersTable).where(eq(usersTable.userId, id));
    if (!user) {
        throw new Error('User not found');
    }
    return user[0] as Users;
};

export const update = async (id: string, payload: Users): Promise<Users> => {
    const user = await db.update(usersTable).set(payload).where(eq(usersTable.userId, id)).returning();
    return user[0] as Users;
};

export const deleteUser = async (id: string): Promise<Users> => {
    const user = await db.update(usersTable).set({ deletedAt: new Date() }).where(eq(usersTable.userId, id)).returning();
    return user[0] as Users;
};

export const restoreUser = async (id: string): Promise<Users> => {
    const user = await db.update(usersTable).set({ deletedAt: null }).where(eq(usersTable.userId, id)).returning();
    return user[0] as Users;
};
