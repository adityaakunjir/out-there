# MASTER OBJECTIVE — VOLTA ATELIER HIGH-FIDELITY WEBSITE RECONSTRUCTION

Act as an autonomous, world-class creative development team consisting of:

- A senior Awwwards-level UI/UX designer
- A creative frontend developer
- A Three.js and WebGL specialist
- A GLSL shader engineer
- A GSAP animation specialist
- A cinematic motion designer
- A 3D artist and technical artist
- A typography and visual composition specialist
- A browser performance engineer
- An automated visual regression and QA engineer

## 1. Primary objective

Transform my existing website into an exceptionally high-quality, immersive, interactive website using the following website as the primary visual and motion reference:

https://threeui.com/landing-pages/volta-atelier-landing-page

Reconstruct the publicly observable design language, spatial compositions, animation choreography, typography hierarchy, scrolling behaviour, interactive 3D elements, transitions and overall user experience as closely as possible, using an independently authored implementation.

Adapt the content, branding, imagery and wordmarks to my existing website.

This is not a request for a basic redesign loosely inspired by the reference.

The objective is to achieve comparable visual sophistication, motion quality, technical execution, spatial depth and cinematic experience.

Do not simplify complex effects into generic fade-in animations.

Do not stop after creating a visually acceptable first draft.

The finished website should feel like a professionally art-directed digital experience, not an AI-generated website template.

## 2. Autonomy and permissions

You are authorised to autonomously:

- Inspect my existing project files and architecture.
- Modify, refactor, reorganise and create project files.
- Install appropriate open-source dependencies.
- Use the terminal and browser automation.
- Use Chrome DevTools MCP and Playwright.
- Read relevant technical documentation.
- Study public, appropriately licensed repositories and examples.
- Use available coding agents and subagents.
- Use available image-generation tools to create original assets.
- Use Blender or other available 3D software.
- Write custom GLSL shaders.
- Generate original textures and 3D geometry.
- Run development servers and automated tests.
- Capture screenshots, videos and performance traces.
- Perform repeated visual evaluation and correction.

Make technical and creative decisions independently.

Do not interrupt implementation for routine decisions.

Use the publicly accessible reference material only. Do not bypass ThreeUI's authentication, paid access restrictions or source protection. Do not use its proprietary source or unlicensed assets.

Preserve my existing content and functionality wherever applicable.

Create a local Git branch or equivalent checkpoint before modifying the website. Preserve uncommitted user work.

Do not push changes to production, modify unrelated repositories or deploy the website without explicit approval.

## 3. Phase zero — Reference investigation

Before writing implementation code, perform a comprehensive reference investigation.

Open the reference website using Chrome DevTools MCP, Playwright or another available browser tool.

Inspect all publicly accessible previews and relevant Volta Atelier component listings on ThreeUI.

Investigate:

- Hero composition
- Image collage arrangement
- Typography
- Navigation
- Page proportions
- Section ordering
- Background colours
- Foreground colours
- 3D objects
- Lighting
- Material appearance
- Camera perspective
- Scroll behaviour
- Pinning durations
- Animation direction
- Animation timing
- Easing curves
- Pointer interactions
- Drag interactions
- Hover effects
- Section transitions
- Responsive behaviour
- Closing CTA and footer

If a public preview video is available, analyse it frame by frame.

Use FFmpeg or another available tool to extract frames at approximately 100–200 millisecond intervals where permitted.

If a live preview is publicly available, record its behaviour while:

- Loading the page.
- Moving the cursor across the viewport.
- Scrolling slowly.
- Scrolling rapidly.
- Scrolling backwards.
- Hovering interactive elements.
- Dragging carousels.
- Resizing the viewport.

Inspect the isolated Volta Atelier components, including hero, services, cinematic chapters, work, team, process, testimonials and closing CTA.

Separate verified observations from inferred behaviour.

Do not invent reference details and present them as observed.

When reference details are unavailable, independently design the missing behaviour to match the established creative direction.

Create:

`docs/reference-analysis.md`

`docs/motion-specification.md`

`docs/implementation-plan.md`

Document each section's layout, dimensions, visual layers, animation state, interaction model and proposed implementation.

