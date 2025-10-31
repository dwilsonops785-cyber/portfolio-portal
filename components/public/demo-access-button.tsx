'use client';

import React, { useState } from 'react';

interface DemoAccessButtonProps {
  demoUrl: string;
  demoType: string;
  projectSlug: string;
}

// Demo credentials configuration
const DEMO_CREDENTIALS: Record<string, { username: string; password: string } | null> = {
  'sno911-resource-depletion-monitor': {
    username: 'dwilson',
    password: '$$Admin!$@#'
  },
  // Add more projects with demo credentials here as needed
};

export function DemoAccessButton({ demoUrl, demoType, projectSlug }: DemoAccessButtonProps) {
  const [showCredentials, setShowCredentials] = useState(false);
  const demoCredentials = DEMO_CREDENTIALS[projectSlug];

  const handleDemoClick = () => {
    window.open(demoUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button
          onClick={handleDemoClick}
          className="inline-flex items-center gap-2 btn btn-primary"
        >
          {demoType === 'live' ? 'View Live Demo' : 'Watch Demo'}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>

        {demoCredentials && (
          <button
            onClick={() => setShowCredentials(!showCredentials)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {showCredentials ? 'Hide' : 'Show'} Demo Credentials
          </button>
        )}
      </div>

      {/* Credentials Panel */}
      {demoCredentials && showCredentials && (
        <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-200 mb-2">Demo Access Credentials</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 w-20">Username:</span>
                  <code className="px-2 py-1 bg-gray-900 border border-gray-700 rounded text-accent font-mono">
                    {demoCredentials.username}
                  </code>
                  <button
                    onClick={() => navigator.clipboard.writeText(demoCredentials.username)}
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                    title="Copy username"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 w-20">Password:</span>
                  <code className="px-2 py-1 bg-gray-900 border border-gray-700 rounded text-accent font-mono">
                    {demoCredentials.password}
                  </code>
                  <button
                    onClick={() => navigator.clipboard.writeText(demoCredentials.password)}
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                    title="Copy password"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                ℹ️ This is a demo environment for portfolio demonstration purposes.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
