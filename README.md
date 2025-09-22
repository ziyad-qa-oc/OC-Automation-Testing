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
1) Pull the repo into your local.
   a. Clone the repo.
   "git clone https://github.com/ziyad-qa-oc/OC-Automation-Testing.git"
   This will create a folder called OC-Automation-Testing with all the repo files inside.
   b. Go into the repo.
   "cd OC-Automation-Testing"
   c. Pull latest changes anytime.
   "git pull origin main"
2) Open Powershell (Either from local or IDE).
3) Cd to autotesting-onecredit.
4) Run "npx playwright test N.spec.ts --headed" to run the automation.
5) Run "npx playwright show-report" to view report of the testing.
6) Push to your own branch when you have worked on the scripting in your local.
   a. Create a new branch locally (if not already on one).
   "git checkout -b my-branch"
   (replace my-branch with your branch name, e.g. feature/login-tests)
   b. Push to GitHub with that branch.
   "git push -u origin my-branch"
   The -u sets the upstream, so next time you can just run:
   "git push"
7) Head of automation QA to review the code & merge into main branch.
   a) Push your branch to GitHub:
   "git push -u origin my-branch"
   b) Go to your repo on GitHub.
   You’ll see a banner: “Compare & pull request”.
   Click it, review, then click Merge pull request → Confirm merge.

Commands:
1) Run all tests:
"npx playwright test"
2) Run with visible browser:
"npx playwright test --headed"
3) Debug UI:
"npx playwright test --ui"
