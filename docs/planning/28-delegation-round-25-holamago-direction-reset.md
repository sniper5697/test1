# Delegation Round 25: Holamago Direction Reset

## Goal

- 홈 리디자인 기준 레퍼런스를 `holamago.com` 계열로 재설정한다.
- 기존 A1의 premium landing 방향을 `voice AI company-site` 방향으로 조정한다.
- demo-first 구조와 current route semantics는 유지한다.

## Delegated Guidance

### Agent G

- 빌려올 요소:
  - sophisticated whitespace
  - high-craft typography
  - premium company-site rhythm
- 피할 요소:
  - agency / portfolio layout
- 추천 방향:
  - `tactile minimalism`
  - demo가 살아 있는 voice-AI company site

### Agent K

- 예상 구조 변화:
  - editorial landing -> company narrative homepage
  - bold typography + trust/technology blocks
  - existing demo section and routes preserved
- 최대 리스크:
  - 설명 섹션이 늘며 demo discoverability와 mobile performance가 나빠질 수 있음
- 안전한 rollout:
  - Figma 기준 먼저 정리
  - homepage-only 조정
  - local/CI gate 후 배포

### Agent C

- must-preserve behaviors:
  - hero CTA `데모 보기`
  - same-page `#demo`
  - current routes
  - no mobile overflow
- approval condition:
  - voice AI company-site tone + demo-first behavior가 동시에 유지될 것

## Output

- 새 기준 spec:
  - `docs/superpowers/specs/2026-05-28-velora-home-redesign-holamago-design.md`
- 새 Figma guide:
  - `docs/figma/home-redesign-holamago-guide.md`

## Next

- 다음 라운드에서 Figma에 `holamago-inspired company-site` 비교안을 만든다.
- 이후 코드 톤 조정은 그 다음이다.
