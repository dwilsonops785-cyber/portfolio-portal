'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Project } from '@/lib/types/project';

interface ProjectShowcaseCarouselProps {
  projects: Project[];
}

interface ShowcaseImage {
  url: string;
  projectSlug: string;
  projectTitle: string;
}

export function ProjectShowcaseCarousel({ projects }: ProjectShowcaseCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Collect all screenshots from all projects
  const showcaseImages: ShowcaseImage[] = projects.flatMap(project => {
    // Get all screenshots, or use thumbnail if no screenshots
    const images = project.screenshots && project.screenshots.length > 0
      ? project.screenshots
      : project.thumbnailUrl
      ? [project.thumbnailUrl]
      : [];

    return images.map(url => ({
      url,
      projectSlug: project.slug,
      projectTitle: project.title
    }));
  });

  // Auto-cycle through images every 4 seconds (pause on hover)
  useEffect(() => {
    if (isHovered || showcaseImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, showcaseImages.length]);

  if (showcaseImages.length === 0) {
    return null;
  }

  const currentImage = showcaseImages[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? showcaseImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % showcaseImages.length);
  };

  return (
    <section className="border-b border-gray-800 bg-gradient-to-b from-gray-900/50 to-transparent">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div
          className="relative rounded-xl overflow-hidden bg-gray-900/50 border border-gray-800"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Image Container */}
          <Link href={`/projects/${currentImage.projectSlug}`}>
            <div className="relative aspect-[21/9] cursor-pointer group">
              <img
                src={currentImage.url}
                alt={currentImage.projectTitle}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Project Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {currentImage.projectTitle}
                </h3>
                <div className="flex items-center gap-2 text-accent">
                  <span className="text-sm">View Project</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300" />
            </div>
          </Link>

          {/* Navigation Arrows */}
          {showcaseImages.length > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10 opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10 opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Indicators */}
          {showcaseImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {showcaseImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-accent'
                      : 'w-2 bg-white/50 hover:bg-white/70'
                  } h-2 rounded-full`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        {showcaseImages.length > 1 && (
          <div className="mt-4 text-center text-sm text-gray-400">
            {currentIndex + 1} / {showcaseImages.length}
          </div>
        )}
      </div>
    </section>
  );
}
