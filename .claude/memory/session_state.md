## Current Phase
- Phase 0: Discovery 준비 상태
- 사용자의 특별한 지시가 없으면, 감독관이 세 에이전트에게 직접 다음 라운드 지시를 전달하고 결과를 회수하는 운영 원칙을 적용한다.

## Current Branch
- `main`

## Current Agent Slots
- Agent K: `kimi k2.6 cli` via Ollama Cloud
- Agent G: `gemini cli`
- Agent C: `claude cli`

## Last Completed Task
- 기준 문서 `2026-05-13-supervisor-claude-team-pattern.md`를 바탕으로 프로젝트 운영 구조와 `AGENTS.md` 초기 버전을 설정했다.

## Source Of Truth
- 운영 규칙: `AGENTS.md`
- 현재 요구사항 소스: 사용자와 감독관의 Phase 0 대화
- 초기 기획 질문 프레임: `$socrates` 스킬

## Open TODO
- 홈페이지 목표와 범위를 상세히 확정한다.
- `$socrates` 스킬 흐름으로 Phase 0 질문을 진행한다.
- Phase 0 상세 질문과 답변을 정리한다.
- `docs/planning/` 문서 생성 필요 여부를 판단한다.
- 페이지 구조, 디자인 방향, 기술 스택, 배포 전략을 확정한다.
- `figma` 기준의 웹페이지 구조 설계 방식을 정리한다.
- `stitch` 기준의 페이지 작성 흐름을 정리한다.
- 테스트 전략과 Playwright 핵심 시나리오를 정의한다.
- 에이전트별 실제 작업 라운드를 시작한다.

## Working Tree Notes
- 현재 저장소는 초기 상태이며 운영 문서만 존재한다.
- 애플리케이션 코드, 디자인 산출물, 테스트 스위트는 아직 생성되지 않았다.
- 홈페이지 기획은 `$socrates`, 페이지 작성은 `stitch`, 화면 구조 설계는 `figma`를 기본 흐름으로 사용한다.

## Supervisor Guidance
- 사용자를 중계자로 쓰지 않는다.
- 사용자의 특별한 지시가 없으면 감독관이 세 에이전트에게 직접 지시한다.
- 결과가 승인 기준을 만족하면 감독관이 다음 라운드를 직접 이어간다.
- 홈페이지 구현은 위임 중심으로 운영하고, 감독관은 판단과 통합에 집중한다.
- Phase 0에서는 `$socrates` 스킬 원칙으로 작업 흐름을 완전히 이해할 때까지 상세 질문을 이어간다.
