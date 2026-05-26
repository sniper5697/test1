# Round 21 - Figma Secondary Pages Mobile Parity

## Goal
- secondary pages의 mobile parity를 390px single-column 기준으로 Figma에 추가한다.

## Delegation
- Agent G
  - frame names: `m-about`, `m-service`, `m-faq`, `m-login`, `m-signup`
  - rules: 390px base width, 1-column stack, 44px tap target, auth stacked layout
- Agent C
  - CTA semantics, single-column rhythm, no overflow cues, auth stacked structure 기준 approve gate 제시

## Figma Target
- File key: `BHNgq4ZWHg3CyiN2fm5qHh`
- Page id: `0:1` `Homepage`

## Execution
- New root:
  - name: `Secondary Pages/Mobile`
  - node id: `17:2`
- Child page frames:
  - `About/Mobile` -> `17:5`
  - `Service/Mobile` -> `17:25`
  - `FAQ/Mobile` -> `17:48`
  - `Login/Mobile` -> `17:71`
  - `Signup/Mobile` -> `17:102`

## Content Locks Applied
- marketing pages는 모두 single-column hero -> stacked cards -> CTA band 구조다.
- CTA hierarchy는 desktop과 동일하게 `데모 보기` primary, contextual secondary를 유지한다.
- auth pages는 intro card -> auth card -> footer nudge 순서로 stack된다.

## Evidence
- Screenshot artifact:
  - [artifacts/figma/secondary-pages-mobile-parity.png](/Users/macminim2-choi/PROJECT/Job1/artifacts/figma/secondary-pages-mobile-parity.png)

## Verdict
- `APPROVE`