Proceed directly to implementation after completing the investigation.

## 4. Technology and architecture

Inspect the existing repository first.

Preserve its framework unless a migration is demonstrably necessary.

Recommended technologies:

- TypeScript
- Existing React, Next.js, Vite or vanilla architecture
- Three.js
- React Three Fiber where appropriate
- Drei where appropriate
- GSAP
- GSAP ScrollTrigger
- Lenis
- Custom GLSL shaders
- CSS 3D transformations
- SVG
- Canvas
- Playwright

Use currently compatible dependency versions.

Do not install unnecessary libraries or duplicate animation systems.

Prefer original procedural implementations for complex geometry and motion.

Use one coordinated animation architecture rather than multiple conflicting animation loops.

Where appropriate, organise the implementation into:

- components/layout
- components/sections
- components/motion
- components/ui
- scenes
- shaders
- hooks
- lib/animation
- lib/performance
- styles
- assets
- tests
- docs

Create reusable systems for:

- Smooth scrolling
- Scroll progress
- Pointer tracking
- Scene activation
- Camera transitions
- Responsive scene configuration
- Motion preferences
- Performance quality tiers
- Texture preloading
- GPU resource disposal

All systems must have proper lifecycle management.

## 5. Global art direction

The design must feel:

- Editorial
- Architectural
- Premium
- Experimental
- Cinematic
- Minimal
- Spatial
- Intentionally composed
- Tactile
- Sophisticated

Avoid the visual appearance of generic SaaS templates.

Do not introduce:

- Random gradients
- Excessive glassmorphism
- Unnecessary neon lighting
- Generic rounded dashboard cards
- Excessive glow
- Random decorative icons
- Constant aggressive motion
- Stock-looking imagery
- Unnecessary drop shadows
- Unmotivated floating objects

Every visual element must serve a compositional, narrative or interactive purpose.

Derive the palette, typography proportions, spacing rhythm, border treatments and image presentation from the accessible visual reference.

Use my brand's identity and original imagery.

Create a consistent global design token system for:

- Colours
- Typography
- Spacing
- Border radii
- Layout gutters
- Camera parameters
- Animation durations
- Animation easings
- Depth values
- Texture intensity

Use licensed fonts that closely reproduce the desired visual proportions.

Typography must be treated as a primary visual element, not merely as content.

## 6. Global scrolling system

Implement a premium smooth-scrolling experience.

Integrate Lenis with GSAP ScrollTrigger when compatible with the existing architecture.

Use a single authoritative animation clock.

Synchronise scroll updates and ScrollTrigger refreshes.

The scroll system must support:

- Scroll-controlled animation timelines
- Pinned chapters
- Horizontal movement driven by vertical scrolling
- Smooth scene transitions
- Reversible animations
- Camera movement
- Scroll-linked object rotation
- Scroll-linked deformation
- Layered parallax
- Momentum-based pointer interactions

The website must remain fully navigable using:

- Mouse wheel
- Trackpad
- Touchscreen
- Keyboard
- Scrollbar
- Anchor links

Never trap the user inside a section.

Do not implement fake smooth scrolling by indiscriminately intercepting every wheel event.

Animation states must be deterministic from scroll progress wherever possible.

Fast scrolling and reverse scrolling must not cause broken, stale or inconsistent scene states.

## 7. Hero — Interactive editorial image collage

Reconstruct the reference's opening visual concept.

The publicly described reference uses an oversized typographic composition surrounding an eleven-image interactive collage arranged in two balanced rows.

### Composition

Create:

- A strong oversized typographic frame.
- An editorial collage of eleven original visual assets.
- Two intentionally composed rows.
- Varied image dimensions and visual weights.
- Controlled overlaps where appropriate.
- Clearly defined foreground, middle-ground and background layers.
- Small editorial metadata and production details.
- Subtle atmospheric particles or dust where appropriate.
- A clear visual hierarchy.

Do not add fixed corner registration marks unless they are confirmed in the current reference.

The composition must look deliberately art-directed.

Do not use eleven identical rectangular cards.

### Image creation

Inspect existing brand assets before generating new ones.

