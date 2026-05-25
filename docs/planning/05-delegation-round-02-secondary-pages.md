# Delegation Round 02: Secondary Pages Baseline

## Round Goal
- `/about`, `/service`, `/faq`, `/login`, `/signup` 페이지를 stub 상태에서 실제 usable한 1차 baseline으로 끌어올리고 테스트로 닫는다.

## Success Criterion
- 다섯 개 보조 페이지가 홈과 같은 디자인 언어로 렌더링된다.
- 로그인/회원가입은 UI-only 범위를 유지한다.
- unit, typecheck, Playwright 검증이 모두 green이다.
- Agent C의 승인 판정을 회수한다.

## Agent G: Design Guidance

### About
- 목적: 회사 비전과 기술적 진정성 전달
- 필수 요소: vision hero, core values, story/philosophy, contact
- 카피 방향:
  - `사람과 기계 사이의 가장 자연스러운 연결, Velora가 만듭니다.`
  - `우리는 음성 AI의 새로운 기준을 정의합니다.`

### Service
- 목적: 실질적인 기능 가치와 적용 장면 설명
- 필수 요소: service hero, feature grid, usage flow, technical strengths, bottom demo CTA
- 카피 방향:
  - `0.1초의 지연도 허용하지 않는 초저지연 음성 엔진.`
  - `문맥을 이해하고 감정을 담는 진화된 TTS.`

### FAQ
- 목적: 데모 전 불확실성 제거
- 필수 요소: FAQ hero, question list, support CTA
- 지시:
  - 가독성 우선
  - 게시판형 텍스트 나열 금지

### Login / Signup
- 목적: UI-only 계정 진입 화면
- 필수 요소: 밝은 배경, 브랜드 일관성, form-centered auth layout
- 지시:
  - 기본 브라우저 느낌 금지
  - 모바일 키보드 상황에서도 버튼이 가려지지 않는 구조

## Agent K: Implementation Package

### Shared Additions
- `components/SiteHeader.tsx`
- `components/SiteFooter.tsx`
- `components/AuthCard.tsx`
- `components/FaqItem.tsx`
- `lib/page-content.ts`

### Page Upgrades
- `app/about/page.tsx`
- `app/service/page.tsx`
- `app/faq/page.tsx`
- `app/login/page.tsx`
- `app/signup/page.tsx`

### Tests
- page unit tests for all five routes
- `AuthCard`, `FaqItem` unit tests
- `e2e/secondary-pages.spec.ts`

### Risks
- homepage regression if shared layout changes are breaking
- auth pages accidentally gaining real logic
- mobile overflow on auth split layout

## Agent C: Verification Gate

### Required Journeys
- `/about`, `/service`, `/faq` direct visit and home return
- `/service` CTA -> `/#demo`
- `/login` <-> `/signup` cross-link
- mobile auth overflow 없음

### Approval Evidence
- `npm run test:unit` green
- `npx tsc --noEmit` green
- `npm run test:e2e` green

## Validation Evidence
- `npm run test:unit` passed
- `npx tsc --noEmit` passed
- `npm run test:e2e` passed

## Agent C Final Verdict
- `APPROVE`

### Remaining Risks
- FAQ open/close interaction은 unit test만 있고 E2E 클릭 검증은 아직 없음
- auth form submit 의도가 코드로 명시되지 않음
- `/faq` bottom CTA의 `/#demo` 이동은 아직 E2E 미검증

## Supervisor Decision
- 이번 라운드는 `완료`다.
- 보조 페이지 baseline은 승인 상태다.
- 다음 라운드는 CI baseline 구축으로 이동한다.
