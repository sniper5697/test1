# Delegation Round 04: FAQ/Auth Verification Hardening

## Goal

- 남아 있던 FAQ 및 auth UI 검증 리스크를 닫고 Agent C 승인까지 받는다.

## Scope

- `/faq` 아코디언 상호작용 E2E
- `/faq` 하단 CTA `/#demo` 이동 E2E
- `/login`, `/signup` UI-only form submit 시 no navigation/no reload 보장

## Delegated Guidance

### Agent G

- `REVISE`
- auth form은 UI-only 화면이므로 submit 시 페이지 이동/리로드가 없어야 한다.
- FAQ 아코디언은 모바일/데스크톱 모두 일관된 disclosure 동작이 필요하다.
- FAQ CTA 문구는 더 구체화할 수 있지만, 이번 라운드에서는 동작 보장이 우선이다.
- `aria-controls` 등 접근성 보강을 권장했다.

### Agent K

- `APPROVE`
- `components/FaqItem.tsx`에 ARIA 기반 disclosure 패턴을 보강하라고 제안했다.
- `app/login/page.tsx`, `app/signup/page.tsx`의 form submit 기본 동작을 차단하라고 제안했다.
- Playwright는 FAQ open/close, FAQ CTA, auth no-navigation 시나리오를 추가하라고 제안했다.

### Agent C

- 초안 판정: `REVISE`
- 요구 증거:
  - FAQ open/close E2E
  - FAQ CTA `/#demo` E2E
  - auth submit 시 no navigation/no reload E2E
- 최종 판정: `APPROVE`

## Integrated Changes

- `components/FaqItem.tsx`
  - `aria-expanded`, `aria-controls`, `role="region"`, `aria-labelledby` 보강
  - `id` prop 기반의 안정적인 trigger/panel id 추가
- `components/FaqItem.test.tsx`
  - 초기 닫힘 상태, 클릭 후 열림 상태, named region 접근성 검증 추가
- `app/faq/page.tsx`
  - `FaqItem`에 안정적인 `id` 전달
- `app/login/page.tsx`
  - `"use client"` 추가
  - form에 `aria-label="로그인 폼"` 및 `onSubmit={(event) => event.preventDefault()}`
- `app/signup/page.tsx`
  - `"use client"` 추가
  - form에 `aria-label="회원가입 폼"` 및 `onSubmit={(event) => event.preventDefault()}`
- `e2e/secondary-pages.spec.ts`
  - FAQ 아코디언 open/close/re-close 시나리오 추가
  - FAQ CTA `/#demo` 이동 검증 추가
  - login/signup submit 시 URL 유지 및 no navigation 검증 추가
  - signup password selector exact match 보강

## Root Cause Notes

- `/login`과 `/signup`은 서버 컴포넌트 페이지에 직접 이벤트 핸들러를 넣으면서 prerender 오류가 났다.
- 이 문제 때문에 auth route 렌더링과 일부 클라이언트 인터랙션 검증이 함께 흔들렸다.
- 해결은 해당 페이지를 client component로 전환하고 form submit 의도를 명시하는 것이었다.
- FAQ 클릭 실패는 코드 자체보다 오래 떠 있던 기존 dev 서버가 최신 변경을 반영하지 못한 상태와 겹쳐 있었다. 서버 재시작 후 정상 동작을 확인했다.

## Verification

- `npm run test:unit` ✅
- `npm run typecheck` ✅
- `npm run build` ✅
- `npm run test:e2e` ✅

## Agent C Final Approval Summary

- `APPROVE`
- FAQ ARIA 패턴과 unit/E2E 증거가 충분하다.
- auth submit prevention이 코드와 E2E에서 확인됐다.
- 잔여 리스크:
  - keyboard navigation E2E는 아직 없다.
  - auth validation feedback은 아직 없다.
  - `aria-controls`가 닫힘 상태에서 null-rendered panel을 가리키는 점은 차후 a11y 점검 시 다시 볼 수 있다.

## Next Candidate Round

1. 보조 페이지 Figma 프레임 정리
2. auth validation feedback UI-only 패턴 설계 및 테스트
3. FAQ keyboard interaction E2E 보강
