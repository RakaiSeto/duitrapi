import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jwt from '@/utils/Session';
import { JwtPayload } from '@/utils/Session';

export async function middleware(request: NextRequest) {
    // Example: Redirect if the user tries to access a protected route without authentication
    let isAuthenticated = false;
    let isAdmin = false;

    const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
    const isLoginPath = request.nextUrl.pathname.startsWith('/login');
    const isRegisterPath = request.nextUrl.pathname.startsWith('/register');

    const token = request.cookies.get('token')?.value;
    if (!token && !isLoginPath && !isRegisterPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token) {
        // if token is not found, redirect to login
        const decoded = await jwt.verifyJwt(token) as unknown as JwtPayload;
        if (decoded && decoded.exp && decoded.exp > Date.now()) {
            isAuthenticated = true;
        }
        if (decoded && decoded.admin) {
            isAdmin = true;
        }
        if (!isAuthenticated && !isLoginPath) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        decoded.exp = Date.now() + 1000 * 60 * 60 * 24;
        const newToken = await jwt.generateJwt(decoded);
        request.cookies.set('token', newToken);
    }

    if (isAdmin && !isAdminPath) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }
    if (!isAdmin && isAdminPath) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/register', '/admin/:path*', '/dashboard/:path*'], // Apply middleware to these paths
};
