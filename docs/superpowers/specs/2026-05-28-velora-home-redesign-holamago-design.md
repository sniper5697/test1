# Velora Voice Homepage Redesign Design v2

## Summary

Velora Voice 홈페이지를 `holamago.com` 계열의 회사 소개형 구조로 재정렬한다. 목표는 기존 A1의 `밝은 프리미엄 톤`은 유지하되, 에이전시풍 에디토리얼 랜딩보다 `Voice AI 회사 사이트`에 더 가까운 설득 구조로 바꾸는 것이다. 단, `실시간 음성 데모`는 Velora Voice의 핵심 차별점이므로 MAGO보다 더 강한 제품 체험 섹션으로 유지한다.

## Goal

- 첫 화면에서 `음성 AI 회사`라는 인상을 더 명확히 준다.
- 기술 설명, 문제 해결, 활용 가치가 홈 안에서 자연스럽게 이어지게 만든다.
- `#demo` 섹션은 여전히 가장 중요한 체험 CTA로 유지한다.
- 공개 사이트가 “예쁜 회사 소개”에서 끝나지 않고, `데모를 눌러보게 만드는 흐름`을 갖게 한다.

## Non-Goals

- MAGO를 그대로 복제하지 않는다.
- 기존 라우트 구조를 다시 설계하지 않는다.
- 데모 interactivity를 약화시키지 않는다.
- 과도한 포트폴리오/에이전시 무드로 흐르지 않는다.

## Reference Read

- [MAGO | 차세대 음성인식 AI](https://www.holamago.com/)

이 레퍼런스에서 유효한 핵심:
- 큰 카피 중심 hero
- 밝고 정돈된 회사 소개형 구성
- 문제/기술/플랫폼/사례 흐름
- 기술 신뢰감을 주는 tone

가져오지 않을 것:
- 포트폴리오/에이전시 같은 self-promotional layout
- 데모보다 설명이 앞서는 흐름
- 블록 수가 많아져 스크롤 피로를 높이는 패턴

## Chosen Direction

### Core Formula

- `holamago` 65
- existing Velora demo-first structure 25
- current A1 premium styling 10

### Why This Direction

- Velora Voice는 더 이상 단순 landing experiment가 아니라 `실제 회사/제품 소개 사이트`처럼 보여야 한다.
- MAGO의 구조는 음성 AI 기업의 신뢰도를 전달하는 데 적합하다.
- 다만 Velora Voice는 `데모 진입`이 더 중요하므로, MAGO보다 체험 흐름을 앞세워야 한다.

## Visual System

### Background

- 기본은 밝은 ivory / warm white.
- 배경 장식은 줄이고, section 분리와 typography hierarchy로 밀도를 만든다.

### Accent

- 오렌지/코랄 포인트는 유지한다.
- 데모 섹션 안쪽의 어두운 palette는 유지하되, 페이지 전체를 다크로 바꾸지 않는다.

### Typography

- hero headline은 크고 단단해야 한다.
- 하지만 A1보다 더 `기업 메시지`에 가까운 문장 구조를 쓴다.
- 짧은 영어 태그라인 + 한국어 핵심 문장 조합이 가능하다.

### Layout Character

- 단일 hero object보다 `회사 메시지 → 핵심 기술 → 데모 → 활용 가치`의 흐름이 중요하다.
- 카드형 UI는 줄이고, 넓은 section block과 strong headline 조합을 사용한다.
- 설명용 섹션은 읽히고, 데모 섹션은 체험되게 분리한다.

## Homepage Layout Direction

### 1. Hero

- `Velora Voice`를 차세대 음성 AI 회사/플랫폼으로 정의한다.
- 현재보다 설명형이되, hero 자체는 여전히 짧고 강해야 한다.
- primary CTA는 `데모 보기` 유지.
- secondary CTA가 필요하면 자료/서비스 이동보다 `기술 소개 보기` 정도의 약한 탐색 CTA로 둔다.

### 2. Core Capability Section

- 기존 `핵심 가치`를 더 회사 소개형으로 바꾼다.
- 예:
  - 음성 인식 정확도
  - 빠른 응답 흐름
  - 실시간 인터랙션
- 각 블록은 “기능 소개”보다 “기술이 비즈니스에 주는 가치”로 써야 한다.

### 3. Demo Section

- 이 섹션은 현재처럼 `dark product stage` 유지.
- MAGO 구조를 따르더라도, Velora는 여기서 제품을 직접 체험하게 만들어야 한다.
- 따라서 홈 전체에서 가장 강한 시각적 대비를 유지한다.

### 4. Technology / Use Case Narrative

- 활용 분야 섹션은 단순 use-case grid보다 `어떤 환경에서 어떤 가치가 나는지`가 드러나는 회사 설명 블록에 가깝게 바꾼다.
- `고객 상담`, `키오스크`, `업무 지원`, `브랜드 경험`은 유지 가능하나 제목/카피는 더 회사 사이트 톤으로 조정한다.

### 5. Trust / FAQ / Final CTA

- FAQ는 유지하되, 필요하면 `도입 전 체크포인트`처럼 더 신뢰 중심 제목으로 바꿀 수 있다.
- final CTA는 지금처럼 `데모 보기` 유지.
- footer는 미니멀하게 유지하되 기업 소개 사이트처럼 정리한다.

## Motion Direction

- 전반은 절제된 reveal.
- hero와 회사 설명 섹션은 motion보다 composition 중심.
- demo 섹션만 상태 변화가 살아 있어야 한다.

## Brand Constraints

- 레퍼런스의 company-site tone은 참고하되, 브랜드/카피/구성은 Velora Voice 문맥으로 완전히 바꾼다.
- portfolio/agency 사이트처럼 보이면 실패다.
- 데모 CTA가 스크롤 하단으로 밀리면 실패다.

## What Must Stay

- Brand: `Velora Voice`
- Hero CTA: `데모 보기`
- Demo eyebrow: `실시간 음성 데모`
- Current routes:
  - `/`
  - `/about`
  - `/service`
  - `/faq`
  - `/login`
  - `/signup`
- Demo interactivity and same-page `#demo`

## Figma Update Scope

- Existing file:
  - `BHNgq4ZWHg3CyiN2fm5qHh`
- Target page:
  - `Homepage`
- Update targets:
  - `Home/Desktop`
  - `Home/Mobile`

## Figma Execution Checklist

1. 기존 `A1` hero를 `회사 소개형 hero`로 조정한다.
2. values/features 영역을 `기술/가치 narrative blocks`로 재조합한다.
3. `demo`는 현재 dark stage를 유지하되, 앞뒤 섹션 톤과 더 자연스럽게 연결한다.
4. use cases를 `회사 소개형 설명 블록`으로 바꾼다.
5. mobile에서도 `hero → company trust → demo` 위계를 유지한다.

## Validation Gates

- 첫 화면이 `프리미엄 랜딩`보다 `음성 AI 회사 사이트`처럼 읽혀야 한다.
- hero 다음 섹션이 바로 기술/가치 신뢰를 쌓아야 한다.
- demo는 여전히 가장 강한 CTA section이어야 한다.
- mobile에서 정보량이 늘어도 overflow와 hierarchy 붕괴가 없어야 한다.

## Recommendation

다음 작업은 Figma에서 `A1` 비교안을 `holamago-inspired company-site` 방향으로 다시 정리하는 것이다. Figma 기준이 정리된 뒤에만 코드 톤을 다시 손본다.
