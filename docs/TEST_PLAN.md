# Test Plan

## 1. Test Strategy Overview

### Objectives

- Verify that all features meet their acceptance criteria (see `USER_STORIES.md`).
- Catch regressions early through automated unit and integration tests.
- Validate end-to-end user flows across browsers.
- Ensure performance and accessibility standards are met.

### Tools

| Layer             | Tool                                |
| ----------------- | ----------------------------------- |
| Unit tests        | Vitest, Testing Library (React)     |
| Integration tests | Vitest, Testing Library             |
| E2E tests         | Playwright                          |
| Accessibility     | axe-core (via Testing Library), Lighthouse |
| Performance       | Lighthouse CI, Web Vitals           |
| Coverage          | Vitest (`--coverage`)               |

### Coverage Targets

| Metric     | Target |
| ---------- | ------ |
| Statements | >= 80% |
| Branches   | >= 75% |
| Functions  | >= 80% |
| Lines      | >= 80% |

### Test Environments

- **CI:** Node 18+, headless Chromium (Playwright)
- **Local:** Developer machines (macOS, Linux, Windows)
- **Browsers:** Chrome, Firefox, Safari, Edge (latest stable)

---

## 2. Unit Test Cases by Component

### Layout Components

| Test ID | Component      | Scenario                                    | Expected Result                        |
| ------- | -------------- | ------------------------------------------- | -------------------------------------- |
| U-01    | Header         | Renders navigation links                    | All nav links present and correct href |
| U-02    | Header         | Highlights active route                     | Active link has active class/style     |
| U-03    | Footer         | Renders copyright and links                 | Footer text and links visible          |
| U-04    | ThemeToggle    | Toggles dark/light class on document        | `dark` class toggled on `<html>`       |
| U-05    | LanguageSwitcher | Changes i18n language                     | `i18n.language` updates to selected    |

### Alphabet Feature

| Test ID | Component        | Scenario                                  | Expected Result                          |
| ------- | ---------------- | ----------------------------------------- | ---------------------------------------- |
| U-06    | ConsonantGrid    | Renders all 33 consonants                 | 33 card elements in the DOM              |
| U-07    | ConsonantCard    | Displays character, transliteration, class| All three text elements visible          |
| U-08    | ConsonantCard    | Click plays audio                         | Audio play function called with correct file |
| U-09    | VowelList        | Renders all vowels with positions         | Each vowel shows position indicator      |
| U-10    | FlashCard        | Flip animation on click                   | Card flips to reveal back content        |
| U-11    | FlashCard        | Mark as known                             | Card state updates and persists          |

### Tones Feature

| Test ID | Component       | Scenario                                  | Expected Result                        |
| ------- | --------------- | ----------------------------------------- | -------------------------------------- |
| U-12    | ToneChart       | Renders 6 tone contours                   | 6 SVG/canvas visualizations present    |
| U-13    | ToneCard        | Plays tone audio on click                 | Audio function called correctly        |

### Vocabulary Feature

| Test ID | Component          | Scenario                                 | Expected Result                       |
| ------- | ------------------ | ---------------------------------------- | ------------------------------------- |
| U-14    | CategoryList       | Renders all categories                   | All category buttons/links visible    |
| U-15    | WordList           | Displays words for selected category     | Words with Lao, transliteration, EN   |
| U-16    | WordCard           | Plays audio on click                     | Audio play function invoked           |
| U-17    | VocabFlashCard     | Filters by category                      | Only words from selected category     |

### Quiz Feature

| Test ID | Component         | Scenario                                  | Expected Result                       |
| ------- | ----------------- | ----------------------------------------- | ------------------------------------- |
| U-18    | QuizEngine        | Generates questions with 1 correct answer | Exactly 1 correct option per question |
| U-19    | QuizEngine        | Generates 3 plausible distractors         | Distractors differ from correct answer|
| U-20    | QuizQuestion      | Shows feedback on answer selection        | Green for correct, red for incorrect  |
| U-21    | QuizScore         | Calculates and displays final score       | Score = correct / total               |
| U-22    | ListeningQuiz     | Replay button triggers audio              | Audio plays on replay click           |
| U-23    | TranslationQuiz   | Alternates question direction             | Both EN->Lao and Lao->EN appear      |

### Writing Feature

| Test ID | Component       | Scenario                                  | Expected Result                       |
| ------- | --------------- | ----------------------------------------- | ------------------------------------- |
| U-24    | WritingCanvas   | Renders canvas element                    | Canvas element exists in DOM          |
| U-25    | WritingCanvas   | Clear button resets canvas                | Canvas cleared to blank state         |
| U-26    | StrokeGuide     | Renders stroke animation                  | Animation SVG/frames present          |

### Progress Feature

| Test ID | Component         | Scenario                                 | Expected Result                       |
| ------- | ----------------- | ---------------------------------------- | ------------------------------------- |
| U-27    | ProgressDashboard | Renders completion percentages           | Percentages between 0-100%            |
| U-28    | ScoreHistory      | Lists past quiz scores with dates        | Scores and dates visible              |
| U-29    | StreakCounter      | Shows current streak count               | Correct number displayed              |
| U-30    | BadgeList          | Renders earned badges                   | Badge icons and names shown           |
| U-31    | ResetProgress      | Clears all localStorage progress data   | localStorage keys removed             |

