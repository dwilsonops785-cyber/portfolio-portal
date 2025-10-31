/**
 * Demo Access API endpoint
 * Verifies access code and returns demo credentials
 */

import { NextRequest, NextResponse } from 'next/server';

// Demo credentials stored server-side only
const DEMO_CREDENTIALS: Record<string, { username: string; password: string; accessCode: string }> = {
  'sno911-resource-depletion-monitor': {
    username: 'dwilson',
    password: '$SNO911Resource!',
    accessCode: 'SNO911', // The public-facing access code
  },
  // Add more projects with demo credentials here as needed
};

/**
 * POST /api/demo-access - Verify access code and return credentials
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectSlug, accessCode } = body;

    if (!projectSlug || !accessCode) {
      return NextResponse.json(
        { success: false, message: 'Project slug and access code are required' },
        { status: 400 }
      );
    }

    const demoConfig = DEMO_CREDENTIALS[projectSlug];

    if (!demoConfig) {
      return NextResponse.json(
        { success: false, message: 'No demo credentials configured for this project' },
        { status: 404 }
      );
    }

    // Verify access code (case-sensitive)
    if (accessCode !== demoConfig.accessCode) {
      return NextResponse.json(
        { success: false, message: 'Invalid access code' },
        { status: 401 }
      );
    }

    // Return credentials only if access code is correct
    return NextResponse.json({
      success: true,
      credentials: {
        username: demoConfig.username,
        password: demoConfig.password,
      },
    });
  } catch (error) {
    console.error('Demo access error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
