# Architecture Overview

This project is a browser-only, no-build frontend application with three primary runtime modules:

- DAW runtime in [js/app.js](../../js/app.js)
- Sampler runtime in [js/sampler.js](../../js/sampler.js)
- Video synth runtime in [js/video-synth.js](../../js/video-synth.js)

Styling is split by concern:

- DAW + global visuals in [css/style.css](../../css/style.css)
- Sampler visuals in [css/sampler.css](../../css/sampler.css)
- Video synth visuals in [css/video-synth.css](../../css/video-synth.css)

Entry shell is [index.html](../../index.html).

## 1. Runtime Modules and Responsibilities

## DAW Module: app.js

Key responsibilities:

- Track lifecycle (add/remove/reorder tracks).
- Global transport, seek, loop, scheduler.
- Pattern model (single and roll modes).
- Per-track synthesis and envelope execution.
- Presets/song JSON persistence and autosave, including embedded video synth state.
- Visual systems (theme, bump, subtitles, star bounce).
- DAW-side sample pad and pad-roll overlays.

## Sampler Module: sampler.js

Key responsibilities:

- Pad audio buffers and playback triggering.
- Compose grid editing and ratchet/corner logic.
- Sample pack serialization/deserialization.
- Recording workflow (media stream + media recorder).
- Sampler playback timing independent from DAW scheduler.

## Video Synth Module: video-synth.js

Key responsibilities:

- WebGL fullscreen canvas rendering loop.
- GLSL fragment shader for generative visual patterns (6 modes, 6 formulas).
- Text overlay via 2D canvas rasterization uploaded as a luminance texture.
- Audio reactive input via AnalyserNode fed from the DAW audio element.
- Logo video background capture and interactive crop overlay.
- Standalone preset/autosave system plus DAW-song state import/export compatibility.

See [video-synth.md](video-synth.md) for full technical reference.

## 2. Data Model Layers

## Config Layer

- [configs/daw/config.json](../../configs/daw/config.json): backend tuning values not exposed in UI (subtitle/bump tuning).
- [configs/sampler/config.json](../../configs/sampler/config.json): reserved sampler tuning surface.
- [configs/video/config.json](../../configs/video/config.json): reserved video synth tuning surface.
- DAW config is currently loaded by app.js at startup and merged against in-code defaults.

## Defaults Layer

- [configs/daw/defaults.json](../../configs/daw/defaults.json): initial DAW UI, global, and instrument defaults.
- [configs/sampler/defaults.json](../../configs/sampler/defaults.json): initial sampler BPM, steps, and beat values.
- [configs/video/defaults.json](../../configs/video/defaults.json): initial video synth parameter defaults.

## Runtime State Layer

Main dynamic containers in app.js:

- states map: per-track editable state.
- tracks map: per-track DOM + control references.
- multiple timeout maps: animation and envelope synchronization.

Sampler runtime keeps:

- padStates array.
- buffers array.
- pattern matrix.
- playback/recording mode flags.

## 3. Scheduling and Timing Model

DAW playback uses lookahead scheduling:

- lookahead tick checks upcoming window.
- events are scheduled ahead of current audio time.
- UI updates are synchronized via timeouts/requestAnimationFrame.
- During playback, step-marker rendering updates only current/previous step classes instead of full grid rerenders.

This decouples audio timing from frame-rate and interaction jitter.

Sampler playback has its own step timer and ratchet timing strategy per cell.

## 4. Audio Graph Strategy

All synthesis uses native Web Audio nodes:

- OscillatorNode for tonal sources.
- AudioBufferSourceNode for noise and recorded sample playback.
- BiquadFilterNode for tone shaping.
- GainNode envelope automation for ADSHR.
- StereoPannerNode for per-voice pan.
- master gain for global output scaling.

Per-note node graphs are created and disposed per trigger, with values scheduled against AudioContext time.

## 5. Interaction and UX Patterns

The codebase heavily uses:

- Pointer-driven interactions (drag/paint/long-press).
- Touch-aware behavior for mobile consistency.
- Keyboard shortcuts for sequencing and sampler triggers.
- Progressive panels and overlays for compact UI density.

## 6. Persistence and I/O

Supported persistence channels:

- localStorage presets.
- autosave snapshots.
- song JSON import/export.
- sampler pack JSON import/export with embedded pad audio.

## 7. Configuration Philosophy

The app has two categories of tunables:

- User-facing controls in the UI for creative performance.
- Internal tuning values in `configs/*/config.json` and `configs/*/defaults.json` for feel calibration and startup behavior.

This separation enables safe iteration on timing/visual behavior without increasing UI complexity.
