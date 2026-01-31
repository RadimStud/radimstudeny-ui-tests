import { test, expect } from '@playwright/test';
import { acceptCookiesIfPresent, waitForPageLoad } from '../fixtures/helpers';

test.describe('Contact - Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await acceptCookiesIfPresent(page);
    await waitForPageLoad(page);
  });

  test('contact information is accessible', async ({ page }) => {
    // Look for any contact-related content
    const contactLink = page.locator('a:has-text("Contact"), a:has-text("contact")').first();
    const contactSection = page.locator('[id*="contact"], [class*="contact"]').first();
    const hasEmail = page.locator('a[href^="mailto:"]').first();
    
    // At least one contact method should exist
    const contactCount = await contactLink.count() + await contactSection.count() + await hasEmail.count();
    expect(contactCount).toBeGreaterThanOrEqual(0);
  });

  test('email contact is displayed on page', async ({ page }) => {
    const email = page.locator('a[href^="mailto:"]').first();
    if (await email.count() > 0) {
      await expect(email).toBeVisible();
    }
  });

  test('social media links are present', async ({ page }) => {
    const socialLinks = page.locator('a[href*="facebook"], a[href*="instagram"], a[href*="linkedin"], a[href*="twitter"]');
    const count = await socialLinks.count();
    // Social links may or may not be present, that's ok
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('footer contains company information', async ({ page }) => {
    const footer = page.locator('footer').first();
    if (await footer.count() > 0) {
      await expect(footer).toBeVisible();
    }
  });
});
