# Project Memory

## 기본 정보
- 프로젝트명: `Job1`
- 프로젝트 목적: 홈페이지 제작
- 시작일: 2026-05-22
- 현재 단계: Phase 2 Design 진행 중

## 운영 구조
- 협업 패턴: 사용자 -> Codex 감독관 -> 작업 에이전트 3명 -> Codex 감독관
- 감독관 원칙: 직접 구현보다 분해, 위임, 반려, 재지시, 통합 판단 우선
- 사용자 개입 시점: 우선순위 변경, 정책 선택, 예외 승인, 종료/보류 판단

## 에이전트 구성
- Coding: Ollama Cloud `kimi k2.6 cli`
- Design: `gemini cli`
- Verification: `claude cli`

## 기본 작업 흐름
- Discovery: `$socrates` 스킬로 상세 질문 진행
- Planning: 기능 -> 화면 -> 컴포넌트 순서로 구조화
- Implementation: `stitch`로 웹페이지 작성, TDD 사이클 적용
- Design Framing: `stitch`로 구성한 웹페이지를 기준으로 `figma`에서 구조와 프레임 정리
- Verification: Playwright 직접 디버깅 및 E2E 검증
- Release: CI/CD 자동화 파이프라인 통과 후 배포 판단

## 현재 구현/설계 상태
- `docs/planning/` 문서 3종으로 목표, 페이지 역할, 빌드 범위를 정리했다.
- 홈 페이지는 전체 페이지 단위와 섹션 단위 Stitch 생성을 모두 시도했다.
- 현재 전략은 `전체 홈 한 번에 생성`이 아니라 `섹션 단위 생성 -> Figma 조립`이다.
- Figma 조립 기준은 `docs/figma/home-frame-assembly.md`에 정리돼 있다.

## 품질 기준
- 모든 기능은 TDD 사이클을 따른다.
- Playwright는 실제 사용자 흐름 디버깅과 E2E 검증에 사용한다.
- CI/CD에는 테스트, 린트, 빌드, 필요시 배포 검증을 포함한다.
- 증거 없는 완료/통과 판정 금지

## 주요 디렉토리
- `/AGENTS.md` - 감독관 운영 규칙과 협업 원칙
- `/.claude/memory/` - 프로젝트 메모리
- `/docs/worklog/` - 일일 작업 기록

## 현재 결정 사항
- 홈페이지 초기 질문은 `$socrates` 스킬을 사용한다.
- 실제 웹페이지 작성은 `stitch`를 사용한다.
- `figma`는 `stitch`로 구성한 웹페이지를 바탕으로 각 페이지 구조와 프레임을 정리하는 용도로 사용한다.
- 임시 서비스명은 `Velora Voice`다.
- 1차 목표는 잠재 고객을 설득해 같은 페이지 내 `데모 보기` CTA로 음성 대화 데모 체험으로 유도하는 것이다.
- 핵심 가치 3개는 `정확도`, `속도`, `실시간성`이다.
- 1차 페이지 범위는 `홈 + 소개 + 서비스 + FAQ + 로그인 + 회원가입`이다.
- 홈의 핵심 데모 흐름은 `마이크 권한 허용 -> 말하기 -> 파형 표시 -> 응답 재생/텍스트 표시`다.
- 로그인/회원가입은 1차에서 화면만 구현한다.
- 소개 페이지는 `회사 소개`, `비전`, `연락처`를 포함하고 별도 문의 페이지는 1차에서 제외한다.
- 서비스 페이지는 `기능 요약`, `사용 흐름`, `기술 강점`, `적용 분야`, `데모 CTA`를 포함한다.
- FAQ는 홈 요약과 별도 페이지 둘 다 포함한다.
- 디자인 방향은 `ElevenLabs`의 톤/레이아웃, `셀바스AI`의 정보 배치, `유리질감`, `부드러운 모션`, 비블랙톤, 비템플릿 감성이다.
- Stitch는 OAuth + quota project 기반으로 사용한다.
- Stitch setup은 `~/.codex/skills/stitch-setup/` 스킬로 재사용 가능하다.
- Figma setup은 `~/.codex/skills/figma-setup/` 스킬로 재사용 가능하다.
- 홈 기준 usable한 Stitch 섹션은 `home-demo-v2`, `home-values-features`, `home-proof`, `home-bottom`이다.
- `hero`는 아직 웹 히어로보다 비주얼 카드 성향이 강하므로 Figma에서 재구성 가능성을 열어둔다.
- compact 시 보존: 프로젝트 아키텍처 개요, 네이밍 규칙, 중요 결정, 현재 TODO, 보안/성능 제약
- compact 시 폐기: 실패한 실험, 반복 디버그 로그, 초기 브레인스토밍

## 현재 TODO
- 홈 프레임을 Figma에 실제로 조립
- `소개`, `서비스`, `FAQ`, `로그인`, `회원가입` Stitch 생성 및 검토
- 구현 단계용 기능 분해와 TDD 순서 확정
- STT-TTS 데모 구현 범위와 Playwright 핵심 시나리오를 코드 수준으로 구체화
