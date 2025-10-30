/**
 * Project data types for the portfolio portal
 */

export type ProjectStatus = 'concept' | 'development' | 'production';
export type DemoType = 'live' | 'video' | 'none';

export interface ProjectMetrics {
  startDate?: string;
  completionDate?: string;
  developmentHours?: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  status: ProjectStatus;
  labels: string[];
  technologies: string[];

  // Timing metrics
  metrics?: ProjectMetrics;

  // Display content
  thumbnailUrl?: string;
  screenshots?: string[];
  demoUrl?: string;
  demoType?: DemoType;

  // Versioning
  currentVersion?: string;

  // Metadata
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  sortOrder: number;
}

export interface CreateProjectInput {
  title: string;
  shortDescription: string;
  longDescription?: string;
  status: ProjectStatus;
  labels?: string[];
  technologies?: string[];
  metrics?: ProjectMetrics;
  thumbnailUrl?: string;
  screenshots?: string[];
  demoUrl?: string;
  demoType?: DemoType;
  currentVersion?: string;
  featured?: boolean;
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {
  id: string;
}
