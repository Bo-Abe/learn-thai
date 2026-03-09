# Product Backlog

Prioritized using the MoSCoW method:

- **Must Have** — Essential for the current release.
- **Should Have** — Important but not critical; can be deferred briefly.
- **Could Have** — Desirable if time and resources allow.
- **Won't Have (this time)** — Out of scope for now; planned for future releases.

---

## Must Have

| ID   | Feature                            | Description                                                       | User Story |
| ---- | ---------------------------------- | ----------------------------------------------------------------- | ---------- |
| B-01 | Consonant grid with audio          | Display all 33 consonants with pronunciation playback             | US-001     |
| B-02 | Vowel chart with positions         | Show vowels with positional diagrams                              | US-002     |
| B-03 | Tone system overview               | Present six tones with contour visualizations and audio           | US-003     |
| B-04 | Vocabulary browser                 | Browse words by category with translations and audio              | US-004     |
| B-05 | Recognition quiz                   | Multiple-choice quiz on character recognition                     | US-005     |
| B-06 | Listening quiz                     | Audio-based quiz for listening comprehension                      | US-006     |
| B-07 | Progress tracking                  | Dashboard with completion stats, scores, and charts               | US-009     |
| B-08 | EN/FR language switching           | Interface available in English and French                         | US-010     |
| B-09 | Dark/Light theme                   | Theme toggle with system preference detection                     | US-011     |
| B-10 | Responsive design                  | Fully functional from 320px to 2560px                             | --         |
| B-11 | PWA support                        | Installable app with offline caching                              | --         |

## Should Have

| ID   | Feature                            | Description                                                       | User Story |
| ---- | ---------------------------------- | ----------------------------------------------------------------- | ---------- |
| B-12 | Translation quiz                   | Translate between English and Lao                                 | US-007     |
| B-13 | Writing practice canvas            | Draw characters with reference guides                             | US-008     |
| B-14 | Consonant flashcards               | Flip-card drill for consonants                                    | US-012     |
| B-15 | Vocabulary flashcards              | Flip-card drill for vocabulary words                              | US-013     |
| B-16 | Streaks and badges                 | Daily streak counter and milestone badges                         | US-014     |
| B-17 | Reset progress                     | Allow users to clear all data and start over                      | US-015     |
| B-18 | Onboarding tutorial                | First-run walkthrough introducing app features                    | --         |

## Could Have

| ID   | Feature                            | Description                                                       |
| ---- | ---------------------------------- | ----------------------------------------------------------------- |
| B-19 | Spaced repetition algorithm        | Implement SM-2 or similar algorithm for flashcard scheduling      |
| B-20 | Anki export                        | Export flashcard decks to Anki-compatible `.apkg` format          |
| B-21 | Pronunciation scoring              | Use Web Speech API to score user pronunciation attempts           |
| B-22 | Additional languages               | Add Spanish, German, or Thai UI translations                      |
| B-23 | Lesson sequencing                  | Guided lessons with prerequisites (e.g., consonants before tones) |
| B-24 | User accounts / cloud sync         | Optional sign-in to sync progress across devices                  |
| B-25 | Keyboard shortcut overlay          | Show available keyboard shortcuts on `?` press                    |
| B-26 | Print-friendly worksheets          | Generate printable practice sheets for characters                 |
| B-27 | Audio speed control                | Slow / normal / fast playback for pronunciation                   |
| B-28 | A1 / A2 proficiency levels         | Organize content by CEFR-aligned difficulty levels                |

## Won't Have (This Time)

| ID   | Feature                            | Description                                                       |
| ---- | ---------------------------------- | ----------------------------------------------------------------- |
| B-29 | Speech recognition                 | Real-time speech-to-text for Lao pronunciation validation         |
| B-30 | Multiplayer / leaderboard          | Compete with other learners on quiz scores                        |
| B-31 | Teacher / classroom mode           | Instructor dashboard to assign lessons and track student progress |
| B-32 | Native mobile app                  | React Native or Capacitor-based iOS / Android app                 |
| B-33 | AI tutor chatbot                   | Conversational practice with an LLM-powered Lao tutor            |
| B-34 | Video lessons                      | Embedded video content with native speaker explanations           |
| B-35 | Grammar module                     | Dedicated section for Lao sentence structure and grammar rules    |
| B-36 | Community forum                    | User-contributed tips, corrections, and discussions               |
| B-37 | Offline-first database             | IndexedDB-backed storage for full offline functionality           |
