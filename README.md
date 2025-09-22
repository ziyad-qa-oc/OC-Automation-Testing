**Automation Testing**

Scripting for:
1) Regression Testing <https://linear.app/onecreditint/issue/QA-142/regression-testcase>
2) Smoke Testing

Tech Specs:
1) Framework: Playwright
2) Language: Typescript

Pre-requisite:
1) Install Node.js on your device. <https://nodejs.org/en>
2) Install Playwright in Powershell.
   "npm install -D @playwright/test typescript ts-node"
   "npx playwright install"
3) Install Git to interact with Github.
4) Install Cursor as Code IDE.

How to run:
1) Open Powershell (Either from local or IDE).
2) Cd to autotesting-onecredit.
3) Run "npx playwright test N.spec.ts --headed" to run the automation.
4) Run "npx playwright show-report" to view report of the testing.

Commands:
1) Run all tests:
"npx playwright test"
2) Run with visible browser:
"npx playwright test --headed"
3) Debug UI:
"npx playwright test --ui"
