import { test, expect, Page } from "@playwright/test";

let page: Page;

test.beforeAll(async ({ browser }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  page = await browser.newPage();
  await page.goto("profile");
});

test.afterAll(async () => {
  await page.close();
});

test.describe("Profile page", () => {
  test("Update profile", async () => {
    // Click the Confirm button in the dialog that appears when the request is successful.
    page.on("dialog", (dialog) => dialog.accept());

    const email = page.locator("input#email");
    const firstName = page.locator("input#first_name");
    const lastName = page.locator("input#last_name");
    const submitButton = page.locator("input[type=submit]");

    // Make sure the initial values
    await expect(email).toHaveValue("george.bluth@reqres.in");
    await expect(firstName).toHaveValue("George");
    await expect(lastName).toHaveValue("Bluth");
    await expect(submitButton).toHaveValue("Update");

    // Update the values
    await email.fill("john.doe@reqres.in");
    await firstName.fill("John");
    await lastName.fill("Doe");

    // Submit updated values
    await Promise.all([
      // Waits for the next request with the specified url
      page.waitForResponse((res) => res.url().includes("/user/1")),

      // Triggers the request
      expect(submitButton).toHaveValue("Submitting..."),
      submitButton.click(),
    ]);

    // Make sure the updated values are reflected after the page is reloaded
    await page.reload();

    await expect(email).toHaveValue("john.doe@reqres.in");
    await expect(firstName).toHaveValue("John");
    await expect(lastName).toHaveValue("Doe");
  });
});
