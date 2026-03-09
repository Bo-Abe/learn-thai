# Bug Report Template

Use this template when filing bug reports. Copy the sections below into a new issue.

---

## Title

<!-- A concise, descriptive title. Example: "Audio does not play on ConsonantCard click in Safari" -->

## Description

<!-- A clear summary of the bug. What is broken? -->

## Steps to Reproduce

1. <!-- Step 1: Navigate to ... -->
2. <!-- Step 2: Click on ... -->
3. <!-- Step 3: Observe ... -->

## Expected Behavior

<!-- What should happen when following the steps above. -->

## Actual Behavior

<!-- What actually happens. Include any error messages. -->

## Screenshots / Recordings

<!-- Attach screenshots or screen recordings if applicable. Drag and drop images here. -->

## Environment

| Field            | Value                      |
| ---------------- | -------------------------- |
| **OS**           | <!-- e.g., macOS 14.2 -->  |
| **Browser**      | <!-- e.g., Chrome 120 -->  |
| **Device**       | <!-- e.g., iPhone 15, Desktop --> |
| **Viewport**     | <!-- e.g., 1440x900 -->    |
| **App Version**  | <!-- e.g., commit hash or version --> |
| **Node Version** | <!-- e.g., 18.19.0 -->     |

## Severity

<!-- Select one: -->

- [ ] **Critical** — App crashes, data loss, or security vulnerability.
- [ ] **Major** — Core feature broken, no workaround available.
- [ ] **Moderate** — Feature partially broken, workaround exists.
- [ ] **Minor** — Cosmetic issue or minor inconvenience.
- [ ] **Trivial** — Typo, formatting, or negligible issue.

## Priority

<!-- Select one: -->

- [ ] **P0 — Immediate** — Must be fixed before next deploy.
- [ ] **P1 — High** — Fix in the current sprint.
- [ ] **P2 — Medium** — Fix in the next sprint.
- [ ] **P3 — Low** — Fix when time allows.

## Affected Area

<!-- Check all that apply: -->

- [ ] Consonants page
- [ ] Vowels page
- [ ] Tones page
- [ ] Vocabulary page
- [ ] Quiz (Recognition)
- [ ] Quiz (Listening)
- [ ] Quiz (Translation)
- [ ] Writing practice
- [ ] Progress / Dashboard
- [ ] Settings
- [ ] Navigation / Layout
- [ ] Audio playback
- [ ] PWA / Offline
- [ ] i18n / Translations
- [ ] Theme (dark/light)
- [ ] Performance
- [ ] Accessibility
- [ ] Other: <!-- specify -->

## Possible Cause

<!-- Optional: If you have an idea what might be causing the issue. -->

## Suggested Fix

<!-- Optional: If you have an idea how to fix the issue. -->

## Related Issues / User Stories

<!-- Optional: Link to related issues or user stories. Example: #42, US-006 -->

## Additional Context

<!-- Any other information that might help diagnose the issue (console logs, network errors, localStorage state, etc.) -->

---

### Labels Guide

When creating the issue, apply the following labels as appropriate:

- `bug` — Always apply for bug reports.
- `critical` / `major` / `minor` — Match the severity above.
- `browser:<name>` — If browser-specific (e.g., `browser:safari`).
- `a11y` — If related to accessibility.
- `audio` — If related to audio playback.
- `i18n` — If related to translations.
