import { expect, test } from "@playwright/test";

test("@prod-smoke built homepage renders hero, CTA, and demo without console errors", async ({
  page,
}, testInfo) => {
  const consoleErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "실시간 음성 AI를 더 빠르고 정확하게" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "데모 보기" }).first()).toBeVisible();
  await page.screenshot({
    path: testInfo.outputPath("prod-home-hero.png"),
    fullPage: false,
  });

  await page.getByRole("link", { name: "데모 보기" }).first().click();
  await expect(page).toHaveURL(/#demo$/);
  await expect(page.locator("#demo")).toBeInViewport();
  await expect(page.locator("#demo")).toContainText("말하는 순간 바로 보이는 실시간 음성 인터랙션");
  await expect(page.getByTestId("voice-toggle")).toBeVisible();
  await page.screenshot({
    path: testInfo.outputPath("prod-home-demo.png"),
    fullPage: false,
  });

  expect(consoleErrors).toEqual([]);
});

test("@prod-smoke built key routes render their primary headings", async ({ page }) => {
  const cases = [
    { href: "/about", heading: "Velora Voice를 만든 팀의 방향과 기준", title: "소개 | Velora Voice" },
    { href: "/service", heading: "실시간 음성 AI를 실제 제품 경험처럼 보여주는 구조", title: "서비스 | Velora Voice" },
    { href: "/faq", heading: "데모 전 가장 많이 묻는 질문을 한 자리에서 정리합니다", title: "FAQ | Velora Voice" },
    { href: "/login", heading: "로그인", title: "로그인 | Velora Voice" },
    { href: "/signup", heading: "회원가입", title: "회원가입 | Velora Voice" },
  ];

  for (const current of cases) {
    const response = await page.goto(current.href);
    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { name: current.heading })).toBeVisible();
    await expect(page).toHaveTitle(current.title);
  }
});

test.describe("@prod-smoke built mobile homepage", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("renders hero CTA without horizontal overflow", async ({ page }, testInfo) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "실시간 음성 AI를 더 빠르고 정확하게" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "데모 보기" }).first()).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    expect(hasHorizontalOverflow).toBe(false);
    await page.screenshot({
      path: testInfo.outputPath("prod-home-mobile.png"),
      fullPage: false,
    });
  });
});
