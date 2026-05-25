## Current Phase
- Phase 4/5 경계 상태
- 홈페이지 baseline 구현, 하위 페이지 baseline 구현, 홈 음성 데모 v1 구현, CI hardening, Figma parity handoff, production smoke gate, release policy hardening, unsupported-browser fallback hardening, live Figma parity 반영, 전역 navigation/accessibility hardening, route metadata hardening, Figma voice demo componentization까지 완료됐다.
- 다음 단계는 GitHub UI 단계의 branch protection 운영 적용으로 넘어가거나, 필요 시 secondary pages CTA 정렬 같은 low-priority polish를 수행하는 것이다.

## Current Branch
- `main`

## Current Agent Slots
- Agent K: `kimi k2.6 cli` via Ollama Cloud
- Agent G: `gemini cli`
- Agent C: `claude cli`

## Last Completed Task
- `Voice Demo State Parity`를 기존 상태 프레임 복제 기반으로 `VoiceDemo/StateParity` component set으로 승격했다.
- axes는 `State x Device`로 고정했고, 14개 variant를 모두 생성했다.
- screenshot artifact와 planning round 문서로 결과를 고정했다.

## Source Of Truth
- 운영 규칙: `AGENTS.md`
- 기획 문서: `docs/planning/01-prd.md`, `docs/planning/02-pages-and-roles.md`, `docs/planning/03-build-scope.md`
- 구현/검증 라운드 기록: `docs/planning/04-*.md` ~ `docs/planning/20-*.md`
- Stitch 산출물: `docs/stitch/`, `artifacts/stitch/`
- Figma 조립 기준: `docs/figma/home-frame-assembly.md`, `docs/figma/home-voice-demo-state-update.md`
- voice demo reference: `artifacts/voice-demo-states/`

## Open TODO
- 필요하면 `Secondary Pages` 페이지에도 voice demo copy/tone과 맞춘 CTA 정렬을 다시 맞춘다.
- GitHub UI에서 branch protection rule과 required checks를 실제로 적용한다.
- 오늘 작업일지/메모리/커밋은 2026-05-26 기준으로 다시 정리해야 한다.

## Working Tree Notes
- 현재 로컬 게이트는 green:
  - `npm run test:unit`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run test:smoke`
- voice demo reference screenshot은 `artifacts/voice-demo-states/`에 저장됐다.
- 이 세션에서는 Figma tool이 직접 callable하지 않았고, 대신 handoff 문서와 screenshot reference를 만들었다.
- production smoke artifact는 `test-results/`와 `playwright-report/` 업로드 기준으로 CI에 남는다.
- release policy 문서 기준으로 required checks, artifact retention, rollback 절차가 저장소 안에 고정됐다.
- Figma parity root frame id는 `12:2`이고, desktop/mobile state family가 실제로 존재한다.
- Figma reusable component set id는 `15:659`이고, variant count는 14다.
- route metadata는 `/`, `/about`, `/service`, `/faq`, `/login`, `/signup` 모두 개별 title/description으로 고정됐다.

## Supervisor Guidance
- 사용자를 중계자로 쓰지 않는다.
- 사용자의 특별한 지시가 없으면 감독관이 직접 에이전트나 도구 체인을 이어간다.
- 위임이 필요한 판단/설계/검증은 계속 Agent G/K/C를 거쳐 진행한다.
- 지금부터는 구현 자체보다 Figma parity, external release ops, commit/memory 정리 순서로 넘기는 것이 자연스럽다.
