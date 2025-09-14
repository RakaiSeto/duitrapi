import { NextRequest, NextResponse } from 'next/server';
import { JwtPayload } from '@/utils/Session';
import * as jwt from '@/utils/Session';
import * as walletDal from '@/db/dal/wallets';
import type { Wallets } from '@/db/dal/wallets';

type APIResponse = {
    success: boolean;
    message: string;
    error?: string;
    data?: {
        wallet: Wallets[];
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

        const wallet = await walletDal.getAll({ userId: decoded.sub });

        return NextResponse.json({ success: true, message: 'User fetched successfully', data: { wallet } } as APIResponse, {
            status: 200,
        });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to get user', error: error } as APIResponse, { status: 500 });
    }
}
