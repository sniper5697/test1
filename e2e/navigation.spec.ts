import { expect, test } from "@playwright/test";

const routeCases = [
  { href: "/", activeLabel: "홈" },
  { href: "/about", activeLabel: "소개" },
  { href: "/service", activeLabel: "서비스" },
  { href: "/faq", activeLabel: "FAQ" },
  { href: "/login", activeLabel: "로그인" },
  { href: "/signup", activeLabel: "회원가입" },
];

test.describe("global navigation accessibility", () => {
  test("skip link becomes visible and moves focus to the main content landmark", async ({
    page,
  }) => {
    await page.goto("/service");

    await page.keyboard.press("Tab");

    const skipLink = page.getByRole("link", { name: "본문으로 바로가기" });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
    await skipLink.press("Enter");

    await expect(page.locator("#main-content")).toBeFocused();
  });

  test("each route exposes a single main landmark and exactly one active nav item", async ({
    page,
  }) => {
    for (const current of routeCases) {
      await page.goto(current.href);

      const navigation = page.getByRole("navigation", { name: "주요 메뉴" });

      await expect(page.locator("main#main-content")).toHaveCount(1);
      await expect(navigation).toHaveCount(1);
      await expect(
        navigation.getByRole("link", { name: current.activeLabel }),
      ).toHaveAttribute("aria-current", "page");

      await expect(page.locator("[aria-current='page']")).toHaveCount(1);
    }
  });
});
