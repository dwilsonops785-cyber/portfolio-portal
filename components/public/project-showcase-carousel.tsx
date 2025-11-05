'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  // Auto-cycle through images every 5 seconds (pause on hover)
  useEffect(() => {
    if (isHovered || showcaseImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseImages.length);
    }, 5000);

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

  // Handle touch events for swipe gestures on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section className="border-b border-gray-800 bg-gradient-to-b from-gray-900/50 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div
          ref={carouselRef}
          className="relative rounded-lg sm:rounded-xl overflow-hidden bg-gray-900/50 border border-gray-800 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Image Container */}
          <Link href={`/projects/${currentImage.projectSlug}`}>
            <div className="relative aspect-[16/9] sm:aspect-[21/9] cursor-pointer overflow-hidden">
              <img
                src={currentImage.url}
                alt={currentImage.projectTitle}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Project Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 line-clamp-2">
                  {currentImage.projectTitle}
                </h3>
                <div className="flex items-center gap-2 text-accent">
                  <span className="text-xs sm:text-sm font-medium">View Project</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300" />
            </div>
          </Link>

          {/* Navigation Arrows - Hidden on mobile, show on desktop */}
          {showcaseImages.length > 1 && (
            <>
              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all z-10 opacity-0 group-hover:opacity-100 items-center justify-center"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={goToNext}
                className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all z-10 opacity-0 group-hover:opacity-100 items-center justify-center"
                aria-label="Next image"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Indicators */}
          {showcaseImages.length > 1 && (
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
              {showcaseImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all ${
                    index === currentIndex
                      ? 'w-6 sm:w-8 bg-accent'
                      : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white/70'
                  } h-1.5 sm:h-2 rounded-full`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        {showcaseImages.length > 1 && (
          <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-400">
            {currentIndex + 1} / {showcaseImages.length}
          </div>
        )}
      </div>
    </section>
  );
}
