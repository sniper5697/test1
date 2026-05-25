# Delegation Round 03: CI Baseline

## Round Goal
- GitHub Actions 기반 최소 CI를 추가해 `unit -> typecheck -> build -> e2e`를 자동 실행한다.

## Success Criterion
- `push(main)` 및 `pull_request`에서 단일 workflow가 실행된다.
- `npm ci`, `npm run test:unit`, `npm run typecheck`, `npm run build`, `npm run test:e2e`가 같은 순서로 동작한다.
- 실패 시 Playwright report artifact를 남긴다.
- 로컬에서 동일 시퀀스가 green이다.

## Agent K: Implementation Guidance

### Workflow Plan
- 파일 경로: `.github/workflows/ci.yml`
- 단일 job `ci`
- trigger:
  - `push` on `main`
  - `pull_request`
- `concurrency.cancel-in-progress: true`

### Exact Steps
1. `actions/checkout@v4`
2. `actions/setup-node@v4`
   - `node-version: 20`
   - `cache: npm`
3. `.next/cache` restore
4. `npm ci`
5. `npm run test:unit`
6. `npm run typecheck`
7. `npm run build`
8. `npx playwright install --with-deps`
9. `npm run test:e2e`
10. failure 시 `playwright-report/`, `test-results/` artifact upload

### Notes
- `playwright.config.ts`가 이미 local webServer를 띄우므로 CI에서 별도 `npm run dev`는 불필요
- typecheck는 별도 script가 없으면 `npx tsc --noEmit`, 이번 라운드에서 `package.json`에 `typecheck` script 추가

## Agent C: Verification Gate

### Approval Criteria
- `npm ci` 성공
- `npm run test:unit` exit 0
- `tsc --noEmit` exit 0
- `next build` exit 0
- Playwright 전체 spec pass
- workflow가 `push(main)` 및 `pull_request` 둘 다에서 트리거됨

### Likely Failure Modes
- `package-lock.json` 불일치
- `next build` 시 env 요구
- Playwright webServer timeout
- headless chromium 차이로 locator 실패

### Approval Evidence
- GitHub Actions summary green
- Vitest pass log
- `tsc` success
- `next build` success
- Playwright artifact or success log

## Implemented Changes
- `.github/workflows/ci.yml`
- `package.json`
  - `typecheck` script 추가

## Local Validation
- `npm run test:unit` passed
- `npm run typecheck` passed
- `npm run build` passed
- `npm run test:e2e` passed

## Supervisor Decision
- 이번 CI baseline 라운드는 `완료`다.
- 저장소는 이제 로컬 기준으로 CI와 동일한 품질 시퀀스를 재현할 수 있다.
- 다음 라운드 후보:
  1. FAQ E2E interaction 보강
  2. auth form submit 의도 명시
  3. Figma 기준으로 보조 페이지 프레임 정리
