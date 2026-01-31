import { Page } from '@playwright/test';

/**
 * Accept cookies if cookie consent banner is present
 */
export async function acceptCookiesIfPresent(page: Page): Promise<void> {
  const cookieLabels = [
    'Accept all',
    'Accept',
    'I agree',
    'Souhlasím',
    'Přijmout',
    'Přijmout vše',
    'OK',
  ];

  for (const label of cookieLabels) {
    const btn = page.getByRole('button', { name: label });
    if ((await btn.count()) > 0) {
      try {
        await btn.first().click({ timeout: 1500 });
        break;
      } catch {
        // Cookie button not interactive, continue
      }
    }
  }
}

/**
 * Wait for page to be fully loaded (DOM content loaded)
 */
export async function waitForPageLoad(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Get main navigation menu
 */
export async function getMainNavigation(page: Page) {
  return page.locator('nav').first();
}

/**
 * Navigate to courses page
 */
export async function navigateToCourses(page: Page): Promise<void> {
  const coursesLink = page.getByRole('link', { name: /courses|kurzy|vzděl/i });
  await coursesLink.click();
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Check if element is in viewport
 */
export async function isInViewport(page: Page, selector: string): Promise<boolean> {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0
    );
  }, selector);
}

/**
 * Wait for specific text to be visible
 */
export async function waitForText(page: Page, text: string, timeout: number = 5000): Promise<void> {
  await page.waitForSelector(`text=${text}`, { timeout });
}

/**
 * Close popups or modals if present
 */
export async function closePopupsIfPresent(page: Page): Promise<void> {
  const closeButtons = page.locator('[aria-label="Close"], button[aria-label*="Close"], .close-button');
  for (let i = 0; i < (await closeButtons.count()); i++) {
    try {
      await closeButtons.nth(i).click({ timeout: 500 });
    } catch {
      // Popup already closed or not clickable
    }
  }
}
