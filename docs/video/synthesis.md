# Video Synthesis

This document describes the video synthesis system introduced as a third interactive page in the project.

Source files:

- Runtime: [js/video-synth.js](../../js/video-synth.js)
- Styles: [css/video-synth.css](../../css/video-synth.css)

## 1. Module Architecture

The video synth is implemented as a self-contained IIFE that mounts a `VideoSynthPlugin` instance onto a designated DOM node. It manages its own standalone preset system, but it also exchanges plain synth state with the DAW song serializer in `app.js`.

Responsibilities:

- WebGL canvas rendering loop (via `requestAnimationFrame`).
- Shader parameter management and uniform dispatch.
- Text overlay texture management via a hidden 2D canvas.
- Audio reactive input via Web Audio `AnalyserNode`.
- Logo video background capture and crop.
- Startup defaults loaded from `configs/video/defaults.json`.
- Preset persistence via `localStorage`.
- Preset autosave with configurable interval.
- Song JSON import/export (identical schema pattern to DAW).

## 2. Rendering Pipeline

Each frame:

1. `resize()` — sync canvas dimensions to container.
2. `updateAudioTexture()` — fill 1D luminance texture from analyser data or auto-oscillator fallback.
3. `updateTextTexture()` — rasterize text content to a 2D canvas; upload as luminance texture (only when dirty).
4. `render()` — dispatch uniforms and draw a fullscreen triangle pair via WebGL.

### Vertex Shader

A fullscreen quad is drawn using two triangles covering NDC space (−1 to +1). The vertex shader maps clip-space positions to UV coordinates:

```glsl
v_uv = a_position * 0.5 + 0.5;
```

UV origin (0, 0) is at the bottom-left of the viewport.

### Fragment Shader

The fragment shader is the core creative engine. It receives:

- Pattern uniforms (mode, formula, intensity, glitch, scan, pixel, drift, split, noise, hue).
- Audio texture (`u_audioTex`) — 1D luminance sampler encoding waveform data.
- Text texture (`u_textTex`) — 1D luminance sampler with rendered text.
- Color uniforms (`u_colorA`, `u_colorB`, `u_textColor`).
- Mix and mode flags (`u_audioMix`, `u_autoMix`, `u_invert`, `u_textEnabled`, `u_textFlipH`, `u_textFlipV`).

Rendering stages within the fragment shader:

1. UV pixelation (floor quantization based on `u_pixel`).
2. Per-line horizontal jitter from glitch A and glitch B (independent offset channels).
3. Block-level Y displacement from glitch layers.
4. RGB split channel separation using `u_split`.
5. Pattern evaluation at core UV, ghost-A UV (+split), and ghost-B UV (−split).
6. Noise injection per layer.
7. Text mask composition on top of pattern layers, with explicit tint blending from `u_textColor`.
8. Color blending using colorA/colorB across core and ghost layers.
9. Scan line modulation.
10. Hue rotation of final color.
11. Inversion toggle.

## 3. Visual Modes

The `u_mode` uniform selects the base pattern generator. All modes share the same post-processing chain.

| Index | Name | Pattern Basis |
|---|---|---|
| 0 | wave | Waveform-derived horizontal wave with vertical wrapping |
| 1 | noise field | 2D value noise domain warped by audio signal |
| 2 | grid fold | Folded grid with trig modulation |
| 3 | rings | Radial ring structure driven by signal |
| 4 | bars | Vertical bar grid with signal-driven phase |
| 5 | plasma | Multi-phase trig plasma |

## 4. Formula Modes

The `u_formula` uniform modifies how the base signal value is shaped before pattern evaluation. Applied inside `patternAt()`.

| Index | Name | Effect |
|---|---|---|
| 0 | sine | `sin()` of the signal |
| 1 | tangent | `tan()` clamped |
| 2 | fold | Triangle fold (absolute value cycling) |
| 3 | pulse | Hard threshold pulse |
| 4 | cheby | Chebyshev-like polynomial expansion |
| 5 | xor | Bit-pattern-like interference fringes |

## 5. Text Overlay System

Text is rasterized by `updateTextTexture()` onto a hidden 1024×512 2D canvas (`textCanvas`). Key behavior:

- Up to 3 lines (split on newlines).
- Centered horizontally and vertically.
- Font size follows `textSize` param (clamped 10–160 px), bold sans-serif.
- Text color is passed as a uniform; the texture stores luminance only, and the final fragment blend uses the selected tint directly.
- Texture is only re-uploaded when `textTextureDirty` is set (on any param change).

### Texture Coordinate Correction

The 2D canvas origin is at the top-left. WebGL texture row 0 maps to the bottom of texture space. Without correction, canvas textures appear flipped vertically.

Fix applied: `gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)` is set (the default), and the Y coordinate is corrected in the fragment shader:

