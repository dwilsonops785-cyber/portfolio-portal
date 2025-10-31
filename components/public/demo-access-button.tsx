'use client';

import React, { useState } from 'react';

interface DemoAccessButtonProps {
  demoUrl: string;
  demoType: string;
  projectSlug: string;
}

interface DemoCredentials {
  username: string;
  password: string;
}

// Projects that require demo access codes
const REQUIRES_ACCESS_CODE = ['sno911-resource-depletion-monitor'];

export function DemoAccessButton({ demoUrl, demoType, projectSlug }: DemoAccessButtonProps) {
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState<DemoCredentials | null>(null);

  const requiresAccessCode = REQUIRES_ACCESS_CODE.includes(projectSlug);

  const handleDemoClick = () => {
    if (requiresAccessCode) {
      setShowAccessModal(true);
      setError('');
      setAccessCode('');
    } else {
      window.open(demoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleAccessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError('');

    try {
      const response = await fetch('/api/demo-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectSlug,
          accessCode: accessCode.trim(),
        }),
      });

      const data = await response.json();

      if (data.success && data.credentials) {
        setCredentials(data.credentials);
        setShowAccessModal(false);

        // Show credentials first (blocks until user clicks OK)
        alert(
          `Demo Access Granted!\n\n` +
          `Use these credentials to log in:\n` +
          `Username: ${data.credentials.username}\n` +
          `Password: ${data.credentials.password}\n\n` +
          `Click OK to open the demo in a new tab.\n\n` +
          `Note: These credentials are for demonstration purposes only.`
        );

        // After user clicks OK, open the demo in a new window
        window.open(demoUrl, '_blank', 'noopener,noreferrer');
      } else {
        setError(data.message || 'Invalid access code');
      }
    } catch (err) {
      setError('Failed to verify access code. Please try again.');
      console.error('Demo access error:', err);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleModalClose = () => {
    setShowAccessModal(false);
    setAccessCode('');
    setError('');
  };

  return (
    <>
      <div className="space-y-4">
        <button
          onClick={handleDemoClick}
          className="inline-flex items-center gap-2 btn btn-primary"
        >
          {demoType === 'live' ? 'View Live Demo' : 'Watch Demo'}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>

        {requiresAccessCode && (
          <p className="text-sm text-gray-400">
            🔒 This demo requires an access code. Contact the developer for access.
          </p>
        )}
      </div>

      {/* Access Code Modal */}
      {showAccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl max-w-md w-full p-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Demo Access Required</h3>
              <button
                onClick={handleModalClose}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-gray-300 mb-6">
              Enter the access code to view this demo. If you don't have an access code, please contact the developer.
            </p>

            <form onSubmit={handleAccessSubmit} className="space-y-4">
              <div>
                <label htmlFor="accessCode" className="block text-sm font-medium text-gray-300 mb-2">
                  Access Code
                </label>
                <input
                  type="text"
                  id="accessCode"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Enter access code"
                  required
                  autoFocus
                  disabled={isVerifying}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-900/20 border border-red-500/50 rounded-lg">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  disabled={isVerifying}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-accent hover:bg-accent/80 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isVerifying || !accessCode.trim()}
                >
                  {isVerifying ? 'Verifying...' : 'Access Demo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
