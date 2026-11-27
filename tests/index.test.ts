import { expect, test } from '@playwright/test';

test('the index opens the first component', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL('/components/browser');
  await expect(page.getByRole('heading', { level: 1, name: 'Browser', exact: true })).toBeVisible();
});
