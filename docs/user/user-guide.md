# User Guide

This guide covers day-to-day usage of the Aelonyori sequencer/sampler app.

## 1. App Modes

The app has two primary modes:

- DAW mode: letter-driven track sequencing and transport.
- Sampler mode: sample pads, pattern compose grid, recording, and pack import/export.

Use the side navigation buttons at screen edges to switch between DAW and sampler.

## 2. DAW Quick Start

1. Click letters in the Aelonyori wordmark to add/remove tracks.
2. Open settings (gear in transport) and set tempo, steps, beat grouping, and master level.
3. On each track:
- choose instrument,
- paint notes in the grid,
- tune envelope/mix controls,
- mute/solo/clear/delete as needed.
4. Press play in the transport.

## 3. Track Editing Workflow

Each track has:

- Instrument selector (kick, snare, hat, blip, bass, dual oscillator).
- Note controls (pitch, tune cents, sequence mode, note mode).
- Envelope controls (attack, hold, decay, sustain, release).
- Mix controls (volume, pan, swing, offset).
- Grid controls (show/hide grid, clear, delete).

### Sequence Modes

- single: one-bit pattern behavior for per-step triggering.
- roll: piano-roll style per-row note masks.

### Note Modes

- one-shot: each active step triggers independently.
- hold: adjacent/tied notes sustain across steps.

## 4. Transport and Range Operations

Transport bar supports:

- Play/pause.
- Restart.
- Seek/scrub.
- Looping range when enabled.

Settings panel range actions:

- copy: copy selected step range to following region.
- delete: clear selected range.
- duplicate: insert duplicate of selected range.
- loop: loop only selected range.

## 5. Sampler Quick Start

Sampler provides two tabs:

- pads: trigger pads and edit pad-specific repeat/trigger behavior.
- compose: edit a step grid per pad row.

Core sampler actions:

1. Upload samples to pads via browser file picker.
2. Use record mode for pad recording (hold-based capture).
3. Build compose patterns using step buttons.
4. Long-press compose cells for corner-ratchet picker.
5. Start playback from sampler play control.

## 6. Sample Pack Workflow

Sample packs can be exported/imported as JSON.

- Download pack: serializes audio + pattern + ratchets.
- Upload pack: restores pads and compose state.

Use the pack name field before exporting to generate stable filenames.

## 7. Visual and Theme Features

Global visual systems include:

- Theme mode and gradient animation.
- Star bounce behavior (including delayed start after intro roll-in).
- Letter bump mode with tunable height/intensity/bounce.
- Subtitle overlay mode synchronized to playback.

## 8. Presets and Song JSON

In settings:

- Save/load/default presets from local storage.
- Copy/apply/download/upload song JSON.
- Autosave with selectable interval.

Use presets for iterative composition; use song JSON for external backup/versioning.

## 9. Keyboard and Touch Notes

- Letter keys can trigger or hold sample-pad actions when configured.
- Touch/long-press behaviors are used in both sampler and sequence UIs.
- Sequencer drag paint uses larger touch deadzones so vertical navigation is less likely to add accidental notes.
- Sample-pad hold repeats follow the shared transport tempo grid instead of per-pad isolated intervals.
- Drag interactions are intentionally tuned for dense rhythmic editing.

## 10. Troubleshooting Basics

If behavior feels stale after edits:

- Reload the page to re-fetch config/defaults.
- Check that expected toggles are enabled (bump, subtitles, sample pad mode).
- Verify track/pad states are not muted or solo-suppressed.
