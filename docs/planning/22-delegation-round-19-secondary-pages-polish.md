# Round 19 - Secondary Pages Polish

## Goal
- `about`, `service`, `faq`, `login`, `signup` 페이지를 홈과 같은 CTA 리듬, 카피 톤, 간격 규칙으로 정렬한다.

## Delegation
- Agent G
  - secondary page도 homepage와 같은 product-marketing 톤 유지
  - 공통 CTA 구조와 shared spacing rhythm 우선
- Agent K
  - 공통 CTA component와 shared CSS utility 중심의 최소 수정
  - secondary pages E2E 기준 동시 갱신
- Agent C
  - CTA destination, hierarchy, spacing rhythm, auth split-panel parity 검증

## Changed Files
- [components/SecondaryPageCta.tsx](/Users/macminim2-choi/PROJECT/Job1/components/SecondaryPageCta.tsx)
- [app/globals.css](/Users/macminim2-choi/PROJECT/Job1/app/globals.css)
- [app/about/page.tsx](/Users/macminim2-choi/PROJECT/Job1/app/about/page.tsx)
- [app/service/page.tsx](/Users/macminim2-choi/PROJECT/Job1/app/service/page.tsx)
- [app/faq/page.tsx](/Users/macminim2-choi/PROJECT/Job1/app/faq/page.tsx)
- [app/login/LoginPageClient.tsx](/Users/macminim2-choi/PROJECT/Job1/app/login/LoginPageClient.tsx)
- [app/signup/SignupPageClient.tsx](/Users/macminim2-choi/PROJECT/Job1/app/signup/SignupPageClient.tsx)
- [e2e/secondary-pages.spec.ts](/Users/macminim2-choi/PROJECT/Job1/e2e/secondary-pages.spec.ts)

## Result
- `SecondaryPageCta`로 marketing secondary page CTA band를 공통화했다.
- `secondary-section-spacing`, `secondary-grid-*`, `secondary-surface-card`, `secondary-link-button`, `auth-intro-card`, `auth-intro-actions`를 추가해 visual rhythm을 공통화했다.
- `about`에 `/#demo -> /service` CTA band를 새로 추가했다.
- `service`, `faq`는 CTA copy와 secondary link를 homepage funnel에 맞춰 재정렬했다.
- `login`, `signup`은 영어 eyebrow를 제거하고 intro panel에 `데모 보기` + `서비스 보기` CTA를 추가했다.
- Agent C가 지적한 inner card border drift도 즉시 수정했다.

## Verification
- `npm run typecheck`
- `npm run build`
- `npx playwright test e2e/secondary-pages.spec.ts`
- `npm run test:unit`

## Agent C Verdict
- `APPROVE`

## Notes
- secondary page CTA destination lock:
  - `about` -> primary `/#demo`, secondary `/service`
  - `service` -> primary `/#demo`, secondary `/faq`
  - `faq` -> primary `/#demo`, secondary `/service`
  - `login`/`signup` intro -> primary `/#demo`, secondary `/service`
