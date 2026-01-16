import { test, expect } from '@playwright/test';

test.describe('Learn Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/learn');
  });

  test('should display the page title', async ({ page }) => {
    await expect(page.getByText('AI Tutor')).toBeVisible();
  });

  test('should display the page description', async ({ page }) => {
    await expect(page.getByText(/Ask about any topic/)).toBeVisible();
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
    await expect(page.getByText('What do you want to learn?')).toBeVisible();
  });

  test('should have topic input', async ({ page }) => {
    const input = page.getByLabel(/Topic/);
    await expect(input).toBeVisible();
  });

  test('should have question textarea', async ({ page }) => {
    const textarea = page.getByLabel(/Specific Question/);
    await expect(textarea).toBeVisible();
  });

  test('should have subject tabs', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /Reading/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Math/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Science/i })).toBeVisible();
  });

  test('should have level tabs', async ({ page }) => {
    await expect(page.getByRole('tab', { name: /Beginner/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Intermediate/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Advanced/i })).toBeVisible();
  });

  test('should have submit button', async ({ page }) => {
    const button = page.getByRole('button', { name: /Get Explanation/i });
    await expect(button).toBeVisible();
  });

  test('submit button should be disabled when topic is empty', async ({ page }) => {
    const button = page.getByRole('button', { name: /Get Explanation/i });
    await expect(button).toBeDisabled();
  });

  test('submit button should be enabled when topic has value', async ({ page }) => {
    const input = page.getByLabel(/Topic/);
    await input.fill('fractions');
    const button = page.getByRole('button', { name: /Get Explanation/i });
    await expect(button).not.toBeDisabled();
  });

  test('should allow typing in topic', async ({ page }) => {
    const input = page.getByLabel(/Topic/);
    await input.fill('fractions');
    await expect(input).toHaveValue('fractions');
  });

  test('should allow typing in question', async ({ page }) => {
    const textarea = page.getByLabel(/Specific Question/);
    await textarea.fill('How do I add fractions?');
    await expect(textarea).toHaveValue('How do I add fractions?');
  });

  test('should display disclaimer', async ({ page }) => {
    await expect(page.getByText(/This tool provides educational content/)).toBeVisible();
  });

  test('should display empty state message', async ({ page }) => {
    await expect(page.getByText(/Select a subject and topic/)).toBeVisible();
  });
});
