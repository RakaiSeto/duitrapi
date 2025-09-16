import { logToQueue } from "@/utils/Queue";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import * as jwt from '@/utils/Session';

const BASE_URL = process.env.BASE_URL;
export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value;
        if (token) {
            const decoded = await jwt.verifyJwt(token) as unknown as JwtPayload;
            if (decoded && decoded.email) {
                logToQueue(decoded.email, 'AUTH', 'Logout', true, 'User logged out');
            }
        }
        return NextResponse.redirect(new URL('/', BASE_URL), {
            status: 302,
            headers: {
                'Set-Cookie': 'token=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict'
            }
        });
    } catch (error: unknown) {
        console.error('Error logging out:', error);
        return NextResponse.redirect(new URL('/', BASE_URL));
    }
}