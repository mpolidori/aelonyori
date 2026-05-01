# Sound Synthesis Reference

No third-party audio library is used. Every sound is generated in real time using the browser's native **Web Audio API** — a low-level graph of nodes that runs in a dedicated audio thread.

---

## Audio graph overview

```
OscillatorNode or AudioBufferSourceNode
        │
  (optional filter: BiquadFilterNode)
        │
    GainNode  ←── ADSR envelope automation
        │
  (optional StereoPannerNode)
        │
    master GainNode  ←── global volume
        │
   AudioContext.destination
```

Each triggered note creates its own short-lived node chain. Nodes are scheduled ahead of time (by ~120ms) so the audio thread never stalls waiting for the JS thread.

---

## The five sounds

### Kick — `triggerKick`

**Source:** `OscillatorNode` with type `"sine"`

A pure sine wave is the starting point. The kick's characteristic thump comes entirely from a **frequency sweep**: the oscillator starts at a high-ish frequency (90–300 Hz depending on pitch) and exponentially ramps down to a low frequency (35–110 Hz) over about 180ms. That drop is what makes a boom sound punchy rather than just a low hum.

No filter. The pitch control shifts both the start and end frequencies proportionally, so higher pitches give a higher-pitched, tighter kick, and lower pitches give a deep, sub-heavy one.

Chain: `Oscillator → Gain (ADSR) → [Panner] → master`

---

### Snare — `triggerSnare`

**Source:** Two simultaneous layers mixed together:

1. **Noise layer** — `AudioBufferSourceNode` playing looped white noise, passed through a `BiquadFilterNode` set to `"highpass"`. The highpass cutoff ranges from ~800 Hz to ~3000 Hz based on pitch. This gives the hiss/snappy top end.

2. **Tone layer** — `OscillatorNode` with type `"triangle"`. Frequency ranges from 140–460 Hz based on pitch. This adds a short tonal "crack" body beneath the noise.

Both layers share the same ADSR envelope shape but have independently scaled peaks (noise at ~55% volume, tone at ~22%), so the noise is dominant but the tone adds weight.

Chain: `Noise → Highpass → Gain (ADSR) → [Panner] → master`  
        `Triangle osc → Gain (ADSR) → [Panner] → master`

---

### Hat — `triggerHat`

**Source:** `AudioBufferSourceNode` playing looped white noise, passed through a `BiquadFilterNode` set to `"highpass"`.

The highpass cutoff is much higher than the snare (4800–13800 Hz), which cuts almost everything except the extreme top end — that's what makes it sound like a hi-hat rather than noise. Pitch shifts the cutoff frequency, so higher pitches give a more brittle, metallic sound.

No tonal layer. Peak volume is lower (~35%) to keep the hat from dominating.

Chain: `Noise → Highpass → Gain (ADSR) → [Panner] → master`

---

### Blip — `triggerTonalBlip`

**Source:** `OscillatorNode` with type `"square"`

A square wave is the default tonal instrument — it's brighter and buzzier than a sine because it contains odd harmonics (3rd, 5th, 7th…). No filter. Frequency comes directly from MIDI pitch via the standard formula `440 × 2^((midi−69)/12)`. Peak volume is ~25%.

Chain: `Square osc → Gain (ADSR) → [Panner] → master`

---

### Bass — `triggerBass`

**Source:** `OscillatorNode` with type `"sawtooth"`, filtered through a `BiquadFilterNode` set to `"lowpass"`

A sawtooth contains all harmonics (both odd and even), making it the richest/most complex of the built-in waveforms. The lowpass filter sweeps down from ~900 Hz to ~160 Hz over the first 180ms, which creates the characteristic "woof" of an analog bass synth — the bright harmonics die away as the note settles.

The bass MIDI pitch is also shifted down by 2 octaves (`effectiveMidiForSound` subtracts 24 semitones) so that the same pitch knob range that controls other sounds maps to a lower register for bass. Peak volume is ~70%.

Chain: `Sawtooth osc → Lowpass filter → Gain (ADSR) → [Panner] → master`

---

## Noise buffer

The white noise used by hat and snare is pre-generated once when the audio context is first used (`getNoiseBuffer`): a 1-second buffer of random values in `[−1, 1]` at the full sample rate. Both instruments loop this buffer during playback, which is more efficient than generating fresh noise per note.

