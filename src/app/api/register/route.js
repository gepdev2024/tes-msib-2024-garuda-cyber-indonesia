import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, password, referralCode } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
    }

    const { rows: existingUser } = await sql`
      SELECT username FROM users WHERE username = ${username}
    `;

    if (existingUser.length > 0) {
      return NextResponse.json({ error: 'Username already exists.' }, { status: 400 });
    }

    const userReferralCode = `REF-${Math.floor(Math.random() * 1000000)}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    let referredBy = null;

    if (referralCode) {
      const { rows: existingReferral } = await sql`
        SELECT referral_code FROM users WHERE referral_code = ${referralCode}
      `;
      
      if (existingReferral.length > 0) {
        referredBy = referralCode;

        await sql`
          UPDATE users
          SET points = points + 50
          WHERE referral_code = ${referralCode}
        `;

      } else {
        return NextResponse.json({ error: 'Referral code does not exist.' }, { status: 400 });
      }
    }

    await sql`
      INSERT INTO users (username, password, referral_code, referred_by)
      VALUES (${username}, ${hashedPassword}, ${userReferralCode}, ${referredBy})
    `;

    if (referredBy) {
      await sql`
        UPDATE users
        SET points = points + 50
        WHERE username = ${username}
      `;
    }

    return NextResponse.json({ message: 'User registered successfully.', referralCode: userReferralCode });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
