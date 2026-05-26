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
- 각 웹페이지 구조와 프레임 정리는 `stitch` 결과를 바탕으로 `figma`를 사용한다.

## 2026-05-23

### Phase 0 Outcome
- 사용자는 제품 소개 중심의 정적 소개형 홈페이지를 원했고, 핵심 목적은 잠재 고객을 `데모 보기`로 유도하는 것이었다.
- 임시 서비스명은 `Velora Voice`로 정리됐다.
- 1차 핵심 가치 3개는 `정확도`, `속도`, `실시간성`이다.

### Demo Scope
- 데모는 같은 페이지 내 섹션 이동 방식이 자연스럽다.
- 실제 데모 경험은 `마이크 권한 허용 -> 말하기 -> 파형 표시 -> 응답 재생/텍스트 표시` 흐름으로 정의됐다.
- 1차에서도 STT-TTS 실연동을 목표로 잡는 것이 맞다.

### IA and Visual Direction
- 1차 페이지 범위는 `홈 + 소개 + 서비스 + FAQ + 로그인 + 회원가입`이다.
- 소개 페이지는 `회사 소개`, `비전`, `연락처`만으로 충분하며 별도 문의 페이지는 1차에서 제외할 수 있다.
- 디자인 방향은 `ElevenLabs`의 톤/레이아웃, `셀바스AI`의 정보 배치, `유리질감`, `부드러운 모션`, 비블랙톤, 비템플릿 감성으로 정리됐다.

## 2026-05-24

### Stitch Authentication
- Stitch는 API key만으로 도구 목록 조회는 가능하지만, 실제 `create_project`/생성 계열은 OAuth access token이 필요했다.
- 이 환경에서는 `gcloud auth application-default login`과 quota project 설정이 필요했고, 실제 사용 프로젝트는 `cbk-02`로 정리됐다.
- Stitch SDK는 환경변수 우선순위 때문에 `STITCH_API_KEY`가 남아 있으면 OAuth 경로를 방해할 수 있었고, 이를 우회해 명시적 클라이언트 생성 경로를 쓰는 편이 안정적이었다.

### Stitch Generation Strategy
- 홈 전체 페이지를 한 번에 생성하는 접근은 품질이 불안정했다.
- 실제로는 `blank/unusable -> partial homepage -> hero visual asset drift` 패턴이 나왔다.
- 같은 목표라도 `hero`, `values/features`, `demo`, `proof`, `bottom`처럼 섹션 단위로 쪼개면 훨씬 안정적으로 usable한 결과를 얻을 수 있었다.
- 현재 가장 좋은 기준 산출물은 `home-demo-v2`이며, `values/features`, `proof`, `bottom`도 구현 참고용으로 충분하다.

### Figma Runtime Reality
- Figma는 데스크톱 앱 설치와 플러그인 설치만으로는 충분하지 않았다.
- 플러그인은 자체 MCP 서버를 내장하지 않았고, 앱 커넥터 접근 상태가 `isAccessible: true`가 되어야 도구가 실제 세션에 노출됐다.
- 커넥터 연결이나 권한이 바뀐 뒤에는 기존 세션이 아니라 새 Codex 세션에서 다시 확인해야 했다.
- 도구가 실제로 살아 있는지 확인하는 가장 좋은 신호는 `_whoami` 성공이다.

### Reusable Setup Pattern
- 반복되는 설치/인증/트러블슈팅은 스킬로 캡슐화하는 편이 낫다.
- `stitch-setup`과 `figma-setup`처럼 설치 여부 확인 -> 부족한 의존성 자동 설치 -> 사용자가 필요한 인증 단계만 질문 -> 최종 probe 검증 순서로 묶으면 다음 세션 비용이 크게 줄어든다.

### Config Safety
- `~/.codex/config.toml`에 transport 없는 `[mcp_servers.codex_apps]` 블록을 넣으면 Codex 자체가 깨질 수 있다.
- MCP startup timeout 문제를 임의 설정으로 덮기 전에 현재 버전의 설정 형식을 먼저 확인해야 한다.

## 2026-05-25

### Delegation Reality
- 구현 단계에 들어가면 감독관이 직접 코드를 쓰더라도, 라운드 기준과 승인/반려는 Agent G/K/C 회수 결과를 먼저 고정한 뒤 진행하는 편이 안정적이다.
- 특히 verification gate는 Agent C의 증거 요구를 먼저 받아두면 E2E와 CI를 뒤에서 덧대지 않아도 된다.

