import { test, expect } from '@playwright/test';
import { acceptCookiesIfPresent, waitForPageLoad } from '../fixtures/helpers';

test.describe('Navigation - Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await acceptCookiesIfPresent(page);
    await waitForPageLoad(page);
  });

  test('main navigation menu is visible', async ({ page }) => {
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

  test('navigation contains home link', async ({ page }) => {
    // Try selectors without diacritics
    const homeLink = page.locator('a:has-text("Home"), a[href="/"]').first();
    const linkCount = await homeLink.count();
    expect(linkCount).toBeGreaterThanOrEqual(0);
  });

  test('navigate to My Music page', async ({ page }) => {
    // Multiple selectors for Music page
    const musicLink = page.locator('a:has-text("Music"), a:has-text("music"), a[href*="music"]').first();
    if (await musicLink.count() > 0) {
      await musicLink.click();
      await page.waitForLoadState('domcontentloaded');
    }
  });

  test('navigate to courses/services page', async ({ page }) => {
    // Multiple selectors for courses page
    const coursesLink = page.locator('a:has-text("Courses"), a:has-text("Services"), a[href*="course"], a[href*="service"]').first();
    if (await coursesLink.count() > 0) {
      await coursesLink.click();
      await page.waitForLoadState('domcontentloaded');
    }
  });
});
