import { test, expect, Page } from "@playwright/test";

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto("count_with_history");
});

test.describe("Count history page", () => {
  test("increase count when click `+`", async () => {
    await page.locator("data-testid=button-increase").click();
    const counter = await page.locator("data-testid=count");
    await expect(counter).toContainText("1");
  });

  test("decrease count when click `-`", async () => {
    await page.locator("data-testid=button-decrease").click();
    const counter = await page.locator("data-testid=count");
    await expect(counter).toContainText("0");
  });

  test("history focus 2nd row when click Undo", async () => {
    await page.locator("data-testid=button-undo").click();
    const decreaseButton = await page.locator("data-testid=button-decrease");
    const increaseButton = await page.locator("data-testid=button-increase");
    const targetRow = await page.locator("tr >> nth=1 >> td");
    await expect(targetRow).toContainText("1");
    await expect(targetRow).toHaveAttribute("style", "color: blue;");
    await expect(decreaseButton).toBeDisabled();
    await expect(increaseButton).toBeDisabled();
  });

  test("history focus 1st row when click Redo", async () => {
    const redoButton = await page.locator("data-testid=button-redo");
    await redoButton.click();
    const targetRow = await page.locator("tr >> nth=0 >> td");
    await expect(targetRow).toContainText("0");
    await expect(targetRow).toHaveAttribute("style", "color: blue;");
    await expect(redoButton).toBeDisabled();
  });

  test("clear history", async () => {
    await page.locator("data-testid=button-clear-history").click();
    const targetRowCount = await page.locator("tr").count();
    await expect(targetRowCount).toBe(1);
  });
});
