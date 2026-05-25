# Delegation Round 16: Unsupported-Browser Fallback Hardening

## Round Goal
- browser-native speech API가 없는 환경에서도 voice demo가 깨지지 않도록 unsupported-browser fallback을 명확히 드러내고 검증으로 고정한다.

## Success Criterion
- `SpeechRecognition` / `webkitSpeechRecognition`이 없는 경우 fallback error copy가 보인다.
- CTA는 error 이후에도 다시 보이며 freeze되지 않는다.
- `speechSynthesis` 또는 `SpeechSynthesisUtterance`가 없는 경우 text-only completion이 유지된다.
- unit, typecheck, build, e2e가 모두 green이다.

## Delegation Summary

### Agent G
- unsupported browser에서는 premium tone을 해치지 않도록 호환 브라우저 안내와 recovery copy가 필요하다.
- mobile/webview 환경에서는 full live demo보다 graceful limitation disclosure가 중요하다.

### Agent K
- next round는 unsupported-browser fallback hardening이 적절하다.
- 핵심 파일:
  - `lib/useVoiceDemo.ts`
  - `components/VoiceDemo.tsx`
  - `components/VoiceDemo.test.tsx`
- 핵심은 feature detection과 fallback branch 검증이다.

### Agent C
- must prove:
  - no `SpeechRecognition` path enters `error` with explicit fallback text
  - CTA remains usable after fallback
  - missing `speechSynthesis` path degrades to text-only without crash
- out of scope:
  - real microphone/browser matrix
  - Lighthouse/Figma

## Supervisor Action
- `lib/useVoiceDemo.ts`
  - `errorKind`를 추가해 unsupported / permission / runtime을 구분
- `components/VoiceDemo.tsx`
  - unsupported error에 호환 브라우저 안내 문구 추가
- `components/VoiceDemo.test.tsx`
  - `SpeechRecognition` 부재 fallback test 추가
  - 기존 text-only fallback test 유지

## Evidence
- `npm run test:unit` 통과
  - total: `20 passed`
- `npm run typecheck` 통과
- `npm run build` 통과
- `npm run test:e2e` 통과

## Result
- Verdict: `APPROVE`

## Next Candidate
- Figma tool이 callable한 세션에서 voice demo state를 실제 Figma frame에 반영
- GitHub UI access가 가능해지면 branch protection을 실제 적용
