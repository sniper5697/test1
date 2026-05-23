## Current Phase
- Phase 0: Discovery 진행 중
- 사용자의 특별한 지시가 없으면, 감독관이 세 에이전트에게 직접 다음 라운드 지시를 전달하고 결과를 회수하는 운영 원칙을 적용한다.

## Current Branch
- `main`

## Current Agent Slots
- Agent K: `kimi k2.6 cli` via Ollama Cloud
- Agent G: `gemini cli`
- Agent C: `claude cli`

## Last Completed Task
- `$socrates` 방식으로 홈페이지 Phase 0 질문을 진행해 1차 요구사항, 페이지 범위, 데모 흐름, 디자인 방향을 구체화했다.

## Source Of Truth
- 운영 규칙: `AGENTS.md`
- 현재 요구사항 소스: 사용자와 감독관의 Phase 0 대화
- 초기 기획 질문 프레임: `$socrates` 스킬

## Open TODO
- Phase 0 답변을 기반으로 핵심 목표 3개와 페이지별 역할을 정리한다.
- `docs/planning/` 문서 생성 필요 여부를 판단한다.
- 기술 스택 1차 추천안을 확정한다.
- `stitch` 기준의 페이지 작성 범위를 확정한다.
- `stitch` 결과를 바탕으로 `figma`에서 페이지 구조와 프레임을 정리하는 방식을 확정한다.
- 테스트 전략과 Playwright 핵심 시나리오를 정의한다.
- 에이전트별 실제 작업 라운드를 시작한다.

## Working Tree Notes
- 현재 저장소는 운영 문서와 메모리, 작업일지 위주 상태다.
- 애플리케이션 코드, 디자인 산출물, 테스트 스위트는 아직 생성되지 않았다.
- 홈페이지 기획은 `$socrates`, 페이지 작성은 `stitch`, 이후 페이지 구조와 프레임 정리는 `figma`를 사용하는 흐름으로 운영한다.
- 오늘 Phase 0에서 `Velora Voice` 임시명, 홈/소개/서비스/FAQ/로그인/회원가입 범위, STT-TTS 데모 흐름이 정리됐다.

## Supervisor Guidance
- 사용자를 중계자로 쓰지 않는다.
- 사용자의 특별한 지시가 없으면 감독관이 세 에이전트에게 직접 지시한다.
- 결과가 승인 기준을 만족하면 감독관이 다음 라운드를 직접 이어간다.
- 홈페이지 구현은 위임 중심으로 운영하고, 감독관은 판단과 통합에 집중한다.
- Phase 0에서는 `$socrates` 스킬 원칙으로 작업 흐름을 완전히 이해할 때까지 상세 질문을 이어간다.
