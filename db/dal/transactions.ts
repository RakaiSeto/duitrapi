import { transactionsTable } from '../models/transactions';
import { GetAllTransactionsFilter } from './filters/transactionFilter';
import db from '../connection';
import { and, ilike, eq, gt, lt, sum, count, sql, gte, lte } from 'drizzle-orm';

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

export const getMonthlyExpenses = async (filter?: GetAllTransactionsFilter): Promise<number> => {
    const conditions = [];
    if (filter?.userId) {
        conditions.push(ilike(transactionsTable.userId, `%${filter.userId}%`));
    }
    const monthlyExpenses = await db.select({ monthlyExpenses: sum(transactionsTable.total) }).from(transactionsTable).where(and(...conditions));
    return monthlyExpenses[0].monthlyExpenses ? parseFloat(monthlyExpenses[0].monthlyExpenses) : 0;
};

export const getMonthlyIncome = async (filter?: GetAllTransactionsFilter): Promise<number> => {
    const conditions = [];
    if (filter?.userId) {
        conditions.push(ilike(transactionsTable.userId, `%${filter.userId}%`));
    }
    const monthlyIncome = await db.select({ monthlyIncome: sum(transactionsTable.total) }).from(transactionsTable).where(and(...conditions));
    return monthlyIncome[0].monthlyIncome ? parseFloat(monthlyIncome[0].monthlyIncome) : 0;
};

export const getDailyExpenses = async (filter?: GetAllTransactionsFilter): Promise<number> => {

    const conditions = [];
    if (filter?.userId) {
        conditions.push(ilike(transactionsTable.userId, `%${filter.userId}%`));
    }
    const dailyExpenses = await db.select({ dailyExpenses: sum(transactionsTable.total) }).from(transactionsTable).where(and(...conditions));
    return dailyExpenses[0].dailyExpenses ? parseFloat(dailyExpenses[0].dailyExpenses) : 0;
};

export const getWeeklyTransactionCount = async (filter?: GetAllTransactionsFilter): Promise<number[][]> => {

    const conditions = [];
    if (filter?.userId) {
        conditions.push(ilike(transactionsTable.userId, `%${filter.userId}%`));
    }

    // get transaction in and transaction out count for each day of the last 7 days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6); // Last 7 days including today
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    conditions.push(gte(transactionsTable.transactionDate, startDate));
    conditions.push(lte(transactionsTable.transactionDate, endDate));

    const transactions = await db
        .select({
            date: sql<string>`DATE(${transactionsTable.transactionDate})`.as('date'),
            type: transactionsTable.iO,
            count: count(transactionsTable.transactionId).as('count')
        })
        .from(transactionsTable)
        .where(and(...conditions))
        .groupBy(sql`DATE(${transactionsTable.transactionDate})`, transactionsTable.iO);

    // Create a map for the last 7 days
    const result: number[][] = [[], []];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        
        const dayTransactions = transactions.filter(t => t.date === dateString);
        const inCount = dayTransactions.find(t => t.type === true)?.count as number || 0;
        const outCount = dayTransactions.find(t => t.type === false)?.count as number || 0;
        
        result[0].push(inCount);
        result[1].push(outCount);
    }

    return result;    
};

export const getWeeklyTransactionAmount = async (filter?: GetAllTransactionsFilter): Promise<number[][]> => {

    const conditions = [];
    if (filter?.userId) {
        conditions.push(ilike(transactionsTable.userId, `%${filter.userId}%`));
    }

    // Get transaction in and transaction out total amount for each day of the last 7 days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6); // Last 7 days including today
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    conditions.push(gte(transactionsTable.transactionDate, startDate));
    conditions.push(lte(transactionsTable.transactionDate, endDate));

    const transactions = await db
        .select({
            date: sql<string>`DATE(${transactionsTable.transactionDate})`.as('date'),
            type: transactionsTable.iO,
            amount: sum(transactionsTable.total).as('amount')
        })
        .from(transactionsTable)
        .where(and(...conditions))
        .groupBy(sql`DATE(${transactionsTable.transactionDate})`, transactionsTable.iO);

    // Create a map for the last 7 days
    const result: number[][] = [[], []];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        
        const dayTransactions = transactions.filter(t => t.date === dateString);
        const inAmount = dayTransactions.find(t => t.type === true)?.amount ? parseFloat(dayTransactions.find(t => t.type === true)!.amount!) : 0;
        const outAmount = dayTransactions.find(t => t.type === false)?.amount ? parseFloat(dayTransactions.find(t => t.type === false)!.amount!) : 0;
        
        result[0].push(inAmount);
        result[1].push(outAmount);
    }

    return result;
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
