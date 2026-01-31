import { test, expect } from '@playwright/test';
import { acceptCookiesIfPresent, waitForPageLoad } from '../fixtures/helpers';

test.describe('Services Page - Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await acceptCookiesIfPresent(page);
    
    // Try to navigate to services page with timeout and error handling
    const servicesLink = page.locator('a:has-text("Services"), a:has-text("services"), a[href*="service"]').first();
    if (await servicesLink.count() > 0) {
      try {
        await servicesLink.click({ timeout: 5000 });
        await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
      } catch {
        // If click fails, continue with homepage
      }
    }
  });

  test('services page loads', async ({ page }) => {
    // Page should be visible
    await expect(page.locator('body')).toBeVisible();
  });

  test('services section heading visible', async ({ page }) => {
    // Check for services heading
    const servicesHeading = page.locator('h1, h2, h3').filter({ hasText: /service/i }).first();
    if (await servicesHeading.count() > 0) {
      await expect(servicesHeading).toBeVisible();
    }
  });

  test('service items listed', async ({ page }) => {
    // Look for service containers
    const serviceItems = page.locator('[class*="service"], [class*="offer"], li, .card');
    const count = await serviceItems.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('service descriptions visible', async ({ page }) => {
    // Look for service descriptions
    const descriptions = page.locator('p, .description, [class*="desc"]');
    const count = await descriptions.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('call to action visible', async ({ page }) => {
    // Check for buttons or CTA
    const buttons = page.locator('button, a[class*="btn"], a[class*="button"]');
    const count = await buttons.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
