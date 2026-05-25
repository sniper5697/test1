import { expect, test } from "@playwright/test";

const routeMetadata = [
  {
    href: "/",
    title: "홈 | Velora Voice",
    description:
      "차세대 AI 음성 비서로 비즈니스와 일상을 더 스마트하게 혁신하는 Velora Voice의 실시간 데모를 확인하세요.",
  },
  {
    href: "/about",
    title: "소개 | Velora Voice",
    description:
      "소통의 가치를 더하는 Velora Voice의 미션과, 음성 경험을 제품 수준으로 끌어올리는 팀의 기준을 소개합니다.",
  },
  {
    href: "/service",
    title: "서비스 | Velora Voice",
    description:
      "Velora Voice가 제공하는 고성능 AI 음성 솔루션, 핵심 기능, 적용 흐름과 기술 강점을 한 페이지에서 확인하세요.",
  },
  {
    href: "/faq",
    title: "FAQ | Velora Voice",
    description:
      "Velora Voice 데모 전 가장 많이 묻는 질문과 도입 전 확인해야 할 핵심 답변을 빠르게 살펴보세요.",
  },
  {
    href: "/login",
    title: "로그인 | Velora Voice",
    description:
      "Velora Voice 계정으로 로그인하여 실시간 음성 AI 데모와 개인화된 진입 흐름을 바로 이어가세요.",
  },
  {
    href: "/signup",
    title: "회원가입 | Velora Voice",
    description:
      "Velora Voice와 함께하는 스마트한 음성 AI 경험의 시작점으로, 데모 계정 생성 흐름을 빠르게 확인하세요.",
  },
];

test("routes expose unique titles and descriptions", async ({ page }) => {
  const seenDescriptions = new Set<string>();

  for (const current of routeMetadata) {
    await page.goto(current.href);
    await expect(page).toHaveTitle(current.title);

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content", current.description);
    seenDescriptions.add(current.description);
  }

  expect(seenDescriptions.size).toBe(routeMetadata.length);
});
