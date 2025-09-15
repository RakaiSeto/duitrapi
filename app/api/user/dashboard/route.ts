import { NextRequest, NextResponse } from 'next/server';
import { JwtPayload } from '@/utils/Session';
import * as jwt from '@/utils/Session';
import * as walletDal from '@/db/dal/wallets';
import type { WalletsWithLatestTransactions } from '@/db/dal/wallets';
import * as transactionDal from '@/db/dal/transactions';

type APIResponse = {
    success: boolean;
    message: string;
    error?: string;
    data?: {
        wallet: WalletsWithLatestTransactions[];
        totalBalance: number;
        monthlyExpenses: number;
        monthlyIncome: number;
        dailyExpenses: number;
        weeklyTransactionCount: number[][];
        weeklyTransactionAmount: number[][];
    };
};

export async function GET(request: NextRequest) {
    try {
        // parse cookie
        const cookie = request.cookies.get('token');
        if (!cookie) {
            return NextResponse.json({ success: false, message: 'Unauthorized' } as APIResponse, { status: 401 });
        }
        const decoded = (await jwt.verifyJwt(cookie.value)) as unknown as JwtPayload;

        const wallet = await walletDal.getWalletsWithLatestTransactions({ userId: decoded.sub });
        const totalBalance = await walletDal.getTotalBalance({ userId: decoded.sub });
        const monthlyExpenses = await transactionDal.getMonthlyExpenses({ userId: decoded.sub });
        const monthlyIncome = await transactionDal.getMonthlyIncome({ userId: decoded.sub });
        const dailyExpenses = await transactionDal.getDailyExpenses({ userId: decoded.sub });
        const weeklyTransactionCount = await transactionDal.getWeeklyTransactionCount({ userId: decoded.sub });
        const weeklyTransactionAmount = await transactionDal.getWeeklyTransactionAmount({ userId: decoded.sub });

        return NextResponse.json({ success: true, message: 'User fetched successfully', data: { wallet, totalBalance, monthlyExpenses, monthlyIncome, dailyExpenses, weeklyTransactionCount, weeklyTransactionAmount } } as APIResponse, {
            status: 200,
        });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to get user', error: error } as APIResponse, { status: 500 });
    }
}
