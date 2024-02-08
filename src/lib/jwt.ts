import secrets from '@/utils/secrets';
import { SignJWT, jwtVerify } from 'jose';
import { nanoid } from 'nanoid'
import { NextRequest, NextResponse } from 'next/server';

const SECRET = secrets.JWT_SECRET!;
const MAX_AGE = secrets.JWT_MAX_AGE!;

interface UserJwtPayload {
  user?: any;
  jti: string
  iat: number
}

export class AuthError extends Error { }

/**
 * Verfiy the token
 * @param req NextRequest
 * @returns 
 */
export async function verify(_req: NextRequest, token: string | undefined) {
  if (!token) throw new AuthError('Missing user token')

  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(SECRET) )
    return verified.payload as UserJwtPayload
  } catch (err) {
    throw new AuthError('Your token has expired.')
  }
}

/**
 * Create and sign a new token
 * @param res NextResponse
 * @returns 
 */
export async function sign({ id, username, email } : { id: number, username: string, email: string }) {
  const token = await new SignJWT({ user: { id, username, email } })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}h`)
    .sign(new TextEncoder().encode(SECRET));

  return token;
}

/**
 * Destroy or force expire the token
 * @param res NextResponse
 * @returns 
 */
export function destroy(res: NextResponse) {
  res.cookies.set('auth_session', '', { httpOnly: true, maxAge: 0 });
  res.cookies.set('current_user', '', { httpOnly: true, maxAge: 0 });
  
  return res;
}