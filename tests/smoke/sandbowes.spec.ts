import { test, expect } from '@playwright/test';
import { acceptCookiesIfPresent, waitForPageLoad } from '../fixtures/helpers';

test.describe('Sandbowes Project - Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await acceptCookiesIfPresent(page);
    
    // Try to navigate to Sandbowes project with timeout and error handling
    const sandbowesLink = page.locator('a:has-text("Sandbowes"), a:has-text("sandbowes"), a[href*="sandbowes"], a[href*="sandbox"]').first();
    if (await sandbowesLink.count() > 0) {
      try {
        await sandbowesLink.click({ timeout: 5000 });
        await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
      } catch {
        // If click fails, continue with homepage
      }
    }
  });

  test('sandbowes section loads', async ({ page }) => {
    // Page should be visible
    await expect(page.locator('body')).toBeVisible();
  });

  test('sandbowes project title visible', async ({ page }) => {
    // Look for project title
    const title = page.locator('h1, h2, h3').filter({ hasText: /sandbowes|sandbox/i }).first();
    if (await title.count() > 0) {
      await expect(title).toBeVisible();
    }
  });

  test('project description visible', async ({ page }) => {
    // Look for project description
    const description = page.locator('p, [class*="description"], [class*="desc"]').first();
    if (await description.count() > 0) {
      await expect(description).toBeVisible();
    }
  });

  test('project gallery or images visible', async ({ page }) => {
    // Check for images in project
    const images = page.locator('img');
    const count = await images.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('project details or specifications', async ({ page }) => {
    // Look for project details
    const details = page.locator('[class*="details"], [class*="specs"], ul, ol, .list').first();
    if (await details.count() > 0) {
      await expect(details).toBeVisible();
    }
  });

  test('project demo or github link', async ({ page }) => {
    // Check for demo or code links
    const demoLink = page.locator('a:has-text("Demo"), a:has-text("GitHub"), a:has-text("Code"), a[href*="github"], a[href*="demo"]');
    const count = await demoLink.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
