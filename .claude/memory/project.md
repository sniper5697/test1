# Project Memory

## 기본 정보
- 프로젝트명: `Job1`
- 프로젝트 목적: 홈페이지 제작
- 시작일: 2026-05-22
- 현재 단계: Phase 0 준비 완료, 본격 작업은 2026-05-23부터 시작 예정

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
- Design: `figma`로 웹페이지 구조와 화면 설계
- Implementation: `stitch`로 웹페이지 작성, TDD 사이클 적용
- Verification: Playwright 직접 디버깅 및 E2E 검증
- Release: CI/CD 자동화 파이프라인 통과 후 배포 판단

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
- 각 웹페이지 구조 설계는 `figma`를 사용한다.
- compact 시 보존: 프로젝트 아키텍처 개요, 네이밍 규칙, 중요 결정, 현재 TODO, 보안/성능 제약
- compact 시 폐기: 실패한 실험, 반복 디버그 로그, 초기 브레인스토밍

## 현재 TODO
- Phase 0 상세 질문 수행
- 홈페이지 요구사항과 페이지 구조 확정
- 필요 시 `docs/planning/` 기획 문서 생성
- 테스트 전략 및 Playwright 핵심 시나리오 정의
