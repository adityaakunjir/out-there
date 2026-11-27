# Performance Audit

- Offscreen WebGL rendering for `.signature` is suspended via `IntersectionObserver` when outside the viewport.
- Adaptive DPR capping: `Math.min(devicePixelRatio, limitedDevice ? 1 : 1.5)` for WebGL canvas.
- Local headless Chromium measurements are recorded in `artifacts/visual-refinement/performance/phase2-responsive-and-perf.json`.
- Real-device field performance on physical mobile hardware remains unmeasured locally.
