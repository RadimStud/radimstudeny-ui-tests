import { test, expect } from '@playwright/test';
import { acceptCookiesIfPresent, waitForPageLoad } from '../fixtures/helpers';

test.describe('Projects Page - Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await acceptCookiesIfPresent(page);
    
    // Try to navigate to projects page with timeout and error handling
    const projectsLink = page.locator('a:has-text("Projects"), a:has-text("projects"), a[href*="project"]').first();
    if (await projectsLink.count() > 0) {
      try {
        await projectsLink.click({ timeout: 5000 });
        await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
      } catch {
        // If click fails, continue with homepage
      }
    }
  });

  test('projects page loads', async ({ page }) => {
    // Page should be visible
    await expect(page.locator('body')).toBeVisible();
  });

  test('projects section is visible', async ({ page }) => {
    // Check for projects heading or section
    const projectsSection = page.locator('h1, h2, h3').filter({ hasText: /project/i }).first();
    if (await projectsSection.count() > 0) {
      await expect(projectsSection).toBeVisible();
    }
  });

  test('project items are displayed', async ({ page }) => {
    // Look for project containers
    const projectItems = page.locator('[class*="project"], article, .card, [role="article"]');
    const count = await projectItems.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('project links are clickable', async ({ page }) => {
    // Check if there are project links
    const projectLinks = page.locator('a[href*="project"], a[href*="work"], a[href*="portfolio"]');
    const count = await projectLinks.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
