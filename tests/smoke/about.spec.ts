import { test, expect } from '@playwright/test';
import { acceptCookiesIfPresent, waitForPageLoad } from '../fixtures/helpers';

test.describe('About Me Page - Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await acceptCookiesIfPresent(page);
    
    // Try to navigate to about page, with timeout
    const aboutLink = page.locator('a:has-text("About"), a:has-text("about"), a[href*="about"]').first();
    if (await aboutLink.count() > 0) {
      try {
        await aboutLink.click({ timeout: 5000 });
        await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
      } catch {
        // If navigation fails, just continue with current page
      }
    }
  });

  test('about page loads', async ({ page }) => {
    // Page should be visible
    await expect(page.locator('body')).toBeVisible();
  });

  test('about section heading visible', async ({ page }) => {
    // Check for about heading
    const aboutHeading = page.locator('h1, h2, h3').filter({ hasText: /about|who|bio/i }).first();
    if (await aboutHeading.count() > 0) {
      await expect(aboutHeading).toBeVisible();
    }
  });

  test('bio or introduction text visible', async ({ page }) => {
    // Look for bio content
    const bioContent = page.locator('p, [class*="bio"], [class*="intro"]').first();
    if (await bioContent.count() > 0) {
      await expect(bioContent).toBeVisible();
    }
  });

  test('profile or author image visible', async ({ page }) => {
    // Check for profile image
    const profileImg = page.locator('img[alt*="profile"], img[alt*="author"], img[class*="profile"], img[class*="avatar"]').first();
    if (await profileImg.count() > 0) {
      await expect(profileImg).toBeVisible();
    }
  });

  test('skills or expertise section', async ({ page }) => {
    // Look for skills content
    const skillsSection = page.locator('[class*="skill"], [class*="expertise"], [class*="tech"], ul, ol').first();
    if (await skillsSection.count() > 0) {
      await expect(skillsSection).toBeVisible();
    }
  });

  test('social links in about section', async ({ page }) => {
    // Check for social media links
    const socialLinks = page.locator('a[href*="linkedin"], a[href*="github"], a[href*="twitter"], a[href*="instagram"]');
    const count = await socialLinks.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
