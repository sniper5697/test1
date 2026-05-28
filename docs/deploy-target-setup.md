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

## Optional Environment Secrets
- `DEPLOY_RESTART_CMD`
  - `staging` 추천값: `sudo systemctl restart velora-voice-staging.service`
  - `production` 추천값: `sudo systemctl restart velora-voice-production.service`

## Expected Remote Layout
- base path:
  - `$DEPLOY_PATH`
- workflow writes:
  - `$DEPLOY_PATH/releases/deploy-bundle-<sha>.tar.gz`
  - `$DEPLOY_PATH/current/`

## Prepared Values
- `staging`
  - `DEPLOY_HOST=192.168.0.80`
  - `DEPLOY_USER=cbk`
  - `DEPLOY_PORT=22`
  - `DEPLOY_PATH=/home/cbk/apps/velora-voice/staging`
- `production`
  - `DEPLOY_HOST=192.168.0.80`
  - `DEPLOY_USER=cbk`
  - `DEPLOY_PORT=22`
  - `DEPLOY_PATH=/home/cbk/apps/velora-voice/production`

## Notes
- 현재 restart 전략은 `systemd`를 기본으로 고정한다.
- 템플릿:
  - [velora-voice-staging.service](/Users/macmin2-choi/PROJECT/Job1/deploy/systemd/velora-voice-staging.service)
  - [velora-voice-production.service](/Users/macmin2-choi/PROJECT/Job1/deploy/systemd/velora-voice-production.service)
- GPU 서버의 Node 런타임은 system-wide가 아니라 `cbk` 계정의 `~/.nvm` 아래 `v22.22.3`를 사용한다.
- 따라서 원격 deploy step과 systemd `ExecStart`는 모두 `bash -lc`로 `~/.nvm/nvm.sh`를 먼저 로드해야 한다.
- passwordless sudo는 deploy workflow가 쓰는 `systemctl restart velora-voice-{staging,production}.service` 범위로만 열어두는 것이 안전하다.
- secrets가 비어 있으면 workflow는 실패하지 않고 skip된다.
- 서버에 아직 공개키와 service 파일이 설치되지 않았다면 실제 deploy는 SSH 단계 또는 restart 단계에서 막힌다.
