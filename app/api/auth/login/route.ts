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
            logToQueue(request.headers.get('x-forwarded-for') ?? '127.0.0.1', 'AUTH', 'Login', false, 'User not found')
            return NextResponse.json({ success: false, type:'email', message: 'User not found' }, { status: 400 });
        }
    
        const isPasswordValid = bcryptUtil.comparePassword(payload.password, user.password);
        if (!isPasswordValid) {
            logToQueue(user.email, 'AUTH', 'Login', false, 'Invalid password')
            return NextResponse.json({ success: false, type: 'password', message: 'Invalid password' }, { status: 401 });
        }

        user.lastLogin = new Date();
        await userDal.update(user.userId, user);

        let jwtPayload: JwtPayload = {
            sub: user.userId,
            email: user.email,
            fullName: user.fullname,
            admin: user.roleId === 1,
            iat: Date.now(),
            exp: Date.now() + 1000 * 60 * 60 * 24,
        }
        let jwt = await generateJwt(jwtPayload);

        logToQueue(user.email, 'AUTH', 'Login', true, 'Login successful')
        const response = new NextResponse(JSON.stringify({ success: true, message: 'Login successful', token: jwt, admin: user.roleId === 1 }), { status: 200 });
        response.cookies.set('token', jwt);
        return response;
    } catch (error) {
        console.error('Error logging in:', error);
        let errorJson = JSON.stringify(error);
        logToQueue(payload.email ?? '127.0.0.1', 'AUTH', 'Login', false, 'Failed to login: ' + errorJson)
        return NextResponse.json({ success: false, message: 'Failed to login', error: error }, { status: 500 });
    }
}