Create an original collection of visually consistent editorial imagery appropriate to my website.

Use available image-generation tools when necessary.

Ensure:

- Consistent colour grading
- Consistent lighting direction
- Intentional framing
- Professional art direction
- High-resolution source images
- Correct aspect ratios
- No unintended text
- No watermarks
- No obvious AI artefacts

Optimise the assets into WebP or AVIF where appropriate.

Store images locally.

### Pointer-reactive motion

Implement subtle dimensional reactions to cursor movement.

Each image should have configurable:

- Depth
- Translation sensitivity
- Rotation sensitivity
- Base angle
- Scale
- Damping
- Hover state

Normalise pointer coordinates to a range of -1 to 1.

Use frame-rate-independent damping or spring interpolation.

Foreground cards may respond more strongly than background cards.

Use restrained perspective rotations and positional movement.

Suggested starting ranges, subject to visual calibration:

- Rotation X: -5 to 5 degrees
- Rotation Y: -8 to 8 degrees
- Translation: 4–25 pixels depending on depth
- Hover scale: approximately 1.02–1.06

Motion must be smooth and subtle.

Avoid exaggerated tilt effects.

On pointer exit, smoothly return the scene to its resting composition.

### Hero entrance

Create a coordinated opening sequence involving typography, images and atmospheric layers.

Potential implementation:

1. Establish the background and composition.
2. Reveal oversized typography.
3. Introduce collage elements in a deliberate sequence.
4. Resolve images into their final positions.
5. Reveal supporting information.
6. Activate subtle pointer reactions.

Use clipping masks, controlled translation and depth changes rather than relying entirely on opacity.

The entrance should not unnecessarily block access to the website.

### Hero exit

As the user scrolls away:

- Choreograph the typography and image layers.
- Introduce controlled relative movement between depth layers.
- Transition naturally into the next chapter.
- Preserve visual continuity.

Do not abruptly cut between the hero and subsequent sections.

## 8. Cinematic 3D wordmark chapter

This is a critical signature experience.

The reference contains a patterned, extruded wordmark that rotates and ripples during a pinned scroll-driven chapter.

Build an independently authored, genuinely three-dimensional version using my website's wordmark or suitable brand typography.

### Geometry

Use appropriate methods such as:

- Three.js TextGeometry
- ExtrudeGeometry
- SVG-derived shape geometry
- Custom BufferGeometry
- Blender-generated geometry where required

The typography must have:

- Actual thickness
- Clean silhouettes
- Properly constructed edges
- Controlled bevels
- Appropriate tessellation
- Consistent front and side materials

Do not substitute a flat image that merely rotates.

### Materials

Create a sophisticated patterned surface using original procedural textures or shaders.

Where appropriate, investigate:

- UV-space stripe patterns
- Repeating geometric patterns
- Surface noise
- Procedural tonal variation
- Controlled roughness
- Subtle material imperfections

Match the reference's observable material character without copying proprietary textures.

### Vertex deformation

Implement controlled wave deformation through custom GLSL or another appropriate technique.

The deformation should travel across the wordmark as the user scrolls.

Consider combining:

- Sine waves
- Spatial phase offsets
- Time or scroll-controlled frequency
- Progress-dependent amplitude
- Smooth deformation envelopes

Ensure the geometry has enough subdivisions to deform smoothly.

Maintain legibility and physical coherence.

Update surface normals appropriately if the deformation affects lighting.

### Scroll choreography

Create a pinned chapter with independently tunable animation stages.

Suggested initial progression:

- 0–15%: Establish the wordmark and initial composition.
- 15–40%: Introduce dimensional rotation.
- 40–70%: Develop the travelling ripple.
- 70–90%: Resolve geometry and camera orientation.
- 90–100%: Transition into the next chapter.

These percentages are implementation starting points, not verified reference timings.

Calibrate against public reference material.

The animation must reverse correctly when scrolling upwards.

### Lighting and camera

Create appropriate studio lighting.

Use a perspective or orthographic camera based on the reference composition.

Consider:

- Soft key light
- Fill light
- Rim light
- Environment lighting
- Contact shadows where appropriate

Avoid harsh generic metallic lighting.

