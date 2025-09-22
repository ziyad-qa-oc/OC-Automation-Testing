# 🚀 Automation Testing – Technical Specs

![Node.js](https://img.shields.io/badge/node-%3E%3D%2018-green)  
![Playwright](https://img.shields.io/badge/playwright-latest-blue)  
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)  
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)  
![Build](https://github.com/ziyad-qa-oc/OC-Automation-Testing/actions/workflows/playwright.yml/badge.svg)

## 📌 Scope
- **Regression Testing**: [QA-142: Regression Testcase](https://linear.app/onecreditint/issue/QA-142/regression-testcase)
- **Smoke Testing**:

---

## 🛠 Tech Stack
- **Framework**: [Playwright](https://playwright.dev/)  
- **Language**: [TypeScript ](https://www.typescriptlang.org/docs/) 

---

## ✅ Pre-requisites
1. Install [Node.js](https://nodejs.org/en)  
2. Install Playwright & dependencies:  
   ```bash
   npm install -D @playwright/test typescript ts-node
   npx playwright install
   ```
3) Install Git to interact with Github. <https://git-scm.com/downloads>
4) Install Cursor as Code IDE. <https://cursor.com/cn/agents>
   
---

##⚡ Setup & Run
1. Clone the Repository
      ```bash
      git clone https://github.com/ziyad-qa-oc/OC-Automation-Testing.git
      cd OC-Automation-Testing
      ```
   Pull latest changes anytime:
      ```bash
      git pull origin main
      ```
2. Open PowerShell
   (From your local machine or IDE)
3. Navigate to Project Directory
      ```bash
      cd autotesting-onecredit
      ```
4. Run Tests
   a) Run a specific test (headed mode):
      ```bash
      npx playwright test N.spec.ts --headed
      ```
   b) Run all tests:
      ```bash      
      npx playwright test
      ```
5. View Reports
      ```bash
      npx playwright show-report
      ```
   
---

## 🌿 Branching Workflow
1. Create a New Branch
   ```bash
   git checkout -b my-branch
   ```
   Replace my-branch with your feature name (e.g. feature/login-tests).
2. Push Branch to GitHub
   ```bash
   git push -u origin my-branch
   ```
   After this, simply use git push for updates.
   
---

## 🔎 Code Review & Merge

1. Push your branch:
   ```
   git push -u origin my-branch
   ```
2. On GitHub:  
   a) Open a Pull Request (PR)  
   b) Reviewer checks the code  
   c) Click Merge pull request → Confirm

---

## 🧰 Common Commands
1. Run all tests:
   ```
   npx playwright test
   ```
2. Run tests with visible browser:
   ```
   npx playwright test --headed
   ```
3. Debug tests with UI:
   ```
   npx playwright test --ui
   ```
