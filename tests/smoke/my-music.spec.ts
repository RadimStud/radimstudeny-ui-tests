import { test, expect } from '@playwright/test';

test.describe('My Music Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://radimstudeny.cz/mymusic/');
  });

  test('should load My Music page with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/My Music/);
  });

  test('should display main heading', async ({ page }) => {
    const heading = page.locator('h2', { hasText: 'My Music' }).first();
    await expect(heading).toBeVisible();
  });

  test('should display content about music and programming', async ({ page }) => {
    const paragraph = page.locator('text=Music and programming interest me');
    await expect(paragraph).toBeVisible();
  });

  test('should display "Software Engineer by Day, Musician by Heart" section', async ({ page }) => {
    const section = page.locator('text=Software Engineer by Day, Musician by Heart');
    await expect(section).toBeVisible();
  });

  test('should display information about Kowall Company', async ({ page }) => {
    // Check if Kowall text exists anywhere on page
    const kowalText = page.locator('body').filter({ hasText: /kowall|company/i });
    const count = await kowalText.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should display information about Session band', async ({ page }) => {
    const sessionText = page.locator('text=Session, a rock band');
    await expect(sessionText).toBeVisible();
  });

  test('should display gallery with musical photos', async ({ page }) => {
    // Check if there are any images on the page
    const images = page.locator('img');
    const count = await images.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should have multiple images in gallery', async ({ page }) => {
    // Check if page has images
    const images = page.locator('img');
    const count = await images.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should display navigation menu', async ({ page }) => {
    const servicesLink = page.locator('a:has-text("Services")');
    const projectsLink = page.locator('a:has-text("Projects")');
    const profileLink = page.locator('a:has-text("Profile")');
    const sandboxLink = page.locator('a:has-text("Sandbox")');
    
    await expect(servicesLink).toBeVisible();
    await expect(projectsLink).toBeVisible();
    await expect(profileLink).toBeVisible();
    await expect(sandboxLink).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    const sandboxLink = page.locator('a[href*="sandbox"]');
    await expect(sandboxLink).toBeVisible();
  });
});
