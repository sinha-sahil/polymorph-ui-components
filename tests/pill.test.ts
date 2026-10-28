import { expect, test } from '@playwright/test';

test('focus() lets a list move focus to the next pill when one is dismissed', async ({ page }) => {
  await page.goto('/components/pill');

  await page.getByRole('button', { name: 'Remove React', exact: true }).focus();
  await page.keyboard.press('Enter');

  await expect(page.getByRole('button', { name: 'Remove React', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Remove Vue', exact: true })).toBeFocused();
});

test("a disabled pill's dismiss button keeps focus and ignores presses", async ({ page }) => {
  await page.goto('/components/pill');
  const dismiss = page.getByRole('button', { name: 'Remove Archived', exact: true });

  await dismiss.focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Space');
  await expect(dismiss).toBeFocused();
  // Playwright waits for an aria-disabled button to enable before clicking; force clicks it now.
  await dismiss.click({ force: true });

  await expect(dismiss).toHaveAttribute('aria-disabled', 'true');
  await expect(page.getByText('Archived', { exact: true })).toBeVisible();
});
