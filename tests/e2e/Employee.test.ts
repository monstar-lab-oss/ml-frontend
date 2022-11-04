import { test, Page } from "@playwright/test";

let page: Page;

test.beforeAll(async ({ browser }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  page = await browser.newPage();
  await page.goto("/employees");
});

test.afterAll(async () => {
  await page.close();
});

test.describe("Employee page", () => {
  test("Creating employee", async () => {
    page.on("dialog", (dialog) => dialog.accept());

    await page.locator("text=/Create new employee/i").click();
    // TODO: Check if it is a create url

    await page.locator("data-testid=input-name").fill("username");

    await page.locator("input[type=submit]").click();
  });

  test.fixme("Reading employee", async () => {});

  test.fixme("Updating employee", async () => {});

  test.fixme("Deleting employee", async () => {});
});
