import { test } from '@playwright/test';

test('seed: prepare storage state', async ({ page, context }) => {
  await page.goto('/');

  // Safe pokus o cookie banner – když nic nenajde, nic se neděje.
  const labels = [
    'Accept all',
    'Accept',
    'I agree',
    'Souhlasím',
    'Přijmout',
    'Přijmout vše',
    'OK',
  ];

  for (const label of labels) {
    const btn = page.getByRole('button', { name: label });
    if (await btn.count()) {
      try {
        await btn.first().click({ timeout: 1500 });
        break;
      } catch {
        // ignore
      }
    }
  }

  await context.storageState({ path: '.auth/user.json' });
});
