# Velora Voice Home Voice Demo State Update

## Goal
- Reflect the implemented homepage voice demo in Figma so the design file stays aligned with the tested UI.

## Current Figma Status
- File key: `BHNgq4ZWHg3CyiN2fm5qHh`
- Page: `Homepage`
- Live parity root frame now exists:
  - `Voice Demo State Parity`
  - node id: `12:2`
- Desktop and mobile state families were added as real Figma frames.
- Reusable component set now also exists:
  - `VoiceDemo/StateParity`
  - node id: `15:659`
  - axes: `State x Device`
  - variant count: `14`

## Source of Truth
- Code:
  - [components/VoiceDemo.tsx](/Users/macminim2-choi/PROJECT/Job1/components/VoiceDemo.tsx)
  - [lib/useVoiceDemo.ts](/Users/macminim2-choi/PROJECT/Job1/lib/useVoiceDemo.ts)
- Captured reference states:
  - [idle.png](/Users/macminim2-choi/PROJECT/Job1/artifacts/voice-demo-states/idle.png)
  - [listening.png](/Users/macmin2-choi/PROJECT/Job1/artifacts/voice-demo-states/listening.png)
  - [thinking.png](/Users/macmin2-choi/PROJECT/Job1/artifacts/voice-demo-states/thinking.png)
  - [speaking.png](/Users/macmin2-choi/PROJECT/Job1/artifacts/voice-demo-states/speaking.png)
  - [error.png](/Users/macmin2-choi/PROJECT/Job1/artifacts/voice-demo-states/error.png)

## State Frames To Add
- `Demo/Idle`
- `Demo/Permission`
- `Demo/Listening`
- `Demo/Thinking`
- `Demo/Speaking`
- `Demo/Error`
- `Demo/PostSession`

## Each Frame Diff From Idle
- `Idle`
  - Status pill: `체험 시작하기를 누르면 브라우저가 마이크 권한을 확인합니다.`
  - Primary CTA: `체험 시작하기`
  - Transcript placeholder visible
  - Reply placeholder visible
  - Waveform uses low blue bars
- `Permission`
  - Status pill: `권한 확인 중...`
  - CTA switches to `중지하기`
  - Waveform bars rise slightly
- `Listening`
  - Status pill: `듣고 있어요...`
  - CTA stays `중지하기`
  - Waveform bars reach the tallest blue range
  - Transcript panel begins to fill
- `Thinking`
  - Status pill: `생각 중...`
  - Waveform settles into calmer indigo motion
  - Transcript is fixed, reply is not final yet
- `Speaking`
  - Status pill: `응답을 들려주는 중...`
  - Reply panel is populated
  - Waveform shifts to indigo/purple accent
- `Error`
  - Status pill + alert copy: `마이크 권한이 필요합니다. 브라우저 설정에서 마이크를 허용해주세요.`
  - Waveform collapses into muted red/orange bars
  - CTA returns to `체험 시작하기`
- `PostSession`
  - Parent state is visually idle
  - Primary CTA: `체험 시작하기`
  - Secondary CTA appears: `다시 질문하기`
  - Transcript and reply remain visible

## Mobile Frame Notes
- Keep the demo section in a single-column stack.
- Preserve card order:
  1. `체험 흐름`
  2. `음성 세션 상태`
  3. `대화 미리보기`
- Keep the status card visually strongest.
- Preserve minimum waveform height at roughly the current implemented size.
- Keep the primary CTA reachable without horizontal overflow.

## Copy Locks
- Section eyebrow: `실시간 음성 데모`
- Section title: `말하는 순간 바로 보이는 실시간 음성 인터랙션`
- Primary CTA idle: `체험 시작하기`
- Primary CTA active: `중지하기`
- Secondary CTA: `다시 질문하기`
- Transcript placeholder:
  - `마이크를 켜면 인식된 질문이 여기에 표시됩니다.`
- Reply placeholder:
  - `음성 결과가 준비되면 이곳에 텍스트와 함께 응답 흐름이 이어집니다.`

## Test Alignment Locks
- Preserve a discrete status pill in Figma; implementation tests assert status text changes directly.
- Preserve waveform as an independent region; implementation uses `aria-label="waveform"`.
- Preserve transcript and reply as separate panels; implementation tests target them independently.
- Preserve the post-session secondary CTA state; this is now part of the implemented behavior.

## Residual Risk
- If Figma collapses the status pill into generic body text or renames the CTA/state copy, design and implementation will drift and CI assertions will stop representing the intended UX.
- GitHub branch protection and required checks still remain an external hosting-side step; the design file is no longer the blocker.
