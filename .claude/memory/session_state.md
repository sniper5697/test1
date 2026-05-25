## Current Phase
- Phase 4 직전 상태
- 홈페이지 baseline 구현, 하위 페이지 baseline 구현, 홈 음성 데모 v1 구현, CI hardening, Figma parity handoff까지 완료됐다.
- 다음 단계는 Figma 파일에 voice demo state를 실제 반영하거나, release-oriented 배포 게이트를 더 정리하는 것이다.

## Current Branch
- `main`

## Current Agent Slots
- Agent K: `kimi k2.6 cli` via Ollama Cloud
- Agent G: `gemini cli`
- Agent C: `claude cli`

## Last Completed Task
- 홈 `#demo`를 실제 브라우저 네이티브 음성 데모로 교체했다.
- Playwright voice demo harness와 CI 분리형 workflow를 반영했다.
- voice demo state screenshot과 Figma handoff 문서를 정리했다.

## Source Of Truth
- 운영 규칙: `AGENTS.md`
- 기획 문서: `docs/planning/01-prd.md`, `docs/planning/02-pages-and-roles.md`, `docs/planning/03-build-scope.md`
- 구현/검증 라운드 기록: `docs/planning/04-*.md` ~ `docs/planning/16-*.md`
- Stitch 산출물: `docs/stitch/`, `artifacts/stitch/`
- Figma 조립 기준: `docs/figma/home-frame-assembly.md`, `docs/figma/home-voice-demo-state-update.md`
- voice demo reference: `artifacts/voice-demo-states/`

## Open TODO
- Figma tool이 보이는 세션에서 홈 프레임에 `Demo/Idle`, `Demo/Listening`, `Demo/Thinking`, `Demo/Speaking`, `Demo/Error`, `Demo/PostSession`을 반영한다.
- 필요하면 `Secondary Pages` 페이지에도 voice demo copy/tone과 맞춘 CTA 정렬을 다시 맞춘다.
- release 전용 라운드에서 workflow artifact/branch policy/배포 전 smoke gate를 더 정리한다.
- 작업일지, 메모리 저장, 커밋을 아직 사용자가 명시적으로 요청하지 않은 상태다.

## Working Tree Notes
- 작업 트리에는 초기 scaffold부터 현재 구현까지 대규모 미커밋 변경이 쌓여 있다.
- 현재 로컬 게이트는 green:
  - `npm run test:unit`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
- voice demo reference screenshot은 `artifacts/voice-demo-states/`에 저장됐다.
- 이 세션에서는 Figma tool이 직접 callable하지 않았고, 대신 handoff 문서와 screenshot reference를 만들었다.

## Supervisor Guidance
- 사용자를 중계자로 쓰지 않는다.
- 사용자의 특별한 지시가 없으면 감독관이 직접 에이전트나 도구 체인을 이어간다.
- 위임이 필요한 판단/설계/검증은 계속 Agent G/K/C를 거쳐 진행한다.
- 지금부터는 구현 자체보다 release gate, Figma parity, commit/memory 정리 순서로 넘기는 것이 자연스럽다.
