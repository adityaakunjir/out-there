# Responsive Audit (12 Viewports)

Tested viewports:
- Desktop: `2560×1440`, `1920×1080`, `1440×900`, `1366×768`, `1280×800`
- Tablet: `1024×768`, `768×1024`
- Mobile: `430×932`, `414×896`, `390×844`, `375×812`, `360×800`

All 12 viewports passed with `scrollWidth <= innerWidth` (0 horizontal overflow), 0 JS/console errors, craft wheel mid-scroll & reverse-to-top progression verified, and `heroOpacity = 1` on return to top.
