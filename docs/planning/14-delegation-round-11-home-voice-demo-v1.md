# Delegation Round 11: Home Voice Demo V1

## Round Goal
- 홈 `#demo` 섹션을 static 소개 블록에서 실제 브라우저 네이티브 음성 체험으로 교체한다.

## Success Criterion
- 마이크 시작 흐름이 존재한다.
- transcript, state change, canned TTS reply, stop/reset path가 모두 동작한다.
- unit, typecheck, build, e2e가 모두 green이어야 한다.

## Delegation Summary

### Agent G
- 포인트:
  - 주요 CTA는 `체험 시작하기`
  - 상태 흐름은 `IDLE -> LISTENING -> THINKING -> SPEAKING -> ERROR`
  - 모바일에서는 큰 시작 버튼과 분명한 상태 문구가 중요하다.

### Agent K
- 포인트:
  - `app/page.tsx`는 유지하고 client-side voice demo component를 분리한다.
  - transcript, state machine, canned reply, TTS playback을 component/hook 조합으로 구현한다.
  - Playwright는 fake media + injected mock voice APIs 기반으로 닫아야 한다.

### Agent C
- 구현 전 게이트:
  - voice state machine unit coverage
  - microphone/fake media Playwright harness
  - keyboard, permission denied, stop mid-session, mobile overflow 시나리오

## Supervisor Action
- 구현:
  - `app/page.tsx`의 static demo section을 `VoiceDemo` component로 교체
  - `components/VoiceDemo.tsx` 추가
  - `lib/useVoiceDemo.ts` 추가
- 테스트:
  - `components/VoiceDemo.test.tsx` 추가
  - `e2e/voice-demo.spec.ts` 추가
  - `e2e/support/mockVoiceApis.ts` 확장
- 보조 정리:
  - `app/layout.tsx`에 `data-scroll-behavior="smooth"` 반영

## Evidence
- `npm run test:unit` 통과
- `npm run typecheck` 통과
- `npm run build` 통과
- `npm run test:e2e` 통과
- voice demo E2E passing:
  - mocked speech roundtrip
  - permission denied
  - keyboard activation
  - stop mid-session
  - mobile no overflow

## Result
- Verdict: `SHIP`

## Agent C Final
- Verdict: `SHIP`
- 확인 항목:
  - `components/VoiceDemo.tsx`
  - `lib/useVoiceDemo.ts`
  - `components/VoiceDemo.test.tsx`
  - `e2e/voice-demo.spec.ts`
  - `e2e/support/mockVoiceApis.ts`
  - `playwright.config.ts` microphone permission + fake media args
- 잔여 리스크:
  - `다시 질문하기` busy 상태 노출 위험은 즉시 보정 완료
  - `SpeechSynthesisUtterance` fallback은 unit test로 추가 고정

## Next Candidate
- 실제 음성 데모 카피/레이아웃 polish
- voice demo 상태를 Figma secondary/home frame에 반영
- 이후 CI/CD 배포 게이트 고도화
