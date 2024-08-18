import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT username, referral_code, referred_by, points FROM users
    `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
