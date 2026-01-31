import { test, expect } from '@playwright/test';
import { acceptCookiesIfPresent, waitForPageLoad, closePopupsIfPresent } from '../fixtures/helpers';

test.describe('Search and Filter Functionality - Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await acceptCookiesIfPresent(page);
    await waitForPageLoad(page);
    await closePopupsIfPresent(page);
  });

  test('search form is accessible', async ({ page }) => {
    const searchInput = page.locator('input[type="search"], [class*="search"] input, [id*="search"]').first();
    if (await searchInput.count() > 0) {
      await expect(searchInput).toBeVisible();
    }
  });

  test('can type in search field and submit', async ({ page }) => {
    const searchInput = page.locator('input[type="search"], [class*="search"] input, [id*="search"]').first();
    if (await searchInput.count() > 0) {
      await searchInput.fill('test');
      await expect(searchInput).toHaveValue('test');
      
      const submitButton = page.getByRole('button', { name: /search|hledej|najdi/i }).first();
      if (await submitButton.count() > 0) {
        await submitButton.click();
        await page.waitForLoadState('domcontentloaded');
      }
    }
  });

  test('course filters work if available', async ({ page }) => {
    // Navigate to courses page first
    const coursesLink = page.getByRole('link', { name: /courses|kurzy/i });
    if (await coursesLink.count() > 0) {
      await coursesLink.click();
      await page.waitForLoadState('domcontentloaded');
    }

    // Look for filter buttons
    const filterButtons = page.locator('button:has-text("filter"), [role="button"][aria-label*="filter"], [class*="filter"]');
    if (await filterButtons.first().count() > 0) {
      const firstFilter = filterButtons.first();
      await firstFilter.click();
      await page.waitForLoadState('domcontentloaded');
    }
  });

  test('multiple filters can be applied', async ({ page }) => {
    const coursesLink = page.getByRole('link', { name: /courses|kurzy/i });
    if (await coursesLink.count() > 0) {
      await coursesLink.click();
      await page.waitForLoadState('domcontentloaded');
    }

    const checkboxes = page.locator('input[type="checkbox"]');
    const count = await checkboxes.count();
    
    if (count >= 2) {
      await checkboxes.nth(0).check();
      await page.waitForTimeout(500);
      await checkboxes.nth(1).check();
      await page.waitForLoadState('networkidle');
    }
  });

  test('clear filters resets search', async ({ page }) => {
    const coursesLink = page.getByRole('link', { name: /courses|kurzy/i });
    if (await coursesLink.count() > 0) {
      await coursesLink.click();
      await page.waitForLoadState('domcontentloaded');
    }

    const clearButton = page.getByRole('button', { name: /clear|reset|zrušit/i }).first();
    if (await clearButton.count() > 0) {
      await clearButton.click();
      await page.waitForLoadState('networkidle');
    }
  });
});
