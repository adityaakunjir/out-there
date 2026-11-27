# Out There studio showcase

This is the separate Out There portfolio showcase. It serves the static files in dist/. The Training Ground project is a read-only brand source for this work.

## Run locally

Install dependencies with `npm install`, then use `npm start`. Open http://localhost:4173/. The server serves dist/ and can remain open while files are edited. Refresh the browser after a change.

Run `npm run build` to validate the production static files and references. Run `npm test` for the automated Chromium smoke check. These commands do not publish the site.

## Main files

- dist/index.html is the page content.
- dist/styles.css and dist/reconstruction.css contain the base and chapter layout.
- dist/studio.css styles the studio carousels and contact motion.
- dist/chapters.js, dist/studio.js and dist/wordmark.js implement section interactions and WebGL.
- dist/reconstruction.js connects hero motion, navigation and Lenis scrolling.
- dist/assets/ contains the local brand, studies and fonts.
- references/volta/ holds the publicly accessible reference recordings.
- artifacts/visual-validation/ holds browser screenshots, keyframes, recordings and measurements.

No deployment has been made from this branch.
