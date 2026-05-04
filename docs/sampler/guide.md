# Sampler Guide

The sampler is a standalone pad-based instrument and step sequencer. It operates independently from the DAW scheduler and has its own transport controls.

## 1. Overview

The sampler provides two views:

- **pads** — Sixteen trigger pads with sample assignment and hold-record capability.
- **compose** — A step grid for building pad patterns with per-step ratchet control.

Navigation between pads and compose uses the tab bar at the top of the sampler panel.

## 2. Loading Samples

Each of the 16 pads accepts one audio file. To load a sample:

1. Click (or tap) a pad to select it.
2. The pad editor area shows the current pad label and ratchet settings.
3. Use the file picker triggered by the selected pad to choose an audio file from disk.
4. The pad loads and the waveform becomes available immediately.

Supported formats are whatever the browser's Web Audio API decodes (WAV, MP3, OGG, FLAC in most browsers).

## 3. Playing Pads

Tap any loaded pad to trigger it. Pads play from the beginning of the buffer at the current gain/pan settings.

When playback is running (via the play FAB), active compose steps trigger pads on schedule. Manual taps also work simultaneously.

## 4. Recording Samples

The sampler supports live pad recording via the microphone or system audio:

1. Enable **record mode** using the record FAB (bottom dock).
2. Hold a pad down to capture audio into that pad's buffer.
3. Release to stop recording and assign the captured audio.

During recording, the record status indicator is visible. The recording captures via `MediaRecorder` and decodes the result into an `AudioBuffer` on release.

## 5. Compose Tab

The compose view shows a grid of steps × pads. Each cell can be on or off.

### Toggling Steps

Tap a cell to toggle it. Active cells trigger the corresponding pad at that step during playback.

### Ratchet Behavior

Each cell can have a per-cell ratchet or use a corner ratchet:

- **Per-cell ratchet**: a repeat multiplier stored directly on the cell.
- **Corner ratchet**: uses one of four corner values shared across the pad row.

Long-press a compose cell to open the **ratchet picker** panel. The picker shows all four corners. Selecting a corner assigns that cell to use the corner ratchet instead of a per-cell value. Selecting "none" restores per-cell mode.

Ratchet values represent repeat rate multipliers:

| Display | Meaning |
|---|---|
| 1 | Single trigger per step (default) |
| 2 | Two triggers per step |
| 0.5 (1/2) | One trigger every two steps |
| 0.25 (1/4) | One trigger every four steps |
| 1/3 | Three triggers per two steps |

### Quarter Ratchets

Each pad has four corner ratchet slots (top-left, top-right, bottom-left, bottom-right). Edit them in the **ratchet settings** panel accessible from the bottom dock. Cells assigned to a corner update automatically when the corner value changes.

## 6. Transport

| Control | Purpose |
|---|---|
| BPM | Playback tempo for the sampler |
| Steps | Number of steps in the compose pattern |
| Beat | Beat grouping (steps per beat marker) |
| Play FAB | Start/stop sampler playback |
| Record FAB | Toggle recording mode |

Sampler playback uses its own step timer independent from the DAW. Both can run simultaneously.

## 7. Sample Pack Workflow

A sample pack bundles all pad audio and compose state into a single JSON file.

### Exporting

1. Enter a name in the **pack name** field (used as filename stem).
2. Click **download pack**.
3. A JSON file is saved containing:
   - Pad audio encoded as base64 WAV data.
   - Per-pad ratchet corner values.
   - Compose step pattern.

### Importing

1. Click **upload pack**.
2. Select a previously downloaded pack JSON.
3. All pads and the compose pattern are restored.

Pack JSON is self-contained; no separate audio files are needed for sharing.

## 8. Pad States and Playback Details

- Each pad holds an `AudioBuffer` decoded from the loaded or recorded audio.
- Playback creates a fresh `AudioBufferSourceNode` per trigger (Web Audio pattern, not reusing nodes).
- Simultaneous triggers (from compose + manual tap) stack; they do not cancel each other.
- No per-pad volume or pan controls are exposed currently; all pads play at unity gain to the audio context destination.

## 9. DAW Integration

The sampler and DAW are independent modules. However, the DAW includes a sample-pad overlay mode (enable via the **sample pad** toggle in DAW settings) that connects DAW-side pad triggering to the sampler buffers.

When the DAW sample-pad overlay is active:
- A floating toolbar appears with pad editing and playback controls.
- The selected pad can be triggered, previewed, and assigned a repeat ratchet.
- A two-key chord trigger lets you assign keyboard keys as a pad trigger combination.
- Enabling **playback mode** on the pad toolbar switches the transport to a pad-centric playback path.

## 10. Navigation

Swipe left from the left screen edge (or use the nav button) to return to the DAW view from the sampler.
