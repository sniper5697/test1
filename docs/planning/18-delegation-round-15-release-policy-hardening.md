# Delegation Round 15: Release Policy Hardening

## Round Goal
- 저장소 안에서 관리 가능한 release 정책과 PR gate 기준을 문서와 템플릿으로 고정한다.

## Success Criterion
- release 전 반드시 확인해야 할 gate, artifact, rollback 절차가 문서화된다.
- PR 단계에서 `check`, `e2e`, `smoke`를 빠뜨리지 않도록 템플릿이 추가된다.
- GitHub UI에서 별도로 적용해야 할 외부 운영 항목이 분리되어 남는다.

## Delegation Summary

### Agent G
- user-visible release checklist는 hero, voice demo, mobile overflow, 핵심 child route surface를 중심으로 좁히는 편이 좋다.
- handoff에는 final screenshots와 release protocol이 남아야 한다.

### Agent K
- 가장 적절한 목표는 release path integrity를 문서와 정책으로 고정하는 것이다.
- repo 파일로는 release policy 문서와 PR template이 가장 자연스럽다.
- branch protection 자체는 GitHub UI에서 적용해야 하므로 저장소 문서로 분리해야 한다.

### Agent C
- 정책이 증명해야 할 것:
  - `main` required checks
  - artifact retention contract
  - smoke-gated release
  - rollback 절차
  - env/secret hygiene
- out of scope:
  - Figma parity
  - backend API integration
  - Lighthouse/security scan

## Supervisor Action
- `docs/release-policy.md`
  - green gates
  - branch/merge policy
  - artifact retention
  - production smoke contract
  - rollback procedure
  - env/secret hygiene
  - external ops pending
- `.github/PULL_REQUEST_TEMPLATE.md`
  - `check`, `e2e`, `smoke`
  - release evidence
  - rollback strategy

## Evidence
- [release-policy.md](/Users/macminim2-choi/PROJECT/Job1/docs/release-policy.md)
- [PULL_REQUEST_TEMPLATE.md](/Users/macmin2-choi/PROJECT/Job1/.github/PULL_REQUEST_TEMPLATE.md)
- 기존 green gates 유지:
  - `npm run test:unit`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run test:smoke`

## Result
- Verdict: `APPROVE`
- note:
  - GitHub branch protection 실제 적용은 repo 밖 운영 단계라 이번 라운드에서는 문서화까지만 닫았다.

## Next Candidate
- Figma tool이 callable한 세션에서 홈 voice demo state를 실제 Figma frame에 반영
- GitHub UI access가 가능해지면 branch protection을 실제 적용하는 운영 라운드 진행
