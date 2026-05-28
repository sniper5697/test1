import { expect, test } from "@playwright/test";

test("homepage shows hero and same-page demo CTA behavior", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "실시간 음성 AI를 서비스에 연결하는 Voice Interface Company",
    }),
  ).toBeVisible();

  await page.getByRole("link", { name: "데모 보기" }).first().click();

  await expect(page).toHaveURL(/#demo$/);
  await expect(page.locator("#demo")).toBeInViewport();
});

test("bottom CTA also moves the user to the demo section", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "데모 보기" }).last().click();

  await expect(page).toHaveURL(/#demo$/);
  await expect(page.locator("#demo")).toBeInViewport();
});

test("navigation links reach login and signup pages", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "로그인" }).click();
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("heading", { name: "로그인" })).toBeVisible();

  await page.goto("/");

  await page.getByRole("link", { name: "회원가입" }).click();
  await expect(page).toHaveURL(/\/signup$/);
  await expect(page.getByRole("heading", { name: "회원가입" })).toBeVisible();
});

test.describe("mobile homepage", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("supports the demo journey without horizontal overflow on mobile", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: "실시간 음성 AI를 서비스에 연결하는 Voice Interface Company",
      }),
    ).toBeVisible();

    await page.getByRole("link", { name: "데모 보기" }).first().click();
    await expect(page.locator("#demo")).toBeInViewport();

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    expect(hasHorizontalOverflow).toBe(false);
  });
});
