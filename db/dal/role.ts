import Role from "../models/role"
import { RoleInput, RoleOuput } from "../models/role"

export const create = async (payload: RoleInput): Promise<RoleOuput> => {
    const role = await Role.create(payload);
    return role;
}

export const findAll = async (): Promise<RoleOuput[]> => {
    const roles = await Role.findAll();
    return roles;
}

export const getById = async (id: number): Promise<RoleOuput | null> => {
    const role = await Role.findByPk(id);
    if (!role) {
        throw new Error('Role not found');
    }
    return role;
}