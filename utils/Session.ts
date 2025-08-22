import Jwt from 'jsonwebtoken';
import * as Jose from 'jose';
import Cookie  from 'cookie';


export type JwtPayload = {
  sub: string;
  email: string;
  admin: boolean
  iat?: number;
  exp?: number;
};

export function parseAuthCookie(cookieHeader: string | undefined): string | null {
  if (!cookieHeader) return null;
  const cookies = Cookie.parse(cookieHeader);
  return cookies.authToken || null;
}

export async function verifyJwt(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await Jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
    return payload as JwtPayload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

export async function generateJwt(payload: JwtPayload): Promise<string> {
  const t = await new Jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

  return t;
}