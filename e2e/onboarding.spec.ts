import { test, expect } from '@playwright/test';

test.describe('Onboarding Page', () => {
  test('loads onboarding page', async ({ page }) => {
    await page.goto('/onboarding');
    await expect(page.locator('text=Learn the Thai Alphabet')).toBeVisible();
  });

  test('can navigate through steps', async ({ page }) => {
    await page.goto('/onboarding');
    // Step 1
    await expect(page.locator('text=Learn the Thai Alphabet')).toBeVisible();

    // Click Next
    await page.locator('button:has-text("Next")').click();
    await expect(page.locator('text=Build Your Vocabulary')).toBeVisible();

    // Click Next
    await page.locator('button:has-text("Next")').click();
    await expect(page.locator('text=Master the Tones')).toBeVisible();

    // Click Next
    await page.locator('button:has-text("Next")').click();
    await expect(page.locator('text=Track Your Progress')).toBeVisible();
  });

  test('can go back to previous step', async ({ page }) => {
    await page.goto('/onboarding');
    await page.locator('button:has-text("Next")').click();
    await page.locator('button:has-text("Back")').click();
    await expect(page.locator('text=Learn the Thai Alphabet')).toBeVisible();
  });

  test('can skip tutorial', async ({ page }) => {
    await page.goto('/onboarding');
    await page.locator('text=Skip tutorial').click();
    await expect(page).toHaveURL('/');
  });

  test('Get Started navigates to home on last step', async ({ page }) => {
    await page.goto('/onboarding');
    // Navigate to last step
    for (let i = 0; i < 3; i++) {
      await page.locator('button:has-text("Next")').click();
    }
    await page.locator('button:has-text("Get Started")').click();
    await expect(page).toHaveURL('/');
  });

  test('step indicators update correctly', async ({ page }) => {
    await page.goto('/onboarding');
    // Should have 4 step indicators
    const indicators = page.locator('.rounded-full.h-2');
    await expect(indicators).toHaveCount(4);
  });
});
