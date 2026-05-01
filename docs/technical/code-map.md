# Code Map

This map highlights important code regions and where to make common changes.

## 1. Entry and Asset Wiring

- HTML shell and control IDs: [index.html](../../index.html)
- Global/DAW style rules: [css/style.css](../../css/style.css)
- Sampler style rules: [css/sampler.css](../../css/sampler.css)

## 2. app.js High-Value Regions

| Area | Typical Responsibilities |
|---|---|
| Startup + bootstrap | Fetch defaults/config, hydrate UI, attach listeners |
| Config loading | Merge config.json and apply bump/subtitle tuning |
| Song object serialization | getSongObject/applySongObject flow |
| Track creation/render | DOM creation and per-track controls |
| Transport scheduler | play/pause/stop, lookahead scheduling, seek |
| Step trigger pipeline | compute active notes, trigger synth, animate hit states |
| Visual effects | theme, star bounce, bump envelopes, subtitle stack |
| Persistence | presets, autosave, JSON copy/apply/download/upload |
| Sample pad overlay | DAW-side sample pad edit/playback controls |

### Common edit examples

- Add a new global setting: app.js settings section + index control + defaults key.
- Adjust bump feel: config values in config.json + CSS variable mapping in app.js/style.css.
- Change scheduling behavior: scheduler window/step timing and trigger path in app.js.

## 3. sampler.js High-Value Regions

| Area | Typical Responsibilities |
|---|---|
| Pad model initialization | Create pad states, defaults, and trigger labels |
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

## 4. JSON Files

- [defaults.json](../../defaults.json): startup defaults for UI and sound.
- [config.json](../../config.json): app tuning knobs for subtitle and bump systems.

## 5. Visual Coupling Notes

Certain app.js flags drive CSS states via classes and CSS variables:

- Theme enable/disable toggles class-driven style branches.
- Bump enable/tuning writes CSS custom properties.
- Envelope persistence values influence pseudo-element opacity and transforms.

When changing animation behavior, update both JavaScript variable writes and corresponding CSS selectors.

## 6. Safety Checklist for Refactors

1. Keep public control IDs stable unless index.html and handlers are updated together.
2. Preserve JSON schema compatibility for saved songs and sample packs.
3. Validate syntax after edits (`node --check js/app.js`, `node --check js/sampler.js`).
4. Smoke-test both DAW and sampler routes after substantial changes.
