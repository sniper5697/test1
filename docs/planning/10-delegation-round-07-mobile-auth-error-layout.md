# Delegation Round 07: Mobile Auth Error Layout Regression

## Goal

- 390px 모바일 뷰포트에서 auth validation 에러가 나타나도 레이아웃이 깨지지 않고 CTA 접근성이 유지됨을 증거로 닫는다.

## Scope

- `/login`, `/signup` mobile viewport `390x844`
- validation error 표시 중 no horizontal overflow
- field-level error visibility
- primary CTA button in-viewport 유지

## Delegated Guidance

### Agent G

- `APPROVE`
- 390px 기준으로 다음이 유지되어야 한다:
  - horizontal overflow 없음
  - 에러 메시지 영역의 `min-height` 유지
  - CTA fully visible
  - status message와 버튼 간 간격 유지
  - `.section-card` padding 안에서 outline/border가 잘리지 않음

### Agent K

- 구현 변경보다는 mobile regression E2E 증거 추가가 우선이라는 방향으로 좁혔다.
- mobile viewport에서 에러가 보이는 상태를 실제로 만들고, overflow와 CTA reachability를 확인하는 시나리오가 핵심이라고 정리했다.

### Agent C

- 최종 판정: `APPROVE`
- mobile auth error layout이 직접 증거로 확인됐고, broader gate도 모두 green이라고 평가했다.

## Integrated Changes

- `e2e/secondary-pages.spec.ts`
  - `mobile auth pages` 아래에 `validation errors stay readable and keep the primary CTA reachable` 시나리오 추가
  - `/login`, `/signup`에서 empty submit 후:
    - field-level error visible
    - no horizontal overflow
    - primary CTA still in viewport

## Verification

- `npm run test:unit` ✅
- `npm run typecheck` ✅
- `npm run build` ✅
- `npm run test:e2e` ✅

## Agent C Final Approval Summary

- `APPROVE`
- mobile 390px에서 auth error layout regression이 직접 증거로 닫혔다.
- 잔여 리스크:
  - 더 좁은 320px 뷰포트는 아직 미검증
  - landscape orientation 미검증
  - 모든 필드가 동시에 invalid인 최대 밀집 상태는 아직 미검증
  - visual snapshot baseline은 아직 없다

## Next Candidate Round

1. 320px 좁은 뷰포트 + 다중 에러 밀집 상태 점검
2. password-reveal 등 향후 mobile auth interaction 후보 정리
3. 접근성 시각 회귀를 위한 snapshot 도입 여부 판단
