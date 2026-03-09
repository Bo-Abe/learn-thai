# User Stories

All user stories follow the format:

> **As a** [role], **I want to** [goal], **so that** [benefit].

Each story includes acceptance criteria as a checklist.

---

## US-001: View Consonants Grid with Audio

**As a** learner, **I want to** view all Lao consonants in a grid and hear their pronunciation, **so that** I can learn the Lao alphabet visually and aurally.

### Acceptance Criteria

- [ ] All 33 Lao consonants are displayed in a responsive grid.
- [ ] Each consonant card shows the Lao character, its romanized transliteration, and its class (high / middle / low).
- [ ] Clicking or tapping a consonant card plays the corresponding audio pronunciation.
- [ ] Audio plays without noticeable delay (< 300 ms).
- [ ] The grid is navigable via keyboard (arrow keys, Enter to play audio).
- [ ] Cards display correctly on mobile (minimum 2 columns) and desktop (up to 6 columns).

---

## US-002: View Vowels with Positions

**As a** learner, **I want to** view Lao vowels with their positional forms, **so that** I understand how vowels are placed relative to consonants.

### Acceptance Criteria

- [ ] All Lao vowels are listed with their short and long forms.
- [ ] Each vowel entry shows its position relative to a consonant (above, below, before, after, around).
- [ ] A visual diagram or example illustrates the vowel position.
- [ ] Audio pronunciation is available for each vowel.
- [ ] The page is responsive and accessible.

---

## US-003: Learn Tones with Visualizations

**As a** learner, **I want to** learn the Lao tonal system through visual tone contour diagrams, **so that** I can understand and reproduce the six tones.

### Acceptance Criteria

- [ ] All six Lao tones are presented with names and descriptions.
- [ ] A tone contour visualization (pitch diagram) is shown for each tone.
- [ ] Audio examples are provided for each tone.
- [ ] Tone rules based on consonant class and vowel length are explained.
- [ ] The page is accessible with alt text for all visualizations.

---

## US-004: Browse Vocabulary by Category

**As a** learner, **I want to** browse vocabulary organized by category (greetings, numbers, food, etc.), **so that** I can learn practical words in context.

### Acceptance Criteria

- [ ] At least 5 vocabulary categories are available.
- [ ] Each category displays a list of words with Lao script, transliteration, and English translation.
- [ ] Audio pronunciation is available for each word.
- [ ] The user can filter or search within a category.
- [ ] The vocabulary page loads within 2 seconds.

---

## US-005: Take Recognition Quiz

**As a** learner, **I want to** take a quiz that shows a Lao character and asks me to pick the correct transliteration, **so that** I can test my alphabet recognition.

### Acceptance Criteria

- [ ] The quiz presents one Lao character at a time with 4 multiple-choice options.
- [ ] Only one option is correct; the other 3 are plausible distractors.
- [ ] Immediate feedback is given (correct/incorrect) after each answer.
- [ ] A score summary is shown at the end of the quiz.
- [ ] The quiz can be restarted or the user can return to the menu.
- [ ] Results are saved to the user's progress.

---

## US-006: Take Listening Quiz

**As a** learner, **I want to** hear a Lao sound and identify the correct character or word, **so that** I can improve my listening comprehension.

### Acceptance Criteria

- [ ] An audio clip plays automatically when a question is presented.
- [ ] The user can replay the audio.
- [ ] Four visual answer options are displayed.
- [ ] Correct/incorrect feedback is shown after selection.
- [ ] Score is tracked and saved to progress.
- [ ] The quiz gracefully handles audio loading failures.

---

## US-007: Take Translation Quiz

**As a** learner, **I want to** translate words between English and Lao, **so that** I can reinforce my vocabulary knowledge.

### Acceptance Criteria

- [ ] Questions alternate between English-to-Lao and Lao-to-English directions.
- [ ] Four multiple-choice options are presented per question.
- [ ] Immediate feedback with the correct answer is shown.
- [ ] A progress bar indicates how many questions remain.
- [ ] Final score and summary are displayed at quiz completion.

