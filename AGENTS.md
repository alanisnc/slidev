
# Agent Guide: Slidev

## Project

Slidev is a Markdown-based presentation tool for developers. It uses Markdown parsing, a Vue-based presentation interface, and a Node.js CLI for developing, building, and exporting slides.

This repository contains multiple connected packages and uses pnpm and Turborepo to manage packages and dependencies, and building the packages.

Use Node.js >=22.12.0 and pnpm 12.15.0.

## Architecture
### Key Directories: 
- `packages/slidev/`: CLI and Node.js tooling. The `@slidev/cli` package uses `bin/slidev.mjs` as its executable and `node/cli.ts` as its CLI source entry point.
- `packages/parser/src/`: Parses slide Markdown and configuration.
- `packages/client/`: Vue presentation client, with `main.ts` and `App.vue` as application entry points.
- `packages/types/`: TypeScript types shared and used across packages.
- `packages/create-app/`, `packages/create-theme/`: Project and theme scaffolding.
- `packages/vscode/`: VS Code integration.
- `test/`: Integration tests, fixtures, and snapshots. Some unit tests are colocated with source files.
- `demo/` and `docs/`: Example presentations and documentation.

The CLI is responsible for development and builds, the parser processes slide Markdown, and the Vue client renders the presentation. Internal packages use `workspace:*` and shared dependencies are manged by `pnpm-workspace.yaml`.

## Commands

Run from the repository root unless otherwise noted:

```bash
pnpm install
pnpm build
pnpm dev
pnpm demo:dev
pnpm typecheck
pnpm test
pnpm exec vitest run packages/parser/src/utils.test.ts
pnpm lint
```

For a CLI-only:

```bash
pnpm -C packages/slidev build
```

`pnpm verify` runs build, typecheck, lint, and tests.

## Conventions
- Follow the format of existing TypeScript and Vue and Antfu ESLint configuration.
- For type-only dependencies use import type. For functions and variables use camelCase. Use PascalCase for types and interfaces.
- For formatting, format with two-space indentation, single quotes, and no semicolons.
- Use Vitest with `describe`, `it`, and `expect`. Place focused `*.test.ts` files near related source code; use `test/` for broader integration and fixture-based tests.
- When changing Markdown parsing, reuse existing fixtures in test/fixtures/ and inspect snapshot differences before updating files.

## Guardrails
- ONLY use pnpm, DO NOT use npm or yarn.
- DO NOT edit generated or ignored outputs such as `dist/`, `node_modules/`, `.slidev/`, or `.turbo/`.
- DO NOT automatically fix unrelated files when working on a focused task.
- AVOID unnecessary changes to `pnpm-lock.yaml`, `skills-lock.json`, `patches/`, or pinned overrides in `pnpm-workspace.yaml`.
- The CLI package is `packages/slidev/`
- `pnpm install` runs a `prepare` script that synchronizes skills; ALWAYS inspect any resulting `skills-lock.json` changes before committing them.
