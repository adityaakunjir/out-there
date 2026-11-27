# Execution efficiency audit

## Baseline

- Project: static site with local GSAP, ScrollTrigger, Three, Lenis and Playwright.
- Existing targeted checks: `tests/build.cjs`, `tests/smoke.cjs`, `tests/final-interactions.cjs`.
- Existing durable briefs and visual evidence are retained; no credentials were inspected or recorded.
- Global Codex configuration exposes global plugins and MCP servers. No verified project-scoped enable/disable schema was found, so no global tools or security settings were changed.

## Capability routing

| Need | Preferred path | Reason |
| --- | --- | --- |
| Source inspection and implementation | Shell, Git, focused file search | Lowest-context path for this static site. |
| Repeatable browser checks | Local Playwright | Deterministic and scriptable. |
| Live visual diagnosis | Chrome DevTools/browser tools | Use only for an active UI defect. |
| Documents, sheets, presentation, cloud apps | Do not load by default | Unrelated to this frontend repository. |

Global plugins remain available for other projects. Installed skills are selected only when a request actually matches them.

## Changes

- Replaced project instructions with compact routing policy in `AGENTS.md`.
- Added `.codex/memory/` as a selective recovery index.
- Added local skills for context recovery, visual QA, motion, WebGL and efficient testing.
- Added motion diagnostics script and npm command for focused mobile/desktop scroll checks.

## Working rule

Read `STATE.md` and the relevant source first. Expand to master documentation, reference footage or broader visual regression only when the reported issue requires it. Preserve complete detailed logs and visuals in `artifacts/` rather than loading them into every task.

## Limitation

Token, cache and reasoning totals are not exposed by the available project tooling, so no invented before/after token metric is recorded.
