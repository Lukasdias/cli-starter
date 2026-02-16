# {{PROJECT_NAME}}

{{PROJECT_DESCRIPTION}}

## Installation

```bash
bun install
```

## Development

```bash
# Run in development mode
bun run dev

# Type check
bun run typecheck

# Run tests
bun test
```

## Building

```bash
bun run build
```

## Usage

```bash
# Interactive mode
{{CLI_NAME}} --interactive

# Default mode
{{CLI_NAME}}
```

## Included Libraries

This CLI template comes pre-configured with:

- **psum** (^0.5.1): Generate structured codebase summaries
  - `npx psum .` - Scan current directory
  - `npx psum ./src --format json` - Output as JSON
  - `npx psum . --depth 2 --no-tests` - Customize scan depth

- **oh-my-changeloggy** (^1.2.9): Generate changelogs from git conventional commits
  - `npx changeloggy --since last-tag` - Generate since last tag
  - `npx changeloggy --release v1.0.0` - Generate for specific version
  - Uses conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`

## CI/CD

This template includes GitHub Actions workflows:

- **CI**: Runs typecheck, tests, and build on every PR/push
- **Publish**: Publishes to NPM when version tags are pushed (uses OIDC trusted publishers)
- **Release**: Creates GitHub releases with auto-generated changelogs

### NPM Trusted Publishers Setup

Before the publish workflow works:

1. Go to npm → Access → Grant access via OIDC tokens
2. Link your GitHub repository as a trusted publisher
3. Push a version tag: `bun run release patch`

## Releasing

```bash
# Bump version and create tag
bun run release patch  # or minor, major

# GitHub Actions will automatically:
# 1. Run tests and type check
# 2. Build the project
# 3. Publish to NPM (if trusted publishers configured)
# 4. Create a GitHub release with changelog
```

## License

MIT
