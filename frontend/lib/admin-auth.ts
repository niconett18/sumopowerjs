import { NextRequest } from 'next/server';

const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    ?? 'sumopoweradmin123';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'sumopower123';
const ADMIN_TOKEN    = process.env.ADMIN_TOKEN    ?? 'sp-admin-secret-token';

export function checkAdminCookie(req: NextRequest): boolean {
  return req.cookies.get('sp-admin')?.value === 'authenticated';
}

export function checkAdminToken(req: NextRequest): boolean {
  const auth = req.headers.get('Authorization') ?? '';
  return auth === `Bearer ${ADMIN_TOKEN}`;
}

export function isAdmin(req: NextRequest): boolean {
  return checkAdminCookie(req) || checkAdminToken(req);
}

export function validateCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}
