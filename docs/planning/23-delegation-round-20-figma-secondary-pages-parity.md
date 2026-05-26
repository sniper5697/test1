# Round 20 - Figma Secondary Pages Parity

## Goal
- 현재 구현된 secondary pages를 Figma 파일 안에 desktop parity root로 반영해 code-to-design drift를 줄인다.

## Delegation
- Agent G
  - frame list: `About/Desktop`, `Service/Desktop`, `FAQ/Desktop`, `Login/Desktop`, `Signup/Desktop`
  - shared layout rules: eyebrow -> title -> lead hierarchy, 3-column/2-column section rhythm, shared CTA band
- Agent C
  - CTA semantics, hierarchy, section spacing, auth split-panel structure 기준으로 approve gate 제시

## Figma Target
- File key: `BHNgq4ZWHg3CyiN2fm5qHh`
- Page id: `0:1` `Homepage`

## Execution
- Existing homepage and `VoiceDemo/StateParity` component set 오른쪽에 새 parity root를 추가했다.
- New root:
  - name: `Secondary Pages/Desktop`
  - node id: `16:2`
- Child page frames:
  - `About/Desktop` -> `16:5`
  - `Service/Desktop` -> `16:45`
  - `FAQ/Desktop` -> `16:104`
  - `Login/Desktop` -> `16:131`
  - `Signup/Desktop` -> `16:167`

## Content Locks Applied
- marketing pages는 모두 eyebrow / title / lead / section card / CTA band 순서를 유지한다.
- CTA labels는 코드와 동일한 funnel 기준으로 유지한다.
- auth pages는 left intro card + right auth card split-panel 구조를 유지한다.
- login intro는 waveform preview, signup intro는 feature chips를 유지한다.

## Evidence
- Screenshot artifact:
  - [artifacts/figma/secondary-pages-desktop-parity.png](/Users/macminim2-choi/PROJECT/Job1/artifacts/figma/secondary-pages-desktop-parity.png)

## Agent C Gate
- `APPROVE criteria` 기준 충족:
  - CTA semantics preserved
  - hierarchy preserved
  - spacing rhythm preserved
  - auth split-panel preserved

## Verdict
- `APPROVE`
