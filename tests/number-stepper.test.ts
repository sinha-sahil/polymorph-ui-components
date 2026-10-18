import { expect, test } from '@playwright/test';

test('focus() moves focus to the first enabled button', async ({ page }) => {
  await page.goto('/components/number-stepper');
  const seats = page.getByRole('group', { name: 'Seats' });
  const focusSeats = page.getByRole('button', { name: 'Focus seats', exact: true });

  await focusSeats.click();
  await expect(seats.getByRole('button', { name: 'Increase' })).toBeFocused();

  await page.keyboard.press('Enter');
  await expect(seats).toContainText('2');
  await focusSeats.click();
  await expect(seats.getByRole('button', { name: 'Decrease' })).toBeFocused();
});
