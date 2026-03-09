import { test, expect } from '@playwright/test';

test.describe('Flashcards Page', () => {
  test('loads flashcards page', async ({ page }) => {
    await page.goto('/flashcards');
    await expect(page.locator('h1')).toContainText('Flashcards');
  });

  test('shows consonant flashcards by default', async ({ page }) => {
    await page.goto('/flashcards');
    // Should show first consonant
    await expect(page.locator('text=ກ')).toBeVisible();
    // Counter should show position
    await expect(page.locator('text=1 / 33')).toBeVisible();
  });

  test('can navigate between flashcards', async ({ page }) => {
    await page.goto('/flashcards');
    // Click next button
    const nextButton = page.locator('button[aria-label="Next"]');
    await nextButton.click();
    // Counter should update
    await expect(page.locator('text=2 / 33')).toBeVisible();
  });

  test('can switch to vocabulary mode', async ({ page }) => {
    await page.goto('/flashcards');
    const vocabButton = page.locator('button:has-text("Vocabulary")');
    await vocabButton.click();
    // Should show vocabulary word
    await expect(page.locator('text=ສະບາຍດີ')).toBeVisible();
  });

  test('can mark a card as learned', async ({ page }) => {
    await page.goto('/flashcards');
    const markButton = page.locator('button:has-text("Mark learned")');
    await markButton.click();
    // Should advance to next card
    await expect(page.locator('text=2 / 33')).toBeVisible();
  });

  test('flashcard flips on click', async ({ page }) => {
    await page.goto('/flashcards');
    // Front should show "Tap to reveal"
    await expect(page.locator('text=Tap to reveal').first()).toBeVisible();
    // Click the card area to flip
    await page.locator('text=Tap to reveal').first().click();
    // After flip, should show romanization
    await expect(page.locator('text=ko')).toBeVisible();
  });
});

test.describe('Flashcards - Vocabulary Categories', () => {
  test('can filter by category', async ({ page }) => {
    await page.goto('/flashcards');
    // Switch to vocabulary
    await page.locator('button:has-text("Vocabulary")').click();
    // Click a category filter
    const colorsFilter = page.locator('button:has-text("colors")');
    await colorsFilter.click();
    // Should show a color word
    await expect(page.locator('text=ແດງ')).toBeVisible();
  });
});
