# Delegation Round 08: Narrow Mobile Auth Density

## Goal

- `320x568` 좁은 모바일 뷰포트에서 auth validation 에러가 밀집되어도 레이아웃이 깨지지 않음을 증거로 닫는다.

## Scope

- `/login`, `/signup`
- viewport `320x568`
- empty submit 기반의 dense error stack
- no horizontal overflow
- field-level error visibility
- primary CTA in-viewport 유지

## Delegated Guidance

### Agent G

- `REVISE` 의견을 냈지만, 실제 기준은 명확했다.
- 320px에서 다음이 유지되어야 한다고 정리했다:
  - horizontal overflow 없음
  - dense Korean error string이 겹치지 않음
  - CTA fully visible
  - container padding 안에서 focus/border가 잘리지 않음
- 필요시 `<360px`에서 padding 축소를 제안했다.

### Agent K

- 구현보다는 320px dense-error E2E를 추가하는 방향으로 좁혔다.
- 핵심은 login 2개 에러, signup 3개 에러가 동시에 보이는 최대 밀집 상태를 직접 검증하는 것이라고 정리했다.

### Agent C

- 최종 판정: `APPROVE`
- 320px 회귀 시나리오가 직접 추가됐고, broader E2E suite도 green이라고 평가했다.

## Integrated Changes

- `e2e/secondary-pages.spec.ts`
  - `narrow mobile auth pages` describe 추가
  - viewport `320x568`
  - `/login` empty submit 후:
    - 2개 에러 visible
    - no horizontal overflow
    - primary CTA in viewport
  - `/signup` empty submit 후:
    - 3개 에러 visible
    - no horizontal overflow
    - primary CTA in viewport

## Verification

- `npm run test:e2e` ✅

## Agent C Final Approval Summary

- `APPROVE`
- 320px minimum-width class에서 auth dense-error regression이 직접 증거로 닫혔다.
- 잔여 리스크:
  - 321–374px intermediate width는 별도 미검증
  - 더 긴 i18n 문자열은 아직 미검증
  - 가상 키보드가 떠 있는 더 낮은 visible height는 아직 미검증
  - touch target size minimum은 아직 별도 검증하지 않았다

## Next Candidate Round

1. 낮은 높이 viewport 또는 landscape에 가까운 auth CTA reachability 점검
2. i18n 길이 증가 시 error wrapping 회귀 점검
3. touch target sizing/accessibility 점검
