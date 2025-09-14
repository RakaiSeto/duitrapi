import { walletsTable } from '../models/wallets';
import { GetAllWalletsFilter } from './filters/walletsFilter';
import db from '../connection';
import { and, ilike, eq } from 'drizzle-orm';

export type Wallets = typeof walletsTable.$inferSelect;

export const create = async (payload: Wallets): Promise<Wallets> => {
    const wallet = await db.insert(walletsTable).values(payload).returning();
    return wallet[0] as Wallets;
};

export const getAll = async (filter?: GetAllWalletsFilter): Promise<Wallets[]> => {
    const conditions = [];

    if (filter?.walletName) {
        conditions.push(ilike(walletsTable.walletName, `%${filter.walletName}%`));
    }

    if (filter?.userId) {
        conditions.push(ilike(walletsTable.userId, `%${filter.userId}%`));
    }

    const wallets = await db
        .select()
        .from(walletsTable)
        .where(and(...conditions));
    return wallets;
};

export const getById = async (id: string): Promise<Wallets | null> => {
    const wallet = await db.select().from(walletsTable).where(eq(walletsTable.walletId, id));
    if (!wallet) {
        throw new Error('Wallet not found');
    }
    return wallet[0] as Wallets;
};

export const update = async (id: string, payload: Wallets): Promise<Wallets> => {
    const wallet = await db.update(walletsTable).set(payload).where(eq(walletsTable.walletId, id)).returning();
    return wallet[0] as Wallets;
};

export const deleteWallet = async (id: string): Promise<Wallets> => {
    const wallet = await db.update(walletsTable).set({ deletedAt: new Date() }).where(eq(walletsTable.walletId, id)).returning();
    return wallet[0] as Wallets;
};

export const restoreWallet = async (id: string): Promise<Wallets> => {
    const wallet = await db.update(walletsTable).set({ deletedAt: null }).where(eq(walletsTable.walletId, id)).returning();
    return wallet[0] as Wallets;
};
