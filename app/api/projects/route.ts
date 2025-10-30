/**
 * Projects API endpoint
 * Handles CRUD operations for projects
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/utils/auth';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '@/lib/utils/projects';
import { scanForSecrets } from '@/lib/security/secrets-scanner';
import type { CreateProjectInput, UpdateProjectInput } from '@/lib/types/project';

/**
 * GET /api/projects - Get all projects
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (id) {
      const project = await getProjectById(id);
      if (!project) {
        return NextResponse.json(
          { success: false, message: 'Project not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, project });
    }

    const projects = await getAllProjects();
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error('Error getting projects:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/projects - Create a new project
 */
export async function POST(request: NextRequest) {
  try {
    // Require authentication
    await requireAuth();

    const body = await request.json();
    const input = body as CreateProjectInput;

    // Validate required fields
    if (!input.title || !input.shortDescription || !input.status) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Scan for secrets in all text fields
    const textContent = [
      input.title,
      input.shortDescription,
      input.longDescription || '',
      input.demoUrl || '',
      JSON.stringify(input.labels || []),
      JSON.stringify(input.technologies || []),
    ].join('\n');

    const scanResult = scanForSecrets(textContent);

    if (scanResult.hasSecrets) {
      return NextResponse.json(
        {
          success: false,
          message: 'Potential secrets detected in project data',
          findings: scanResult.findings,
          severity: scanResult.severity,
        },
        { status: 400 }
      );
    }

    // Create project
    const project = await createProject(input);

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/projects - Update a project
 */
export async function PUT(request: NextRequest) {
  try {
    // Require authentication
    await requireAuth();

    const body = await request.json();
    const input = body as UpdateProjectInput;

    if (!input.id) {
      return NextResponse.json(
        { success: false, message: 'Project ID is required' },
        { status: 400 }
      );
    }

    // Scan for secrets in all text fields
    const textContent = [
      input.title || '',
      input.shortDescription || '',
      input.longDescription || '',
      input.demoUrl || '',
      JSON.stringify(input.labels || []),
      JSON.stringify(input.technologies || []),
    ].join('\n');

    const scanResult = scanForSecrets(textContent);

    if (scanResult.hasSecrets) {
      return NextResponse.json(
        {
          success: false,
          message: 'Potential secrets detected in project data',
          findings: scanResult.findings,
          severity: scanResult.severity,
        },
        { status: 400 }
      );
    }

    // Update project
    const project = await updateProject(input);

    if (!project) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, project });
  } catch (error) {
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    console.error('Error updating project:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/projects - Delete a project
 */
export async function DELETE(request: NextRequest) {
  try {
    // Require authentication
    await requireAuth();

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Project ID is required' },
        { status: 400 }
      );
    }

    const success = await deleteProject(id);

    if (!success) {
      return NextResponse.json(
        { success: false, message: 'Project not found or could not be deleted' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    console.error('Error deleting project:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
