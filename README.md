# เรียนภาษาไทย — Learn Thai

An interactive web application for learning the Thai language, featuring alphabet lessons, vocabulary drills, quizzes, writing practice, and progress tracking — all wrapped in a modern, accessible UI.

## Quick Start

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

### Installation

```bash
git clone <repo-url> learn-thai
cd learn-thai
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
learn-thai/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images, audio, fonts
│   ├── components/
│   │   ├── layout/          # Header, Footer, navigation shells
│   │   ├── shared/          # Reusable components (cards, modals)
│   │   └── ui/              # Primitive UI elements (buttons, inputs)
│   ├── context/             # React context providers (theme, progress)
│   ├── data/                # Static data (consonants, vowels, vocab JSON)
│   ├── features/
│   │   ├── alphabet/        # Consonant & vowel grid, flashcards
│   │   ├── onboarding/      # First-run tutorial flow
│   │   ├── progress/        # Stats, streaks, badges
│   │   ├── quiz/            # Recognition, listening, translation quizzes
│   │   ├── vocabulary/      # Category browser, flashcards
│   │   └── writing/         # Character writing practice canvas
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities, helpers, audio manager
│   ├── locales/
│   │   ├── en/              # English translations (default)
│   │   └── fr/              # French translations
│   ├── pages/               # Route-level page components
│   ├── styles/              # Global & Tailwind styles
│   ├── tests/               # Unit & integration tests
│   └── types/               # TypeScript type definitions
├── docs/                    # Project documentation
├── index.html               # HTML entry point
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## Available Scripts

| Script             | Command                  | Description                                |
| ------------------ | ------------------------ | ------------------------------------------ |
| `dev`              | `npm run dev`            | Start Vite dev server with HMR             |
| `build`            | `npm run build`          | Type-check and build for production        |
| `preview`          | `npm run preview`        | Preview the production build locally       |
| `test`             | `npm run test`           | Run unit tests once with Vitest            |
| `test:watch`       | `npm run test:watch`     | Run unit tests in watch mode               |
| `test:coverage`    | `npm run test:coverage`  | Run tests with coverage report             |
| `test:e2e`         | `npm run test:e2e`       | Run end-to-end tests with Playwright       |
| `lint`             | `npm run lint`           | Lint source files with ESLint              |
| `format`           | `npm run format`         | Format source files with Prettier          |

## Tech Stack

| Layer          | Technology                              |
| -------------- | --------------------------------------- |
| UI Framework   | React 19, TypeScript                    |
| Build Tool     | Vite 7                                  |
| Styling        | Tailwind CSS 4                          |
| Animations     | Framer Motion                           |
| Routing        | React Router 6                          |
| i18n           | react-i18next, i18next                  |
| Audio          | Howler.js                               |
| Charts         | Recharts                                |
| SEO            | react-helmet-async                      |
| Icons          | Lucide React                            |
| Testing        | Vitest, Testing Library, Playwright     |
| PWA            | vite-plugin-pwa, Workbox                |

## Internationalization (i18n)

- **Default language:** English (`en`)
- **Available:** French (`fr`)
- Language is auto-detected via `i18next-browser-languagedetector` and can be switched in Settings.
- Translation files live in `src/locales/<lang>/`.

## SEO & Accessibility

- **Lighthouse target:** 90+ across all categories (Performance, Accessibility, Best Practices, SEO).
- **WCAG AA** compliance: proper color contrast, focus management, ARIA attributes, keyboard navigation.
- Semantic HTML and meta tags managed via `react-helmet-async`.

## PWA Support

The app is installable as a Progressive Web App. Service worker registration and caching are handled by `vite-plugin-pwa` and Workbox. Offline access is supported for previously loaded content.

## Contributing

See the [`docs/`](./docs/) directory for detailed documentation:

- [User Stories](./docs/USER_STORIES.md)
- [Acceptance Checklist](./docs/ACCEPTANCE_CHECKLIST.md)
- [Backlog](./docs/BACKLOG.md)
- [Test Plan](./docs/TEST_PLAN.md)
- [Bug Report Template](./docs/BUG_TEMPLATE.md)
- [Browser Compatibility Matrix](./docs/BROWSER_MATRIX.md)

### Development Workflow

1. Create a feature branch from `main`.
2. Implement changes with tests.
3. Run `npm run lint && npm run test` before committing.
4. Open a pull request referencing the relevant user story (e.g., `US-003`).

## License

[MIT](./LICENSE)
