# {{PROJECT_NAME}} - Agent Context

## Project Overview

{{PROJECT_DESCRIPTION}}

## Build & Development Commands

```bash
# Development
bun run dev              # Run in development mode

# Building
bun run build            # Build to dist/ (ESM + types)
bun run clean            # Remove dist/

# Testing (Bun native test runner)
bun test                 # Run all tests
bun test --watch         # Watch mode

# Type Checking & Linting
bun run typecheck        # TypeScript strict mode check
```

## Code Style Guidelines

### TypeScript
- **Strict mode**: `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes` enabled
- **No `any`**: Use proper types or `unknown` with type guards
- **Explicit returns**: Always define return types on exported functions

### Imports
```typescript
// ESM requires .js extensions
import { foo } from './utils.js';
import type { Bar } from './types.js';

// Node built-ins with node: prefix
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// External packages (no extension)
import { Command } from 'commander';
import * as p from '@clack/prompts';
```

### Import Order
1. Type imports first
2. External dependencies
3. Internal modules from other directories
4. Internal modules from same directory
5. Node.js built-ins with `node:` prefix last

### Naming Conventions
- **Files**: kebab-case (`utils.ts`, `my-module.ts`)
- **Functions**: camelCase (`doSomething`, `getData`)
- **Types/Interfaces**: PascalCase (`MyType`, `Options`)
- **Constants**: UPPER_SNAKE_CASE for true constants (`MAX_RETRIES`)
- **Boolean props**: Prefix with verb (`isEnabled`, `hasData`)

### Error Handling
```typescript
// Always wrap error messages with context
catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(color.red(`Error: ${message}`));
  process.exit(1);
}

// Empty catch blocks only for optional operations
try {
  const data = await readFile(path, 'utf-8');
  return JSON.parse(data);
} catch {
  return defaultValue;
}
```

## Project Structure

```
src/
├── cli.ts           # CLI entry point, argument parsing
├── types.ts         # TypeScript interfaces, types
└── (your modules)

scripts/
└── release.sh       # Version bump and release script
```

## Key Dependencies

- **@clack/prompts**: Interactive TUI prompts
- **commander**: CLI argument parsing
- **picocolors**: Terminal colors
- **fast-glob**: Fast file globbing
- **zod**: Runtime type validation

### Included Libraries

#### psum
Project structure summarizer for generating AI-optimized codebase overviews.

**CLI Usage:**
```bash
# Scan current directory
npx psum .

# Scan specific path with format
npx psum ./src --format json
npx psum ./src --format markdown
npx psum ./src --format ascii
npx psum ./src --format mermaid

# With options
npx psum . --depth 2 --no-tests --cache
```

**Programmatic Usage:**
```typescript
import { scanProject } from 'psum';
import { formatMarkdown } from 'psum/formatters';

const summary = await scanProject('./src', { depth: 3 });
const output = formatMarkdown(summary);
```

#### oh-my-changeloggy
Generate changelogs from git conventional commits.

**CLI Usage:**
```bash
# Generate changelog since last tag
npx changeloggy --since last-tag

# Generate for specific version
npx changeloggy --release v1.0.0 --output CHANGELOG.md

# Include internal commits
npx changeloggy --include-internal

# JSON output
npx changeloggy --format json
```

**In CI/CD (Release workflow):**
The release workflow automatically generates changelogs:
```yaml
- name: Generate Changelog
  run: npx changeloggy --since last-tag --output CHANGELOG.md
```

**Commit Format:**
```
feat(api): add new endpoint
fix(auth): resolve login issue
refactor(core): simplify logic
docs(readme): update instructions
```

## CI/CD

GitHub Actions workflows included:

- **CI** (`.github/workflows/ci.yml`): Runs typecheck, tests, and build on PRs and pushes to main
- **Publish** (`.github/workflows/publish.yml`): Publishes to NPM when version tags are pushed (uses OIDC trusted publishers)
- **Release** (`.github/workflows/release.yml`): Creates GitHub releases with changelogs from tags

### NPM Trusted Publishers Setup

1. Go to https://www.npmjs.com/settings/YOUR_USERNAME/security
2. Enable "Grant access via OIDC tokens"
3. Configure trusted publisher for this package:
   - Provider: GitHub Actions
   - Repository: YOUR_USERNAME/REPO_NAME
   - Workflow: publish.yml

## Releasing

```bash
# Bump version and create tag
bun run release patch
bun run release minor
bun run release major

# Force recreate existing tag
bun run release patch --force
```

The release script will:
1. Bump version in package.json
2. Generate CHANGELOG.md using changeloggy
3. Commit version bump and changelog
4. Create git tag
5. Push to origin

After pushing a tag, GitHub Actions will:
1. Run tests and type checking
2. Build the project
3. Publish to NPM (if configured with trusted publishers)
4. Create a GitHub release with changelog

## Constraints

- **ESM only**: Always use `.js` extensions in imports
- **Bun**: Built for Bun runtime (>=1.0.0)
- **Strict TypeScript**: Zero tolerance for `any` or unchecked nulls
