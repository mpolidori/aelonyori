# Config Files Reference

Runtime tuning values that are not exposed as normal UI controls live under `configs/`.

## Active config files

- DAW runtime config: [configs/daw/config.json](../../configs/daw/config.json)
- Sampler config placeholder: [configs/sampler/config.json](../../configs/sampler/config.json)
- Video synth config placeholder: [configs/video/config.json](../../configs/video/config.json)

## Merge behavior

Current startup order for the DAW:

1. in-code defaults are defined in `app.js`
2. `configs/daw/config.json` is fetched
3. provided keys override in-code defaults
4. missing keys fall back safely

This means partial config files are supported.

The sampler and video synth config files currently exist to stabilize the layout and future tuning surface. Their `defaults.json` files are active now; their `config.json` files are reserved for non-UI tuning that may be added later.

## DAW config schema

```json
{
  "subtitles": {
    "musicIntervalMin": 4,
    "musicIntervalMax": 6,
    "shortChunkMin": 2,
    "shortChunkMax": 6,
    "mediumChunkMin": 7,
    "mediumChunkMax": 9,
    "longChunkMin": 10,
    "longChunkMax": 12,
    "longChunkProb": 0.1,
    "longAfterLongChunkProb": 0.04,
    "mediumChunkProb": 0.3,
    "secondAdvanceMin": 2,
    "secondAdvanceMax": 6,
    "leadDelayLoFactor": 1.1,
    "leadDelayLoMin": 420,
    "leadDelayLoMax": 950,
    "leadDelayHiFactor": 1.8,
    "leadDelayHiMin": 650,
    "leadDelayHiMax": 1400,
    "holdDelayLoFactor": 3.2,
    "holdDelayLoMin": 1800,
    "holdDelayLoMax": 3200,
    "holdDelayHiFactor": 5.4,
    "holdDelayHiMin": 2500,
    "holdDelayHiMax": 4700,
    "gapDelayLoFactor": 0.9,
    "gapDelayLoMin": 350,
    "gapDelayLoMax": 700,
    "gapDelayHiFactor": 1.6,
    "gapDelayHiMin": 520,
    "gapDelayHiMax": 980,
    "speedFactorMin": 0.5,
    "speedFactorMax": 5.0
  },
  "bump": {
    "underlineLength": 95,
    "underlineHoldMultiplier": 1.6,
    "underlineHoldMinMs": 80,
    "ghostHoldMultiplier": 2.25,
    "ghostHoldMinMs": 140,
    "ghostOpacityScaleTheme": 0.78,
    "ghostOpacityScaleNonTheme": 1.0
  }
}
```

## `subtitles` keys

| Key | Type | Meaning |
|---|---|---|
| musicIntervalMin | number | Lower bound for number of subtitle entries between `(music)` cards |
| musicIntervalMax | number | Upper bound for number of subtitle entries between `(music)` cards |
| shortChunkMin | number | Minimum chunk length for short subtitle selection |
| shortChunkMax | number | Maximum chunk length for short subtitle selection |
| mediumChunkMin | number | Minimum chunk length for medium subtitle selection |
| mediumChunkMax | number | Maximum chunk length for medium subtitle selection |
| longChunkMin | number | Minimum chunk length for long subtitle selection |
| longChunkMax | number | Maximum chunk length for long subtitle selection |
| longChunkProb | number | Probability of selecting long chunk tier |
| longAfterLongChunkProb | number | Reduced long-tier probability when previous tier was long |
| mediumChunkProb | number | Probability of selecting medium chunk tier |
| secondAdvanceMin | number | Lower bound chunk advance for second subtitle line pick |
| secondAdvanceMax | number | Upper bound chunk advance for second subtitle line pick |
| leadDelayLoFactor | number | Low-side lead delay factor used in timing calculation |
| leadDelayLoMin | number | Lead delay low-side minimum clamp (ms) |
| leadDelayLoMax | number | Lead delay low-side maximum clamp (ms) |
| leadDelayHiFactor | number | High-side lead delay factor used in timing calculation |
| leadDelayHiMin | number | Lead delay high-side minimum clamp (ms) |
| leadDelayHiMax | number | Lead delay high-side maximum clamp (ms) |
| holdDelayLoFactor | number | Low-side hold delay factor used in timing calculation |
| holdDelayLoMin | number | Hold delay low-side minimum clamp (ms) |
| holdDelayLoMax | number | Hold delay low-side maximum clamp (ms) |
| holdDelayHiFactor | number | High-side hold delay factor used in timing calculation |
| holdDelayHiMin | number | Hold delay high-side minimum clamp (ms) |
| holdDelayHiMax | number | Hold delay high-side maximum clamp (ms) |
| gapDelayLoFactor | number | Low-side gap delay factor used in timing calculation |
| gapDelayLoMin | number | Gap delay low-side minimum clamp (ms) |
| gapDelayLoMax | number | Gap delay low-side maximum clamp (ms) |
| gapDelayHiFactor | number | High-side gap delay factor used in timing calculation |
| gapDelayHiMin | number | Gap delay high-side minimum clamp (ms) |
| gapDelayHiMax | number | Gap delay high-side maximum clamp (ms) |
| speedFactorMin | number | Lower clamp for speed scaling factor |
| speedFactorMax | number | Upper clamp for speed scaling factor |

## `bump` keys

| Key | Type | Meaning |
|---|---|---|
| underlineLength | number | Underline visibility/length scaling value |
| underlineHoldMultiplier | number | Underline hold duration multiplier |
| underlineHoldMinMs | number | Minimum underline hold duration in ms |
| ghostHoldMultiplier | number | Ghost hold duration multiplier |
| ghostHoldMinMs | number | Minimum ghost hold duration in ms |
| ghostOpacityScaleTheme | number | Ghost opacity multiplier in theme mode |
| ghostOpacityScaleNonTheme | number | Ghost opacity multiplier in non-theme mode |

## Notes

- Reload the page after changing files in `configs/`.
- Values are merged with in-code defaults, so you can tune only the keys you care about.
- Keep `configs/sampler/config.json` and `configs/video/config.json` additive if new non-UI tuning knobs are introduced.
