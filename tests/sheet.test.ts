import { expect, test } from '@playwright/test';

test('getScrollElement() returns the element that scrolls the content', async ({ page }) => {
  await page.goto('/components/sheet');
  await page.getByRole('button', { name: 'Open long', exact: true }).click();
  const last = page.getByText('Section 30', { exact: true });
  await expect(last).not.toBeInViewport();

  await page.getByRole('button', { name: 'Jump to end', exact: true }).click();

  await expect(last).toBeInViewport();
});

test('getScrollElement() is ready for the content as it mounts', async ({ page }) => {
  await page.goto('/components/sheet');

  await page.getByRole('button', { name: 'Open long', exact: true }).click();

  await expect(page.getByText(/^Scroll area: \d+ px$/)).toBeVisible();
});
