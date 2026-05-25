## Completed Rounds
1. `$socrates` 방식으로 홈페이지 Phase 0 요구사항을 정리하고 `Velora Voice`의 1차 IA와 디자인 방향을 고정했다.
2. `docs/planning/` 문서 3종으로 목표, 페이지 역할, 빌드 범위를 정리했다.
3. Stitch 설치/인증 경로를 복구하고 홈 전체 페이지 생성 스크립트를 만들어 실제 산출물을 저장했다.
4. 홈 전체 페이지 생성이 불안정하다는 점을 확인한 뒤, 홈을 섹션 단위 프롬프트와 재사용 스크립트로 분리 생성했다.
5. `docs/figma/home-frame-assembly.md`를 만들어 Stitch 산출물을 Figma에서 묶는 기준을 정의했다.
6. `stitch-setup`, `figma-setup` 스킬을 작성해 설치, 인증, 트러블슈팅을 재사용 가능한 형태로 정리했다.
7. Figma 커넥터를 다시 연결한 뒤 이 세션에서 `_whoami` 성공으로 Figma 도구 가용성을 확인했다.
8. 홈 baseline, 하위 페이지 baseline, FAQ keyboard, auth validation/mobile density 검증 라운드를 모두 승인 상태로 올렸다.
9. `VoiceDemo` + `useVoiceDemo`로 홈 브라우저 네이티브 음성 데모 v1을 구현하고 unit/build/e2e를 모두 green으로 만들었다.
10. CI workflow를 `check` / `e2e` 2-job 구조로 harden 했다.
11. voice demo 상태 screenshot과 Figma parity handoff 문서를 정리했다.

## Live Session Info
- Stitch/Gemini/Ollama/Claude 체인은 모두 사용 가능한 상태다.
- 이 세션에서는 Figma tool이 직접 노출되지 않았고, 대신 docs + screenshot handoff로 parity를 준비했다.
- 과거에 `_whoami` 기준 연결된 Figma 계정 핸들은 `margaretaamber`, 플랜 키는 `team::1628286850847177154`였다.

## Important Context
- 프로젝트 목적은 `Velora Voice` 홈페이지 제작이다.
- 현재까지 고정된 흐름은 `$socrates -> stitch -> figma -> 구현/TDD -> Playwright`다.
- 1차 페이지 범위는 `홈`, `소개`, `서비스`, `FAQ`, `로그인`, `회원가입`이다.
- 홈에서 가장 중요한 행동은 `데모 보기` CTA를 통한 음성 대화 데모 진입이다.
- 데모 흐름은 `마이크 권한 허용 -> 말하기 -> 파형 표시 -> 응답 재생/텍스트 표시`다.
- 디자인 방향은 `ElevenLabs` 톤/레이아웃, `셀바스AI` 정보 배치, `유리질감`, `부드러운 모션`, 비블랙톤, 비템플릿 감성이다.
- Stitch는 API key만으로는 생성 작업이 안 되고 OAuth access token과 quota project가 필요했다.
- Figma는 플러그인 설치만으로 충분하지 않고, 커넥터 접근 권한과 새 세션에서의 도구 인덱싱이 필요했다.
- 현재 구현된 voice demo는 browser-native v1이다.
  - state: `idle`, `permission`, `listening`, `thinking`, `speaking`, `error`
  - post-session idle with transcript/reply persistence + `다시 질문하기`
  - verified by `components/VoiceDemo.test.tsx`, `e2e/voice-demo.spec.ts`
- current green gates:
  - `npm run test:unit`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`

## Likely Next Tasks
1. Figma tool이 보이는 세션에서 `docs/figma/home-voice-demo-state-update.md`와 `artifacts/voice-demo-states/`를 기준으로 `Home/Desktop`에 state frame을 추가한다.
2. 작업일지, 메모리 저장, 커밋 요청이 들어오면 오늘까지의 구현/CI/Figma parity 작업을 정리한다.
3. release-oriented 라운드에서 branch policy, artifact retention, deploy smoke gate를 더 조정한다.

## Cautions
- Stitch 홈 전체 생성은 쉽게 붕괴하므로 한 번에 큰 프롬프트로 다시 밀지 말고 섹션 단위 전략을 유지한다.
- Figma 관련 설정을 손댈 때 `~/.codex/config.toml`에 깨진 `mcp_servers.codex_apps` 블록을 넣지 않는다.
- Figma 커넥터 접근 상태가 바뀌면 반드시 새 Codex 세션에서 도구 노출을 다시 확인한다.
- 현재 작업 트리는 매우 큰 미커밋 상태다. 기존 변경을 되돌리지 말고, commit 요청이 오면 현재 상태를 그대로 묶는 쪽으로 처리한다.
