import Jwt from 'jsonwebtoken';
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

export function verifyJwt(token: string): JwtPayload | null {
  try {
    return Jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

export function generateJwt(payload: JwtPayload): string {
  return Jwt.sign(payload, process.env.JWT_SECRET!);
}