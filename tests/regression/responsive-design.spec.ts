import { test, expect } from '@playwright/test';
import { acceptCookiesIfPresent, waitForPageLoad } from '../fixtures/helpers';

test.describe('Responsive Design - Regression Tests', () => {
  test('homepage is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await acceptCookiesIfPresent(page);
    await waitForPageLoad(page);

    // Main content should be visible
    await expect(page.locator('body')).toBeVisible();
    
    // No horizontal scrollbar
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);
    expect(scrollWidth).toBeLessThanOrEqual(windowWidth);
  });

  test('homepage is responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await acceptCookiesIfPresent(page);
    await waitForPageLoad(page);

    await expect(page.locator('body')).toBeVisible();
    
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);
    expect(scrollWidth).toBeLessThanOrEqual(windowWidth);
  });

  test('navigation is accessible on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await acceptCookiesIfPresent(page);
    await waitForPageLoad(page);

    // Check for hamburger menu or responsive navigation
    const mobileMenu = page.locator('[aria-label="Menu"], [class*="hamburger"], button[aria-expanded]').first();
    if (await mobileMenu.count() > 0) {
      await expect(mobileMenu).toBeVisible();
    }
  });

  test('courses page layout adapts to mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await acceptCookiesIfPresent(page);
    await waitForPageLoad(page);

    const coursesLink = page.getByRole('link', { name: /courses|kurzy/i });
    if (await coursesLink.count() > 0) {
      await coursesLink.click();
      await page.waitForLoadState('domcontentloaded');
    }

    // Course cards should be stacked or in mobile layout
    const courseCards = page.locator('[role="article"], .course-card, [class*="course"]');
    if (await courseCards.count() > 0) {
      await expect(courseCards.first()).toBeVisible();
    }
  });

  test('images are properly sized on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await acceptCookiesIfPresent(page);
    await waitForPageLoad(page);

    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < Math.min(imageCount, 3); i++) {
      const img = images.nth(i);
      const bbox = await img.boundingBox();
      
      if (bbox) {
        expect(bbox.width).toBeLessThanOrEqual(375);
      }
    }
  });
});
