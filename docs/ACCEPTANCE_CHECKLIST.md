# Acceptance Checklist

Comprehensive functional validation checklist organized by page and feature. Use this during QA and before each release.

---

## Global / Layout

- [ ] Header displays app title and navigation links.
- [ ] Navigation highlights the active page.
- [ ] Footer is visible on all pages.
- [ ] Theme toggle switches between light and dark mode.
- [ ] Language switcher changes all UI text to the selected language.
- [ ] All pages are responsive from 320px to 2560px viewport width.
- [ ] Keyboard navigation (Tab, Shift+Tab, Enter, Escape) works across all interactive elements.
- [ ] Skip-to-content link is present and functional.
- [ ] No horizontal scrollbar appears on any page at any breakpoint.
- [ ] PWA install prompt appears on supported browsers.
- [ ] Service worker caches assets for offline use.

---

## Home Page

- [ ] Hero section displays app name and tagline.
- [ ] Feature cards or navigation tiles link to each learning section.
- [ ] Page loads within 2 seconds on a 3G connection.
- [ ] Meta tags (title, description, Open Graph) are correctly set.
- [ ] Onboarding flow triggers on first visit.

---

## Consonants Page

- [ ] All 33 consonants are displayed in a grid.
- [ ] Each card shows Lao character, transliteration, and consonant class.
- [ ] Clicking a card plays the audio pronunciation.
- [ ] Audio loads and plays without errors.
- [ ] Grid reflows correctly on mobile (2-3 columns) and desktop (4-6 columns).
- [ ] Flashcard mode can be activated.
- [ ] Flashcard flip animation is smooth (60 fps).
- [ ] Flashcard navigation (next, previous, shuffle) works.
- [ ] "Known" / "Needs review" marking persists.

---

## Vowels Page

- [ ] All vowels are listed with short and long forms.
- [ ] Positional information is displayed for each vowel.
- [ ] Audio pronunciation works for each vowel.
- [ ] Visual position diagrams render correctly.
- [ ] Page is accessible with screen readers.

---

## Tones Page

- [ ] All six tones are presented.
- [ ] Tone contour visualizations render correctly.
- [ ] Audio examples play for each tone.
- [ ] Tone rule explanations are clear and accurate.
- [ ] Visualizations have alt text.

---

## Vocabulary Page

- [ ] Categories are listed and selectable.
- [ ] Selecting a category shows the relevant word list.
- [ ] Each word shows Lao script, transliteration, and translation.
- [ ] Audio plays for each vocabulary word.
- [ ] Flashcard mode is available for vocabulary.
- [ ] Search or filter within a category works.

---

## Quiz Page

### Recognition Quiz

- [ ] Quiz presents a Lao character with 4 answer options.
- [ ] Only one answer is correct per question.
- [ ] Selecting an answer shows immediate feedback (color, icon).
- [ ] Score increments correctly.
- [ ] End-of-quiz summary shows total score.
- [ ] Results are saved to progress.

### Listening Quiz

- [ ] Audio plays automatically on question load.
- [ ] Replay button works.
- [ ] 4 visual options are displayed.
- [ ] Feedback is shown after answer selection.
- [ ] Handles audio loading failure gracefully (error message, skip option).

### Translation Quiz

- [ ] Questions alternate between EN-to-Lao and Lao-to-EN.
- [ ] Progress bar updates after each question.
- [ ] Final score screen is displayed.
- [ ] "Try again" and "Back to menu" buttons work.

---

## Writing Page

- [ ] Canvas renders and accepts mouse input.
- [ ] Canvas accepts touch input on mobile devices.
- [ ] Reference character is displayed next to the canvas.
- [ ] Clear button resets the canvas.
- [ ] Stroke guides or animations display when available.
- [ ] Canvas does not interfere with page scrolling on touch devices.

---

## Progress Page

- [ ] Section completion percentages are displayed.
- [ ] Quiz score history is listed with dates.
- [ ] Charts render correctly in both themes.
- [ ] Progress persists after page reload.
- [ ] Empty state is shown for new users with no data.

---

## Settings Page

- [ ] Language switcher is functional.
- [ ] Theme toggle is functional.
- [ ] "Reset Progress" button is present.
- [ ] Confirmation dialog appears before reset.
- [ ] After reset, all progress data is cleared.
- [ ] Success notification appears after reset.

---

## 404 / Not Found Page

- [ ] Displays a friendly error message.
- [ ] Provides a link back to the home page.
- [ ] Correct HTTP status or client-side handling.

---

## Performance

- [ ] Lighthouse Performance score >= 90.
- [ ] Lighthouse Accessibility score >= 90.
- [ ] Lighthouse Best Practices score >= 90.
- [ ] Lighthouse SEO score >= 90.
- [ ] Largest Contentful Paint (LCP) < 2.5s.
- [ ] First Input Delay (FID) < 100ms.
- [ ] Cumulative Layout Shift (CLS) < 0.1.
- [ ] Total bundle size (gzipped) < 500 KB.

---

## Accessibility

- [ ] All images and icons have alt text or aria-label.
- [ ] Form inputs have associated labels.
- [ ] Color contrast ratio meets WCAG AA (4.5:1 for normal text, 3:1 for large text).
- [ ] Focus indicators are visible on all interactive elements.
- [ ] ARIA roles and attributes are used correctly.
- [ ] No accessibility errors reported by axe-core.
- [ ] Screen reader announces page changes on navigation.

---

## Cross-Browser

- [ ] All features work in Chrome (latest).
- [ ] All features work in Firefox (latest).
- [ ] All features work in Safari (latest).
- [ ] All features work in Edge (latest).
- [ ] All features work on iOS Safari (latest).
- [ ] All features work on Chrome for Android (latest).
