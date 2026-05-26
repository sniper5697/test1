## Current Phase
- Phase 5 closeout 상태
- 홈페이지 baseline 구현, 하위 페이지 baseline 구현, 홈 음성 데모 v1 구현, CI hardening, production smoke gate, release policy hardening, unsupported-browser fallback hardening, 전역 navigation/accessibility hardening, route metadata hardening, Figma voice demo componentization, secondary pages code polish, secondary pages Figma desktop/mobile parity, GitHub ops closeout까지 완료됐다.
- 다음 단계는 deploy target secret과 restart strategy를 채우고 첫 실제 배포를 검증하는 것이다.

## Current Branch
- `codex/finalize-ops`

## Current Agent Slots
- Agent K: `kimi k2.6 cli` via Ollama Cloud
- Agent G: `gemini cli`
- Agent C: `claude cli`

## Last Completed Task
- GitHub `main` branch protection, deploy skeleton, runtime hardening, deploy no-op validation까지 실제 원격 저장소에서 닫았다.

## Source Of Truth
- 운영 규칙: `AGENTS.md`
- 기획 문서: `docs/planning/01-prd.md`, `docs/planning/02-pages-and-roles.md`, `docs/planning/03-build-scope.md`
- 구현/검증 라운드 기록: `docs/planning/04-*.md` ~ `docs/planning/23-*.md`
- Stitch 산출물: `docs/stitch/`, `artifacts/stitch/`
- Figma 조립 기준: `docs/figma/home-frame-assembly.md`, `docs/figma/home-voice-demo-state-update.md`
- voice demo reference: `artifacts/voice-demo-states/`

## Open TODO
- `staging`, `production` environment secrets를 채운다.
- process restart 전략을 서버 기준으로 반영한다.
- post-deploy smoke를 실제 배포 URL 기준으로 연결한다.

## Working Tree Notes
- 현재 로컬 게이트는 green:
  - `npm run test:unit`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run test:smoke`
  - `npx playwright test e2e/secondary-pages.spec.ts`
- voice demo reference screenshot은 `artifacts/voice-demo-states/`에 저장됐다.
- Figma voice demo parity root frame id는 `12:2`이고, desktop/mobile state family가 실제로 존재한다.
- Figma reusable component set id는 `15:659`이고, variant count는 14다.
- Figma secondary pages parity root id는 `16:2`이고, desktop about/service/faq/login/signup frame set이 실제로 존재한다.
- Figma secondary pages mobile parity root id는 `17:2`이고, mobile about/service/faq/login/signup frame set이 실제로 존재한다.
- route metadata는 `/`, `/about`, `/service`, `/faq`, `/login`, `/signup` 모두 개별 title/description으로 고정됐다.
- GitHub remote repository는 `sniper5697/test1`이고, `main` branch protection이 활성화돼 있다.
- `main` protection은 현재 solo maintainer 운영을 위해 `required_approving_review_count: 0`, `require_last_push_approval: false`로 조정돼 있고, strict checks `check/e2e/smoke`는 유지된다.
- GitHub environments `staging`, `production`이 생성돼 있다.
- `.github/workflows/deploy.yml`은 secrets가 없으면 skip되는 수동 배포 skeleton이다.
- deploy verification run `26431717511`은 `package success -> deploy skip`으로 green이다.

## Supervisor Guidance
- 사용자를 중계자로 쓰지 않는다.
- 사용자의 특별한 지시가 없으면 감독관이 직접 에이전트나 도구 체인을 이어간다.
- 위임이 필요한 판단/설계/검증은 계속 Agent G/K/C를 거쳐 진행한다.
- 지금부터는 deploy target secret 입력과 first real deploy smoke 확인 순서로 넘기는 것이 자연스럽다.
