/**
 * Project data management utilities
 * Handles CRUD operations with JSON file storage
 */

import fs from 'fs/promises';
import path from 'path';
import type { Project, CreateProjectInput, UpdateProjectInput } from '../types/project';

const DATA_DIR = path.join(process.cwd(), 'data', 'projects');

/**
 * Ensure the data directory exists
 */
async function ensureDataDir(): Promise<void> {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

/**
 * Generate a URL-safe slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generate a unique project ID
 */
function generateProjectId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `proj-${timestamp}-${random}`;
}

/**
 * Get file path for a project
 */
function getProjectFilePath(id: string): string {
  return path.join(DATA_DIR, `${id}.json`);
}

/**
 * Get all projects
 */
export async function getAllProjects(): Promise<Project[]> {
  await ensureDataDir();

  try {
    const files = await fs.readdir(DATA_DIR);
    const projectFiles = files.filter(f => f.endsWith('.json'));

    const projects: Project[] = [];

    for (const file of projectFiles) {
      try {
        const filePath = path.join(DATA_DIR, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const project = JSON.parse(content) as Project;
        projects.push(project);
      } catch (error) {
        console.error(`Error reading project file ${file}:`, error);
      }
    }

    // Sort by sortOrder, then by featured, then by createdAt
    return projects.sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  } catch (error) {
    console.error('Error getting all projects:', error);
    return [];
  }
}

/**
 * Get a single project by ID
 */
export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const filePath = getProjectFilePath(id);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as Project;
  } catch (error) {
    console.error(`Error getting project ${id}:`, error);
    return null;
  }
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find(p => p.slug === slug) || null;
}

/**
 * Create a new project
 */
export async function createProject(input: CreateProjectInput): Promise<Project> {
  await ensureDataDir();

  const id = generateProjectId();
  const slug = generateSlug(input.title);
  const now = new Date().toISOString();

  // Get current max sort order
  const projects = await getAllProjects();
  const maxSortOrder = projects.length > 0 ? Math.max(...projects.map(p => p.sortOrder)) : 0;

  const project: Project = {
    id,
    slug,
    title: input.title,
    shortDescription: input.shortDescription,
    longDescription: input.longDescription,
    status: input.status,
    labels: input.labels || [],
    technologies: input.technologies || [],
    metrics: input.metrics,
    thumbnailUrl: input.thumbnailUrl,
    demoUrl: input.demoUrl,
    demoType: input.demoType || 'none',
    currentVersion: input.currentVersion,
    createdAt: now,
    updatedAt: now,
    featured: input.featured || false,
    sortOrder: maxSortOrder + 1,
  };

  const filePath = getProjectFilePath(id);
  await fs.writeFile(filePath, JSON.stringify(project, null, 2), 'utf-8');

  return project;
}

/**
 * Update an existing project
 */
export async function updateProject(input: UpdateProjectInput): Promise<Project | null> {
  const existing = await getProjectById(input.id);

  if (!existing) {
    return null;
  }

  const updated: Project = {
    ...existing,
    ...input,
    id: existing.id, // Ensure ID doesn't change
    createdAt: existing.createdAt, // Preserve creation date
    updatedAt: new Date().toISOString(),
    // Update slug if title changed
    slug: input.title ? generateSlug(input.title) : existing.slug,
  };

  const filePath = getProjectFilePath(input.id);
  await fs.writeFile(filePath, JSON.stringify(updated, null, 2), 'utf-8');

  return updated;
}

/**
 * Delete a project
 */
export async function deleteProject(id: string): Promise<boolean> {
  try {
    const filePath = getProjectFilePath(id);
    await fs.unlink(filePath);
    return true;
  } catch (error) {
    console.error(`Error deleting project ${id}:`, error);
    return false;
  }
}

/**
 * Get projects by status
 */
export async function getProjectsByStatus(status: Project['status']): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter(p => p.status === status);
}

/**
 * Get featured projects
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter(p => p.featured);
}

/**
 * Search projects
 */
export async function searchProjects(query: string): Promise<Project[]> {
  const projects = await getAllProjects();
  const lowerQuery = query.toLowerCase();

  return projects.filter(p =>
    p.title.toLowerCase().includes(lowerQuery) ||
    p.shortDescription.toLowerCase().includes(lowerQuery) ||
    p.labels.some(l => l.toLowerCase().includes(lowerQuery)) ||
    p.technologies.some(t => t.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get project statistics
 */
export async function getProjectStats() {
  const projects = await getAllProjects();

  return {
    total: projects.length,
    byStatus: {
      concept: projects.filter(p => p.status === 'concept').length,
      development: projects.filter(p => p.status === 'development').length,
      production: projects.filter(p => p.status === 'production').length,
    },
    featured: projects.filter(p => p.featured).length,
  };
}
