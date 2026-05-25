# Delegation Round 05: Auth Validation Feedback

## Goal

- `/login`과 `/signup`에 UI-only validation feedback layer를 추가하고 Agent C 승인까지 받는다.

## Scope

- empty submit 에러
- invalid email format 에러
- signup password mismatch 에러
- valid resubmit 시 에러 제거 및 status 메시지
- no navigation/no reload 계약 유지

## Delegated Guidance

### Agent G

- `APPROVE`
- invalid/empty 입력은 submit 시 검증하고, 한 번 에러가 생긴 뒤에는 수정 과정에서 즉시 피드백을 갱신하라고 제안했다.
- field-level feedback을 우선하고, status 메시지는 낙관적이되 과장되지 않게 유지하라고 제안했다.
- 모바일에서는 에러 영역 높이를 예약해 레이아웃 점프를 줄이라고 제안했다.

### Agent K

- 기존 `/login`, `/signup` 페이지에 최소 상태를 추가하는 방향을 제안했다.
- 공통 validation 유틸을 두고, 페이지 단에서 상태와 submit handling을 유지하는 구성을 제안했다.
- 접근성 훅으로 `aria-invalid`, `aria-describedby`, `role=alert`, `role=status`를 권장했다.

### Agent C

- 초기 판정: `REVISE`
- 요구 증거:
  - login empty submit 에러
  - signup empty submit 에러
  - invalid email format 양쪽 페이지
  - signup password mismatch
  - valid resubmit 후 stale error 제거
  - no navigation/no reload 유지
- 최종 판정: `APPROVE`

## Integrated Changes

- `lib/auth-validation.ts`
  - login/signup 공통 validation 함수 추가
- `app/login/page.tsx`
  - client state 추가
  - `aria-invalid`, `aria-describedby`, `role=alert`, `role=status` 기반 피드백 추가
  - valid submit 시 `데모 권한 활성화 준비가 완료되었습니다.` 메시지 표시
- `app/signup/page.tsx`
  - client state 추가
  - 이름/이메일/비밀번호/비밀번호 확인 에러 처리 추가
  - valid submit 시 `데모 계정 생성 흐름이 준비되었습니다.` 메시지 표시
- `app/login/page.test.tsx`
  - empty submit, invalid email, valid resubmit clear 테스트 추가
- `app/signup/page.test.tsx`
  - empty submit, invalid email, password mismatch, valid resubmit clear 테스트 추가
- `e2e/secondary-pages.spec.ts`
  - auth validation feedback E2E 추가

## Verification

- `npm run test:unit` ✅
- `npm run typecheck` ✅
- `npm run build` ✅
- `npm run test:e2e` ✅

## Agent C Final Approval Summary

- `APPROVE`
- ARIA semantics, state clearing, no-navigation contract이 모두 증거로 확인됐다.
- 잔여 리스크:
  - 실제 백엔드 auth 에러는 아직 범위 밖이다.
  - assistive technology 실기 smoke test는 아직 없다.
  - password strength feedback은 아직 없다.
  - 모바일에서 긴 에러 문자열의 시각적 레이아웃은 추가 확인 가능하다.

## Next Candidate Round

1. FAQ keyboard interaction E2E
2. 모바일 auth error layout 회귀 점검
3. 실제 auth 백엔드 연동 전 UI 상태 정리
