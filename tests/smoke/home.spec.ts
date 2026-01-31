import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/radimstudeny\.cz/i);
  await expect(page.locator('body')).toBeVisible();

  // minimální sanity: stránka má nějaký title
  await expect(page).toHaveTitle(/.+/);
});
