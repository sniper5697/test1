# Delegation Round 01: Home Readiness

## Round Goal
- 홈 페이지를 구현 단계로 넘길 수 있는 실행 기준 패키지 확보

## Success Criterion
- 홈 페이지에 대해
  - 디자인 보정 포인트
  - 구현/TDD 분해
  - 검증 게이트
  를 각각 실제 에이전트 응답으로 회수한다.

## Agent G: Design

### Strengths
- 밝은 프리미엄 테크 톤과 글래스모피즘 방향은 적절하다.
- Hero -> Value -> Demo 흐름이 논리적이다.
- 파형과 전사 영역 중심의 데모 구조가 제품 가치를 잘 드러낸다.

### Required Fixes
- `AURA` 등 잔여 브랜드 제거, `Velora Voice`와 한국어 우선 표기로 통일
- `데모 보기` CTA 스타일 전역 통일
- 섹션 간 vertical rhythm 정규화
- 카드 radius, blur, elevation 일관성 통일
- 범위 밖 내비게이션 항목 제거

### Copy Notes
- Hero 헤드라인은 `실시간 음성 AI를 더 빠르고 정확하게`
- Hero 서브카피에 `정확도`, `속도`, `실시간성` 명시
- Demo 상태 문구는 한국어로 통일
- FAQ는 정확도와 연동 용이성 중심으로 정리

### Mobile Cautions
- 파형 영역의 가로 반응형 유지
- 전사 패널은 max-height + internal scroll 필요

### Verdict
- `REVISE`
- 시각 방향은 승인 가능하지만, 브랜드/간격/CTA 통일 후 구현으로 넘기는 편이 맞다.

## Agent K: Coding

### Components To Build
- `app/page.tsx`
- `sections/Hero`
- `sections/Features`
- `sections/SocialProof`
- `sections/CTA`
- `layout/Navbar`
- `layout/Footer`
- `ui/Button`
- `ui/Card`

### Failing Tests First
- Hero가 제품명과 primary CTA를 렌더링하는지
- Features가 3개 가치 카드와 설명을 렌더링하는지
- SocialProof가 신뢰 요소를 렌더링하는지
- CTA가 접근 가능한 버튼/링크를 제공하는지
- Navbar가 모바일 메뉴 동작을 가지는지
- Button이 variant/disabled 동작을 보장하는지
- Playwright 기준 `/`의 title, 라우팅, 기본 접근성 상태가 맞는지

### Implementation Order
1. `layout.tsx`와 base styles
2. `ui/Button`, `ui/Card` 테스트 후 구현
3. 섹션 테스트 작성
4. 섹션 구현
5. `page.tsx` 조립
6. Playwright 홈 E2E
7. 반응형/모션 보정

### Risks
- 데모 미디어가 LCP를 해칠 수 있음
- Figma spacing token을 코드 토큰으로 옮겨야 함
- `/signup` 라우트는 임시 stub가 필요할 수 있음
- gradient 위 텍스트 대비 검증 필요

### Done Criteria
- Vitest green
- 홈 주요 E2E green
- Lighthouse 성능/접근성 기준 충족
- Figma spacing/typography 기준과 크게 어긋나지 않음
- hydration error 없음

## Agent C: Verification

### Critical Playwright Journeys
- J1: 홈 첫 진입 시 Hero와 CTA가 데스크톱/모바일에서 모두 보이는지
- J2: Hero의 `데모 보기` 클릭 시 같은 페이지의 데모 섹션으로 스크롤 이동하는지
- J3: 하단 CTA의 `데모 보기`도 동일한 데모 섹션으로 이동하는지
- J4: Nav의 `로그인`, `회원가입` 링크가 각각 `/login`, `/signup`으로 정상 이동하는지
- J5: 모바일 뷰포트에서 데모 섹션, 파형 패널, 전사 영역이 가로 overflow 없이 보이는지

### Assertions
- Hero에 단일 `데모 보기` CTA가 보여야 한다.
- 데모 이동은 full navigation이 아니라 same-page scroll이어야 한다.
- `/login`, `/signup`은 200 응답과 폼 heading을 가져야 한다.
- 모바일에서 waveform DOM이 존재하고 `offsetWidth <= viewport width`를 만족해야 한다.
- 모바일 horizontal scrollbar가 없어야 한다.

### Likely Failure Modes
- CTA가 same-page scroll 대신 새 라우트로 이동
- 모바일 데모 패널 고정폭으로 인해 overflow 발생
- Hero/하단 CTA의 scroll target 불일치
- Nav 링크가 placeholder 상태로 남음

### Evidence Required To Approve
- 1440px와 390px 기준 Playwright report green
- 모바일 hero above-the-fold screenshot
- `/`, `/login`, `/signup` 네트워크 4xx 없음
- 모바일 가로 스크롤 없음

### Verdict
- `REVISE`
- 구현 전 검증 게이트는 충분히 정의됐지만, 아직 실제 실행 대상이 없다.

## Supervisor Decision
- 이번 라운드는 `완료`다.
- G/K/C 세 축의 실행 기준을 모두 실제 에이전트 응답으로 회수했다.
- 다만 verdict는 공통적으로 `REVISE`다. 즉, 구현 시작 전 홈 프레임 보정이 먼저다.

## Immediate Next Actions
1. 홈 Figma 프레임에서
   - 브랜드 흔적 제거
   - CTA 스타일 통일
   - 섹션 간 spacing 정규화
   - 모바일 overflow 리스크 보정
2. 보정 후 홈 구현 라운드 승인
3. Agent K 기준으로 홈 TDD 구현 착수

## Verification Reinforcement

### Added Unit Coverage
- `components/Hero.test.tsx`
  - Hero heading 렌더링
  - Hero CTA `href="#demo"`
- `app/page.test.tsx`
  - 주요 메뉴의 `/service`, `/about`, `/faq`, `/login`, `/signup` 링크 확인
  - Hero/하단 `데모 보기` CTA 2개와 `#demo` 타깃 존재 확인

### Added Playwright Coverage
- `e2e/home.spec.ts`
  - Hero CTA -> same-page `#demo` 이동
  - 하단 CTA -> same-page `#demo` 이동
  - Nav `로그인` -> `/login`
  - Nav `회원가입` -> `/signup`
  - 모바일 390px에서 Hero CTA -> `#demo` 이동
  - 모바일 horizontal overflow 없음 확인

### Validation Evidence
- `npm run test:unit` green
- `npx tsc --noEmit` green
- `npm run test:e2e` green

### Agent C Re-Review
- 판정: `APPROVE`
- 통과 근거:
  - Hero/Nav/CTA 기준 unit coverage 확보
  - same-page CTA, auth route, 모바일 overflow 기준 E2E 확보
  - 로컬 검증 3종 green
- 남은 리스크:
  - `/login`, `/signup` 페이지 자체 unit test 미구축
  - CI 환경 재현 여부 미확인
  - 태블릿 768px 시나리오 미검증

## Supervisor Update
- 홈 검증 보강 라운드는 `완료`다.
- 이번 라운드 기준으로 홈 baseline은 구현 승인 상태다.
- 다음 라운드는
  1. `/login`, `/signup` 자체 unit coverage 추가 여부 판단
  2. 소개/서비스/FAQ 화면 고도화
  3. CI 파이프라인 연결
  순서로 진행한다.
