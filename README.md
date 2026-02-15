# sfxdevelops

Personal portfolio website built with Astro, TypeScript, and Tailwind CSS v4.

## Overview

This project presents:

- A homepage with positioning and featured experience
- A full work timeline
- A structured resume page with skills and languages
- A contact page with direct links (email, phone, LinkedIn, GitHub)

Most portfolio content is centralized in `src/data/portfolio.ts`.

## Tech Stack

- Astro 5
- TypeScript
- Tailwind CSS 4
- Netlify adapter (`@astrojs/netlify`)
- Utility tooling: `oxlint` and `oxfmt`

## Routes

- `/` -> landing page
- `/work` -> work history
- `/resume` -> technical profile
- `/contact` -> contact channels

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Install

```sh
pnpm install
```

### Run locally

```sh
pnpm dev
```

App runs at `http://localhost:4321`.

## Scripts

| Command          | Description              |
| :--------------- | :----------------------- |
| `pnpm dev`       | Start local dev server   |
| `pnpm build`     | Build production output  |
| `pnpm preview`   | Preview production build |
| `pnpm lint`      | Run linter (`oxlint`)    |
| `pnpm lint:fix`  | Auto-fix lint issues     |
| `pnpm fmt`       | Format code (`oxfmt`)    |
| `pnpm fmt:check` | Check formatting         |

## Content Updates

Update data in `src/data/portfolio.ts` to change:

- Profile summary and contact info
- Experience and featured roles
- Skill groups and languages
- Education and positioning statements

## Build

```sh
pnpm build
pnpm preview
```
