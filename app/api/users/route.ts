import * as userDal from '@/db/dal/users';
import { GetAllUsersFilter } from '@/db/dal/filters/usersFilter';
import { NextRequest, NextResponse } from 'next/server';
import * as bcryptUtil from '@/utils/Bcrypt';
import { randomAlphanumeric } from '@/utils/Tools';
import { logToQueue } from '@/utils/Queue';
import * as walletDal from '@/db/dal/wallets';

export async function GET(request: NextRequest) {
    try {
        const fullnameQuery = request.nextUrl.searchParams.get("fullname");
        const emailQuery = request.nextUrl.searchParams.get("email");

        const filter: GetAllUsersFilter = {
            fullname: fullnameQuery ?? undefined,
            email: emailQuery ?? undefined,
        };

        const users = await userDal.getAll(filter);
        console.log('Users:', users);
        return NextResponse.json(users);
    } catch (error: unknown) {
        console.error('Error fetching roles:', error);

        let errorMessage = 'An unknown error occurred.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ error: 'Failed to fetch roles : ' + errorMessage }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const payload = await request.json();
    try {
        let hashedPW = bcryptUtil.hashPassword(payload.password);
        console.log(hashedPW)
        console.log(payload.password)

        payload.userId = 'USER-' + randomAlphanumeric(10);

        payload.password = hashedPW;
        console.log(hashedPW)
        payload.roleId = 2;
        const user = await userDal.create(payload);
        logToQueue(payload.email, 'AUTH', 'Register', true, 'User created');
        const _ = await walletDal.create({
            walletId: 'WALLET-' + randomAlphanumeric(10),
            userId: user.userId,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            walletName: 'Cash',
            walletBalance: 0,
        });
        logToQueue(payload.email, 'AUTH', 'Register', true, 'Default wallet Cash created');
        return NextResponse.json(user);
    } catch (error: unknown) {  
        console.error('Error creating user:', error);
        let errorJson = JSON.stringify(error);
        logToQueue(payload.email ?? '127.0.0.1', 'AUTH', 'Register', false, 'Failed to create user: ' + errorJson)
        return NextResponse.json({ success: false, message: 'Failed to create user', error: error }, { status: 500 });
    }
}