### Voice Demo Pattern
- browser-native v1 음성 데모는 `SpeechRecognition + speechSynthesis + canned reply` 조합으로 충분히 usable하다.
- 실제 브라우저 E2E는 real mic/audio보다 `Playwright fake media + addInitScript mock voice APIs` 경로가 훨씬 안정적이다.
- `speechSynthesis`는 객체 전체 교체보다 메서드 패치가 브라우저 호환성 면에서 더 안전했다.

### CI Shape
- voice-demo E2E가 생긴 뒤에는 단일 CI job보다 `check` / `e2e` 2-job 구조가 더 적합하다.
- Playwright artifact는 실패 때만 남기기보다 `always()`가 회귀 디버깅에 유리하다.

### Figma Parity
- Figma tool이 없는 세션에서도 설계 작업을 완전히 멈출 필요는 없다.
- 구현 상태 screenshot 세트와 handoff 문서를 만들어 두면, 다음 세션에서 Figma tool이 보일 때 바로 조립을 이어갈 수 있다.

### Release Smoke Gate
- production smoke gate는 기존 dev E2E를 대체하지 말고 `@prod-smoke` 태그로 분리하는 편이 안전하다.
- built app 기준 검증은 `next build + next start`를 직접 띄워야 하고, 사용자가 보고 있을 수 있는 dev 서버와 충돌하지 않게 별도 포트를 쓰는 편이 낫다.
- smoke에서는 전체 회귀 대신 hero/CTA/`#demo`/핵심 route heading/console error 0 같은 최소 surface만 확인해야 flaky risk가 낮다.

### Release Policy Hardening
- branch protection 같은 운영 정책은 저장소 파일만으로 완전히 강제되지 않으므로, repo 안에는 `release-policy.md`와 PR template로 기준을 고정하고 실제 GitHub UI 적용은 외부 운영 단계로 분리하는 편이 현실적이다.
- release 문서에는 required checks, artifact retention day count, rollback target time, env/secret hygiene를 숫자와 절차 수준으로 명시해야 다음 감독관이 그대로 집행할 수 있다.

### Unsupported Browser Fallback
- browser-native voice demo는 정상 경로만 green이어도 충분하지 않고, `SpeechRecognition` 자체가 없는 브라우저 분기를 unit test로 고정해야 residual risk가 실제로 줄어든다.
- unsupported 환경에서는 기능 미지원 사실과 권장 브라우저를 함께 보여주는 편이 permission denied와 구분이 명확하다.

### Global Navigation Accessibility
- 공통 header/footer는 각 페이지에 중복 배치하기보다 `app/layout.tsx`에서 단일 source로 관리하는 편이 landmark, active nav, skip link 검증을 단순하게 만든다.
- 접근성 smoke에서는 디자인보다 `본문으로 바로가기`의 첫 focus 진입, `main#main-content` 단일성, nav 내부의 단일 `aria-current=\"page\"`가 가장 강한 회귀 방지 포인트였다.

### Route Metadata Hardening
- Next route metadata를 정확한 문자열로 보장해야 하면 layout template에 기대기보다 각 route가 완전한 title string을 직접 export하는 편이 안정적이다.
- client page에서 metadata가 필요한 경우 `page.tsx`를 server component로 유지하고 실제 interactive UI를 별도 `*PageClient.tsx`로 분리하는 구조가 가장 단순하다.

### Figma Componentization
- 기존 parity 프레임이 이미 상태별로 잘 분리돼 있으면 새로 재구성하기보다 source state frame을 clone -> component 변환 -> `combineAsVariants` 하는 편이 가장 빠르고 안전하다.
- 이번 voice demo처럼 code state가 명확할 때는 `State x Device` 두 축만으로도 충분히 재사용 가능한 component set을 만들 수 있다.
- 커넥터가 불안정해도 once connected 상태에서 metadata로 source node id를 회수한 뒤 일괄 componentization하는 전략이 효율적이다.

### Secondary Page Parity
- secondary pages는 코드에서 공통 CTA와 shared utility class를 먼저 정리한 뒤, Figma에는 full fidelity clone보다 parity root를 별도로 만드는 편이 drift 관리가 쉽다.
- `about/service/faq`는 공통 CTA band 하나로 funnel semantics를 고정하고, `login/signup`은 split-panel auth intro 구조를 고정하면 디자인/구현 정렬 비용이 크게 줄어든다.
- Figma parity 라운드는 기존 page를 수정하는 것보다 file 오른쪽에 `Secondary Pages/Desktop` 같은 dedicated root를 추가하는 편이 증거 관리와 screenshot artifact 확보에 유리하다.
- mobile parity는 desktop parity를 축소 복제하기보다 `390px single-column` 전용 root를 따로 두는 편이 카드 순서와 auth stack 의도를 명확하게 보존한다.
