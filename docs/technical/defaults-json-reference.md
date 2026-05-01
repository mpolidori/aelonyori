# defaults.json Reference

Source file: [defaults.json](../../defaults.json)

This file defines startup defaults for the DAW state and per-instrument synthesis parameters.

## 1. Purpose

`defaults.json` is the baseline content model for:

- global transport and display defaults,
- initial UI states,
- default track envelope and mix controls,
- instrument-specific parameter defaults.

`config.json` complements this by holding system-level tuning values outside regular UI control.

## 2. Top-Level Keys

| Key | Purpose |
|---|---|
| global | Master defaults (volume, tempo, steps, beat grouping, swing) |
| ui | Startup UI toggles and visual mode defaults |
| track | Default per-track values |
| env | Default envelope values |
| accent | Accent behavior defaults |

## 3. global

Typical fields include:

- `volume`
- `tempo`
- `steps`
- `beatSteps`
- `swing`

These initialize corresponding settings controls on first load.

## 4. ui

Typical fields include:

- `themeEnabled`
- `gradientAnimationEnabled`
- `starBounceEnabled`
- `starBounceAlways`
- `bumpEnabled`
- `subtitlesEnabled`
- `subtitlesSpeed`
- `autoExpandEnabled`
- `autoExpandSpeed`

These values define initial toggle states before user overrides persist.

## 5. track and env

`track` commonly includes defaults for:

- `volume`
- `pan`
- `swing`
- `offsetMs`
- sequence/note mode defaults
- tuning-related defaults

`env` commonly includes ADSHR defaults:

- `attack`
- `hold`
- `decay`
- `sustain`
- `release`

## 6. Instrument Defaults

Instrument families read their initial values from defaults and then allow live adjustment in UI.

Current built-in sound families:

- kick
- snare
- hat
- blip
- bass
- dualosc

## 7. Relationship to Presets

Runtime order (conceptual):

1. Load defaults.json.
2. Build initial runtime model.
3. If a saved preset is selected/applied, preset values override defaults.
4. During session, UI edits override both defaults and preset baselines.

## 8. Editing Guidance

- Keep numeric ranges aligned with UI slider min/max.
- Avoid removing keys consumed by app.js without corresponding code updates.
- Additive schema changes are safer than destructive renames.
- For large schema updates, provide migration in song/preset apply logic.
