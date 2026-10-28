import { expect, test } from '@playwright/test';

test('a busy button keeps focus and ignores presses and clicks', async ({ page }) => {
  await page.goto('/components/button');
  const save = page.getByRole('button', { name: 'Save', exact: true });
  const busy = page.getByRole('button', { name: 'Saving…', exact: true });

  await save.focus();
  await page.keyboard.press('Enter');

  await expect(busy).toBeFocused();
  await expect(busy).toHaveAttribute('aria-disabled', 'true');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Space');
  // Playwright waits for an aria-disabled button to enable before clicking; force clicks it now.
  await busy.click({ force: true });
  await expect(page.getByText('Saves: 1')).toBeVisible();

  await expect(save).toBeFocused();
  await expect(save).not.toHaveAttribute('aria-disabled');
});
