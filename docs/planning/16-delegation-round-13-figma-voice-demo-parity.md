# Delegation Round 13: Figma Voice Demo Parity

## Round Goal
- 구현된 홈 음성 데모 상태를 Figma 프레임에 반영할 수 있는 handoff 문서와 시각 reference를 정리한다.

## Success Criterion
- 현재 구현 상태를 대표하는 reference screenshot 세트가 저장된다.
- Figma가 따라야 할 state frame 목록, copy locks, mobile notes가 문서화된다.
- 다음 세션에서 Figma tool이 보이면 바로 반영 가능한 수준이어야 한다.

## Delegation Summary

### Agent G
- 상태 프레임:
  - `IDLE`
  - `PERMISSION`
  - `LISTENING`
  - `THINKING`
  - `SPEAKING`
  - `ERROR`
- 핵심 변화 축:
  - 상태 pill 텍스트
  - waveform 색/높이
  - CTA 텍스트
  - transcript / reply panel 내용
- 모바일 기준:
  - 1열 수직 스택
  - status card 시각 우선순위 유지

### Agent C
- 디자인 파일이 최소한 표현해야 할 상태:
  - `idle`
  - `listening`
  - `thinking`
  - `speaking`
  - `error`
  - `post-session`
- 드리프트 금지 포인트:
  - `voice-status`
  - `voice-toggle`
  - transcript / reply placeholder copy
  - `data-state` 기반 상태 의미

## Supervisor Action
- reference capture:
  - [idle.png](/Users/macminim2-choi/PROJECT/Job1/artifacts/voice-demo-states/idle.png)
  - [listening.png](/Users/macminim2-choi/PROJECT/Job1/artifacts/voice-demo-states/listening.png)
  - [thinking.png](/Users/macminim2-choi/PROJECT/Job1/artifacts/voice-demo-states/thinking.png)
  - [speaking.png](/Users/macminim2-choi/PROJECT/Job1/artifacts/voice-demo-states/speaking.png)
  - [returned-idle.png](/Users/macminim2-choi/PROJECT/Job1/artifacts/voice-demo-states/returned-idle.png)
  - [error.png](/Users/macminim2-choi/PROJECT/Job1/artifacts/voice-demo-states/error.png)
- docs update:
  - [home-frame-assembly.md](/Users/macminim2-choi/PROJECT/Job1/docs/figma/home-frame-assembly.md)
  - [home-voice-demo-state-update.md](/Users/macminim2-choi/PROJECT/Job1/docs/figma/home-voice-demo-state-update.md)

## Result
- Verdict: `APPROVE`
- 현재 세션에는 Figma tool이 직접 노출되지 않았지만, 다음 세션에서 즉시 반영 가능한 수준의 handoff가 준비됐다.

## Next Candidate
- Figma tool이 보이는 세션에서 `Home/Desktop`과 mobile frame에 voice demo states 반영
- 작업일지 / 메모리 저장 / 커밋
