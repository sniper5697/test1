import { expect, test } from "@playwright/test";

test("marketing routes render and logo returns to the homepage", async ({ page }) => {
  const cases = [
    { href: "/about", heading: "Velora Voice를 만든 팀의 방향과 기준" },
    { href: "/service", heading: "실시간 음성 AI를 실제 제품 경험처럼 보여주는 구조" },
    { href: "/faq", heading: "데모 전 가장 많이 묻는 질문을 한 자리에서 정리합니다" },
  ];

  for (const current of cases) {
    await page.goto(current.href);
    await expect(page.getByRole("heading", { name: current.heading })).toBeVisible();
    await page.getByRole("link", { name: "Velora Voice 홈으로" }).first().click();
    await expect(page).toHaveURL(/\/$/);
  }
});

test("service CTA returns to the homepage demo section", async ({ page }) => {
  await page.goto("/service");

  await page.getByRole("link", { name: "데모 보기" }).click();

  await expect(page).toHaveURL(/\/#demo$/);
  await expect(page.locator("#demo")).toBeInViewport();
});

test("auth routes render forms and link to each other", async ({ page }) => {
  await page.goto("/login");

  await expect(page.getByRole("heading", { name: "로그인" })).toBeVisible();
  await expect(page.getByLabel("이메일")).toBeVisible();
  await expect(page.getByLabel("비밀번호")).toBeVisible();
  await page.getByRole("link", { name: "회원가입" }).last().click();

  await expect(page).toHaveURL(/\/signup$/);
  await expect(page.getByRole("heading", { name: "회원가입" })).toBeVisible();
  await expect(page.getByLabel("이름")).toBeVisible();
  await expect(page.getByLabel("비밀번호 확인")).toBeVisible();
  await page.getByRole("link", { name: "로그인" }).last().click();

  await expect(page).toHaveURL(/\/login$/);
});

test("faq accordion toggles and CTA returns to the homepage demo section", async ({ page }) => {
  await page.goto("/faq");

  const trigger = page.getByRole("button", {
    name: "이 데모는 어떤 음성 AI 기능을 보여주나요?",
  });

  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("region", {
      name: "이 데모는 어떤 음성 AI 기능을 보여주나요?",
    }),
  ).toBeVisible();

  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(
    page.getByRole("region", {
      name: "이 데모는 어떤 음성 AI 기능을 보여주나요?",
    }),
  ).toHaveCount(0);

  await page.getByRole("link", { name: "데모 보기" }).click();
  await expect(page).toHaveURL(/\/#demo$/);
});

test("faq supports keyboard disclosure behavior", async ({ page }) => {
  await page.goto("/faq");

  const trigger = page.getByRole("button", {
    name: "이 데모는 어떤 음성 AI 기능을 보여주나요?",
  });

  for (let index = 0; index < 12; index += 1) {
    await page.keyboard.press("Tab");
    const focused = await trigger.evaluate(
      (element) => element === element.ownerDocument.activeElement,
    );

    if (focused) {
      break;
    }
  }

  await expect(trigger).toBeFocused();
  await page.keyboard.press("Space");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("region", {
      name: "이 데모는 어떤 음성 AI 기능을 보여주나요?",
    }),
  ).toBeVisible();
  await expect(trigger).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(
    page.getByRole("region", {
      name: "이 데모는 어떤 음성 AI 기능을 보여주나요?",
    }),
  ).toHaveCount(0);
  await expect(trigger).toBeFocused();

  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
});

