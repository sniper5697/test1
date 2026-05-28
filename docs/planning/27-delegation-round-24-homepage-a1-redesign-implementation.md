# Delegation Round 24: Homepage A1 Redesign Implementation

## Goal

- `UMANO` 중심의 밝은 프리미엄 무드와 `dark product-stage demo`를 코드에 반영한다.
- 기존 홈 기능 semantics를 유지한다.
  - hero heading text 유지
  - `데모 보기` 링크 2개 유지
  - `#demo` same-page 이동 유지
  - 로그인/회원가입 라우트 유지
  - 모바일 가로 overflow 금지

## Delegated Guidance

### Agent G

- 밝은 에디토리얼 섹션과 어두운 데모 스테이지의 단절감을 최소화해야 한다.
- hero headline, CTA semantics, `#demo` 체험 흐름은 고정해야 한다.
- 전역 토큰 -> hero/editorial -> demo -> mobile hardening 순서가 적절하다.

### Agent K

- 구현 순서:
  - `app/globals.css`
  - `components/Hero.tsx`
  - `components/VoiceDemo.tsx`
  - `app/page.tsx`
- 가장 큰 기술 리스크는 모바일 가로 overflow와 dark demo section의 폭 관리다.

### Agent C

- 최우선 회귀 포인트:
  - hero heading text
  - CTA count and target
  - nav route reachability
  - mobile overflow
- 필수 게이트:
  - `npm run test:unit`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e -- --grep home`
  - `npm run test:smoke`

## Applied Changes

- `app/globals.css`
  - warm cream background, coral accent, editorial spacing, dark demo tokens 추가
- `components/Hero.tsx`
  - typography-led A1 hero와 premium panel visual 추가
- `components/VoiceDemo.tsx`
  - 밝은 카드형 데모를 dark product-stage layout으로 재구성
- `app/page.tsx`
  - 핵심 가치 / 활용 분야 / FAQ / final CTA / footer를 A1 tone으로 재구성

## Verification

- `npm run test:unit` 통과
- `npm run typecheck` 통과
- `npm run build` 통과
- `npm run test:e2e -- --grep home` 통과
- `npm run test:smoke` 통과

## Result

- 홈 baseline이 A1 리디자인 방향으로 반영되었다.
- 기능 semantics와 기존 quality gate는 유지되었다.
- 사용자 변경인 `AGENTS.md`, `docs/rules/`는 건드리지 않았다.
