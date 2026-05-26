# Velora Voice Deploy Target Setup

## Goal
- GitHub Actions `Deploy` workflow를 self-hosted 배포 대상에 연결하기 위한 최소 설정을 고정한다.

## Current State
- GitHub branch protection은 `main`에 적용됐다.
- GitHub environments:
  - `staging`
  - `production`
- workflow:
  - [.github/workflows/deploy.yml](/Users/macminim2-choi/PROJECT/Job1/.github/workflows/deploy.yml)

## Workflow Shape
- `workflow_dispatch` 수동 실행
- input:
  - `environment`: `staging | production`
  - `ref`: deploy할 git ref
- `package` job
  - `test:unit`
  - `typecheck`
  - `build`
  - `test:smoke`
  - deploy bundle artifact 생성
- `deploy` job
  - environment-scoped secrets 검증
  - secrets가 없으면 no-op skip
  - secrets가 있으면 SSH로 bundle 업로드 및 압축 해제

## Required Environment Secrets
- `DEPLOY_HOST`
- `DEPLOY_USER`
- `DEPLOY_PORT`
- `DEPLOY_PATH`
- `DEPLOY_SSH_KEY`

## Expected Remote Layout
- base path:
  - `$DEPLOY_PATH`
- workflow writes:
  - `$DEPLOY_PATH/releases/deploy-bundle-<sha>.tar.gz`
  - `$DEPLOY_PATH/current/`

## Notes
- 현재 workflow는 process restart를 강제하지 않는다.
- 실제 서비스 재기동은 서버별 방식이 다르므로:
  - `pm2`
  - `systemd`
  - `docker compose`
  중 하나에 맞춰 후속 라운드에서 붙이면 된다.
- secrets가 비어 있으면 workflow는 실패하지 않고 skip된다.
