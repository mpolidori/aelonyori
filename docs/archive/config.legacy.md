# config.json — Subtitle Engine Tuning Reference

`config.json` controls the internal behaviour of the subtitle engine.
None of these values are exposed in the settings UI — they're purely for tuning the feel of the subtitles from here.

---

## How the subtitle cycle works

When subtitles are enabled and the DAW is playing, the engine runs a repeating three-phase cycle:

```
[gap pause] → show lower line → [lead pause] → push up + show new lower → [hold pause] → clear → repeat
```

1. **Gap** — a brief silence between subtitle "cards".
2. **Lead** — the lower subtitle appears on its own. This gives the viewer a moment to read just that one chunk before the next one arrives.
3. **Hold** — both lines (lower and upper) are shown together. After the hold, both lines clear and the gap starts again.

The second subtitle line is sampled a few steps *ahead* of the current playback position, so it tends to reference an upcoming beat rather than repeating the same one.

Roughly every few cycles the engine substitutes one of the two lines with **"(music)"** instead of a note label — a deliberate pause from dense text that mirrors a musical rest.

---

## Variables

### Music interval

```json
"musicIntervalMin": 4,
"musicIntervalMax": 6
```

After each "(music)" card, the engine waits a random number of text entries before showing "(music)" again. This range controls that wait.

- **Lower values** → "(music)" appears more often; the subtitles feel more sparse and musical.
- **Higher values** → longer stretches of note labels before the rest.
- The actual interval per cycle is `random integer in [musicIntervalMin, musicIntervalMax]`.

---

### Chunk size tiers

The engine picks how many consecutive note labels to stitch together into a subtitle line. There are three tiers:

```json
"shortChunkMin": 2,   "shortChunkMax": 6,
"mediumChunkMin": 7,  "mediumChunkMax": 9,
"longChunkMin": 10,   "longChunkMax": 12
```

A "chunk" is a number of sequential step labels joined with spaces, e.g. `"a kick e bass"` (4 labels).

- **Short tier (2–6)** is the most common. These read as quick, punchy phrases.
- **Medium tier (7–9)** produces a longer sentence-like line, used occasionally.
- **Long tier (10–12)** is rare and fills nearly the full subtitle width; used to contrast against a run of short ones.

Increasing `shortChunkMax` makes every subtitle line feel slightly longer even at the default tier.
Decreasing `longChunkMin` makes long lines appear sooner/more frequently when they're selected.

---

### Tier selection probabilities

```json
"longChunkProb": 0.1,
"longAfterLongChunkProb": 0.04,
"mediumChunkProb": 0.3
```

On each subtitle pick the engine first rolls for long, then (if not long) rolls for medium, otherwise defaults to short.

| Variable | When it fires | Effect |
|---|---|---|
| `longChunkProb` | First long-tier roll (normal case) | ~10% chance of a long line |
| `longAfterLongChunkProb` | Long-tier roll when the *previous* line was already long | Drops to ~4% to avoid two consecutive walls of text |
| `mediumChunkProb` | Medium-tier roll (only when long was not chosen) | ~30% chance of a medium-length line |

Raise `longChunkProb` to make long subtitle lines a regular occurrence rather than a surprise.
Raise `mediumChunkProb` all the way to `1.0` to effectively eliminate short lines.

---

### Second-line advance offset

```json
"secondAdvanceMin": 2,
"secondAdvanceMax": 6
```

The lower line is sampled at the *current* playback step. The upper line is sampled at `current + random(secondAdvanceMin, secondAdvanceMax)` steps forward. This makes the pair feel like a question/answer or cause/effect — the lower line is "now", the upper is "next".

- **Smaller range** (e.g. `1–2`) → the two lines reference very nearby beats; they'll often share the same instruments and feel like a continuation.
- **Larger range** (e.g. `8–16`) → the upper line jumps far ahead; the two lines feel more disconnected/surprising.

---

### Timing: lead, hold, gap delays

All three phases use the same structure: a low bound and a high bound, each expressed as both a **beat multiplier** (scales with tempo) and an absolute **ms clamp** (floor and ceiling so it stays readable at extreme tempos).

The actual delay is:
```
randomBetween(
  clamp(beatMs × loFactor, loMin, loMax),
  clamp(beatMs × hiFactor, hiMin, hiMax)
) × speedFactor
```

where `beatMs = 60_000 / tempo` and `speedFactor` is derived from the user-facing speed slider.

#### Lead delay — time before the upper line appears

```json
"leadDelayLoFactor": 1.1,  "leadDelayLoMin": 420,  "leadDelayLoMax": 950,
"leadDelayHiFactor": 1.8,  "leadDelayHiMin": 650,  "leadDelayHiMax": 1400
```

This is the pause between the lower line appearing alone and the upper line joining it.

- **Shorter lead** → the pair snaps into place quickly; feels more energetic.
- **Longer lead** → the lower line lingers on its own before the second one arrives; more dramatic.
- At 120 BPM, `beatMs ≈ 500ms`, so the lead lands between ~550ms and ~900ms (before speed scaling).

#### Hold delay — how long both lines stay visible together

```json
"holdDelayLoFactor": 3.2,  "holdDelayLoMin": 1800,  "holdDelayLoMax": 3200,
"holdDelayHiFactor": 5.4,  "holdDelayHiMin": 2500,  "holdDelayHiMax": 4700
```

This is how long the full two-line subtitle is displayed before clearing.

- **Shorter hold** → subtitles flash by quickly; high-energy but harder to read.
- **Longer hold** → the viewer has time to absorb the full pair before it disappears.
- At 120 BPM the hold ranges roughly 1.6–2.7 seconds (before speed scaling).

#### Gap delay — silence between subtitle cards

```json
"gapDelayLoFactor": 0.9,  "gapDelayLoMin": 350,  "gapDelayLoMax": 700,
"gapDelayHiFactor": 1.6,  "gapDelayHiMin": 520,  "gapDelayHiMax": 980
```

This is the blank-screen pause between one full subtitle card clearing and the next lower line appearing.

- **Shorter gap** → subtitles feel continuous, like rolling credits.
- **Longer gap** → more breathing room; the music has space between lyric moments.
- At 120 BPM the gap is roughly 450–800ms.

---

### Speed factor clamp

```json
"speedFactorMin": 0.5,
"speedFactorMax": 5.0
```

The user-facing speed slider (20–200) maps to a multiplier: `speedFactor = 100 / speed`. These clamp how extreme that multiplier can get.

- `speedFactorMin: 0.5` → at max speed (200), delays are halved at most.
- `speedFactorMax: 5.0` → at minimum speed (20), delays are quintupled at most.

Tightening this range makes the speed slider have less dramatic effect. Widening it makes the extremes of the slider feel more exaggerated.

---

## Quick-reference cheat sheet

| Goal | What to change |
|---|---|
| More "(music)" breaks | Lower `musicIntervalMin` and `musicIntervalMax` |
| Fewer "(music)" breaks | Raise both music interval values |
| Shorter subtitle lines | Lower `shortChunkMax`; lower tier probs |
| Longer subtitle lines | Raise `longChunkProb`; raise chunk max values |
| Subtitles feel too fast | Raise hold/lead delay factors or ms floors |
| Subtitles feel too slow | Lower hold/lead delay factors or ms ceilings |
| Less blank time between cards | Lower gap delay values |
| Two lines feel more related | Lower second-advance range (e.g. `1–3`) |
| Two lines feel more contrasting | Raise second-advance range (e.g. `6–12`) |
| Speed slider less aggressive | Narrow `speedFactorMin`/`speedFactorMax` (e.g. `0.7`–`3.0`) |