The object should feel like a deliberately designed physical sculpture.

## 9. Services — Scroll-driven 3D cylinder

The reference describes a seven-item service cylinder, a pinned introduction, procedural thumbnails and four proof cards.

Reconstruct this interaction model.

### Cylinder geometry

Arrange seven service elements around a cylindrical or curved spatial path.

For each item, calculate its angular position from its index and current scroll progress.

Use cylindrical positioning based on:

- X = radius × sin(angle)
- Z = radius × cos(angle)

Adjust orientation so the active item faces the viewer appropriately.

Use depth to control:

- Apparent size
- Visibility
- Lighting or brightness
- Occlusion
- Perspective
- Focus

The active service should be visually prominent while adjacent services remain recognisable.

Use WebGL or CSS 3D depending on which provides the closest result with the best accessibility and performance.

### Scroll behaviour

Pin the section during the appropriate portion of the page.

Map vertical scroll progress to cylinder rotation.

Synchronise:

- Active service
- Service title
- Description
- Index
- Progress indicator
- Associated procedural artwork

Transitions must be continuous.

Avoid instantaneous state jumps.

### Procedural thumbnails

Generate individual miniature visual studies for each service.

Use original abstract compositions such as:

- Geometric structures
- Line-based illustrations
- Distorted grids
- Sculptural forms
- Typographic experiments
- Pattern studies
- Procedural motion

Keep every thumbnail consistent with the overall art direction.

### Supporting cards

Implement four supporting proof or capability cards.

Reveal them with coordinated motion.

Use actual information from my website wherever available.

Never fabricate business achievements, client statistics or credentials.

## 10. Selected work — Fanned project stack

Build the reference's six-project scroll-controlled card experience.

### Spatial composition

Create six illustrated project cards arranged as a dimensional fanned stack.

Each card must have independently controlled:

- X position
- Y position
- Z position
- Rotation
- Scale
- Layer order
- Visibility

Cards must overlap intentionally.

Use perspective to establish believable spatial depth.

The currently active project should have the strongest visual emphasis.

### Scroll animation

Map the section's scroll progress to card transitions.

As the user scrolls:

- The active card moves forward.
- Other cards rearrange spatially.
- Previous cards recede or transition out.
- The next card enters the foreground.
- The project rail updates.
- Project metadata changes.

Maintain visual continuity between every state.

The interaction must be reversible.

### Project navigation

Create an active-project rail with:

- Project index
- Project title
- Category
- Active state
- Accessible navigation controls

Allow keyboard and pointer interaction.

Clicking a project must perform a meaningful action or navigate to a relevant existing project page.

Do not invent real portfolio projects if they do not exist.

If additional visual studies are necessary, clearly identify them as concept work.

## 11. Process — Pinned horizontal storytelling

Reconstruct the five-stage workflow section.

Vertical scrolling should drive horizontal movement through five process cards.

### Implementation

Use a pinned viewport containing a horizontal track.

Calculate the actual track travel distance from the rendered layout.

Do not rely on hardcoded distances that break after resizing.

Create a synchronised progress indicator.

Each stage should contain:

- Stage number
- Stage title
- Concise explanation
- Appropriate original artwork
- Relevant supporting details

Use layered motion inside each card where appropriate.

Allow smooth entry and exit from the horizontal sequence.

Refresh dimensions after fonts and assets load.

Handle window resizing correctly.

On mobile, preserve the intended storytelling while using native vertical or horizontal interaction where necessary for usability.

## 12. Team — Draggable 3D portrait arc

Reconstruct the spatial portrait carousel.

Arrange team member cards along a three-dimensional arc.

Each card's position and orientation must be calculated from its distance from the active centre.

Use depth to control:

- Scale
- Rotation
- Brightness
- Position
- Visual prominence

The centre card should remain the focal point.

### Interaction requirements

Implement:

- Pointer dragging
- Touch dragging
- Momentum
- Controlled deceleration
- Snap-to-card behaviour
- Previous and next controls
- Keyboard arrow navigation
- Accessible focus states

Use spring-based or damped motion.

Prevent accidental click events following a drag.

Do not block normal vertical scrolling unnecessarily on touch devices.

