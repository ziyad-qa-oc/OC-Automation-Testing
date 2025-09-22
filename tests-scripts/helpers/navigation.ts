import { expect, Page, Locator } from '@playwright/test';

export async function openInNewTabAndClose(
  page: Page,
  link: Locator,
  expectedUrl: RegExp | string
): Promise<void> {
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    link.click({ modifiers: ['Control'] }),
  ]);
  await newPage.waitForLoadState('domcontentloaded');
  await expect(newPage).toHaveURL(expectedUrl);
  await newPage.close();
}