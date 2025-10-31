/**
 * Simple authentication utilities
 * For a single admin user with session management
 */

import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'portfolio_admin_session';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Verify admin password
 * In production, use environment variable
 */
export function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || '$$Admin!$@#';
  return password === adminPassword;
}

/**
 * Create a session token
 */
function createSessionToken(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return `${timestamp}-${random}`;
}

/**
 * Set authentication cookie
 */
export async function setAuthCookie(): Promise<void> {
  const sessionToken = createSessionToken();
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000, // Convert to seconds
    path: '/',
  });
}

/**
 * Clear authentication cookie
 */
export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);

  return !!session?.value;
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth(): Promise<void> {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    throw new Error('Authentication required');
  }
}