Ensure images remain sharp during animation.

Use genuine team assets if available.

Do not create fictional employee identities and present them as real.

## 13. Testimonials — Interactive portrait cylinder

Build an independently authored version of the reference's five-portrait cylindrical carousel.

Requirements:

- Five spatially arranged portrait positions.
- Continuous depth-based rotation.
- Smooth previous and next transitions.
- Dragging support.
- Touch support.
- Keyboard navigation.
- Active portrait indication.
- Proper perspective and occlusion.

Use only genuine customer information and authorised portraits.

If genuine testimonials are unavailable, convert this chapter into a clearly labelled original visual showcase rather than inventing reviews.

## 14. Pricing and FAQ

Reconstruct the reference's editorial presentation for these supporting sections.

Do not turn these sections into generic SaaS components.

### Pricing

Use:

- Strong typography
- Intentional spacing
- Clear hierarchy
- Restrained borders
- Editorial alignment
- Subtle entrance motion
- Purposeful CTA interactions

Use actual existing pricing or meaningful enquiry-based alternatives.

### FAQ

Implement accessible accordion interactions.

Animate height and content appearance smoothly.

Avoid layout jumps.

Ensure:

- Keyboard accessibility
- Proper ARIA state
- Visible focus
- Correct content expansion
- Mobile compatibility

Keep the animation language consistent with the rest of the website.

## 15. Closing CTA — Interactive typography field

Reconstruct the reference's oversized closing invitation.

The publicly described interaction combines repeated pointer-reactive typography, a floating card and a magnetic project button.

### Typography field

Create a repeated typographic composition using my brand's own wording.

Introduce localised pointer reactions.

Possible reactions include:

- Translation
- Rotation
- Scale
- Tonal variation
- Controlled deformation

Use a distance-based falloff so movement is strongest near the pointer.

Avoid excessive movement across the entire field.

Use DOM, Canvas or WebGL depending on the best implementation.

### Floating card

Create a floating editorial card with subtle depth and pointer-responsive movement.

Maintain a clear separation from the main CTA.

### Magnetic button

Implement smooth magnetic movement within a limited interaction radius.

The visual element may move, but the clickable area must remain stable and predictable.

Support keyboard and touch interaction.

Provide a restrained press animation.

The CTA must connect to an actual action or existing contact workflow.

## 16. Micro-interaction system

Audit every interactive element.

Introduce reference-consistent micro-interactions for:

- Navigation links
- Buttons
- Project cards
- Service cards
- Carousel controls
- Images
- Accordions
- Section indicators

Potential techniques:

- Masked text reveals
- Underline transitions
- Direction-aware hover effects
- Arrow movement
- Subtle image scaling
- Perspective shifts
- Magnetic attraction
- Controlled colour inversion

Do not apply every effect to every element.

Micro-interactions should feel unified and intentional.

## 17. Asset generation and art direction

Do not accept mediocre placeholder assets in the final experience.

Where necessary, autonomously use available image-generation models, Blender or procedural rendering tools.

Before creating assets:

1. Define a visual concept.
2. Define colour and lighting direction.
3. Define camera composition.
4. Define the intended image placement.
5. Create an initial asset.
6. Evaluate it in the actual website.
7. Regenerate or refine it if necessary.

Create a consistent visual collection rather than unrelated individual images.

Maintain an asset manifest containing source, intended placement, dimensions and usage rights.

Generate responsive image sizes.

Avoid shipping unnecessary full-resolution source files to the browser.

If generation tools are unavailable, use original procedural assets, existing authorised assets or appropriately licensed alternatives.

## 18. Animation quality standards

All animation must demonstrate professional motion-design principles.

Prioritise:

- Anticipation
- Follow-through
- Controlled acceleration
- Controlled deceleration
- Appropriate easing
- Visual continuity
- Intentional staging
- Consistent motion hierarchy

Use:

- Scroll-driven linear progression with appropriate smoothing.
- Smooth easing for entrance and exit animations.
- Damped interpolation for pointer interactions.
- Spring motion for draggable elements where suitable.

Initial calibration ranges:

