# Round 22 - Deploy Skeleton And GitHub Ops

## Goal
- GitHub 원격 운영 기준에서 `main` 보호와 수동 self-hosted deploy skeleton을 동시에 고정한다.

## Delegation
- Agent K
  - `workflow_dispatch`
  - `staging | production` environment input
  - release gates after packaging
  - environment-scoped secret validation
  - safe no-op when secrets are missing
- Agent C
  - deploy artifact upload/download 존재
  - 환경 이름 제한
  - secret guard
  - least-privilege permissions

## Remote Ops Applied
- Repository: `sniper5697/test1`
- `origin/main` push 완료
- branch protection applied on `main`
  - required checks: `check`, `e2e`, `smoke`
  - stale review dismissal: `on`
  - require last push approval: `on`
  - approving reviews: `1`
  - require conversation resolution: `on`
  - force push: `off`
  - deletion: `off`
  - enforce admins: `on`

## Environments Created
- `staging`
- `production`

## Files Added
- [.github/workflows/deploy.yml](/Users/macminim2-choi/PROJECT/Job1/.github/workflows/deploy.yml)
- [docs/deploy-target-setup.md](/Users/macminim2-choi/PROJECT/Job1/docs/deploy-target-setup.md)

## Notes
- 실제 target secret이 없으면 deploy job은 실패하지 않고 skip된다.
- post-deploy restart 전략은 서버별 방식에 따라 후속 라운드에서 추가한다.