---

## Envelope (ADSR + Hold)

The envelope is **not** calculated upfront and passed as a buffer. Instead, it is programmed directly onto the `AudioParam` of the gain node using the Web Audio API's built-in automation methods — `setValueAtTime`, `linearRampToValueAtTime`, and `exponentialRampToValueAtTime`. The audio thread executes these precisely at the scheduled sample position.

### The five envelope parameters

All five values are stored on a 0–127 scale (hold uses 0–100) and mapped to time in seconds with a **quadratic curve** (`n² × maxSeconds`). This means small values produce very fast times and large values spread out gradually — which matches how analog envelope controls feel (most of the useful range is in the lower half).

| Param | Scale | Max mapped time | What it controls |
|---|---|---|---|
| **Attack** | 0–127 | 1.2 s | Time from zero to peak amplitude |
| **Hold** | 0–100 | 2.0 s | Time the signal stays at peak before decay begins |
| **Decay** | 0–127 | 1.2 s | Time from peak down to the sustain level |
| **Sustain** | 0–127 | — (level, not time) | Fraction of peak held while the gate is open (0 = silence, 127 = full peak) |
| **Release** | 0–127 | 1.8 s | Time from gate close (end of step duration) back to silence |

### Gate clamping

If attack + decay would exceed the available gate time (the step duration), both are scaled down proportionally so the sound still reaches its sustain level within the note length. This prevents notes from sounding "stuck" at the attack phase when the tempo is fast.

### The signal path in time

```
t0 ──[attack]──> peak ──[hold]──> peak ──[decay]──> sustain ──[gate end]──> sustain ──[release]──> 0
```

---

## MIDI pitch → frequency

Standard equal temperament:

```
frequency = 440 × 2^((midi − 69) / 12)
```

MIDI 60 = C4 = 261.6 Hz. The playable range is MIDI 24–84 (C1–C6).

Fine-tuning via `tuneCents` shifts the MIDI value by up to ±1 semitone before the frequency conversion.

---

## Stereo panning

Uses `StereoPannerNode` (the modern, simpler panning API) rather than the older `PannerNode` (which is 3D spatial). The pan value is `−1` (hard left) to `+1` (hard right) and is set at the scheduled note time.

---

## What the Web Audio API provides out of the box

The `OscillatorNode` natively supports four waveform types:

| Type | Harmonic content | Character |
|---|---|---|
| `"sine"` | Fundamental only | Smooth, pure — used for kick |
| `"triangle"` | Odd harmonics, falling off as 1/n² | Softer buzz — used for snare body |
| `"square"` | Odd harmonics, falling off as 1/n | Bright, hollow buzz — used for blip |
| `"sawtooth"` | All harmonics, falling off as 1/n | Rich, sharp — used for bass |

There is also a `"custom"` type that accepts a `PeriodicWave` object — an array of Fourier sine and cosine coefficients — which lets you synthesize any waveform by describing its harmonic spectrum.

---

## Adding a pure sine and a second wave layer

**Yes, a pure sine is already natively available** — `osc.type = "sine"` is what the kick already uses. It's the cleanest, most fundamental tone possible with the API.

A stacked two-oscillator design would be straightforward to add. The simplest approach:

```
Osc 1 (primary wave)  ─┐
                        ├─> Gain (mix level) ─> shared Gain (ADSR) ─> [Panner] ─> master
Osc 2 (secondary wave) ─┘
```

Both oscillators would share the same ADSR envelope on the final gain node, so they rise and fall together. An independent mix level on the second oscillator's gain node controls how much of it is blended in.

Letting the user pick the wave type for each layer independently (any of the four built-in types, plus `"sine"`) would cover the most useful combinations without needing a custom PeriodicWave:

| Combo | Result |
|---|---|
| sine + sine (detuned slightly) | Chorus/shimmer — gentle, phase-beating warmth |
| sine + square | Fundamental clarity with added brightness |
| sawtooth + sine | Bass with a clean sub underneath |
| square + triangle | Retro buzzy lead with softer overtones |
| sawtooth + sawtooth (detuned) | Classic supersaw — thick detuned synth pad |

Detuning the second oscillator by a few cents (e.g. +7 to +14 cents) relative to the first is what creates the beating/chorus effect that makes stacked oscillators sound much bigger than a single one.
