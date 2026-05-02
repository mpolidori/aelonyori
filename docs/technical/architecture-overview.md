# Architecture Overview

This project is a browser-only, no-build frontend application with two primary runtime modules:

- DAW runtime in [js/app.js](../../js/app.js)
- Sampler runtime in [js/sampler.js](../../js/sampler.js)

Styling is split by concern:

- DAW + global visuals in [css/style.css](../../css/style.css)
- Sampler visuals in [css/sampler.css](../../css/sampler.css)

Entry shell is [index.html](../../index.html).

## 1. Runtime Modules and Responsibilities

## DAW Module: app.js

Key responsibilities:

- Track lifecycle (add/remove/reorder tracks).
- Global transport, seek, loop, scheduler.
- Pattern model (single and roll modes).
- Per-track synthesis and envelope execution.
- Presets/song JSON persistence and autosave.
- Visual systems (theme, bump, subtitles, star bounce).
- DAW-side sample pad and pad-roll overlays.

## Sampler Module: sampler.js

Key responsibilities:

- Pad audio buffers and playback triggering.
- Compose grid editing and ratchet/corner logic.
- Sample pack serialization/deserialization.
- Recording workflow (media stream + media recorder).
- Sampler playback timing independent from DAW scheduler.

## 2. Data Model Layers

## Config Layer

- [config.json](../../config.json): backend tuning values not exposed in UI (subtitle/bump tuning).
- Loaded by app.js at startup and merged against defaults.

## Defaults Layer

- [defaults.json](../../defaults.json): initial UI, global, and instrument defaults.
- Controls startup state for sliders, toggles, and per-sound envelopes.

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
- Internal tuning values in config.json/defaults.json for feel calibration and system behavior.

This separation enables safe iteration on timing/visual behavior without increasing UI complexity.
