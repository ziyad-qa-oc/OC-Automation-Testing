import { test, expect } from '@playwright/test';

// Shared email for consecutive tests - timestamp ensures new user each run
const testEmail = `test+${Date.now()}@onecredit.my`;

test.describe('Account Setup Flow', () => {
    test('Finish Setup', async ({ page }) => {
    await page.goto('https://staging.core.onecredit.my/');
    await expect(page).toHaveTitle(/OneCredit.*Malaysia's Leading Credit Bureau.*Risk Intelligence/i);
    await page.waitForLoadState('networkidle');

    // Find and click the "Finish Setup" link
    const finishSetupLink = page.locator('a:has-text("Finish Setup")');
    await finishSetupLink.waitFor({ state: 'visible', timeout: 10000 });
    await finishSetupLink.click();
    await expect(page).toHaveURL(/.*\/settings\/account\/confirm-email.*source=.*callbackUrl=/);
    await page.waitForLoadState('networkidle');
});

test('Confirm Email', async ({ page }) => {
    await page.goto('https://staging.core.onecredit.my/settings/account/confirm-email');
    await page.waitForLoadState('networkidle');

    // Find and click the Confirm button
    const confirmButton = page.locator('button:has-text("Confirm")');
    await confirmButton.waitFor({ state: 'visible', timeout: 10000 });
    await confirmButton.click();
    await page.waitForLoadState('networkidle');
    const encodedEmail = encodeURIComponent(testEmail);
    await page.goto(`https://staging.core.onecredit.my/settings/account/verify-email-otp?email=${encodedEmail}&callbackUrl=/setup-account&source=/`);
    await page.waitForLoadState('networkidle');

    // Fill in the OTP
    const otpInput = page.locator('input[data-input-otp="true"][maxlength="6"]');
    await otpInput.waitFor({ state: 'visible', timeout: 10000 });
    const validOtp = '111111';
    await otpInput.click();
    await otpInput.fill('');
    await otpInput.type(validOtp);
    await expect(otpInput).toHaveValue(/^\d{6}$/);
    await page.waitForLoadState('networkidle');
    await page.goto('https://staging.core.onecredit.my/setup-account/');
    await page.waitForLoadState('networkidle');
});

test('Setup Account', async ({page}) => {
    await page.goto('https://staging.core.onecredit.my/setup-account/');
    await page.waitForLoadState('networkidle');

    // Display Name
    const displayNameInput = page.locator('input[name="displayName"]');
    await displayNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await displayNameInput.fill('Test User');

    // Full Name
    const fullNameInput = page.locator('input[name="fullName"]');
    await fullNameInput.waitFor({ state: 'visible', timeout: 10000 });
    await fullNameInput.fill('Test User');

    // Company combobox (as registered on SSM)
    const companyCombobox = page.locator('input[role="combobox"][placeholder="As registered on SSM"]');
    await companyCombobox.waitFor({ state: 'visible', timeout: 10000 });

    // Open dropdown and select first company suggestion
    await companyCombobox.click();
    const companyListbox = page.locator('[role="listbox"]');
    await companyListbox.waitFor({ state: 'visible', timeout: 10000 });
    await companyListbox.locator('[role="option"]').first().click();

    // Nature of Business combobox
    const natureCombobox = page.locator('input[role="combobox"][placeholder="Select Nature of Business"]');
    await natureCombobox.waitFor({ state: 'visible', timeout: 10000 });
    await natureCombobox.click();

    // Optionally type to filter
    // await natureCombobox.type('Technology');
    // Select the first available option
    const firstOption = page.locator('[role="option"]').first();
    await firstOption.waitFor({ state: 'visible', timeout: 10000 });
    await firstOption.click();

    // Save & Continue
    const saveAndContinue = page.locator('button:has-text("Save & Continue")');
    await saveAndContinue.waitFor({ state: 'visible', timeout: 10000 });
    await saveAndContinue.click();
    await page.waitForLoadState('networkidle');
});

test('Cancel Account Setup', async ({page}) => {
    await page.goto('https://staging.core.onecredit.my/setup-account/');
    await page.waitForLoadState('networkidle');

    // Cancel
    const cancelButton = page.locator('button:has-text("Cancel")');
    await cancelButton.waitFor({ state: 'visible', timeout: 10000 });
    await cancelButton.click();
    await page.waitForLoadState('networkidle');
});

test('Save Account Setup', async ({page}) => {
    await page.goto('https://staging.core.onecredit.my/setup-account/');
    await page.waitForLoadState('networkidle');

    // Save & Continue
    const saveAndContinue = page.locator('button:has-text("Save & Continue")');
    await saveAndContinue.waitFor({ state: 'visible', timeout: 10000 });
    await saveAndContinue.click();
    await page.waitForLoadState('networkidle');
});

test('Continue to Address Setup', async ({page}) => {
    await page.goto('https://staging.core.onecredit.my/setup-account/');
    await page.waitForLoadState('networkidle');

    // Continue
    const continueButton = page.locator('button:has-text("Continue")');
    await continueButton.waitFor({ state: 'visible', timeout: 10000 });
    await continueButton.click();
    await page.goto('https://staging.core.onecredit.my/setup-address');
    });
});

test.describe('Address Setup Flow', () => {
    test('Skip Address Setup', async ({page}) => {
    await page.goto('https://staging.core.onecredit.my/setup-address');
    await page.waitForLoadState('networkidle');
    
    const skipButton = page.locator('button:has-text("Skip for now")');
    await skipButton.waitFor({ state: 'visible', timeout: 10000 });
    await skipButton.click();
    await page.waitForLoadState('networkidle');
    
    // Return to previous page
    await page.goBack();
    await page.waitForLoadState('networkidle');
});

test('Setup Address', async ({page}) => {
    await page.goto('https://staging.core.onecredit.my/setup-address');
    await page.waitForLoadState('networkidle');

    // Street Address
    const addressInput = page.locator('input[name="address1"]');
    await addressInput.waitFor({ state: 'visible', timeout: 10000 });
    await addressInput.fill('123 Test Street');

    // Neighbourhood/Residential Area
    const neighbourhoodInput = page.locator('input[name="address2"]');
    await neighbourhoodInput.waitFor({ state: 'visible', timeout: 10000 });
    await neighbourhoodInput.fill('Test Neighbourhood');

    // City
    const cityInput = page.locator('input[name="city"]');
    await cityInput.waitFor({ state: 'visible', timeout: 10000 });
    await cityInput.fill('Kuala Lumpur');

    // State dropdown
    const stateDropdown = page.locator('button[role="combobox"]:has-text("Select State")');
    await stateDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await stateDropdown.click();

    // Select the first available state option
    const stateOption = page.locator('[role="option"]').first();
    await stateOption.waitFor({ state: 'visible', timeout: 10000 });
    await stateOption.click();

    // Postcode
    const postcodeInput = page.locator('input[name="postcode"]');
    await postcodeInput.waitFor({ state: 'visible', timeout: 10000 });
    await postcodeInput.fill('40000');
    
    // Continue button
    const continueButton = page.locator('button:has-text("Continue")');
    await continueButton.waitFor({ state: 'visible', timeout: 10000 });
    await continueButton.click();
    await page.waitForLoadState('networkidle');
    });
});