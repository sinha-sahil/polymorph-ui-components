import { expect, test } from '@playwright/test';

test('a read-only input stays in the tab order and keeps its value', async ({ page }) => {
  await page.goto('/components/input');
  const field = page.getByRole('textbox', { name: 'Order number', exact: true });

  await page.getByRole('textbox', { name: 'Name', exact: true }).focus();
  await page.keyboard.press('Tab');
  await page.keyboard.type('99');

  await expect(field).toBeFocused();
  await expect(field).not.toBeEditable();
  await expect(field).toHaveValue('ORD-1042');
});
