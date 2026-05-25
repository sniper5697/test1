# Delegation Round 06: FAQ Keyboard Hardening

## Goal

- `/faq` disclosure가 키보드 기준으로도 안정적으로 동작함을 증거로 닫고 Agent C 승인까지 받는다.

## Scope

- Tab으로 FAQ trigger reachability 확인
- Space / Enter로 disclosure open
- Escape로 close 및 focus return
- focus-visible 시각 피드백 추가

## Delegated Guidance

### Agent G

- `APPROVE`
- Tab / Shift+Tab으로 질문 버튼을 순차 탐색할 수 있어야 한다.
- Enter / Space activation, visible focus, 모바일 외부 키보드 parity를 요구했다.

### Agent K

- 방향만 회수했고, 구현은 최소 변경으로 유지했다.
- 기존 native button disclosure를 유지하면서 Escape close 쪽을 보강하는 전략으로 좁혔다.

### Agent C

- 게이트 초안: `REVISE`
- 요구 증거:
  - Tab reachability
  - Space / Enter open
  - Escape close + focus return
  - pointer event가 아닌 keyboard-driven E2E
- 최종 판정: `APPROVE`

## Integrated Changes

- `components/FaqItem.tsx`
  - `useRef` 추가
  - `Escape` 입력 시 open panel close + trigger focus return
  - `faq-trigger` class 추가
- `components/FaqItem.test.tsx`
  - Escape close + focus return unit test 추가
- `app/globals.css`
  - `.faq-trigger:focus-visible` 스타일 추가
- `e2e/secondary-pages.spec.ts`
  - `faq supports keyboard disclosure behavior` 시나리오 추가
  - Tab 순회 후 trigger focus 확인
  - Space open, Escape close, Enter reopen 검증

## Verification

- `npm run test:unit` ✅
- `npm run typecheck` ✅
- `npm run build` ✅
- `npm run test:e2e` ✅

## Agent C Final Approval Summary

- `APPROVE`
- focus-visible, Escape close, focus return, keyboard-driven E2E가 모두 확인됐다.
- 잔여 리스크:
  - 실제 스크린리더 announcement smoke test는 아직 없다.
  - 여러 패널이 동시에 열리는 경우 Escape 동작 정책은 더 명확히 할 수 있다.
  - click 후 Escape 같은 mixed interaction edge case는 추가 가능하다.
  - 고대비 모드에서 focus outline 시각 확인은 남아 있다.

## Next Candidate Round

1. 모바일 auth error layout 회귀 점검
2. 실제 auth 백엔드 연동 전 UI 상태 정리
3. 스크린리더/고대비 접근성 확인 범위 정의
