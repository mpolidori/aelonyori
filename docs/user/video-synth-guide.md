# Video Synth Guide

The video synth is a real-time generative visual page driven by WebGL shaders and optionally reacting to the audio playing in the main DAW.

## 1. Opening the Video Synth

The video synth is accessible from the main page navigation. It loads its own panel with a live WebGL canvas and a set of controls below it.

## 2. Controls Overview

Controls are split across two columns. Left column handles pattern and timing shape; right column handles color, audio, and text.

### Left Column

| Control | Purpose |
|---|---|
| mode | Selects the base pattern generator (wave, noise field, grid fold, rings, bars, plasma) |
| formula | Signal shaping applied to the pattern (sine, tangent, fold, pulse, cheby, xor) |
| video speed | Speed of optional background video element |
| glitch a | Primary per-line horizontal jitter strength |
| glitch b | Secondary glitch layer on a separate offset channel |
| offset | Phase relationship between glitch a and glitch b channels |
| rgb split | Distance of ghost color-split layers from the core layer |
| pixel | Pixelation / UV quantization amount |
| drift | Time warp speed factor |
| scan | Scanline overlay depth |

### Right Column

| Control | Purpose |
|---|---|
| hue | Hue rotation of the entire output |
| noise | Additive noise per pattern layer |
| audio mix | Blend of live audio waveform into pattern signal |
| auto mix | Blend of auto-oscillator (trig function) into pattern signal |
| color a | Primary pattern layer tint color |
| color b | Ghost / split layer tint color |
| text | Overlay text (supports up to 3 lines, separated by newlines) |
| text color | Color of the text overlay |
| text size | Font size of the overlay text |
| text mix | Blend amount between the pattern and the selected text tint |
| flip horizontal | Mirror overlay text horizontally (toggle) |
| flip vertical | Flip overlay text upside-down (toggle) |

### Toggle Row

| Toggle | Purpose |
|---|---|
| audio react | Enable/disable live audio waveform input |
| invert | Invert the entire color output |
| video background | Enable logo video feed as a background layer |
| crop | Show the crop overlay to adjust the video background region |

## 3. Visual Modes

Switch modes with the **mode** selector to change the pattern's fundamental structure.

- **wave** — A waveform-derived horizontal ripple; closely tied to the audio input signal shape.
- **noise field** — A domain-warped 2D noise field; organic and flowing.
- **grid fold** — A repeating folded grid structure with trig modulation; geometric and sharp.
- **rings** — Radial rings expanding from center; responds to signal amplitude with frequency changes.
- **bars** — Vertical bar columns with signal-driven phase shift; rhythmic and bar-code-like.
- **plasma** — Multi-phase trigonometric plasma; classic demoscene-style color blending.

## 4. Formula Modes

The **formula** selector shapes the signal value before it feeds into the pattern. Different formulas produce radically different textures from the same mode:

- **sine** — Smooth continuous waves; default and most versatile.
- **tangent** — Sharp spikes and clipping; adds edge detail at the cost of stability.
- **fold** — Triangle folding; produces aliased repetition and fine detail.
- **pulse** — Hard threshold; binary on/off switching for harsh grid effects.
- **cheby** — Polynomial expansion; adds harmonic-rich moire-like detail.
- **xor** — Interference fringe pattern; digital and geometric.

## 5. Color System

Two color pickers (**color a** and **color b**) each control distinct rendering layers:

- **color a** drives the core pattern layer.
- **color b** drives the ghost/split layers created by the RGB split.

When RGB split is at zero, both colors blend and color b has minimal visible effect. Increasing split makes color b visually dominant in the offset ghost channels.

The **hue** slider rotates the combined output color globally, independent of the individual color picks.

## 6. Audio Reactive Mode

When **audio react** is enabled, the audio waveform from the DAW player is sampled each frame and used to modulate the pattern signal.

- **audio mix** controls how much of the raw waveform drives the signal.
- **auto mix** blends in an auto-oscillator that runs independently of audio, ensuring the synth is always animated even when nothing is playing.
- Disable **audio react** to run in pure auto mode.

## 7. Text Overlay

Type into the **text** field to overlay text on the pattern. Up to 3 lines are supported (use Shift+Enter or newlines to add lines).

The text texture is stored as luminance and then blended with the selected **text color** during compositing. **text mix** controls how strongly the final text tint overrides the underlying pattern. At low mix, the text stays partially integrated into the pattern; at high mix, the selected text color becomes much more explicit.

### Flip Toggles

Below the text mix control, two toggles let you mirror or flip the overlay text:

- **flip horizontal** — Mirrors the text left-to-right.
- **flip vertical** — Flips the text upside-down.

Both are off by default; text renders in normal orientation.

## 8. Video Background

Enable **video background** to use the logo video element as a sampled backdrop behind the pattern. The shader composites the pattern layers on top of this background.

Use the **crop** toggle to show a drag handle over the preview. You can:

- Drag the rectangle body to move the sampled region.
- Drag the corner handle to resize the sampled region.

The sampled region is normalized (0–100 for x, y, and size), so it adapts to the source video dimensions.

## 9. Presets

Use the preset panel (visible at the top of the synth controls) to save and restore named configurations.

- **new** — Create a new preset slot with the current state.
- **save** — Overwrite the selected preset.
- **load** — Apply a saved preset to the current state.
- **default** — Mark the current preset as the auto-load default.
- **autosave** — Enable background saves at the selected interval.

These controls are for standalone video synth presets stored in `localStorage`.

Separately, when you save a DAW preset or export DAW song JSON, the current video synth state is embedded there too. Loading that DAW preset restores the saved synth state even if you never used the standalone video preset buttons.

Presets persist across page reloads via `localStorage`. Use the JSON export in the preset panel to back up or share configurations externally.

## 10. Performance Notes

- WebGL rendering is paused automatically when the tab is hidden and resumed on return.
- The text texture is only re-uploaded when the text content or size changes, not every frame.
- High glitch, split, and noise values simultaneously can be visually intense; reduce individual values to isolate effects.
