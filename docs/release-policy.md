# Velora Voice Release Policy

## Goal
- 검증된 결과물만 `main`을 통해 release 후보가 되도록 한다.
- release 전 확인 항목, artifact 보존 기준, rollback 절차를 한 문서에 고정한다.

## Required Green Gates
- `npm run test:unit`
- `npm run typecheck`
- `npm run build`
- `npm run test:e2e`
- `npm run test:smoke`

## Branch And Merge Policy
- `main`에는 direct push를 허용하지 않는다.
- 모든 변경은 pull request를 통해서만 들어간다.
- merge 전 required checks:
  - `check`
  - `e2e`
  - `smoke`
- stale review dismissal를 켠다.
- admin bypass는 기본적으로 금지한다.

## Artifact Retention Policy
- `playwright-report/` retention: `7 days`
- `test-results/` retention: `7 days`
- production smoke artifacts retention: `7 days`
- release 판단은 artifact가 남아 있는 상태에서만 진행한다.

## Production Smoke Contract
- smoke gate는 `next dev`가 아니라 `next build + next start` 기준으로 통과해야 한다.
- built app 기준으로 아래가 확인되어야 한다.
  - `/` hero heading visible
  - primary `데모 보기` CTA visible
  - CTA 클릭 후 `#demo` reachable
  - `/about`, `/service`, `/faq`, `/login`, `/signup` heading render
  - mobile hero/CTA no horizontal overflow
  - initial page load console error `0`

## Release Checklist
1. PR 기준 모든 required checks가 green인지 확인한다.
2. `docs/planning/`의 최근 승인 라운드에 reject 또는 unresolved risk가 없는지 확인한다.
3. production smoke artifacts가 남아 있는지 확인한다.
4. 홈 hero, voice demo idle, mobile smoke screenshot을 확인한다.
5. release 대상 commit SHA를 기록한다.

## Rollback Procedure
- 기본 rollback 방식은 `git revert <bad_commit_sha>` 후 새 PR로 `main`에 반영하는 것이다.
- rollback owner:
  - supervisor
  - verification owner
- 목표 recovery time:
  - `30 minutes` 이내에 revert PR 생성
  - `60 minutes` 이내에 smoke gate 재통과

## Environment And Secret Hygiene
- `.env*` 파일은 저장소에 커밋하지 않는다.
- build 또는 runtime에 필요한 값은 GitHub Secrets 또는 배포 환경 변수로만 넣는다.
- 로그와 artifact에는 plaintext secret을 남기지 않는다.

## External Ops Pending
- 실제 deploy target secret 입력
- environment protection rule 설정
- 서버별 restart 전략 반영
- post-deploy smoke gate 추가
