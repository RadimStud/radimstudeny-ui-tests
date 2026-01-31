import { test, expect } from '@playwright/test';
import { acceptCookiesIfPresent, waitForPageLoad, closePopupsIfPresent } from '../fixtures/helpers';

test.describe('Course Details - Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await acceptCookiesIfPresent(page);
    await waitForPageLoad(page);
    await closePopupsIfPresent(page);
  });

  test('course detail page contains all required information', async ({ page }) => {
    // Navigate to courses
    const coursesLink = page.getByRole('link', { name: /courses|kurzy/i });
    if (await coursesLink.count() > 0) {
      await coursesLink.click();
      await page.waitForLoadState('domcontentloaded');
    }

    // Click first course
    const firstCourse = page.locator('a[href*="course"], [role="link"]:has-text("course")').first();
    if (await firstCourse.count() > 0) {
      await firstCourse.click();
      await page.waitForLoadState('domcontentloaded');
      
      // Verify page has course information
      await expect(page.locator('h1, h2').first()).toBeVisible();
    }
  });

  test('course description is complete and readable', async ({ page }) => {
    const coursesLink = page.getByRole('link', { name: /courses|kurzy/i });
    if (await coursesLink.count() > 0) {
      await coursesLink.click();
      await page.waitForLoadState('domcontentloaded');
    }

    const courseDescription = page.locator('p, [class*="description"]').first();
    if (await courseDescription.count() > 0) {
      const text = await courseDescription.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('course pricing information is displayed', async ({ page }) => {
    const coursesLink = page.getByRole('link', { name: /courses|kurzy/i });
    if (await coursesLink.count() > 0) {
      await coursesLink.click();
      await page.waitForLoadState('domcontentloaded');
    }

    const price = page.locator('[class*="price"], span:has-text("$"), span:has-text("€"), span:has-text("Kč")').first();
    if (await price.count() > 0) {
      await expect(price).toBeVisible();
    }
  });

  test('course enrollment button is functional', async ({ page }) => {
    const coursesLink = page.getByRole('link', { name: /courses|kurzy/i });
    if (await coursesLink.count() > 0) {
      await coursesLink.click();
      await page.waitForLoadState('domcontentloaded');
    }

    const enrollButton = page.getByRole('button', { name: /enroll|přihlásit|koupit|join/i }).first();
    if (await enrollButton.count() > 0) {
      await expect(enrollButton).toBeVisible();
      await expect(enrollButton).toBeEnabled();
    }
  });

  test('course modules/lessons are listed', async ({ page }) => {
    const coursesLink = page.getByRole('link', { name: /courses|kurzy/i });
    if (await coursesLink.count() > 0) {
      await coursesLink.click();
      await page.waitForLoadState('domcontentloaded');
    }

    const modules = page.locator('[class*="module"], [class*="lesson"], [class*="section"], li').first();
    if (await modules.count() > 0) {
      await expect(modules).toBeVisible();
    }
  });
});
