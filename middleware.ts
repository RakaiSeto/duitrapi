import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jwt from '@/utils/Session';
import { JwtPayload } from '@/utils/Session';

const BASE_URL = process.env.BASE_URL;
export async function middleware(request: NextRequest) {
    const isLoginOrRegisterPath = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register');
    const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
    
    const token = request.cookies.get('token')?.value;
    let decoded: JwtPayload | null = null;
    let isAuthenticated = false;
    let isAdmin = false;

    // --- Authentication Check ---
    if (token) {
        try {
            // Check for a valid token and refresh if needed
            // NOTE: Token refresh logic should be handled here
            decoded = await jwt.verifyJwt(token) as unknown as JwtPayload;
            const isTokenValid = decoded && decoded.exp && decoded.exp * 1000 > Date.now();
            
            if (isTokenValid) {
                isAuthenticated = true;
                isAdmin = !!decoded.admin;

                // Token refresh logic: A better approach would be to refresh only when it's nearing expiration,
                // not on every request. This is for demonstration.
                if (decoded.exp && decoded.exp * 1000 - Date.now() < 1000 * 60 * 60) { // 30 minutes from expiration
                    const refreshedToken = await jwt.generateJwt(decoded);
                    request.cookies.set('token', refreshedToken);
                    return NextResponse.next();
                }
            }
        } catch (e) {
            // Token is invalid, let the logic below handle the redirect
            isAuthenticated = false;
        }
    }

    // --- Authorization and Routing Logic ---
    // If not authenticated, redirect to login unless on login/register pages
    if (!isAuthenticated) {
        if (!isLoginOrRegisterPath) {
            return NextResponse.redirect(new URL('/login', BASE_URL));
        }
        return NextResponse.next();
    }

    // If authenticated, redirect away from login/register pages
    if (isLoginOrRegisterPath) {
        return NextResponse.redirect(new URL('/dashboard', BASE_URL));
    }
    
    // If authenticated, check admin status
    if (isAdmin && !isAdminPath) {
        return NextResponse.redirect(new URL('/admin', BASE_URL));
    }

    if (!isAdmin && isAdminPath) {
        return NextResponse.redirect(new URL('/dashboard', BASE_URL));
    }

    // Otherwise, continue to the requested page
    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/register', '/admin/:path*', '/dashboard/:path*'],
};