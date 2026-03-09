import { test, expect } from '@playwright/test';

test.describe('Progress Page', () => {
  test('loads progress page', async ({ page }) => {
    await page.goto('/progress');
    await expect(page.locator('h1')).toContainText(/progress/i);
  });

  test('shows overview stats', async ({ page }) => {
    await page.goto('/progress');
    await expect(page.locator('text=0/33')).toBeVisible();
    await expect(page.locator('text=0/27')).toBeVisible();
  });

  test('shows streak section', async ({ page }) => {
    await page.goto('/progress');
    await expect(page.locator('text=Learning Streak')).toBeVisible();
  });

  test('shows badges section', async ({ page }) => {
    await page.goto('/progress');
    await expect(page.locator('text=Badges')).toBeVisible();
    // All badges should be locked initially
    await expect(page.locator('text=Keep learning to unlock!')).toBeVisible();
  });

  test('shows difficult characters section', async ({ page }) => {
    await page.goto('/progress');
    await expect(page.locator('text=Characters to Review')).toBeVisible();
    // No data initially
    await expect(page.locator('text=Complete some quizzes')).toBeVisible();
  });
});
