import { NextRequest, NextResponse } from "next/server";
import * as userDal from '@/db/dal/users';
import * as bcryptUtil from '@/utils/Bcrypt';
import { generateJwt, JwtPayload } from "@/utils/Session";
import { logToQueue } from "@/utils/Queue";

export async function POST(request: NextRequest) {
    const payload = await request.json();
    try {
        const user = await userDal.getByEmail(payload.email);
        if (!user) {
            logToQueue('127.0.0.1', 'AUTH', 'Login', false, 'User not found')
            return NextResponse.json({ success: false, type:'email', message: 'User not found' }, { status: 400 });
        }
        console.log(user.password)
        console.log(payload.password)
        console.log(bcryptUtil.hashPassword(payload.password))
    
        const isPasswordValid = await bcryptUtil.comparePassword(payload.password, user.password);
        if (!isPasswordValid) {
            logToQueue(user.email, 'AUTH', 'Login', false, 'Invalid password')
            return NextResponse.json({ success: false, type: 'password', message: 'Invalid password' }, { status: 401 });
        }
        let jwtPayload: JwtPayload = {
            sub: user.userId,
            email: user.email,
            admin: user.roleId === 1,
            iat: Date.now(),
            exp: Date.now() + 1000 * 60 * 60 * 24,
        }
        let jwt = generateJwt(jwtPayload);

        logToQueue(user.email, 'AUTH', 'Login', true, 'Login successful')
        return NextResponse.json({ success: true, message: 'Login successful', token: jwt }, { status: 200 });
    } catch (error) {
        console.error('Error logging in:', error);
        let errorJson = JSON.stringify(error);
        logToQueue(payload.email ?? '127.0.0.1', 'AUTH', 'Login', false, 'Failed to login: ' + errorJson)
        return NextResponse.json({ success: false, message: 'Failed to login', error: error }, { status: 500 });
    }
}