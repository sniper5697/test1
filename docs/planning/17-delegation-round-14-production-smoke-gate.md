# Delegation Round 14: Production Smoke Gate

## Round Goal
- release 직전 기준으로 `next start`에서 실제 빌드 결과가 살아 있는지 확인하는 production smoke gate를 추가한다.

## Success Criterion
- smoke gate는 `next dev`가 아니라 `next build + next start` 기준으로 동작한다.
- 홈 hero, CTA, `#demo`, 핵심 child routes가 built app에서 렌더링된다.
- desktop/mobile smoke와 console error 0 기준이 artifact와 함께 남는다.

## Delegation Summary

### Agent G
- release smoke에서는 디자인 재작업보다 visible surface 확인이 중요하다.
- 최소 확인 포인트:
  - 홈 hero/brand
  - voice demo idle surface
  - nav child routes
  - auth entry points
  - mobile overflow 없음

### Agent K
- 가장 적절한 라운드 목표는 built app production smoke gate 추가다.
- 변경 파일 축:
  - `.github/workflows/ci.yml`
  - `package.json`
  - 별도 prod smoke Playwright spec
- 핵심 passing criteria:
  - dedicated smoke job green
  - built app가 200/DOM render를 보장

### Agent C
- smoke gate must prove:
  - built app `/` 200
  - hero, CTA, nav visible
  - CTA 클릭 후 demo section reachable
  - initial load console error 0
- out of scope:
  - live STT/TTS backend
  - full regression replacement
  - Lighthouse
- approve evidence:
  - `next start` 기반 CI step
  - desktop screenshot
  - mobile screenshot
  - console error 0 assertion

## Supervisor Action
- `package.json`
  - `test:e2e`에서 `@prod-smoke`를 제외
  - `test:smoke` 추가
- `playwright.prod.config.ts`
  - production smoke 전용 config 추가
  - `next start -- --hostname 127.0.0.1 --port 3100`
- `e2e/homepage.prod.spec.ts`
  - desktop hero/demo smoke
  - built child route heading smoke
  - mobile hero/CTA/no-overflow smoke
  - pass artifact screenshot 저장
- `.github/workflows/ci.yml`
  - `smoke` job 추가
  - `needs: [check, e2e]`
  - prod smoke artifacts 업로드

## Evidence
- `npm run test:unit` 통과
- `npm run typecheck` 통과
- `npm run build` 통과
- `npm run test:e2e` 통과
- `npm run test:smoke` 통과
  - `@prod-smoke built homepage renders hero, CTA, and demo without console errors`
  - `@prod-smoke built key routes render their primary headings`
  - `@prod-smoke built mobile homepage renders hero CTA without horizontal overflow`

## Result
- Verdict: `APPROVE`

## Next Candidate
- Figma tool이 callable한 세션에서 `Home/Desktop`과 mobile frame에 voice demo state를 실제 반영
- release 후속 라운드에서 artifact retention/branch policy/deploy smoke를 더 조정
