'use client';

import React from 'react';
import type { SecretFinding } from '@/lib/security/secrets-scanner';

interface SecretsValidatorProps {
  findings: SecretFinding[];
  severity: 'high' | 'medium' | 'low' | 'none';
}

export function SecretsValidator({ findings, severity }: SecretsValidatorProps) {
  if (findings.length === 0) {
    return (
      <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-success font-medium">No secrets detected</span>
        </div>
      </div>
    );
  }

  const severityColors = {
    high: 'error',
    medium: 'warning',
    low: 'accent',
    none: 'success',
  };

  const color = severityColors[severity];

  return (
    <div className={`bg-${color}/10 border border-${color}/20 rounded-lg p-4 mb-4`}>
      <div className="flex items-center gap-2 mb-3">
        <svg className={`w-5 h-5 text-${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span className={`text-${color} font-medium`}>
          {findings.length} potential secret{findings.length !== 1 ? 's' : ''} detected ({severity} severity)
        </span>
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {findings.map((finding, index) => (
          <div key={index} className="bg-background/50 rounded p-3 text-sm">
            <div className="flex items-start justify-between mb-1">
              <span className="font-medium text-gray-300">{finding.type}</span>
              <span className={`text-xs px-2 py-0.5 rounded bg-${color}/20 text-${color}`}>
                {finding.severity}
              </span>
            </div>
            <p className="text-gray-400 text-xs mb-1">{finding.description}</p>
            {finding.context && (
              <code className="block text-xs text-gray-500 bg-background/80 p-2 rounded mt-2 overflow-x-auto">
                {finding.context}
              </code>
            )}
            {finding.lineNumber && (
              <p className="text-xs text-gray-600 mt-1">Line {finding.lineNumber}</p>
            )}
          </div>
        ))}
      </div>

      <p className={`text-${color} text-sm mt-3`}>
        Please remove all sensitive information before saving.
      </p>
    </div>
  );
}
