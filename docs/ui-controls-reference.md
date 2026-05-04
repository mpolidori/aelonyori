# UI Controls Reference

This reference lists user-facing controls currently rendered by the app UI.

## DAW Transport

| Control | Label | Purpose |
|---|---|---|
| Settings | gear icon | Open/close settings modal |
| Play | play icon | Start/pause sequencer |
| Restart | restart icon | Return transport to loop start or step 1 |
| Seek Bar | seek | Scrub transport position |

## Global Settings Modal

### Presets and Song Data

| Control | Purpose |
|---|---|
| Preset select | Choose saved preset |
| Name input | Rename/save target |
| New / Save / Load / Default | Preset actions |
| Autosave toggle + interval | Background save behavior |
| Song JSON copy/apply/download/upload | Import/export and direct JSON workflows, including embedded video synth state |

### Range

| Control | Purpose |
|---|---|
| Range start/end selectors | Define active operation span |
| Copy | Duplicate into following region |
| Delete | Clear selected span |
| Duplicate | Insert duplicated span |
| Loop | Toggle transport loop to selected range |

### Global Params

| Control | Range | Purpose |
|---|---|---|
| Main | 0-127 | Master output gain |
| Tempo | 20-360 | BPM |
| Steps | 4-256 | Sequence length |
| Beat | 1-16 | Beat group size |
| Swing | 0-127 | Global swing amount |

### Feature Toggles

| Toggle | Purpose |
|---|---|
| Follow playhead | Grid autoscroll with transport |
| Sample pad | Show DAW sample pad tools |
| Theme | Theme mode enable |
| Gradient | Background gradient animation |
| Star bounce | Enable star bounce effect |
| Always bounce | Bounce star even when not playing |
| Bump | Enable letter bump effect |
| Subtitles | Playback subtitle cycle |
| Auto expand | Hover/touch expansion behavior |

### Bump Ranges

| Control | Range | Meaning |
|---|---|---|
| Bump height | 0-100 | Vertical displacement character |
| Bump intensity | 0-100 | Soft-to-hard hit response |
| Bump bounce | 0-100 | Tight-to-rubbery easing profile |

### Subtitles and Auto Expand Ranges

| Control | Range | Meaning |
|---|---|---|
| Subtitle speed | 20-200 | Slower-to-faster subtitle cycle |
| Auto expand speed | 0-200 | Expansion animation timing |

## Track-Level DAW Controls

| Control | Purpose |
|---|---|
| Instrument select | Per-track sound source |
| Mute / Solo | Routing control |
| Grid toggle | Show/hide note grid |
| Clear / Delete | Clear notes or remove track |
| Seq mode | Single vs roll representation |
| Note mode | One-shot vs hold behavior |
| Pitch/Tune | Pitch center and cents offset |
| Volume/Pan/Swing/Offset | Per-track mix and timing |
| Envelope ADSHR | Per-track synthesis envelope |
| Dual oscillator tabs/controls | Layer and blend oscillator params |

## Sampler Mode Controls

### Top Bar

| Control | Purpose |
|---|---|
| BPM | Sampler playback tempo |
| Steps | Compose length |
| Beat | Compose beat grouping |

### Pack Controls

| Control | Purpose |
|---|---|
| Pack name | Filename stem for exports |
| Upload pack | Import pack JSON |
| Download pack | Export pack JSON |

### Tabs

| Tab | Purpose |
|---|---|
| Pads | Trigger pads and pad-level edit |
| Compose | Step/corner ratchet sequencing |

### Bottom Dock

| Control | Purpose |
|---|---|
| Ratchet settings | Pad ratchet editor visibility |
| Record | Toggle recording mode |
| Play | Start/stop sampler playback |

### DAW Sample-Pad Toolbar (when enabled)

| Control | Purpose |
|---|---|
| Edit | Toggle sample pad editor |
| Preview | Trigger selected pad |
| Repeat | Selected pad ratchet |
| Trigger | Two-key trigger chord |
| Playback mode button | Enable pad playback transport mode |

## Video Synth Controls

### Top Bar

| Control | Purpose |
|---|---|
| reset | Reset all params to defaults |
| fullscreen | Enter fullscreen mode |
| HUD label | Shows current mode and audio/auto status |

### Preset Panel

| Control | Purpose |
|---|---|
| Preset select | Choose a saved preset |
| Name input | Label for new/saved preset |
| New / Save / Load / Default | Standalone video synth preset CRUD actions |
| Autosave toggle + interval | Background save interval control |
| JSON copy/apply/download/upload | Import/export preset state as JSON |

### Left Column

| Control | Range | Purpose |
|---|---|---|
| mode select | wave / noise field / grid fold / rings / bars / plasma | Base pattern generator |
| formula select | sine / tangent / fold / pulse / cheby / xor | Signal shaping function |
| video speed | 0–100 | Background video element playback speed |
| glitch a | 0–100 | Primary per-line jitter strength |
| glitch b | 0–100 | Secondary glitch layer strength |
| offset | 0–100 | Phase offset between glitch channels |
| rgb split | 0–100 | Ghost layer separation distance |
| pixel | 0–100 | UV pixelation / quantization amount |
| drift | 0–100 | Time warp / speed factor |
| scan | 0–100 | Scanline depth |

### Right Column

| Control | Range | Purpose |
|---|---|---|
| hue | 0–100 | Global hue rotation |
| noise | 0–100 | Additive noise per pattern layer |
| audio mix | 0–100 | Live audio waveform signal blend |
| auto mix | 0–100 | Auto-oscillator signal blend |
| color a | hex | Primary pattern layer color |
| color b | hex | Ghost/split layer color |
| text | string (≤3 lines) | Overlay text content |
| text color | hex | Overlay text tint color applied directly to the visible text |
| text size | 10–160 | Overlay text font size (px) |
| text mix | 0–100 | Blend amount between the pattern and the selected text tint |
| flip horizontal | toggle | Mirror overlay text horizontally |
| flip vertical | toggle | Flip overlay text upside-down |

### Toggle Row

| Toggle | Purpose |
|---|---|
| audio react | Enable/disable live audio waveform input |
| invert | Invert entire color output |
| video background | Enable logo video feed as background layer |
| crop | Show/hide crop overlay for video background region |
