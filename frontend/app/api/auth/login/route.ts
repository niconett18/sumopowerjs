import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials } from '../../../../lib/admin-auth';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? 'sp-admin-secret-token';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!validateCredentials(email, password)) {
    return NextResponse.json({ error: 'Email atau password salah.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, token: ADMIN_TOKEN });
  response.cookies.set('sp-admin', 'authenticated', {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return response;
}