- Micro-interactions: 150–350 ms
- Image reveals: 400–900 ms
- Major entrance transitions: 700–1400 ms
- Pointer damping time constant: approximately 80–180 ms

Adjust these values after visual testing.

Do not use arbitrary animation durations throughout the project.

The result must feel calm, cinematic and premium rather than chaotic.

## 19. Responsive design

Build genuinely responsive compositions.

Test at minimum:

- 1920 × 1080
- 1440 × 900
- 1280 × 800
- 1024 × 768
- 768 × 1024
- 430 × 932
- 390 × 844
- 360 × 800

Do not merely shrink desktop layouts.

Recompose typography, imagery and 3D framing for smaller screens.

Adapt:

- Camera distance
- Object scale
- Collage placement
- Pinning durations
- Carousel spacing
- Typography
- Particle density
- Image resolution
- Interaction sensitivity

Use reduced scene complexity where necessary.

Touch interactions must feel native.

No accidental horizontal overflow, clipped text, inaccessible controls or unusable pinned sections.

## 20. Performance engineering

Treat performance as a core design requirement.

Target smooth 60 FPS animation on representative modern desktop hardware and usable, stable motion on mobile devices.

Profile rather than assume performance.

Implement:

- Adaptive device pixel ratio
- Appropriate texture resolutions
- Lazy scene loading
- Asset preloading before scene activation
- Off-screen rendering suspension
- Frustum culling
- Geometry reuse
- Material reuse
- Instanced rendering where appropriate
- GPU-friendly transforms
- Proper event cleanup
- GPU resource disposal
- Efficient resize handling

Avoid unnecessary React state updates during animation frames.

Use mutable animation values or references where appropriate.

Do not trigger expensive layout recalculation on every pointer movement.

Avoid simultaneously rendering multiple expensive WebGL scenes when they are not visible.

Provide quality tiers based on measured device capabilities.

Support WebGL context loss and recovery where practical.

If WebGL is unavailable, display a meaningful visual fallback.

Target:

- LCP at or below 2.5 seconds where realistically achievable.
- CLS at or below 0.1.
- INP at or below 200 milliseconds.
- No unnecessary long main-thread tasks.
- No persistent animation-related memory growth.

Record the actual measured results and testing environment.

Do not claim performance targets are met without evidence.

## 21. Accessibility and functionality

The website must remain functional beyond its visual appearance.

Implement:

- Semantic HTML
- Accessible navigation
- Keyboard support
- Visible focus states
- Appropriate text contrast
- Descriptive alternative text
- Reduced-motion support
- Accessible carousel controls
- Accessible accordions
- Proper heading hierarchy

For reduced-motion users:

- Disable unnecessary continuous animations.
- Replace complex pinned movement with understandable static layouts.
- Maintain access to all content and functionality.

Decorative canvases should not obscure semantic content.

Retain existing forms, links, integrations and business workflows.

Never sacrifice functionality merely to achieve visual similarity.

## 22. Mandatory automated visual validation

This phase is compulsory.

Do not consider successful compilation to be successful completion.

Run the actual website in a browser.

Use Playwright, Chrome DevTools MCP and available visual-analysis capabilities.

Capture:

- Full-page screenshots
- Individual section screenshots
- Desktop screenshots
- Tablet screenshots
- Mobile screenshots
- Hover states
- Drag states
- Navigation states
- Reduced-motion states
- Scroll-animation keyframes

For each pinned animation section, capture states at:

- 0%
- 10%
- 25%
- 50%
- 75%
- 90%
- 100%

Capture screen recordings during continuous scrolling.

Test both forward and reverse motion.

When reference footage is available, compare equivalent visual and animation states.

Normalise viewport sizes before comparing.

For deterministic screenshots, stabilise random seeds, wait for fonts and assets, and control animation time.

Evaluate differences in:

- Composition
- Typography proportions
- Visual hierarchy
- Spacing
- Image dimensions
- Image placement
- Object proportions
- Perspective
- Camera framing
- Lighting
- Material appearance
- Animation direction
- Animation pacing
- Easing
- Scroll synchronisation
- Interaction responsiveness

Use image difference tools, structural similarity metrics or other perceptual comparisons where useful.

