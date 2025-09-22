// Reg TC1: Sign Up
import { test, expect } from '@playwright/test';
import { openInNewTabAndClose } from './helpers/navigation';

// Shared email for consecutive tests - timestamp ensures new user each run
const testEmail = `test+${Date.now()}@onecredit.my`;

test.describe('Sign Up Flow', () => {
    test('Get Started', async ({ page }) => {
  // Set screen resolution (viewport size)
  await page.setViewportSize({ width: 1920, height: 1080 });

  await page.goto('https://staging.core.onecredit.my/');
  await expect(page).toHaveTitle(/OneCredit.*Malaysia's Leading Credit Bureau.*Risk Intelligence/i);

  // Wait for the page to load completely and the link to be visible and clickable
  await page.waitForLoadState('networkidle'); // Wait for network to be idle
  
  // Find the "Try for free" link (it's an <a> tag, not a button)
  const tryForFreeLink = page.locator('a:has-text("Try for free")');
  await tryForFreeLink.waitFor({ state: 'visible', timeout: 10000 });
  
  // Click the link and verify it redirects to /get-started page
  await tryForFreeLink.click();
  await expect(page).toHaveURL('https://staging.core.onecredit.my/get-started');
  await page.waitForLoadState('networkidle'); // Wait for network to be idle
});

test('Verify Terms & Privacy links open in new tabs', async ({ page }) => {
    // Navigate to your page
    await page.goto('https://staging.core.onecredit.my/get-started');
  
    // Terms & Conditions
    const termsLink = page.locator('a[href$=\"/terms-of-service\"]');
    await openInNewTabAndClose(page, termsLink, /terms-of-service/);
  
    // Privacy Policy (choose the one that opens in new tab)
    const privacyLink = page.getByRole('link', { name: /Privacy\s*Policy/i }).last();
    await openInNewTabAndClose(page, privacyLink, /privacy-policy/);
  
    // ✅ Confirm back on original page
    await expect(page).toHaveURL('https://staging.core.onecredit.my/get-started');
});

test('Submit Email', async ({ page }) => {
  // Find the email input, fill with a value matching the regex, and assert
  await page.goto('https://staging.core.onecredit.my/get-started');
  const emailInput = page.locator('input[name="email"]');
  await emailInput.waitFor({ state: 'visible', timeout: 10000 });
  await emailInput.fill(testEmail);
  await expect(emailInput).toHaveValue(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

  // Find and click the Continue button
  const continueButton = page.getByRole('button', { name: 'Continue' });
  await continueButton.waitFor({ state: 'visible', timeout: 10000 });
  await expect(continueButton).toBeEnabled();
  await continueButton.click();
});

test('Submit Phone Number', async ({ page }) => {
  const encodedEmail = encodeURIComponent(testEmail);
  await page.goto(`https://staging.core.onecredit.my/register?email=${encodedEmail}`);
  const phoneInput = page.locator('input[name="phone"]');
  await phoneInput.waitFor({ state: 'visible', timeout: 10000 });
  const validPhone = '1234567890';
  await phoneInput.fill(validPhone);
  await expect(phoneInput).toHaveValue(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

  // Find and click the Continue button
  const continueButton = page.getByRole('button', { name: 'Continue' });
  await continueButton.waitFor({ state: 'visible', timeout: 10000 });
  await expect(continueButton).toBeEnabled();
  await continueButton.click();
});

test('Submit OTP verification', async ({ page }) => { 
  const encodedEmail = encodeURIComponent(testEmail);
  await page.goto(`https://staging.core.onecredit.my/verify-otp?email=${encodedEmail}`);
  const otpInput = page.locator('input[data-input-otp="true"][maxlength="6"]');
  await otpInput.waitFor({ state: 'visible', timeout: 10000 });
  const validOtp = '111111';
  await otpInput.click();
  await otpInput.fill('');
  await otpInput.type(validOtp);
  await expect(otpInput).toHaveValue(/^\d{6}$/);
  await page.waitForLoadState('networkidle');
    });
});