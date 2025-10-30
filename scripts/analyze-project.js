#!/usr/bin/env node

/**
 * Portfolio Project Analyzer
 * Automatically analyzes a source directory and generates portfolio project data
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ProjectAnalyzer {
  constructor(sourcePath) {
    this.sourcePath = path.resolve(sourcePath);
    this.projectData = {
      technologies: new Set(),
      fileTypes: {},
      totalFiles: 0,
      totalLines: 0,
    };
  }

  analyze() {
    console.log('🔍 Analyzing project at:', this.sourcePath);
    console.log('');

    if (!fs.existsSync(this.sourcePath)) {
      throw new Error(`Source path does not exist: ${this.sourcePath}`);
    }

    const analysis = {
      path: this.sourcePath,
      name: this.detectProjectName(),
      version: this.detectVersion(),
      description: this.detectDescription(),
      technologies: this.detectTechnologies(),
      structure: this.analyzeStructure(),
      git: this.analyzeGitHistory(),
      readme: this.extractReadme(),
      dependencies: this.extractDependencies(),
      packageInfo: this.readPackageJson(),
    };

    return analysis;
  }

  detectProjectName() {
    console.log('📝 Detecting project name...');

    // Try package.json first
    const packageJson = this.readPackageJson();
    if (packageJson && packageJson.name) {
      console.log('   ✓ Found in package.json:', packageJson.name);
      return packageJson.name;
    }

    // Fall back to folder name
    const folderName = path.basename(this.sourcePath);
    console.log('   ✓ Using folder name:', folderName);
    return folderName;
  }

  detectVersion() {
    console.log('🔢 Detecting version...');

    const packageJson = this.readPackageJson();
    if (packageJson && packageJson.version) {
      console.log('   ✓ Found version:', packageJson.version);
      return packageJson.version;
    }

    console.log('   ⚠ No version found');
    return null;
  }

  detectDescription() {
    console.log('📄 Detecting description...');

    // Try package.json first
    const packageJson = this.readPackageJson();
    if (packageJson && packageJson.description) {
      console.log('   ✓ Found in package.json');
      return packageJson.description;
    }

    // Try README
    const readme = this.extractReadme();
    if (readme) {
      // Extract first paragraph after title
      const lines = readme.split('\n').filter(l => l.trim());
      for (let i = 0; i < Math.min(lines.length, 10); i++) {
        const line = lines[i];
        if (!line.startsWith('#') && line.length > 20) {
          console.log('   ✓ Extracted from README');
          return line.substring(0, 200);
        }
      }
    }

    console.log('   ⚠ No description found');
    return 'No description available';
  }

  detectTechnologies() {
    console.log('🛠️  Detecting technologies...');

    const technologies = new Set();
    const packageJson = this.readPackageJson();

    if (packageJson) {
      // Detect from dependencies
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };

      // Framework detection
      if (allDeps['next']) technologies.add('Next.js');
      if (allDeps['react']) technologies.add('React');
      if (allDeps['vue']) technologies.add('Vue');
      if (allDeps['angular']) technologies.add('Angular');
      if (allDeps['express']) technologies.add('Express');
      if (allDeps['fastify']) technologies.add('Fastify');
      if (allDeps['nestjs']) technologies.add('NestJS');
      if (allDeps['svelte']) technologies.add('Svelte');

      // Language/Build tools
      if (allDeps['typescript']) technologies.add('TypeScript');
      if (allDeps['@types/node']) technologies.add('TypeScript');
      if (allDeps['webpack']) technologies.add('Webpack');
      if (allDeps['vite']) technologies.add('Vite');
      if (allDeps['turbopack']) technologies.add('Turbopack');

      // Styling
      if (allDeps['tailwindcss']) technologies.add('Tailwind CSS');
      if (allDeps['sass']) technologies.add('Sass');
      if (allDeps['styled-components']) technologies.add('Styled Components');

      // State management
      if (allDeps['redux']) technologies.add('Redux');
      if (allDeps['zustand']) technologies.add('Zustand');
      if (allDeps['mobx']) technologies.add('MobX');

      // Database/ORM
      if (allDeps['prisma']) technologies.add('Prisma');
      if (allDeps['mongoose']) technologies.add('Mongoose');
      if (allDeps['sequelize']) technologies.add('Sequelize');
      if (allDeps['typeorm']) technologies.add('TypeORM');

      // AI/ML
      if (allDeps['openai']) technologies.add('OpenAI');
      if (allDeps['@anthropic-ai/sdk']) technologies.add('Claude AI');
      if (allDeps['langchain']) technologies.add('LangChain');

      // APIs/Integration
      if (allDeps['@slack/web-api']) technologies.add('Slack API');
      if (allDeps['@slack/bolt']) technologies.add('Slack Bolt');
      if (allDeps['axios']) technologies.add('Axios');
      if (allDeps['graphql']) technologies.add('GraphQL');

      // Testing
      if (allDeps['jest']) technologies.add('Jest');
      if (allDeps['vitest']) technologies.add('Vitest');
      if (allDeps['cypress']) technologies.add('Cypress');
      if (allDeps['playwright']) technologies.add('Playwright');
    }

    // Detect from file extensions
    const files = this.scanDirectory(this.sourcePath);
    const extensions = new Set(files.map(f => path.extname(f)));

    if (extensions.has('.ts') || extensions.has('.tsx')) {
      technologies.add('TypeScript');
    }
    if (extensions.has('.js') || extensions.has('.jsx')) {
      technologies.add('JavaScript');
    }
    if (extensions.has('.py')) {
      technologies.add('Python');
    }
    if (extensions.has('.go')) {
      technologies.add('Go');
    }
    if (extensions.has('.rs')) {
      technologies.add('Rust');
    }

    // Detect Python frameworks from requirements.txt
    const pythonDeps = this.readPythonRequirements();
    if (pythonDeps.length > 0) {
      if (pythonDeps.some(d => d.includes('pyside6'))) technologies.add('PySide6 (Qt)');
      if (pythonDeps.some(d => d.includes('fastapi'))) technologies.add('FastAPI');
      if (pythonDeps.some(d => d.includes('django'))) technologies.add('Django');
      if (pythonDeps.some(d => d.includes('flask'))) technologies.add('Flask');
      if (pythonDeps.some(d => d.includes('sqlmodel'))) technologies.add('SQLModel');
      if (pythonDeps.some(d => d.includes('sqlalchemy'))) technologies.add('SQLAlchemy');
      if (pythonDeps.some(d => d.includes('uvicorn'))) technologies.add('Uvicorn');
      if (pythonDeps.some(d => d.includes('slack-sdk'))) technologies.add('Slack SDK');
      if (pythonDeps.some(d => d.includes('apscheduler'))) technologies.add('APScheduler');
    }

    const techArray = Array.from(technologies);
    console.log(`   ✓ Detected ${techArray.length} technologies:`, techArray.join(', '));
    return techArray;
  }

  readPythonRequirements() {
    const requirementsPath = path.join(this.sourcePath, 'requirements.txt');

    if (fs.existsSync(requirementsPath)) {
      try {
        const content = fs.readFileSync(requirementsPath, 'utf-8');
        return content.toLowerCase().split('\n').filter(line => line.trim() && !line.startsWith('#'));
      } catch (error) {
        return [];
      }
    }

    return [];
  }

  analyzeStructure() {
    console.log('📁 Analyzing project structure...');

    const structure = {
      totalFiles: 0,
      totalLines: 0,
      fileTypes: {},
      directories: new Set(),
    };

    const files = this.scanDirectory(this.sourcePath);
    structure.totalFiles = files.length;

    for (const file of files) {
      const ext = path.extname(file) || 'no-extension';
      structure.fileTypes[ext] = (structure.fileTypes[ext] || 0) + 1;

      // Count lines
      try {
        const content = fs.readFileSync(file, 'utf-8');
        structure.totalLines += content.split('\n').length;
      } catch (error) {
        // Skip files that can't be read
      }

      // Track directories
      const dir = path.dirname(file).replace(this.sourcePath, '').split(path.sep)[1];
      if (dir) structure.directories.add(dir);
    }

    console.log(`   ✓ Total files: ${structure.totalFiles}`);
    console.log(`   ✓ Total lines: ${structure.totalLines}`);
    console.log(`   ✓ Top directories: ${Array.from(structure.directories).slice(0, 5).join(', ')}`);

    return {
      totalFiles: structure.totalFiles,
      totalLines: structure.totalLines,
      fileTypes: structure.fileTypes,
      directories: Array.from(structure.directories),
    };
  }

  analyzeGitHistory() {
    console.log('📊 Analyzing git history...');

    try {
      // Check if git repo
      const gitDir = path.join(this.sourcePath, '.git');
      if (!fs.existsSync(gitDir)) {
        console.log('   ⚠ Not a git repository');
        return null;
      }

      // Get first commit date
      const firstCommitDate = execSync(
        'git log --reverse --format=%aI | head -1',
        { cwd: this.sourcePath, encoding: 'utf-8' }
      ).trim();

      // Get last commit date
      const lastCommitDate = execSync(
        'git log -1 --format=%aI',
        { cwd: this.sourcePath, encoding: 'utf-8' }
      ).trim();

      // Get commit count
      const commitCount = execSync(
        'git rev-list --count HEAD',
        { cwd: this.sourcePath, encoding: 'utf-8' }
      ).trim();

      // Get contributors
      const contributors = execSync(
        'git log --format=%aN | sort -u',
        { cwd: this.sourcePath, encoding: 'utf-8' }
      ).trim().split('\n').length;

      console.log(`   ✓ First commit: ${firstCommitDate}`);
      console.log(`   ✓ Last commit: ${lastCommitDate}`);
      console.log(`   ✓ Total commits: ${commitCount}`);
      console.log(`   ✓ Contributors: ${contributors}`);

      return {
        firstCommitDate,
        lastCommitDate,
        commitCount: parseInt(commitCount),
        contributors,
      };
    } catch (error) {
      console.log('   ⚠ Error reading git history:', error.message);
      return null;
    }
  }

  extractReadme() {
    console.log('📖 Extracting README...');

    const readmeFiles = ['README.md', 'README.MD', 'readme.md', 'README.txt', 'README'];

    for (const filename of readmeFiles) {
      const readmePath = path.join(this.sourcePath, filename);
      if (fs.existsSync(readmePath)) {
        try {
          const content = fs.readFileSync(readmePath, 'utf-8');
          console.log(`   ✓ Found ${filename} (${content.length} characters)`);
          return content;
        } catch (error) {
          console.log(`   ⚠ Error reading ${filename}`);
        }
      }
    }

    console.log('   ⚠ No README found');
    return null;
  }

  extractDependencies() {
    console.log('📦 Extracting dependencies...');

    const packageJson = this.readPackageJson();
    if (!packageJson) {
      console.log('   ⚠ No package.json found');
      return { dependencies: {}, devDependencies: {} };
    }

    const depCount = Object.keys(packageJson.dependencies || {}).length;
    const devDepCount = Object.keys(packageJson.devDependencies || {}).length;

    console.log(`   ✓ Dependencies: ${depCount}`);
    console.log(`   ✓ Dev dependencies: ${devDepCount}`);

    return {
      dependencies: packageJson.dependencies || {},
      devDependencies: packageJson.devDependencies || {},
    };
  }

  readPackageJson() {
    const packagePath = path.join(this.sourcePath, 'package.json');

    if (fs.existsSync(packagePath)) {
      try {
        return JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
      } catch (error) {
        return null;
      }
    }

    return null;
  }

  scanDirectory(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);

      // Skip node_modules, .git, and other common ignored directories
      if (this.shouldIgnore(file)) {
        continue;
      }

      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        this.scanDirectory(filePath, fileList);
      } else {
        fileList.push(filePath);
      }
    }

    return fileList;
  }

  shouldIgnore(name) {
    const ignored = [
      'node_modules',
      '.git',
      '.next',
      'dist',
      'build',
      '.cache',
      'coverage',
      '.vscode',
      '.idea',
      '__pycache__',
      '.pytest_cache',
      'venv',
      'env',
      '.env',
    ];

    return ignored.includes(name);
  }
}

// Generate portfolio JSON from analysis
function generatePortfolioJSON(analysis, options = {}) {
  console.log('');
  console.log('📝 Generating portfolio JSON...');

  const {
    status = 'production',
    labels = [],
    demoUrl = '',
    demoType = 'none',
    thumbnailUrl = '',
    featured = false,
  } = options;

  // Create a clean title from project name
  const title = analysis.name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Generate long description from README
  let longDescription = '';
  if (analysis.readme) {
    // Extract meaningful content from README
    const lines = analysis.readme.split('\n');
    const contentLines = [];

    for (let line of lines) {
      line = line.trim();
      // Skip title lines and very short lines
      if (line && !line.startsWith('```') && line.length > 20) {
        contentLines.push(line);
        if (contentLines.length >= 10) break; // Limit to first 10 meaningful lines
      }
    }

    longDescription = contentLines.join('\n\n');
  }

  const portfolioProject = {
    title,
    shortDescription: analysis.description || `${title} - A production application`,
    longDescription: longDescription || undefined,
    status,
    labels: [...labels, 'Production'],
    technologies: analysis.technologies,
    metrics: {
      startDate: analysis.git?.firstCommitDate || undefined,
      completionDate: analysis.git?.lastCommitDate || undefined,
    },
    demoUrl: demoUrl || undefined,
    demoType,
    thumbnailUrl: thumbnailUrl || undefined,
    currentVersion: analysis.version || undefined,
    featured,

    // Additional metadata (not part of schema but useful for reference)
    _analysis: {
      totalFiles: analysis.structure.totalFiles,
      totalLines: analysis.structure.totalLines,
      commitCount: analysis.git?.commitCount,
      contributors: analysis.git?.contributors,
      dependencies: Object.keys(analysis.dependencies.dependencies || {}).length,
      devDependencies: Object.keys(analysis.dependencies.devDependencies || {}).length,
    }
  };

  console.log('   ✓ Portfolio JSON generated');
  return portfolioProject;
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node analyze-project.js <source-path> [options]');
    console.log('');
    console.log('Options:');
    console.log('  --status <status>       Project status (concept|development|production)');
    console.log('  --labels <labels>       Comma-separated labels');
    console.log('  --demo-url <url>        Demo URL');
    console.log('  --thumbnail <url>       Thumbnail URL');
    console.log('  --featured              Mark as featured');
    console.log('  --output <file>         Output file path');
    process.exit(1);
  }

  const sourcePath = args[0];
  const options = {
    status: 'production',
    labels: [],
    demoUrl: '',
    demoType: 'none',
    thumbnailUrl: '',
    featured: false,
  };

  // Parse command line options
  for (let i = 1; i < args.length; i++) {
    switch (args[i]) {
      case '--status':
        options.status = args[++i];
        break;
      case '--labels':
        options.labels = args[++i].split(',').map(l => l.trim());
        break;
      case '--demo-url':
        options.demoUrl = args[++i];
        options.demoType = 'live';
        break;
      case '--thumbnail':
        options.thumbnailUrl = args[++i];
        break;
      case '--featured':
        options.featured = true;
        break;
      case '--output':
        options.outputFile = args[++i];
        break;
    }
  }

  try {
    const analyzer = new ProjectAnalyzer(sourcePath);
    const analysis = analyzer.analyze();
    const portfolioJSON = generatePortfolioJSON(analysis, options);

    console.log('');
    console.log('='.repeat(80));
    console.log('📊 ANALYSIS COMPLETE');
    console.log('='.repeat(80));
    console.log('');
    console.log(JSON.stringify(portfolioJSON, null, 2));
    console.log('');

    // Save to file if specified
    if (options.outputFile) {
      fs.writeFileSync(options.outputFile, JSON.stringify(portfolioJSON, null, 2));
      console.log(`✅ Saved to: ${options.outputFile}`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

module.exports = { ProjectAnalyzer, generatePortfolioJSON };
