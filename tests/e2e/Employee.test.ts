import { test, Page, expect } from "@playwright/test";

let page: Page;

test.beforeAll(async ({ browser }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  page = await browser.newPage();

  // Click the Confirm button in the dialog that appears when the request is successful.
  page.on("dialog", (dialog) => dialog.accept());

  await page.goto("/employees");
  await page.waitForSelector('[data-testid="employee-table"]');
});

test.afterAll(async () => {
  await page.close();
});

test.describe("Employee page", () => {
  test("Reading employee", async () => {
    const employeeTable = await expect(
      await page.locator('[data-testid="employee-table"] tr').allTextContents()
    ).toStrictEqual([
      // table header
      "IDName",
      // table contents
      "1foo",
      "2bar",
      "3baz",
      "4error employee",
    ]);
  });

  test("Creating employee", async () => {
    await page.locator("text=/Create new employee/i").click();
    await expect(page).toHaveURL(/.*new/);

    await page.locator("data-testid=input-name").fill("foobar");

    await Promise.all([
      page.waitForResponse((res) => res.url().includes("/employee")),
      page.locator("input[type=submit]").click(),
    ]);

    // Make sure the updated values are reflected after the page is reloaded
    await page.reload();
    await expect(page.locator('text="foobar"')).toBeVisible();
  });

  test("Updating employee", async () => {
    const nameInput = page.locator("data-testid=input-name");
    const oldName = await page.getByRole("cell").last().textContent();

    const targetEmployeeIdLink = page
      .getByRole("row", { name: oldName! })
      .getByRole("cell")
      .first()
      .getByRole("link");

    // Render Input Element with employee name
    await targetEmployeeIdLink.click();
    await expect(nameInput).toBeVisible();
    await expect(await nameInput.inputValue()).toBe(oldName);

    // Fill new name and submit
    await nameInput.fill("bazfoobar");

    await Promise.all([
      page.waitForResponse((res) => res.url().includes("/employee")),
      page.locator("input[type=submit]").click(),
    ]);

    // Make sure the updated values are reflected after the page is reloaded
    await page.reload();
    await expect(page.getByRole("cell", { name: "bazfoobar" })).toBeVisible();
  });
  //test.fixme("Deleting employee", async () => {});
});
