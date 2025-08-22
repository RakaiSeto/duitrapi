import { rolesTable } from "../models/roles"
import db from "../connection";
import { eq } from "drizzle-orm";

type Roles = typeof rolesTable.$inferSelect;

export interface RoleInput {
    roleId: number;
    roleName: string;
}

export const create = async (payload: RoleInput): Promise<Roles> => {
    const role = await db.insert(rolesTable).values(payload).returning();
    return role[0] as Roles;
}

export const findAll = async (): Promise<Roles[]> => {
    const roles = await db.select().from(rolesTable);
    return roles;
}

export const getById = async (id: number): Promise<Roles | null> => {
    const role = await db.select().from(rolesTable).where(eq(rolesTable.roleId, id));
    if (!role) {
        throw new Error('Role not found');
    }
    return role[0] as Roles;
}