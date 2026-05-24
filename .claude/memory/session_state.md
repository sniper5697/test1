## Current Phase
- Phase 2: Design 진행 중
- 홈 페이지는 `stitch` 섹션 단위 생성까지 완료했고, 다음 단계는 `figma` 프레임 조립과 페이지 확장이다.

## Current Branch
- `main`

## Current Agent Slots
- Agent K: `kimi k2.6 cli` via Ollama Cloud
- Agent G: `gemini cli`
- Agent C: `claude cli`

## Last Completed Task
- `stitch`로 홈페이지를 전체 페이지와 섹션 단위로 생성해 비교 검토했고, 섹션 분리 생성 전략이 더 안정적이라는 결론을 냈다.
- `stitch-setup`, `figma-setup` 스킬을 만들어 다음 세션에서도 설치/인증/문제 해결을 재사용할 수 있게 했다.
- Figma 커넥터 접근을 복구해 이 세션에서 `_whoami` 기준 도구 가용성을 확인했다.

## Source Of Truth
- 운영 규칙: `AGENTS.md`
- 기획 문서: `docs/planning/01-prd.md`, `docs/planning/02-pages-and-roles.md`, `docs/planning/03-build-scope.md`
- Stitch 산출물: `docs/stitch/`, `artifacts/stitch/`
- Figma 조립 기준: `docs/figma/home-frame-assembly.md`

## Open TODO
- `docs/figma/home-frame-assembly.md` 기준으로 홈 프레임을 실제 Figma 파일에 조립한다.
- Stitch 히어로 섹션을 한 번 더 보정하거나, 현재 산출물을 기준으로 Figma에서 히어로를 재구성한다.
- `소개`, `서비스`, `FAQ`, `로그인`, `회원가입` 페이지를 Stitch로 생성하고 검토한다.
- 홈/하위 페이지 구조가 안정화되면 구현 단계용 태스크와 TDD 순서를 분해한다.
- STT-TTS 데모 구현 범위와 Playwright 핵심 사용자 여정을 구현 가능한 수준으로 더 구체화한다.

## Working Tree Notes
- 저장소에는 기획 문서, Stitch 프롬프트, Stitch 산출물, Figma 조립 가이드, 생성 스크립트가 추가된 상태다.
- 현재 가장 usable한 Stitch 산출물은 `home-demo-v2`, `home-values-features`, `home-proof`, `home-bottom`이며, `hero`는 여전히 비주얼 카드 쪽으로 드리프트가 남아 있다.
- Stitch는 전체 홈을 한 번에 만들기보다 섹션 단위로 나누어 생성하는 전략이 더 적합하다.
- Figma 플러그인은 설치만으로 충분하지 않았고, 커넥터 접근과 새 Codex 세션이 필요했다.

## Supervisor Guidance
- 사용자를 중계자로 쓰지 않는다.
- 사용자의 특별한 지시가 없으면 감독관이 직접 에이전트나 도구 체인을 이어간다.
- 섹션 단위 Stitch 결과를 무리하게 승인하지 말고, 재사용 가능한 섹션만 선택해 Figma에서 조립한다.
- 구현 단계로 넘어가기 전에 홈/하위 페이지 IA와 주요 화면 구조를 먼저 고정한다.
