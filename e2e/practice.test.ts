import { test, expect } from '@playwright/test';

test.describe('Practice Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/practice');
  });

  test('should display the page title', async ({ page }) => {
    await expect(page.getByText('Practice Problems')).toBeVisible();
  });

  test('should display the page description', async ({ page }) => {
    await expect(page.getByText(/Generate practice problems/)).toBeVisible();
  });

  test('should have back to home link', async ({ page }) => {
    const link = page.getByRole('link', { name: /Back to Home/i });
    await expect(link).toBeVisible();
  });

  test('should navigate back to home when clicking back link', async ({ page }) => {
    await page.getByRole('link', { name: /Back to Home/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('should display the form', async ({ page }) => {
    await expect(page.getByText('Generate Practice Problems')).toBeVisible();
  });

  test('should have topic input', async ({ page }) => {
    const input = page.getByLabel(/Topic/);
    await expect(input).toBeVisible();
  });

  test('should have subject tabs', async ({ page }) => {
    await expect(page.locator('[role="tab"]').filter({ hasText: /Reading|Math|Science/i }).first()).toBeVisible();
  });

  test('should have difficulty tabs', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /Easy/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Medium/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Hard/i })).toBeVisible();
  });

  test('should have submit button', async ({ page }) => {
    const button = page.getByRole('button', { name: /Generate Problems/i });
    await expect(button).toBeVisible();
  });

  test('submit button should be disabled when topic is empty', async ({ page }) => {
    const button = page.getByRole('button', { name: /Generate Problems/i });
    await expect(button).toBeDisabled();
  });

  test('submit button should be enabled when topic has value', async ({ page }) => {
    const input = page.getByLabel(/Topic/);
    await input.fill('multiplication');
    const button = page.getByRole('button', { name: /Generate Problems/i });
    await expect(button).not.toBeDisabled();
  });

  test('should allow typing in topic', async ({ page }) => {
    const input = page.getByLabel(/Topic/);
    await input.fill('multiplication');
    await expect(input).toHaveValue('multiplication');
  });

  test('should display disclaimer', async ({ page }) => {
    await expect(page.getByText(/These practice problems are for educational purposes/)).toBeVisible();
  });

  test('should display empty state message', async ({ page }) => {
    await expect(page.getByText(/Select a subject and topic to generate/)).toBeVisible();
  });
});
