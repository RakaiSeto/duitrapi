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
    const conditions = [];
    if (filter?.categoryId) {
        conditions.push(ilike(transactionsTable.categoryId, `%${filter.categoryId}%`));
    }
    if (filter?.startWalletId) {
        conditions.push(ilike(transactionsTable.startWallet, `%${filter.startWalletId}%`));
    }
    if (filter?.endWalletId) {
        conditions.push(ilike(transactionsTable.endWallet, `%${filter.endWalletId}%`));
    }
    if (filter?.startTime) {
        conditions.push(gt(transactionsTable.transactionDate, filter.startTime));
    }
    if (filter?.endTime) {
        conditions.push(lt(transactionsTable.transactionDate, filter.endTime));
    }
    if (filter?.userId) {
        conditions.push(ilike(transactionsTable.userId, `%${filter.userId}%`));
    }

    const transactions = await db
        .select()
        .from(transactionsTable)
        .where(and(...conditions));
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
