import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://staging.core.onecredit.my/');
  await expect(page).toHaveTitle(/Example Domain/);
});