### Context / Hooks

| Test ID | Subject            | Scenario                                | Expected Result                        |
| ------- | ------------------ | --------------------------------------- | -------------------------------------- |
| U-32    | useTheme           | Returns current theme and toggle fn     | Theme value and function returned      |
| U-33    | useProgress        | Returns progress data from localStorage | Data matches stored values             |
| U-34    | useAudio           | Plays and stops audio                   | Howler instance methods called         |

---

## 3. Integration Test Cases

| Test ID | Feature             | Scenario                                             | Expected Result                                  |
| ------- | ------------------- | ---------------------------------------------------- | ------------------------------------------------ |
| I-01    | Quiz + Progress     | Completing a quiz saves score to progress            | Score appears in ProgressDashboard               |
| I-02    | Flashcard + Progress| Marking cards as "known" updates completion %        | Progress percentage increases                    |
| I-03    | Settings + Theme    | Changing theme in Settings updates all pages         | Dark class applied globally, persists on reload  |
| I-04    | Settings + i18n     | Changing language updates all visible text            | All rendered text uses new locale                |
| I-05    | Settings + Reset    | Resetting progress clears dashboard and scores       | Dashboard shows 0%, no quiz history              |
| I-06    | Router + 404        | Navigating to unknown route shows NotFoundPage       | 404 page rendered with home link                 |
| I-07    | Onboarding + Home   | First visit triggers onboarding; revisit does not    | Onboarding shown once, flag set in localStorage  |

---

## 4. E2E Test Scenarios (Playwright)

| Test ID | Flow                       | Steps                                                                                                    | Expected Result                            |
| ------- | -------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| E-01    | Learn consonants           | Navigate to Consonants -> click a card -> verify audio plays -> navigate to flashcard mode -> flip card  | Audio plays, card flips, content correct    |
| E-02    | Take recognition quiz      | Navigate to Quiz -> select Recognition -> answer all questions -> view score                             | Score summary displayed, progress updated  |
| E-03    | Take listening quiz        | Navigate to Quiz -> select Listening -> play audio -> select answer -> complete quiz                     | Audio plays, answers register, score shown |
| E-04    | Browse vocabulary          | Navigate to Vocabulary -> select category -> view words -> play audio -> enter flashcard mode            | Words displayed, audio plays, cards work   |
| E-05    | Writing practice           | Navigate to Writing -> select character -> draw on canvas -> clear canvas                                | Canvas accepts input, clears correctly     |
| E-06    | View progress              | Complete a quiz -> navigate to Progress -> verify score listed -> verify chart rendered                  | Score in history, chart visible            |
| E-07    | Switch theme               | Open Settings -> toggle theme -> navigate to another page -> verify theme persists                       | Theme applied globally and persists        |
| E-08    | Switch language             | Open Settings -> change to FR -> verify text changes -> reload -> verify FR persists                    | All text in French after switch and reload |
| E-09    | Reset progress             | Add some progress -> Settings -> Reset -> confirm -> verify progress cleared                             | All progress data removed                  |
| E-10    | Mobile navigation          | Set viewport to 375x812 -> open hamburger menu -> navigate through pages                                | Menu opens, navigation works               |
| E-11    | PWA install                | Load app -> verify service worker registered -> check manifest                                           | SW active, manifest valid                  |
| E-12    | 404 handling               | Navigate to `/nonexistent` -> verify 404 page -> click home link                                        | 404 page shown, home link works            |

---

## 5. Performance Test Criteria

| Metric                       | Target     | Tool              |
| ---------------------------- | ---------- | ----------------- |
| Lighthouse Performance       | >= 90      | Lighthouse CI     |
| Largest Contentful Paint     | < 2.5s     | Web Vitals        |
| First Input Delay            | < 100ms    | Web Vitals        |
| Cumulative Layout Shift      | < 0.1      | Web Vitals        |
| Time to Interactive          | < 3.5s     | Lighthouse        |
| Total Bundle Size (gzip)     | < 500 KB   | Vite build output |
| Audio file load time         | < 1s each  | Network tab       |
| Page transition time         | < 300ms    | Manual / E2E      |

---

## 6. Accessibility Test Criteria

| Check                                | Standard   | Tool                   |
| ------------------------------------ | ---------- | ---------------------- |
| Color contrast ratio (normal text)   | >= 4.5:1   | axe-core, Lighthouse   |
| Color contrast ratio (large text)    | >= 3:1     | axe-core, Lighthouse   |
| All images have alt text             | WCAG 1.1.1 | axe-core               |
| Form inputs have labels              | WCAG 1.3.1 | axe-core               |
| Focus order is logical               | WCAG 2.4.3 | Manual testing         |
| Focus indicators visible             | WCAG 2.4.7 | Manual testing         |
| No keyboard traps                    | WCAG 2.1.2 | Manual testing         |
| Page titles are descriptive          | WCAG 2.4.2 | axe-core               |
| ARIA attributes valid                | WCAG 4.1.2 | axe-core               |
| Screen reader announces route changes| WCAG 4.1.3 | NVDA / VoiceOver       |
| Reduced motion respected             | WCAG 2.3.3 | Manual (`prefers-reduced-motion`) |
| Lighthouse Accessibility score       | >= 90      | Lighthouse             |
