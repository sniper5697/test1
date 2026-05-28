# Velora Voice Homepage Redesign Design

## Summary

Velora Voice 홈페이지를 `A1` 방향으로 리디자인한다. 핵심은 `UMANO DESIGN STUDIO`의 타이포 중심 프리미엄 무드를 기본 축으로 삼고, `Trading Platform` 레퍼런스의 제품 패널 감각을 `실시간 음성 데모` 섹션에만 제한적으로 섞는 것이다. 전체 페이지는 밝고 정제된 브랜드 랜딩으로 유지하고, 데모 구간만 제품 경험이 강하게 느껴지도록 대비를 준다.

## Goal

- 첫 화면에서 `Velora Voice`를 프리미엄 AI 음성 제품으로 인식시킨다.
- 현재 baseline의 정보 구조는 유지하되 시각 계층과 브랜드 인상을 대폭 강화한다.
- `실시간 음성 데모`를 페이지의 핵심 설득 장치로 승격한다.
- 금융/트레이딩 서비스처럼 오인될 정도로 차가운 제품 톤은 피한다.

## Non-Goals

- 페이지 IA 자체를 다시 설계하지 않는다.
- 코드 구현 변경을 먼저 하지 않는다.
- 과도한 WebGL, 3D, 과장된 모션으로 성능을 희생하지 않는다.
- 레퍼런스 사이트를 그대로 복제하지 않는다.

## Source References

- UMANO DESIGN STUDIO:
  - type-led premium landing
  - strong orange accent
  - editorial spacing
- Trading Platform Web Design:
  - dark product panel
  - dense status UI
  - strong contrast
- Educational Platform Web Design:
  - readable information grouping
  - soft card organization

## Chosen Direction: A1

### Core Formula

- `UMANO` 60
- `Trading Platform` 30
- `Educational Platform` 10

### Why This Direction

- Velora Voice는 현재 `브랜드 인상 + 데모 체험 유도`가 우선이다.
- 전면 다크 제품 UI로 가면 음성 AI보다 금융 툴로 보일 위험이 있다.
- 강한 타이포와 제한된 강조색을 쓰면 프리미엄 AI 브랜드 톤을 만들기 쉽다.
- 데모 섹션만 어둡게 전환하면 제품감과 설득력을 동시에 확보할 수 있다.

## Visual System

### Background

- 기본 배경은 `warm off-white` 또는 `soft cream`.
- 순백보다는 약간 따뜻한 톤으로 고급스러운 밀도를 만든다.
- 배경 장식은 최소화하고, 큰 면적의 여백과 옅은 기울기만 허용한다.

### Accent

- 주 포인트는 `orange/coral` 계열 하나로 제한한다.
- 현재 블루 기반 강조는 보조 정보 색 또는 데모 내부 상태 색으로만 사용한다.
- CTA, 포인트 키워드, active 상태에서만 강한 강조를 사용한다.

### Typography

- Hero headline은 페이지의 주인공이어야 한다.
- 제목은 크고 짧고 무겁게 쓴다.
- 본문은 줄간격을 넓혀 읽기 쉬운 editorial rhythm을 만든다.
- 한 화면에 너무 많은 폰트 스타일을 두지 않는다.

### Panels and Cards

- 일반 정보 카드는 밝은 배경 위에서 얇은 경계와 은은한 그림자를 사용한다.
- `실시간 음성 데모` 섹션은 별도의 dark panel system으로 분리한다.
- 둥근 radius는 유지하되 지나치게 귀엽지 않게 정리한다.

## Homepage Layout Direction

### 1. Nav + Hero

- Hero는 `대형 타이포 + 짧은 제품 정의 + 단일 주 CTA` 구조로 단순화한다.
- 시선은 로고보다 headline으로 바로 떨어져야 한다.
- Hero 보조 비주얼은 큰 카드 하나 또는 절제된 mock panel 하나만 둔다.
- 서브카피는 현재보다 짧고 날카롭게 정리한다.

### 2. Values + Features

- 카드 수를 줄이거나 최소한 더 넓게 배치한다.
- 정보 밀도보다 핵심 가치의 선명함을 우선한다.
- 아이콘보다 타이포와 문장 리듬으로 구분한다.

### 3. Voice Demo

- 이 섹션은 페이지 안의 `제품 스테이지`처럼 보여야 한다.
- 배경을 어둡게 전환해 제품 경험이 시작된다는 감각을 준다.
- 상태 pill, waveform, transcript, reply panel의 위계를 더 강하게 만든다.
- 데모 CTA는 여기서 가장 신뢰감 있는 실행 버튼으로 보여야 한다.

### 4. Proof / Use Cases

- 활용 분야는 밝은 배경으로 다시 환기한다.
- 카드 배열은 단정하게 유지하되 타이틀과 수직 리듬을 더 크게 가져간다.

### 5. FAQ + Final CTA + Footer

- 마지막 CTA는 Hero보다 작지만 더 확신 있게 정리한다.
- Footer는 장식보다 브랜드 마감감에 집중한다.

## Motion Direction

- Hero 텍스트와 패널은 부드러운 reveal만 사용한다.
- 데모 섹션에서는 subtle waveform/state transition만 강조한다.
- 과장된 parallax, heavy scroll effect는 사용하지 않는다.

## Brand Constraints

- 금융/차트 서비스처럼 오인될 수 있는 차트 중심 hero는 금지.
- 보라색 중심 palette는 사용하지 않는다.
- 지나친 glassmorphism과 범용 SaaS 템플릿 느낌은 피한다.

## Figma Update Scope

- Existing file:
  - `BHNgq4ZWHg3CyiN2fm5qHh`
- Target page:
  - `Homepage`
- Update targets:
  - `Home/Desktop`
  - `Home/Mobile`
  - `Voice Demo State Parity`

## Figma Execution Checklist

1. `Home/Desktop`를 A1 무드에 맞게 재구성한다.
2. Hero를 타이포 중심 구조로 단순화한다.
3. 공통 배경/색/CTA/타이포 규칙을 새로 통일한다.
4. 데모 섹션을 dark product stage로 재설계한다.
5. `Home/Mobile`도 같은 위계로 맞춘다.
6. voice demo parity component가 새 스타일과 충돌하지 않게 축약 조정한다.

## Implementation Impact

- 이후 코드 반영 시 가장 큰 영향은 다음이다.
- `app/page.tsx`
- hero typography hierarchy
- CTA color system
- section spacing tokens
- voice demo panel styling

## Validation Gates

- Figma에서 Home/Desktop과 Home/Mobile이 같은 디자인 언어를 공유해야 한다.
- Hero, Demo, Final CTA 세 곳의 CTA 스타일은 동일 계열이어야 한다.
- 데모 섹션은 다른 섹션과 명확히 구분되되, 브랜드 전체와 단절되어 보이면 안 된다.
- 모바일에서도 headline, CTA, demo status card의 위계가 유지되어야 한다.

## Recommendation

다음 작업은 코드 수정이 아니라 Figma 기준 프레임 수정이다. Figma에서 A1 방향이 시각적으로 안정되면, 그 다음에만 구현 라운드로 넘어간다.
