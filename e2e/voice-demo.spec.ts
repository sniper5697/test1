import { expect, test } from "@playwright/test";
import { installMockVoiceApis } from "./support/mockVoiceApis";

test.describe("homepage voice demo", () => {
  test("completes the mocked speech roundtrip on the homepage", async ({ page }) => {
    await installMockVoiceApis(page, { transcript: "정확도 설명해줘" });
    await page.goto("/");

    const demo = page.locator("#demo");
    const toggle = demo.getByTestId("voice-toggle");

    await toggle.click();

    await expect(demo.getByTestId("voice-transcript")).toHaveText("정확도 설명해줘");
    await expect(demo.getByTestId("voice-reply")).toContainText("인식 결과를 빠르게 정리");
    await expect(demo).toHaveAttribute("data-state", "idle", { timeout: 3000 });
    await expect(demo.getByTestId("voice-status")).toHaveText(
      "체험 시작하기를 누르면 브라우저가 마이크 권한을 확인합니다.",
    );
  });

  test("shows an inline error when microphone permission is denied", async ({ page }) => {
    await installMockVoiceApis(page, { permissionDenied: true });
    await page.goto("/");

    const demo = page.locator("#demo");
    await demo.getByTestId("voice-toggle").click();

    await expect(demo).toHaveAttribute("data-state", "error");
    await expect(demo.getByRole("alert")).toContainText("마이크 권한이 필요합니다.");
    await expect(demo.getByRole("button", { name: "체험 시작하기" })).toBeVisible();
  });

  test("supports keyboard activation for the voice demo", async ({ page }) => {
    await installMockVoiceApis(page, { transcript: "속도 설명해줘" });
    await page.goto("/");

    const demo = page.locator("#demo");
    const toggle = demo.getByTestId("voice-toggle");

    await toggle.focus();
    await page.keyboard.press("Enter");

    await expect(demo.getByTestId("voice-transcript")).toHaveText("속도 설명해줘");
    await expect(demo.getByTestId("voice-reply")).toContainText("응답 전환 속도");
    await expect(demo).toHaveAttribute("data-state", "idle", { timeout: 3000 });
  });

  test("resets cleanly when the user stops mid-session", async ({ page }) => {
    await installMockVoiceApis(page, {
      transcript: "정지 테스트",
      resultDelayMs: 1000,
    });
    await page.goto("/");

    const demo = page.locator("#demo");
    const toggle = demo.getByTestId("voice-toggle");

    await toggle.click();
    await expect(demo.getByTestId("voice-status")).toHaveText("듣고 있어요...");
    await toggle.click();

    await expect(demo).toHaveAttribute("data-state", "idle");
    await expect(demo.getByTestId("voice-transcript")).toContainText(
      "마이크를 켜면 인식된 질문이 여기에 표시됩니다.",
    );
  });
});

test.describe("mobile homepage voice demo", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("keeps the voice demo reachable without horizontal overflow on mobile", async ({
    page,
  }) => {
    await installMockVoiceApis(page, { transcript: "모바일 데모" });
    await page.goto("/");

    const demo = page.locator("#demo");
    await demo.getByTestId("voice-toggle").click();
    await expect(demo.getByTestId("voice-transcript")).toHaveText("모바일 데모");

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    expect(hasHorizontalOverflow).toBe(false);
    await expect(demo.getByTestId("voice-toggle")).toBeInViewport();
  });
});
