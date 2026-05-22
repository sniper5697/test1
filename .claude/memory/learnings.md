## 2026-05-22

### Supervisor Pattern
- 이 프로젝트는 감독관이 직접 위임하고 직접 결과를 회수하는 운영 패턴을 기본값으로 사용한다.
- 사용자는 우선순위, 정책, 예외 승인, 종료 판단 시점에만 개입한다.

### Agent Split
- Coding은 Ollama Cloud의 `kimi k2.6 cli`에 위임한다.
- Design은 `gemini cli`에 위임한다.
- Verification은 `claude cli`에 위임한다.

### Quality Bar
- 모든 기능은 TDD 사이클을 거쳐야 한다.
- Playwright는 직접 디버깅과 E2E 검증에 적극적으로 사용한다.
- CI/CD 자동화는 테스트와 품질 게이트를 포함해야 한다.

### Discovery Rule
- Phase 0에서는 감독관이 충분히 상세하게 질문해야 한다.
- 작업 흐름을 완전히 이해하기 전에는 설계나 구현으로 넘어가지 않는다.
- 홈페이지 초기 질문은 `$socrates` 스킬 흐름을 따른다.

### Tooling Flow
- 초기 기획과 요구사항 구조화는 `$socrates` 스킬을 사용한다.
- 실제 웹페이지 작성은 `stitch`를 사용한다.
- 각 웹페이지 구조 설계는 `figma`를 사용한다.
