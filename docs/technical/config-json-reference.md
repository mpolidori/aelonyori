# config.json Reference

This file is intended for runtime tuning values that are not directly controlled by the settings UI.

Source file: [config.json](../../config.json)

## 1. Merge and Precedence

Startup behavior:

1. app.js defines in-code defaults.
2. config.json is fetched.
3. Present keys in config.json override in-code defaults.
4. Missing keys fall back safely.

This design allows partial config files.

## 2. Current Schema

```json
{
  "subtitles": {
    "minStepDurationMs": 100,
    "maxStepDurationMs": 2000,
    "defaultStepDurationMs": 850
  },
  "bump": {
    "durationMs": 280,
    "heightScaleMin": 0.2,
    "heightScaleMax": 2.6,
    "travelPxMin": 1,
    "travelPxMax": 26,
    "themeTravelMultiplier": 0.52,
    "easingIn": "cubic-bezier(0.36, 1.56, 0.64, 1)",
    "easingOut": "cubic-bezier(0.2, 0, 0.18, 1)",
    "shadowLiftEmMax": 0.17,
    "shadowBlurEmMin": 0.13,
    "shadowBlurEmMax": 0.39,
    "shadowOpacityTheme": 0.44,
    "shadowOpacityPlain": 0.22,
    "underlineLiftEmMax": 0.17,
    "underlineScaleYMin": 1.03,
    "underlineScaleYMax": 1.24,
    "underlineOpacityTheme": 0.44,
    "underlineOpacityPlain": 0.22,
    "hitPersistMs": 300,
    "underlinePersistMs": 310,
    "shadowPersistMs": 360,
    "themeGhostOpacityScale": 1,
    "plainGhostOpacityScale": 0.8,
    "themeUnderlineOpacityScale": 1,
    "plainUnderlineOpacityScale": 0.8
  }
}
```

## 3. subtitles Table

| Path | Type | Current | Suggested Range | Effect |
|---|---|---:|---|---|
| subtitles.minStepDurationMs | number | 100 | 40-400 | Lower bound clamp for subtitle step time |
| subtitles.maxStepDurationMs | number | 2000 | 500-5000 | Upper bound clamp for subtitle step time |
| subtitles.defaultStepDurationMs | number | 850 | 200-2000 | Base step duration when UI speed = neutral |

## 4. bump Table

| Path | Type | Current | Suggested Range | Effect |
|---|---|---:|---|---|
| bump.durationMs | number | 280 | 120-500 | Main letter hit animation duration |
| bump.heightScaleMin | number | 0.2 | 0.0-1.0 | Minimum normalized height multiplier |
| bump.heightScaleMax | number | 2.6 | 1.0-4.0 | Maximum normalized height multiplier |
| bump.travelPxMin | number | 1 | 0-8 | Minimum vertical travel in pixels |
| bump.travelPxMax | number | 26 | 8-48 | Maximum vertical travel in pixels |
| bump.themeTravelMultiplier | number | 0.52 | 0.2-1.0 | Scales travel in themed mode |
| bump.easingIn | string | cubic-bezier(0.36, 1.56, 0.64, 1) | valid CSS easing | Entry easing for hit motion |
| bump.easingOut | string | cubic-bezier(0.2, 0, 0.18, 1) | valid CSS easing | Exit easing for return motion |
| bump.shadowLiftEmMax | number | 0.17 | 0.0-0.4 | Max pseudo shadow vertical lift |
| bump.shadowBlurEmMin | number | 0.13 | 0.0-0.3 | Minimum ghost blur |
| bump.shadowBlurEmMax | number | 0.39 | 0.1-0.8 | Maximum ghost blur |
| bump.shadowOpacityTheme | number | 0.44 | 0.0-1.0 | Base ghost opacity in theme mode |
| bump.shadowOpacityPlain | number | 0.22 | 0.0-1.0 | Base ghost opacity in non-theme mode |
| bump.underlineLiftEmMax | number | 0.17 | 0.0-0.4 | Underline max lift amount |
| bump.underlineScaleYMin | number | 1.03 | 1.0-1.2 | Min underline thickness scale |
| bump.underlineScaleYMax | number | 1.24 | 1.0-1.6 | Max underline thickness scale |
| bump.underlineOpacityTheme | number | 0.44 | 0.0-1.0 | Base underline opacity in theme mode |
| bump.underlineOpacityPlain | number | 0.22 | 0.0-1.0 | Base underline opacity in plain mode |
| bump.hitPersistMs | number | 300 | 0-1000 | Duration of hit-state persistence envelope |
| bump.underlinePersistMs | number | 310 | 0-1000 | Underline envelope persistence time |
| bump.shadowPersistMs | number | 360 | 0-1000 | Ghost/shadow envelope persistence time |
| bump.themeGhostOpacityScale | number | 1 | 0.0-2.0 | Theme mode multiplier on ghost opacity |
| bump.plainGhostOpacityScale | number | 0.8 | 0.0-2.0 | Plain mode multiplier on ghost opacity |
| bump.themeUnderlineOpacityScale | number | 1 | 0.0-2.0 | Theme mode multiplier on underline opacity |
| bump.plainUnderlineOpacityScale | number | 0.8 | 0.0-2.0 | Plain mode multiplier on underline opacity |

## 5. Practical Tuning Recipes

### Lighter ghost/shadow

- Lower `bump.shadowOpacityTheme` and `bump.shadowOpacityPlain`.
- Optionally reduce `themeGhostOpacityScale` and `plainGhostOpacityScale`.

### More elastic bump

- Increase `bump.travelPxMax`.
- Increase `bump.heightScaleMax`.
- Use higher-overshoot `bump.easingIn` curve.

### Less visual residue in dense rhythm

- Reduce `hitPersistMs`, `underlinePersistMs`, `shadowPersistMs`.
- Lower opacity scales slightly.

## 6. Validation Notes

- All numeric values should remain finite and non-negative where applicable.
- Easing strings must be valid CSS timing functions.
- Invalid values should be clamped or ignored by fallback logic in app.js.
