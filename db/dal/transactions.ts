import { transactionsTable } from '../models/transactions';
import { GetAllTransactionsFilter } from './filters/transactionFilter';
import db from '../connection';
import { and, ilike, eq, gt, lt } from 'drizzle-orm';

type Transactions = typeof transactionsTable.$inferSelect;

export const create = async (payload: Transactions): Promise<Transactions> => {
    const transaction = await db.insert(transactionsTable).values(payload).returning();
    return transaction[0] as Transactions;
};

export const getAll = async (filter?: GetAllTransactionsFilter): Promise<Transactions[]> => {
    const transactions = await db
        .select()
        .from(transactionsTable)
        .where(
            and(
                ilike(transactionsTable.categoryId, `%${filter?.categoryId ?? ''}%`),
                ilike(transactionsTable.startWallet, `%${filter?.startWalletId ?? ''}%`),
                ilike(transactionsTable.endWallet, `%${filter?.endWalletId ?? ''}%`),
                filter?.startTime ? gt(transactionsTable.transactionDate, filter.startTime) : undefined,
                filter?.endTime ? lt(transactionsTable.transactionDate, filter.endTime) : undefined,
                ilike(transactionsTable.userId, `%${filter?.userId ?? ''}%`)
            ));
    return transactions;
};

export const getById = async (id: string): Promise<Transactions | null> => {
    const transaction = await db.select().from(transactionsTable).where(eq(transactionsTable.transactionId, id));
    if (!transaction) {
        throw new Error('Transaction not found');
    }
    return transaction[0] as Transactions;
};

export const update = async (id: string, payload: Transactions): Promise<Transactions> => {
    const transaction = await db.update(transactionsTable).set(payload).where(eq(transactionsTable.transactionId, id)).returning();
    return transaction[0] as Transactions;
};

export const deleteTransaction = async (id: string): Promise<Transactions> => {
    const transaction = await db.update(transactionsTable).set({ deletedAt: new Date() }).where(eq(transactionsTable.transactionId, id)).returning();
    return transaction[0] as Transactions;
};

export const restoreTransaction = async (id: string): Promise<Transactions> => {
    const transaction = await db.update(transactionsTable).set({ deletedAt: null }).where(eq(transactionsTable.transactionId, id)).returning();
    return transaction[0] as Transactions;
};