---

## US-008: Practice Writing Characters

**As a** learner, **I want to** practice writing Lao characters on a canvas, **so that** I can develop muscle memory for handwriting.

### Acceptance Criteria

- [ ] A drawing canvas is provided with touch and mouse support.
- [ ] A reference character is shown alongside the canvas.
- [ ] The user can clear the canvas and retry.
- [ ] Stroke guides or animations are available for at least the basic consonants.
- [ ] The canvas works on both desktop (mouse) and mobile (touch).

---

## US-009: Track Learning Progress

**As a** learner, **I want to** see my overall learning progress, quiz scores, and history, **so that** I can stay motivated and identify weak areas.

### Acceptance Criteria

- [ ] A progress dashboard shows completion percentage for each section (consonants, vowels, tones, vocabulary).
- [ ] Quiz score history is displayed with dates.
- [ ] Charts or graphs visualize progress over time.
- [ ] Progress data persists across browser sessions (localStorage).
- [ ] The dashboard is responsive and loads within 2 seconds.

---

## US-010: Switch Language (EN/FR)

**As a** user, **I want to** switch the interface language between English and French, **so that** I can use the app in my preferred language.

### Acceptance Criteria

- [ ] A language switcher is accessible from the Settings page or header.
- [ ] Switching language immediately updates all UI text without a page reload.
- [ ] The selected language persists across sessions.
- [ ] All pages and components are fully translated in both languages.
- [ ] The language switcher is keyboard-accessible.

---

## US-011: Toggle Dark/Light Theme

**As a** user, **I want to** toggle between dark and light themes, **so that** I can use the app comfortably in different lighting conditions.

### Acceptance Criteria

- [ ] A theme toggle is accessible from the Settings page or header.
- [ ] The theme switches immediately without a page reload.
- [ ] The selected theme persists across sessions.
- [ ] All pages, components, and charts respect the active theme.
- [ ] The default theme follows the user's system preference.
- [ ] Color contrast meets WCAG AA standards in both themes.

---

## US-012: Flashcard Mode for Consonants

**As a** learner, **I want to** study consonants in a flashcard mode with flip animations, **so that** I can drill individual characters efficiently.

### Acceptance Criteria

- [ ] Flashcards show the Lao character on the front and transliteration + class on the back.
- [ ] Cards flip with a smooth animation on click/tap.
- [ ] The user can navigate between cards (next / previous / shuffle).
- [ ] Audio plays when the front of the card is shown.
- [ ] The user can mark a card as "known" or "needs review."

---

## US-013: Flashcard Mode for Vocabulary

**As a** learner, **I want to** study vocabulary in flashcard mode, **so that** I can memorize words through spaced repetition.

### Acceptance Criteria

- [ ] Flashcards show Lao word on the front and English translation on the back.
- [ ] Cards can be filtered by vocabulary category.
- [ ] Flip animation and navigation controls match the consonant flashcard experience.
- [ ] Audio pronunciation is available on each card.
- [ ] Cards can be marked as "known" or "needs review."

---

## US-014: View Learning Streak and Badges

**As a** learner, **I want to** see my daily learning streak and earned badges, **so that** I am motivated to practice regularly.

### Acceptance Criteria

- [ ] A streak counter shows the number of consecutive days the user has practiced.
- [ ] Badges are awarded for milestones (e.g., first quiz, 7-day streak, all consonants learned).
- [ ] Badges are displayed with icons and descriptions.
- [ ] The streak resets if the user misses a day.
- [ ] Streak and badge data persist in localStorage.

---

## US-015: Reset Progress

**As a** user, **I want to** reset all my learning progress, **so that** I can start fresh if needed.

### Acceptance Criteria

- [ ] A "Reset Progress" button is available in Settings.
- [ ] A confirmation dialog warns the user before resetting.
- [ ] Resetting clears all quiz scores, streak data, badge data, and completion status.
- [ ] After reset, the app behaves as if it is a first-time visit.
- [ ] The reset action is logged or acknowledged with a success message.
