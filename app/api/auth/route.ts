/**
 * Authentication API endpoint
 * Handles login and logout
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, setAuthCookie, clearAuthCookie, isAuthenticated } from '@/lib/utils/auth';

/**
 * POST /api/auth - Login
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, action } = body;

    if (action === 'logout') {
      await clearAuthCookie();
      return NextResponse.json({ success: true, message: 'Logged out successfully' });
    }

    if (action === 'login') {
      if (!password) {
        return NextResponse.json(
          { success: false, message: 'Password is required' },
          { status: 400 }
        );
      }

      if (verifyPassword(password)) {
        await setAuthCookie();
        return NextResponse.json({ success: true, message: 'Login successful' });
      } else {
        return NextResponse.json(
          { success: false, message: 'Invalid password' },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { success: false, message: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/auth - Check authentication status
 */
export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    return NextResponse.json({ authenticated });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ authenticated: false });
  }
}
