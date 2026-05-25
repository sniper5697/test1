# Delegation Round 10: Voice Demo Harness Readiness

## Round Goal
- 홈 음성 데모 구현 전에 Playwright 기준의 마이크 권한/음성 API 테스트 하네스를 준비한다.

## Success Criterion
- `playwright.config.ts`에 마이크 권한과 fake media launch args가 반영된다.
- 재사용 가능한 `SpeechRecognition`/`speechSynthesis` stub 진입점이 저장소에 생긴다.
- 기존 테스트 스위트가 깨지지 않는다.

## Delegation Summary

### Agent G
- Verdict: `APPROVE`
- 포인트:
  - v1은 브라우저 네이티브 음성 체험으로 가는 것이 적절하다.
  - 상태는 `IDLE -> MIC_PERMISSION -> LISTENING -> THINKING -> SPEAKING -> ERROR`로 구분하는 것이 자연스럽다.
  - 모바일은 큰 시작 버튼과 명확한 상태 문구가 중요하다.

### Agent K
- 최종 회신은 장문이었지만 아래 기준은 분명했다.
- 포인트:
  - `app/page.tsx`는 server component로 두고 client-side voice demo component를 분리한다.
  - 구현 전부터 Vitest/Playwright에 Web Speech API mock 경로를 준비해야 한다.
  - Playwright는 `permissions`, deterministic transcript injection, TTS stub을 전제로 설계해야 한다.

### Agent C
- Verdict: `REVISE`
- 블로커:
  1. `playwright.config.ts`에 `permissions: ["microphone"]`
  2. Chromium `launchOptions.args`에
     - `--use-fake-ui-for-media-stream`
     - `--use-fake-device-for-media-stream`
  3. `page.addInitScript` 기반 `SpeechRecognition`/`SpeechSynthesis` stub 진입점

## Supervisor Action
- `playwright.config.ts`
  - Chromium project에 microphone permission과 fake media args를 추가했다.
- `e2e/support/mockVoiceApis.ts`
  - `installMockVoiceApis(page, options)` helper를 추가했다.
  - 이 helper는 `page.addInitScript`로 아래를 주입한다.
    - `SpeechRecognition`
    - `webkitSpeechRecognition`
    - `SpeechSynthesisUtterance`
    - `speechSynthesis`

## Evidence
- 준비 항목:
  - fake media launch args 존재
  - microphone permission 존재
  - reusable browser-side voice API stub helper 존재

## Result
- Verdict: `APPROVE`
- 실제 홈 음성 데모 구현 라운드를 시작할 수 있는 테스트 하네스 선행 조건이 충족됐다.

## Next Candidate
- 홈 `#demo`를 static 섹션에서 실제 client-side 음성 체험 component로 교체하는 구현 라운드
