# Audio Synthesis

This document describes the current synthesis implementation and practical future extension paths.

## 1. Core Audio Architecture

The engine uses Web Audio API nodes and schedules parameter automation in AudioContext time.

Common per-note pipeline:

1. Create source node(s) per voice.
2. Route through optional filter/tone stages.
3. Apply gain envelope (ADSHR or one-shot envelope).
4. Apply stereo pan.
5. Route to master gain/output.
6. Start/stop nodes with exact times.

## 2. Scheduling Model

The DAW scheduler:

- maintains a lookahead window,
- computes upcoming step boundaries,
- schedules voice events ahead of wall-clock time,
- drives UI hit states separately from audio clocks.

This keeps playback stable under render load and pointer interactions.

## 3. Built-In Voice Families

## Kick

Design pattern:

- Sine-based oscillator body.
- Fast downward pitch sweep for transient punch.
- Short amplitude envelope.

Typical controls: pitch/tune/body/tone/decay-level style controls.

## Snare

Design pattern:

- Tonal component + filtered noise component.
- Independent decay relationships to balance crack/noise tail.

Typical controls: noise amount, tone center, snappiness.

## Hat

Design pattern:

- Bright noise source and short envelope.
- High-pass/peaking filter shaping for metallic edge.

Typical controls: color/decay/brightness.

## Blip

Design pattern:

- Tonal short synth beep with simple envelope and optional harmonics.

Useful for melodic percussive accents.

## Bass

Design pattern:

- Low-frequency oscillator voice with stronger sustain usage.
- Filter contour or saturation-like color controls depending on settings.

Supports hold-note workflow especially well.

## Dual Oscillator

Design pattern:

- Two oscillator layers with independent tuning/mix.
- Optional detune or interval relationships for richer harmonic content.

Used for thicker melodic content or pseudo-chord textures.

## 4. Envelope System

Track envelope controls map to gain automation stages:

- Attack: rise from near-silence to peak.
- Hold: optional peak plateau.
- Decay: transition toward sustain level.
- Sustain: held level while note remains active.
- Release: fade-out after note end.

For one-shot percussion, hold/sustain may be effectively minimal.

## 5. Note Trigger Semantics

The sequencer supports:

- one-shot notes: each hit retriggers full envelope.
- hold notes: contiguous note data sustains between steps.
- per-track timing offset (ms): microtiming before/after step center.

All note times are converted to absolute AudioContext times before scheduling.

## 6. Mixing and Spatialization

Per-track mix controls include:

- volume (gain scaling),
- pan (StereoPannerNode),
- swing and offset timing shifts.

A master gain stage applies global output scaling.

## 7. Sampler Audio Behavior

Sampler uses decoded AudioBuffer sources:

- one buffer per pad,
- optional ratchet slicing/retrigger behavior,
- compose grid sequences buffers with per-cell rate/repeat values.

Pack import/export persists pad metadata and associated audio payloads.

## 8. Current Constraints and Tradeoffs

- Per-hit node creation is simple and robust but can be heavy at extreme density.
- Browser scheduling precision is high, but UI thread load can still affect visual sync.
- Large sample packs can increase memory pressure on mobile devices.

## 9. Future Implementations

This section expands realistic next steps for the engine.

## 9.1 LFO and Parameter Modulation

Goal:

- Introduce low-frequency modulation sources that can target selected AudioParams.

Approach:

- Create LFO oscillator per track or per voice group.
- Route through modulation gain node to control depth.
- Connect to destination param (pitch detune, filter frequency, gain, pan).

Considerations:

- Provide bipolar/unipolar mode.
- Add sync mode tied to BPM subdivisions.
- Clamp modulation depth for stability.

## 9.2 FM Routing to AudioParam

Goal:

- Add frequency modulation options beyond static dual-osc layering.

Classic FM relationship:

$$
\text{carrierFreq}(t) = f_c + I \cdot \sin(2\pi f_m t)
$$

Where:

- $f_c$ is carrier frequency,
- $f_m$ is modulator frequency,
- $I$ is modulation index.

Web Audio implementation sketch:

- Modulator oscillator -> modulation gain -> carrierOsc.frequency (or detune).
- Expose ratio mode ($f_m = r \cdot f_c$) and free mode.
- Envelope modulation index for transient-heavy or evolving timbre.

## 9.3 Delay with Feedback and Filter Loop

Goal:

- Add musical echo/repeat effects with controllable tone.

Proposed graph:

- Dry signal -> output.
- Dry signal -> DelayNode -> feedback GainNode -> FilterNode -> DelayNode.
- DelayNode output mixed back into output via wet gain.

Controls:

- time, feedback, wet/dry, feedback filter cutoff/Q.

Safety:

- hard clamp feedback < 1.0 to prevent runaway.

## 9.4 Waveshaper Distortion

Goal:

- Add controlled harmonic saturation/drive.

Approach:

- Build WaveShaperNode curve from drive parameter.
- Optional pre/post filtering to contain alias-heavy highs.

Curve families:

- soft clip,
- hard clip,
- asymmetrical clip (adds even harmonics).

## 9.5 DynamicsCompressorNode on Master Bus

Goal:

- Improve perceived loudness consistency and tame peaks.

Integration:

- Route master mix through DynamicsCompressorNode before destination.
- Expose threshold, ratio, attack, release, knee.

Use case:

- Helps dense percussive patterns feel cohesive without manual per-track gain riding.

## 9.6 Voice Pooling and Reuse

Goal:

- Reduce GC churn from very dense note triggering.

Approach:

- Pool reusable nodes where feasible (especially utility nodes).
- Retain per-hit source creation where mandatory (e.g., one-shot buffer sources).

## 9.7 Modulation Matrix (Longer Term)

Goal:

- Generalized source->destination routing UI.

Matrix examples:

- LFO1 -> filter cutoff,
- Envelope2 -> oscillator mix,
- Velocity/accent -> modulation index.

Design challenge:

- Keep UI compact and live-performance friendly.

## 10. Implementation Priorities

Suggested rollout order:

1. Master compressor (low-risk, high value).
2. Delay unit with safe feedback guards.
3. Waveshaper with pre/post filtering.
4. Track-level LFO with 2-3 destinations.
5. FM mode on dual oscillator voice.
6. Full modulation matrix if workflow demand justifies added complexity.