```glsl
vec2 textSampleUv = vec2(
  mix(textUv.x, 1.0 - textUv.x, u_textFlipH),
  mix(1.0 - textUv.y, textUv.y, u_textFlipV)
);
```

- Default (`u_textFlipH = 0`, `u_textFlipV = 0`): text appears right-reading and upright.
- "flip horizontal" toggle: mirrors text horizontally.
- "flip vertical" toggle: flips text upside-down.

## 6. Audio Reactive System

Audio reactivity routes through an `AnalyserNode` connected to the playing audio element:

- FFT size 256 (128-bin time-domain data).
- Frame is resampled to the texture width (256 px) via linear index mapping.
- When no audio is present or audio reactivity is disabled, an auto-oscillator (trig function driven by `u_time`) fills the signal.
- The mix between audio and auto signals is controlled by `u_audioMix` and `u_autoMix`.

The audio element reference is obtained via a `CustomEvent` (`video-synth:audio-node`) dispatched to the document. app.js responds by passing the active audio source node.

## 7. Logo Video Background

An optional video background mode feeds live video into a logo-sampling canvas:

- A logo element is selected by the plugin and a `MediaStream` is captured from it via `HTMLVideoElement` + `canvas.captureStream()`.
- A crop rectangle (x, y, size — all 0–100 normalized) determines the sampled region.
- The crop overlay UI (`logoCropRect`, `logoCropHandle`) supports drag-to-move and drag-to-resize via pointer events.
- The sampled region is rendered into the WebGL canvas as a background via a secondary draw before the fragment shader composites on top.
- State is exchanged with app.js via `CustomEvent`s (`video-synth:set-logo-video-background`, `video-synth:logo-video-state`).

## 8. Preset System

The video synth has two related persistence paths:

- Standalone synth presets stored in `localStorage`.
- Plain synth state embedded inside DAW song and preset JSON.

Standalone preset storage:

- Presets are stored in `localStorage` under keys prefixed with `aelonyori.video-synth.preset.`.
- A preset index key (`aelonyori.video-synth.preset.index`) lists preset names as a JSON array.
- A default preset key (`aelonyori.video-synth.preset.default`) names the auto-loaded preset.
- Autosave is configured via `aelonyori.video-synth.autosave` (interval + enabled flag).
- Embedded presets can be injected via `embeddedPresets` (used for factory defaults bundled with the page).

Both standalone presets and DAW-embedded state serialize the same `params` payload shape for the synth state itself. This means a standalone synth state block can be dropped into a DAW song's `extensions.videoSynth` or `videoSynth` section and still load correctly.

## 9. Params Reference

| Key | Type | Range | Default | Description |
|---|---|---|---|---|
| mode | number | 0–5 | 0 | Visual pattern mode |
| formula | number | 0–5 | 0 | Signal shaping formula |
| intensity | number | 0–100 | 72 | Pattern depth/contrast (preset-only; no UI control) |
| glitch | number | 0–100 | 58 | Primary glitch displacement strength |
| glitchLayer | number | 0–100 | 54 | Secondary glitch layer strength |
| glitchOffset | number | 0–100 | 58 | Phase offset between glitch channels |
| split | number | 0–100 | 72 | RGB ghost split distance |
| noiseAmt | number | 0–100 | 36 | Additive noise per pattern layer |
| scan | number | 0–100 | 32 | Scanline modulation depth |
| pixel | number | 0–100 | 14 | UV pixelation amount |
| hue | number | 0–100 | 0 | Hue rotation amount |
| drift | number | 0–100 | 44 | Time warp/drift factor |
| videoSpeed | number | 0–100 | 70 | Background video playback speed |
| audioMix | number | 0–100 | 62 | Audio waveform signal mix |
| autoMix | number | 0–100 | 68 | Auto oscillator signal mix |
| audioReactive | boolean | — | true | Enable audio input |
| invert | boolean | — | false | Invert final color output |
| colorA | string | hex | `#6600ff` | Primary pattern layer color |
| colorB | string | hex | `#ff0077` | Ghost/split layer color |
| textContent | string | — | `""` | Overlay text (newlines for multiple lines) |
| textSize | number | 10–160 | 62 | Text font size in pixels |
| textMix | number | 0–100 | 70 | Blend amount between the pattern and the selected text tint |
| textColor | string | hex | `#f4ecff` | Text tint color |
| textFlipH | boolean | — | false | Mirror text horizontally |
| textFlipV | boolean | — | false | Flip text vertically |

## 10. Known Constraints

- WebGL 1.0 only; no WebGL 2 extensions used.
- Single-pass shader; no framebuffer-based feedback loop.
- Text canvas is fixed at 1024×512; very long or very small text may have limited resolution at high zoom.
- The audio node event requires app.js to be present and playing; the synth degrades gracefully to auto-oscillator mode if no node is received.