test.describe("mobile auth pages", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("login and signup forms do not overflow horizontally", async ({ page }) => {
    for (const href of ["/login", "/signup"]) {
      await page.goto(href);

      const hasHorizontalOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      expect(hasHorizontalOverflow).toBe(false);
    }
  });

  test("validation errors stay readable and keep the primary CTA reachable", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: "로그인" }).click();

    const loginOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    expect(loginOverflow).toBe(false);
    await expect(page.getByText("진입을 위해 이메일이 필요합니다.")).toBeVisible();
    await expect(page.getByText("비밀번호를 입력해주세요.")).toBeVisible();
    await expect(page.getByRole("button", { name: "로그인" })).toBeInViewport();

    await page.goto("/signup");
    await page.getByRole("button", { name: "회원가입" }).click();

    const signupOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    expect(signupOverflow).toBe(false);
    await expect(page.getByText("이름을 입력해주세요.")).toBeVisible();
    await expect(page.getByText("진입을 위해 이메일이 필요합니다.")).toBeVisible();
    await expect(page.getByText("비밀번호를 입력해주세요.")).toBeVisible();
    await expect(page.getByRole("button", { name: "회원가입" })).toBeInViewport();
  });
});

test.describe("narrow mobile auth pages", () => {
  test.use({ viewport: { width: 320, height: 568 } });

  test("dense validation errors remain readable without horizontal overflow", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: "로그인" }).click();

    const loginOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    expect(loginOverflow).toBe(false);
    await expect(page.getByText("진입을 위해 이메일이 필요합니다.")).toBeVisible();
    await expect(page.getByText("비밀번호를 입력해주세요.")).toBeVisible();
    await expect(page.getByRole("button", { name: "로그인" })).toBeInViewport();

    await page.goto("/signup");
    await page.getByRole("button", { name: "회원가입" }).click();

    const signupOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    expect(signupOverflow).toBe(false);
    await expect(page.getByText("이름을 입력해주세요.")).toBeVisible();
    await expect(page.getByText("진입을 위해 이메일이 필요합니다.")).toBeVisible();
    await expect(page.getByText("비밀번호를 입력해주세요.")).toBeVisible();
    await expect(page.getByRole("button", { name: "회원가입" })).toBeInViewport();
  });
});

test.describe("low-height auth pages", () => {
  test.use({ viewport: { width: 375, height: 550 } });

  test("dense errors keep the CTA naturally reachable at reduced height", async ({
    page,
  }) => {
    for (const scenario of [
      {
        href: "/login",
        submitLabel: "로그인",
        errors: ["진입을 위해 이메일이 필요합니다.", "비밀번호를 입력해주세요."],
      },
      {
        href: "/signup",
        submitLabel: "회원가입",
        errors: [
          "이름을 입력해주세요.",
          "진입을 위해 이메일이 필요합니다.",
          "비밀번호를 입력해주세요.",
        ],
      },
    ]) {
      await page.goto(scenario.href);
      await page.getByRole("button", { name: scenario.submitLabel }).click();

      const hasHorizontalOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      expect(hasHorizontalOverflow).toBe(false);

      for (const errorText of scenario.errors) {
        await expect(page.getByText(errorText)).toBeVisible();
      }

      await expect(page.getByRole("button", { name: scenario.submitLabel })).toBeInViewport();
    }
  });

  test("extreme short viewport still allows the CTA to be scrolled into view", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 480 });
    await page.goto("/signup");
    await page.getByRole("button", { name: "회원가입" }).click();

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    expect(hasHorizontalOverflow).toBe(false);
    await expect(page.getByText("이름을 입력해주세요.")).toBeVisible();
    await expect(page.getByText("진입을 위해 이메일이 필요합니다.")).toBeVisible();
    await expect(page.getByText("비밀번호를 입력해주세요.")).toBeVisible();

    const cta = page.getByRole("button", { name: "회원가입" });
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toBeInViewport();
  });
});

