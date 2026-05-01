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
| Song JSON copy/apply/download/upload | Import/export and direct JSON workflows |

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
