# Delegation Round 12: CI Voice Demo Hardening

## Round Goal
- 홈 음성 데모가 추가된 현재 기준에 맞춰 CI workflow를 더 안정적으로 분리한다.

## Success Criterion
- quality gate와 Playwright gate가 분리된다.
- E2E job은 chromium-only 설치로 좁혀진다.
- Playwright 산출물은 성공/실패와 무관하게 남는다.

## Delegation Summary

### Agent G
- 이번 라운드는 디자인 영역이 아니라서 생략했다.

### Agent K
- 핵심 방향:
  - 단일 job보다 `check` / `e2e` 2-job 구성이 적절하다.
  - Playwright 설치는 현재 chromium-only 구성에 맞춰 좁혀도 된다.
  - build 검증과 E2E 검증을 분리해 실패 원인을 더 빨리 드러내는 편이 낫다.

### Agent C
- 핵심 게이트:
  - workflow 변경 후에도 기존 로컬 검증 시퀀스가 그대로 green일 것
  - microphone/fake-media 기반 voice demo E2E를 깨지 않도록 Playwright 구간을 별도 보존할 것
  - workflow artifact는 디버깅 가능하도록 남길 것

## Supervisor Action
- `.github/workflows/ci.yml`
  - 단일 `ci` job을 `check`, `e2e` 2-job으로 분리
  - `e2e` job에 `needs: check`
  - Playwright browser install을 `chromium --with-deps`로 축소
  - Playwright report / test-results artifact를 `if: always()`로 변경

## Evidence
- 현재 로컬 게이트는 직전 라운드 기준 모두 green
  - `npm run test:unit`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
- 이번 라운드는 workflow 구조 변경이므로 저장소 내 실행 시퀀스는 유지된다.

## Result
- Verdict: `APPROVE`

## Next Candidate
- Figma 홈 프레임에 실제 voice demo state 반영
- 작업일지 / 메모리 저장 / 커밋
- 이후 release-oriented 배포 게이트 정리
