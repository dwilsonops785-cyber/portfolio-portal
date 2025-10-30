'use client';

import React, { useState } from 'react';

interface ScreenshotGalleryProps {
  screenshots: string[];
  projectTitle: string;
}

export function ScreenshotGallery({ screenshots, projectTitle }: ScreenshotGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = 'unset';
  };

  const navigatePrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const navigateNext = () => {
    if (selectedIndex !== null && selectedIndex < screenshots.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigatePrevious();
      if (e.key === 'ArrowRight') navigateNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, navigatePrevious, navigateNext]);

  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  return (
    <>
      {/* Grid of thumbnails */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {screenshots.map((screenshot, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-accent transition-all group"
          >
            <img
              src={screenshot}
              alt={`${projectTitle} screenshot ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-accent transition-colors z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Previous button */}
          {selectedIndex > 0 && (
            <button
              onClick={navigatePrevious}
              className="absolute left-4 text-white hover:text-accent transition-colors z-10"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Next button */}
          {selectedIndex < screenshots.length - 1 && (
            <button
              onClick={navigateNext}
              className="absolute right-4 text-white hover:text-accent transition-colors z-10"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          {/* Image */}
          <div className="max-w-7xl max-h-[90vh] mx-4">
            <img
              src={screenshots[selectedIndex]}
              alt={`${projectTitle} screenshot ${selectedIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <div className="text-center text-gray-400 mt-4">
              {selectedIndex + 1} / {screenshots.length}
            </div>
          </div>

          {/* Click backdrop to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={closeLightbox}
          />
        </div>
      )}
    </>
  );
}