test.describe("auth submit behavior", () => {
  test("login and signup forms do not navigate on submit", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("이메일").fill("name@company.com");
    await page.getByLabel("비밀번호").fill("password");

    const loginNavigation = page.waitForNavigation({ timeout: 2000 }).catch(() => null);
    await page.getByRole("button", { name: "로그인" }).click();
    await expect(page).toHaveURL(/\/login$/);
    await expect(await loginNavigation).toBeNull();

    await page.goto("/signup");
    await page.getByLabel("이름").fill("테스트 사용자");
    await page.getByLabel("이메일").fill("name@company.com");
    await page.getByLabel("비밀번호", { exact: true }).fill("password");
    await page.getByLabel("비밀번호 확인").fill("password");

    const signupNavigation = page.waitForNavigation({ timeout: 2000 }).catch(() => null);
    await page.getByRole("button", { name: "회원가입" }).click();
    await expect(page).toHaveURL(/\/signup$/);
    await expect(await signupNavigation).toBeNull();
  });

  test("auth forms show validation feedback and clear it after valid resubmit", async ({
    page,
  }) => {
    await page.goto("/login");
    const emptyLoginNavigation = page.waitForNavigation({ timeout: 1500 }).catch(() => null);
    await page.getByRole("button", { name: "로그인" }).click();
    await expect(await emptyLoginNavigation).toBeNull();
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByText("진입을 위해 이메일이 필요합니다.")).toHaveAttribute(
      "role",
      "alert",
    );
    await expect(page.getByText("비밀번호를 입력해주세요.")).toHaveAttribute(
      "role",
      "alert",
    );

    await page.getByLabel("이메일").fill("notanemail");
    await page.getByLabel("비밀번호").fill("password123");
    const invalidLoginNavigation = page.waitForNavigation({ timeout: 1500 }).catch(() => null);
    await page.getByRole("button", { name: "로그인" }).click();
    await expect(await invalidLoginNavigation).toBeNull();
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByText("올바른 이메일 형식을 입력해주세요.")).toHaveAttribute(
      "role",
      "alert",
    );

    await page.getByLabel("이메일").fill("name@company.com");
    await page.getByLabel("비밀번호").fill("password123");
    await page.getByRole("button", { name: "로그인" }).click();
    await expect(page.getByText("진입을 위해 이메일이 필요합니다.")).toHaveCount(0);
    await expect(page.getByText("비밀번호를 입력해주세요.")).toHaveCount(0);
    await expect(page.getByText("올바른 이메일 형식을 입력해주세요.")).toHaveCount(0);
    await expect(page.getByText("데모 권한 활성화 준비가 완료되었습니다.")).toHaveAttribute(
      "role",
      "status",
    );

    await page.goto("/signup");
    await page.getByLabel("이름").fill("테스트 사용자");
    await page.getByLabel("이메일").fill("name@company.com");
    await page.getByLabel("비밀번호", { exact: true }).fill("password123");
    await page.getByLabel("비밀번호 확인").fill("password321");
    await page.getByRole("button", { name: "회원가입" }).click();
    await expect(page.getByText("비밀번호가 서로 일치해야 합니다.")).toHaveAttribute(
      "role",
      "alert",
    );

    await page.getByLabel("이메일").fill("notanemail");
    await page.getByLabel("비밀번호 확인").fill("password123");
    const invalidSignupNavigation = page.waitForNavigation({ timeout: 1500 }).catch(() => null);
    await page.getByRole("button", { name: "회원가입" }).click();
    await expect(await invalidSignupNavigation).toBeNull();
    await expect(page).toHaveURL(/\/signup$/);
    await expect(page.getByText("올바른 이메일 형식을 입력해주세요.")).toHaveAttribute(
      "role",
      "alert",
    );

    await page.getByLabel("이메일").fill("name@company.com");
    await page.getByLabel("비밀번호 확인").fill("password123");
    await page.getByRole("button", { name: "회원가입" }).click();
    await expect(page.getByText("비밀번호가 서로 일치해야 합니다.")).toHaveCount(0);
    await expect(page.getByText("올바른 이메일 형식을 입력해주세요.")).toHaveCount(0);
    await expect(page.getByText("데모 계정 생성 흐름이 준비되었습니다.")).toHaveAttribute(
      "role",
      "status",
    );
  });
});
