'use client';

import React, { useState } from 'react';
import { ProjectCard } from '@/components/public/project-card';
import { ProjectFilter } from '@/components/public/project-filter';
import type { Project, ProjectStatus } from '@/lib/types/project';

interface ProjectsGalleryProps {
  projects: Project[];
}

export function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');

  const filteredProjects = projects.filter(
    (project) => statusFilter === 'all' || project.status === statusFilter
  );

  const counts = {
    all: projects.length,
    concept: projects.filter(p => p.status === 'concept').length,
    development: projects.filter(p => p.status === 'development').length,
    production: projects.filter(p => p.status === 'production').length,
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Browse Projects</h2>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Filter - Mobile (horizontal) and Desktop (sidebar) */}
        <div className="lg:col-span-1">
          <ProjectFilter
            currentStatus={statusFilter}
            onStatusChange={setStatusFilter}
            counts={counts}
          />
        </div>

        {/* Projects Grid */}
        <div className="lg:col-span-3">
          {filteredProjects.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <div className="text-gray-500 mb-2">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg">No projects found</p>
              <p className="text-gray-500 text-sm mt-2">Try selecting a different filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
