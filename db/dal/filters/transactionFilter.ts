export interface GetAllTransactionsFilter {
    startWalletId?: string;
    endWalletId?: string;
    categoryId?: string;
    userId?: string;
    startTime?: Date;
    endTime?: Date;
}