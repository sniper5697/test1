# Velora Voice Home Frame Assembly

## Status
- Stitch section references are ready.
- This document defines how to assemble the homepage in Figma once `create_new_file` / `use_figma` become callable.

## Frame Goal
- Build one desktop homepage frame for `Velora Voice`
- Use the current Stitch sections as visual references
- Keep one unified bright premium tech design system

## Root Frame
- Name: `Home/Desktop`
- Width: `1440`
- Direction: vertical page composition
- Background: near-white with soft blue gradient atmosphere
- Outer padding: `64`
- Section gap: `48` to `72`

## Section Order
1. `Nav + Hero`
2. `핵심 가치 + 주요 기능`
3. `실시간 음성 데모`
4. `활용 분야`
5. `자주 묻는 질문 + 최종 CTA + Footer`

## Reference Sources
- Hero reference:
  - [artifacts/stitch/home-hero-v2/screen.png](/Users/macminim2-choi/PROJECT/Job1/artifacts/stitch/home-hero-v2/screen.png)
- Values/features reference:
  - [artifacts/stitch/home-values-features/screen.png](/Users/macminim2-choi/PROJECT/Job1/artifacts/stitch/home-values-features/screen.png)
- Demo reference:
  - [artifacts/stitch/home-demo-v2/screen.png](/Users/macminim2-choi/PROJECT/Job1/artifacts/stitch/home-demo-v2/screen.png)
  - [artifacts/voice-demo-states/idle.png](/Users/macminim2-choi/PROJECT/Job1/artifacts/voice-demo-states/idle.png)
  - [artifacts/voice-demo-states/listening.png](/Users/macminim2-choi/PROJECT/Job1/artifacts/voice-demo-states/listening.png)
  - [artifacts/voice-demo-states/thinking.png](/Users/macminim2-choi/PROJECT/Job1/artifacts/voice-demo-states/thinking.png)
  - [artifacts/voice-demo-states/speaking.png](/Users/macminim2-choi/PROJECT/Job1/artifacts/voice-demo-states/speaking.png)
  - [artifacts/voice-demo-states/error.png](/Users/macminim2-choi/PROJECT/Job1/artifacts/voice-demo-states/error.png)
- Proof reference:
  - [artifacts/stitch/home-proof/screen.png](/Users/macminim2-choi/PROJECT/Job1/artifacts/stitch/home-proof/screen.png)
- Bottom reference:
  - [artifacts/stitch/home-bottom/screen.png](/Users/macminim2-choi/PROJECT/Job1/artifacts/stitch/home-bottom/screen.png)

## Assembly Rules

### 1. Hero
- Use the V2 hero image as mood and card treatment reference, not as final copy source
- Replace English drift with:
  - brand: `Velora Voice`
  - headline: `실시간 음성 AI를 더 빠르고 정확하게`
  - CTA: `데모 보기`
- Keep only one primary CTA

### 2. Values + Features
- Use current section almost as-is
- Tighten copy to product language if needed
- Keep Korean section headings:
  - `핵심 가치`
  - `주요 기능`

### 3. Demo
- Use `home-demo-v2` as the strongest source for base layout
- Use `artifacts/voice-demo-states/*.png` as the source of truth for dynamic states
- Keep:
  - waveform center panel
  - left-side state summary
  - right-side transcript/result
- Replace extra nav or drift labels if they exist
- Keep title:
  - `실시간 음성 데모`
- Build the interactive state family in Figma, not only the idle snapshot:
  - `Demo/Idle`
  - `Demo/Listening`
  - `Demo/Thinking`
  - `Demo/Speaking`
  - `Demo/Error`

### 4. Proof
- Use `활용 분야` card grid from current Stitch result
- Remove unnecessary top navigation repetition in final Figma assembly
- Treat it as an internal section only

### 5. Bottom
- Use FAQ accordion + CTA + footer structure from current Stitch result
- Keep title:
  - `자주 묻는 질문`
- Keep final CTA:
  - `지금 데모를 시작해보세요`
  - `데모 보기`

## Unification Fixes
- Remove all alternate brands such as `AURA`
- Remove English-first nav patterns where they conflict with the approved Korean-first direction
- Standardize primary accent blue across all imported references
- Standardize border radius and panel elevation
- Standardize top-level spacing and vertical rhythm

## Figma Execution Checklist
1. Create new design file
2. Create root frame `Home/Desktop`
3. Place five section frames in vertical order
4. Rebuild each section using Stitch outputs as visual guides
5. Normalize:
   - typography
   - colors
   - spacing
   - CTA style
6. Mark reusable components:
   - nav
   - primary button
   - glass card
   - section title
   - voice status pill
   - waveform bar set
   - voice transcript panel
   - voice reply panel
   - FAQ row
   - footer link group

## Ready State
- Once Figma tools are callable, this document should be the direct build guide for assembling the homepage frame.
