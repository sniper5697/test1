# Delegation Round 09: Low-Height Auth CTA Reachability

## Round Goal
- 낮은 세로 높이의 모바일 뷰포트에서도 auth 에러 상태에서 CTA 도달성이 유지되는지 검증한다.

## Success Criterion
- `/login`, `/signup`가 `375x550`과 `320x480` 조건에서
  - 가로 overflow 없이 렌더링되고
  - 에러 메시지가 읽히며
  - CTA가 자연스럽게 보이거나 최소한 스크롤 후 도달 가능해야 한다.

## Delegation Summary

### Agent G
- Verdict: `REVISE`
- 포인트:
  - 짧은 높이에서는 장식 영역이 form 위에 과하게 쌓일 수 있다.
  - 실패 시 모바일에서 form-first 배치와 세로 패딩 축소가 우선 대응이다.

### Agent K
- 회신은 장문이었지만 구현 방향은 일관됐다.
- 포인트:
  - 낮은 높이 회귀는 Playwright로 분리 검증하는 것이 맞다.
  - extreme short case는 `scrollIntoViewIfNeeded()` 허용이 실용적이다.

### Agent C
- Verdict: `APPROVE` 조건 제시 후 최종 승인
- 게이트:
  - `375x550`에서는 CTA가 자연스럽게 보일 것
  - `320x480`에서는 스크롤 후 CTA 도달 가능성을 확인할 것
  - 스타일 수치가 아니라 viewport/overflow 기준으로 검증할 것

## Supervisor Action
- `e2e/secondary-pages.spec.ts`에 `low-height auth pages` 구간을 추가했다.
- 검증 시나리오:
  - `375x550`: `/login`, `/signup` empty submit 후 에러 메시지와 CTA in viewport 확인
  - `320x480`: `/signup` empty submit 후 `scrollIntoViewIfNeeded()` 뒤 CTA in viewport 확인

## Evidence
- `npm run test:e2e -- --grep "low-height auth pages"` 통과

## Result
- Verdict: `APPROVE`
- 레이아웃 수정 없이 현재 baseline이 저높이 모바일 조건을 통과했다.

## Next Candidate
- 실제 홈 음성 데모 구현에 앞서 Playwright 음성 검증 하네스를 준비한다.
