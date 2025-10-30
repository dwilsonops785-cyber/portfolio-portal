'use client';

import React from 'react';
import type { ProjectStatus } from '@/lib/types/project';

interface ProjectFilterProps {
  currentStatus: ProjectStatus | 'all';
  onStatusChange: (status: ProjectStatus | 'all') => void;
  counts: {
    all: number;
    concept: number;
    development: number;
    production: number;
  };
}

export function ProjectFilter({ currentStatus, onStatusChange, counts }: ProjectFilterProps) {
  const filters: Array<{ value: ProjectStatus | 'all'; label: string; count: number }> = [
    { value: 'all', label: 'All Projects', count: counts.all },
    { value: 'production', label: 'Production', count: counts.production },
    { value: 'development', label: 'Development', count: counts.development },
    { value: 'concept', label: 'Concept', count: counts.concept },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="font-bold mb-4">Filter Projects</h3>
      <div className="space-y-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onStatusChange(filter.value)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
              currentStatus === filter.value
                ? 'bg-accent text-background font-medium'
                : 'bg-card hover:bg-gray-800 text-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{filter.label}</span>
              <span className="text-sm">{filter.count}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
