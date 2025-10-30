/**
 * Secret pattern detection for the portfolio portal
 * Comprehensive regex patterns to identify various types of credentials
 */

export interface SecretPattern {
  name: string;
  pattern: RegExp;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

export const SECRET_PATTERNS: SecretPattern[] = [
  // API Keys and Tokens
  {
    name: 'API_KEY',
    pattern: /(?:api[_-]?key|apikey|api[_-]?token)[\s]*[=:]["']?([a-zA-Z0-9_\-]{20,})/gi,
    description: 'Generic API key pattern',
    severity: 'high'
  },
  {
    name: 'BEARER_TOKEN',
    pattern: /bearer[\s]+([a-zA-Z0-9_\-\.]+)/gi,
    description: 'Bearer token in authorization header',
    severity: 'high'
  },
  {
    name: 'JWT_TOKEN',
    pattern: /eyJ[a-zA-Z0-9_-]*\.eyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*/g,
    description: 'JSON Web Token (JWT)',
    severity: 'high'
  },

  // OAuth and Authentication
  {
    name: 'OAUTH_TOKEN',
    pattern: /(?:oauth[_-]?token|access[_-]?token|refresh[_-]?token)[\s]*[=:]["']?([a-zA-Z0-9_\-\.]{20,})/gi,
    description: 'OAuth access or refresh token',
    severity: 'high'
  },
  {
    name: 'CLIENT_SECRET',
    pattern: /(?:client[_-]?secret|consumer[_-]?secret)[\s]*[=:]["']?([a-zA-Z0-9_\-]{20,})/gi,
    description: 'OAuth client secret',
    severity: 'high'
  },
  {
    name: 'CLIENT_ID',
    pattern: /(?:client[_-]?id|consumer[_-]?id|app[_-]?id)[\s]*[=:]["']?([a-zA-Z0-9_\-]{20,})/gi,
    description: 'OAuth client ID',
    severity: 'medium'
  },

  // Campaign and Marketing Credentials
  {
    name: 'CAMPAIGN_SECRET',
    pattern: /(?:campaign[_-]?secret|campaign[_-]?token)[\s]*[=:]["']?([a-zA-Z0-9_\-]{20,})/gi,
    description: 'Campaign secret or token',
    severity: 'high'
  },
  {
    name: 'CAMPAIGN_ID',
    pattern: /(?:campaign[_-]?id)[\s]*[=:]["']?([a-zA-Z0-9_\-]{20,})/gi,
    description: 'Campaign identifier',
    severity: 'medium'
  },

  // Cloud Provider Keys
  {
    name: 'AWS_ACCESS_KEY',
    pattern: /(?:AWS|aws)[_-]?(?:ACCESS|access)[_-]?(?:KEY|key)[_-]?(?:ID|id)?[\s]*[=:]["']?(AKIA[0-9A-Z]{16})/gi,
    description: 'AWS Access Key ID',
    severity: 'high'
  },
  {
    name: 'AWS_SECRET_KEY',
    pattern: /(?:AWS|aws)[_-]?(?:SECRET|secret)[_-]?(?:ACCESS|access)?[_-]?(?:KEY|key)[\s]*[=:]["']?([a-zA-Z0-9/+=]{40})/gi,
    description: 'AWS Secret Access Key',
    severity: 'high'
  },
  {
    name: 'AZURE_KEY',
    pattern: /(?:azure|AZURE)[_-]?(?:key|KEY|secret|SECRET)[\s]*[=:]["']?([a-zA-Z0-9/+=]{40,})/gi,
    description: 'Azure access key',
    severity: 'high'
  },
  {
    name: 'GCP_KEY',
    pattern: /(?:gcp|GCP|google)[_-]?(?:key|KEY|api[_-]?key)[\s]*[=:]["']?([a-zA-Z0-9_\-]{30,})/gi,
    description: 'Google Cloud Platform key',
    severity: 'high'
  },

  // Database Credentials
  {
    name: 'DB_CONNECTION_STRING',
    pattern: /(?:mongodb|mysql|postgresql|postgres|mssql):\/\/[^\s"']+:[^\s"']+@[^\s"']+/gi,
    description: 'Database connection string with credentials',
    severity: 'high'
  },
  {
    name: 'DB_PASSWORD',
    pattern: /(?:db[_-]?password|database[_-]?password|db[_-]?pass)[\s]*[=:]["']?([^\s"']{8,})/gi,
    description: 'Database password',
    severity: 'high'
  },

  // Private Keys
  {
    name: 'PRIVATE_KEY',
    pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g,
    description: 'Private key (RSA, EC, or SSH)',
    severity: 'high'
  },
  {
    name: 'SSH_KEY',
    pattern: /ssh-(?:rsa|dss|ed25519) [A-Za-z0-9+/=]+/g,
    description: 'SSH public key (but may indicate private key nearby)',
    severity: 'medium'
  },

  // Webhook URLs
  {
    name: 'WEBHOOK_URL',
    pattern: /https?:\/\/[^\s"']*webhook[^\s"']*\?[^\s"']*(?:token|key|secret)[^\s"']*/gi,
    description: 'Webhook URL with authentication token',
    severity: 'high'
  },

  // Generic Secrets
  {
    name: 'SECRET',
    pattern: /(?:secret|password|passwd|pwd)[\s]*[=:]["']?([a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{12,})/gi,
    description: 'Generic secret or password',
    severity: 'medium'
  },
  {
    name: 'HEX_SECRET',
    pattern: /\b[a-fA-F0-9]{32,}\b/g,
    description: '32+ character hex string (potential secret)',
    severity: 'low'
  },
  {
    name: 'UUID_SECRET',
    pattern: /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/g,
    description: 'UUID format (may be used as secret)',
    severity: 'low'
  },

  // Service-Specific Keys
  {
    name: 'STRIPE_KEY',
    pattern: /(?:sk|pk)_(?:live|test)_[a-zA-Z0-9]{24,}/g,
    description: 'Stripe API key',
    severity: 'high'
  },
  {
    name: 'GITHUB_TOKEN',
    pattern: /gh[pousr]_[a-zA-Z0-9]{36,}/g,
    description: 'GitHub personal access token',
    severity: 'high'
  },
  {
    name: 'SLACK_TOKEN',
    pattern: /xox[baprs]-[a-zA-Z0-9-]+/g,
    description: 'Slack token',
    severity: 'high'
  },
  {
    name: 'SENDGRID_KEY',
    pattern: /SG\.[a-zA-Z0-9_-]{22}\.[a-zA-Z0-9_-]{43}/g,
    description: 'SendGrid API key',
    severity: 'high'
  },
  {
    name: 'TWILIO_KEY',
    pattern: /SK[a-z0-9]{32}/g,
    description: 'Twilio API key',
    severity: 'high'
  },
  {
    name: 'MAILGUN_KEY',
    pattern: /key-[a-zA-Z0-9]{32}/g,
    description: 'Mailgun API key',
    severity: 'high'
  },

  // Base64 Encoded Secrets
  {
    name: 'BASE64_SECRET',
    pattern: /(?:secret|password|key|token)["\s]*[=:]["'\s]*([A-Za-z0-9+/]{40,}={0,2})/gi,
    description: 'Base64 encoded secret',
    severity: 'medium'
  },
];

/**
 * Variable name patterns that suggest sensitive data
 */
export const SENSITIVE_VAR_PATTERNS = [
  /api[_-]?key/i,
  /api[_-]?token/i,
  /access[_-]?token/i,
  /refresh[_-]?token/i,
  /secret/i,
  /password/i,
  /passwd/i,
  /pwd/i,
  /auth[_-]?token/i,
  /bearer[_-]?token/i,
  /client[_-]?secret/i,
  /client[_-]?token/i,
  /campaign[_-]?secret/i,
  /campaign[_-]?token/i,
  /private[_-]?key/i,
  /encryption[_-]?key/i,
  /signing[_-]?key/i,
];
