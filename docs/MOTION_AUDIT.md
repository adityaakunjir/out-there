# Motion & Scroll Audit

- **Desktop smooth scroll**: Lenis (`duration: 1.15, smoothWheel: true`) synced to `gsap.ticker` (`lagSmoothing(0)`) with `html { scroll-behavior: auto; }` globally so native `scrollTo` and Lenis do not conflict.
- **Mobile touch scroll**: Lenis disabled on `<800px` and coarse pointers; native touch scrolling drives sticky `.craft-stage`, `.work-stage`, `.signature-stage`, and GSAP ScrollTrigger `process` horizontal track (`ScrollTrigger.config({ ignoreMobileResize: true })`).
- **Stuck-at-bottom & reverse scroll**: Verified across `0%, 10%, 25%, 50%, 75%, 90%, 100%` progress keyframes and full bottom-to-top reverse scroll; all triggers reset cleanly.
- **3D Wordmark**: `IntersectionObserver` pauses WebGL rendering when `.signature` is off-screen; `pagehide` disposes geometry, material, and renderer.
