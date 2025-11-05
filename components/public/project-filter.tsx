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
  const filters: Array<{ value: ProjectStatus | 'all'; label: string; shortLabel?: string; count: number }> = [
    { value: 'all', label: 'All Projects', shortLabel: 'All', count: counts.all },
    { value: 'production', label: 'Production', count: counts.production },
    { value: 'development', label: 'Development', shortLabel: 'Dev', count: counts.development },
    { value: 'concept', label: 'Concept', count: counts.concept },
  ];

  return (
    <>
      {/* Mobile: Horizontal Scrollable Tabs */}
      <div className="lg:hidden mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onStatusChange(filter.value)}
              className={`flex-shrink-0 px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                currentStatus === filter.value
                  ? 'bg-accent text-black font-medium shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="text-sm">
                {filter.shortLabel || filter.label} ({filter.count})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: Sidebar */}
      <div className="hidden lg:block glass-card p-6 sticky top-20">
        <h3 className="font-bold mb-4 text-lg">Filter Projects</h3>
        <div className="space-y-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onStatusChange(filter.value)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                currentStatus === filter.value
                  ? 'bg-accent text-black font-medium shadow-lg'
                  : 'bg-card hover:bg-gray-800 text-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">{filter.label}</span>
                <span className={`text-sm font-bold ${
                  currentStatus === filter.value ? 'text-black' : 'text-gray-400'
                }`}>
                  {filter.count}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
