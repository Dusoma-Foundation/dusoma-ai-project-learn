import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main title', async ({ page }) => {
    await expect(page.getByText('Dusoma Educational')).toBeVisible();
  });

  test('should display the subtitle', async ({ page }) => {
    await expect(page.getByText('AI-powered learning for all')).toBeVisible();
  });

  test('should display the Dusoma Foundation quote', async ({ page }) => {
    await expect(page.getByText(/Only Humans can fix broken systems/)).toBeVisible();
  });

  test('should have Start Learning button', async ({ page }) => {
    const button = page.getByRole('link', { name: /Start Learning/i }).first();
    await expect(button).toBeVisible();
  });

  test('should have Practice Problems button', async ({ page }) => {
    const button = page.getByRole('link', { name: /Practice Problems/i }).first();
    await expect(button).toBeVisible();
  });

  test('should navigate to learn page when clicking Start Learning', async ({ page }) => {
    await page.getByRole('link', { name: /Start Learning/i }).first().click();
    await expect(page).toHaveURL('/learn');
  });

  test('should navigate to practice page when clicking Practice Problems', async ({ page }) => {
    await page.getByRole('link', { name: /Practice Problems/i }).first().click();
    await expect(page).toHaveURL('/practice');
  });

  test('should display How it works section', async ({ page }) => {
    await expect(page.getByText('How it works')).toBeVisible();
    await expect(page.getByText('Choose')).toBeVisible();
    await expect(page.getByText('Learn')).toBeVisible();
    await expect(page.getByText('Practice')).toBeVisible();
  });

  test('should display Features section', async ({ page }) => {
    await expect(page.getByText('Features')).toBeVisible();
    await expect(page.getByText('AI Tutoring')).toBeVisible();
    await expect(page.getByText('Free for Everyone')).toBeVisible();
  });

  test('should display Subjects section', async ({ page }) => {
    await expect(page.getByText('Subjects')).toBeVisible();
    await expect(page.getByText('Reading & Writing')).toBeVisible();
    await expect(page.getByText('Mathematics')).toBeVisible();
    await expect(page.getByText('Science')).toBeVisible();
  });

  test('should display Our Mission section', async ({ page }) => {
    await expect(page.getByText('Our Mission')).toBeVisible();
    await expect(page.getByText(/The Dusoma Foundation believes/)).toBeVisible();
  });

  test('should have link to dusoma.org', async ({ page }) => {
    const link = page.getByRole('link', { name: /Dusoma.org/i }).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://dusoma.org');
  });

  test('should have link to dusoma.com', async ({ page }) => {
    const link = page.getByRole('link', { name: /Dusoma.com/i }).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://dusoma.com');
  });

  test('should have link to marla-ai.ai', async ({ page }) => {
    const link = page.getByRole('link', { name: /Marla.AI/i }).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://marla-ai.ai');
  });

  test('should display footer with contact info', async ({ page }) => {
    await expect(page.getByText('marla@dusoma.org')).toBeVisible();
  });

  test('should display disclaimer', async ({ page }) => {
    await expect(page.getByText(/This tool provides educational content/)).toBeVisible();
  });

  test('should display copyright notice', async ({ page }) => {
    await expect(page.getByText(/2025 Dusoma Foundation/)).toBeVisible();
  });
});
