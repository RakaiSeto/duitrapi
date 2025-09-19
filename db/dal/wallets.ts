import { walletsTable } from '../models/wallets';
import { transactionsTable } from '../models/transactions';
import { GetAllWalletsFilter } from './filters/walletsFilter';
import db from '../connection';
import { and, ilike, eq, max, sql, or, sum } from 'drizzle-orm';

export type Wallets = typeof walletsTable.$inferSelect;

export type WalletsWithLatestTransactions = Wallets & {
    latestTransactionNominal: number | null;
    latestTransactionDate: Date | null;
};

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

export const getTotalBalance = async (filter?: GetAllWalletsFilter): Promise<number> => {
    const conditions = [];
    if (filter?.userId) {
        conditions.push(ilike(walletsTable.userId, `%${filter.userId}%`));
    }
    const totalBalance = await db.select({ totalBalance: sum(walletsTable.walletBalance) }).from(walletsTable).where(and(...conditions));
    return totalBalance[0].totalBalance ? parseFloat(totalBalance[0].totalBalance) : 0;
};

export const getWalletsWithLatestTransactions = async (
    filter?: GetAllWalletsFilter
): Promise<WalletsWithLatestTransactions[]> => {
    const conditions = [];
    if (filter?.walletName) {
        conditions.push(ilike(walletsTable.walletName, `%${filter.walletName}%`));
    }
    if (filter?.userId) {
        conditions.push(ilike(walletsTable.userId, `%${filter.userId}%`));
    }

    try {
        const latestTransactionCTE = db
            .select({
                walletId: sql<string>`coalesce(${transactionsTable.startWallet}, ${transactionsTable.endWallet})`.as('walletId'),
                latestDate: max(transactionsTable.transactionDate).as('latestDate'),
            })
            .from(transactionsTable)
            .groupBy(sql`coalesce(${transactionsTable.startWallet}, ${transactionsTable.endWallet})`.as('walletId'))
            .as('latest_wallet_tx');

        // Join the wallets table with the CTE and the transactions table
        const result = await db
            .select({
                wallet: walletsTable,
                latestNominal: transactionsTable.total,
                latestDate: transactionsTable.transactionDate,
            })
            .from(walletsTable)
            // Join with the CTE to get the latest date for each wallet
            .leftJoin(latestTransactionCTE, eq(walletsTable.walletId, latestTransactionCTE.walletId))
            // Join with the transactions table to get the actual transaction details
            .leftJoin(
                transactionsTable,
                and(
                    or(
                        eq(transactionsTable.startWallet, walletsTable.walletId),
                        eq(transactionsTable.endWallet, walletsTable.walletId)
                    ),
                    eq(transactionsTable.transactionDate, latestTransactionCTE.latestDate)
                )
            );

        // console.log(JSON.stringify(result, null, 2));

        // Map the result to a cleaner format
        return result.map((row) => ({
            ...row.wallet,
            latestTransactionNominal: row.latestNominal ?? null,
            latestTransactionDate: row.latestDate ?? null,
        }));
    } catch (error) {
        console.error(error);
        throw error;
    }
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
