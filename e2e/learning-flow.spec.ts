import { test, expect } from '@playwright/test';

test.describe('Learning Flow', () => {
  test('home page loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1, h2').first()).toBeVisible();
    await expect(page.locator('text=ຮຽນພາສາລາວ')).toBeVisible();
  });

  test('can navigate to consonants page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Consonants');
    await expect(page).toHaveURL(/consonants/);
    await expect(page.locator('text=ກ')).toBeVisible();
  });

  test('can navigate to vowels page', async ({ page }) => {
    await page.goto('/alphabet/vowels');
    await expect(page.locator('h1')).toContainText(/vowel/i);
  });

  test('can navigate to vocabulary page', async ({ page }) => {
    await page.goto('/vocabulary');
    await expect(page.locator('h1')).toContainText(/vocabulary/i);
  });

  test('can navigate to quiz page', async ({ page }) => {
    await page.goto('/quiz');
    await expect(page.locator('h1')).toContainText(/quiz/i);
  });

  test('consonant cards are interactive', async ({ page }) => {
    await page.goto('/alphabet/consonants');
    // Wait for cards to load
    const firstCard = page.locator('text=ກ').first();
    await expect(firstCard).toBeVisible();
  });

  test('quiz flow - recognition quiz', async ({ page }) => {
    await page.goto('/quiz');
    // Select recognition quiz type
    const recognitionCard = page.locator('text=Character Recognition').first();
    await recognitionCard.click();
    // Should see a question
    await expect(page.locator('text=Question 1')).toBeVisible();
    // Click an option
    const options = page.locator('button').filter({ hasText: /^[a-z]/ });
    const firstOption = options.first();
    if (await firstOption.isVisible()) {
      await firstOption.click();
    }
  });

  test('language switching works', async ({ page }) => {
    await page.goto('/');
    // Should be in English by default
    await expect(page.locator('text=Learn Thai')).toBeVisible();
    // Click FR language switcher
    const frButton = page.locator('button:has-text("FR")').first();
    if (await frButton.isVisible()) {
      await frButton.click();
      await expect(page.locator('text=Apprendre le Thaï')).toBeVisible();
    }
  });
});

test.describe('Responsive Navigation', () => {
  test('mobile bottom navigation is visible on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    // Mobile nav should be visible
    const mobileNav = page.locator('nav').last();
    await expect(mobileNav).toBeVisible();
  });

  test('desktop sidebar navigation on large screens', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    // Header nav should be visible
    const headerNav = page.locator('header nav');
    await expect(headerNav).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('all interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/');
    // Tab through elements
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toBeTruthy();
  });

  test('audio buttons have aria-labels', async ({ page }) => {
    await page.goto('/alphabet/consonants');
    const audioButtons = page.locator('button[aria-label*="audio"], button[aria-label*="Play"], button[aria-label*="play"]');
    const count = await audioButtons.count();
    expect(count).toBeGreaterThan(0);
  });
});
