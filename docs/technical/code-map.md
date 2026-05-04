# Code Map

This map highlights important code regions and where to make common changes.

## 1. Entry and Asset Wiring

- HTML shell and control IDs: [index.html](../../index.html)
- Global/DAW style rules: [css/style.css](../../css/style.css)
- Sampler style rules: [css/sampler.css](../../css/sampler.css)
- Video synth style rules: [css/video-synth.css](../../css/video-synth.css)

## 2. app.js High-Value Regions

| Area | Typical Responsibilities |
|---|---|
| Startup + bootstrap | Fetch `configs/daw/defaults.json` and `configs/daw/config.json`, hydrate UI, attach listeners |
| Config loading | Merge DAW config and apply bump/subtitle tuning |
| Song object serialization | getSongObject/applySongObject flow |
| Track creation/render | DOM creation and per-track controls |
| Transport scheduler | play/pause/stop, lookahead scheduling, seek, lightweight current-step class updates |
| Step trigger pipeline | compute active notes, trigger synth, animate hit states |
| Visual effects | theme, star bounce, bump envelopes, subtitle stack |
| Persistence | presets, autosave, JSON copy/apply/download/upload, embedded video synth state |
| Sample pad overlay | DAW-side sample pad edit/playback controls |

### Common edit examples

- Add a new global setting: app.js settings section + index control + defaults key.
- Adjust bump feel: config values in `configs/daw/config.json` + CSS variable mapping in app.js/style.css.
- Change scheduling behavior: scheduler window/step timing and trigger path in app.js.

## 3. sampler.js High-Value Regions

| Area | Typical Responsibilities |
|---|---|
| Pad model initialization | Create pad states, defaults, and trigger labels |
| Defaults loading | Fetch `configs/sampler/defaults.json` and apply BPM/steps/beat |
| Audio loading | Decode selected files into buffers |
| Pad playback | Trigger per-pad source with gain/pan/ratchet |
| Compose grid | Step matrix render/edit handlers |
| Ratchet picker | Compose cell ratchet UI and placement |
| Recording | Capture mic/system stream and assign output |
| Pack IO | Upload/download full pack JSON |

### Common edit examples

- Add pad metadata: expand pad state schema + serialization.
- Modify compose interaction: update pointer handlers and step toggling logic.
- Improve pack format: version payload and migration parsing.

## 4. video-synth.js High-Value Regions

| Area | Typical Responsibilities |
|---|---|
| `initGlResources()` | Compile shaders, set up geometry buffer, get uniform locations |
| `updateTextTexture()` | Rasterize text to canvas; upload to WebGL luminance texture |
| `updateAudioTexture()` | Feed analyser data or auto-oscillator into 1D audio texture |
| `render()` | Dispatch all uniforms and draw the fullscreen quad |
| `syncToggleButtons()` | Keep toggle button aria-pressed state in sync with params |
| `syncParamInputs()` | Keep sliders/selects in sync with params (e.g. after preset load) |
| Preset system | Read/write localStorage; autosave timer; standalone session export/import |
| DAW state compatibility | Export plain state for DAW songs; accept legacy session-shaped payloads on import |
| Logo video background | Capture stream, crop overlay drag handlers, emitLogoCropChange |

### Common edit examples

- Add a new shader parameter: declare uniform in GLSL source, add `getUniformLocation` call, dispatch value in `render()`, add param key with default.
- Add a new visual mode: extend the mode index range, add a new branch in `patternAt()`, add option to the mode `<select>`.
- Adjust text rendering: modify `updateTextTexture()` (font, layout, canvas size) and `textSampleUv` logic in the fragment shader.

## 5. JSON Files

- [configs/daw/defaults.json](../../configs/daw/defaults.json): startup defaults for DAW UI and sound.
- [configs/daw/config.json](../../configs/daw/config.json): DAW tuning knobs for subtitle and bump systems.
- [configs/sampler/defaults.json](../../configs/sampler/defaults.json): sampler startup BPM, steps, and beat.
- [configs/sampler/config.json](../../configs/sampler/config.json): reserved sampler config surface.
- [configs/video/defaults.json](../../configs/video/defaults.json): video synth startup params.
- [configs/video/config.json](../../configs/video/config.json): reserved video synth config surface.

## 6. Visual Coupling Notes

Certain app.js flags drive CSS states via classes and CSS variables:

- Theme enable/disable toggles class-driven style branches.
- Bump enable/tuning writes CSS custom properties.
- Envelope persistence values influence pseudo-element opacity and transforms.

When changing animation behavior, update both JavaScript variable writes and corresponding CSS selectors.

## 7. Safety Checklist for Refactors

1. Keep public control IDs stable unless index.html and handlers are updated together.
2. Preserve JSON schema compatibility for saved songs and sample packs.
3. Validate syntax after edits (`node --check js/app.js`, `node --check js/sampler.js`, `node --check js/video-synth.js`).
4. Smoke-test DAW, sampler, and video synth routes after substantial changes.
