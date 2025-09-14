import { NextRequest, NextResponse } from "next/server";
import * as walletDal from '@/db/dal/wallets';

export async function POST(request: NextRequest) {
    const payload = await request.json();
    const wallet = await walletDal.create(payload);
    return NextResponse.json(wallet);
}