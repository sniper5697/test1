# GitHub Branch Protection Checklist

## Scope
- This checklist is for the repository that hosts `Velora Voice`.
- It assumes the CI workflow already exposes these required checks:
  - `check`
  - `e2e`
  - `smoke`

## Target Branch
- `main`

## UI Steps
1. Open the repository on GitHub.
2. Go to `Settings -> Branches`.
3. Add or edit a branch protection rule for `main`.
4. Enable `Require a pull request before merging`.
5. Enable `Dismiss stale pull request approvals when new commits are pushed`.
6. Enable `Require status checks to pass before merging`.
7. Mark these checks as required:
   - `check`
   - `e2e`
   - `smoke`
8. Enable `Require branches to be up to date before merging`.
9. Disable direct push by enabling branch protection for admins too, unless there is a hard operational exception.
10. Save the rule.

## Verify After Saving
- Open any open PR and confirm:
  - direct merge is blocked until all checks pass
  - stale approvals are dismissed on new commits
  - `check`, `e2e`, `smoke` appear as required checks

## Evidence To Capture
- Screenshot of the branch protection rule
- Screenshot of a PR showing required checks
- Commit SHA of the PR used for verification

## Notes
- This repo currently has no configured `gh` CLI or git remote in the local environment, so this step must be completed in GitHub UI or another connected environment.
