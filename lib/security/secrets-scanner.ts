/**
 * Comprehensive Secrets Scanner
 * Detects and redacts various types of credentials and sensitive information
 */

import { SECRET_PATTERNS, SENSITIVE_VAR_PATTERNS, type SecretPattern } from './patterns';

export interface ScanResult {
  hasSecrets: boolean;
  findings: SecretFinding[];
  redactedContent: string;
  severity: 'high' | 'medium' | 'low' | 'none';
}

export interface SecretFinding {
  type: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  lineNumber?: number;
  context?: string;
  redactedValue: string;
}

/**
 * Scans content for secrets and returns detailed findings
 */
export function scanForSecrets(content: string): ScanResult {
  const findings: SecretFinding[] = [];
  let redactedContent = content;
  const lines = content.split('\n');

  // Scan with each pattern
  for (const pattern of SECRET_PATTERNS) {
    const matches = findMatches(content, pattern);

    for (const match of matches) {
      // Find line number
      const lineNumber = findLineNumber(content, match.index);
      const contextLine = lines[lineNumber - 1] || '';

      // Create finding
      findings.push({
        type: pattern.name,
        description: pattern.description,
        severity: pattern.severity,
        lineNumber,
        context: contextLine.trim().substring(0, 100),
        redactedValue: `[REDACTED_${pattern.name}]`
      });

      // Redact the secret
      redactedContent = redactedContent.replace(match.value, `[REDACTED_${pattern.name}]`);
    }
  }

  // Additional check for suspicious variable names
  const suspiciousVars = findSuspiciousVariables(content);
  for (const suspiciousVar of suspiciousVars) {
    // Only add if not already found by other patterns
    if (!findings.some(f => f.lineNumber === suspiciousVar.lineNumber)) {
      findings.push(suspiciousVar);

      // Redact the value if it looks like a secret
      if (suspiciousVar.context) {
        const valueMatch = suspiciousVar.context.match(/["']([^"']+)["']/);
        if (valueMatch && valueMatch[1].length > 10) {
          redactedContent = redactedContent.replace(valueMatch[1], `[REDACTED_${suspiciousVar.type}]`);
        }
      }
    }
  }

  // Determine overall severity
  const severity = findings.length === 0 ? 'none' :
    findings.some(f => f.severity === 'high') ? 'high' :
    findings.some(f => f.severity === 'medium') ? 'medium' : 'low';

  return {
    hasSecrets: findings.length > 0,
    findings: sortFindings(findings),
    redactedContent,
    severity
  };
}

/**
 * Quick check if content contains potential secrets
 */
export function containsSecrets(content: string): boolean {
  for (const pattern of SECRET_PATTERNS) {
    if (pattern.pattern.test(content)) {
      // Reset regex lastIndex to ensure clean state
      pattern.pattern.lastIndex = 0;
      return true;
    }
  }
  return false;
}

/**
 * Redact secrets from content without detailed analysis
 */
export function redactSecrets(content: string): string {
  let redacted = content;

  for (const pattern of SECRET_PATTERNS) {
    // Reset regex lastIndex
    pattern.pattern.lastIndex = 0;
    redacted = redacted.replace(pattern.pattern, `[REDACTED_${pattern.name}]`);
  }

  return redacted;
}

/**
 * Validate content before saving - throws error if secrets found
 */
export function validateNoSecrets(content: string): void {
  const result = scanForSecrets(content);

  if (result.hasSecrets) {
    const highSeverityCount = result.findings.filter(f => f.severity === 'high').length;

    throw new Error(
      `Found ${result.findings.length} potential secret(s) in content ` +
      `(${highSeverityCount} high severity). Please remove sensitive information before saving.`
    );
  }
}

/**
 * Find all matches for a pattern with their positions
 */
function findMatches(content: string, pattern: SecretPattern): Array<{ value: string; index: number }> {
  const matches: Array<{ value: string; index: number }> = [];

  // Reset regex lastIndex
  pattern.pattern.lastIndex = 0;

  let match;
  while ((match = pattern.pattern.exec(content)) !== null) {
    matches.push({
      value: match[0],
      index: match.index
    });

    // Prevent infinite loops on zero-width matches
    if (match.index === pattern.pattern.lastIndex) {
      pattern.pattern.lastIndex++;
    }
  }

  // Reset regex lastIndex after search
  pattern.pattern.lastIndex = 0;

  return matches;
}

/**
 * Find line number for a given character index
 */
function findLineNumber(content: string, index: number): number {
  const upToIndex = content.substring(0, index);
  return upToIndex.split('\n').length;
}

/**
 * Find suspicious variable names that might contain secrets
 */
function findSuspiciousVariables(content: string): SecretFinding[] {
  const findings: SecretFinding[] = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    for (const varPattern of SENSITIVE_VAR_PATTERNS) {
      if (varPattern.test(line)) {
        // Check if line contains an assignment with a value
        const assignmentMatch = line.match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*[=:]\s*["']([^"']{8,})["']/);

        if (assignmentMatch) {
          const varName = assignmentMatch[1];
          const value = assignmentMatch[2];

          // Skip if it's obviously not a secret (common test values, placeholders)
          if (isLikelyPlaceholder(value)) {
            continue;
          }

          findings.push({
            type: 'SUSPICIOUS_VARIABLE',
            description: `Variable name suggests sensitive data: ${varName}`,
            severity: 'medium',
            lineNumber: index + 1,
            context: line.trim().substring(0, 100),
            redactedValue: '[REDACTED_VALUE]'
          });
        }
      }
    }
  });

  return findings;
}

/**
 * Check if a value is likely a placeholder rather than a real secret
 */
function isLikelyPlaceholder(value: string): boolean {
  const placeholders = [
    'your_api_key_here',
    'your-api-key',
    'xxx',
    'yyy',
    'zzz',
    'example',
    'test',
    'demo',
    'placeholder',
    'changeme',
    'your_',
    'my_',
    'sample',
    '123456',
    'password',
    'secret',
  ];

  const lowerValue = value.toLowerCase();
  return placeholders.some(placeholder => lowerValue.includes(placeholder));
}

/**
 * Sort findings by severity and line number
 */
function sortFindings(findings: SecretFinding[]): SecretFinding[] {
  const severityOrder = { high: 0, medium: 1, low: 2 };

  return findings.sort((a, b) => {
    // First sort by severity
    const severityDiff = severityOrder[a.severity] - severityOrder[b.severity];
    if (severityDiff !== 0) return severityDiff;

    // Then by line number
    return (a.lineNumber || 0) - (b.lineNumber || 0);
  });
}

/**
 * Get a summary of findings for display
 */
export function getFindingsSummary(findings: SecretFinding[]): string {
  if (findings.length === 0) {
    return 'No secrets detected';
  }

  const high = findings.filter(f => f.severity === 'high').length;
  const medium = findings.filter(f => f.severity === 'medium').length;
  const low = findings.filter(f => f.severity === 'low').length;

  const parts: string[] = [];
  if (high > 0) parts.push(`${high} high`);
  if (medium > 0) parts.push(`${medium} medium`);
  if (low > 0) parts.push(`${low} low`);

  return `Found ${findings.length} potential secret(s): ${parts.join(', ')}`;
}
