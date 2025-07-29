# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React component library and design system called "triphos-shared-ui" built with TypeScript, Vite, and PNPM workspaces. The project is structured as a monorepo with two main packages: a core UI library and a playground for development/testing.

## Architecture

### Monorepo Structure

- `packages/core/` - The main UI component library (`@jigoooo/shared-ui`)
- `packages/playground/` - Development playground for testing components
- Uses PNPM workspaces for dependency management
- Built with Vite for fast development and building

### Core Library Structure (`packages/core/src/`)

- `ui/` - Component implementations organized by category (button, input, table, etc.)
- `theme/` - Theme system with providers and configuration
- `hooks/` - Reusable React hooks (common utilities and style helpers)
- `lib/` - Utility functions (common, formatter, validation)
- `constants/` - Shared constants (colors, z-index values)

### Component Organization Pattern

Each UI component follows a consistent structure:

- `index.ts` - Public exports
- `ui/` - Component implementations
- `model/` - Types, contexts, and hooks specific to the component
- `lib/` - Component-specific utilities (when needed)
- `variant/` - Component variants (when applicable)

## Development Commands

### Root Level Commands

- `pnpm dev` - Start playground development server
- `pnpm dev:lib` - Watch mode for core library development
- `pnpm build` - Build the core library
- `pnpm test` - Run tests across all packages
- `pnpm type-check` - TypeScript checking for all packages
- `pnpm lint` - Lint all packages
- `pnpm lint:fix` - Fix linting issues
- `pnpm storybook` - Start Storybook development server
- `pnpm build-storybook` - Build Storybook for production

### Package-Specific Commands

- `pnpm --filter ./packages/core <command>` - Run command in core package
- `pnpm --filter ./packages/playground <command>` - Run command in playground

### Core Package Scripts

- `pnpm -F core dev` - Watch build for core library
- `pnpm -F core build` - Build core library
- `pnpm -F core type-check` - TypeScript check
- `pnpm -F core lint` - Lint core package
- `pnpm -F core storybook` - Start Storybook

## Key Technologies & Dependencies

### Core Dependencies

- React 19.1.0+ (peer dependency)
- TypeScript 5.8+
- Vite 6.3+ for building
- Framer Motion for animations
- Zustand for state management
- @tanstack/react-table for table components
- @floating-ui/react for floating UI elements
- date-fns for date utilities

### Development Tools

- ESLint with TypeScript support
- Prettier for code formatting
- Husky for git hooks
- lint-staged for pre-commit linting
- Storybook for component documentation
- Vitest for testing

## Theme System

The library includes a comprehensive theme system located in `packages/core/src/theme/`:

- Theme providers for context management
- Configurable theme base with color schemes
- Support for multiple UI library compatibility (Tailwind, Chakra UI, Material UI)

## Component Usage Patterns

- Components use TypeScript strict mode
- Styling props are consistently implemented across components
- Theme-aware components that respect the theme context
- Accessibility considerations built into components
- Responsive design patterns using custom hooks

## Publishing

- Core library is published as `@jigoooo/shared-ui`
- Uses `pnpm publish:core` command
- Automated versioning and publishing workflow
- CSS assets are included in the build output

## Testing

- Uses Vitest for unit testing
- Playwright for browser testing
- Storybook for visual testing and documentation
- Coverage reporting with @vitest/coverage-v8
