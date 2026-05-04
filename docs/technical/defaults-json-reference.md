# Defaults Files Reference

Startup defaults now live under `configs/`, split by app surface.

## Active defaults files

- DAW defaults: [configs/daw/defaults.json](../../configs/daw/defaults.json)
- Sampler defaults: [configs/sampler/defaults.json](../../configs/sampler/defaults.json)
- Video synth defaults: [configs/video/defaults.json](../../configs/video/defaults.json)

## 1. Purpose

Defaults files provide the baseline runtime state before presets, song JSON, or live UI edits override anything.

Conceptually:

1. load the relevant defaults file
2. build initial runtime state
3. apply any saved preset or imported JSON
4. let live UI changes override both

## 2. DAW defaults

`configs/daw/defaults.json` defines startup defaults for the DAW state and per-instrument synthesis parameters.

Top-level keys:

| Key | Purpose |
|---|---|
| `globals` | Master defaults (tempo, swing, volume, steps, beat grouping) |
| `ui` | Startup UI toggles and visual defaults |
| `trackDefaults` | Shared per-track defaults |
| `envDefaultsBySound` | Per-sound synthesis and envelope defaults |
| `accent` | Accent/bump visual behavior defaults |

Built-in sound families currently covered:

- `kick`
- `snare`
- `hat`
- `blip`
- `bass`
- `dualoscillator`

## 3. Sampler defaults

`configs/sampler/defaults.json` currently exposes the sampler's startup transport values:

| Key | Purpose |
|---|---|
| `bpm` | Initial sampler playback tempo |
| `steps` | Initial compose-grid length |
| `beat` | Initial beat grouping |

## 4. Video synth defaults

`configs/video/defaults.json` defines the video synth's startup parameter block.

Key groups:

- mode and formula selection
- pattern intensity, glitch, split, noise, scan, pixel, hue, drift, and video speed
- audio and auto mix behavior plus boolean toggles
- color A, color B, text content, text size, text mix, text color, and text flips

## 5. Relationship to Presets

- DAW presets override `configs/daw/defaults.json`.
- DAW song and preset JSON now embed the current video synth state using the same plain state structure the video synth can load directly.
- Standalone video synth presets remain independent in `localStorage` and use the same `params` payload shape for the synth state itself.
- Sampler defaults only affect first-load startup state; sampler pack JSON still owns exported and imported sampler content.

## 6. Editing Guidance

- Keep numeric ranges aligned with UI slider min/max.
- Avoid removing keys consumed by `app.js`, `sampler.js`, or `video-synth.js` without corresponding code updates.
- Additive schema changes are safer than destructive renames.
- If you change any state shape used by saved songs or presets, update the apply/import logic so older JSON still loads cleanly.