Do not use raw pixel similarity as the sole criterion when branding, artwork and content intentionally differ.

Evaluate composition and motion separately from intentional brand differences.

Where no public reference image exists, mark the result as independently designed rather than claiming a measured visual match.

## 23. Autonomous improvement loop

You must perform iterative self-evaluation.

Follow this workflow:

INVESTIGATE → IMPLEMENT → RUN → CAPTURE → COMPARE → DIAGNOSE → IMPROVE → RETEST

After each iteration:

1. Open the website in a real browser.
2. Review all relevant screenshots and motion recordings.
3. Identify specific visual or technical deficiencies.
4. Prioritise the most significant issues.
5. Modify the actual implementation.
6. Regenerate inadequate assets where necessary.
7. Run the website again.
8. Repeat the affected tests.
9. Record the improvements and remaining issues.

Do not repeatedly make random changes.

Every iteration must address measurable or visually identifiable deficiencies.

Use additional iterations whenever significant improvements are possible.

Continue until the acceptance criteria are satisfied, improvement has genuinely plateaued, or available execution limits prevent further progress.

If execution limits are reached, save the current working implementation and document exactly what remains.

Maintain:

`docs/visual-audit.md`

`docs/iteration-log.md`

`docs/remaining-issues.md`

Do not fabricate visual inspection results.

Do not claim to have tested animations that were never executed.

## 24. Internal quality assessment

Evaluate the implementation using the following weighted rubric:

- Reference composition and visual fidelity: 25 points
- Animation choreography: 20 points
- 3D implementation and spatial quality: 15 points
- Typography and art direction: 15 points
- Interaction quality: 10 points
- Responsive behaviour: 5 points
- Performance: 5 points
- Accessibility and functional correctness: 5 points

Total: 100 points.

Target at least 95/100 as an internal creative quality objective.

Support scores with screenshot evidence, recordings and test results.

Do not assign inflated scores merely to terminate the improvement loop.

If the reference is insufficiently observable, mark the affected criteria as unverified.

A subjective score must never replace objective functional testing.

## 25. Completion criteria

The implementation is complete only when:

- The redesigned website runs successfully.
- The major reference-inspired sections are implemented.
- The hero collage responds naturally to the pointer.
- The cinematic wordmark is genuinely three-dimensional.
- The wordmark rotates and deforms during scrolling.
- The services cylinder operates correctly.
- The selected-work card stack animates correctly.
- The process section supports pinned horizontal storytelling.
- The team carousel supports dragging and navigation.
- The testimonial or alternative portrait cylinder is interactive.
- The closing typography field responds to the pointer.
- The magnetic CTA works.
- Mobile layouts are usable and deliberately composed.
- Reverse scrolling works correctly.
- Existing functionality is preserved.
- Production build succeeds.
- Automated functional tests pass.
- No unresolved critical console errors remain.
- Visual assets are appropriately licensed or original.
- Visual and performance reviews have actually been performed.

## 26. Final deliverables

Deliver the actual implemented website, not just a design proposal or code snippets.

Provide:

- Complete working source code.
- Reusable animation components.
- Original shaders and 3D scenes.
- Optimised visual assets.
- Responsive layouts.
- Automated tests.
- Desktop and mobile screenshots.
- Animation recordings.
- Visual audit report.
- Performance report.
- Asset provenance documentation.
- Changed-file summary.
- Remaining limitations, if any.
- Exact instructions to run and build the website.

Store visual testing evidence in a dedicated project directory such as:

`artifacts/visual-validation/`

Do not deploy to production automatically.

## FINAL INSTRUCTION

Do not respond with only an implementation plan.

Do not stop after analysing the reference.

Do not stop after installing dependencies.

Do not stop after building a basic version.

Do not settle for generic animations or placeholder visuals.

Begin by inspecting the existing repository and publicly accessible reference material.

Then execute the entire implementation and validation workflow autonomously.

Treat the project as a high-end creative development production, where visual composition, typography, animation, spatial depth, performance and user experience receive equal attention.

The objective is to independently create a website that delivers the same level of creative sophistication and immersive interaction as Volta Atelier, while remaining original, functional, responsive and production-ready.

Begin execution now.