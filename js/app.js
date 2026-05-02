(async () => {
  const userAgent = String(navigator.userAgent || "");
  const isAndroidChrome =
    /Android/i.test(userAgent) &&
    /Chrome\//i.test(userAgent) &&
    !/EdgA\//i.test(userAgent) &&
    !/OPR\//i.test(userAgent) &&
    !/SamsungBrowser\//i.test(userAgent);
  document.documentElement.classList.toggle(
    "is-android-chrome",
    isAndroidChrome,
  );

  const letters = Array.from(document.querySelectorAll(".logo .letter"));
  const daw = document.getElementById("daw");
  const tracksContainer = document.getElementById("tracks");

  const themeStarBtn = document.getElementById("themeStarBtn");
  const navToSamplerBtn = document.getElementById("navToSamplerBtn");
  const navToDawBtn = document.getElementById("navToDawBtn");
  const samplePadWrap = document.getElementById("samplePadWrap");
  const samplePadGrid = document.getElementById("samplePadGrid");
  const samplePadRollWrap = document.getElementById("samplePadRollWrap");
  const samplePadRollGrid = document.getElementById("samplePadRollGrid");
  const samplePadRollLengthInput = document.getElementById(
    "samplePadRollLength",
  );
  const samplePadRollLengthOut = document.getElementById(
    "samplePadRollLengthOut",
  );
  const samplePadRollBeatStepsInput = document.getElementById(
    "samplePadRollBeatSteps",
  );
  const samplePadRollBeatStepsOut = document.getElementById(
    "samplePadRollBeatStepsOut",
  );
  const samplePadToolbar = document.getElementById("samplePadToolbar");
  const samplePadEditBtn = document.getElementById("samplePadEditBtn");
  const samplePadPlaybackModeBtn = document.getElementById(
    "samplePadPlaybackModeBtn",
  );
  const samplePadModeToolbar = document.getElementById("samplePadModeToolbar");
  const samplePadRollRatchetPicker = document.getElementById(
    "samplePadRollRatchetPicker",
  );
  const samplePadEditor = document.getElementById("samplePadEditor");
  const samplePadEditorLabel = document.getElementById("samplePadEditorLabel");
  const samplePadPreviewBtn = document.getElementById("samplePadPreviewBtn");
  const samplePadRatchetSelect = document.getElementById(
    "samplePadRatchetSelect",
  );
  const samplePadTriggerInput = document.getElementById(
    "samplePadTriggerInput",
  );
  const themePicker = document.getElementById("themePicker");
  const themePickerBox = document.getElementById("themePickerBox");
  const themeEnableModal = document.getElementById("themeEnableModal");
  const themeEnableYesBtn = document.getElementById("themeEnableYesBtn");
  const themeEnableNoBtn = document.getElementById("themeEnableNoBtn");
  const themeControls = document.getElementById("themeControls");
  const themeColorAInput = document.getElementById("themeColorA");
  const themeColorBInput = document.getElementById("themeColorB");
  const themeSwapBtn = document.getElementById("themeSwapBtn");
  const themeResetBtn = document.getElementById("themeResetBtn");
  const gradientAnimationRow = document.getElementById("gradientAnimationRow");
  const gradientAnimationToggleBtn = document.getElementById(
    "gradientAnimationToggleBtn",
  );
  const bumpToggleBtn = document.getElementById("bumpToggleBtn");
  const starBounceToggleBtn = document.getElementById("starBounceToggleBtn");
  const starBounceAlwaysToggleBtn = document.getElementById(
    "starBounceAlwaysToggleBtn",
  );
  const bumpHeightRow = document.getElementById("bumpHeightRow");
  const bumpHeightInput = document.getElementById("bumpHeight");
  const bumpHeightOut = document.getElementById("bumpHeightOut");
  const bumpIntensityRow = document.getElementById("bumpIntensityRow");
  const bumpIntensityInput = document.getElementById("bumpIntensity");
  const bumpIntensityOut = document.getElementById("bumpIntensityOut");
  const bumpBounceRow = document.getElementById("bumpBounceRow");
  const bumpBounceInput = document.getElementById("bumpBounce");
  const bumpBounceOut = document.getElementById("bumpBounceOut");
  const autoExpandToggleBtn = document.getElementById("autoExpandToggleBtn");
  const autoExpandSpeedRow = document.getElementById("autoExpandSpeedRow");
  const autoExpandSpeedInput = document.getElementById("autoExpandSpeed");
  const autoExpandSpeedOut = document.getElementById("autoExpandSpeedOut");
  const samplePadToggleBtn = document.getElementById("samplePadToggleBtn");
  const subtitlesToggleBtn = document.getElementById("subtitlesToggleBtn");
  const subtitlesSpeedRow = document.getElementById("subtitlesSpeedRow");
  const subtitlesSpeedInput = document.getElementById("subtitlesSpeed");
  const subtitlesSpeedOut = document.getElementById("subtitlesSpeedOut");
  const subtitleStack = document.getElementById(
    "subtitleStack",
  );
  const subtitleLower = document.getElementById(
    "subtitleLower",
  );
  const subtitleUpper = document.getElementById(
    "subtitleUpper",
  );
  const autoscrollToggleBtn = document.getElementById("autoscrollToggleBtn");

  const tempoInput = document.getElementById("tempo");
  const tempoOut = document.getElementById("tempoOut");
  const globalSwingInput = document.getElementById("globalSwing");
  const globalSwingOut = document.getElementById("globalSwingOut");
  const globalVolumeInput = document.getElementById("globalVolume");
  const globalVolumeOut = document.getElementById("globalVolumeOut");
  const stepsInput = document.getElementById("steps");
  const stepsOut = document.getElementById("stepsOut");
  const beatStepsInput = document.getElementById("beatSteps");
  const beatStepsOut = document.getElementById("beatStepsOut");
  const themeModeBtn = document.getElementById("themeModeBtn");

  const settingsModal = document.getElementById("settingsModal");
  const settingsPanel = document.getElementById("settingsPanel");
  const settingsThemeControlsMount = document.getElementById(
    "settingsThemeControlsMount",
  );

  let settingsScrollHintUp = null;
  let settingsScrollHintDown = null;

  const rangeFromInput = document.getElementById("rangeFrom");
  const rangeToInput = document.getElementById("rangeTo");
  const rangeCopyBtn = document.getElementById("rangeCopyBtn");
  const rangeDuplicateBtn = document.getElementById("rangeDuplicateBtn");
  const rangeDeleteBtn = document.getElementById("rangeDeleteBtn");
  const rangeLoopBtn = document.getElementById("rangeLoopBtn");

  const presetSelect = document.getElementById("presetSelect");
  const presetNameInput = document.getElementById("presetName");
  const presetStatus = document.getElementById("presetStatus");
  const autosaveToggleBtn = document.getElementById("autosaveToggleBtn");
  const autosaveIntervalSelect = document.getElementById("autosaveInterval");
  const presetNewBtn = document.getElementById("presetNewBtn");
  const presetSaveBtn = document.getElementById("presetSaveBtn");
  const presetLoadBtn = document.getElementById("presetLoadBtn");
  const presetDefaultBtn = document.getElementById("presetDefaultBtn");
  const songJsonCopyBtn = document.getElementById("songJsonCopyBtn");
  const songJsonApplyBtn = document.getElementById("songJsonApplyBtn");
  const songJsonDownloadBtn = document.getElementById("songJsonDownloadBtn");
  const songJsonUploadBtn = document.getElementById("songJsonUploadBtn");
  const songJsonUploadInput = document.getElementById("songJsonUploadInput");
  const autosaveStatus = document.getElementById("autosaveStatus");
  const songIo = document.getElementById("songIo");
  const songJson = document.getElementById("songJson");
  const songJsonHighlight = document.getElementById("songJsonHighlight");

  const transportBar = document.getElementById("transportBar");
  const transportSettingsBtn = document.getElementById("transportSettingsBtn");
  const transportPlayBtn = document.getElementById("transportPlayBtn");
  const transportRestartBtn = document.getElementById("transportRestartBtn");
  const transportSeekBtn = document.getElementById("transportSeekBtn");
  const transportTicks = document.getElementById("transportTicks");
  const transportSubtitle = document.getElementById("transportSubtitle");
  const padPlaybackChip = document.getElementById("padPlaybackChip");

  const lookaheadMs = 25;
  const scheduleAheadTime = 0.12;
  const MAX_STEPS = 256;
  const NOTE_DRAG_LONG_HOLD_MS = 420;

  const NOTE_ROWS = 24; // 2 octaves (semitones)
  const NOTE_MASK_ALL = Math.pow(2, NOTE_ROWS) - 1;

  const DUAL_OSC_SOUND = "dualoscillator";

  const SOUND_OPTIONS = [
    { value: "kick", label: "kick", tonal: false },
    { value: "snare", label: "snare", tonal: false },
    { value: "hat", label: "hat", tonal: false },
    { value: "blip", label: "blip", tonal: true },
    { value: "bass", label: "bass", tonal: true },
    { value: DUAL_OSC_SOUND, label: "dual oscillator", tonal: true },
  ];

  const OSC_WAVE_OPTIONS = ["sine", "triangle", "square", "sawtooth"];

  const NOTE_NAMES = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const PITCH_MIN = 24;
  const PITCH_MAX = 84;

  const TONAL_SOUNDS = new Set(
    SOUND_OPTIONS.filter((o) => o.tonal).map((o) => o.value),
  );

  const DEFAULTS_PATH = "defaults.json";
  const CONFIG_PATH = "config.json";

  const DEFAULT_CONFIG = Object.freeze({
    subtitles: Object.freeze({
      musicIntervalMin: 4,
      musicIntervalMax: 6,
      shortChunkMin: 2,
      shortChunkMax: 6,
      mediumChunkMin: 7,
      mediumChunkMax: 9,
      longChunkMin: 10,
      longChunkMax: 12,
      longChunkProb: 0.1,
      longAfterLongChunkProb: 0.04,
      mediumChunkProb: 0.3,
      secondAdvanceMin: 2,
      secondAdvanceMax: 6,
      leadDelayLoFactor: 1.1,
      leadDelayLoMin: 420,
      leadDelayLoMax: 950,
      leadDelayHiFactor: 1.8,
      leadDelayHiMin: 650,
      leadDelayHiMax: 1400,
      holdDelayLoFactor: 3.2,
      holdDelayLoMin: 1800,
      holdDelayLoMax: 3200,
      holdDelayHiFactor: 5.4,
      holdDelayHiMin: 2500,
      holdDelayHiMax: 4700,
      gapDelayLoFactor: 0.9,
      gapDelayLoMin: 350,
      gapDelayLoMax: 700,
      gapDelayHiFactor: 1.6,
      gapDelayHiMin: 520,
      gapDelayHiMax: 980,
      speedFactorMin: 0.5,
      speedFactorMax: 5.0,
    }),
    bump: Object.freeze({
      underlineLength: 100,
      underlineHoldMultiplier: 1.6,
      underlineHoldMinMs: 80,
      ghostHoldMultiplier: 2.25,
      ghostHoldMinMs: 140,
      ghostOpacityScaleTheme: 1.0,
      ghostOpacityScaleNonTheme: 1.0,
    }),
  });

  async function loadConfig() {
    try {
      const response = await fetch(CONFIG_PATH, { cache: "no-store" });
      if (!response.ok) {
        return {
          subtitles: { ...DEFAULT_CONFIG.subtitles },
          bump: { ...DEFAULT_CONFIG.bump },
        };
      }
      const parsed = await response.json();
      return {
        subtitles: mergeDefaultSection(
          DEFAULT_CONFIG.subtitles,
          parsed && parsed.subtitles,
        ),
        bump: mergeDefaultSection(DEFAULT_CONFIG.bump, parsed && parsed.bump),
      };
    } catch {
      return {
        subtitles: { ...DEFAULT_CONFIG.subtitles },
        bump: { ...DEFAULT_CONFIG.bump },
      };
    }
  }

  const DEFAULT_APP_DEFAULTS = Object.freeze({
    globals: Object.freeze({
      tempo: Number(tempoInput?.value || 120),
      globalSwing: Number(globalSwingInput?.value || 0),
      globalVolume: Number(globalVolumeInput?.value || 100),
      stepsCount: Number(stepsInput?.value || 16),
      beatSteps: numberOrFallback(beatStepsInput?.value || 4, 4),
    }),
    ui: Object.freeze({
      autoExpandEnabled: false,
      autoExpandSpeed: 100,
      samplePadEnabled: false,
      samplePadTransportMode: false,
      samplePadRollLength: 16,
      samplePadRollBeatSteps: 4,
      subtitlesEnabled: false,
      subtitlesSpeed: 100,
      autosaveEnabled: false,
      autosaveIntervalMinutes: 5,
      autoscrollEnabled: true,
      gradientAnimationEnabled: true,
      themeEnabled: false,
      bumpEnabled: false,
      bumpHeight: 0,
      bumpIntensity: 50,
      bumpBounce: 50,
      starBounceEnabled: true,
      starBounceAlwaysEnabled: true,
      themeA: "#000000",
      themeB: "#ffffff",
    }),
    trackDefaults: Object.freeze({
      sound: "kick",
      pitch: 60,
      tuneCents: 0,
      volume: 100,
      pan: 0,
      swing: 0,
      offsetMs: 0,
      muted: false,
      solo: false,
      collapsed: true,
      seqMode: "single",
      gridCollapsed: false,
    }),
    envDefaultsBySound: Object.freeze({
      kick: Object.freeze({
        attack: 4,
        hold: 8,
        decay: 18,
        sustain: 40,
        release: 20,
        pitch: 60,
        tuneCents: 0,
        volume: 100,
        pan: 0,
        swing: 0,
        offsetMs: 0,
        muted: false,
        solo: false,
        collapsed: true,
        seqMode: "single",
        gridCollapsed: false,
      }),
      snare: Object.freeze({
        attack: 4,
        hold: 0,
        decay: 20,
        sustain: 60,
        release: 25,
        pitch: 60,
        tuneCents: 0,
        volume: 100,
        pan: 0,
        swing: 0,
        offsetMs: 0,
        muted: false,
        solo: false,
        collapsed: true,
        seqMode: "single",
        gridCollapsed: false,
      }),
      hat: Object.freeze({
        attack: 4,
        hold: 8,
        decay: 16,
        sustain: 36,
        release: 20,
        pitch: 60,
        tuneCents: 0,
        volume: 100,
        pan: 0,
        swing: 0,
        offsetMs: 0,
        muted: false,
        solo: false,
        collapsed: true,
        seqMode: "single",
        gridCollapsed: false,
      }),
      blip: Object.freeze({
        attack: 4,
        hold: 16,
        decay: 20,
        sustain: 60,
        release: 25,
        pitch: 60,
        tuneCents: 0,
        volume: 100,
        pan: 0,
        swing: 0,
        offsetMs: 0,
        muted: false,
        solo: false,
        collapsed: true,
        seqMode: "roll",
        gridCollapsed: false,
      }),
      bass: Object.freeze({
        attack: 4,
        hold: 0,
        decay: 20,
        sustain: 96,
        release: 25,
        pitch: 48,
        tuneCents: 0,
        volume: 100,
        pan: 0,
        swing: 0,
        offsetMs: 0,
        muted: false,
        solo: false,
        collapsed: true,
        seqMode: "roll",
        gridCollapsed: false,
      }),
      dualoscillator: Object.freeze({
        attack: 4,
        hold: 10,
        decay: 20,
        sustain: 96,
        release: 25,
        pitch: 60,
        tuneCents: 0,
        volume: 100,
        pan: 0,
        swing: 0,
        offsetMs: 0,
        muted: false,
        solo: false,
        collapsed: true,
        seqMode: "roll",
        gridCollapsed: false,
        osc1Wave: "sawtooth",
        osc1Level: 127,
        osc1Octave: 0,
        osc1Detune: 0,
        osc2Wave: "sine",
        osc2Level: 84,
        osc2Octave: 0,
        osc2Detune: 7,
        oscBlend: 0,
      }),
    }),
    accent: Object.freeze({
      nonThemeBumpOffsetFraction: 0.5,
      nonThemeBumpLighten: 0.1,
      nonThemeBumpDesaturate: 0.08,
    }),
  });

  function mergeDefaultSection(base, patch) {
    if (!patch || typeof patch !== "object") return { ...base };
    return { ...base, ...patch };
  }

  async function loadAppDefaults() {
    try {
      const response = await fetch(DEFAULTS_PATH, { cache: "no-store" });
      if (!response.ok) {
        return {
          globals: { ...DEFAULT_APP_DEFAULTS.globals },
          ui: { ...DEFAULT_APP_DEFAULTS.ui },
        };
      }
      const parsed = await response.json();
      const globals = mergeDefaultSection(
        DEFAULT_APP_DEFAULTS.globals,
        parsed && parsed.globals,
      );
      const ui = mergeDefaultSection(DEFAULT_APP_DEFAULTS.ui, parsed && parsed.ui);
      const trackDefaults = mergeDefaultSection(
        DEFAULT_APP_DEFAULTS.trackDefaults,
        parsed && parsed.trackDefaults,
      );
      const envDefaultsBySound = mergeDefaultSection(
        DEFAULT_APP_DEFAULTS.envDefaultsBySound,
        parsed && parsed.envDefaultsBySound,
      );
      const accent = mergeDefaultSection(
        DEFAULT_APP_DEFAULTS.accent,
        parsed && parsed.accent,
      );
      return { globals, ui, trackDefaults, envDefaultsBySound, accent };
    } catch {
      return {
        globals: { ...DEFAULT_APP_DEFAULTS.globals },
        ui: { ...DEFAULT_APP_DEFAULTS.ui },
        trackDefaults: { ...DEFAULT_APP_DEFAULTS.trackDefaults },
        envDefaultsBySound: { ...DEFAULT_APP_DEFAULTS.envDefaultsBySound },
        accent: { ...DEFAULT_APP_DEFAULTS.accent },
      };
    }
  }

  const appDefaults = await loadAppDefaults();
  const appConfig = await loadConfig();
  const BUMP_UNDERLINE_LENGTH = clampNumber(
    Math.round(numberOrFallback(appConfig.bump?.underlineLength, 100)),
    1,
    100,
  );
  const BUMP_UNDERLINE_HOLD_MULTIPLIER = clampNumber(
    numberOrFallback(appConfig.bump?.underlineHoldMultiplier, 1.6),
    0.1,
    8,
  );
  const BUMP_UNDERLINE_HOLD_MIN_MS = clampNumber(
    Math.round(numberOrFallback(appConfig.bump?.underlineHoldMinMs, 80)),
    20,
    2000,
  );
  const BUMP_GHOST_HOLD_MULTIPLIER = clampNumber(
    numberOrFallback(appConfig.bump?.ghostHoldMultiplier, 2.25),
    0.1,
    12,
  );
  const BUMP_GHOST_HOLD_MIN_MS = clampNumber(
    Math.round(numberOrFallback(appConfig.bump?.ghostHoldMinMs, 140)),
    20,
    3000,
  );
  const BUMP_GHOST_OPACITY_SCALE_THEME = clampNumber(
    numberOrFallback(appConfig.bump?.ghostOpacityScaleTheme, 1.0),
    0,
    3,
  );
  const BUMP_GHOST_OPACITY_SCALE_NON_THEME = clampNumber(
    numberOrFallback(appConfig.bump?.ghostOpacityScaleNonTheme, 1.0),
    0,
    3,
  );

  const TRACK_DEFAULTS = Object.freeze({
    sound: String(appDefaults.trackDefaults?.sound || "kick"),
    pitch: numberOrFallback(appDefaults.trackDefaults?.pitch, 60),
    tuneCents: numberOrFallback(appDefaults.trackDefaults?.tuneCents, 0),
    volume: numberOrFallback(appDefaults.trackDefaults?.volume, 100),
    pan: numberOrFallback(appDefaults.trackDefaults?.pan, 0),
    swing: numberOrFallback(appDefaults.trackDefaults?.swing, 0),
    offsetMs: numberOrFallback(appDefaults.trackDefaults?.offsetMs, 0),
    muted: Boolean(appDefaults.trackDefaults?.muted),
    solo: Boolean(appDefaults.trackDefaults?.solo),
    collapsed:
      typeof appDefaults.trackDefaults?.collapsed === "boolean"
        ? appDefaults.trackDefaults.collapsed
        : true,
    seqMode:
      appDefaults.trackDefaults?.seqMode === "roll" ? "roll" : "single",
    gridCollapsed: Boolean(appDefaults.trackDefaults?.gridCollapsed),
  });

  function normalizeEnvDefaults(raw, fallback) {
    const input = raw && typeof raw === "object" ? raw : {};
    return {
      attack: clampNumber(numberOrFallback(input.attack, fallback.attack), 0, 127),
      hold: clampNumber(numberOrFallback(input.hold, fallback.hold), 0, 100),
      decay: clampNumber(numberOrFallback(input.decay, fallback.decay), 0, 127),
      sustain: clampNumber(numberOrFallback(input.sustain, fallback.sustain), 0, 127),
      release: clampNumber(numberOrFallback(input.release, fallback.release), 0, 127),
    };
  }

  function defaultSeqModeForSound(kind) {
    return kind === "blip" || kind === "bass" || kind === DUAL_OSC_SOUND
      ? "roll"
      : "single";
  }

  function defaultNoteModeForSound(kind) {
    return kind === "blip" || kind === "bass" || kind === DUAL_OSC_SOUND
      ? "hold"
      : "one-shot";
  }

  function normalizeNoteMode(value, fallback = "one-shot") {
    return value === "hold" || value === "one-shot" ? value : fallback;
  }

  function normalizeSoundKind(kind, fallback = "kick") {
    const raw = String(kind || "").trim().toLowerCase();
    const mapped = raw === "stack" ? DUAL_OSC_SOUND : raw;
    const safeFallback = SOUND_OPTIONS.some((o) => o.value === fallback)
      ? fallback
      : "kick";
    return SOUND_OPTIONS.some((o) => o.value === mapped) ? mapped : safeFallback;
  }

  function normalizeSoundDefaults(raw, fallback, kind) {
    const input = raw && typeof raw === "object" ? raw : {};
    return {
      pitch: clampNumber(numberOrFallback(input.pitch, fallback.pitch), PITCH_MIN, PITCH_MAX),
      tuneCents: clampNumber(numberOrFallback(input.tuneCents, fallback.tuneCents), -100, 100),
      volume: clampNumber(numberOrFallback(input.volume, fallback.volume), 0, 127),
      pan: clampNumber(numberOrFallback(input.pan, fallback.pan), -100, 100),
      swing: clampNumber(numberOrFallback(input.swing, fallback.swing), 0, 127),
      offsetMs: clampNumber(numberOrFallback(input.offsetMs, fallback.offsetMs), -100, 100),
      muted: typeof input.muted === "boolean" ? input.muted : Boolean(fallback.muted),
      solo: typeof input.solo === "boolean" ? input.solo : Boolean(fallback.solo),
      collapsed:
        typeof input.collapsed === "boolean"
          ? input.collapsed
          : Boolean(fallback.collapsed),
      seqMode:
        input.seqMode === "roll" || input.seqMode === "single"
          ? input.seqMode
          : defaultSeqModeForSound(kind),
      gridCollapsed:
        typeof input.gridCollapsed === "boolean"
          ? input.gridCollapsed
          : Boolean(fallback.gridCollapsed),
      noteMode: normalizeNoteMode(input.noteMode, fallback.noteMode),
      osc1Wave: normalizeOscWave(input.osc1Wave, fallback.osc1Wave),
      osc1Level: clampNumber(numberOrFallback(input.osc1Level, fallback.osc1Level), 0, 127),
      osc1Octave: clampNumber(numberOrFallback(input.osc1Octave, fallback.osc1Octave), -2, 2),
      osc1Detune: clampNumber(numberOrFallback(input.osc1Detune, fallback.osc1Detune), -100, 100),
      osc2Wave: normalizeOscWave(input.osc2Wave, fallback.osc2Wave),
      osc2Level: clampNumber(numberOrFallback(input.osc2Level, fallback.osc2Level), 0, 127),
      osc2Octave: clampNumber(numberOrFallback(input.osc2Octave, fallback.osc2Octave), -2, 2),
      osc2Detune: clampNumber(numberOrFallback(input.osc2Detune, fallback.osc2Detune), -100, 100),
      oscBlend: clampNumber(numberOrFallback(input.oscBlend, fallback.oscBlend), -100, 100),
    };
  }

  const ENV_DEFAULTS_BY_SOUND = Object.freeze({
    kick: normalizeEnvDefaults(
      appDefaults.envDefaultsBySound?.kick ?? appDefaults.envDefaultsBySound?.default,
      DEFAULT_APP_DEFAULTS.envDefaultsBySound.kick,
    ),
    snare: normalizeEnvDefaults(
      appDefaults.envDefaultsBySound?.snare,
      DEFAULT_APP_DEFAULTS.envDefaultsBySound.snare,
    ),
    hat: normalizeEnvDefaults(
      appDefaults.envDefaultsBySound?.hat,
      DEFAULT_APP_DEFAULTS.envDefaultsBySound.hat,
    ),
    blip: normalizeEnvDefaults(
      appDefaults.envDefaultsBySound?.blip,
      DEFAULT_APP_DEFAULTS.envDefaultsBySound.blip,
    ),
    bass: normalizeEnvDefaults(
      appDefaults.envDefaultsBySound?.bass,
      DEFAULT_APP_DEFAULTS.envDefaultsBySound.bass,
    ),
    [DUAL_OSC_SOUND]: normalizeEnvDefaults(
      appDefaults.envDefaultsBySound?.[DUAL_OSC_SOUND] ??
        appDefaults.envDefaultsBySound?.stack,
      DEFAULT_APP_DEFAULTS.envDefaultsBySound[DUAL_OSC_SOUND],
    ),
  });

  const BASE_SOUND_DEFAULTS = Object.freeze({
    pitch: TRACK_DEFAULTS.pitch,
    tuneCents: TRACK_DEFAULTS.tuneCents,
    volume: TRACK_DEFAULTS.volume,
    pan: TRACK_DEFAULTS.pan,
    swing: TRACK_DEFAULTS.swing,
    offsetMs: TRACK_DEFAULTS.offsetMs,
    muted: TRACK_DEFAULTS.muted,
    solo: TRACK_DEFAULTS.solo,
    collapsed: TRACK_DEFAULTS.collapsed,
    seqMode: TRACK_DEFAULTS.seqMode,
    gridCollapsed: TRACK_DEFAULTS.gridCollapsed,
    noteMode: "one-shot",
    osc1Wave: "sawtooth",
    osc1Level: 127,
    osc1Octave: 0,
    osc1Detune: 0,
    osc2Wave: "sine",
    osc2Level: 84,
    osc2Octave: 0,
    osc2Detune: 7,
    oscBlend: 0,
  });

  const SOUND_DEFAULTS_BY_SOUND = Object.freeze({
    kick: normalizeSoundDefaults(
      appDefaults.envDefaultsBySound?.kick,
      BASE_SOUND_DEFAULTS,
      "kick",
    ),
    snare: normalizeSoundDefaults(
      appDefaults.envDefaultsBySound?.snare,
      BASE_SOUND_DEFAULTS,
      "snare",
    ),
    hat: normalizeSoundDefaults(
      appDefaults.envDefaultsBySound?.hat,
      BASE_SOUND_DEFAULTS,
      "hat",
    ),
    blip: normalizeSoundDefaults(
      appDefaults.envDefaultsBySound?.blip,
      BASE_SOUND_DEFAULTS,
      "blip",
    ),
    bass: normalizeSoundDefaults(
      appDefaults.envDefaultsBySound?.bass,
      BASE_SOUND_DEFAULTS,
      "bass",
    ),
    [DUAL_OSC_SOUND]: normalizeSoundDefaults(
      appDefaults.envDefaultsBySound?.[DUAL_OSC_SOUND] ??
        appDefaults.envDefaultsBySound?.stack,
      BASE_SOUND_DEFAULTS,
      DUAL_OSC_SOUND,
    ),
  });

  const NON_THEME_BUMP_OFFSET_FRACTION = clampNumber(
    numberOrFallback(appDefaults.accent?.nonThemeBumpOffsetFraction, 0.5),
    0,
    1,
  );
  const NON_THEME_BUMP_LIGHTEN = clampNumber(
    numberOrFallback(appDefaults.accent?.nonThemeBumpLighten, 0.1),
    0,
    1,
  );
  const NON_THEME_BUMP_DESATURATE = clampNumber(
    numberOrFallback(appDefaults.accent?.nonThemeBumpDesaturate, 0.08),
    0,
    1,
  );

  function getEnvDefaultsForSound(kind) {
    const safeKind = normalizeSoundKind(kind, "kick");
    const base = ENV_DEFAULTS_BY_SOUND.kick;
    switch (safeKind) {
      case "kick":
        return ENV_DEFAULTS_BY_SOUND.kick;
      case "snare":
        return ENV_DEFAULTS_BY_SOUND.snare;
      case "hat":
        return ENV_DEFAULTS_BY_SOUND.hat;
      case "blip":
        return ENV_DEFAULTS_BY_SOUND.blip;
      case "bass":
        return ENV_DEFAULTS_BY_SOUND.bass;
      case DUAL_OSC_SOUND:
        return ENV_DEFAULTS_BY_SOUND[DUAL_OSC_SOUND];
      default:
        return base;
    }
  }

  function getSoundDefaultsForSound(kind) {
    const safeKind = normalizeSoundKind(kind, "kick");
    switch (safeKind) {
      case "kick":
        return SOUND_DEFAULTS_BY_SOUND.kick;
      case "snare":
        return SOUND_DEFAULTS_BY_SOUND.snare;
      case "hat":
        return SOUND_DEFAULTS_BY_SOUND.hat;
      case "blip":
        return SOUND_DEFAULTS_BY_SOUND.blip;
      case "bass":
        return SOUND_DEFAULTS_BY_SOUND.bass;
      case DUAL_OSC_SOUND:
        return SOUND_DEFAULTS_BY_SOUND[DUAL_OSC_SOUND];
      default:
        return SOUND_DEFAULTS_BY_SOUND.kick;
    }
  }

  function normalizeOscWave(value, fallback = "sine") {
    const wave = String(value || "").trim().toLowerCase();
    if (OSC_WAVE_OPTIONS.includes(wave)) return wave;
    return fallback;
  }

  function getDualOscParams(state) {
    return {
      osc1Wave: normalizeOscWave(state.osc1Wave, "sawtooth"),
      osc1Level: clampNumber(numberOrFallback(state.osc1Level, 127), 0, 127),
      osc1Octave: clampNumber(numberOrFallback(state.osc1Octave, 0), -2, 2),
      osc1Detune: clampNumber(numberOrFallback(state.osc1Detune, 0), -100, 100),
      osc2Wave: normalizeOscWave(state.osc2Wave, "sine"),
      osc2Level: clampNumber(numberOrFallback(state.osc2Level, 84), 0, 127),
      osc2Octave: clampNumber(numberOrFallback(state.osc2Octave, 0), -2, 2),
      osc2Detune: clampNumber(numberOrFallback(state.osc2Detune, 7), -100, 100),
      oscBlend: clampNumber(numberOrFallback(state.oscBlend, 0), -100, 100),
    };
  }

  let tempo = numberOrFallback(appDefaults.globals.tempo, Number(tempoInput.value));
  let globalSwing = numberOrFallback(
    appDefaults.globals.globalSwing,
    Number(globalSwingInput.value),
  );
  let globalVolume = numberOrFallback(
    appDefaults.globals.globalVolume,
    Number(globalVolumeInput.value),
  );
  let stepsCount = numberOrFallback(
    appDefaults.globals.stepsCount,
    Number(stepsInput.value),
  );
  let beatSteps = numberOrFallback(
    appDefaults.globals.beatSteps,
    beatStepsInput ? beatStepsInput.value : 4,
  );

  let autoExpandEnabled = Boolean(appDefaults.ui.autoExpandEnabled);
  let autoExpandSpeed = numberOrFallback(appDefaults.ui.autoExpandSpeed, 100);
  let samplePadEnabled = Boolean(appDefaults.ui.samplePadEnabled);
  let samplePadEditEnabled = false;
  let samplePadSelectedStep = null;
  let samplePadConfigs = Object.create(null);
  let samplePadTransportMode = Boolean(appDefaults.ui.samplePadTransportMode);
  let samplePadRollLength = numberOrFallback(
    appDefaults.ui.samplePadRollLength,
    16,
  );
  let samplePadRollBeatSteps = numberOrFallback(
    appDefaults.ui.samplePadRollBeatSteps,
    4,
  );
  let samplePadRollPattern = [];
  let padRollLongPressTimer = null;
  let padRollLongPressTarget = null;
  let padRollWasLongPress = false;
  let samplePadLayoutRaf = null;
  let subtitlesEnabled = Boolean(appDefaults.ui.subtitlesEnabled);
  let subtitlesSpeed = numberOrFallback(appDefaults.ui.subtitlesSpeed, 100);
  let autosaveEnabled = Boolean(appDefaults.ui.autosaveEnabled);
  let autosaveIntervalMinutes = numberOrFallback(
    appDefaults.ui.autosaveIntervalMinutes,
    5,
  );

  const states = new Map();
  const tracks = new Map();
  const hitTimeouts = new WeakMap();
  const hitUnderlineTimeouts = new WeakMap();
  const hitGhostTimeouts = new WeakMap();
  const trackHitTimeouts = new WeakMap();

  let audio = null;
  let master = null;
  let noiseBuffer = null;

  let isPlaying = false;
  let currentStep = 0;
  let nextNoteTime = 0;
  let scheduleTimer = null;
  let uiStep = -1;
  let stepsRebuildTimer = null;

  let loopEnabled = false;
  let loopStart = 0;
  let loopEnd = Math.max(0, stepsCount - 1);

  let settingsOpen = false;
  let suppressSettingsToggleClickUntil = 0;
  let suppressThemeStarClickUntil = 0;
  let settingsLayoutRaf = null;
  let settingsScrollHintRaf = null;
  let settingsScrollHintObserver = null;
  let subtitleLayoutRaf = null;

  let autoscrollEnabled = Boolean(appDefaults.ui.autoscrollEnabled);
  let gradientAnimationEnabled =
    typeof appDefaults.ui.gradientAnimationEnabled === "boolean"
      ? appDefaults.ui.gradientAnimationEnabled
      : true;

  let themeEnabled = Boolean(appDefaults.ui.themeEnabled);
  let bumpEnabled = Boolean(appDefaults.ui.bumpEnabled);
  let starBounceEnabled = Boolean(appDefaults.ui.starBounceEnabled);
  let starBounceAlwaysEnabled = Boolean(appDefaults.ui.starBounceAlwaysEnabled);
  let starDawIntroPlayed = false;
  let starBounceIntroDelayUntil = 0;
  let starBounceIntroDelayTimerId = null;
  let bumpHeight = numberOrFallback(appDefaults.ui.bumpHeight, 0);
  let bumpIntensity = numberOrFallback(appDefaults.ui.bumpIntensity, 50);
  let bumpBounce = numberOrFallback(appDefaults.ui.bumpBounce, 50);

  const DEFAULT_THEME_A = String(appDefaults.ui.themeA || "#000000");
  const DEFAULT_THEME_B = String(appDefaults.ui.themeB || "#ffffff");
  let themeA = DEFAULT_THEME_A;
  let themeB = DEFAULT_THEME_B;

  let pausedStep = null;

  let uiStepStartedAt = null;
  let transportRaf = null;
  let hasManualSeek = false;
  let transportSubtitleKey = "";
  let transportSubtitleActiveIndex = -1;
  let transportSubtitleChunkCount = 0;
  let subtitleTimerId = null;
  let subtitleCycleActive = false;
  let subtitleCycleToken = 0;
  let subtitleEntriesSinceMusic = 0;
  let subtitleNextMusicAfter = appConfig.subtitles.musicIntervalMin + Math.floor(Math.random() * (appConfig.subtitles.musicIntervalMax - appConfig.subtitles.musicIntervalMin + 1));
  let subtitleLastTake = null;
  let subtitleLastTier = "short";
  let subtitleCursorIndex = 0;
  let subtitleCursorStride = 1;
  let subtitleCursorChunkCount = 0;
  let subtitleLastText = "";
  let autosaveTimerId = null;
  let autosaveStatusTimer = null;
  const samplePadHoldStates = new Map();
  let themeColorThrottleTimerId = null;
  let queuedThemeColorA = null;
  let queuedThemeColorB = null;

  const INITIAL_GLOBALS = Object.freeze({
    tempo,
    globalSwing,
    globalVolume,
    stepsCount,
    beatSteps,
  });

  const INITIAL_UI = Object.freeze({
    autoExpandEnabled,
    autoExpandSpeed,
    samplePadEnabled,
    samplePadTransportMode,
    samplePadRollLength,
    samplePadRollBeatSteps,
    subtitlesEnabled,
    subtitlesSpeed,
    autosaveEnabled,
    autosaveIntervalMinutes,
    autoscrollEnabled,
    gradientAnimationEnabled,
    themeEnabled,
    bumpEnabled,
    bumpHeight,
    bumpIntensity,
    bumpBounce,
    starBounceEnabled,
    starBounceAlwaysEnabled,
    themeA,
    themeB,
  });

  let isSyncingGridScroll = false;

  let samplerSwipePointerId = null;
  let samplerSwipeStartX = 0;
  let samplerSwipeStartY = 0;
  let samplerSwipeStartAt = 0;
  let samplerSwipeStartedFromRightEdge = false;

  let reorderState = null;
  let suppressNextTrackTopBarToggle = false;

  function rebuildTrackOrderFromDom() {
    if (!tracksContainer) return;
    const reordered = new Map();
    const children = Array.from(tracksContainer.children);
    for (const el of children) {
      if (!(el instanceof Element)) continue;
      const key = String(el.dataset.key || "").trim();
      if (!key) continue;
      const track = tracks.get(key);
      if (track) reordered.set(key, track);
    }
    for (const [key, track] of tracks.entries()) {
      if (!reordered.has(key)) reordered.set(key, track);
    }
    tracks.clear();
    for (const [key, track] of reordered.entries()) tracks.set(key, track);
  }

  function endReorder({ didDrag = false } = {}) {
    if (!reorderState) return;
    if (reorderState.holdTimer) {
      window.clearTimeout(reorderState.holdTimer);
    }
    if (reorderState.trackEl) {
      reorderState.trackEl.classList.remove("is-dragging");
    }
    reorderState = null;

    if (didDrag) {
      rebuildTrackOrderFromDom();
      suppressNextTrackTopBarToggle = true;
      window.setTimeout(() => {
        suppressNextTrackTopBarToggle = false;
      }, 0);
    }
  }

  if (tracksContainer) {
    tracksContainer.addEventListener("pointerdown", (event) => {
      if (event.button != null && event.button !== 0) return;
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;
      const handleEl = target.closest(".trackReorderHandle");
      if (!handleEl) return;
      const trackEl = handleEl.closest(".track");
      if (!trackEl) return;

      const pointerType = String(event.pointerType || "mouse");
      const pointerId = event.pointerId;

      reorderState = {
        pointerId,
        pointerType,
        trackEl,
        startX: event.clientX,
        startY: event.clientY,
        started: false,
        canStart: true,
        holdTimer: null,
      };
    });

    tracksContainer.addEventListener("pointermove", (event) => {
      if (!reorderState) return;
      if (event.pointerId !== reorderState.pointerId) return;

      const dx = event.clientX - reorderState.startX;
      const dy = event.clientY - reorderState.startY;
      const dist = Math.hypot(dx, dy);

      if (!reorderState.started) {
        if (!reorderState.canStart) {
          // user is likely scrolling; cancel if they move enough
          if (Math.abs(dy) > 14 || Math.abs(dx) > 14) {
            endReorder({ didDrag: false });
          }
          return;
        }

        if (dist < 6) return;

        reorderState.started = true;
        reorderState.trackEl.classList.add("is-dragging");
        try {
          reorderState.trackEl.setPointerCapture(reorderState.pointerId);
        } catch {
          // ignore
        }
      }

      event.preventDefault();

      const under = document.elementFromPoint(event.clientX, event.clientY);
      const overTrack =
        under instanceof Element ? under.closest(".track") : null;

      if (!overTrack || !tracksContainer.contains(overTrack)) {
        if (tracksContainer.lastElementChild !== reorderState.trackEl) {
          tracksContainer.appendChild(reorderState.trackEl);
        }
        return;
      }

      if (overTrack === reorderState.trackEl) return;

      const rect = overTrack.getBoundingClientRect();
      const before = event.clientY < rect.top + rect.height / 2;
      const referenceNode = before ? overTrack : overTrack.nextElementSibling;
      if (referenceNode === reorderState.trackEl) return;
      tracksContainer.insertBefore(reorderState.trackEl, referenceNode);
    });

    tracksContainer.addEventListener("pointerup", (event) => {
      if (!reorderState) return;
      if (event.pointerId !== reorderState.pointerId) return;
      endReorder({ didDrag: reorderState.started });
    });

    tracksContainer.addEventListener("pointercancel", (event) => {
      if (!reorderState) return;
      if (event.pointerId !== reorderState.pointerId) return;
      endReorder({ didDrag: reorderState.started });
    });
  }

  const PRESET_INDEX_KEY = "aelonyori.preset.index";
  const PRESET_DEFAULT_KEY = "aelonyori.preset.default";
  const PRESET_STORAGE_PREFIX = "aelonyori.preset.";

  function clampNumber(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function numberOrFallback(value, fallback) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function normalizePattern(pattern) {
    if (!Array.isArray(pattern)) return new Array(stepsCount).fill(0);

    const sliced =
      pattern.length > MAX_STEPS
        ? pattern.slice(0, MAX_STEPS)
        : pattern.slice();
    const normalized = sliced.map((v) => {
      if (typeof v === "boolean") return v ? 1 : 0;
      const n = Number(v);
      if (!Number.isFinite(n)) return 0;
      return clampNumber(Math.round(n), 0, NOTE_MASK_ALL);
    });

    if (normalized.length >= stepsCount) return normalized;
    return normalized.concat(new Array(stepsCount - normalized.length).fill(0));
  }

  function normalizeNoteTies(noteTies, pattern) {
    const safePattern = normalizePattern(pattern);
    const base = Array.isArray(noteTies)
      ? noteTies.length > MAX_STEPS
        ? noteTies.slice(0, MAX_STEPS)
        : noteTies.slice()
      : new Array(stepsCount).fill(0);

    const normalized = base.map((v) => {
      const n = Number(v);
      if (!Number.isFinite(n)) return 0;
      return clampNumber(Math.round(n), 0, NOTE_MASK_ALL);
    });
    while (normalized.length < stepsCount) normalized.push(0);

    for (let i = 0; i < normalized.length; i += 1) {
      const currentMask = clampNumber(
        Math.round(numberOrFallback(safePattern[i], 0)),
        0,
        NOTE_MASK_ALL,
      );
      const prevMask =
        i > 0
          ? clampNumber(
              Math.round(numberOrFallback(safePattern[i - 1], 0)),
              0,
              NOTE_MASK_ALL,
            )
          : 0;
      normalized[i] &= currentMask;
      normalized[i] &= prevMask;
      if (i === 0) normalized[i] = 0;
    }

    return normalized;
  }

  function readIntFromSelect(selectEl, fallback) {
    if (!selectEl) return fallback;
    const raw = String(selectEl.value ?? "").trim();
    if (!raw) return fallback;
    const n = Number(raw);
    return Number.isFinite(n) ? n : fallback;
  }

  function populateRangeSelects({ oldSteps = stepsCount } = {}) {
    if (!rangeFromInput || !rangeToInput) return;

    const prevFrom = readIntFromSelect(rangeFromInput, 1);
    const prevTo = readIntFromSelect(rangeToInput, oldSteps);
    const prevFollowMax = rangeToInput.dataset.followMax === "true";
    const shouldFollowMax = prevFollowMax || prevTo === oldSteps;

    rangeFromInput.innerHTML = "";
    rangeToInput.innerHTML = "";
    for (let i = 1; i <= stepsCount; i += 1) {
      const optA = document.createElement("option");
      optA.value = String(i);
      optA.textContent = String(i);
      rangeFromInput.appendChild(optA);

      const optB = document.createElement("option");
      optB.value = String(i);
      optB.textContent = String(i);
      rangeToInput.appendChild(optB);
    }

    let nextFrom = clampNumber(Math.round(prevFrom), 1, stepsCount);
    let nextTo = shouldFollowMax
      ? stepsCount
      : clampNumber(Math.round(prevTo), 1, stepsCount);
    if (nextFrom > nextTo) [nextFrom, nextTo] = [nextTo, nextFrom];

    rangeFromInput.value = String(nextFrom);
    rangeToInput.value = String(nextTo);
    rangeToInput.dataset.followMax = String(
      shouldFollowMax && nextTo === stepsCount,
    );
  }

  function readGlobalRange() {
    if (!rangeFromInput || !rangeToInput) return null;

    let from = readIntFromSelect(rangeFromInput, 1);
    let to = readIntFromSelect(rangeToInput, stepsCount);

    from = clampNumber(Math.round(from), 1, stepsCount);
    to = clampNumber(Math.round(to), 1, stepsCount);
    if (from > to) [from, to] = [to, from];

    return { from, to, start: from - 1, end: to - 1 };
  }

  function normalizeRangeInputs() {
    const range = readGlobalRange();
    if (!range) return;
    rangeFromInput.value = String(range.from);
    rangeToInput.value = String(range.to);

    const followMax = range.to === stepsCount;
    rangeToInput.dataset.followMax = String(followMax);
  }

  function updateRangeButtons() {
    const enabled = Boolean(readGlobalRange());
    if (rangeCopyBtn) rangeCopyBtn.disabled = !enabled;
    if (rangeDuplicateBtn) rangeDuplicateBtn.disabled = !enabled;
    if (rangeDeleteBtn) rangeDeleteBtn.disabled = !enabled;
    if (rangeLoopBtn) rangeLoopBtn.disabled = !enabled;
  }

  function updateLoopButton() {
    if (!rangeLoopBtn) return;
    rangeLoopBtn.setAttribute("aria-pressed", loopEnabled ? "true" : "false");
    rangeLoopBtn.title = loopEnabled
      ? `looping ${loopStart + 1}..${loopEnd + 1}`
      : "loop range";
  }

  function clampLoopRange() {
    if (stepsCount <= 0) {
      loopStart = 0;
      loopEnd = 0;
      return;
    }
    loopStart = clampNumber(
      Math.round(numberOrFallback(loopStart, 0)),
      0,
      stepsCount - 1,
    );
    loopEnd = clampNumber(
      Math.round(numberOrFallback(loopEnd, stepsCount - 1)),
      0,
      stepsCount - 1,
    );
    if (loopStart > loopEnd) [loopStart, loopEnd] = [loopEnd, loopStart];
  }

  function refreshLoopFromRange() {
    if (!loopEnabled) return;
    const range = readGlobalRange();
    if (!range) return;
    loopStart = range.start;
    loopEnd = range.end;
    clampLoopRange();
    updateLoopButton();
    updateTransportBar();
  }

  function setLoopEnabled(nextEnabled) {
    const enabled = Boolean(nextEnabled);
    if (enabled) {
      const range = readGlobalRange();
      if (!range) return;
      loopEnabled = true;
      loopStart = range.start;
      loopEnd = range.end;
      clampLoopRange();
      if (isPlaying) currentStep = loopStart;
    } else {
      loopEnabled = false;
    }
    updateLoopButton();
    updateTransportBar();
  }

  function safeJsonParse(text) {
    try {
      return { ok: true, value: JSON.parse(text) };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  function fileSafeStem(value, fallback = "song") {
    const stem = String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-_ ]+/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
    return stem || fallback;
  }

  function presetStorageKey(name) {
    return `${PRESET_STORAGE_PREFIX}${name}`;
  }

  function readPresetIndex() {
    try {
      const raw = window.localStorage.getItem(PRESET_INDEX_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.map((n) => String(n)).filter((n) => n.trim().length > 0);
    } catch {
      return [];
    }
  }

  function writePresetIndex(names) {
    try {
      window.localStorage.setItem(PRESET_INDEX_KEY, JSON.stringify(names));
    } catch {
      // ignore
    }
  }

  function getDefaultPresetName() {
    try {
      const name = window.localStorage.getItem(PRESET_DEFAULT_KEY);
      return name ? String(name) : "";
    } catch {
      return "";
    }
  }

  function setDefaultPresetName(name) {
    try {
      window.localStorage.setItem(PRESET_DEFAULT_KEY, String(name));
    } catch {
      // ignore
    }
  }

  function getPreset(name) {
    try {
      const raw = window.localStorage.getItem(presetStorageKey(name));
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  }

  function savePreset(name, song) {
    const cleanName = String(name || "").trim();
    if (!cleanName) return false;

    try {
      clearLastPresetSaveError();
      window.localStorage.setItem(
        presetStorageKey(cleanName),
        JSON.stringify(song),
      );
    } catch (error) {
      setLastPresetSaveError(error);
      return false;
    }

    const names = readPresetIndex();
    if (!names.includes(cleanName)) {
      names.push(cleanName);
      names.sort((a, b) => a.localeCompare(b));
      writePresetIndex(names);
    }

    if (!getDefaultPresetName()) setDefaultPresetName(cleanName);
    return true;
  }

  function makeUniquePresetName(base) {
    const baseName = String(base || "").trim() || "song";
    const existing = new Set(readPresetIndex());
    if (!existing.has(baseName)) return baseName;

    let i = 2;
    while (existing.has(`${baseName} ${i}`)) i += 1;
    return `${baseName} ${i}`;
  }

  function showSongIo() {
    if (!songIo) return;
    songIo.open = true;
    updateSongJsonHighlight();
  }

  function hideSongIo() {
    if (!songIo) return;
    songIo.open = false;
  }

  function escapeHtml(text) {
    return String(text)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function highlightJson(text) {
    const escaped = escapeHtml(text);
    const token =
      /("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?)/g;
    return escaped.replace(token, (match) => {
      let cls = "json-number";
      if (match.startsWith('"')) {
        cls = match.endsWith(":") ? "json-key" : "json-string";
      } else if (match === "true" || match === "false") {
        cls = "json-boolean";
      } else if (match === "null") {
        cls = "json-null";
      }
      return `<span class="${cls}">${match}</span>`;
    });
  }

  function syncSongJsonScroll() {
    if (!songJson || !songJsonHighlight) return;
    songJsonHighlight.scrollTop = songJson.scrollTop;
    songJsonHighlight.scrollLeft = songJson.scrollLeft;
  }

  function updateSongJsonHighlight() {
    if (!songJson || !songJsonHighlight) return;
    songJsonHighlight.innerHTML = highlightJson(songJson.value);
    syncSongJsonScroll();
  }

  let presetStatusTimer = null;
  let presetStatusBusySince = null;
  let lastPresetSaveErrorMessage = "";

  function isQuotaExceededError(error) {
    if (!error) return false;
    const code = Number(error.code);
    const name = String(error.name || "");
    return (
      name === "QuotaExceededError" ||
      name === "NS_ERROR_DOM_QUOTA_REACHED" ||
      code === 22 ||
      code === 1014
    );
  }

  function setLastPresetSaveError(error) {
    if (isQuotaExceededError(error)) {
      lastPresetSaveErrorMessage = "save failed: storage full";
      return;
    }
    lastPresetSaveErrorMessage = "save failed";
  }

  function clearLastPresetSaveError() {
    lastPresetSaveErrorMessage = "";
  }

  function setPresetStatus(message, { busy = false, ok = true } = {}) {
    if (!presetStatus) return;

    if (presetStatusTimer) {
      clearTimeout(presetStatusTimer);
      presetStatusTimer = null;
    }

    const now =
      typeof performance !== "undefined" && performance.now
        ? performance.now()
        : Date.now();

    const label = String(message || "").trim();
    presetStatus.textContent = label;
    presetStatus.title = !ok && message ? String(message || "") : "";
    presetStatus.classList.toggle("is-ok", Boolean(ok) && !busy);
    presetStatus.classList.toggle("is-error", !ok && !busy);

    if (busy) {
      presetStatusBusySince = now;
      presetStatus.classList.add("is-busy");
      return;
    }

    if (presetStatusBusySince == null) {
      presetStatusBusySince = now;
      presetStatus.classList.add("is-busy");
    }

    const minBusyMs = 520;
    const elapsed = now - presetStatusBusySince;
    const remaining = Math.max(0, minBusyMs - elapsed);
    const holdMs = ok ? 1700 : 3200;

    presetStatusTimer = setTimeout(() => {
      presetStatus.classList.remove("is-busy", "is-ok", "is-error");
      presetStatus.textContent = "";
      presetStatus.title = "";
      presetStatusBusySince = null;
      presetStatusTimer = null;
    }, remaining + holdMs);
  }

  function normalizeAutosaveInterval(value) {
    const allowed = [1, 5, 10, 15, 30, 60];
    const next = Math.round(numberOrFallback(value, autosaveIntervalMinutes));
    if (allowed.includes(next)) return next;
    let best = allowed[0];
    let bestDist = Math.abs(next - best);
    for (let i = 1; i < allowed.length; i += 1) {
      const dist = Math.abs(next - allowed[i]);
      if (dist < bestDist) {
        best = allowed[i];
        bestDist = dist;
      }
    }
    return best;
  }

  function clearAutosaveTimer() {
    if (autosaveTimerId == null) return;
    window.clearInterval(autosaveTimerId);
    autosaveTimerId = null;
  }

  function showAutosaveStatus(message, { ok = true } = {}) {
    if (!autosaveStatus) return;
    if (autosaveStatusTimer) {
      window.clearTimeout(autosaveStatusTimer);
      autosaveStatusTimer = null;
    }

    autosaveStatus.hidden = false;
    autosaveStatus.textContent = String(message || "saving");
    autosaveStatus.classList.add("is-busy");
    autosaveStatus.classList.toggle("is-ok", Boolean(ok));
    autosaveStatus.classList.toggle("is-error", !ok);

    autosaveStatusTimer = window.setTimeout(() => {
      autosaveStatus.classList.remove("is-busy", "is-ok", "is-error");
      autosaveStatus.hidden = true;
      autosaveStatusTimer = null;
    }, 3000);
  }

  function broadcastAutosaveConfig() {
    document.dispatchEvent(
      new CustomEvent("aelonyori:autosave-config", {
        detail: {
          enabled: Boolean(autosaveEnabled),
          intervalMinutes: Number(autosaveIntervalMinutes),
        },
      }),
    );
  }

  function saveCurrentSongPreset({
    statusLabel = "saved",
    showPresetStatus = true,
  } = {}) {
    if (showPresetStatus) {
      setPresetStatus("", { busy: true });
    }

    const song = getSongObject();
    const requestedName = String(presetNameInput.value || "").trim();
    const selectedName = String(presetSelect.value || "").trim();
    const name = requestedName || selectedName || makeUniquePresetName("song");

    const ok = savePreset(name, song);
    if (!ok) {
      if (showPresetStatus) {
        const message = lastPresetSaveErrorMessage || "save failed";
        setPresetStatus(message, { ok: false });
      }
      return false;
    }

    presetNameInput.value = name;
    refreshPresetSelect();
    presetSelect.value = name;
    if (showPresetStatus) setPresetStatus(statusLabel);
    return true;
  }

  function runAutosave() {
    if (!autosaveEnabled) return;
    showAutosaveStatus("saving");
    const ok = saveCurrentSongPreset({ showPresetStatus: false });
    if (!ok) showAutosaveStatus("autosave failed", { ok: false });
  }

  function syncAutosaveTimer() {
    clearAutosaveTimer();
    if (!autosaveEnabled) return;
    const minutes = normalizeAutosaveInterval(autosaveIntervalMinutes);
    autosaveTimerId = window.setInterval(runAutosave, minutes * 60 * 1000);
  }

  function setAutosaveInterval(nextIntervalMinutes) {
    autosaveIntervalMinutes = normalizeAutosaveInterval(nextIntervalMinutes);
    if (autosaveIntervalSelect) {
      autosaveIntervalSelect.value = String(autosaveIntervalMinutes);
    }
    syncAutosaveTimer();
    broadcastAutosaveConfig();
  }

  function setAutosaveEnabled(nextEnabled) {
    autosaveEnabled = Boolean(nextEnabled);
    if (autosaveToggleBtn) {
      autosaveToggleBtn.setAttribute(
        "aria-pressed",
        autosaveEnabled ? "true" : "false",
      );
      autosaveToggleBtn.title = autosaveEnabled
        ? "autosave: on"
        : "autosave: off";
    }
    if (autosaveIntervalSelect) {
      autosaveIntervalSelect.disabled = !autosaveEnabled;
    }
    syncAutosaveTimer();
    broadcastAutosaveConfig();
  }

  function clearAllTracks() {
    for (const track of tracks.values()) {
      track.el.remove();
    }
    tracks.clear();

    for (const button of letters) {
      button.classList.remove("is-selected", "is-muted", "is-suppressed");
      button.setAttribute("aria-pressed", "false");
    }

    updateDawVisibility();
    updateSoloSuppression();
  }

  function getSongObject() {
    const activeKeys = Array.from(tracksContainer.children)
      .map((el) => (el && el.dataset ? el.dataset.key : ""))
      .filter((k) => typeof k === "string" && k.length > 0);

    const trackStates = activeKeys.map((key) => {
      const state = getOrInitState(key);
      const safeSound = normalizeSoundKind(state.sound, "kick");
      const envDefaults = getEnvDefaultsForSound(safeSound);
      const soundDefaults = getSoundDefaultsForSound(safeSound);
      return {
        key: String(key),
        sound: String(safeSound),
        pattern: normalizePattern(state.pattern),
        noteTies: normalizeNoteTies(state.noteTies, state.pattern),
        pitch: numberOrFallback(state.pitch, soundDefaults.pitch),
        tuneCents: numberOrFallback(state.tuneCents, soundDefaults.tuneCents),
        osc1Wave: normalizeOscWave(state.osc1Wave, soundDefaults.osc1Wave),
        osc1Level: numberOrFallback(state.osc1Level, soundDefaults.osc1Level),
        osc1Octave: numberOrFallback(state.osc1Octave, soundDefaults.osc1Octave),
        osc1Detune: numberOrFallback(state.osc1Detune, soundDefaults.osc1Detune),
        osc2Wave: normalizeOscWave(state.osc2Wave, soundDefaults.osc2Wave),
        osc2Level: numberOrFallback(state.osc2Level, soundDefaults.osc2Level),
        osc2Octave: numberOrFallback(state.osc2Octave, soundDefaults.osc2Octave),
        osc2Detune: numberOrFallback(state.osc2Detune, soundDefaults.osc2Detune),
        oscBlend: numberOrFallback(state.oscBlend, soundDefaults.oscBlend),
        noteMode: normalizeNoteMode(state.noteMode, soundDefaults.noteMode),
        hold: numberOrFallback(state.hold, envDefaults.hold),
        volume: numberOrFallback(state.volume, soundDefaults.volume),
        pan: numberOrFallback(state.pan, soundDefaults.pan),
        swing: numberOrFallback(state.swing, soundDefaults.swing),
        offsetMs: numberOrFallback(state.offsetMs, soundDefaults.offsetMs),
        attack: numberOrFallback(state.attack, envDefaults.attack),
        decay: numberOrFallback(state.decay, envDefaults.decay),
        sustain: numberOrFallback(state.sustain, envDefaults.sustain),
        release: numberOrFallback(state.release, envDefaults.release),
        muted: Boolean(state.muted),
        solo: Boolean(state.solo),
        collapsed: Boolean(state.collapsed),
        seqMode: state.seqMode === "roll" ? "roll" : "single",
        gridCollapsed: Boolean(state.gridCollapsed),
        dualTab: state.dualTab === "osc1" || state.dualTab === "osc2" ? state.dualTab : "main",
      };
    });

    const name = String(presetNameInput?.value || "").trim();

    const range = readGlobalRange();
    const ui = {
      autoExpandEnabled: Boolean(autoExpandEnabled),
      autoExpandSpeed: clampNumber(
        Math.round(numberOrFallback(autoExpandSpeed, 100)),
        0,
        200,
      ),
      samplePadEnabled: Boolean(samplePadEnabled),
      samplePadTransportMode: Boolean(samplePadTransportMode),
      samplePadConfigs,
      samplePadRollLength: clampNumber(
        Math.round(numberOrFallback(samplePadRollLength, 16)),
        1,
        MAX_STEPS,
      ),
      samplePadRollBeatSteps: clampNumber(
        Math.round(numberOrFallback(samplePadRollBeatSteps, 4)),
        1,
        MAX_STEPS,
      ),
      samplePadRollPattern,
      subtitlesEnabled: Boolean(subtitlesEnabled),
      subtitlesSpeed: clampNumber(
        Math.round(numberOrFallback(subtitlesSpeed, 100)),
        20,
        200,
      ),
      autosaveEnabled: Boolean(autosaveEnabled),
      autosaveIntervalMinutes: clampNumber(
        Math.round(numberOrFallback(autosaveIntervalMinutes, 5)),
        1,
        60,
      ),
      autoscrollEnabled: Boolean(autoscrollEnabled),
      gradientAnimationEnabled: Boolean(gradientAnimationEnabled),
      starBounceEnabled: Boolean(starBounceEnabled),
      starBounceAlwaysEnabled: Boolean(starBounceAlwaysEnabled),
      themeEnabled: Boolean(themeEnabled),
      bumpEnabled: Boolean(bumpEnabled),
      bumpHeight: clampNumber(
        Math.round(numberOrFallback(bumpHeight, 0)),
        0,
        100,
      ),
      bumpIntensity: clampNumber(
        Math.round(numberOrFallback(bumpIntensity, 50)),
        0,
        100,
      ),
      bumpBounce: clampNumber(
        Math.round(numberOrFallback(bumpBounce, 50)),
        0,
        100,
      ),
      themeA,
      themeB,
      rangeFrom: range ? range.from : undefined,
      rangeTo: range ? range.to : undefined,
      loopEnabled: Boolean(loopEnabled),
    };

    return {
      version: 1,
      name: name || undefined,
      globals: {
        tempo,
        globalSwing,
        globalVolume,
        steps: stepsCount,
        beatSteps,
      },
      tracks: trackStates,
      activeKeys,
      ui,
    };
  }

  function applySongObject(song) {
    if (!song || typeof song !== "object") return false;
    const globals =
      song.globals && typeof song.globals === "object" ? song.globals : {};
    const ui = song.ui && typeof song.ui === "object" ? song.ui : {};
    const nextTempo = clampNumber(
      numberOrFallback(globals.tempo, tempo),
      20,
      360,
    );
    const nextGlobalSwing = clampNumber(
      numberOrFallback(globals.globalSwing, globalSwing),
      0,
      127,
    );
    const nextGlobalVolume = clampNumber(
      numberOrFallback(globals.globalVolume, globalVolume),
      0,
      127,
    );
    const nextSteps = clampNumber(
      numberOrFallback(globals.steps, stepsCount),
      4,
      MAX_STEPS,
    );
    const nextBeatSteps = clampNumber(
      numberOrFallback(globals.beatSteps, beatSteps),
      1,
      nextSteps,
    );

    stop();
    clearAllTracks();
    states.clear();

    applyStepsCount(nextSteps);
    applyBeatSteps(nextBeatSteps);

    const uiFrom = clampNumber(
      Math.round(numberOrFallback(ui.rangeFrom, 1)),
      1,
      stepsCount,
    );
    const uiTo = clampNumber(
      Math.round(numberOrFallback(ui.rangeTo, stepsCount)),
      1,
      stepsCount,
    );
    if (rangeFromInput && rangeToInput) {
      rangeFromInput.value = String(Math.min(uiFrom, uiTo));
      rangeToInput.value = String(Math.max(uiFrom, uiTo));
      normalizeRangeInputs();
      updateRangeButtons();
    }

    const nextAutoExpandEnabled =
      typeof ui.autoExpandEnabled === "boolean"
        ? ui.autoExpandEnabled
        : INITIAL_UI.autoExpandEnabled;
    setAutoExpandEnabled(nextAutoExpandEnabled);

    const nextAutoExpandSpeed = clampNumber(
      Math.round(numberOrFallback(ui.autoExpandSpeed, 100)),
      0,
      200,
    );
    setAutoExpandSpeed(nextAutoExpandSpeed);

    samplePadConfigs = normalizeSamplePadConfigs(ui.samplePadConfigs);

    samplePadRollLength = clampNumber(
      Math.round(numberOrFallback(ui.samplePadRollLength, samplePadRollLength)),
      1,
      MAX_STEPS,
    );
    samplePadRollBeatSteps = clampNumber(
      Math.round(
        numberOrFallback(ui.samplePadRollBeatSteps, samplePadRollBeatSteps),
      ),
      1,
      samplePadRollLength,
    );
    samplePadRollPattern = normalizeSamplePadRollPattern(
      ui.samplePadRollPattern,
    );
    setSamplePadRollLength(samplePadRollLength);
    setSamplePadRollBeatSteps(samplePadRollBeatSteps);

    const nextSamplePadEnabled =
      typeof ui.samplePadEnabled === "boolean"
        ? ui.samplePadEnabled
        : INITIAL_UI.samplePadEnabled;
    setSamplePadEnabled(nextSamplePadEnabled);

    const nextSamplePadTransportMode = Boolean(
      nextSamplePadEnabled && ui.samplePadTransportMode,
    );
    setSamplePadTransportMode(nextSamplePadTransportMode);

    const nextSubtitlesEnabled =
      typeof ui.subtitlesEnabled === "boolean"
        ? ui.subtitlesEnabled
        : INITIAL_UI.subtitlesEnabled;
    const nextSubtitlesSpeed = clampNumber(
      Math.round(
        numberOrFallback(
          ui.subtitlesSpeed,
          subtitlesSpeed,
        ),
      ),
      20,
      200,
    );
    const nextAutosaveEnabled =
      typeof ui.autosaveEnabled === "boolean"
        ? ui.autosaveEnabled
        : INITIAL_UI.autosaveEnabled;
    const nextAutosaveInterval = clampNumber(
      Math.round(
        numberOrFallback(ui.autosaveIntervalMinutes, autosaveIntervalMinutes),
      ),
      1,
      60,
    );
    setSubtitlesSpeed(nextSubtitlesSpeed);
    setSubtitlesEnabled(nextSubtitlesEnabled);
    setAutosaveInterval(nextAutosaveInterval);
    setAutosaveEnabled(nextAutosaveEnabled);

    const nextAutoscrollEnabled =
      typeof ui.autoscrollEnabled === "boolean" ? ui.autoscrollEnabled : true;
    setAutoscrollEnabled(nextAutoscrollEnabled);

    const nextGradientAnimationEnabled =
      typeof ui.gradientAnimationEnabled === "boolean"
        ? ui.gradientAnimationEnabled
        : INITIAL_UI.gradientAnimationEnabled;
    setGradientAnimationEnabled(nextGradientAnimationEnabled);

    const nextStarBounceEnabled =
      typeof ui.starBounceEnabled === "boolean"
        ? ui.starBounceEnabled
        : INITIAL_UI.starBounceEnabled;
    setStarBounceEnabled(nextStarBounceEnabled);

    const nextStarBounceAlwaysEnabled =
      typeof ui.starBounceAlwaysEnabled === "boolean"
        ? ui.starBounceAlwaysEnabled
        : INITIAL_UI.starBounceAlwaysEnabled;
    setStarBounceAlwaysEnabled(nextStarBounceAlwaysEnabled);

    const nextThemeA =
      typeof ui.themeA === "string" ? ui.themeA : DEFAULT_THEME_A;
    const nextThemeB =
      typeof ui.themeB === "string" ? ui.themeB : DEFAULT_THEME_B;
    setThemeColors(nextThemeA, nextThemeB);

    const nextThemeEnabled =
      typeof ui.themeEnabled === "boolean"
        ? ui.themeEnabled
        : typeof ui.darkMode === "boolean"
          ? ui.darkMode
          : INITIAL_UI.themeEnabled;
    setThemeEnabled(nextThemeEnabled);

    const nextBumpEnabled =
      typeof ui.bumpEnabled === "boolean"
        ? ui.bumpEnabled
        : INITIAL_UI.bumpEnabled;
    const nextBumpHeight = clampNumber(
      Math.round(numberOrFallback(ui.bumpHeight, bumpHeight)),
      0,
      100,
    );
    const nextBumpIntensity = clampNumber(
      Math.round(numberOrFallback(ui.bumpIntensity, bumpIntensity)),
      0,
      100,
    );
    const nextBumpBounce = clampNumber(
      Math.round(numberOrFallback(ui.bumpBounce, bumpBounce)),
      0,
      100,
    );
    setBumpHeight(nextBumpHeight);
    setBumpBounce(nextBumpBounce);
    setBumpIntensity(nextBumpIntensity);
    setBumpEnabled(nextBumpEnabled);

    tempo = nextTempo;
    tempoInput.value = String(nextTempo);
    tempoOut.value = String(nextTempo);

    globalSwing = nextGlobalSwing;
    globalSwingInput.value = String(nextGlobalSwing);
    globalSwingOut.value = String(nextGlobalSwing);

    globalVolume = nextGlobalVolume;
    globalVolumeInput.value = String(nextGlobalVolume);
    globalVolumeOut.value = String(nextGlobalVolume);
    if (master && audio) {
      master.gain.setTargetAtTime(
        clampNumber(globalVolume / 127, 0, 1),
        audio.currentTime,
        0.01,
      );
    }

    const trackList = Array.isArray(song.tracks) ? song.tracks : [];
    for (const entry of trackList) {
      if (!entry || typeof entry !== "object") continue;
      const key = String(entry.key ?? "").trim();
      if (!key) continue;

      const sound = normalizeSoundKind(entry.sound, "kick");
      const envDefaults = getEnvDefaultsForSound(sound);
      const soundDefaults = getSoundDefaultsForSound(sound);
      const entryCollapsed =
        typeof entry.collapsed === "boolean"
          ? entry.collapsed
          : soundDefaults.collapsed;

      states.set(key, {
        sound,
        pattern: Array.isArray(entry.pattern)
          ? entry.pattern.slice()
          : new Array(stepsCount).fill(0),
        noteTies: Array.isArray(entry.noteTies)
          ? entry.noteTies.slice()
          : new Array(stepsCount).fill(0),
        pitch: numberOrFallback(entry.pitch, soundDefaults.pitch),
        tuneCents: numberOrFallback(entry.tuneCents, soundDefaults.tuneCents),
        osc1Wave: normalizeOscWave(entry.osc1Wave, soundDefaults.osc1Wave),
        osc1Level: numberOrFallback(entry.osc1Level, soundDefaults.osc1Level),
        osc1Octave: numberOrFallback(entry.osc1Octave, soundDefaults.osc1Octave),
        osc1Detune: numberOrFallback(entry.osc1Detune, soundDefaults.osc1Detune),
        osc2Wave: normalizeOscWave(entry.osc2Wave, soundDefaults.osc2Wave),
        osc2Level: numberOrFallback(entry.osc2Level, soundDefaults.osc2Level),
        osc2Octave: numberOrFallback(entry.osc2Octave, soundDefaults.osc2Octave),
        osc2Detune: numberOrFallback(entry.osc2Detune, soundDefaults.osc2Detune),
        oscBlend: numberOrFallback(entry.oscBlend, soundDefaults.oscBlend),
        noteMode: normalizeNoteMode(entry.noteMode, soundDefaults.noteMode),
        hold: numberOrFallback(entry.hold, envDefaults.hold),
        volume: numberOrFallback(entry.volume, soundDefaults.volume),
        pan: numberOrFallback(entry.pan, soundDefaults.pan),
        swing: numberOrFallback(entry.swing, soundDefaults.swing),
        offsetMs: numberOrFallback(entry.offsetMs, soundDefaults.offsetMs),
        attack: numberOrFallback(entry.attack, envDefaults.attack),
        decay: numberOrFallback(entry.decay, envDefaults.decay),
        sustain: numberOrFallback(entry.sustain, envDefaults.sustain),
        release: numberOrFallback(entry.release, envDefaults.release),
        muted:
          typeof entry.muted === "boolean"
            ? entry.muted
            : soundDefaults.muted,
        solo:
          typeof entry.solo === "boolean"
            ? entry.solo
            : soundDefaults.solo,
        collapsed: entryCollapsed,
        seqMode:
          entry.seqMode === "roll" || entry.seqMode === "single"
            ? entry.seqMode
            : soundDefaults.seqMode,
        gridCollapsed:
          typeof entry.gridCollapsed === "boolean"
            ? entry.gridCollapsed
            : typeof entry.notesHidden === "boolean"
              ? entry.notesHidden
              : soundDefaults.gridCollapsed,
        dualTab:
          entry.dualTab === "osc1" || entry.dualTab === "osc2"
            ? entry.dualTab
            : "main",
      });
      getOrInitState(key);
    }

    const activeKeys = Array.isArray(song.activeKeys)
      ? song.activeKeys.map((k) => String(k))
      : trackList.map((t) => String(t.key ?? "")).filter(Boolean);
    for (const key of activeKeys) {
      const btn = letters.find((b) => b.dataset && b.dataset.key === key);
      if (btn) {
        addTrack(btn, { insert: "append" });
      }
    }

    setLoopEnabled(Boolean(ui.loopEnabled));

    updateSoloSuppression();
    return true;
  }

  function refreshPresetSelect() {
    if (!presetSelect) return;
    const names = readPresetIndex();
    const defaultName = getDefaultPresetName();
    const selected = presetSelect.value;

    presetSelect.innerHTML = "";
    const emptyOpt = document.createElement("option");
    emptyOpt.value = "";
    emptyOpt.textContent = "—";
    presetSelect.appendChild(emptyOpt);

    for (const name of names) {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name === defaultName ? `${name} (default)` : name;
      presetSelect.appendChild(opt);
    }

    if (selected && names.includes(selected)) {
      presetSelect.value = selected;
    } else if (defaultName && names.includes(defaultName)) {
      presetSelect.value = defaultName;
    } else {
      presetSelect.value = "";
    }
  }

  function resetToFreshLanding() {
    stop();
    clearAllTracks();
    states.clear();

    applyStepsCount(INITIAL_GLOBALS.stepsCount);
    applyBeatSteps(INITIAL_GLOBALS.beatSteps);

    if (rangeFromInput && rangeToInput) {
      rangeFromInput.value = "1";
      rangeToInput.value = String(stepsCount);
      normalizeRangeInputs();
      updateRangeButtons();
    }

    setLoopEnabled(false);

    samplePadConfigs = Object.create(null);
    samplePadRollPattern = [];
    setSamplePadRollLength(INITIAL_UI.samplePadRollLength);
    setSamplePadRollBeatSteps(INITIAL_UI.samplePadRollBeatSteps);
    setSamplePadEnabled(INITIAL_UI.samplePadEnabled);
    setSamplePadTransportMode(INITIAL_UI.samplePadTransportMode);
    setSamplePadEditEnabled(false);

    setSubtitlesSpeed(INITIAL_UI.subtitlesSpeed);
    setSubtitlesEnabled(INITIAL_UI.subtitlesEnabled);
    setAutoExpandSpeed(INITIAL_UI.autoExpandSpeed);
    setAutoExpandEnabled(INITIAL_UI.autoExpandEnabled);
    setAutoscrollEnabled(INITIAL_UI.autoscrollEnabled);
    setGradientAnimationEnabled(INITIAL_UI.gradientAnimationEnabled);
    setStarBounceEnabled(INITIAL_UI.starBounceEnabled);
    setStarBounceAlwaysEnabled(INITIAL_UI.starBounceAlwaysEnabled);
    setBumpHeight(INITIAL_UI.bumpHeight);
    setBumpBounce(INITIAL_UI.bumpBounce);
    setBumpIntensity(INITIAL_UI.bumpIntensity);
    setBumpEnabled(INITIAL_UI.bumpEnabled);

    setThemeColors(INITIAL_UI.themeA, INITIAL_UI.themeB);
    setThemeEnabled(INITIAL_UI.themeEnabled);

    setAutosaveInterval(INITIAL_UI.autosaveIntervalMinutes);
    setAutosaveEnabled(INITIAL_UI.autosaveEnabled);

    tempo = INITIAL_GLOBALS.tempo;
    tempoInput.value = String(tempo);
    tempoOut.value = String(tempo);

    globalSwing = INITIAL_GLOBALS.globalSwing;
    globalSwingInput.value = String(globalSwing);
    globalSwingOut.value = String(globalSwing);

    globalVolume = INITIAL_GLOBALS.globalVolume;
    globalVolumeInput.value = String(globalVolume);
    globalVolumeOut.value = String(globalVolume);
    if (master && audio) {
      master.gain.setTargetAtTime(
        clampNumber(globalVolume / 127, 0, 1),
        audio.currentTime,
        0.01,
      );
    }

    if (presetNameInput) presetNameInput.value = "";
    refreshPresetSelect();
    if (presetSelect) presetSelect.value = "";
    if (songJson) {
      songJson.value = "";
      updateSongJsonHighlight();
    }
    setPresetStatus("new");

    if (themeStarBtn) {
      themeStarBtn.classList.remove("is-star-daw-intro", "is-star-bounce-intro");
    }
    if (starBounceIntroDelayTimerId != null) {
      window.clearTimeout(starBounceIntroDelayTimerId);
      starBounceIntroDelayTimerId = null;
    }
    starBounceIntroDelayUntil = 0;
    starDawIntroPlayed = false;
    updateDawVisibility();
  }

  function getOrInitState(key) {
    let state = states.get(key);
    if (!state) {
      const defaultSound = normalizeSoundKind(TRACK_DEFAULTS.sound, "kick");
      const envDefaults = getEnvDefaultsForSound(defaultSound);
      const soundDefaults = getSoundDefaultsForSound(defaultSound);
      state = {
        sound: defaultSound,
        pattern: new Array(stepsCount).fill(0),
        noteTies: new Array(stepsCount).fill(0),
        pitch: soundDefaults.pitch,
        tuneCents: soundDefaults.tuneCents,
        osc1Wave: soundDefaults.osc1Wave,
        osc1Level: soundDefaults.osc1Level,
        osc1Octave: soundDefaults.osc1Octave,
        osc1Detune: soundDefaults.osc1Detune,
        osc2Wave: soundDefaults.osc2Wave,
        osc2Level: soundDefaults.osc2Level,
        osc2Octave: soundDefaults.osc2Octave,
        osc2Detune: soundDefaults.osc2Detune,
        oscBlend: soundDefaults.oscBlend,
        noteMode: soundDefaults.noteMode,
        hold: envDefaults.hold,
        volume: soundDefaults.volume,
        pan: soundDefaults.pan,
        swing: soundDefaults.swing,
        offsetMs: soundDefaults.offsetMs,
        attack: envDefaults.attack,
        decay: envDefaults.decay,
        sustain: envDefaults.sustain,
        release: envDefaults.release,
        muted: soundDefaults.muted,
        solo: soundDefaults.solo,
        collapsed: soundDefaults.collapsed,
        seqMode: soundDefaults.seqMode,
        gridCollapsed: soundDefaults.gridCollapsed,
        dualTab: "main",
      };
      states.set(key, state);
    }

    state.sound = normalizeSoundKind(state.sound, TRACK_DEFAULTS.sound);
    const envDefaults = getEnvDefaultsForSound(state.sound);
    const soundDefaults = getSoundDefaultsForSound(state.sound);
    state.pattern = normalizePattern(state.pattern);
    state.noteTies = normalizeNoteTies(state.noteTies, state.pattern);
    state.pitch = clampNumber(
      numberOrFallback(state.pitch, soundDefaults.pitch),
      PITCH_MIN,
      PITCH_MAX,
    );
    state.tuneCents = clampNumber(
      numberOrFallback(state.tuneCents, soundDefaults.tuneCents),
      -100,
      100,
    );
    state.osc1Wave = normalizeOscWave(state.osc1Wave, soundDefaults.osc1Wave);
    state.osc1Level = clampNumber(
      numberOrFallback(state.osc1Level, soundDefaults.osc1Level),
      0,
      127,
    );
    state.osc1Octave = clampNumber(
      numberOrFallback(state.osc1Octave, soundDefaults.osc1Octave),
      -2,
      2,
    );
    state.osc1Detune = clampNumber(
      numberOrFallback(state.osc1Detune, soundDefaults.osc1Detune),
      -100,
      100,
    );
    state.osc2Wave = normalizeOscWave(state.osc2Wave, soundDefaults.osc2Wave);
    state.osc2Level = clampNumber(
      numberOrFallback(state.osc2Level, soundDefaults.osc2Level),
      0,
      127,
    );
    state.osc2Octave = clampNumber(
      numberOrFallback(state.osc2Octave, soundDefaults.osc2Octave),
      -2,
      2,
    );
    state.osc2Detune = clampNumber(
      numberOrFallback(state.osc2Detune, soundDefaults.osc2Detune),
      -100,
      100,
    );
    state.oscBlend = clampNumber(
      numberOrFallback(state.oscBlend, soundDefaults.oscBlend),
      -100,
      100,
    );
    state.noteMode = normalizeNoteMode(state.noteMode, soundDefaults.noteMode);
    state.hold = clampNumber(
      numberOrFallback(state.hold, envDefaults.hold),
      0,
      100,
    );
    state.volume = clampNumber(
      numberOrFallback(state.volume, soundDefaults.volume),
      0,
      127,
    );
    state.pan = clampNumber(
      numberOrFallback(state.pan, soundDefaults.pan),
      -100,
      100,
    );
    state.swing = clampNumber(
      numberOrFallback(state.swing, soundDefaults.swing),
      0,
      127,
    );
    state.offsetMs = clampNumber(
      numberOrFallback(state.offsetMs, soundDefaults.offsetMs),
      -100,
      100,
    );
    state.attack = clampNumber(
      numberOrFallback(state.attack, envDefaults.attack),
      0,
      127,
    );
    state.decay = clampNumber(
      numberOrFallback(state.decay, envDefaults.decay),
      0,
      127,
    );
    state.sustain = clampNumber(
      numberOrFallback(state.sustain, envDefaults.sustain),
      0,
      127,
    );
    state.release = clampNumber(
      numberOrFallback(state.release, envDefaults.release),
      0,
      127,
    );
    state.muted =
      typeof state.muted === "boolean" ? state.muted : Boolean(soundDefaults.muted);
    state.solo =
      typeof state.solo === "boolean" ? state.solo : Boolean(soundDefaults.solo);
    state.collapsed =
      typeof state.collapsed === "boolean"
        ? state.collapsed
        : Boolean(soundDefaults.collapsed);

    const hasMultiRowNotes = state.pattern.some(
      (m) =>
        (clampNumber(Math.round(numberOrFallback(m, 0)), 0, NOTE_MASK_ALL) &
          ~1) !==
        0,
    );
    const mode = String(state.seqMode || "").trim();
    state.seqMode =
      mode === "roll" || mode === "single"
        ? mode
        : hasMultiRowNotes
          ? "roll"
          : soundDefaults.seqMode;

    const legacyGridCollapsed =
      typeof state.gridCollapsed !== "undefined"
        ? state.gridCollapsed
        : state.notesHidden;
    state.gridCollapsed =
      typeof legacyGridCollapsed === "boolean"
        ? legacyGridCollapsed
        : Boolean(soundDefaults.gridCollapsed);

    const dualTab = String(state.dualTab || "").toLowerCase();
    state.dualTab =
      dualTab === "osc1" || dualTab === "osc2" || dualTab === "main"
        ? dualTab
        : "main";
    return state;
  }

  function midiToFrequency(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function midiToNoteParts(midi) {
    const m = clampNumber(Math.round(numberOrFallback(midi, 60)), 0, 127);
    const noteIndex = ((m % 12) + 12) % 12;
    const octave = Math.floor(m / 12) - 1;
    return { noteIndex, octave };
  }

  function notePartsToMidi(noteIndex, octave) {
    const idx = clampNumber(Math.round(numberOrFallback(noteIndex, 0)), 0, 11);
    const oct = Math.round(numberOrFallback(octave, 4));
    return (oct + 1) * 12 + idx;
  }

  function midiToNoteName(midi) {
    const names = [
      "c",
      "c#",
      "d",
      "d#",
      "e",
      "f",
      "f#",
      "g",
      "g#",
      "a",
      "a#",
      "b",
    ];
    const name = names[((midi % 12) + 12) % 12];
    const octave = Math.floor(midi / 12) - 1;
    return `${name}${octave}`;
  }

  function isTonalSound(kind) {
    return TONAL_SOUNDS.has(kind);
  }

  function effectiveMidiForSound(kind, midi) {
    if (kind === "bass") return Math.max(24, midi - 24);
    return midi;
  }

  function mapEnvTime(value127, maxSeconds) {
    const n = clampNumber(numberOrFallback(value127, 0), 0, 127) / 127;
    return n * n * maxSeconds;
  }

  function mapEnvTime100(value100, maxSeconds) {
    const n = clampNumber(numberOrFallback(value100, 0), 0, 100) / 100;
    return n * n * maxSeconds;
  }

  function applyAdsr(gainParam, time, gateSeconds, peak, env) {
    const safePeak = Math.max(0.0001, peak);
    const gate = Math.max(0.01, gateSeconds);
    let a = mapEnvTime(env.attack, 1.2);
    const h = mapEnvTime100(env.hold, 2.0);
    let d = mapEnvTime(env.decay, 1.2);
    const s = clampNumber(env.sustain, 0, 127) / 127;
    const r = mapEnvTime(env.release, 1.8);

    const ad = a + d;
    if (ad > gate && ad > 0) {
      const scale = gate / ad;
      a *= scale;
      d *= scale;
    }

    const t0 = time;
    const tA = t0 + a;
    const tH = tA + h;
    const tD = tH + d;
    const tGate = t0 + gate + h;

    const sustainLevel = safePeak * s;

    gainParam.setValueAtTime(0.0001, t0);

    if (a > 0) gainParam.linearRampToValueAtTime(safePeak, tA);
    else gainParam.setValueAtTime(safePeak, t0);

    if (h > 0) gainParam.setValueAtTime(safePeak, tH);

    if (d > 0) gainParam.linearRampToValueAtTime(sustainLevel, tD);
    else gainParam.setValueAtTime(sustainLevel, tH);

    if (tGate > tD) gainParam.setValueAtTime(sustainLevel, tGate);

    const tR = tGate + r;
    if (r > 0) gainParam.linearRampToValueAtTime(0.0001, tR);
    else gainParam.setValueAtTime(0.0001, tGate);

    return { endTime: tR };
  }

  function createPanNode(time, pan) {
    if (!audio || !master) return null;
    if (typeof audio.createStereoPanner !== "function") return null;

    const panner = audio.createStereoPanner();
    const pan01 = clampNumber(numberOrFallback(pan, 0), -1, 1);
    panner.pan.setValueAtTime(pan01, time);
    panner.connect(master);
    return panner;
  }

  function getAccentFromLetter(button) {
    const accent = getComputedStyle(button).getPropertyValue("--accent").trim();
    if (accent) return accent;
    const inline = button.style
      ? button.style.getPropertyValue("--accent").trim()
      : "";
    return inline || "#000";
  }

  function parseCssColorToRgb(value) {
    const raw = String(value || "").trim();
    if (!raw) return null;

    if (raw.startsWith("#")) {
      const hex = raw.slice(1).trim();
      if (hex.length === 3) {
        const r = parseInt(hex[0] + hex[0], 16);
        const g = parseInt(hex[1] + hex[1], 16);
        const b = parseInt(hex[2] + hex[2], 16);
        if (![r, g, b].every(Number.isFinite)) return null;
        return { r, g, b };
      }
      if (hex.length === 6) {
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        if (![r, g, b].every(Number.isFinite)) return null;
        return { r, g, b };
      }
      return null;
    }

    const rgbMatch = raw.match(/^rgba?\(([^)]+)\)$/i);
    if (rgbMatch) {
      const parts = rgbMatch[1].split(",").map((p) => p.trim());
      if (parts.length < 3) return null;
      const r = Number(parts[0]);
      const g = Number(parts[1]);
      const b = Number(parts[2]);
      if (![r, g, b].every(Number.isFinite)) return null;
      return {
        r: clampNumber(Math.round(r), 0, 255),
        g: clampNumber(Math.round(g), 0, 255),
        b: clampNumber(Math.round(b), 0, 255),
      };
    }

    return null;
  }

  function softenAccentColor(value, { lighten = 0.18, desaturate = 0.1 } = {}) {
    const rgb = parseCssColorToRgb(value);
    if (!rgb) return value;

    const avg = (rgb.r + rgb.g + rgb.b) / 3;
    let r = rgb.r * (1 - desaturate) + avg * desaturate;
    let g = rgb.g * (1 - desaturate) + avg * desaturate;
    let b = rgb.b * (1 - desaturate) + avg * desaturate;

    r = r + (255 - r) * lighten;
    g = g + (255 - g) * lighten;
    b = b + (255 - b) * lighten;

    return `rgb(${Math.round(clampNumber(r, 0, 255))}, ${Math.round(clampNumber(g, 0, 255))}, ${Math.round(clampNumber(b, 0, 255))})`;
  }

  function normalizeHexColor(value, fallback) {
    const raw = String(value || "").trim();
    const hex6 = raw.match(/^#([0-9a-f]{6})$/i);
    if (hex6) return `#${hex6[1].toLowerCase()}`;
    const hex3 = raw.match(/^#([0-9a-f]{3})$/i);
    if (hex3) {
      const h = hex3[1].toLowerCase();
      return `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`;
    }
    return fallback;
  }

  function mixRgb(a, b, t) {
    const clamped = clampNumber(numberOrFallback(t, 0), 0, 1);
    return {
      r: clampNumber(Math.round(a.r + (b.r - a.r) * clamped), 0, 255),
      g: clampNumber(Math.round(a.g + (b.g - a.g) * clamped), 0, 255),
      b: clampNumber(Math.round(a.b + (b.b - a.b) * clamped), 0, 255),
    };
  }

  function rgbToCss(rgb) {
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }

  function isCustomThemeColors() {
    return themeA !== DEFAULT_THEME_A || themeB !== DEFAULT_THEME_B;
  }

  function applyThemeVars() {
    const root = document.documentElement;

    themeA = normalizeHexColor(themeA, DEFAULT_THEME_A);
    themeB = normalizeHexColor(themeB, DEFAULT_THEME_B);

    const rgbA = parseCssColorToRgb(themeA) || { r: 0, g: 0, b: 0 };
    const rgbB = parseCssColorToRgb(themeB) || { r: 255, g: 255, b: 255 };

    root.style.setProperty("--t-bg", themeA);
    root.style.setProperty("--t-fg", themeB);

    const ratios = [
      0.96, 0.92, 0.86, 0.82, 0.72, 0.6, 0.5, 0.45, 0.4, 0.34, 0.32, 0.28, 0.22,
      0.18, 0.14, 0.08, 0.03,
    ];

    for (const ratio of ratios) {
      const pct = String(Math.round(ratio * 100));
      root.style.setProperty(`--t-${pct}`, rgbToCss(mixRgb(rgbA, rgbB, ratio)));
    }

    root.classList.toggle("is-theme-custom", isCustomThemeColors());
  }

  function syncThemePickerInputs() {
    if (themeColorAInput) themeColorAInput.value = themeA;
    if (themeColorBInput) themeColorBInput.value = themeB;
  }

  function setThemeColors(nextA, nextB) {
    if (themeColorThrottleTimerId != null) {
      window.clearTimeout(themeColorThrottleTimerId);
      themeColorThrottleTimerId = null;
    }
    queuedThemeColorA = null;
    queuedThemeColorB = null;
    themeA = normalizeHexColor(nextA, themeA);
    themeB = normalizeHexColor(nextB, themeB);
    applyThemeVars();
    syncThemePickerInputs();
    applyLetterHitAccentPalette();
    syncBumpModeClass();
  }

  function syncBumpModeClass() {
    const letterBumpActive = bumpEnabled;
    const anyBumpEnabled = bumpEnabled;

    document.body.classList.toggle("is-bump", letterBumpActive);
    document.body.classList.toggle("is-bump-letters", letterBumpActive);

    if (bumpToggleBtn) {
      bumpToggleBtn.disabled = false;
      bumpToggleBtn.title = bumpEnabled ? "bump: on" : "bump: off";
    }

    if (bumpIntensityRow) {
      bumpIntensityRow.hidden = !anyBumpEnabled;
    }
    if (bumpHeightRow) {
      bumpHeightRow.hidden = !anyBumpEnabled;
    }
    if (bumpBounceRow) {
      bumpBounceRow.hidden = !anyBumpEnabled;
    }

    if (bumpIntensityInput) {
      bumpIntensityInput.disabled = !anyBumpEnabled;
    }
    if (bumpIntensityOut) {
      bumpIntensityOut.disabled = !anyBumpEnabled;
    }
    if (bumpHeightInput) {
      bumpHeightInput.disabled = !anyBumpEnabled;
    }
    if (bumpHeightOut) {
      bumpHeightOut.disabled = !anyBumpEnabled;
    }
    if (bumpBounceInput) {
      bumpBounceInput.disabled = !anyBumpEnabled;
    }
    if (bumpBounceOut) {
      bumpBounceOut.disabled = !anyBumpEnabled;
    }
  }

  function getBumpHitDurations() {
    const intensity = clampNumber(numberOrFallback(bumpIntensity, 50), 0, 100);
    const softRatio = 1 - intensity / 100;
    return {
      // Keep hit windows short so dense grids still visibly retrigger each step.
      letter: Math.round(52 + softRatio * 70),
    };
  }

  function queueThemeColors(nextA, nextB, { immediate = false } = {}) {
    queuedThemeColorA = nextA;
    queuedThemeColorB = nextB;

    const flush = () => {
      const applyA = queuedThemeColorA ?? themeA;
      const applyB = queuedThemeColorB ?? themeB;
      queuedThemeColorA = null;
      queuedThemeColorB = null;
      themeColorThrottleTimerId = null;
      setThemeColors(applyA, applyB);
    };

    if (immediate) {
      if (themeColorThrottleTimerId != null) {
        window.clearTimeout(themeColorThrottleTimerId);
        themeColorThrottleTimerId = null;
      }
      flush();
      return;
    }

    if (themeColorThrottleTimerId != null) return;
    themeColorThrottleTimerId = window.setTimeout(flush, 100);
  }

  function setThemePickerOpen(nextOpen) {
    const open = Boolean(nextOpen);
    if (themePicker) themePicker.hidden = !open;
    if (themeStarBtn)
      themeStarBtn.setAttribute("aria-expanded", open ? "true" : "false");

    syncThemeControlsMount();
  }

  function syncThemeControlsMount() {
    if (!themeControls) return;

    const pickerOpen = Boolean(themePicker && !themePicker.hidden);
    const wantInSettings = Boolean(themeEnabled && settingsOpen && !pickerOpen);

    if (wantInSettings && settingsThemeControlsMount) {
      if (themeControls.parentElement !== settingsThemeControlsMount) {
        settingsThemeControlsMount.appendChild(themeControls);
      }
      settingsThemeControlsMount.hidden = false;
    } else {
      if (themePickerBox && themeControls.parentElement !== themePickerBox) {
        themePickerBox.appendChild(themeControls);
      }
      if (settingsThemeControlsMount) settingsThemeControlsMount.hidden = true;
    }

    scheduleSettingsPanelLayout();
  }

  function closeThemePicker() {
    setThemePickerOpen(false);
  }

  function setThemeEnableModalOpen(nextOpen) {
    if (!themeEnableModal) return;
    themeEnableModal.hidden = !Boolean(nextOpen);
  }

  function closeThemeEnableModal() {
    setThemeEnableModalOpen(false);
  }

  function toggleThemePicker() {
    if (!themePicker) return;
    if (themePicker.hidden) {
      syncThemePickerInputs();
      setThemePickerOpen(true);
    } else {
      setThemePickerOpen(false);
    }
  }

  function applyLetterHitAccentPalette() {
    if (!Array.isArray(letters) || letters.length < 2) return;

    if (themeEnabled) {
      for (const btn of letters) {
        btn.style.setProperty("--hit", "var(--t-50)");
      }
      return;
    }

    for (const btn of letters) {
      btn.style.setProperty("--hit", "#000000");
    }
  }

  applyLetterHitAccentPalette();

  function refreshBumpUnderlineEnvelope(button, hitDurationMs) {
    if (!button) return;
    const holdMs = Math.max(
      BUMP_UNDERLINE_HOLD_MIN_MS,
      Math.round(
        numberOrFallback(hitDurationMs, 90) * BUMP_UNDERLINE_HOLD_MULTIPLIER,
      ),
    );
    button.style.setProperty("--bump-underline-level", "1");
    const existing = hitUnderlineTimeouts.get(button);
    if (existing) window.clearTimeout(existing);
    const timeout = window.setTimeout(() => {
      button.style.setProperty("--bump-underline-level", "0");
      hitUnderlineTimeouts.delete(button);
    }, holdMs);
    hitUnderlineTimeouts.set(button, timeout);
  }

  function refreshBumpGhostEnvelope(button, hitDurationMs) {
    if (!button) return;
    const holdMs = Math.max(
      BUMP_GHOST_HOLD_MIN_MS,
      Math.round(numberOrFallback(hitDurationMs, 90) * BUMP_GHOST_HOLD_MULTIPLIER),
    );
    button.style.setProperty("--bump-ghost-level", "1");
    const existing = hitGhostTimeouts.get(button);
    if (existing) window.clearTimeout(existing);
    const timeout = window.setTimeout(() => {
      button.style.setProperty("--bump-ghost-level", "0");
      hitGhostTimeouts.delete(button);
    }, holdMs);
    hitGhostTimeouts.set(button, timeout);
  }

  function clearBumpUnderlineEnvelopes() {
    for (const button of letters) {
      const underlineTimeout = hitUnderlineTimeouts.get(button);
      if (underlineTimeout) {
        window.clearTimeout(underlineTimeout);
        hitUnderlineTimeouts.delete(button);
      }
      const ghostTimeout = hitGhostTimeouts.get(button);
      if (ghostTimeout) {
        window.clearTimeout(ghostTimeout);
        hitGhostTimeouts.delete(button);
      }
      button.style.setProperty("--bump-underline-level", "0");
      button.style.setProperty("--bump-ghost-level", "0");
    }
  }

  function flashHit(button, durationMs = null) {
    if (!button) return;
    const isLetterBump = document.body.classList.contains("is-bump-letters");
    const useDuration = Number.isFinite(durationMs)
      ? Math.max(0, durationMs)
      : isLetterBump
        ? getBumpHitDurations().letter
        : 90;
    if (isLetterBump) {
      refreshBumpUnderlineEnvelope(button, useDuration);
      refreshBumpGhostEnvelope(button, useDuration);
    }
    // Retrigger the bump animation even when hits occur every step.
    if (button.classList.contains("is-hit")) {
      button.classList.remove("is-hit");
      void button.offsetWidth;
    }
    button.classList.add("is-hit");
    const existing = hitTimeouts.get(button);
    if (existing) window.clearTimeout(existing);
    const timeout = window.setTimeout(
      () => button.classList.remove("is-hit"),
      useDuration,
    );
    hitTimeouts.set(button, timeout);
  }

  function flashTrack(trackEl, durationMs = null) {
    if (!trackEl) return;
    const useDuration = Number.isFinite(durationMs)
      ? Math.max(0, durationMs)
      : 110;
    trackEl.classList.add("is-hit");
    const existing = trackHitTimeouts.get(trackEl);
    if (existing) window.clearTimeout(existing);
    const timeout = window.setTimeout(
      () => trackEl.classList.remove("is-hit"),
      useDuration,
    );
    trackHitTimeouts.set(trackEl, timeout);
  }

  function isElementVisible(el) {
    if (!el) return false;
    if (
      typeof el.getClientRects === "function" &&
      el.getClientRects().length === 0
    )
      return false;
    const style = window.getComputedStyle ? window.getComputedStyle(el) : null;
    if (style && (style.display === "none" || style.visibility === "hidden"))
      return false;
    return true;
  }

  function positionSettingsPanel() {
    if (!settingsPanel || !transportBar) return;
    const barRect = transportBar.getBoundingClientRect();
    const gap = Math.max(0, window.innerHeight - barRect.bottom);

    const width = Math.max(0, Math.floor(barRect.width));
    settingsPanel.style.width = `${width}px`;

    const bottom = Math.round(barRect.height + gap * 2);
    settingsPanel.style.bottom = `${bottom}px`;

    const topMargin = 12;
    const available = Math.max(0, Math.round(barRect.top - gap - topMargin));
    settingsPanel.style.maxHeight = `${available}px`;
    scheduleSettingsScrollHintSync();
  }

  function ensureSettingsScrollHintElements() {
    if (!settingsModal || settingsScrollHintUp || settingsScrollHintDown)
      return;

    const up = document.createElement("div");
    up.className = "settingsScrollHint settingsScrollHintUp";
    up.textContent = "▴";
    up.hidden = true;
    up.setAttribute("aria-hidden", "true");

    const down = document.createElement("div");
    down.className = "settingsScrollHint settingsScrollHintDown";
    down.textContent = "▾";
    down.hidden = true;
    down.setAttribute("aria-hidden", "true");

    settingsModal.appendChild(up);
    settingsModal.appendChild(down);
    settingsScrollHintUp = up;
    settingsScrollHintDown = down;
  }

  function syncSettingsScrollHints() {
    if (!settingsPanel) return;
    ensureSettingsScrollHintElements();

    if (!settingsScrollHintUp || !settingsScrollHintDown) return;

    if (!settingsOpen || (settingsModal && settingsModal.hidden)) {
      settingsScrollHintUp.hidden = true;
      settingsScrollHintDown.hidden = true;
      return;
    }

    const maxScroll = Math.max(
      0,
      settingsPanel.scrollHeight - settingsPanel.clientHeight,
    );
    const top = Math.max(0, numberOrFallback(settingsPanel.scrollTop, 0));
    const canScrollDown = maxScroll > 2 && top < maxScroll - 2;
    const canScrollUp = maxScroll > 2 && top > 2;

    settingsPanel.classList.toggle("can-scroll-down", canScrollDown);
    settingsPanel.classList.toggle("can-scroll-up", canScrollUp);

    const rect = settingsPanel.getBoundingClientRect();
    const hintFontPx = numberOrFallback(
      parseFloat(window.getComputedStyle(settingsScrollHintUp).fontSize),
      12,
    );
    const hintSize = clampNumber(hintFontPx, 8, 48);
    const scrollbarGap = 16;
    const x = Math.round(
      clampNumber(
        rect.right - hintSize - scrollbarGap,
        0,
        Math.max(0, window.innerWidth - hintSize),
      ),
    );
    settingsScrollHintUp.style.left = `${x}px`;
    settingsScrollHintUp.style.top = `${Math.round(rect.top + 4)}px`;
    settingsScrollHintDown.style.left = `${x}px`;
    settingsScrollHintDown.style.top = `${Math.round(rect.bottom - hintSize - 8)}px`;

    settingsScrollHintUp.hidden = !canScrollUp;
    settingsScrollHintDown.hidden = !canScrollDown;
  }

  function scheduleSettingsScrollHintSync() {
    if (settingsScrollHintRaf != null) return;
    settingsScrollHintRaf = window.requestAnimationFrame(() => {
      settingsScrollHintRaf = null;
      syncSettingsScrollHints();
    });
  }

  function ensureSettingsScrollHintObserver() {
    if (!settingsPanel || settingsScrollHintObserver) return;
    if (!("MutationObserver" in window)) return;

    settingsScrollHintObserver = new MutationObserver(() => {
      scheduleSettingsScrollHintSync();
    });

    settingsScrollHintObserver.observe(settingsPanel, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["hidden", "style", "class"],
    });
  }

  function positionSubtitleStack() {
    const barRect = transportBar ? transportBar.getBoundingClientRect() : null;
    if (barRect && subtitleStack) {
      subtitleStack.style.left = `${barRect.left.toFixed(3)}px`;
      subtitleStack.style.width = `${barRect.width.toFixed(3)}px`;
      subtitleStack.style.bottom = `${Math.round(window.innerHeight - barRect.top + 10)}px`;
    }
  }

  function scheduleSettingsPanelLayout() {
    if (settingsLayoutRaf != null) return;
    settingsLayoutRaf = window.requestAnimationFrame(() => {
      settingsLayoutRaf = null;
      if (!settingsOpen) return;
      positionSettingsPanel();
    });
  }

  function scheduleSubtitleLayout() {
    if (subtitleLayoutRaf != null) return;
    subtitleLayoutRaf = window.requestAnimationFrame(() => {
      subtitleLayoutRaf = null;
      if (!subtitleStack || subtitleStack.hidden) return;
      positionSubtitleStack();
    });
  }

  function syncFloatingBarGeometry() {
    if (!transportBar || !isElementVisible(transportBar)) return;
    const rect = transportBar.getBoundingClientRect();
    if (rect.width <= 0) return;

    if (samplePadToolbar) {
      const baseTop = 14;
      let toolbarTop = baseTop;
      if (samplePadWrap && !samplePadWrap.hidden) {
        const wrapRect = samplePadWrap.getBoundingClientRect();
        const toolbarHeight =
          samplePadToolbar.getBoundingClientRect().height || 38;
        if (wrapRect.bottom <= baseTop + toolbarHeight) {
          toolbarTop = Math.max(baseTop, wrapRect.bottom - toolbarHeight);
        }
      }
      samplePadToolbar.style.setProperty(
        "--samplePadBarFullWidthPx",
        `${rect.width.toFixed(3)}px`,
      );
      samplePadToolbar.style.left = `${rect.left.toFixed(3)}px`;
      samplePadToolbar.style.setProperty(
        "--samplePadToolbarTop",
        `${toolbarTop.toFixed(3)}px`,
      );
      if (samplePadEditEnabled) {
        samplePadToolbar.style.width = `${rect.width.toFixed(3)}px`;
      } else {
        samplePadToolbar.style.width = "40px";
      }

      if (samplePadModeToolbar) {
        const editBarH = samplePadToolbar.getBoundingClientRect().height || 38;
        const modeTop = toolbarTop + editBarH + 2;
        samplePadModeToolbar.style.setProperty(
          "--samplePadBarFullWidthPx",
          `${rect.width.toFixed(3)}px`,
        );
        samplePadModeToolbar.style.left = `${rect.left.toFixed(3)}px`;
        samplePadModeToolbar.style.setProperty(
          "--samplePadToolbarTop",
          `${modeTop.toFixed(3)}px`,
        );
      }
    }

    if (subtitleStack) {
      subtitleStack.style.left = `${rect.left.toFixed(3)}px`;
      subtitleStack.style.width = `${rect.width.toFixed(3)}px`;
      subtitleStack.style.bottom = `${Math.round(window.innerHeight - rect.top + 10)}px`;
    }

    if (padPlaybackChip) {
      padPlaybackChip.style.bottom = "";
      if (
        samplePadModeToolbar &&
        !samplePadModeToolbar.hidden &&
        isElementVisible(samplePadModeToolbar)
      ) {
        const modeRect = samplePadModeToolbar.getBoundingClientRect();
        padPlaybackChip.style.left = `${modeRect.left.toFixed(3)}px`;
        padPlaybackChip.style.top = `${Math.round(modeRect.bottom + 4)}px`;
      } else {
        const editBarH = samplePadToolbar
          ? samplePadToolbar.getBoundingClientRect().height || 38
          : 38;
        padPlaybackChip.style.left = `${rect.left.toFixed(3)}px`;
        padPlaybackChip.style.top = `${Math.round(14 + editBarH + 4)}px`;
      }
    }
  }

  function syncFloatingScrollClearance() {
    const root = document.documentElement;
    if (!root) return;

    const topClearances = [];
    const bottomClearances = [];

    if (
      samplePadToolbar &&
      !samplePadToolbar.hidden &&
      isElementVisible(samplePadToolbar)
    ) {
      const rect = samplePadToolbar.getBoundingClientRect();
      topClearances.push(Math.max(0, Math.ceil(rect.bottom + 10)));
    }

    if (
      samplePadModeToolbar &&
      !samplePadModeToolbar.hidden &&
      isElementVisible(samplePadModeToolbar)
    ) {
      const rect = samplePadModeToolbar.getBoundingClientRect();
      topClearances.push(Math.max(0, Math.ceil(rect.bottom + 10)));
    }

    if (
      transportBar &&
      !transportBar.hidden &&
      isElementVisible(transportBar)
    ) {
      const rect = transportBar.getBoundingClientRect();
      bottomClearances.push(
        Math.max(0, Math.ceil(window.innerHeight - rect.top + 10)),
      );
    }

    if (
      padPlaybackChip &&
      !padPlaybackChip.hidden &&
      isElementVisible(padPlaybackChip)
    ) {
      const rect = padPlaybackChip.getBoundingClientRect();
      bottomClearances.push(
        Math.max(0, Math.ceil(window.innerHeight - rect.top + 10)),
      );
    }

    const topClearance = topClearances.length ? Math.max(...topClearances) : 0;
    const bottomClearance = bottomClearances.length
      ? Math.max(...bottomClearances)
      : 0;

    root.style.setProperty("--floatingClearanceTop", `${topClearance}px`);
    root.style.setProperty("--floatingClearanceBottom", `${bottomClearance}px`);
  }

  function syncSubtitlesUiVisibility() {
    const showSubtitles = shouldRunSubtitleCycle();
    if (subtitleStack) {
      subtitleStack.hidden = !showSubtitles;
      if (showSubtitles) {
        positionSubtitleStack();
      }
    }

    if (showSubtitles) {
      ensureSubtitleCycle();
    } else {
      stopSubtitleCycle();
    }

    syncFloatingScrollClearance();
  }

  function setSettingsOpen(nextOpen) {
    const hasTracks = tracks.size > 0;
    const open = Boolean(nextOpen) && hasTracks;
    settingsOpen = open;
    document.body.classList.toggle("is-settings-open", open);

    if (open) {
      stopSamplePadKeyHolds();
      pressedAlphaKeys.clear();
    }

    if (settingsModal) {
      settingsModal.hidden = !open;
    }

    if (!open && settingsPanel) {
      settingsPanel.classList.remove("can-scroll-down", "can-scroll-up");
    }

    if (transportSettingsBtn) {
      transportSettingsBtn.setAttribute(
        "aria-pressed",
        open ? "true" : "false",
      );
      transportSettingsBtn.title = open ? "close settings" : "settings";
    }

    if (open) {
      positionSettingsPanel();
      if (presetSelect && typeof presetSelect.focus === "function") {
        presetSelect.focus({ preventScroll: true });
      }
      scheduleSettingsScrollHintSync();
    } else if (settingsScrollHintUp && settingsScrollHintDown) {
      settingsScrollHintUp.hidden = true;
      settingsScrollHintDown.hidden = true;
    }

    syncThemeControlsMount();
  }

  function updateDawVisibility() {
    const hasTracks = tracks.size > 0;
    daw.hidden = !hasTracks;
    if (transportBar) transportBar.hidden = !hasTracks;
    document.body.classList.toggle("has-daw", hasTracks);
    if (!hasTracks) stop();
    if (!hasTracks) setSettingsOpen(false);
    if (!hasTracks) {
      if (starBounceIntroDelayTimerId != null) {
        window.clearTimeout(starBounceIntroDelayTimerId);
        starBounceIntroDelayTimerId = null;
      }
      starBounceIntroDelayUntil = 0;
    }
    if (hasTracks) {
      updateTransportBar();
      rebuildTransportTicks();
    }
    syncFloatingBarGeometry();
    syncSubtitlesUiVisibility();
    syncSamplePadToolbarVisibility();
    renderSamplePadGrid();
    updateTransportControls();
    if (navToSamplerBtn) {
      navToSamplerBtn.hidden = false;
      navToSamplerBtn.disabled = !hasTracks || isSamplerViewOpen();
    }
    if (navToDawBtn) {
      navToDawBtn.hidden = false;
      navToDawBtn.disabled = !isSamplerViewOpen();
    }

    if (themeStarBtn) {
      themeStarBtn.hidden = !hasTracks;
    }

    if (
      hasTracks &&
      !starDawIntroPlayed &&
      themeStarBtn
    ) {
      starDawIntroPlayed = true;
      themeStarBtn.classList.remove("is-star-bounce-intro");
      themeStarBtn.classList.add("is-star-daw-intro");
      syncStarBounceClass();
      themeStarBtn.addEventListener(
        "animationend",
        () => {
          const STAR_BOUNCE_POST_INTRO_DELAY_MS = 1500;
          themeStarBtn.classList.remove("is-star-daw-intro");
          starBounceIntroDelayUntil = Date.now() + STAR_BOUNCE_POST_INTRO_DELAY_MS;
          if (starBounceIntroDelayTimerId != null) {
            window.clearTimeout(starBounceIntroDelayTimerId);
          }
          starBounceIntroDelayTimerId = window.setTimeout(() => {
            starBounceIntroDelayTimerId = null;
            syncStarBounceClass();
          }, STAR_BOUNCE_POST_INTRO_DELAY_MS + 20);
          syncStarBounceClass();
        },
        { once: true },
      );
    }
  }

  function setSamplerViewOpen(nextOpen) {
    const open = Boolean(nextOpen);
    document.body.classList.toggle("is-sampler-view", open);
    if (navToDawBtn) {
      navToDawBtn.hidden = false;
      navToDawBtn.disabled = !open;
    }
    if (navToSamplerBtn) {
      navToSamplerBtn.hidden = false;
      navToSamplerBtn.disabled = open || !tracks.size;
    }

    if (open) {
      stop();
      if (settingsOpen) setSettingsOpen(false);
      document.dispatchEvent(new CustomEvent("sampler:view-open"));
    } else {
      document.dispatchEvent(new CustomEvent("sampler:view-close"));
    }
  }

  function isSamplerViewOpen() {
    return document.body.classList.contains("is-sampler-view");
  }

  function formatPercent01(value01) {
    const clamped = clampNumber(numberOrFallback(value01, 0), 0, 1);
    return `${(clamped * 100).toFixed(4)}%`;
  }

  function updateTransportBar() {
    if (!transportBar) return null;
    const steps = getActiveTransportSteps();

    const loopOn = Boolean(loopEnabled && !samplePadTransportMode);
    let ls01 = 0;
    let le01 = 0;
    if (loopOn) {
      clampLoopRange();
      ls01 = clampNumber(loopStart / steps, 0, 1);
      le01 = clampNumber((loopEnd + 1) / steps, 0, 1);
    }

    let stepFloat = clampNumber(numberOrFallback(currentStep, 0), 0, steps);
    if (isPlaying && uiStep >= 0) {
      stepFloat = uiStep;
      if (audio && uiStepStartedAt != null) {
        const secondsPerBeat = 60 / tempo;
        const stepDuration = secondsPerBeat / 4;
        const elapsed = Math.max(0, audio.currentTime - uiStepStartedAt);
        const within = clampNumber(
          stepDuration > 0 ? elapsed / stepDuration : 0,
          0,
          0.999,
        );
        stepFloat = uiStep + within;
      }
    }

    if (samplePadEnabled && samplePadTransportMode) {
      stepFloat = ((stepFloat % steps) + steps) % steps;
    }

    let pe01 = clampNumber(stepFloat / steps, 0, 1);
    const ps01 = loopOn ? ls01 : 0;
    if (loopOn) pe01 = clampNumber(pe01, ls01, le01);

    transportBar.dataset.loop = loopOn ? "1" : "0";
    transportBar.style.setProperty("--ls", formatPercent01(ls01));
    transportBar.style.setProperty("--le", formatPercent01(le01));
    transportBar.style.setProperty("--ps", formatPercent01(ps01));
    transportBar.style.setProperty("--pe", formatPercent01(pe01));

    return stepFloat;
  }

  let transportTicksKey = "";

  function rebuildTransportTicks() {
    if (!transportTicks) return;

    const steps = getActiveTransportSteps();
    const groupLen = clampNumber(
      Math.round(numberOrFallback(beatSteps, 4)),
      1,
      steps,
    );
    const beatCount = Math.floor((steps - 1) / groupLen) + 1;
    const viewportWidth = Math.max(320, window.innerWidth || 1024);
    const mobileToDesktop = clampNumber((viewportWidth - 420) / 780, 0, 1);
    const maxBeatLabels = Math.round(12 + (36 - 12) * mobileToDesktop);
    const minLabelPx = viewportWidth < 520 ? 26 : 22;
    const densityStride = Math.ceil((beatCount * minLabelPx) / viewportWidth);
    const beatLabelStride = Math.max(
      1,
      Math.ceil(beatCount / maxBeatLabels),
      densityStride,
    );

    const key = `${steps}|${groupLen}|${beatLabelStride}|${Math.round(viewportWidth / 24)}`;
    if (key === transportTicksKey) return;
    transportTicksKey = key;

    transportTicks.innerHTML = "";
    const frag = document.createDocumentFragment();

    for (let i = 0; i < steps; i += 1) {
      const isBeat = i % groupLen === 0;
      const tick = document.createElement("span");
      tick.className = isBeat
        ? "transportTick transportTickBeat"
        : "transportTick transportTickStep";
      tick.style.left = formatPercent01(i / steps);

      if (isBeat) {
        const beatIndex = Math.floor(i / groupLen);
        const num = document.createElement("span");
        num.className = "transportBeatNum";
        if (beatIndex % beatLabelStride === 0) {
          num.textContent = String(beatIndex + 1);
          tick.appendChild(num);
        }
      }

      frag.appendChild(tick);
    }

    transportTicks.appendChild(frag);
  }

  function scheduleSamplePadLayout() {
    if (samplePadLayoutRaf != null) return;
    samplePadLayoutRaf = window.requestAnimationFrame(() => {
      samplePadLayoutRaf = null;
      if (!samplePadWrap) return;
      const body = document.body;
      if (!body) return;

      if (samplePadWrap.hidden) {
        if (body.style.paddingTop) body.style.paddingTop = "";
        return;
      }

      const currentPad = Math.max(
        0,
        numberOrFallback(parseFloat(body.style.paddingTop || "0"), 0),
      );
      const rect = samplePadWrap.getBoundingClientRect();
      const pageTopWithoutPad = rect.top + window.scrollY - currentPad;
      const extraTop = Math.max(0, -pageTopWithoutPad + 8);

      if (Math.abs(extraTop - currentPad) < 0.5) return;
      const prevScrollY = window.scrollY;
      const delta = extraTop - currentPad;
      body.style.paddingTop = `${extraTop}px`;
      window.scrollTo({
        top: Math.max(0, prevScrollY + delta),
        behavior: "auto",
      });
    });
  }

  function sanitizeSamplePadTrigger(value) {
    const letters = String(value || "")
      .toLowerCase()
      .replace(/[^a-z]/g, "");
    let out = "";
    for (const ch of letters) {
      if (out.includes(ch)) continue;
      out += ch;
      if (out.length >= 2) break;
    }
    return out;
  }

  function sanitizeSamplePadRatchet(value) {
    const allowed = [0.25, 0.3333, 0.5, 0.6667, 1, 2, 3, 4, 5];
    const next = numberOrFallback(value, 1);
    const match = allowed.find((c) => Math.abs(c - next) < 1e-4);
    return match != null ? match : 1;
  }

  function formatRatchetLabel(value) {
    const ratchet = sanitizeSamplePadRatchet(value);
    if (ratchet === 0.25) return "1/4x";
    if (ratchet === 0.3333) return "1/3x";
    if (ratchet === 0.5) return "1/2x";
    if (ratchet === 0.6667) return "2/3x";
    if (ratchet === 1) return "1x";
    if (ratchet === 2) return "2x";
    if (ratchet === 3) return "3x";
    if (ratchet === 4) return "4x";
    if (ratchet === 5) return "5x";
    return "1x";
  }

  function getSamplePadConfig(stepIndex) {
    const step = clampNumber(
      Math.round(numberOrFallback(stepIndex, 0)),
      0,
      Math.max(0, stepsCount - 1),
    );
    const raw = samplePadConfigs[String(step)] || {};
    return {
      ratchet: sanitizeSamplePadRatchet(raw.ratchet),
      trigger: sanitizeSamplePadTrigger(raw.trigger),
    };
  }

  function setSamplePadConfig(stepIndex, patch) {
    const step = clampNumber(
      Math.round(numberOrFallback(stepIndex, 0)),
      0,
      Math.max(0, stepsCount - 1),
    );
    const next = {
      ...getSamplePadConfig(step),
      ...(patch && typeof patch === "object" ? patch : {}),
    };

    next.ratchet = sanitizeSamplePadRatchet(next.ratchet);
    next.trigger = sanitizeSamplePadTrigger(next.trigger);

    if (next.ratchet === 1 && !next.trigger) {
      delete samplePadConfigs[String(step)];
    } else {
      samplePadConfigs[String(step)] = next;
    }

    renderSamplePadGrid();
    rebuildTransportSubtitles();
    updateSamplePadKeyHolds();
  }

  function normalizeSamplePadConfigs(value) {
    const next = Object.create(null);
    if (!value || typeof value !== "object") return next;

    for (const [key, raw] of Object.entries(value)) {
      const step = clampNumber(
        Math.round(numberOrFallback(key, -1)),
        -1,
        MAX_STEPS - 1,
      );
      if (step < 0) continue;
      const ratchet = sanitizeSamplePadRatchet(raw && raw.ratchet);
      const trigger = sanitizeSamplePadTrigger(raw && raw.trigger);
      if (ratchet === 1 && !trigger) continue;
      next[String(step)] = { ratchet, trigger };
    }

    return next;
  }

  function getActiveTransportSteps() {
    if (samplePadEnabled && samplePadTransportMode) {
      return clampNumber(
        Math.round(numberOrFallback(samplePadRollLength, 16)),
        1,
        MAX_STEPS,
      );
    }
    return clampNumber(
      Math.round(numberOrFallback(stepsCount, 1)),
      1,
      MAX_STEPS,
    );
  }

  function normalizeSamplePadRollPattern(value) {
    const rows = Math.max(1, Math.round(numberOrFallback(stepsCount, 1)));
    const cols = clampNumber(
      Math.round(numberOrFallback(samplePadRollLength, 16)),
      1,
      MAX_STEPS,
    );
    const out = new Array(rows);
    for (let row = 0; row < rows; row += 1) {
      const srcRow = Array.isArray(value) ? value[row] : null;
      const nextRow = new Array(cols);
      for (let col = 0; col < cols; col += 1) {
        const src = Array.isArray(srcRow) ? srcRow[col] : null;
        if (src && typeof src === "object") {
          nextRow[col] = {
            on: Boolean(src.on),
            ratchet: sanitizeSamplePadRatchet(src.ratchet),
          };
        } else {
          nextRow[col] = { on: Boolean(src), ratchet: 1 };
        }
      }
      out[row] = nextRow;
    }
    return out;
  }

  function ensureSamplePadRollPatternShape() {
    samplePadRollPattern = normalizeSamplePadRollPattern(samplePadRollPattern);
  }

  function setSamplePadRollLength(nextLength) {
    samplePadRollLength = clampNumber(
      Math.round(numberOrFallback(nextLength, samplePadRollLength)),
      1,
      MAX_STEPS,
    );
    if (samplePadRollLengthInput)
      samplePadRollLengthInput.value = String(samplePadRollLength);
    if (samplePadRollLengthOut)
      samplePadRollLengthOut.value = String(samplePadRollLength);
    updateSamplePadRollBeatStepsMax();
    ensureSamplePadRollPatternShape();
    if (currentStep >= getActiveTransportSteps()) currentStep = 0;
    rebuildTransportTicks();
    updateTransportBar();
    renderSamplePadRoll();
  }

  function updateSamplePadRollBeatStepsMax() {
    const max = Math.max(1, samplePadRollLength);
    samplePadRollBeatSteps = clampNumber(
      Math.round(numberOrFallback(samplePadRollBeatSteps, 4)),
      1,
      max,
    );
    if (samplePadRollBeatStepsInput) {
      samplePadRollBeatStepsInput.max = String(max);
      samplePadRollBeatStepsInput.value = String(samplePadRollBeatSteps);
    }
    if (samplePadRollBeatStepsOut) {
      samplePadRollBeatStepsOut.max = String(max);
      samplePadRollBeatStepsOut.value = String(samplePadRollBeatSteps);
    }
  }

  function setSamplePadRollBeatSteps(nextBeatSteps) {
    samplePadRollBeatSteps = clampNumber(
      Math.round(numberOrFallback(nextBeatSteps, samplePadRollBeatSteps)),
      1,
      Math.max(1, samplePadRollLength),
    );
    if (samplePadRollBeatStepsInput)
      samplePadRollBeatStepsInput.value = String(samplePadRollBeatSteps);
    if (samplePadRollBeatStepsOut)
      samplePadRollBeatStepsOut.value = String(samplePadRollBeatSteps);
    renderSamplePadRoll();
  }

  function setSamplePadTransportMode(nextEnabled) {
    samplePadTransportMode = Boolean(samplePadEnabled && nextEnabled);
    if (samplePadPlaybackModeBtn) {
      samplePadPlaybackModeBtn.setAttribute(
        "aria-pressed",
        samplePadTransportMode ? "true" : "false",
      );
      samplePadPlaybackModeBtn.title = samplePadTransportMode
        ? "sample pad playback on"
        : "sample pad playback";
    }
    if (transportBar) {
      transportBar.dataset.mode = samplePadTransportMode ? "pad" : "sequence";
    }
    if (samplePadRollWrap) {
      samplePadRollWrap.hidden = !samplePadTransportMode;
    }
    if (isPlaying) {
      pause();
    }
    currentStep = samplePadTransportMode
      ? clampNumber(currentStep, 0, Math.max(0, getActiveTransportSteps() - 1))
      : clampNumber(currentStep, 0, Math.max(0, stepsCount - 1));
    ensureSamplePadRollPatternShape();
    rebuildTransportTicks();
    updateTransportBar();
    rebuildTransportSubtitles();
    syncPadPlaybackChip();
    renderSamplePadRoll();
    scheduleSamplePadLayout();
  }

  function triggerSamplePadRollPad(step) {
    const clamped = clampNumber(
      Math.round(numberOrFallback(step, 0)),
      0,
      Math.max(0, stepsCount - 1),
    );
    triggerSamplePadStep(clamped);
  }

  function renderSamplePadRoll() {
    if (!samplePadRollWrap || !samplePadRollGrid) return;
    const shouldShow =
      samplePadEnabled && samplePadTransportMode && tracks.size > 0;
    samplePadRollWrap.hidden = !shouldShow;
    if (!shouldShow) {
      samplePadRollGrid.innerHTML = "";
      return;
    }

    closeSamplePadRollRatchetPicker();
    ensureSamplePadRollPatternShape();
    const cols = clampNumber(
      Math.round(numberOrFallback(samplePadRollLength, 16)),
      1,
      MAX_STEPS,
    );
    const groupLen = clampNumber(
      Math.round(numberOrFallback(samplePadRollBeatSteps, 4)),
      1,
      cols,
    );
    const frag = document.createDocumentFragment();

    // Beat header row
    const beatHeaderEl = document.createElement("div");
    beatHeaderEl.className = "samplePadRollBeatHeader";
    beatHeaderEl.setAttribute("aria-hidden", "true");
    const labelSpacerEl = document.createElement("div");
    labelSpacerEl.className = "samplePadRollLabelSpacer";
    beatHeaderEl.appendChild(labelSpacerEl);
    const beatNumbersEl = document.createElement("div");
    beatNumbersEl.className = "samplePadRollBeatNumbers";
    for (let col = 0; col < cols; col += 1) {
      const numEl = document.createElement("div");
      numEl.className = "samplePadRollBeatNum";
      if (col % groupLen === 0) {
        numEl.textContent = String(Math.floor(col / groupLen) + 1);
        numEl.classList.add("is-beat");
      }
      beatNumbersEl.appendChild(numEl);
      const isBeatBreak = (col + 1) % groupLen === 0 && col !== cols - 1;
      if (isBeatBreak) {
        const sp = document.createElement("div");
        sp.className = "samplePadRollBeatSpacer";
        beatNumbersEl.appendChild(sp);
      }
    }
    beatHeaderEl.appendChild(beatNumbersEl);
    frag.appendChild(beatHeaderEl);

    // Pad rows
    for (let row = 0; row < stepsCount; row += 1) {
      const rowEl = document.createElement("div");
      rowEl.className = "samplePadRollRow";

      const rowBtn = document.createElement("button");
      rowBtn.type = "button";
      rowBtn.className = "samplePadRollPadBtn";
      rowBtn.dataset.step = String(row);
      rowBtn.textContent = `pad ${row + 1}`;
      rowBtn.setAttribute("aria-label", `trigger pad ${row + 1}`);
      rowEl.appendChild(rowBtn);

      const stepsEl = document.createElement("div");
      stepsEl.className = "samplePadRollSteps";
      for (let col = 0; col < cols; col += 1) {
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "samplePadRollCell";
        const cellData =
          samplePadRollPattern[row] && samplePadRollPattern[row][col];
        const isOn = cellData ? cellData.on : false;
        const ratchet = cellData ? cellData.ratchet : 1;
        if (isOn) {
          cell.classList.add("is-on");
          if (ratchet !== 1) {
            const rLabel = document.createElement("span");
            rLabel.className = "samplePadRollCellRatchet";
            rLabel.textContent = formatRatchetLabel(ratchet);
            cell.appendChild(rLabel);
          }
        }
        cell.classList.toggle("is-current", isPlaying && col === uiStep);
        cell.dataset.pad = String(row);
        cell.dataset.col = String(col);
        cell.setAttribute("aria-label", `pad ${row + 1} step ${col + 1}`);
        cell.setAttribute("aria-pressed", isOn ? "true" : "false");
        stepsEl.appendChild(cell);
        const isBeatBreak = (col + 1) % groupLen === 0 && col !== cols - 1;
        if (isBeatBreak) {
          const sp = document.createElement("div");
          sp.className = "samplePadRollBeatSpacer";
          sp.setAttribute("aria-hidden", "true");
          stepsEl.appendChild(sp);
        }
      }
      rowEl.appendChild(stepsEl);
      frag.appendChild(rowEl);
    }

    samplePadRollGrid.innerHTML = "";
    samplePadRollGrid.appendChild(frag);
  }

  function updateSamplePadRollCurrent() {
    if (!samplePadRollGrid || !samplePadTransportMode) return;
    const cells = samplePadRollGrid.querySelectorAll(".samplePadRollCell");
    for (const cell of cells) {
      const col = numberOrFallback(cell.dataset.col, -1);
      cell.classList.toggle("is-current", isPlaying && col === uiStep);
    }
  }

  function scheduleSamplePadRollStep(stepIndex, time, stepDuration) {
    const msUntil = (time - audio.currentTime) * 1000;
    const dur = numberOrFallback(stepDuration, 60 / tempo / 4);
    const rowCount = Math.min(stepsCount, samplePadRollPattern.length);
    for (let row = 0; row < rowCount; row += 1) {
      const cellData =
        samplePadRollPattern[row] && samplePadRollPattern[row][stepIndex];
      if (!cellData || !cellData.on) continue;
      const ratchet = sanitizeSamplePadRatchet(cellData.ratchet);
      const times = ratchet >= 1 ? Math.max(1, Math.round(ratchet)) : 1;
      const interval = dur / times;
      for (let r = 0; r < times; r += 1) {
        const delayMs = msUntil + r * interval * 1000;
        const capturedRow = row;
        window.setTimeout(
          () => {
            if (!isPlaying) return;
            previewStepAtTransport(capturedRow);
          },
          Math.max(0, delayMs),
        );
      }
    }

    window.setTimeout(
      () => {
        if (!isPlaying) return;
        uiStep = stepIndex;
        if (audio) uiStepStartedAt = audio.currentTime;
        updateTransportBar();
        startTransportRaf();
        updateSamplePadRollCurrent();
      },
      Math.max(0, msUntil),
    );
  }

  function syncPadPlaybackChip() {
    if (!padPlaybackChip) return;
    const show = samplePadEnabled && samplePadTransportMode && tracks.size > 0;
    padPlaybackChip.hidden = !show;
    if (show) syncFloatingBarGeometry();
    syncFloatingScrollClearance();
  }

  function closeSamplePadRollRatchetPicker() {
    if (!samplePadRollRatchetPicker) return;
    samplePadRollRatchetPicker.hidden = true;
    samplePadRollRatchetPicker.innerHTML = "";
  }

  function showSamplePadRollRatchetPicker(anchor, row, col, currentRatchet) {
    if (!samplePadRollRatchetPicker) return;
    closeSamplePadRollRatchetPicker();

    const options = [
      { value: 0.25, label: "1/4x" },
      { value: 0.3333, label: "1/3x" },
      { value: 0.5, label: "1/2x" },
      { value: 0.6667, label: "2/3x" },
      { value: 1, label: "1x" },
      { value: 2, label: "2x" },
      { value: 3, label: "3x" },
      { value: 4, label: "4x" },
      { value: 5, label: "5x" },
    ];

    for (const opt of options) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "samplePadRollRatchetOption";
      if (Math.abs(opt.value - currentRatchet) < 1e-4)
        btn.classList.add("is-current");
      btn.textContent = opt.label;
      btn.dataset.ratchet = String(opt.value);
      samplePadRollRatchetPicker.appendChild(btn);
    }

    samplePadRollRatchetPicker.dataset.row = String(row);
    samplePadRollRatchetPicker.dataset.col = String(col);

    const anchorRect = anchor.getBoundingClientRect();
    samplePadRollRatchetPicker.style.left = `${anchorRect.right + 8}px`;
    samplePadRollRatchetPicker.style.top = `${Math.max(8, anchorRect.top)}px`;
    samplePadRollRatchetPicker.hidden = false;

    window.requestAnimationFrame(() => {
      if (!samplePadRollRatchetPicker || samplePadRollRatchetPicker.hidden)
        return;
      const pr = samplePadRollRatchetPicker.getBoundingClientRect();
      const pad = 8;
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;

      const clampLeft = (value) =>
        clampNumber(value, pad, Math.max(pad, viewportW - pr.width - pad));
      const clampTop = (value) =>
        clampNumber(value, pad, Math.max(pad, viewportH - pr.height - pad));

      const intersectsAnchor = (left, top) => {
        const right = left + pr.width;
        const bottom = top + pr.height;
        return !(
          right <= anchorRect.left ||
          left >= anchorRect.right ||
          bottom <= anchorRect.top ||
          top >= anchorRect.bottom
        );
      };

      const overflowAmount = (left, top) => {
        const right = left + pr.width;
        const bottom = top + pr.height;
        let overflow = 0;
        if (left < pad) overflow += pad - left;
        if (top < pad) overflow += pad - top;
        if (right > viewportW - pad) overflow += right - (viewportW - pad);
        if (bottom > viewportH - pad) overflow += bottom - (viewportH - pad);
        return overflow;
      };

      const candidates = [
        {
          left: anchorRect.right + pad,
          top: clampTop(anchorRect.top),
        },
        {
          left: anchorRect.left - pr.width - pad,
          top: clampTop(anchorRect.top),
        },
        {
          left: clampLeft(anchorRect.left),
          top: anchorRect.bottom + pad,
        },
        {
          left: clampLeft(anchorRect.left),
          top: anchorRect.top - pr.height - pad,
        },
      ];

      let best = null;
      let bestScore = Number.POSITIVE_INFINITY;
      for (const candidate of candidates) {
        const overlapPenalty = intersectsAnchor(candidate.left, candidate.top)
          ? 100000
          : 0;
        const score = overlapPenalty + overflowAmount(candidate.left, candidate.top);
        if (score < bestScore) {
          bestScore = score;
          best = candidate;
        }
      }

      if (!best) {
        best = {
          left: anchorRect.right + pad,
          top: anchorRect.bottom + pad,
        };
      }

      samplePadRollRatchetPicker.style.left = `${clampLeft(best.left)}px`;
      samplePadRollRatchetPicker.style.top = `${clampTop(best.top)}px`;
    });
  }

  function focusSamplePadPlaybackArea() {
    if (!samplePadEnabled || !samplePadWrap) return;
    setSamplePadTransportMode(true);
    syncSamplePadToolbarVisibility();
    syncFloatingBarGeometry();
    syncFloatingScrollClearance();
    const rect = samplePadWrap.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const into = Math.min(
      window.innerHeight * 0.85,
      Math.max(120, rect.height * 0.45),
    );
    const targetTop = Math.max(0, Math.round(top + into));
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  }

  function getSubtitlesModel() {
    const chunks = [];

    if (samplePadEnabled && samplePadTransportMode) {
      ensureSamplePadRollPatternShape();
      const rows = Math.max(1, Math.round(numberOrFallback(stepsCount, 1)));
      const cols = clampNumber(
        Math.round(numberOrFallback(samplePadRollLength, 16)),
        1,
        MAX_STEPS,
      );

      for (let col = 0; col < cols; col += 1) {
        for (let row = 0; row < rows; row += 1) {
          const cell = Array.isArray(samplePadRollPattern[row])
            ? samplePadRollPattern[row][col]
            : null;
          if (!cell || !cell.on) continue;
          chunks.push({
            label: `pad ${row + 1}`,
            index: row,
          });
        }
      }
    } else {
      const steps = Math.max(1, Math.round(numberOrFallback(stepsCount, 1)));
      for (let step = 0; step < steps; step += 1) {
        for (const track of tracks.values()) {
          if (!track) continue;
          const state = getOrInitState(track.key);
          if (!state || state.muted) continue;
          const pattern = normalizePattern(state.pattern);
          const mask = numberOrFallback(pattern[step], 0);
          if (!mask) continue;
          const letter = String(
            (track.button && track.button.dataset
              ? track.button.dataset.letter
              : track.key) || "",
          ).toLowerCase();
          const instrument = String(state.sound || "").toLowerCase();
          const label = `${letter} ${instrument}`.trim();
          if (!label) continue;
          chunks.push({ label, index: step });
        }
      }
    }

    return { chunks };
  }

  function updateTransportSubtitleActive(stepIndex) {
    const itemCount = Math.max(1, transportSubtitleChunkCount);
    const raw = Math.round(numberOrFallback(stepIndex, 0));
    const next = ((raw % itemCount) + itemCount) % itemCount;
    transportSubtitleActiveIndex = next;
  }

  function randomBetween(min, max) {
    const a = numberOrFallback(min, 0);
    const b = numberOrFallback(max, a);
    return a + Math.random() * Math.max(0, b - a);
  }

  function randomBetweenPreferSlow(min, max) {
    const a = numberOrFallback(min, 0);
    const b = numberOrFallback(max, a);
    const span = Math.max(0, b - a);
    if (span <= 0) return a;
    // Bias toward higher values so subtitle pacing errs on slower/longer holds.
    const t = 1 - Math.pow(Math.random(), 2);
    return a + span * t;
  }

  function gcd(a, b) {
    let x = Math.abs(Math.round(numberOrFallback(a, 0)));
    let y = Math.abs(Math.round(numberOrFallback(b, 0)));
    while (y !== 0) {
      const t = y;
      y = x % y;
      x = t;
    }
    return x || 1;
  }

  function pickSubtitleStride(chunkCount) {
    const count = Math.max(1, Math.round(numberOrFallback(chunkCount, 1)));
    if (count <= 2) return 1;
    const base = Math.max(2, Math.round(count / 3));
    for (let i = 0; i < count; i += 1) {
      const candidate = ((base + i - 1) % count) + 1;
      if (candidate < count && gcd(candidate, count) === 1) return candidate;
    }
    return 1;
  }

  function ensureSubtitleCursor(chunkCount, { reset = false } = {}) {
    const count = Math.max(1, Math.round(numberOrFallback(chunkCount, 1)));
    const shouldReset =
      reset ||
      subtitleCursorChunkCount !== count ||
      subtitleCursorIndex < 0 ||
      subtitleCursorIndex >= count;

    if (!shouldReset) return;

    subtitleCursorChunkCount = count;
    subtitleCursorStride = pickSubtitleStride(count);
    subtitleCursorIndex = Math.floor(Math.random() * count);
  }

  function advanceSubtitleCursor() {
    if (subtitleCursorChunkCount <= 0) return;
    subtitleCursorIndex =
      (subtitleCursorIndex + subtitleCursorStride) % subtitleCursorChunkCount;
  }

  function clearSubtitleTimer() {
    if (subtitleTimerId == null) return;
    window.clearTimeout(subtitleTimerId);
    subtitleTimerId = null;
  }

  function shouldRunSubtitleCycle() {
    if (!(subtitlesEnabled && isPlaying && tracks.size > 0)) return false;
    const model = getSubtitlesModel();
    return model.chunks.length > 0;
  }

  function setSubtitleLines(lowerText, upperText) {
    if (!subtitleLower || !subtitleUpper) return;

    const lower = String(lowerText || "");
    const upper = String(upperText || "");

    if (lower) {
      subtitleLower.textContent = lower;
      subtitleLower.hidden = false;
    } else {
      subtitleLower.hidden = true;
    }

    if (upper) {
      subtitleUpper.textContent = upper;
      subtitleUpper.hidden = false;
    } else {
      subtitleUpper.hidden = true;
    }
  }

  function resetSubtitleMusicSpacing() {
    const cfg = appConfig.subtitles;
    subtitleEntriesSinceMusic = 0;
    subtitleNextMusicAfter = cfg.musicIntervalMin + Math.floor(Math.random() * (cfg.musicIntervalMax - cfg.musicIntervalMin + 1));
    subtitleLastTake = null;
    subtitleLastTier = "short";
    subtitleLastText = "";
  }

  function pickSubtitleTake(maxTake) {
    const clampedMax = Math.max(1, Math.round(numberOrFallback(maxTake, 1)));
    const cfg = appConfig.subtitles;
    const makeRange = (min, max) =>
      Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const shortChoices = makeRange(cfg.shortChunkMin, cfg.shortChunkMax).filter((n) => n <= clampedMax);
    const mediumChoices = makeRange(cfg.mediumChunkMin, cfg.mediumChunkMax).filter((n) => n <= clampedMax);
    const longChoices = makeRange(cfg.longChunkMin, cfg.longChunkMax).filter((n) => n <= clampedMax);

    const usedLongLastTime = Number(subtitleLastTake) >= cfg.longChunkMin;
    const allowLong =
      longChoices.length > 0 && Math.random() < (usedLongLastTime ? cfg.longAfterLongChunkProb : cfg.longChunkProb);
    const allowMedium = mediumChoices.length > 0 && Math.random() < cfg.mediumChunkProb;

    let pool = shortChoices;
    let tier = "short";
    if (allowLong) {
      pool = longChoices;
      tier = "long";
    } else if (allowMedium) {
      pool = mediumChoices;
      tier = "medium";
    }

    if (tier === subtitleLastTier && shortChoices.length) {
      pool = shortChoices;
      tier = "short";
    }

    if (!pool.length) {
      pool = shortChoices.length
        ? shortChoices
        : mediumChoices.length
          ? mediumChoices
          : longChoices;
    }

    if (!pool.length) {
      subtitleLastTake = 1;
      subtitleLastTier = "short";
      return 1;
    }

    let picked = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1 && picked === subtitleLastTake) {
      picked = pool[(pool.indexOf(picked) + 1) % pool.length];
    }

    subtitleLastTake = picked;
    subtitleLastTier = tier;
    return picked;
  }

  function getSubtitleTiming() {
    const virtualBeatMs = 500;
    const speed = clampNumber(numberOrFallback(subtitlesSpeed, 100), 20, 200);
    const cfg = appConfig.subtitles;
    const speedFactor = clampNumber(100 / speed, cfg.speedFactorMin, cfg.speedFactorMax);

    return {
      leadDelayMs:
        randomBetweenPreferSlow(
          clampNumber(virtualBeatMs * cfg.leadDelayLoFactor, cfg.leadDelayLoMin, cfg.leadDelayLoMax),
          clampNumber(virtualBeatMs * cfg.leadDelayHiFactor, cfg.leadDelayHiMin, cfg.leadDelayHiMax),
        ) * speedFactor,
      holdDelayMs:
        randomBetweenPreferSlow(
          clampNumber(virtualBeatMs * cfg.holdDelayLoFactor, cfg.holdDelayLoMin, cfg.holdDelayLoMax),
          clampNumber(virtualBeatMs * cfg.holdDelayHiFactor, cfg.holdDelayHiMin, cfg.holdDelayHiMax),
        ) * speedFactor,
      gapDelayMs:
        randomBetweenPreferSlow(
          clampNumber(virtualBeatMs * cfg.gapDelayLoFactor, cfg.gapDelayLoMin, cfg.gapDelayLoMax),
          clampNumber(virtualBeatMs * cfg.gapDelayHiFactor, cfg.gapDelayHiMin, cfg.gapDelayHiMax),
        ) * speedFactor,
    };
  }

  function sampleSubtitleText(
    advanceChunks = 0,
    { allowMusic = true } = {},
  ) {
    const model = getSubtitlesModel();
    const chunks = model.chunks;
    if (!chunks.length) return "";

    const chunkCount = chunks.length;
    ensureSubtitleCursor(chunkCount);

    const advance = Math.round(numberOrFallback(advanceChunks, 0));
    const desiredTake = pickSubtitleTake(chunkCount);
    const take = Math.max(1, Math.min(desiredTake, chunkCount));

    const buildTextAt = (baseIndex) => {
      const labels = [];
      for (let i = 0; i < take; i += 1) {
        const idx = ((baseIndex + i) % chunkCount + chunkCount) % chunkCount;
        const chunk = chunks[idx];
        if (!chunk || !chunk.label) continue;
        labels.push(String(chunk.label));
      }
      return labels.join(" ");
    };

    let baseIndex =
      ((subtitleCursorIndex + advance) % chunkCount + chunkCount) % chunkCount;
    let text = buildTextAt(baseIndex);

    if (chunkCount > 1) {
      let attempts = 0;
      while (attempts < 3 && text && text === subtitleLastText) {
        attempts += 1;
        baseIndex = (baseIndex + subtitleCursorStride) % chunkCount;
        text = buildTextAt(baseIndex);
      }
    }

    const shouldUseMusic =
      allowMusic &&
      subtitleEntriesSinceMusic >= subtitleNextMusicAfter;
    if (shouldUseMusic) {
      subtitleEntriesSinceMusic = 0;
      const scfg = appConfig.subtitles;
      subtitleNextMusicAfter = scfg.musicIntervalMin + Math.floor(Math.random() * (scfg.musicIntervalMax - scfg.musicIntervalMin + 1));
      return "(music)";
    }

    subtitleEntriesSinceMusic += 1;
    subtitleLastText = text;
    return text;
  }

  function runSubtitleCycle(cycleToken = subtitleCycleToken) {
    if (cycleToken !== subtitleCycleToken) return;
    if (!shouldRunSubtitleCycle()) {
      stopSubtitleCycle();
      return;
    }

    const first = sampleSubtitleText(0);
    if (!first) {
      stopSubtitleCycle();
      return;
    }

    setSubtitleLines("", first);

    const { leadDelayMs, holdDelayMs, gapDelayMs } =
      getSubtitleTiming();
    subtitleTimerId = window.setTimeout(() => {
      if (cycleToken !== subtitleCycleToken) return;
      subtitleTimerId = null;
      if (!shouldRunSubtitleCycle()) {
        stopSubtitleCycle();
        return;
      }

      const secondAdvance = Math.round(randomBetween(appConfig.subtitles.secondAdvanceMin, appConfig.subtitles.secondAdvanceMax));
      let second = sampleSubtitleText(secondAdvance, {
        allowMusic: first !== "(music)",
      });
      if (second && second === first) {
        second = sampleSubtitleText(secondAdvance + subtitleCursorStride, {
          allowMusic: false,
        });
      }
      setSubtitleLines(first, second || "");

      subtitleTimerId = window.setTimeout(() => {
        if (cycleToken !== subtitleCycleToken) return;
        subtitleTimerId = null;
        setSubtitleLines("", "");
        advanceSubtitleCursor();

        subtitleTimerId = window.setTimeout(() => {
          if (cycleToken !== subtitleCycleToken) return;
          subtitleTimerId = null;
          runSubtitleCycle(cycleToken);
        }, gapDelayMs);
      }, holdDelayMs);
    }, leadDelayMs);
  }

  function ensureSubtitleCycle() {
    if (!shouldRunSubtitleCycle()) {
      stopSubtitleCycle();
      return;
    }
    if (subtitleCycleActive) return;
    subtitleCycleActive = true;
    subtitleCycleToken += 1;
    const model = getSubtitlesModel();
    ensureSubtitleCursor(model.chunks.length, { reset: true });
    runSubtitleCycle(subtitleCycleToken);
  }

  function stopSubtitleCycle() {
    subtitleCycleActive = false;
    subtitleCycleToken += 1;
    clearSubtitleTimer();
    resetSubtitleMusicSpacing();
    setSubtitleLines("", "");
  }

  function rebuildTransportSubtitles() {
    if (!transportTicks || !transportBar) return;
    transportBar.classList.remove("is-subtitles");
    transportTicks.hidden = false;
    if (transportSubtitle) {
      transportSubtitle.hidden = true;
      transportSubtitle.innerHTML = "";
    }

    if (!subtitlesEnabled) {
      transportSubtitleKey = "";
      transportSubtitleActiveIndex = -1;
      transportSubtitleChunkCount = 0;
      stopSubtitleCycle();
      return;
    }

    const model = getSubtitlesModel();
    transportSubtitleKey = model.chunks
      .map((c) => String(c && c.label ? c.label : ""))
      .join("|");
    transportSubtitleChunkCount = Math.max(1, model.chunks.length);
    updateTransportSubtitleActive(isPlaying ? uiStep : currentStep);
    ensureSubtitleCursor(model.chunks.length, { reset: true });
    subtitleCycleToken += 1;
    clearSubtitleTimer();
    subtitleCycleActive = false;
    resetSubtitleMusicSpacing();
    syncSubtitlesUiVisibility();
  }

  function stopTransportRaf() {
    if (transportRaf == null) return;
    window.cancelAnimationFrame(transportRaf);
    transportRaf = null;
  }

  function startTransportRaf() {
    if (!transportBar) return;
    if (transportRaf != null) return;

    const tick = () => {
      if (!isPlaying || !audio) {
        stopTransportRaf();
        updateTransportBar();
        return;
      }
      const stepFloat = updateTransportBar();
      followPlaybackScroll(stepFloat);
      transportRaf = window.requestAnimationFrame(tick);
    };

    transportRaf = window.requestAnimationFrame(tick);
  }

  function seekToStep(
    nextStep,
    { fromUser = false, viewStep = null, suppressScroll = false } = {},
  ) {
    const activeSteps = getActiveTransportSteps();
    if (activeSteps <= 0) return;

    const requestedStep = clampNumber(
      Math.round(numberOrFallback(nextStep, 0)),
      0,
      activeSteps - 1,
    );

    let step = requestedStep;
    if (loopEnabled && !samplePadTransportMode) {
      clampLoopRange();
      step = clampNumber(step, loopStart, loopEnd);
    }

    currentStep = step;
    if (!isPlaying && pausedStep != null) {
      pausedStep = step;
    }
    if (fromUser) hasManualSeek = true;

    const viewTarget =
      typeof viewStep === "number"
        ? clampNumber(
            Math.round(numberOrFallback(viewStep, step)),
            0,
            activeSteps - 1,
          )
        : step;

    if (!samplePadTransportMode && !suppressScroll && fromUser) {
      followCenterLock = true;
      scrollGridsToStep(viewTarget, { center: true });
    } else if (!samplePadTransportMode && !suppressScroll) {
      scrollGridsToStep(viewTarget, { behavior: "auto" });
    }

    if (isPlaying && audio) {
      const prevUiStep = uiStep;
      uiStep = step;
      uiStepStartedAt = audio.currentTime;
      nextNoteTime = audio.currentTime + 0.05;
      updateTrackCurrentStepClasses(prevUiStep, uiStep);
      scheduler();
      startTransportRaf();
    }

    updateTransportBar();
  }

  const samplePadFlashTimeouts = new Map();
  const pressedAlphaKeys = new Set();
  const samplePadKeyHoldStates = new Map();
  const SAMPLE_PAD_HOLD_MIN_GAP_SEC = 0.02;
  const SAMPLE_PAD_HOLD_MIN_LEAD_SEC = 0.012;

  function triggerSamplePadStep(
    stepIndex,
    { fromUser = true, suppressScroll = false } = {},
  ) {
    if (tracks.size === 0) return;
    const step = clampNumber(
      Math.round(numberOrFallback(stepIndex, 0)),
      0,
      Math.max(0, stepsCount - 1),
    );
    seekToStep(step, { fromUser, viewStep: step, suppressScroll });
    previewStepAtTransport(step);
    flashSamplePadStep(step);
    if (subtitlesEnabled) {
      updateTransportSubtitleActive(step);
    }
  }

  function getSamplePadClockNowSeconds() {
    if (audio) return audio.currentTime;
    if (typeof performance !== "undefined" && performance.now) {
      return performance.now() / 1000;
    }
    return Date.now() / 1000;
  }

  function getSamplePadClockAnchorSeconds() {
    if (!audio) return 0;
    if (!Number.isFinite(uiStepStartedAt) || !Number.isFinite(uiStep)) return 0;
    if (uiStep < 0) return 0;

    const stepDuration = 60 / tempo / 4;
    if (!Number.isFinite(stepDuration) || stepDuration <= 0) return 0;

    return uiStepStartedAt - uiStep * stepDuration;
  }

  function getSamplePadPulseSeconds(step) {
    return clampNumber(
      60 / tempo / 4 / getSamplePadConfig(step).ratchet,
      0.035,
      1.4,
    );
  }

  function getNextSamplePadPulseTimeSeconds(
    nowSeconds,
    pulseSeconds,
    lastFiredAtSeconds = null,
  ) {
    const safePulseSeconds = Math.max(SAMPLE_PAD_HOLD_MIN_GAP_SEC, pulseSeconds);
    const fromLast = Number.isFinite(lastFiredAtSeconds)
      ? lastFiredAtSeconds +
        Math.max(SAMPLE_PAD_HOLD_MIN_GAP_SEC, safePulseSeconds * 0.35)
      : -Infinity;
    const minTarget = Math.max(nowSeconds + SAMPLE_PAD_HOLD_MIN_LEAD_SEC, fromLast);
    const anchor = getSamplePadClockAnchorSeconds();
    const cycles = Math.ceil((minTarget - anchor) / safePulseSeconds);
    return anchor + Math.max(0, cycles) * safePulseSeconds;
  }

  function clearSamplePadHoldTick(state) {
    if (!state || !state.timerId) return;
    window.clearTimeout(state.timerId);
    state.timerId = null;
  }

  function scheduleSamplePadHoldTick(state, id, collection) {
    if (!state) return;
    clearSamplePadHoldTick(state);

    const nowSeconds = getSamplePadClockNowSeconds();
    const pulseSeconds = getSamplePadPulseSeconds(state.step);
    state.pulseSeconds = pulseSeconds;
    const nextAtSeconds = getNextSamplePadPulseTimeSeconds(
      nowSeconds,
      pulseSeconds,
      state.lastFiredAtSeconds,
    );
    state.nextAtSeconds = nextAtSeconds;

    const delayMs = clampNumber((nextAtSeconds - nowSeconds) * 1000, 8, 1600);

    state.timerId = window.setTimeout(() => {
      const live = collection.get(id);
      if (!live || live !== state) return;
      triggerSamplePadStep(live.step, {
        fromUser: false,
        suppressScroll: true,
      });
      live.lastFiredAtSeconds = getSamplePadClockNowSeconds();
      scheduleSamplePadHoldTick(live, id, collection);
    }, delayMs);
  }

  function stopSamplePadHold(pointerId = null) {
    if (pointerId == null) {
      for (const holdState of samplePadHoldStates.values()) {
        clearSamplePadHoldTick(holdState);
      }
      samplePadHoldStates.clear();
      return;
    }

    const holdState = samplePadHoldStates.get(pointerId);
    if (!holdState) return;
    clearSamplePadHoldTick(holdState);
    samplePadHoldStates.delete(pointerId);
  }

  function startSamplePadPreviewHold(pointerId, step) {
    stopSamplePadHold(pointerId);
    const holdState = {
      step,
      timerId: null,
      pulseSeconds: getSamplePadPulseSeconds(step),
      nextAtSeconds: null,
      lastFiredAtSeconds: getSamplePadClockNowSeconds(),
    };
    samplePadHoldStates.set(pointerId, holdState);
    scheduleSamplePadHoldTick(holdState, pointerId, samplePadHoldStates);
  }

  function stopSamplePadKeyHolds() {
    for (const hold of samplePadKeyHoldStates.values()) {
      clearSamplePadHoldTick(hold);
    }
    samplePadKeyHoldStates.clear();
  }

  function updateSamplePadKeyHolds() {
    if (!samplePadEnabled || settingsOpen) {
      stopSamplePadKeyHolds();
      return;
    }

    for (let step = 0; step < stepsCount; step += 1) {
      const config = getSamplePadConfig(step);
      const trigger = config.trigger;
      if (trigger.length !== 2) {
        const existing = samplePadKeyHoldStates.get(step);
        clearSamplePadHoldTick(existing);
        samplePadKeyHoldStates.delete(step);
        continue;
      }

      const activeNow =
        pressedAlphaKeys.has(trigger[0]) && pressedAlphaKeys.has(trigger[1]);
      const existing = samplePadKeyHoldStates.get(step);

      if (activeNow && !existing) {
        triggerSamplePadStep(step);
        const holdState = {
          step,
          timerId: null,
          pulseSeconds: getSamplePadPulseSeconds(step),
          nextAtSeconds: null,
          lastFiredAtSeconds: getSamplePadClockNowSeconds(),
        };
        samplePadKeyHoldStates.set(step, holdState);
        scheduleSamplePadHoldTick(holdState, step, samplePadKeyHoldStates);
      } else if (activeNow && existing) {
        const nextPulse = getSamplePadPulseSeconds(step);
        if (Math.abs(nextPulse - numberOrFallback(existing.pulseSeconds, nextPulse)) > 0.0001) {
          existing.pulseSeconds = nextPulse;
          scheduleSamplePadHoldTick(existing, step, samplePadKeyHoldStates);
        }
      } else if (!activeNow && existing) {
        clearSamplePadHoldTick(existing);
        samplePadKeyHoldStates.delete(step);
      }
    }
  }

  function flashSamplePadStep(stepIndex, durationMs = 120) {
    if (!samplePadGrid || samplePadWrap.hidden) return;
    const step = clampNumber(
      Math.round(numberOrFallback(stepIndex, 0)),
      0,
      Math.max(0, stepsCount - 1),
    );
    const pad = samplePadGrid.querySelector(
      `.samplePadBtn[data-step="${step}"]`,
    );
    if (!pad) return;

    pad.classList.add("is-hit");
    const prev = samplePadFlashTimeouts.get(step);
    if (prev) window.clearTimeout(prev);
    const id = window.setTimeout(
      () => {
        pad.classList.remove("is-hit");
        samplePadFlashTimeouts.delete(step);
      },
      Math.max(40, durationMs),
    );
    samplePadFlashTimeouts.set(step, id);
  }

  function syncSamplePadToolbarVisibility() {
    if (!samplePadToolbar) return;
    samplePadToolbar.hidden = !(samplePadEnabled && tracks.size > 0);
    samplePadToolbar.classList.toggle("is-expanded", samplePadEditEnabled);
    if (samplePadModeToolbar) {
      samplePadModeToolbar.hidden = !(samplePadEnabled && tracks.size > 0);
    }
    if (samplePadPlaybackModeBtn) {
      samplePadPlaybackModeBtn.hidden = !samplePadEnabled;
    }
    syncFloatingBarGeometry();
    syncFloatingScrollClearance();
  }

  function syncSamplePadEditor() {
    if (
      !samplePadEditor ||
      !samplePadEditorLabel ||
      !samplePadRatchetSelect ||
      !samplePadTriggerInput
    )
      return;
    const showEditor =
      samplePadEnabled && samplePadEditEnabled && samplePadSelectedStep != null;
    samplePadEditor.hidden = !showEditor;

    if (!showEditor) return;

    const step = clampNumber(
      samplePadSelectedStep,
      0,
      Math.max(0, stepsCount - 1),
    );
    const config = getSamplePadConfig(step);
    samplePadEditorLabel.textContent = `pad ${step + 1}`;
    samplePadRatchetSelect.value = String(config.ratchet);
    samplePadTriggerInput.value = config.trigger;
  }

  function setSamplePadSelectedStep(nextStep) {
    if (!samplePadEditEnabled) {
      samplePadSelectedStep = null;
    } else if (typeof nextStep === "number") {
      samplePadSelectedStep = clampNumber(
        Math.round(numberOrFallback(nextStep, 0)),
        0,
        Math.max(0, stepsCount - 1),
      );
    } else {
      samplePadSelectedStep = null;
    }

    syncSamplePadEditor();
    renderSamplePadGrid();
  }

  function setSamplePadEditEnabled(nextEnabled) {
    samplePadEditEnabled = Boolean(samplePadEnabled && nextEnabled);
    if (!samplePadEditEnabled) {
      samplePadSelectedStep = null;
    } else if (samplePadSelectedStep == null) {
      samplePadSelectedStep = 0;
    }

    if (samplePadToolbar) {
      samplePadToolbar.classList.toggle("is-expanded", samplePadEditEnabled);
    }

    if (samplePadEditBtn) {
      samplePadEditBtn.setAttribute(
        "aria-pressed",
        samplePadEditEnabled ? "true" : "false",
      );
      samplePadEditBtn.title = samplePadEditEnabled
        ? "editing sample pads"
        : "edit sample pads";
    }

    if (samplePadWrap) {
      samplePadWrap.classList.toggle("is-editing", samplePadEditEnabled);
    }

    syncFloatingBarGeometry();
    syncSamplePadEditor();
    renderSamplePadGrid();
  }

  function renderSamplePadGrid() {
    if (!samplePadGrid || !samplePadWrap) return;

    const shouldShow = samplePadEnabled && tracks.size > 0;
    samplePadWrap.hidden = !shouldShow;
    syncSamplePadToolbarVisibility();

    if (!shouldShow) {
      samplePadGrid.innerHTML = "";
      stopSamplePadHold();
      syncSamplePadEditor();
      renderSamplePadRoll();
      scheduleSamplePadLayout();
      return;
    }

    samplePadWrap.classList.toggle("is-editing", samplePadEditEnabled);
    const frag = document.createDocumentFragment();
    const groupLen = clampNumber(
      Math.round(numberOrFallback(beatSteps, 4)),
      1,
      Math.max(1, stepsCount),
    );
    const stepsWithNotes = new Set();

    for (const track of tracks.values()) {
      const state = getOrInitState(track.key);
      const normalizedPattern = normalizePattern(state.pattern);
      for (let step = 0; step < stepsCount; step += 1) {
        const mask = clampNumber(
          Math.round(numberOrFallback(normalizedPattern[step], 0)),
          0,
          NOTE_MASK_ALL,
        );
        if (mask) stepsWithNotes.add(step);
      }
    }

    for (let i = 0; i < stepsCount; i += 1) {
      const config = getSamplePadConfig(i);
      const hasNotes = stepsWithNotes.has(i);
      const padBtn = document.createElement("button");
      padBtn.type = "button";
      padBtn.className = "samplePadBtn";
      padBtn.dataset.step = String(i);
      padBtn.setAttribute("aria-label", `sample pad ${i + 1}`);
      padBtn.disabled = !hasNotes;
      padBtn.setAttribute("aria-disabled", hasNotes ? "false" : "true");
      padBtn.classList.toggle("is-selected", samplePadSelectedStep === i);
      padBtn.classList.toggle("is-beat-start", i !== 0 && i % groupLen === 0);
      padBtn.classList.toggle("is-empty", !hasNotes);

      const beatNum = document.createElement("span");
      beatNum.className = "samplePadBeatNum";
      beatNum.textContent = String(i + 1);
      padBtn.appendChild(beatNum);

      if (config.trigger) {
        const trigger = document.createElement("span");
        trigger.className = "samplePadTriggerText";
        trigger.textContent = config.trigger.toLowerCase();
        padBtn.appendChild(trigger);
      }

      const repeat = document.createElement("span");
      repeat.className = "samplePadRepeatText";
      repeat.textContent = formatRatchetLabel(config.ratchet);
      padBtn.appendChild(repeat);

      frag.appendChild(padBtn);
    }

    samplePadGrid.innerHTML = "";
    samplePadGrid.appendChild(frag);
    syncSamplePadEditor();
    renderSamplePadRoll();
    scheduleSamplePadLayout();
  }

  let transportScrubState = null;

  function getSeekStepFromClientX(clientX) {
    if (!transportSeekBtn) return 0;
    const rect = transportSeekBtn.getBoundingClientRect();
    const style = window.getComputedStyle
      ? window.getComputedStyle(transportSeekBtn)
      : null;
    const padL = clampNumber(
      numberOrFallback(style ? parseFloat(style.paddingLeft) : 0, 0),
      0,
      rect.width,
    );
    const padR = clampNumber(
      numberOrFallback(style ? parseFloat(style.paddingRight) : 0, 0),
      0,
      rect.width,
    );
    const seekWidth = Math.max(1, rect.width - padL - padR);
    const ratio = (clientX - rect.left - padL) / seekWidth;
    const clamped = clampNumber(ratio, 0, 1);
    const steps = getActiveTransportSteps();
    return clampNumber(Math.floor(clamped * steps), 0, steps - 1);
  }

  function previewStepAtTransport(stepIndex) {
    ensureAudio();
    if (!audio || !master) return;
    if (audio.state === "suspended") {
      audio.resume();
    }

    const step = clampNumber(
      Math.round(numberOrFallback(stepIndex, 0)),
      0,
      Math.max(0, stepsCount - 1),
    );
    const secondsPerBeat = 60 / tempo;
    const stepDuration = secondsPerBeat / 4;
    const noteTime = audio.currentTime + 0.001;

    const soloed = Array.from(tracks.values()).some(
      (t) => getOrInitState(t.key).solo,
    );

    for (const track of tracks.values()) {
      const state = getOrInitState(track.key);
      const mask = clampNumber(
        Math.round(numberOrFallback(state.pattern[step], 0)),
        0,
        NOTE_MASK_ALL,
      );
      if (!mask) continue;

      const eligibleBySolo = !soloed || state.solo;
      const volume01 = clampNumber(state.volume / 127, 0, 1);
      const pan01 = clampNumber(state.pan / 100, -1, 1);
      const audible = eligibleBySolo && !state.muted && volume01 > 0;

      const tuneCents = clampNumber(
        numberOrFallback(state.tuneCents, 0),
        -100,
        100,
      );
      const basePitch = numberOrFallback(state.pitch, 60);
      const env = {
        attack: state.attack,
        hold: state.hold,
        decay: state.decay,
        sustain: state.sustain,
        release: state.release,
      };
      const stack = getDualOscParams(state);

      if (audible) {
        if (state.seqMode !== "roll") {
          const rowMidi = clampNumber(basePitch, PITCH_MIN, PITCH_MAX);
          const pitchWithTune = clampNumber(
            rowMidi + tuneCents / 100,
            PITCH_MIN,
            PITCH_MAX,
          );
          const effectiveMidi = effectiveMidiForSound(
            state.sound,
            pitchWithTune,
          );
          const frequency = midiToFrequency(effectiveMidi);
          triggerSound(state.sound, noteTime, {
            duration: stepDuration,
            frequency,
            pitch: pitchWithTune,
            volume: volume01,
            pan: pan01,
            env,
            stack,
          });
        } else {
          for (let row = 0; row < NOTE_ROWS; row += 1) {
            if ((mask & (1 << row)) === 0) continue;
            const rowMidi = clampNumber(basePitch + row, PITCH_MIN, PITCH_MAX);
            const pitchWithTune = clampNumber(
              rowMidi + tuneCents / 100,
              PITCH_MIN,
              PITCH_MAX,
            );
            const effectiveMidi = effectiveMidiForSound(
              state.sound,
              pitchWithTune,
            );
            const frequency = midiToFrequency(effectiveMidi);
            triggerSound(state.sound, noteTime, {
              duration: stepDuration,
              frequency,
              pitch: pitchWithTune,
              volume: volume01,
              pan: pan01,
              env,
              stack,
            });
          }
        }
      }

      if (eligibleBySolo && (audible || state.muted)) {
        flashHit(track.button);
        flashTrack(track.el);
      }
    }
  }

  function endTransportScrub() {
    if (!transportScrubState) return;
    if (transportScrubState.holdRepeatTimer) {
      window.clearInterval(transportScrubState.holdRepeatTimer);
    }
    window.removeEventListener("pointermove", transportScrubState.onMove);
    window.removeEventListener("pointerup", transportScrubState.onUp);
    window.removeEventListener("pointercancel", transportScrubState.onCancel);
    transportScrubState = null;
  }

  function updateSoloSuppression() {
    const soloed = Array.from(tracks.values()).some(
      (t) => getOrInitState(t.key).solo,
    );
    for (const track of tracks.values()) {
      const state = getOrInitState(track.key);
      const suppressed = soloed && !state.solo;
      track.el.classList.toggle("is-suppressed", suppressed);
      track.button.classList.toggle("is-suppressed", suppressed);
    }
  }

  let sharedGridScrollLeft = 0;

  let followCenterLock = false;

  function getFirstVisibleTrackForGrid() {
    for (const track of tracks.values()) {
      if (
        !track ||
        !track.grid ||
        !Array.isArray(track.stepButtons) ||
        track.stepButtons.length === 0
      )
        continue;
      if (!isElementVisible(track.grid)) continue;
      if (track.grid.clientWidth <= 0) continue;
      return track;
    }
    return null;
  }

  function syncGridScroll(sourceEl, scrollLeft) {
    if (isSyncingGridScroll) return;
    isSyncingGridScroll = true;

    sharedGridScrollLeft = Math.max(0, Number(scrollLeft) || 0);

    for (const track of tracks.values()) {
      if (!track.grid) continue;
      if (track.grid === sourceEl) continue;
      track.grid.scrollLeft = sharedGridScrollLeft;
    }
    isSyncingGridScroll = false;
  }

  function getStepCenterPxFromFloat(stepFloat, stepButtons) {
    if (!Array.isArray(stepButtons) || stepButtons.length === 0) return null;
    const maxIndex = Math.max(0, stepButtons.length - 1);
    const clamped = clampNumber(numberOrFallback(stepFloat, 0), 0, maxIndex);
    const baseIndex = clampNumber(Math.floor(clamped), 0, maxIndex);
    const frac = clampNumber(clamped - baseIndex, 0, 1);
    const baseBtn = stepButtons[baseIndex];
    const nextBtn = stepButtons[clampNumber(baseIndex + 1, 0, maxIndex)];
    if (!baseBtn || !nextBtn) return null;
    const baseCenter = baseBtn.offsetLeft + baseBtn.offsetWidth * 0.5;
    const nextCenter = nextBtn.offsetLeft + nextBtn.offsetWidth * 0.5;
    return baseCenter + (nextCenter - baseCenter) * frac;
  }

  function followPlaybackScroll(stepFloat) {
    if (samplePadEnabled && samplePadTransportMode) {
      followCenterLock = false;
      return;
    }

    if (!isPlaying) {
      followCenterLock = false;
      return;
    }

    if (!autoscrollEnabled) {
      followCenterLock = false;
      return;
    }

    const first = getFirstVisibleTrackForGrid();
    if (!first || !first.grid || !Array.isArray(first.stepButtons)) return;

    const grid = first.grid;
    const viewLeft = grid.scrollLeft;
    const viewRight = viewLeft + grid.clientWidth;
    const viewCenter = viewLeft + grid.clientWidth * 0.5;
    const maxLeft = Math.max(0, grid.scrollWidth - grid.clientWidth);

    const centerPx = getStepCenterPxFromFloat(
      Number.isFinite(stepFloat)
        ? stepFloat
        : clampNumber(numberOrFallback(uiStep, currentStep), 0, stepsCount - 1),
      first.stepButtons,
    );
    if (centerPx == null) return;

    const targetLeft = clampNumber(
      centerPx - grid.clientWidth * 0.5,
      0,
      maxLeft,
    );

    if (!followCenterLock) {
      const outOfView = centerPx < viewLeft || centerPx > viewRight;
      if (outOfView || centerPx >= viewCenter) {
        followCenterLock = true;
      } else {
        return;
      }
    }

    if (Math.abs(targetLeft - viewLeft) < 0.25) return;
    syncGridScroll(null, targetLeft);
  }

  function scrollGridsToStep(
    stepIndex,
    { behavior = "auto", follow = false, center = false } = {},
  ) {
    const first = getFirstVisibleTrackForGrid();
    if (!first || !first.grid || !Array.isArray(first.stepButtons)) return;
    const grid = first.grid;
    const btn = first.stepButtons[stepIndex];
    if (!btn) return;
    const viewLeft = grid.scrollLeft;
    const viewRight = viewLeft + grid.clientWidth;
    const stepLeft = btn.offsetLeft;
    const stepRight = stepLeft + btn.offsetWidth;
    const maxLeft = Math.max(0, grid.scrollWidth - grid.clientWidth);

    let targetLeft = null;

    if (center) {
      const stepCenter = stepLeft + btn.offsetWidth * 0.5;
      targetLeft = clampNumber(stepCenter - grid.clientWidth * 0.5, 0, maxLeft);
    } else {
      const isOutOfView = stepRight < viewLeft || stepLeft > viewRight;
      if (isOutOfView) {
        targetLeft = clampNumber(
          stepLeft - grid.clientWidth * 0.35,
          0,
          maxLeft,
        );
      } else if (follow) {
        const stepCenter = stepLeft + btn.offsetWidth * 0.5;
        const viewCenter = viewLeft + grid.clientWidth * 0.5;
        if (stepCenter < viewCenter) return;
        targetLeft = clampNumber(
          stepCenter - grid.clientWidth * 0.5,
          0,
          maxLeft,
        );
      } else {
        const margin = btn.offsetWidth * 3;
        if (stepLeft >= viewLeft + margin && stepRight <= viewRight - margin)
          return;
        targetLeft = clampNumber(
          stepLeft - grid.clientWidth * 0.35,
          0,
          maxLeft,
        );
      }
    }

    if (targetLeft == null) return;
    if (Math.abs(targetLeft - viewLeft) < 0.5) return;

    if (center) {
      syncGridScroll(null, targetLeft);
      return;
    }

    if (behavior === "smooth" && typeof grid.scrollTo === "function") {
      grid.scrollTo({ left: targetLeft, behavior: "smooth" });
    } else {
      syncGridScroll(null, targetLeft);
    }
  }

  function renderTrackGrid(track) {
    const state = getOrInitState(track.key);
    const pattern = normalizePattern(state.pattern);
    const ties = normalizeNoteTies(state.noteTies, pattern);

    const byRow = Array.isArray(track.stepButtonsByRow)
      ? track.stepButtonsByRow
      : [];
    for (let row = 0; row < NOTE_ROWS; row += 1) {
      const rowButtons = byRow[row];
      if (!Array.isArray(rowButtons)) continue;
      const bit = 1 << row;
      for (let i = 0; i < stepsCount; i += 1) {
        const btn = rowButtons[i];
        if (!btn) continue;
        const mask = clampNumber(
          Math.round(numberOrFallback(pattern[i], 0)),
          0,
          NOTE_MASK_ALL,
        );
        const on = (mask & bit) !== 0;
        const tied = on && (ties[i] & bit) !== 0;
        btn.classList.toggle("is-on", on);
        btn.classList.toggle("is-tied", tied);
        btn.classList.toggle("is-current", isPlaying && i === uiStep);
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      }
    }
  }

  function updateTrackCurrentStepClasses(prevStep, nextStep) {
    const prev = Number.isFinite(prevStep)
      ? clampNumber(Math.round(prevStep), 0, Math.max(0, stepsCount - 1))
      : -1;
    const next = Number.isFinite(nextStep)
      ? clampNumber(Math.round(nextStep), 0, Math.max(0, stepsCount - 1))
      : -1;

    if (prev === next) return;

    for (const track of tracks.values()) {
      const byRow = Array.isArray(track.stepButtonsByRow)
        ? track.stepButtonsByRow
        : [];
      for (const rowButtons of byRow) {
        if (!Array.isArray(rowButtons)) continue;
        if (prev >= 0) {
          const prevBtn = rowButtons[prev];
          if (prevBtn) prevBtn.classList.remove("is-current");
        }
        if (next >= 0) {
          const nextBtn = rowButtons[next];
          if (nextBtn) nextBtn.classList.add("is-current");
        }
      }
    }
  }

  function renderAllTrackGrids() {
    for (const track of tracks.values()) renderTrackGrid(track);
  }

  function renderTrackRollLabels(track) {
    const labelEls =
      track && Array.isArray(track.noteLabelEls) ? track.noteLabelEls : null;
    if (!labelEls || labelEls.length === 0) return;
    const state = getOrInitState(track.key);
    const basePitch = numberOrFallback(state.pitch, 60);
    for (let row = 0; row < NOTE_ROWS; row += 1) {
      const el = labelEls[row];
      if (!el) continue;
      const midi = clampNumber(basePitch + row, PITCH_MIN, PITCH_MAX);
      const noteName = midiToNoteName(midi);
      el.textContent = noteName;
      el.setAttribute("aria-label", `play ${noteName}`);
    }
  }

  function applyStepsCount(nextStepsCount) {
    const n = Number(nextStepsCount);
    if (!Number.isFinite(n)) return;
    const next = clampNumber(Math.round(n), 4, MAX_STEPS);
    if (next === stepsCount) return;

    const oldSteps = stepsCount;

    stepsCount = next;
    stepsInput.value = String(stepsCount);
    stepsOut.value = String(stepsCount);

    updateBeatStepsMax();

    for (const state of states.values()) {
      state.pattern = normalizePattern(state.pattern);
      state.noteTies = normalizeNoteTies(state.noteTies, state.pattern);
    }
    for (const track of tracks.values()) {
      buildGrid(track);
      renderTrack(track);
    }

    populateRangeSelects({ oldSteps });
    normalizeRangeInputs();
    updateRangeButtons();
    refreshLoopFromRange();

    syncGridScroll(null, sharedGridScrollLeft);

    if (currentStep >= stepsCount) currentStep = 0;
    if (uiStep >= stepsCount) uiStep = -1;

    ensureSamplePadRollPatternShape();

    updateTransportBar();
    rebuildTransportTicks();
    rebuildTransportSubtitles();
    renderSamplePadGrid();
    renderSamplePadRoll();
  }

  function updateBeatStepsMax() {
    if (!beatStepsInput || !beatStepsOut) return;
    const max = Math.max(1, stepsCount);
    beatStepsInput.max = String(max);
    beatStepsOut.max = String(max);
    beatSteps = clampNumber(Math.round(numberOrFallback(beatSteps, 4)), 1, max);
    beatStepsInput.value = String(beatSteps);
    beatStepsOut.value = String(beatSteps);
  }

  function applyBeatSteps(nextBeatSteps) {
    beatSteps = clampNumber(
      Math.round(numberOrFallback(nextBeatSteps, 4)),
      1,
      stepsCount,
    );
    if (beatStepsInput) beatStepsInput.value = String(beatSteps);
    if (beatStepsOut) beatStepsOut.value = String(beatSteps);

    for (const track of tracks.values()) {
      buildGrid(track);
      renderTrack(track);
    }
    renderSamplePadGrid();
    renderSamplePadRoll();
  }

  function renderTrackControls(track) {
    const state = getOrInitState(track.key);

    track.el.classList.toggle("is-muted", state.muted);
    track.el.classList.toggle("is-solo", state.solo);
    track.el.classList.toggle("is-grid-collapsed", state.gridCollapsed);
    track.el.classList.toggle("is-seq-roll", state.seqMode === "roll");
    track.el.classList.toggle("is-seq-single", state.seqMode !== "roll");
    track.el.classList.toggle(
      "is-note-hold",
      normalizeNoteMode(state.noteMode, "one-shot") === "hold",
    );
    track.button.classList.toggle("is-muted", state.muted);

    track.muteBtn.setAttribute("aria-pressed", state.muted ? "true" : "false");
    track.soloBtn.setAttribute("aria-pressed", state.solo ? "true" : "false");

    track.soundSelect.value = state.sound;

    const pitchParts = midiToNoteParts(state.pitch);
    track.pitchNoteSelect.value = String(pitchParts.noteIndex);
    track.pitchOctaveOut.value = String(pitchParts.octave);

    const tuneCents = clampNumber(
      numberOrFallback(state.tuneCents, 0),
      -100,
      100,
    );
    const effectivePitch = effectiveMidiForSound(state.sound, state.pitch);
    const effectiveName = midiToNoteName(effectivePitch);
    const tuneSuffix = tuneCents
      ? ` (${tuneCents > 0 ? "+" : ""}${tuneCents}c)`
      : "";
    track.pitchNoteSelect.title = effectiveName + tuneSuffix;
    track.pitchOctaveOut.title = effectiveName + tuneSuffix;

    track.tuneInput.value = String(tuneCents);
    track.tuneOut.value = String(tuneCents);

    const dual = getDualOscParams(state);
    track.oscBlendInput.value = String(dual.oscBlend);
    track.oscBlendOut.value = String(dual.oscBlend);
    track.osc1WaveSelect.value = dual.osc1Wave;
    track.osc1LevelInput.value = String(dual.osc1Level);
    track.osc1LevelOut.value = String(dual.osc1Level);
    track.osc1OctaveInput.value = String(dual.osc1Octave);
    track.osc1OctaveOut.value = String(dual.osc1Octave);
    track.osc1DetuneInput.value = String(dual.osc1Detune);
    track.osc1DetuneOut.value = String(dual.osc1Detune);
    track.osc2WaveSelect.value = dual.osc2Wave;
    track.osc2LevelInput.value = String(dual.osc2Level);
    track.osc2LevelOut.value = String(dual.osc2Level);
    track.osc2OctaveInput.value = String(dual.osc2Octave);
    track.osc2OctaveOut.value = String(dual.osc2Octave);
    track.osc2DetuneInput.value = String(dual.osc2Detune);
    track.osc2DetuneOut.value = String(dual.osc2Detune);

    const showDualFields = state.sound === DUAL_OSC_SOUND;
    const activeDualTab =
      state.dualTab === "osc1" || state.dualTab === "osc2" ? state.dualTab : "main";

    track.dualTabBar.hidden = !showDualFields;
    track.dualTabOsc1Btn.setAttribute(
      "aria-pressed",
      showDualFields && activeDualTab === "osc1" ? "true" : "false",
    );
    track.dualTabOsc2Btn.setAttribute(
      "aria-pressed",
      showDualFields && activeDualTab === "osc2" ? "true" : "false",
    );
    track.dualTabMainBtn.setAttribute(
      "aria-pressed",
      showDualFields && activeDualTab === "main" ? "true" : "false",
    );

    const showOsc1Tab = showDualFields && activeDualTab === "osc1";
    const showOsc2Tab = showDualFields && activeDualTab === "osc2";
    const showMainTab = !showDualFields || activeDualTab === "main";

    track.oscBlendField.hidden = !(showDualFields && showMainTab);
    track.osc1WaveField.hidden = !showOsc1Tab;
    track.osc1LevelField.hidden = !showOsc1Tab;
    track.osc1OctaveField.hidden = !showOsc1Tab;
    track.osc1DetuneField.hidden = !showOsc1Tab;
    track.osc2WaveField.hidden = !showOsc2Tab;
    track.osc2LevelField.hidden = !showOsc2Tab;
    track.osc2OctaveField.hidden = !showOsc2Tab;
    track.osc2DetuneField.hidden = !showOsc2Tab;

    track.seqModeField.hidden = !showMainTab;
    track.noteModeField.hidden = !showMainTab;
    track.pitchField.hidden = !showMainTab;
    track.tuneField.hidden = !showMainTab;
    track.offsetField.hidden = !showMainTab;
    track.holdField.hidden = !showMainTab;
    track.attackField.hidden = !showMainTab;
    track.decayField.hidden = !showMainTab;
    track.sustainField.hidden = !showMainTab;
    track.releaseField.hidden = !showMainTab;
    track.swingField.hidden = !showMainTab;

    if (!autoExpandEnabled) {
      track.el.classList.remove("is-hover-peek");
    } else if (
      state.collapsed &&
      window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      track.el.matches(":hover")
    ) {
      track.el.classList.add("is-hover-peek");
    }

    track.holdInput.value = String(state.hold);
    track.holdOut.value = String(state.hold);

    track.volumeInput.value = String(state.volume);
    track.volumeOut.value = String(state.volume);

    track.panInput.value = String(state.pan);
    track.panOut.value = String(state.pan);

    track.swingInput.value = String(state.swing);
    track.swingOut.value = String(state.swing);

    track.offsetInput.value = String(state.offsetMs);
    track.offsetOut.value = String(state.offsetMs);

    track.attackInput.value = String(state.attack);
    track.attackOut.value = String(state.attack);

    track.decayInput.value = String(state.decay);
    track.decayOut.value = String(state.decay);

    track.sustainInput.value = String(state.sustain);
    track.sustainOut.value = String(state.sustain);

    track.releaseInput.value = String(state.release);
    track.releaseOut.value = String(state.release);

    if (track.notesToggleBtn) {
      track.notesToggleBtn.setAttribute(
        "aria-pressed",
        state.gridCollapsed ? "false" : "true",
      );
      track.notesToggleBtn.title = state.gridCollapsed
        ? "grid: hidden"
        : "grid: shown";
    }

    if (track.seqModeSelect) {
      track.seqModeSelect.value = state.seqMode === "roll" ? "roll" : "single";
    }
    if (track.noteModeSelect) {
      track.noteModeSelect.value = normalizeNoteMode(state.noteMode, "one-shot");
    }

    renderTrackRollLabels(track);
  }

  function renderTrack(track) {
    renderTrackControls(track);
    renderTrackGrid(track);
  }

  function buildGrid(track) {
    track.el.style.setProperty("--steps", String(stepsCount));
    if (track.rollLabels) track.rollLabels.innerHTML = "";
    if (track.rollRows) track.rollRows.innerHTML = "";

    track.noteLabelEls = new Array(NOTE_ROWS);
    track.stepButtonsByRow = new Array(NOTE_ROWS);
    track.stepButtons = [];

    const state = getOrInitState(track.key);
    const basePitch = numberOrFallback(state.pitch, 60);
    const groupLen = clampNumber(
      Math.round(numberOrFallback(beatSteps, 4)),
      1,
      stepsCount,
    );

    const rowsToBuild =
      state.seqMode === "roll"
        ? Array.from({ length: NOTE_ROWS }, (_, i) => NOTE_ROWS - 1 - i)
        : [0];
    const beatRow = rowsToBuild[0];

    if (track.rollLabels) {
      const labelSpacer = document.createElement("div");
      labelSpacer.className = "trackRollLabelSpacerTop";
      labelSpacer.setAttribute("aria-hidden", "true");
      track.rollLabels.appendChild(labelSpacer);
    }

    // Beat number header row (above all step rows)
    const beatHeaderEl = document.createElement("div");
    beatHeaderEl.className = "trackBeatHeader";
    beatHeaderEl.setAttribute("aria-hidden", "true");
    for (let i = 0; i < stepsCount; i += 1) {
      const numEl = document.createElement("div");
      numEl.className = "trackBeatHeaderNum";
      if (i % groupLen === 0) {
        numEl.textContent = String(Math.floor(i / groupLen) + 1);
      }
      beatHeaderEl.appendChild(numEl);
      const isBeatBreak = (i + 1) % groupLen === 0 && i !== stepsCount - 1;
      if (isBeatBreak) {
        const sp = document.createElement("div");
        sp.className = "trackBeatHeaderSpacer";
        sp.setAttribute("aria-hidden", "true");
        beatHeaderEl.appendChild(sp);
      }
    }
    if (track.rollRows) track.rollRows.appendChild(beatHeaderEl);

    for (const row of rowsToBuild) {
      const labelEl = document.createElement("div");
      labelEl.className = "trackRollLabel";
      labelEl.dataset.row = String(row);
      labelEl.tabIndex = 0;
      labelEl.setAttribute("role", "button");
      labelEl.setAttribute("aria-label", "play note preview");
      const midi = clampNumber(basePitch + row, PITCH_MIN, PITCH_MAX);
      labelEl.textContent = midiToNoteName(midi);
      labelEl.addEventListener("pointerdown", (event) => {
        if (event && event.button !== 0) return;
        track.rollPreviewDragActive = true;
        track.rollPreviewLastRow = null;
        if (typeof track.previewRollRow === "function") {
          track.previewRollRow(row, event);
        }
      });
      labelEl.addEventListener("keydown", (event) => {
        if (!event) return;
        if (event.key !== "Enter" && event.key !== " ") return;
        if (typeof track.previewRollRow === "function") {
          track.previewRollRow(row, event);
        }
      });
      track.noteLabelEls[row] = labelEl;
      if (track.rollLabels) track.rollLabels.appendChild(labelEl);

      const rowEl = document.createElement("div");
      rowEl.className = "trackRollRow";
      rowEl.dataset.row = String(row);

      const rowButtons = new Array(stepsCount);

      for (let i = 0; i < stepsCount; i += 1) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "step";
        btn.dataset.step = String(i);
        btn.dataset.row = String(row);
        if (row === beatRow && i % groupLen === 0) {
          btn.dataset.beat = String(Math.floor(i / groupLen) + 1);
        }
        if (i > 0 && i % groupLen === 0) {
          btn.dataset.beatBreakBefore = "true";
        }
        btn.setAttribute("aria-pressed", "false");

        rowButtons[i] = btn;
        rowEl.appendChild(btn);

        const isBeatBreak = (i + 1) % groupLen === 0 && i !== stepsCount - 1;
        if (isBeatBreak) {
          const spacer = document.createElement("div");
          spacer.className = "beatSpacer";
          spacer.dataset.beat = String(Math.floor((i + 1) / groupLen) + 1);
          spacer.setAttribute("aria-hidden", "true");
          rowEl.appendChild(spacer);
        }
      }

      track.stepButtonsByRow[row] = rowButtons;
      if (row === beatRow) track.stepButtons = rowButtons;

      if (track.rollRows) track.rollRows.appendChild(rowEl);
    }
  }

  function createTrack(button) {
    const key = button.dataset.key;
    const letter = button.dataset.letter || button.textContent || "";
    if (!key) return null;

    const state = getOrInitState(key);
    const accentRaw = getAccentFromLetter(button);
    const accent = softenAccentColor(accentRaw);

    const el = document.createElement("section");
    el.className = "track";
    el.dataset.key = key;
    el.style.setProperty("--accent", accent);

    const header = document.createElement("div");
    header.className = "trackHeader";

    const topBar = document.createElement("div");
    topBar.className = "trackTopBar";

    const reorderHandle = document.createElement("button");
    reorderHandle.type = "button";
    reorderHandle.className = "caret trackReorderHandle";
    reorderHandle.textContent = "≡";
    reorderHandle.setAttribute("aria-label", "drag to reorder sequence");
    reorderHandle.title = "drag to reorder";

    const soundSelect = document.createElement("select");
    soundSelect.className = "trackSound trackInstrumentSelect";
    soundSelect.setAttribute("aria-label", "instrument");
    for (const opt of SOUND_OPTIONS) {
      const optionEl = document.createElement("option");
      optionEl.value = opt.value;
      optionEl.textContent = opt.label;
      soundSelect.appendChild(optionEl);
    }

    const title = document.createElement("div");
    title.className = "trackTitle";
    const titleLetter = document.createElement("span");
    titleLetter.className = "trackLetter";
    titleLetter.textContent = letter;
    title.appendChild(titleLetter);
    title.appendChild(soundSelect);

    const mainControls = document.createElement("div");
    mainControls.className = "trackMainControls";

    const volumeRow = document.createElement("div");
    volumeRow.className = "controls trackVolumeRow";

    const panRow = document.createElement("div");
    panRow.className = "controls trackPanRow";

    const actionControls = document.createElement("div");
    actionControls.className = "controls trackActionControls";

    const muteBtn = document.createElement("button");
    muteBtn.type = "button";
    muteBtn.className = "btn btn-toggle";
    muteBtn.dataset.action = "mute";
    muteBtn.textContent = "mute";

    const soloBtn = document.createElement("button");
    soloBtn.type = "button";
    soloBtn.className = "btn btn-toggle";
    soloBtn.dataset.action = "solo";
    soloBtn.textContent = "solo";

    const collapseBtn = document.createElement("button");
    collapseBtn.type = "button";
    collapseBtn.className = "caret trackCaret";
    collapseBtn.textContent = "▿";
    collapseBtn.setAttribute("aria-label", "collapse sequence");
    collapseBtn.setAttribute("aria-expanded", "true");

    const notesToggleBtn = document.createElement("button");
    notesToggleBtn.type = "button";
    notesToggleBtn.className = "caret trackNotesToggleBtn";
    notesToggleBtn.textContent = "▦";
    notesToggleBtn.setAttribute("aria-label", "toggle grid");
    notesToggleBtn.setAttribute("aria-pressed", "false");

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn";
    deleteBtn.textContent = "delete";
    deleteBtn.setAttribute("aria-label", "delete track");

    const clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.className = "btn";
    clearBtn.textContent = "clear";
    clearBtn.setAttribute("aria-label", "clear notes");

    const pitchField = document.createElement("label");
    pitchField.className = "field pitchField";
    const pitchLabel = document.createElement("span");
    pitchLabel.className = "fieldLabel";
    pitchLabel.textContent = "note";

    const pitchControls = document.createElement("div");
    pitchControls.className = "pitchControls";

    const pitchNoteSelect = document.createElement("select");
    pitchNoteSelect.className = "noteSelect";
    pitchNoteSelect.setAttribute("aria-label", "note");
    for (let i = 0; i < NOTE_NAMES.length; i += 1) {
      const optionEl = document.createElement("option");
      optionEl.value = String(i);
      optionEl.textContent = NOTE_NAMES[i];
      pitchNoteSelect.appendChild(optionEl);
    }

    const pitchOctTag = document.createElement("span");
    pitchOctTag.className = "fieldLabel pitchInlineLabel";
    pitchOctTag.textContent = "octave";
    pitchOctTag.setAttribute("aria-hidden", "true");

    const pitchOctaveDownBtn = document.createElement("button");
    pitchOctaveDownBtn.type = "button";
    pitchOctaveDownBtn.className = "btn";
    pitchOctaveDownBtn.textContent = "-";
    pitchOctaveDownBtn.setAttribute("aria-label", "octave down");

    const pitchOctaveOut = document.createElement("input");
    pitchOctaveOut.className = "num";
    pitchOctaveOut.type = "number";
    pitchOctaveOut.step = "1";
    pitchOctaveOut.min = String(midiToNoteParts(PITCH_MIN).octave);
    pitchOctaveOut.max = String(midiToNoteParts(PITCH_MAX).octave);
    pitchOctaveOut.setAttribute("aria-label", "octave");

    const pitchOctaveUpBtn = document.createElement("button");
    pitchOctaveUpBtn.type = "button";
    pitchOctaveUpBtn.className = "btn";
    pitchOctaveUpBtn.textContent = "+";
    pitchOctaveUpBtn.setAttribute("aria-label", "octave up");

    const octaveControls = document.createElement("div");
    octaveControls.className = "octaveControls";
    octaveControls.appendChild(pitchOctaveDownBtn);
    octaveControls.appendChild(pitchOctaveOut);
    octaveControls.appendChild(pitchOctaveUpBtn);

    const octaveGroup = document.createElement("div");
    octaveGroup.className = "octaveGroup";
    octaveGroup.appendChild(pitchOctTag);
    octaveGroup.appendChild(octaveControls);

    pitchControls.appendChild(pitchNoteSelect);
    pitchControls.appendChild(octaveGroup);

    pitchField.appendChild(pitchLabel);
    pitchField.appendChild(pitchControls);

    const seqModeField = document.createElement("label");
    seqModeField.className = "field seqModeField";
    const seqModeLabel = document.createElement("span");
    seqModeLabel.className = "fieldLabel";
    seqModeLabel.textContent = "mode";
    const seqModeSelect = document.createElement("select");
    seqModeSelect.className = "seqModeSelect";
    seqModeSelect.setAttribute("aria-label", "sequencer mode");
    {
      const optSingle = document.createElement("option");
      optSingle.value = "single";
      optSingle.textContent = "single note";
      const optRoll = document.createElement("option");
      optRoll.value = "roll";
      optRoll.textContent = "piano roll";
      seqModeSelect.appendChild(optSingle);
      seqModeSelect.appendChild(optRoll);
    }
    const seqModeSpacer = document.createElement("span");
    seqModeSpacer.setAttribute("aria-hidden", "true");
    seqModeField.appendChild(seqModeLabel);
    seqModeField.appendChild(seqModeSelect);
    seqModeField.appendChild(seqModeSpacer);

    const noteModeField = document.createElement("label");
    noteModeField.className = "field noteModeField";
    const noteModeLabel = document.createElement("span");
    noteModeLabel.className = "fieldLabel";
    noteModeLabel.textContent = "length";
    const noteModeSelect = document.createElement("select");
    noteModeSelect.className = "noteModeSelect";
    noteModeSelect.setAttribute("aria-label", "note mode");
    {
      const optOneShot = document.createElement("option");
      optOneShot.value = "one-shot";
      optOneShot.textContent = "one-shot";
      const optHold = document.createElement("option");
      optHold.value = "hold";
      optHold.textContent = "hold note";
      noteModeSelect.appendChild(optOneShot);
      noteModeSelect.appendChild(optHold);
    }
    const noteModeSpacer = document.createElement("span");
    noteModeSpacer.setAttribute("aria-hidden", "true");
    noteModeField.appendChild(noteModeLabel);
    noteModeField.appendChild(noteModeSelect);
    noteModeField.appendChild(noteModeSpacer);

    const tuneField = document.createElement("label");
    tuneField.className = "field tuneField";
    const tuneLabel = document.createElement("span");
    tuneLabel.className = "fieldLabel";
    tuneLabel.textContent = "tune";
    const tuneInput = document.createElement("input");
    tuneInput.type = "range";
    tuneInput.min = "-100";
    tuneInput.max = "100";
    tuneInput.step = "1";
    const tuneOut = document.createElement("input");
    tuneOut.className = "num";
    tuneOut.type = "number";
    tuneOut.min = "-100";
    tuneOut.max = "100";
    tuneOut.step = "1";
    tuneField.appendChild(tuneLabel);
    tuneField.appendChild(tuneInput);
    tuneField.appendChild(tuneOut);

    function createStackWaveField(labelText, ariaLabel) {
      const field = document.createElement("label");
      field.className = "field";
      const label = document.createElement("span");
      label.className = "fieldLabel";
      label.textContent = labelText;
      const select = document.createElement("select");
      select.setAttribute("aria-label", ariaLabel);
      for (const wave of OSC_WAVE_OPTIONS) {
        const optionEl = document.createElement("option");
        optionEl.value = wave;
        optionEl.textContent = wave;
        select.appendChild(optionEl);
      }
      const spacer = document.createElement("span");
      spacer.setAttribute("aria-hidden", "true");
      field.appendChild(label);
      field.appendChild(select);
      field.appendChild(spacer);
      return { field, input: select, out: null };
    }

    function createStackRangeField(labelText, min, max, step, ariaLabel) {
      const field = document.createElement("label");
      field.className = "field";
      const label = document.createElement("span");
      label.className = "fieldLabel";
      label.textContent = labelText;
      const input = document.createElement("input");
      input.type = "range";
      input.min = String(min);
      input.max = String(max);
      input.step = String(step);
      input.setAttribute("aria-label", ariaLabel);
      const out = document.createElement("input");
      out.className = "num";
      out.type = "number";
      out.min = String(min);
      out.max = String(max);
      out.step = String(step);
      out.setAttribute("aria-label", ariaLabel);
      field.appendChild(label);
      field.appendChild(input);
      field.appendChild(out);
      return { field, input, out };
    }

    const dualTabBar = document.createElement("div");
    dualTabBar.className = "trackDualTabs";

    const dualTabOsc1Btn = document.createElement("button");
    dualTabOsc1Btn.type = "button";
    dualTabOsc1Btn.className = "btn";
    dualTabOsc1Btn.textContent = "oscillator 1";

    const dualTabOsc2Btn = document.createElement("button");
    dualTabOsc2Btn.type = "button";
    dualTabOsc2Btn.className = "btn";
    dualTabOsc2Btn.textContent = "oscillator 2";

    const dualTabMainBtn = document.createElement("button");
    dualTabMainBtn.type = "button";
    dualTabMainBtn.className = "btn";
    dualTabMainBtn.textContent = "mix";

    dualTabBar.appendChild(dualTabOsc1Btn);
    dualTabBar.appendChild(dualTabOsc2Btn);
    dualTabBar.appendChild(dualTabMainBtn);

    const oscBlendControls = createStackRangeField(
      "blend",
      -100,
      100,
      1,
      "osc blend",
    );
    const osc1WaveControls = createStackWaveField("wave", "oscillator 1 wave");
    const osc1LevelControls = createStackRangeField(
      "level",
      0,
      127,
      1,
      "oscillator 1 level",
    );
    const osc1OctaveControls = createStackRangeField(
      "octave",
      -2,
      2,
      1,
      "oscillator 1 octave",
    );
    const osc1DetuneControls = createStackRangeField(
      "tune",
      -100,
      100,
      1,
      "oscillator 1 tune cents",
    );
    const osc2WaveControls = createStackWaveField("wave", "oscillator 2 wave");
    const osc2LevelControls = createStackRangeField(
      "level",
      0,
      127,
      1,
      "oscillator 2 level",
    );
    const osc2OctaveControls = createStackRangeField(
      "octave",
      -2,
      2,
      1,
      "oscillator 2 octave",
    );
    const osc2DetuneControls = createStackRangeField(
      "tune",
      -100,
      100,
      1,
      "oscillator 2 tune cents",
    );

    const holdField = document.createElement("label");
    holdField.className = "field holdField";
    const holdLabel = document.createElement("span");
    holdLabel.className = "fieldLabel";
    holdLabel.textContent = "hold";
    const holdInput = document.createElement("input");
    holdInput.type = "range";
    holdInput.min = "0";
    holdInput.max = "100";
    holdInput.step = "1";
    const holdOut = document.createElement("input");
    holdOut.className = "num";
    holdOut.type = "number";
    holdOut.min = "0";
    holdOut.max = "100";
    holdOut.step = "1";
    holdField.appendChild(holdLabel);
    holdField.appendChild(holdInput);
    holdField.appendChild(holdOut);

    const volumeField = document.createElement("label");
    volumeField.className = "field volumeField";
    const volumeLabel = document.createElement("span");
    volumeLabel.className = "fieldLabel";
    volumeLabel.textContent = "volume";
    const volumeInput = document.createElement("input");
    volumeInput.type = "range";
    volumeInput.min = "0";
    volumeInput.max = "127";
    volumeInput.step = "1";
    const volumeOut = document.createElement("input");
    volumeOut.className = "num";
    volumeOut.type = "number";
    volumeOut.min = "0";
    volumeOut.max = "127";
    volumeOut.step = "1";
    volumeField.appendChild(volumeLabel);
    volumeField.appendChild(volumeInput);
    volumeField.appendChild(volumeOut);

    const panField = document.createElement("label");
    panField.className = "field panField";
    const panLabel = document.createElement("span");
    panLabel.className = "fieldLabel";
    panLabel.textContent = "pan";
    const panInput = document.createElement("input");
    panInput.type = "range";
    panInput.min = "-100";
    panInput.max = "100";
    panInput.step = "1";
    const panOut = document.createElement("input");
    panOut.className = "num";
    panOut.type = "number";
    panOut.min = "-100";
    panOut.max = "100";
    panOut.step = "1";
    panField.appendChild(panLabel);
    panField.appendChild(panInput);
    panField.appendChild(panOut);

    const swingField = document.createElement("label");
    swingField.className = "field swingField";
    const swingLabel = document.createElement("span");
    swingLabel.className = "fieldLabel";
    swingLabel.textContent = "swing";
    const swingInput = document.createElement("input");
    swingInput.type = "range";
    swingInput.min = "0";
    swingInput.max = "127";
    swingInput.step = "1";
    const swingOut = document.createElement("input");
    swingOut.className = "num";
    swingOut.type = "number";
    swingOut.min = "0";
    swingOut.max = "127";
    swingOut.step = "1";
    swingField.appendChild(swingLabel);
    swingField.appendChild(swingInput);
    swingField.appendChild(swingOut);

    const offsetField = document.createElement("label");
    offsetField.className = "field offsetField";
    const offsetLabel = document.createElement("span");
    offsetLabel.className = "fieldLabel";
    offsetLabel.textContent = "offset";
    const offsetInput = document.createElement("input");
    offsetInput.type = "range";
    offsetInput.min = "-100";
    offsetInput.max = "100";
    offsetInput.step = "1";
    const offsetOut = document.createElement("input");
    offsetOut.className = "num";
    offsetOut.type = "number";
    offsetOut.min = "-100";
    offsetOut.max = "100";
    offsetOut.step = "1";
    offsetField.appendChild(offsetLabel);
    offsetField.appendChild(offsetInput);
    offsetField.appendChild(offsetOut);

    const attackField = document.createElement("label");
    attackField.className = "field attackField";
    const attackLabel = document.createElement("span");
    attackLabel.className = "fieldLabel";
    attackLabel.textContent = "attack";
    const attackInput = document.createElement("input");
    attackInput.type = "range";
    attackInput.min = "0";
    attackInput.max = "127";
    attackInput.step = "1";
    const attackOut = document.createElement("input");
    attackOut.className = "num";
    attackOut.type = "number";
    attackOut.min = "0";
    attackOut.max = "127";
    attackOut.step = "1";
    attackField.appendChild(attackLabel);
    attackField.appendChild(attackInput);
    attackField.appendChild(attackOut);

    const decayField = document.createElement("label");
    decayField.className = "field decayField";
    const decayLabel = document.createElement("span");
    decayLabel.className = "fieldLabel";
    decayLabel.textContent = "decay";
    const decayInput = document.createElement("input");
    decayInput.type = "range";
    decayInput.min = "0";
    decayInput.max = "127";
    decayInput.step = "1";
    const decayOut = document.createElement("input");
    decayOut.className = "num";
    decayOut.type = "number";
    decayOut.min = "0";
    decayOut.max = "127";
    decayOut.step = "1";
    decayField.appendChild(decayLabel);
    decayField.appendChild(decayInput);
    decayField.appendChild(decayOut);

    const sustainField = document.createElement("label");
    sustainField.className = "field sustainField";
    const sustainLabel = document.createElement("span");
    sustainLabel.className = "fieldLabel";
    sustainLabel.textContent = "sustain";
    const sustainInput = document.createElement("input");
    sustainInput.type = "range";
    sustainInput.min = "0";
    sustainInput.max = "127";
    sustainInput.step = "1";
    const sustainOut = document.createElement("input");
    sustainOut.className = "num";
    sustainOut.type = "number";
    sustainOut.min = "0";
    sustainOut.max = "127";
    sustainOut.step = "1";
    sustainField.appendChild(sustainLabel);
    sustainField.appendChild(sustainInput);
    sustainField.appendChild(sustainOut);

    const releaseField = document.createElement("label");
    releaseField.className = "field releaseField";
    const releaseLabel = document.createElement("span");
    releaseLabel.className = "fieldLabel";
    releaseLabel.textContent = "release";
    const releaseInput = document.createElement("input");
    releaseInput.type = "range";
    releaseInput.min = "0";
    releaseInput.max = "127";
    releaseInput.step = "1";
    const releaseOut = document.createElement("input");
    releaseOut.className = "num";
    releaseOut.type = "number";
    releaseOut.min = "0";
    releaseOut.max = "127";
    releaseOut.step = "1";
    releaseField.appendChild(releaseLabel);
    releaseField.appendChild(releaseInput);
    releaseField.appendChild(releaseOut);

    volumeRow.appendChild(volumeField);
    panRow.appendChild(panField);

    const actionRight = document.createElement("div");
    actionRight.className = "trackActionRight";
    actionRight.appendChild(clearBtn);
    actionRight.appendChild(deleteBtn);

    actionControls.appendChild(notesToggleBtn);
    actionControls.appendChild(muteBtn);
    actionControls.appendChild(soloBtn);
    actionControls.appendChild(actionRight);

    mainControls.appendChild(volumeRow);
    mainControls.appendChild(panRow);
    mainControls.appendChild(actionControls);

    const sliderGrid = document.createElement("div");
    sliderGrid.className = "grid trackSliderGrid";
    sliderGrid.appendChild(dualTabBar);

    // Main sequencing layout: left column = mode/pitch/length/tune/offset/swing,
    // right column = attack/decay/sustain/release/hold.
    sliderGrid.appendChild(seqModeField);
    sliderGrid.appendChild(attackField);

    sliderGrid.appendChild(pitchField);
    sliderGrid.appendChild(decayField);

    sliderGrid.appendChild(noteModeField);
    sliderGrid.appendChild(sustainField);

    sliderGrid.appendChild(tuneField);
    sliderGrid.appendChild(releaseField);

    sliderGrid.appendChild(offsetField);
    sliderGrid.appendChild(holdField);

    sliderGrid.appendChild(swingField);

    sliderGrid.appendChild(oscBlendControls.field);
    sliderGrid.appendChild(osc1WaveControls.field);
    sliderGrid.appendChild(osc1LevelControls.field);
    sliderGrid.appendChild(osc1OctaveControls.field);
    sliderGrid.appendChild(osc1DetuneControls.field);
    sliderGrid.appendChild(osc2WaveControls.field);
    sliderGrid.appendChild(osc2LevelControls.field);
    sliderGrid.appendChild(osc2OctaveControls.field);
    sliderGrid.appendChild(osc2DetuneControls.field);

    function setCollapsed(collapsed) {
      el.classList.toggle("is-collapsed", Boolean(collapsed));
      collapseBtn.textContent = collapsed ? "▹" : "▿";
      collapseBtn.setAttribute("aria-expanded", collapsed ? "false" : "true");
      const s = getOrInitState(key);
      s.collapsed = Boolean(collapsed);
      if (!s.collapsed) {
        el.classList.remove("is-hover-peek");
      } else if (
        autoExpandEnabled &&
        window.matchMedia &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        el.matches(":hover")
      ) {
        el.classList.add("is-hover-peek");
      }
    }

    topBar.appendChild(reorderHandle);
    topBar.appendChild(title);
    topBar.appendChild(collapseBtn);

    header.appendChild(topBar);
    header.appendChild(mainControls);
    header.appendChild(sliderGrid);

    const roll = document.createElement("div");
    roll.className = "trackRoll";
    roll.setAttribute("aria-label", `${letter} notes`);

    const rollLabels = document.createElement("div");
    rollLabels.className = "trackRollLabels";

    const grid = document.createElement("div");
    grid.className = "trackGrid";
    grid.setAttribute("role", "group");
    grid.setAttribute("aria-label", `${letter} grid`);

    const rollRows = document.createElement("div");
    rollRows.className = "trackRollRows";
    grid.appendChild(rollRows);

    roll.appendChild(rollLabels);
    roll.appendChild(grid);

    grid.scrollLeft = sharedGridScrollLeft;
    grid.addEventListener("scroll", () => {
      syncGridScroll(grid, grid.scrollLeft);
    });

    el.appendChild(header);
    el.appendChild(roll);

    setCollapsed(Boolean(state.collapsed));

    const track = {
      key,
      letter,
      button,
      el,
      muteBtn,
      soloBtn,
      collapseBtn,
      notesToggleBtn,
      clearBtn,
      deleteBtn,
      soundSelect,
      volumeField,
      volumeInput,
      volumeOut,
      panField,
      panInput,
      panOut,
      swingField,
      swingInput,
      swingOut,
      offsetField,
      offsetInput,
      offsetOut,
      pitchField,
      pitchNoteSelect,
      pitchOctaveDownBtn,
      pitchOctaveOut,
      pitchOctaveUpBtn,
      seqModeField,
      seqModeSelect,
      noteModeField,
      noteModeSelect,
      tuneField,
      tuneInput,
      tuneOut,
      dualTabBar,
      dualTabOsc1Btn,
      dualTabOsc2Btn,
      dualTabMainBtn,
      oscBlendField: oscBlendControls.field,
      oscBlendInput: oscBlendControls.input,
      oscBlendOut: oscBlendControls.out,
      osc1WaveField: osc1WaveControls.field,
      osc1WaveSelect: osc1WaveControls.input,
      osc1LevelField: osc1LevelControls.field,
      osc1LevelInput: osc1LevelControls.input,
      osc1LevelOut: osc1LevelControls.out,
      osc1OctaveField: osc1OctaveControls.field,
      osc1OctaveInput: osc1OctaveControls.input,
      osc1OctaveOut: osc1OctaveControls.out,
      osc1DetuneField: osc1DetuneControls.field,
      osc1DetuneInput: osc1DetuneControls.input,
      osc1DetuneOut: osc1DetuneControls.out,
      osc2WaveField: osc2WaveControls.field,
      osc2WaveSelect: osc2WaveControls.input,
      osc2LevelField: osc2LevelControls.field,
      osc2LevelInput: osc2LevelControls.input,
      osc2LevelOut: osc2LevelControls.out,
      osc2OctaveField: osc2OctaveControls.field,
      osc2OctaveInput: osc2OctaveControls.input,
      osc2OctaveOut: osc2OctaveControls.out,
      osc2DetuneField: osc2DetuneControls.field,
      osc2DetuneInput: osc2DetuneControls.input,
      osc2DetuneOut: osc2DetuneControls.out,
      holdField,
      holdInput,
      holdOut,
      attackField,
      attackInput,
      attackOut,
      decayField,
      decayInput,
      decayOut,
      sustainField,
      sustainInput,
      sustainOut,
      releaseField,
      releaseInput,
      releaseOut,
      roll,
      rollLabels,
      rollRows,
      previewRollRow: null,
      rollPreviewDragActive: false,
      rollPreviewLastRow: null,
      rollPaintActive: false,
      rollPaintPointerId: null,
      rollPaintMode: null,
      rollPaintSuppressClick: false,
      rollPaintLastStep: null,
      rollPaintLastRow: null,
      rollPaintStartStep: null,
      rollPaintStartRow: null,
      rollPaintStartOn: false,
      rollPaintStartX: 0,
      rollPaintStartY: 0,
      rollPaintMoved: false,
      rollPaintStartAt: 0,
      rollPaintBasePattern: null,
      rollPaintBaseTies: null,
      rollPaintStretchAnchorStep: null,
      rollPaintStretchSourceStart: null,
      rollPaintStretchSourceEnd: null,
      noteLabelEls: [],
      stepButtonsByRow: [],
      grid,
      stepButtons: [],
    };

    track.previewRollRow = (row, event) => {
      if (!Number.isFinite(row)) return;
      const rowIndex = clampNumber(Math.round(row), 0, NOTE_ROWS - 1);
      if (track.rollPreviewLastRow === rowIndex) return;

      if (event && typeof event.preventDefault === "function")
        event.preventDefault();
      if (event && typeof event.stopPropagation === "function")
        event.stopPropagation();

      ensureAudio();
      if (!audio || !master) return;
      if (audio.state === "suspended") {
        audio.resume();
      }

      const s = getOrInitState(track.key);
      const rowMidi = clampNumber(
        numberOrFallback(s.pitch, 60) + rowIndex,
        PITCH_MIN,
        PITCH_MAX,
      );
      const tuneCents = clampNumber(
        numberOrFallback(s.tuneCents, 0),
        -100,
        100,
      );
      const pitchWithTune = clampNumber(
        rowMidi + tuneCents / 100,
        PITCH_MIN,
        PITCH_MAX,
      );
      const effectiveMidi = effectiveMidiForSound(s.sound, pitchWithTune);
      const frequency = midiToFrequency(effectiveMidi);
      const volume01 = clampNumber(numberOrFallback(s.volume, 100) / 127, 0, 1);
      const pan01 = clampNumber(numberOrFallback(s.pan, 0) / 100, -1, 1);
      const env = {
        attack: s.attack,
        hold: s.hold,
        decay: s.decay,
        sustain: s.sustain,
        release: s.release,
      };
      const stack = getDualOscParams(s);
      const noteMode = normalizeNoteMode(s.noteMode, "one-shot");
      const previewDuration = noteMode === "hold" ? 1.1 : 0.12;

      triggerSound(s.sound, audio.currentTime + 0.001, {
        duration: previewDuration,
        frequency,
        pitch: pitchWithTune,
        volume: volume01,
        pan: pan01,
        env,
        stack,
      });

      track.rollPreviewLastRow = rowIndex;
    };

    const stopRollPreviewDrag = () => {
      track.rollPreviewDragActive = false;
      track.rollPreviewLastRow = null;
    };

    rollLabels.addEventListener("pointermove", (event) => {
      if (!track.rollPreviewDragActive) return;
      if (!event || event.buttons === 0) {
        stopRollPreviewDrag();
        return;
      }

      const target = event.target instanceof Element ? event.target : null;
      const labelEl = target ? target.closest(".trackRollLabel") : null;
      if (!labelEl) return;
      const row = Number(labelEl.dataset.row);
      if (!Number.isFinite(row)) return;

      if (typeof track.previewRollRow === "function") {
        track.previewRollRow(row, event);
      }
    });

    rollLabels.addEventListener("pointerup", stopRollPreviewDrag);
    rollLabels.addEventListener("pointercancel", stopRollPreviewDrag);
    rollLabels.addEventListener("pointerleave", (event) => {
      if (event && event.buttons > 0) return;
      stopRollPreviewDrag();
    });

    muteBtn.addEventListener("click", () => {
      const s = getOrInitState(key);
      s.muted = !s.muted;
      renderTrackControls(track);
      updateSoloSuppression();
    });

    soloBtn.addEventListener("click", () => {
      const s = getOrInitState(key);
      s.solo = !s.solo;
      renderTrackControls(track);
      updateSoloSuppression();
    });

    collapseBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      setCollapsed(!el.classList.contains("is-collapsed"));
    });

    notesToggleBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      const s = getOrInitState(key);
      s.gridCollapsed = !s.gridCollapsed;
      renderTrackControls(track);
      scheduleSettingsPanelLayout();
    });

    seqModeSelect.addEventListener("change", () => {
      const s = getOrInitState(key);
      const nextMode = seqModeSelect.value === "roll" ? "roll" : "single";
      if (nextMode === s.seqMode) return;

      if (nextMode === "single") {
        const normalized = normalizePattern(s.pattern);
        s.pattern = normalized.map((m) =>
          clampNumber(Math.round(numberOrFallback(m, 0)), 0, NOTE_MASK_ALL)
            ? 1
            : 0,
        );
      }

      s.noteTies = normalizeNoteTies(s.noteTies, s.pattern);

      s.seqMode = nextMode;
      buildGrid(track);
      renderTrack(track);
      syncGridScroll(null, sharedGridScrollLeft);
      scheduleSettingsPanelLayout();
    });

    noteModeSelect.addEventListener("change", () => {
      const s = getOrInitState(key);
      s.noteMode = normalizeNoteMode(noteModeSelect.value, s.noteMode);
      renderTrackControls(track);
      renderTrackGrid(track);
    });

    const getStepButtonFromEvent = (event) => {
      const target = event && event.target instanceof Element ? event.target : null;
      const directBtn = target ? target.closest("button.step") : null;
      if (directBtn) return directBtn;

      if (
        event &&
        Number.isFinite(event.clientX) &&
        Number.isFinite(event.clientY)
      ) {
        const hovered = document.elementFromPoint(event.clientX, event.clientY);
        if (hovered instanceof Element) return hovered.closest("button.step");
      }
      return null;
    };

    const paintStepButton = (
      btn,
      paintMode,
      { linkFromStep = null, linkFromRow = null } = {},
    ) => {
      if (!btn || !paintMode) return;
      const stepIndex = Number(btn.dataset.step);
      const rowIndex = Number(btn.dataset.row);
      if (!Number.isFinite(stepIndex) || !Number.isFinite(rowIndex)) return;

      const s = getOrInitState(key);
      s.pattern = normalizePattern(s.pattern);
      const ties = normalizeNoteTies(s.noteTies, s.pattern).slice();
      const prev = clampNumber(
        Math.round(numberOrFallback(s.pattern[stepIndex], 0)),
        0,
        NOTE_MASK_ALL,
      );
      const bit = 1 << rowIndex;
      if (paintMode === "draw-linked") {
        let next = prev | bit;

        if (
          Number.isFinite(linkFromStep) &&
          Number.isFinite(linkFromRow) &&
          linkFromRow === rowIndex &&
          linkFromStep !== stepIndex
        ) {
          const from = Math.min(linkFromStep, stepIndex);
          const to = Math.max(linkFromStep, stepIndex);
          for (let i = from; i <= to; i += 1) {
            const m = clampNumber(
              Math.round(numberOrFallback(s.pattern[i], 0)),
              0,
              NOTE_MASK_ALL,
            );
            s.pattern[i] = m | bit;
            if (i > from) ties[i] = (ties[i] | bit) & NOTE_MASK_ALL;
          }
          next = clampNumber(
            Math.round(numberOrFallback(s.pattern[stepIndex], 0)),
            0,
            NOTE_MASK_ALL,
          );
        } else {
          ties[stepIndex] = (ties[stepIndex] & ~bit) & NOTE_MASK_ALL;
          s.pattern[stepIndex] = next;
        }

        if (next !== prev) {
          if (stepIndex + 1 < ties.length) {
            const nextMask = clampNumber(
              Math.round(numberOrFallback(s.pattern[stepIndex + 1], 0)),
              0,
              NOTE_MASK_ALL,
            );
            if ((nextMask & bit) !== 0 && !Number.isFinite(linkFromStep)) {
              ties[stepIndex + 1] = (ties[stepIndex + 1] & ~bit) & NOTE_MASK_ALL;
            }
          }
        }
      } else if (paintMode === "draw-single") {
        const next = prev | bit;
        s.pattern[stepIndex] = next;
        ties[stepIndex] = (ties[stepIndex] & ~bit) & NOTE_MASK_ALL;
        if (stepIndex + 1 < ties.length) {
          ties[stepIndex + 1] = (ties[stepIndex + 1] & ~bit) & NOTE_MASK_ALL;
        }
      } else {
        const next = prev & ~bit;
        if (next === prev) return;
        s.pattern[stepIndex] = next;
        ties[stepIndex] = (ties[stepIndex] & ~bit) & NOTE_MASK_ALL;
        if (stepIndex + 1 < ties.length) {
          ties[stepIndex + 1] = (ties[stepIndex + 1] & ~bit) & NOTE_MASK_ALL;
        }
      }

      s.noteTies = normalizeNoteTies(ties, s.pattern);
      renderTrackGrid(track);
    };

    const getStepButtonAt = (stepIndex, rowIndex) => {
      if (!Number.isFinite(stepIndex) || !Number.isFinite(rowIndex)) return null;
      const rows = Array.isArray(track.stepButtonsByRow) ? track.stepButtonsByRow : [];
      const rowButtons = rows[rowIndex];
      if (!Array.isArray(rowButtons)) return null;
      return rowButtons[stepIndex] || null;
    };

    const toggleStepButton = (btn) => {
      if (!btn) return;
      const stepIndex = Number(btn.dataset.step);
      const rowIndex = Number(btn.dataset.row);
      if (!Number.isFinite(stepIndex) || !Number.isFinite(rowIndex)) return;

      const s = getOrInitState(key);
      s.pattern = normalizePattern(s.pattern);
      const ties = normalizeNoteTies(s.noteTies, s.pattern).slice();
      const prev = clampNumber(
        Math.round(numberOrFallback(s.pattern[stepIndex], 0)),
        0,
        NOTE_MASK_ALL,
      );
      const bit = 1 << rowIndex;
      const next = prev ^ bit;
      s.pattern[stepIndex] = next;
      ties[stepIndex] = (ties[stepIndex] & ~bit) & NOTE_MASK_ALL;
      if (stepIndex + 1 < ties.length) {
        ties[stepIndex + 1] = (ties[stepIndex + 1] & ~bit) & NOTE_MASK_ALL;
      }
      s.noteTies = normalizeNoteTies(ties, s.pattern);
      renderTrackGrid(track);
    };

    const findRowSegmentBounds = (pattern, ties, rowBit, stepIndex) => {
      const safeStep = clampNumber(Math.round(stepIndex), 0, stepsCount - 1);
      if ((pattern[safeStep] & rowBit) === 0) {
        return { start: safeStep, end: safeStep };
      }

      let start = safeStep;
      while (
        start > 0 &&
        (pattern[start - 1] & rowBit) !== 0 &&
        (ties[start] & rowBit) !== 0
      ) {
        start -= 1;
      }

      let end = safeStep;
      while (
        end + 1 < stepsCount &&
        (pattern[end + 1] & rowBit) !== 0 &&
        (ties[end + 1] & rowBit) !== 0
      ) {
        end += 1;
      }

      return { start, end };
    };

    const applyStretchFromGesture = (targetStepRaw) => {
      if (
        !Number.isFinite(track.rollPaintStartRow) ||
        !Number.isFinite(track.rollPaintStretchAnchorStep)
      ) {
        return;
      }

      const s = getOrInitState(key);
      const rowIndex = clampNumber(Math.round(track.rollPaintStartRow), 0, NOTE_ROWS - 1);
      const bit = 1 << rowIndex;
      const targetStep = clampNumber(Math.round(targetStepRaw), 0, stepsCount - 1);

      const basePattern = Array.isArray(track.rollPaintBasePattern)
        ? track.rollPaintBasePattern.slice()
        : normalizePattern(s.pattern).slice();
      const baseTies = Array.isArray(track.rollPaintBaseTies)
        ? track.rollPaintBaseTies.slice()
        : normalizeNoteTies(s.noteTies, s.pattern).slice();

      const pattern = basePattern.slice();
      const ties = baseTies.slice();

      const sourceStart = Number.isFinite(track.rollPaintStretchSourceStart)
        ? clampNumber(Math.round(track.rollPaintStretchSourceStart), 0, stepsCount - 1)
        : null;
      const sourceEnd = Number.isFinite(track.rollPaintStretchSourceEnd)
        ? clampNumber(Math.round(track.rollPaintStretchSourceEnd), 0, stepsCount - 1)
        : null;

      if (sourceStart != null && sourceEnd != null) {
        for (let i = sourceStart; i <= sourceEnd; i += 1) {
          pattern[i] = pattern[i] & ~bit;
          ties[i] = ties[i] & ~bit;
        }
        ties[sourceStart] = ties[sourceStart] & ~bit;
        if (sourceEnd + 1 < ties.length) {
          ties[sourceEnd + 1] = ties[sourceEnd + 1] & ~bit;
        }
      }

      const anchorStep = clampNumber(
        Math.round(track.rollPaintStretchAnchorStep),
        0,
        stepsCount - 1,
      );
      const from = Math.min(anchorStep, targetStep);
      const to = Math.max(anchorStep, targetStep);

      for (let i = from; i <= to; i += 1) {
        pattern[i] = pattern[i] | bit;
        if (i > from) ties[i] = ties[i] | bit;
      }
      ties[from] = ties[from] & ~bit;
      if (to + 1 < ties.length) ties[to + 1] = ties[to + 1] & ~bit;

      s.pattern = normalizePattern(pattern);
      s.noteTies = normalizeNoteTies(ties, s.pattern);
      renderTrackGrid(track);
    };

    rollRows.addEventListener("pointerdown", (event) => {
      if (!event) return;
      const isTouch = String(event.pointerType || "") === "touch";
      if (!isTouch && event.button !== 0) return;

      const btn = getStepButtonFromEvent(event);
      if (!btn) return;

      const stepIndex = Number(btn.dataset.step);
      const rowIndex = Number(btn.dataset.row);
      if (!Number.isFinite(stepIndex) || !Number.isFinite(rowIndex)) return;

      const s = getOrInitState(key);
      s.pattern = normalizePattern(s.pattern);
      const prev = clampNumber(
        Math.round(numberOrFallback(s.pattern[stepIndex], 0)),
        0,
        NOTE_MASK_ALL,
      );
      const bit = 1 << rowIndex;
      track.rollPaintActive = false;
      track.rollPaintPointerId = event.pointerId;
      track.rollPaintMode = null;
      track.rollPaintSuppressClick = true;
      track.rollPaintLastStep = stepIndex;
      track.rollPaintLastRow = rowIndex;
      track.rollPaintStartStep = stepIndex;
      track.rollPaintStartRow = rowIndex;
      track.rollPaintStartOn = (prev & bit) !== 0;
      track.rollPaintMoved = false;
      track.rollPaintStartAt =
        typeof performance !== "undefined" && performance.now
          ? performance.now()
          : Date.now();
      track.rollPaintStartX = event.clientX;
      track.rollPaintStartY = event.clientY;
      track.rollPaintBasePattern = null;
      track.rollPaintBaseTies = null;
      track.rollPaintStretchAnchorStep = null;
      track.rollPaintStretchSourceStart = null;
      track.rollPaintStretchSourceEnd = null;
    });

    rollRows.addEventListener("pointermove", (event) => {
      if (!event || track.rollPaintPointerId !== event.pointerId) return;
      
      // If we don't have a pending paint ready, might be active from previous action
      if (String(event.pointerType || "") === "mouse" && event.buttons === 0) {
        track.rollPaintActive = false;
        track.rollPaintPointerId = null;
        track.rollPaintMode = null;
        track.rollPaintLastStep = null;
        track.rollPaintLastRow = null;
        track.rollPaintStartStep = null;
        track.rollPaintStartRow = null;
        track.rollPaintStartOn = false;
        track.rollPaintMoved = false;
        track.rollPaintStartAt = 0;
        track.rollPaintBasePattern = null;
        track.rollPaintBaseTies = null;
        track.rollPaintStretchAnchorStep = null;
        track.rollPaintStretchSourceStart = null;
        track.rollPaintStretchSourceEnd = null;
        return;
      }

      // Calculate movement distance
      const dx = Math.abs(event.clientX - track.rollPaintStartX);
      const dy = Math.abs(event.clientY - track.rollPaintStartY);

      // If not yet activated, check if this is scroll or draw intent
      if (!track.rollPaintActive) {
        const pointerType = String(event.pointerType || "").toLowerCase();
        const isTouchLike = pointerType === "touch" || pointerType === "pen";
        const scrollIntentDy = isTouchLike ? 12 : 15;
        const scrollIntentDx = isTouchLike ? 8 : 5;
        const paintDeadzone = isTouchLike ? 8 : 2;

        // Prefer vertical navigation on touch to avoid accidental paint while panning.
        if (dy > scrollIntentDy && dx < scrollIntentDx && dy > dx * 1.2) {
          track.rollPaintPointerId = null;
          return;
        }

        if (dx > paintDeadzone || dy > paintDeadzone) {
          track.rollPaintActive = true;
          // Determine mode based on what we're starting on
          if (track.rollPaintStartOn) {
            track.rollPaintMode = "erase";
            const startBtn = getStepButtonAt(
              track.rollPaintStartStep,
              track.rollPaintStartRow,
            );
            paintStepButton(startBtn, "erase");
          } else {
            track.rollPaintMode = "draw-single";
            const startBtn = getStepButtonAt(
              track.rollPaintStartStep,
              track.rollPaintStartRow,
            );
            paintStepButton(startBtn, "draw-single");
          }
        } else {
          // Still within deadzone, don't paint yet
          return;
        }
      }

      // Now we're actively painting
      const btn = getStepButtonFromEvent(event);
      if (!btn) return;

      const stepIndex = Number(btn.dataset.step);
      const rowIndex = Number(btn.dataset.row);
      if (!Number.isFinite(stepIndex) || !Number.isFinite(rowIndex)) return;

      if (
        !track.rollPaintMoved &&
        stepIndex === track.rollPaintStartStep &&
        rowIndex === track.rollPaintStartRow
      ) {
        return;
      }

      track.rollPaintMoved = true;

      paintStepButton(btn, track.rollPaintMode, {
        linkFromStep:
          track.rollPaintMode === "draw-linked" ? track.rollPaintLastStep : null,
        linkFromRow:
          track.rollPaintMode === "draw-linked" ? track.rollPaintLastRow : null,
      });
      if (Number.isFinite(stepIndex)) track.rollPaintLastStep = stepIndex;
      if (Number.isFinite(rowIndex)) track.rollPaintLastRow = rowIndex;
      event.preventDefault();
    });

    const stopRollPaint = (event) => {
      // Allow tap-to-toggle even if we never entered active paint mode
      const hasPending = track.rollPaintPointerId != null;
      if (!track.rollPaintActive && !hasPending) return;
      if (
        event &&
        track.rollPaintPointerId != null &&
        Number.isFinite(event.pointerId) &&
        track.rollPaintPointerId !== event.pointerId
      ) {
        return;
      }

      if (!track.rollPaintMoved) {
        const startBtn = getStepButtonAt(
          track.rollPaintStartStep,
          track.rollPaintStartRow,
        );
        toggleStepButton(startBtn);
      }

      track.rollPaintActive = false;
      track.rollPaintPointerId = null;
      track.rollPaintMode = null;
      track.rollPaintLastStep = null;
      track.rollPaintLastRow = null;
      track.rollPaintStartStep = null;
      track.rollPaintStartRow = null;
      track.rollPaintStartOn = false;
      track.rollPaintStartX = 0;
      track.rollPaintStartY = 0;
      track.rollPaintMoved = false;
      track.rollPaintStartAt = 0;
      track.rollPaintBasePattern = null;
      track.rollPaintBaseTies = null;
      track.rollPaintStretchAnchorStep = null;
      track.rollPaintStretchSourceStart = null;
      track.rollPaintStretchSourceEnd = null;
    };

    rollRows.addEventListener("pointerup", stopRollPaint);
    rollRows.addEventListener("pointercancel", stopRollPaint);
    rollRows.addEventListener("lostpointercapture", stopRollPaint);

    rollRows.addEventListener("click", (event) => {
      if (track.rollPaintSuppressClick) {
        track.rollPaintSuppressClick = false;
        return;
      }

      const target =
        event && event.target instanceof Element ? event.target : null;
      if (!target) return;
      const btn = target.closest("button.step");
      if (!btn) return;
      toggleStepButton(btn);
    });

    el.addEventListener("pointerenter", (event) => {
      if (!event || String(event.pointerType || "mouse") !== "mouse") return;
      if (!autoExpandEnabled) return;
      const s = getOrInitState(key);
      if (!s.collapsed) return;
      el.classList.add("is-hover-peek");
    });

    el.addEventListener("pointerleave", (event) => {
      if (!event || String(event.pointerType || "mouse") !== "mouse") return;
      el.classList.remove("is-hover-peek");
    });

    topBar.addEventListener("click", (event) => {
      if (suppressNextTrackTopBarToggle) return;
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;
      if (target.closest("button, input, select, textarea, label")) return;
      setCollapsed(!el.classList.contains("is-collapsed"));
    });

    deleteBtn.addEventListener("click", () => {
      removeTrack(button, { purgeState: true });
    });

    clearBtn.addEventListener("click", () => {
      const s = getOrInitState(key);
      const currentLen = Array.isArray(s.pattern) ? s.pattern.length : 0;
      const nextLen = clampNumber(
        Math.max(stepsCount, currentLen),
        stepsCount,
        MAX_STEPS,
      );
      s.pattern = new Array(nextLen).fill(0);
      s.noteTies = new Array(nextLen).fill(0);
      renderTrackGrid(track);
    });

    soundSelect.addEventListener("change", () => {
      const s = getOrInitState(key);
      const prevSound = s.sound;
      const prevMode = s.seqMode;
      const nextSound = normalizeSoundKind(soundSelect.value, prevSound);

      const prevEnvDefaults = getEnvDefaultsForSound(prevSound);
      const nextEnvDefaults = getEnvDefaultsForSound(nextSound);
      const prevSoundDefaults = getSoundDefaultsForSound(prevSound);
      const nextSoundDefaults = getSoundDefaultsForSound(nextSound);
      const envLooksDefault =
        s.attack === prevEnvDefaults.attack &&
        s.hold === prevEnvDefaults.hold &&
        s.decay === prevEnvDefaults.decay &&
        s.sustain === prevEnvDefaults.sustain &&
        s.release === prevEnvDefaults.release;

      const soundLooksDefault =
        s.pitch === prevSoundDefaults.pitch &&
        s.tuneCents === prevSoundDefaults.tuneCents &&
        s.volume === prevSoundDefaults.volume &&
        s.pan === prevSoundDefaults.pan &&
        s.swing === prevSoundDefaults.swing &&
        s.offsetMs === prevSoundDefaults.offsetMs &&
        s.muted === prevSoundDefaults.muted &&
        s.solo === prevSoundDefaults.solo &&
        s.collapsed === prevSoundDefaults.collapsed &&
        s.gridCollapsed === prevSoundDefaults.gridCollapsed &&
        s.seqMode === prevSoundDefaults.seqMode &&
        s.noteMode === prevSoundDefaults.noteMode &&
        s.osc1Wave === prevSoundDefaults.osc1Wave &&
        s.osc1Level === prevSoundDefaults.osc1Level &&
        s.osc1Octave === prevSoundDefaults.osc1Octave &&
        s.osc1Detune === prevSoundDefaults.osc1Detune &&
        s.osc2Wave === prevSoundDefaults.osc2Wave &&
        s.osc2Level === prevSoundDefaults.osc2Level &&
        s.osc2Octave === prevSoundDefaults.osc2Octave &&
        s.osc2Detune === prevSoundDefaults.osc2Detune &&
        s.oscBlend === prevSoundDefaults.oscBlend;

      s.sound = nextSound;
      if (envLooksDefault) {
        s.attack = nextEnvDefaults.attack;
        s.hold = nextEnvDefaults.hold;
        s.decay = nextEnvDefaults.decay;
        s.sustain = nextEnvDefaults.sustain;
        s.release = nextEnvDefaults.release;
      }
      if (soundLooksDefault) {
        s.pitch = nextSoundDefaults.pitch;
        s.tuneCents = nextSoundDefaults.tuneCents;
        s.volume = nextSoundDefaults.volume;
        s.pan = nextSoundDefaults.pan;
        s.swing = nextSoundDefaults.swing;
        s.offsetMs = nextSoundDefaults.offsetMs;
        s.muted = nextSoundDefaults.muted;
        s.solo = nextSoundDefaults.solo;
        s.collapsed = nextSoundDefaults.collapsed;
        s.gridCollapsed = nextSoundDefaults.gridCollapsed;
        s.seqMode = nextSoundDefaults.seqMode;
        s.noteMode = nextSoundDefaults.noteMode;
        s.osc1Wave = nextSoundDefaults.osc1Wave;
        s.osc1Level = nextSoundDefaults.osc1Level;
        s.osc1Octave = nextSoundDefaults.osc1Octave;
        s.osc1Detune = nextSoundDefaults.osc1Detune;
        s.osc2Wave = nextSoundDefaults.osc2Wave;
        s.osc2Level = nextSoundDefaults.osc2Level;
        s.osc2Octave = nextSoundDefaults.osc2Octave;
        s.osc2Detune = nextSoundDefaults.osc2Detune;
        s.oscBlend = nextSoundDefaults.oscBlend;
      }
      if (s.sound !== DUAL_OSC_SOUND) s.dualTab = "main";
      if (s.seqMode !== prevMode) {
        buildGrid(track);
        renderTrack(track);
        syncGridScroll(null, sharedGridScrollLeft);
        scheduleSettingsPanelLayout();
      } else {
        renderTrackControls(track);
        renderTrackGrid(track);
      }
    });

    function setDualTab(tab) {
      const s = getOrInitState(key);
      if (tab !== "osc1" && tab !== "osc2" && tab !== "main") return;
      s.dualTab = tab;
      renderTrackControls(track);
    }

    track.dualTabOsc1Btn.addEventListener("click", () => setDualTab("osc1"));
    track.dualTabOsc2Btn.addEventListener("click", () => setDualTab("osc2"));
    track.dualTabMainBtn.addEventListener("click", () => setDualTab("main"));

    volumeInput.addEventListener("input", () => {
      const s = getOrInitState(key);
      s.volume = clampNumber(numberOrFallback(volumeInput.value, 100), 0, 127);
      renderTrackControls(track);
    });

    volumeOut.addEventListener("input", () => {
      if (volumeOut.value === "") return;
      const s = getOrInitState(key);
      s.volume = clampNumber(
        numberOrFallback(volumeOut.value, s.volume),
        0,
        127,
      );
      volumeInput.value = String(s.volume);
      renderTrackControls(track);
    });

    offsetInput.addEventListener("input", () => {
      const s = getOrInitState(key);
      s.offsetMs = clampNumber(
        numberOrFallback(offsetInput.value, 0),
        -100,
        100,
      );
      renderTrackControls(track);
    });

    offsetOut.addEventListener("input", () => {
      if (offsetOut.value === "") return;
      const s = getOrInitState(key);
      s.offsetMs = clampNumber(
        numberOrFallback(offsetOut.value, s.offsetMs),
        -100,
        100,
      );
      offsetInput.value = String(s.offsetMs);
      renderTrackControls(track);
    });

    panInput.addEventListener("input", () => {
      const s = getOrInitState(key);
      s.pan = clampNumber(numberOrFallback(panInput.value, 0), -100, 100);
      renderTrackControls(track);
    });

    panOut.addEventListener("input", () => {
      if (panOut.value === "") return;
      const s = getOrInitState(key);
      s.pan = clampNumber(numberOrFallback(panOut.value, s.pan), -100, 100);
      panInput.value = String(s.pan);
      renderTrackControls(track);
    });

    swingInput.addEventListener("input", () => {
      const s = getOrInitState(key);
      s.swing = clampNumber(numberOrFallback(swingInput.value, 0), 0, 127);
      renderTrackControls(track);
    });

    swingOut.addEventListener("input", () => {
      if (swingOut.value === "") return;
      const s = getOrInitState(key);
      s.swing = clampNumber(numberOrFallback(swingOut.value, s.swing), 0, 127);
      swingInput.value = String(s.swing);
      renderTrackControls(track);
    });

    function setPitchFromParts(noteIndex, octave) {
      const midi = clampNumber(
        notePartsToMidi(noteIndex, octave),
        PITCH_MIN,
        PITCH_MAX,
      );
      const s = getOrInitState(key);
      s.pitch = midi;
      renderTrackControls(track);
    }

    pitchNoteSelect.addEventListener("change", () => {
      const s = getOrInitState(key);
      const { octave } = midiToNoteParts(s.pitch);
      setPitchFromParts(numberOrFallback(pitchNoteSelect.value, 0), octave);
    });

    pitchOctaveDownBtn.addEventListener("click", () => {
      const s = getOrInitState(key);
      const { noteIndex, octave } = midiToNoteParts(s.pitch);
      setPitchFromParts(noteIndex, octave - 1);
    });

    pitchOctaveUpBtn.addEventListener("click", () => {
      const s = getOrInitState(key);
      const { noteIndex, octave } = midiToNoteParts(s.pitch);
      setPitchFromParts(noteIndex, octave + 1);
    });

    pitchOctaveOut.addEventListener("input", () => {
      if (pitchOctaveOut.value === "") return;
      const s = getOrInitState(key);
      const { noteIndex } = midiToNoteParts(s.pitch);
      setPitchFromParts(noteIndex, numberOrFallback(pitchOctaveOut.value, 4));
    });

    tuneInput.addEventListener("input", () => {
      const s = getOrInitState(key);
      s.tuneCents = clampNumber(
        numberOrFallback(tuneInput.value, 0),
        -100,
        100,
      );
      renderTrackControls(track);
    });

    tuneOut.addEventListener("input", () => {
      if (tuneOut.value === "") return;
      const s = getOrInitState(key);
      s.tuneCents = clampNumber(
        numberOrFallback(tuneOut.value, s.tuneCents),
        -100,
        100,
      );
      tuneInput.value = String(s.tuneCents);
      renderTrackControls(track);
    });

    track.osc1WaveSelect.addEventListener("change", () => {
      const s = getOrInitState(key);
      s.osc1Wave = normalizeOscWave(track.osc1WaveSelect.value, s.osc1Wave);
      renderTrackControls(track);
    });

    track.osc1LevelInput.addEventListener("input", () => {
      const s = getOrInitState(key);
      s.osc1Level = clampNumber(
        numberOrFallback(track.osc1LevelInput.value, s.osc1Level),
        0,
        127,
      );
      renderTrackControls(track);
    });

    track.osc1LevelOut.addEventListener("input", () => {
      if (track.osc1LevelOut.value === "") return;
      const s = getOrInitState(key);
      s.osc1Level = clampNumber(
        numberOrFallback(track.osc1LevelOut.value, s.osc1Level),
        0,
        127,
      );
      track.osc1LevelInput.value = String(s.osc1Level);
      renderTrackControls(track);
    });

    track.osc1OctaveInput.addEventListener("input", () => {
      const s = getOrInitState(key);
      s.osc1Octave = clampNumber(
        numberOrFallback(track.osc1OctaveInput.value, s.osc1Octave),
        -2,
        2,
      );
      renderTrackControls(track);
    });

    track.osc1OctaveOut.addEventListener("input", () => {
      if (track.osc1OctaveOut.value === "") return;
      const s = getOrInitState(key);
      s.osc1Octave = clampNumber(
        numberOrFallback(track.osc1OctaveOut.value, s.osc1Octave),
        -2,
        2,
      );
      track.osc1OctaveInput.value = String(s.osc1Octave);
      renderTrackControls(track);
    });

    track.osc1DetuneInput.addEventListener("input", () => {
      const s = getOrInitState(key);
      s.osc1Detune = clampNumber(
        numberOrFallback(track.osc1DetuneInput.value, s.osc1Detune),
        -100,
        100,
      );
      renderTrackControls(track);
    });

    track.osc1DetuneOut.addEventListener("input", () => {
      if (track.osc1DetuneOut.value === "") return;
      const s = getOrInitState(key);
      s.osc1Detune = clampNumber(
        numberOrFallback(track.osc1DetuneOut.value, s.osc1Detune),
        -100,
        100,
      );
      track.osc1DetuneInput.value = String(s.osc1Detune);
      renderTrackControls(track);
    });

    track.osc2WaveSelect.addEventListener("change", () => {
      const s = getOrInitState(key);
      s.osc2Wave = normalizeOscWave(track.osc2WaveSelect.value, s.osc2Wave);
      renderTrackControls(track);
    });

    track.osc2LevelInput.addEventListener("input", () => {
      const s = getOrInitState(key);
      s.osc2Level = clampNumber(
        numberOrFallback(track.osc2LevelInput.value, s.osc2Level),
        0,
        127,
      );
      renderTrackControls(track);
    });

    track.osc2LevelOut.addEventListener("input", () => {
      if (track.osc2LevelOut.value === "") return;
      const s = getOrInitState(key);
      s.osc2Level = clampNumber(
        numberOrFallback(track.osc2LevelOut.value, s.osc2Level),
        0,
        127,
      );
      track.osc2LevelInput.value = String(s.osc2Level);
      renderTrackControls(track);
    });

    track.osc2OctaveInput.addEventListener("input", () => {
      const s = getOrInitState(key);
      s.osc2Octave = clampNumber(
        numberOrFallback(track.osc2OctaveInput.value, s.osc2Octave),
        -2,
        2,
      );
      renderTrackControls(track);
    });

    track.osc2OctaveOut.addEventListener("input", () => {
      if (track.osc2OctaveOut.value === "") return;
      const s = getOrInitState(key);
      s.osc2Octave = clampNumber(
        numberOrFallback(track.osc2OctaveOut.value, s.osc2Octave),
        -2,
        2,
      );
      track.osc2OctaveInput.value = String(s.osc2Octave);
      renderTrackControls(track);
    });

    track.osc2DetuneInput.addEventListener("input", () => {
      const s = getOrInitState(key);
      s.osc2Detune = clampNumber(
        numberOrFallback(track.osc2DetuneInput.value, s.osc2Detune),
        -100,
        100,
      );
      renderTrackControls(track);
    });

    track.osc2DetuneOut.addEventListener("input", () => {
      if (track.osc2DetuneOut.value === "") return;
      const s = getOrInitState(key);
      s.osc2Detune = clampNumber(
        numberOrFallback(track.osc2DetuneOut.value, s.osc2Detune),
        -100,
        100,
      );
      track.osc2DetuneInput.value = String(s.osc2Detune);
      renderTrackControls(track);
    });

    track.oscBlendInput.addEventListener("input", () => {
      const s = getOrInitState(key);
      s.oscBlend = clampNumber(
        numberOrFallback(track.oscBlendInput.value, s.oscBlend),
        -100,
        100,
      );
      renderTrackControls(track);
    });

    track.oscBlendOut.addEventListener("input", () => {
      if (track.oscBlendOut.value === "") return;
      const s = getOrInitState(key);
      s.oscBlend = clampNumber(
        numberOrFallback(track.oscBlendOut.value, s.oscBlend),
        -100,
        100,
      );
      track.oscBlendInput.value = String(s.oscBlend);
      renderTrackControls(track);
    });

    holdInput.addEventListener("input", () => {
      const s = getOrInitState(key);
      s.hold = clampNumber(numberOrFallback(holdInput.value, 0), 0, 100);
      renderTrackControls(track);
    });

    holdOut.addEventListener("input", () => {
      if (holdOut.value === "") return;
      const s = getOrInitState(key);
      s.hold = clampNumber(numberOrFallback(holdOut.value, s.hold), 0, 100);
      holdInput.value = String(s.hold);
      renderTrackControls(track);
    });

    attackInput.addEventListener("input", () => {
      const s = getOrInitState(key);
      s.attack = clampNumber(numberOrFallback(attackInput.value, 4), 0, 127);
      renderTrackControls(track);
    });

    attackOut.addEventListener("input", () => {
      if (attackOut.value === "") return;
      const s = getOrInitState(key);
      s.attack = clampNumber(
        numberOrFallback(attackOut.value, s.attack),
        0,
        127,
      );
      attackInput.value = String(s.attack);
      renderTrackControls(track);
    });

    decayInput.addEventListener("input", () => {
      const s = getOrInitState(key);
      s.decay = clampNumber(numberOrFallback(decayInput.value, 20), 0, 127);
      renderTrackControls(track);
    });

    decayOut.addEventListener("input", () => {
      if (decayOut.value === "") return;
      const s = getOrInitState(key);
      s.decay = clampNumber(numberOrFallback(decayOut.value, s.decay), 0, 127);
      decayInput.value = String(s.decay);
      renderTrackControls(track);
    });

    sustainInput.addEventListener("input", () => {
      const s = getOrInitState(key);
      s.sustain = clampNumber(numberOrFallback(sustainInput.value, 96), 0, 127);
      renderTrackControls(track);
    });

    sustainOut.addEventListener("input", () => {
      if (sustainOut.value === "") return;
      const s = getOrInitState(key);
      s.sustain = clampNumber(
        numberOrFallback(sustainOut.value, s.sustain),
        0,
        127,
      );
      sustainInput.value = String(s.sustain);
      renderTrackControls(track);
    });

    releaseInput.addEventListener("input", () => {
      const s = getOrInitState(key);
      s.release = clampNumber(numberOrFallback(releaseInput.value, 25), 0, 127);
      renderTrackControls(track);
    });

    releaseOut.addEventListener("input", () => {
      if (releaseOut.value === "") return;
      const s = getOrInitState(key);
      s.release = clampNumber(
        numberOrFallback(releaseOut.value, s.release),
        0,
        127,
      );
      releaseInput.value = String(s.release);
      renderTrackControls(track);
    });

    buildGrid(track);
    renderTrack(track);
    return track;
  }

  function addTrack(button, { insert = "prepend" } = {}) {
    const key = button.dataset.key;
    if (!key) return;
    if (tracks.size >= letters.length) return;
    if (tracks.has(key)) return;

    const track = createTrack(button);
    if (!track) return;

    tracks.set(key, track);
    if (insert === "append") tracksContainer.append(track.el);
    else tracksContainer.prepend(track.el);

    button.classList.add("is-selected");
    button.setAttribute("aria-pressed", "true");

    updateDawVisibility();
    updateSoloSuppression();
    syncGridScroll(null, sharedGridScrollLeft);
  }

  function removeTrack(button, { purgeState = false } = {}) {
    const key = button.dataset.key;
    if (!key) return;
    const track = tracks.get(key);
    if (!track) return;

    track.el.remove();
    tracks.delete(key);
    if (purgeState) states.delete(key);

    button.classList.remove("is-selected");
    button.classList.remove("is-muted");
    button.classList.remove("is-suppressed");
    button.setAttribute("aria-pressed", "false");

    updateDawVisibility();
    updateSoloSuppression();
    syncGridScroll(null, sharedGridScrollLeft);
  }

  function toggleTrack(button) {
    const key = button.dataset.key;
    if (!key) return;
    flashHit(button);
    if (tracks.has(key)) removeTrack(button);
    else addTrack(button);
  }

  function ensureAudio() {
    if (audio) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    audio = new Ctx();
    master = audio.createGain();
    master.gain.value = clampNumber(globalVolume / 127, 0, 1);
    master.connect(audio.destination);
  }

  function getNoiseBuffer() {
    if (noiseBuffer) return noiseBuffer;
    const bufferSize = audio.sampleRate;
    noiseBuffer = audio.createBuffer(1, bufferSize, audio.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i += 1) {
      data[i] = Math.random() * 2 - 1;
    }
    return noiseBuffer;
  }

  function triggerKick(
    time,
    { duration, volume = 1, pitch = 60, pan = 0, env } = {},
  ) {
    const osc = audio.createOscillator();
    const gain = audio.createGain();

    const pitchNorm = clampNumber((pitch - 24) / 60, 0, 1);
    const startHz = 90 + pitchNorm * 210;
    const endHz = 35 + pitchNorm * 75;

    const safeDuration = clampNumber(duration ?? 0.19, 0.05, 6.0);
    const freqRamp = Math.min(0.18, safeDuration * 0.8);
    const peak = Math.max(0.0001, 1.0 * volume);
    const safeEnv = env || { attack: 4, decay: 20, sustain: 96, release: 25 };

    osc.type = "sine";
    osc.frequency.setValueAtTime(startHz, time);
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(1, endHz),
      time + freqRamp,
    );

    const { endTime } = applyAdsr(gain.gain, time, safeDuration, peak, safeEnv);

    const panner = createPanNode(time, pan);

    osc.connect(gain);
    if (panner) gain.connect(panner);
    else gain.connect(master);

    osc.start(time);
    osc.stop(endTime + 0.05);
  }

  function triggerHat(
    time,
    { duration, volume = 1, pitch = 60, pan = 0, env } = {},
  ) {
    const src = audio.createBufferSource();
    src.buffer = getNoiseBuffer();
    src.loop = true;

    const pitchNorm = clampNumber((pitch - 24) / 60, 0, 1);
    const safeDuration = clampNumber(duration ?? 0.06, 0.02, 6.0);
    const peak = Math.max(0.0001, 0.35 * volume);
    const safeEnv = env || { attack: 4, decay: 20, sustain: 96, release: 25 };

    const hp = audio.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.setValueAtTime(4800 + pitchNorm * 9000, time);

    const gain = audio.createGain();
    const { endTime } = applyAdsr(gain.gain, time, safeDuration, peak, safeEnv);

    const panner = createPanNode(time, pan);

    src.connect(hp);
    hp.connect(gain);
    if (panner) gain.connect(panner);
    else gain.connect(master);

    src.start(time);
    src.stop(endTime + 0.05);
  }

  function triggerSnare(
    time,
    { duration, volume = 1, pitch = 60, pan = 0, env } = {},
  ) {
    const noise = audio.createBufferSource();
    noise.buffer = getNoiseBuffer();
    noise.loop = true;

    const pitchNorm = clampNumber((pitch - 24) / 60, 0, 1);
    const safeDuration = clampNumber(duration ?? 0.2, 0.05, 6.0);
    const noisePeak = Math.max(0.0001, 0.55 * volume);
    const tonePeak = Math.max(0.0001, 0.22 * volume);
    const safeEnv = env || { attack: 4, decay: 20, sustain: 96, release: 25 };

    const hp = audio.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.setValueAtTime(800 + pitchNorm * 2200, time);

    const noiseGain = audio.createGain();
    const noiseEnv = applyAdsr(
      noiseGain.gain,
      time,
      safeDuration,
      noisePeak,
      safeEnv,
    );

    const panner = createPanNode(time, pan);

    noise.connect(hp);
    hp.connect(noiseGain);
    if (panner) noiseGain.connect(panner);
    else noiseGain.connect(master);

    const osc = audio.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(140 + pitchNorm * 320, time);

    const oscGain = audio.createGain();
    const toneEnv = applyAdsr(
      oscGain.gain,
      time,
      safeDuration,
      tonePeak,
      safeEnv,
    );

    osc.connect(oscGain);
    if (panner) oscGain.connect(panner);
    else oscGain.connect(master);

    noise.start(time);
    noise.stop(Math.max(noiseEnv.endTime, toneEnv.endTime) + 0.05);
    osc.start(time);
    osc.stop(Math.max(noiseEnv.endTime, toneEnv.endTime) + 0.05);
  }

  function triggerTonalBlip(time, duration, frequency, volume, env, pan = 0) {
    const osc = audio.createOscillator();
    const gain = audio.createGain();

    const safeDuration = Math.max(0.04, duration);
    const peak = 0.25 * volume;

    osc.type = "square";
    osc.frequency.setValueAtTime(frequency, time);

    const { endTime } = applyAdsr(gain.gain, time, safeDuration, peak, env);

    const panner = createPanNode(time, pan);

    osc.connect(gain);
    if (panner) gain.connect(panner);
    else gain.connect(master);

    osc.start(time);
    osc.stop(endTime + 0.05);
  }

  function triggerBass(time, duration, frequency, volume, env, pan = 0) {
    const osc = audio.createOscillator();
    const filter = audio.createBiquadFilter();
    const gain = audio.createGain();

    const safeDuration = Math.max(0.05, duration);
    const peak = 0.7 * volume;

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(frequency, time);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(900, time);
    filter.frequency.exponentialRampToValueAtTime(
      160,
      time + Math.min(0.18, safeDuration),
    );

    const { endTime } = applyAdsr(gain.gain, time, safeDuration, peak, env);

    const panner = createPanNode(time, pan);

    osc.connect(filter);
    filter.connect(gain);
    if (panner) gain.connect(panner);
    else gain.connect(master);

    osc.start(time);
    osc.stop(endTime + 0.05);
  }

  function triggerDualOsc(time, duration, frequency, volume, env, pan = 0, stack = {}) {
    const safeDuration = Math.max(0.04, duration);
    const safeFrequency = Math.max(20, numberOrFallback(frequency, 440));
    const panner = createPanNode(time, pan);

    const blend = clampNumber(numberOrFallback(stack.oscBlend, 0), -100, 100) / 100;
    const osc1Base = clampNumber(numberOrFallback(stack.osc1Level, 127), 0, 127);
    const osc2Base = clampNumber(numberOrFallback(stack.osc2Level, 84), 0, 127);
    const osc1Level = osc1Base * (blend > 0 ? 1 - blend : 1);
    const osc2Level = osc2Base * (blend < 0 ? 1 + blend : 1);
    const totalLevel = osc1Level + osc2Level;
    if (totalLevel <= 0) return;

    const sharedGain = audio.createGain();
    const peak = 0.7 * volume;
    const { endTime } = applyAdsr(sharedGain.gain, time, safeDuration, peak, env);
    if (panner) sharedGain.connect(panner);
    else sharedGain.connect(master);

    const layers = [
      {
        wave: normalizeOscWave(stack.osc1Wave, "sawtooth"),
        level: osc1Level,
        octave: clampNumber(numberOrFallback(stack.osc1Octave, 0), -2, 2),
        detune: clampNumber(numberOrFallback(stack.osc1Detune, 0), -100, 100),
      },
      {
        wave: normalizeOscWave(stack.osc2Wave, "sine"),
        level: osc2Level,
        octave: clampNumber(numberOrFallback(stack.osc2Octave, 0), -2, 2),
        detune: clampNumber(numberOrFallback(stack.osc2Detune, 7), -100, 100),
      },
    ];

    for (const layer of layers) {
      if (layer.level <= 0) continue;
      const layerGain = audio.createGain();
      layerGain.gain.setValueAtTime(layer.level / totalLevel, time);

      const osc = audio.createOscillator();
      osc.type = layer.wave;
      const octaveRatio = Math.pow(2, layer.octave);
      const detuneRatio = Math.pow(2, layer.detune / 1200);
      osc.frequency.setValueAtTime(safeFrequency * octaveRatio * detuneRatio, time);
      osc.connect(layerGain);
      layerGain.connect(sharedGain);
      osc.start(time);
      osc.stop(endTime + 0.05);
    }
  }

  function triggerSound(
    kind,
    time,
    { duration, frequency, pitch, volume, pan, env, stack } = {},
  ) {
    if (!audio || !master) return;
    const v = clampNumber(volume ?? 1, 0, 1);
    if (v <= 0) return;

    if (kind === "kick")
      triggerKick(time, { duration, volume: v, pitch, pan, env });
    else if (kind === "snare")
      triggerSnare(time, { duration, volume: v, pitch, pan, env });
    else if (kind === "hat")
      triggerHat(time, { duration, volume: v, pitch, pan, env });
    else if (kind === "bass")
      triggerBass(time, duration ?? 0.15, frequency ?? 110, v, env, pan);
    else if (kind === DUAL_OSC_SOUND)
      triggerDualOsc(time, duration ?? 0.12, frequency ?? 440, v, env, pan, stack);
    else triggerTonalBlip(time, duration ?? 0.1, frequency ?? 440, v, env, pan);
  }

  function scheduleStep(stepIndex, time) {
    const msUntil = (time - audio.currentTime) * 1000;
    const secondsPerBeat = 60 / tempo;
    const stepDuration = secondsPerBeat / 4;
    const isOdd = stepIndex % 2 === 1;

    const soloed = Array.from(tracks.values()).some(
      (t) => getOrInitState(t.key).solo,
    );

    for (const track of tracks.values()) {
      const state = getOrInitState(track.key);
      const mask = clampNumber(
        Math.round(numberOrFallback(state.pattern[stepIndex], 0)),
        0,
        NOTE_MASK_ALL,
      );
      if (!mask) continue;

      const eligibleBySolo = !soloed || state.solo;
      const volume01 = clampNumber(state.volume / 127, 0, 1);
      const pan01 = clampNumber(state.pan / 100, -1, 1);
      const audible = eligibleBySolo && !state.muted && volume01 > 0;

      const combinedSwing = clampNumber(globalSwing + state.swing, 0, 127);
      const swingDelay = (combinedSwing / 127) * (stepDuration * 0.33);
      const offsetSeconds = numberOrFallback(state.offsetMs, 0) / 1000;
      const noteTimeRaw = time + (isOdd ? swingDelay : 0) + offsetSeconds;
      if (noteTimeRaw < audio.currentTime - 0.01) continue;
      const noteTime = Math.max(noteTimeRaw, audio.currentTime + 0.001);
      const msUntilNote = (noteTime - audio.currentTime) * 1000;

      const noteMode = normalizeNoteMode(state.noteMode, "one-shot");
      const holdNotes = noteMode === "hold";
      const tuneCents = clampNumber(
        numberOrFallback(state.tuneCents, 0),
        -100,
        100,
      );
      const basePitch = numberOrFallback(state.pitch, 60);

      const env = {
        attack: state.attack,
        hold: state.hold,
        decay: state.decay,
        sustain: state.sustain,
        release: state.release,
      };
      const stack = getDualOscParams(state);
      const ties = normalizeNoteTies(state.noteTies, state.pattern);

      const getMaskAt = (index) =>
        clampNumber(
          Math.round(numberOrFallback(state.pattern[index], 0)),
          0,
          NOTE_MASK_ALL,
        );

      const getTieAt = (index) =>
        clampNumber(
          Math.round(numberOrFallback(ties[index], 0)),
          0,
          NOTE_MASK_ALL,
        );

      const getRunLength = (startIndex, rowBit = 0) => {
        let len = 1;
        for (let i = startIndex + 1; i < stepsCount; i += 1) {
          const nextMask = getMaskAt(i);
          const nextTie = getTieAt(i);
          const active = rowBit ? (nextMask & rowBit) !== 0 : nextMask !== 0;
          const tied = rowBit ? (nextTie & rowBit) !== 0 : nextTie !== 0;
          if (!active || !tied) break;
          len += 1;
        }
        return len;
      };

      if (audible) {
        if (state.seqMode !== "roll") {
          if (holdNotes && getTieAt(stepIndex) !== 0) {
            continue;
          }
          const duration = stepDuration * (holdNotes ? getRunLength(stepIndex) : 1);
          const rowMidi = clampNumber(basePitch, PITCH_MIN, PITCH_MAX);
          const pitchWithTune = clampNumber(
            rowMidi + tuneCents / 100,
            PITCH_MIN,
            PITCH_MAX,
          );
          const effectiveMidi = effectiveMidiForSound(
            state.sound,
            pitchWithTune,
          );
          const frequency = midiToFrequency(effectiveMidi);
          triggerSound(state.sound, noteTime, {
            duration,
            frequency,
            pitch: pitchWithTune,
            volume: volume01,
            pan: pan01,
            env,
            stack,
          });
        } else {
          for (let row = 0; row < NOTE_ROWS; row += 1) {
            const rowBit = 1 << row;
            if ((mask & rowBit) === 0) continue;
            if (holdNotes && (getTieAt(stepIndex) & rowBit) !== 0) {
              continue;
            }
            const duration = stepDuration * (holdNotes ? getRunLength(stepIndex, rowBit) : 1);
            const rowMidi = clampNumber(basePitch + row, PITCH_MIN, PITCH_MAX);
            const pitchWithTune = clampNumber(
              rowMidi + tuneCents / 100,
              PITCH_MIN,
              PITCH_MAX,
            );
            const effectiveMidi = effectiveMidiForSound(
              state.sound,
              pitchWithTune,
            );
            const frequency = midiToFrequency(effectiveMidi);
            triggerSound(state.sound, noteTime, {
              duration,
              frequency,
              pitch: pitchWithTune,
              volume: volume01,
              pan: pan01,
              env,
              stack,
            });
          }
        }
      }

      if (eligibleBySolo) {
        window.setTimeout(
          () => {
            if (!isPlaying) return;
            if (audible || state.muted) {
              flashHit(track.button);
              flashTrack(track.el);
            }
          },
          Math.max(0, msUntilNote),
        );
      }
    }

    window.setTimeout(
      () => {
        if (!isPlaying) return;
        const prevUiStep = uiStep;
        uiStep = stepIndex;
        if (audio) uiStepStartedAt = audio.currentTime;
        updateTransportBar();
        startTransportRaf();
        updateTrackCurrentStepClasses(prevUiStep, uiStep);
      },
      Math.max(0, msUntil),
    );
  }

  function getMaxEarlyOffsetSeconds() {
    let maxEarly = 0;
    for (const track of tracks.values()) {
      const state = getOrInitState(track.key);
      const offsetSeconds = numberOrFallback(state.offsetMs, 0) / 1000;
      if (offsetSeconds < 0) maxEarly = Math.max(maxEarly, -offsetSeconds);
    }
    return maxEarly;
  }

  function nextStep() {
    const secondsPerBeat = 60 / tempo;
    const stepDuration = secondsPerBeat / 4;
    nextNoteTime += stepDuration;

    if (samplePadEnabled && samplePadTransportMode) {
      const total = getActiveTransportSteps();
      currentStep = (currentStep + 1) % total;
      return;
    }

    if (loopEnabled) {
      clampLoopRange();
      if (currentStep < loopStart || currentStep > loopEnd) {
        currentStep = loopStart;
      } else if (currentStep === loopEnd) {
        currentStep = loopStart;
      } else {
        currentStep += 1;
      }
      return;
    }

    currentStep = (currentStep + 1) % stepsCount;
  }

  function scheduler() {
    const maxEarly = getMaxEarlyOffsetSeconds();

    if (samplePadEnabled && samplePadTransportMode) {
      while (nextNoteTime < audio.currentTime + scheduleAheadTime + maxEarly) {
        scheduleSamplePadRollStep(currentStep, nextNoteTime, 60 / tempo / 4);
        nextStep();
      }
      return;
    }

    while (nextNoteTime < audio.currentTime + scheduleAheadTime + maxEarly) {
      scheduleStep(currentStep, nextNoteTime);
      nextStep();
    }
  }

  function updateTransportControls() {
    if (transportBar) {
      transportBar.dataset.playing = isPlaying ? "1" : "0";
      transportBar.dataset.mode =
        samplePadEnabled && samplePadTransportMode ? "pad" : "sequence";
    }
    syncSubtitlesUiVisibility();
    syncPadPlaybackChip();

    const hasTracks = tracks.size > 0;
    if (transportSettingsBtn) {
      transportSettingsBtn.disabled = !hasTracks;
      transportSettingsBtn.setAttribute(
        "aria-pressed",
        settingsOpen ? "true" : "false",
      );
    }
    if (transportPlayBtn) {
      transportPlayBtn.disabled = !hasTracks;
      transportPlayBtn.setAttribute(
        "aria-pressed",
        isPlaying ? "true" : "false",
      );
      transportPlayBtn.title = isPlaying ? "pause" : "play";
    }
    if (transportRestartBtn) {
      transportRestartBtn.disabled = !hasTracks;
    }
    if (transportSeekBtn) {
      transportSeekBtn.disabled = !hasTracks;
    }
  }

  function pause() {
    if (!isPlaying) return;

    if (samplePadEnabled && samplePadTransportMode) {
      pausedStep = uiStep >= 0 ? uiStep : currentStep;
      pausedStep = clampNumber(
        Math.round(numberOrFallback(pausedStep, 0)),
        0,
        Math.max(0, getActiveTransportSteps() - 1),
      );
    } else {
      pausedStep = uiStep >= 0 ? uiStep : currentStep;
      if (loopEnabled) {
        clampLoopRange();
        pausedStep = clampNumber(
          Math.round(numberOrFallback(pausedStep, loopStart)),
          loopStart,
          loopEnd,
        );
      } else {
        pausedStep = clampNumber(
          Math.round(numberOrFallback(pausedStep, 0)),
          0,
          stepsCount - 1,
        );
      }
    }

    currentStep = pausedStep;
    isPlaying = false;
    followCenterLock = false;

    if (scheduleTimer) {
      window.clearInterval(scheduleTimer);
      scheduleTimer = null;
    }

    uiStepStartedAt = null;
    uiStep = -1;
    renderAllTrackGrids();

    stopTransportRaf();
    updateTransportBar();

    updateTransportControls();
    syncStarBounceClass();
  }

  async function play() {
    ensureAudio();
    if (!audio) return;
    await audio.resume();
    if (isPlaying) return;
    if (tracks.size === 0) return;

    followCenterLock = false;

    isPlaying = true;
    clampLoopRange();

    if (samplePadEnabled && samplePadTransportMode) {
      if (pausedStep != null) {
        currentStep = clampNumber(
          Math.round(numberOrFallback(pausedStep, 0)),
          0,
          Math.max(0, getActiveTransportSteps() - 1),
        );
        pausedStep = null;
      } else {
        currentStep = hasManualSeek
          ? clampNumber(
              Math.round(numberOrFallback(currentStep, 0)),
              0,
              Math.max(0, getActiveTransportSteps() - 1),
            )
          : 0;
      }
    } else {
      if (pausedStep != null) {
        if (loopEnabled) {
          currentStep = clampNumber(
            Math.round(numberOrFallback(pausedStep, loopStart)),
            loopStart,
            loopEnd,
          );
        } else {
          currentStep = clampNumber(
            Math.round(numberOrFallback(pausedStep, 0)),
            0,
            stepsCount - 1,
          );
        }
        pausedStep = null;
      } else if (loopEnabled) {
        if (
          !hasManualSeek ||
          currentStep < loopStart ||
          currentStep > loopEnd
        ) {
          currentStep = loopStart;
        } else {
          currentStep = clampNumber(
            Math.round(numberOrFallback(currentStep, loopStart)),
            loopStart,
            loopEnd,
          );
        }
      } else {
        currentStep = hasManualSeek
          ? clampNumber(
              Math.round(numberOrFallback(currentStep, 0)),
              0,
              stepsCount - 1,
            )
          : 0;
      }
    }

    hasManualSeek = false;

    uiStep =
      samplePadEnabled && samplePadTransportMode
        ? clampNumber(
            Math.round(numberOrFallback(currentStep, 0)),
            0,
            Math.max(0, getActiveTransportSteps() - 1),
          )
        : clampNumber(
            Math.round(numberOrFallback(currentStep, 0)),
            0,
            stepsCount - 1,
          );
    uiStepStartedAt = audio.currentTime;
    nextNoteTime = audio.currentTime + 0.05;
    scheduleTimer = window.setInterval(scheduler, lookaheadMs);

    updateTransportBar();
    startTransportRaf();

    if (!(samplePadEnabled && samplePadTransportMode)) {
      scrollGridsToStep(uiStep, { behavior: "auto" });
    }

    renderAllTrackGrids();
    updateTransportControls();
    syncStarBounceClass();
  }

  function stop() {
    isPlaying = false;
    followCenterLock = false;
    if (scheduleTimer) {
      window.clearInterval(scheduleTimer);
      scheduleTimer = null;
    }

    clampLoopRange();
    if (samplePadEnabled && samplePadTransportMode) {
      currentStep = 0;
    } else {
      currentStep = loopEnabled ? loopStart : 0;
    }
    hasManualSeek = false;
    pausedStep = null;
    uiStepStartedAt = null;

    uiStep = -1;
    renderAllTrackGrids();

    stopTransportRaf();
    updateTransportBar();

    updateTransportControls();
    syncStarBounceClass();
  }

  function isShortcutTarget(target) {
    if (!target) return true;
    if (target.closest && target.closest(".daw")) return false;
    return true;
  }

  function isTypingTarget(target) {
    if (!(target instanceof Element)) return false;
    return Boolean(
      target.closest('input, textarea, select, [contenteditable="true"]'),
    );
  }

  let hasLazyLoadedDefault = false;
  function maybeLazyLoadDefaultSong() {
    if (hasLazyLoadedDefault) return false;
    hasLazyLoadedDefault = true;

    const defaultPreset = getDefaultPresetName();
    if (!defaultPreset) return false;
    const song = getPreset(defaultPreset);
    if (!song) return false;

    const ok = applySongObject(song);
    if (!ok) return false;

    presetNameInput.value = defaultPreset;
    refreshPresetSelect();
    presetSelect.value = defaultPreset;
    setPresetStatus("loaded");
    return true;
  }

  function focusLetter(index) {
    const button = letters[index];
    if (!button) return;
    button.focus({ preventScroll: true });
  }

  function toggleIndex(index) {
    const button = letters[index];
    if (!button) return;
    if (maybeLazyLoadDefaultSong()) return;
    toggleTrack(button);
    button.focus({ preventScroll: true });
  }

  for (const button of letters) {
    button.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse") return;
      event.preventDefault();
      button.dataset.skipClickOnce = "1";
      if (maybeLazyLoadDefaultSong()) return;
      toggleTrack(button);
    });

    button.addEventListener("click", () => {
      if (button.dataset.skipClickOnce === "1") {
        button.dataset.skipClickOnce = "0";
        return;
      }
      if (maybeLazyLoadDefaultSong()) return;
      toggleTrack(button);
    });
  }

  if (themeStarBtn) {
    themeStarBtn.setAttribute("aria-expanded", "false");
  }

  if (navToSamplerBtn) {
    navToSamplerBtn.addEventListener("click", () => {
      if (!tracks.size) return;
      setSamplerViewOpen(true);
    });
  }

  if (navToDawBtn) {
    navToDawBtn.addEventListener("click", () => {
      setSamplerViewOpen(false);
    });
  }

  if (themeModeBtn) {
    themeModeBtn.addEventListener("click", () => {
      setThemeEnabled(!themeEnabled);
    });
  }

  if (gradientAnimationToggleBtn) {
    gradientAnimationToggleBtn.addEventListener("click", () => {
      setGradientAnimationEnabled(!gradientAnimationEnabled);
    });
  }

  if (starBounceToggleBtn) {
    starBounceToggleBtn.addEventListener("click", () => {
      setStarBounceEnabled(!starBounceEnabled);
    });
  }

  if (starBounceAlwaysToggleBtn) {
    starBounceAlwaysToggleBtn.addEventListener("click", () => {
      setStarBounceAlwaysEnabled(!starBounceAlwaysEnabled);
    });
  }

  if (bumpToggleBtn) {
    bumpToggleBtn.addEventListener("click", () => {
      setBumpEnabled(!bumpEnabled);
    });
  }

  if (bumpIntensityInput) {
    bumpIntensityInput.addEventListener("input", () => {
      setBumpIntensity(bumpIntensityInput.value);
    });
  }

  if (bumpIntensityOut) {
    bumpIntensityOut.addEventListener("input", () => {
      if (bumpIntensityOut.value === "") return;
      setBumpIntensity(bumpIntensityOut.value);
    });
  }

  if (bumpHeightInput) {
    bumpHeightInput.addEventListener("input", () => {
      setBumpHeight(bumpHeightInput.value);
    });
  }

  if (bumpHeightOut) {
    bumpHeightOut.addEventListener("input", () => {
      if (bumpHeightOut.value === "") return;
      setBumpHeight(bumpHeightOut.value);
    });
  }

  if (bumpBounceInput) {
    bumpBounceInput.addEventListener("input", () => {
      setBumpBounce(bumpBounceInput.value);
    });
  }

  if (bumpBounceOut) {
    bumpBounceOut.addEventListener("input", () => {
      if (bumpBounceOut.value === "") return;
      setBumpBounce(bumpBounceOut.value);
    });
  }

  if (autoscrollToggleBtn) {
    autoscrollToggleBtn.addEventListener("click", () => {
      setAutoscrollEnabled(!autoscrollEnabled);
    });
  }

  if (themeStarBtn) {
    themeStarBtn.addEventListener("click", (event) => {
      event.preventDefault();
      if (Date.now() < suppressThemeStarClickUntil) return;

      if (!themeEnabled) {
        setThemeEnableModalOpen(true);
        return;
      }

      toggleThemePicker();
    });
  }

  if (themeEnableModal) {
    themeEnableModal.addEventListener("pointerdown", (event) => {
      if (event.target !== themeEnableModal) return;
      closeThemeEnableModal();
    });
  }

  if (themeEnableNoBtn) {
    themeEnableNoBtn.addEventListener("click", () => {
      closeThemeEnableModal();
    });
  }

  if (themeEnableYesBtn) {
    themeEnableYesBtn.addEventListener("click", () => {
      closeThemeEnableModal();
      setThemeEnabled(true);
      syncThemePickerInputs();
      setThemePickerOpen(true);
    });
  }

  if (themePicker) {
    themePicker.addEventListener("pointerdown", (event) => {
      if (event.target !== themePicker) return;
      suppressThemeStarClickUntil = Date.now() + 360;
      closeThemePicker();
    });
  }

  if (themeColorAInput) {
    themeColorAInput.addEventListener("input", () => {
      queueThemeColors(themeColorAInput.value, themeB);
    });

    themeColorAInput.addEventListener("change", () => {
      queueThemeColors(themeColorAInput.value, themeB, { immediate: true });
    });
  }

  if (themeColorBInput) {
    themeColorBInput.addEventListener("input", () => {
      queueThemeColors(themeA, themeColorBInput.value);
    });

    themeColorBInput.addEventListener("change", () => {
      queueThemeColors(themeA, themeColorBInput.value, { immediate: true });
    });
  }

  if (themeResetBtn) {
    themeResetBtn.addEventListener("click", () => {
      setThemeColors(DEFAULT_THEME_A, DEFAULT_THEME_B);
    });
  }

  if (themeSwapBtn) {
    themeSwapBtn.addEventListener("click", () => {
      setThemeColors(themeB, themeA);
    });
  }

  if (autoExpandToggleBtn) {
    autoExpandToggleBtn.addEventListener("click", () => {
      setAutoExpandEnabled(!autoExpandEnabled);
    });
  }

  if (autoExpandSpeedInput) {
    autoExpandSpeedInput.addEventListener("input", () => {
      setAutoExpandSpeed(autoExpandSpeedInput.value);
    });
  }

  if (autoExpandSpeedOut) {
    autoExpandSpeedOut.addEventListener("input", () => {
      if (autoExpandSpeedOut.value === "") return;
      setAutoExpandSpeed(autoExpandSpeedOut.value);
    });
  }

  if (transportPlayBtn) {
    transportPlayBtn.addEventListener("click", () => {
      if (tracks.size === 0) return;
      if (isPlaying) pause();
      else play();
    });
  }

  if (transportRestartBtn) {
    transportRestartBtn.addEventListener("click", () => {
      if (tracks.size === 0) return;
      clampLoopRange();
      const target =
        samplePadEnabled && samplePadTransportMode
          ? 0
          : loopEnabled
            ? loopStart
            : 0;
      seekToStep(target, { fromUser: true });
    });
  }

  if (transportSeekBtn) {
    transportSeekBtn.addEventListener("pointerdown", (event) => {
      if (event.button != null && event.button !== 0) return;
      if (tracks.size === 0) return;

      endTransportScrub();

      const requested = getSeekStepFromClientX(event.clientX);
      seekToStep(requested, { fromUser: true, viewStep: requested });
      if (!isPlaying) {
        previewStepAtTransport(requested);
      }

      const scrubStepMs = clampNumber((60 / tempo / 4) * 1000, 30, 320);

      const state = {
        pointerId: event.pointerId,
        lastStep: requested,
        holdRepeatTimer: null,
        onMove: null,
        onUp: null,
        onCancel: null,
      };

      state.onMove = (moveEvent) => {
        if (!transportScrubState) return;
        if (moveEvent.pointerId !== state.pointerId) return;
        const nextStep = getSeekStepFromClientX(moveEvent.clientX);
        if (nextStep === state.lastStep) return;

        const delta = nextStep - state.lastStep;
        const dir = delta > 0 ? 1 : -1;
        const span = Math.abs(delta);

        if (span <= 24) {
          for (
            let step = state.lastStep + dir;
            step !== nextStep + dir;
            step += dir
          ) {
            seekToStep(step, { fromUser: true, viewStep: step });
            if (!isPlaying) {
              previewStepAtTransport(step);
            }
          }
        } else {
          seekToStep(nextStep, { fromUser: true, viewStep: nextStep });
          if (!isPlaying) {
            previewStepAtTransport(nextStep);
          }
        }

        state.lastStep = nextStep;
      };

      state.onUp = (upEvent) => {
        if (!transportScrubState) return;
        if (upEvent.pointerId !== state.pointerId) return;
        endTransportScrub();
      };

      state.onCancel = (cancelEvent) => {
        if (!transportScrubState) return;
        if (cancelEvent.pointerId !== state.pointerId) return;
        endTransportScrub();
      };

      state.holdRepeatTimer = window.setInterval(() => {
        if (!transportScrubState) return;
        if (isPlaying) return;
        previewStepAtTransport(state.lastStep);
      }, scrubStepMs);

      transportScrubState = state;

      window.addEventListener("pointermove", state.onMove);
      window.addEventListener("pointerup", state.onUp);
      window.addEventListener("pointercancel", state.onCancel);
    });
  }

  if (samplePadGrid) {
    samplePadGrid.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });

    samplePadGrid.addEventListener(
      "touchstart",
      (event) => {
        const target = event.target instanceof Element ? event.target : null;
        if (!target) return;
        if (target.closest("button.samplePadBtn")) {
          event.preventDefault();
        }
      },
      { passive: false },
    );

    samplePadGrid.addEventListener("selectstart", (event) => {
      event.preventDefault();
    });

    samplePadGrid.addEventListener("pointerdown", (event) => {
      if (event.button != null && event.button !== 0) return;
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;
      const padBtn = target.closest("button.samplePadBtn");
      if (!padBtn) return;

      const pointerType = String(event.pointerType || "").toLowerCase();
      const isTouchPointer = pointerType === "touch";

      event.preventDefault();
      const step = clampNumber(
        numberOrFallback(padBtn.dataset.step, 0),
        0,
        Math.max(0, stepsCount - 1),
      );

      if (samplePadEditEnabled) {
        stopSamplePadHold();
        setSamplePadSelectedStep(step);
        return;
      }

      triggerSamplePadStep(step);

      if (isTouchPointer) {
        // On Android, clear stale touch hold timers before starting a fresh hold.
        stopSamplePadHold();
      }
      startSamplePadPreviewHold(event.pointerId, step);

      if (!isTouchPointer) {
        try {
          padBtn.setPointerCapture(event.pointerId);
        } catch {
          // ignore
        }
      }
    });

    samplePadGrid.addEventListener("pointerup", (event) => {
      stopSamplePadHold(event.pointerId);
    });

    samplePadGrid.addEventListener("pointercancel", (event) => {
      stopSamplePadHold(event.pointerId);
    });
  }

  window.addEventListener("pointerup", (event) => {
    stopSamplePadHold(event.pointerId);
  });

  window.addEventListener("pointercancel", (event) => {
    stopSamplePadHold(event.pointerId);
  });

  if (samplePadToggleBtn) {
    samplePadToggleBtn.addEventListener("click", () => {
      setSamplePadEnabled(!samplePadEnabled);
    });
  }

  if (samplePadEditBtn) {
    samplePadEditBtn.addEventListener("click", () => {
      if (!samplePadEnabled) return;
      setSamplePadEditEnabled(!samplePadEditEnabled);
    });
  }

  if (samplePadPlaybackModeBtn) {
    samplePadPlaybackModeBtn.addEventListener("click", () => {
      if (!samplePadEnabled) return;
      setSamplePadTransportMode(!samplePadTransportMode);
    });
  }

  if (samplePadRatchetSelect) {
    samplePadRatchetSelect.addEventListener("input", () => {
      if (samplePadSelectedStep == null) return;
      setSamplePadConfig(samplePadSelectedStep, {
        ratchet: samplePadRatchetSelect.value,
      });
      syncSamplePadEditor();
    });
  }

  if (samplePadTriggerInput) {
    samplePadTriggerInput.addEventListener("input", () => {
      if (samplePadSelectedStep == null) return;
      const trigger = sanitizeSamplePadTrigger(samplePadTriggerInput.value);
      samplePadTriggerInput.value = trigger;
      setSamplePadConfig(samplePadSelectedStep, { trigger });
    });
  }

  if (samplePadRollLengthInput) {
    samplePadRollLengthInput.addEventListener("input", () => {
      setSamplePadRollLength(samplePadRollLengthInput.value);
    });
  }

  if (samplePadRollLengthOut) {
    samplePadRollLengthOut.addEventListener("input", () => {
      if (samplePadRollLengthOut.value === "") return;
      setSamplePadRollLength(samplePadRollLengthOut.value);
    });
  }

  if (samplePadRollBeatStepsInput) {
    samplePadRollBeatStepsInput.addEventListener("input", () => {
      setSamplePadRollBeatSteps(samplePadRollBeatStepsInput.value);
    });
  }

  if (samplePadRollBeatStepsOut) {
    samplePadRollBeatStepsOut.addEventListener("input", () => {
      if (samplePadRollBeatStepsOut.value === "") return;
      setSamplePadRollBeatSteps(samplePadRollBeatStepsOut.value);
    });
  }

  if (samplePadRollGrid) {
    samplePadRollGrid.addEventListener("contextmenu", (event) => {
      if (
        event.target instanceof Element &&
        event.target.closest("button.samplePadRollCell")
      ) {
        event.preventDefault();
      }
    });

    samplePadRollGrid.addEventListener("pointerdown", (event) => {
      const cellBtn =
        event.target instanceof Element
          ? event.target.closest("button.samplePadRollCell")
          : null;
      if (!cellBtn || !samplePadRollGrid.contains(cellBtn)) return;

      padRollWasLongPress = false;
      padRollLongPressTarget = cellBtn;

      if (padRollLongPressTimer != null) {
        window.clearTimeout(padRollLongPressTimer);
        padRollLongPressTimer = null;
      }

      padRollLongPressTimer = window.setTimeout(() => {
        padRollLongPressTimer = null;
        const target = padRollLongPressTarget;
        padRollLongPressTarget = null;
        if (!target) return;
        const r = clampNumber(
          numberOrFallback(target.dataset.pad, 0),
          0,
          Math.max(0, stepsCount - 1),
        );
        const c = clampNumber(
          numberOrFallback(target.dataset.col, 0),
          0,
          Math.max(0, samplePadRollLength - 1),
        );
        const cell = samplePadRollPattern[r] && samplePadRollPattern[r][c];
        if (!cell || !cell.on) return;
        padRollWasLongPress = true;
        showSamplePadRollRatchetPicker(target, r, c, cell.ratchet);
      }, 450);

      try {
        cellBtn.setPointerCapture(event.pointerId);
      } catch {
        /* ignore */
      }
    });

    const clearPadRollLongPress = () => {
      if (padRollLongPressTimer != null) {
        window.clearTimeout(padRollLongPressTimer);
        padRollLongPressTimer = null;
      }
      padRollLongPressTarget = null;
    };

    samplePadRollGrid.addEventListener("pointerup", clearPadRollLongPress);
    samplePadRollGrid.addEventListener("pointercancel", clearPadRollLongPress);

    samplePadRollGrid.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const rowBtn = target.closest("button.samplePadRollPadBtn");
      if (rowBtn && samplePadRollGrid.contains(rowBtn)) {
        const step = clampNumber(
          numberOrFallback(rowBtn.dataset.step, 0),
          0,
          Math.max(0, stepsCount - 1),
        );
        triggerSamplePadRollPad(step);
        return;
      }

      const cellBtn = target.closest("button.samplePadRollCell");
      if (!cellBtn || !samplePadRollGrid.contains(cellBtn)) return;

      if (padRollWasLongPress) {
        padRollWasLongPress = false;
        return;
      }

      const row = clampNumber(
        numberOrFallback(cellBtn.dataset.pad, 0),
        0,
        Math.max(0, stepsCount - 1),
      );
      const col = clampNumber(
        numberOrFallback(cellBtn.dataset.col, 0),
        0,
        Math.max(0, samplePadRollLength - 1),
      );
      ensureSamplePadRollPatternShape();
      const cell = samplePadRollPattern[row][col];
      const wasOn = cell ? cell.on : false;
      samplePadRollPattern[row][col] = {
        on: !wasOn,
        ratchet: cell ? cell.ratchet : 1,
      };
      renderSamplePadRoll();
    });
  }

  if (samplePadRollRatchetPicker) {
    samplePadRollRatchetPicker.addEventListener("click", (event) => {
      const btn =
        event.target instanceof Element
          ? event.target.closest(".samplePadRollRatchetOption")
          : null;
      if (!btn) return;
      const row = clampNumber(
        numberOrFallback(samplePadRollRatchetPicker.dataset.row, 0),
        0,
        Math.max(0, stepsCount - 1),
      );
      const col = clampNumber(
        numberOrFallback(samplePadRollRatchetPicker.dataset.col, 0),
        0,
        Math.max(0, samplePadRollLength - 1),
      );
      const ratchet = sanitizeSamplePadRatchet(
        numberOrFallback(btn.dataset.ratchet, 1),
      );
      ensureSamplePadRollPatternShape();
      if (samplePadRollPattern[row] && samplePadRollPattern[row][col]) {
        samplePadRollPattern[row][col] = {
          on: samplePadRollPattern[row][col].on,
          ratchet,
        };
      }
      closeSamplePadRollRatchetPicker();
      renderSamplePadRoll();
    });

    document.addEventListener(
      "pointerdown",
      (event) => {
        if (samplePadRollRatchetPicker && !samplePadRollRatchetPicker.hidden) {
          if (!samplePadRollRatchetPicker.contains(event.target)) {
            closeSamplePadRollRatchetPicker();
          }
        }
      },
      { capture: true },
    );
  }

  if (samplePadPreviewBtn) {
    samplePadPreviewBtn.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });

    samplePadPreviewBtn.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
      },
      { passive: false },
    );

    samplePadPreviewBtn.addEventListener("pointerdown", (event) => {
      if (event.button != null && event.button !== 0) return;
      if (samplePadSelectedStep == null) return;
      const pointerType = String(event.pointerType || "").toLowerCase();
      const isTouchPointer = pointerType === "touch";
      event.preventDefault();
      triggerSamplePadStep(samplePadSelectedStep);
      if (isTouchPointer) {
        stopSamplePadHold();
      }
      startSamplePadPreviewHold(event.pointerId, samplePadSelectedStep);
      if (!isTouchPointer) {
        try {
          samplePadPreviewBtn.setPointerCapture(event.pointerId);
        } catch {
          // ignore
        }
      }
    });

    samplePadPreviewBtn.addEventListener("pointerup", (event) => {
      stopSamplePadHold(event.pointerId);
    });

    samplePadPreviewBtn.addEventListener("pointercancel", (event) => {
      stopSamplePadHold(event.pointerId);
    });
  }

  if (subtitlesToggleBtn) {
    subtitlesToggleBtn.addEventListener("click", () => {
      setSubtitlesEnabled(!subtitlesEnabled);
    });
  }

  if (subtitlesSpeedInput) {
    subtitlesSpeedInput.addEventListener("input", () => {
      setSubtitlesSpeed(subtitlesSpeedInput.value);
    });
  }

  if (subtitlesSpeedOut) {
    subtitlesSpeedOut.addEventListener("input", () => {
      if (subtitlesSpeedOut.value === "") return;
      setSubtitlesSpeed(subtitlesSpeedOut.value);
    });
  }

  if (transportSettingsBtn) {
    transportSettingsBtn.addEventListener("click", () => {
      if (Date.now() < suppressSettingsToggleClickUntil) return;
      setSettingsOpen(!settingsOpen);
    });
  }

  if (padPlaybackChip) {
    padPlaybackChip.addEventListener("click", () => {
      focusSamplePadPlaybackArea();
    });
  }

  if (settingsModal) {
    settingsModal.addEventListener("pointerdown", (event) => {
      if (event.target !== settingsModal) return;
      event.preventDefault();
      event.stopPropagation();
      suppressSettingsToggleClickUntil = Date.now() + 420;
      setSettingsOpen(false);
    });
  }

  if (settingsPanel) {
    settingsPanel.addEventListener(
      "scroll",
      () => {
        scheduleSettingsScrollHintSync();
      },
      { passive: true },
    );

    ensureSettingsScrollHintObserver();
  }

  window.addEventListener("keydown", (event) => {
    if (!event || event.key !== "Escape") return;
    if (themeEnableModal && !themeEnableModal.hidden) {
      closeThemeEnableModal();
      return;
    }
    if (!settingsOpen) return;
    setSettingsOpen(false);
  });

  window.addEventListener("resize", () => {
    scheduleSettingsPanelLayout();
    scheduleSubtitleLayout();
    scheduleSamplePadLayout();
    rebuildTransportTicks();
    syncFloatingBarGeometry();
    syncFloatingScrollClearance();
  });

  window.addEventListener(
    "scroll",
    () => {
      scheduleSamplePadLayout();
      syncFloatingBarGeometry();
      syncFloatingScrollClearance();
    },
    { passive: true },
  );

  function setThemeEnabled(nextEnabled) {
    themeEnabled = Boolean(nextEnabled);
    applyThemeVars();
    document.documentElement.classList.toggle("is-theme", themeEnabled);
    syncGradientAnimationToggleVisibility();

    if (themeStarBtn) {
      themeStarBtn.hidden = tracks.size === 0;
    }

    if (!themeEnabled) {
      closeThemePicker();
      closeThemeEnableModal();
    }

    if (themeModeBtn) {
      themeModeBtn.setAttribute(
        "aria-pressed",
        themeEnabled ? "true" : "false",
      );
      themeModeBtn.title = themeEnabled ? "theme: on" : "theme: off";
    }

    syncThemeControlsMount();

    applyLetterHitAccentPalette();
    syncBumpModeClass();

    updateTransportBar();
    renderAllTrackGrids();
  }

  function syncStarBounceDuration() {
    const dur = (120 / tempo).toFixed(3);
    document.documentElement.style.setProperty("--star-bounce-dur", dur + "s");
  }

  function isStarBounceBlockedByIntro() {
    return Boolean(
      (themeStarBtn && themeStarBtn.classList.contains("is-star-daw-intro")) ||
        Date.now() < starBounceIntroDelayUntil,
    );
  }

  function syncStarBounceClass() {
    const bounceActive =
      starBounceEnabled &&
      (isPlaying || starBounceAlwaysEnabled) &&
      !isStarBounceBlockedByIntro();
    document.documentElement.classList.toggle(
      "is-star-bouncing",
      bounceActive,
    );
  }

  function setStarBounceEnabled(nextEnabled) {
    starBounceEnabled = Boolean(nextEnabled);
    if (starBounceToggleBtn) {
      starBounceToggleBtn.setAttribute(
        "aria-pressed",
        starBounceEnabled ? "true" : "false",
      );
      starBounceToggleBtn.title = starBounceEnabled
        ? "star bounce: on"
        : "star bounce: off";
    }
    if (starBounceEnabled) syncStarBounceDuration();
    syncStarBounceClass();
  }

  function setStarBounceAlwaysEnabled(nextEnabled) {
    starBounceAlwaysEnabled = Boolean(nextEnabled);
    if (starBounceAlwaysToggleBtn) {
      starBounceAlwaysToggleBtn.setAttribute(
        "aria-pressed",
        starBounceAlwaysEnabled ? "true" : "false",
      );
      starBounceAlwaysToggleBtn.title = starBounceAlwaysEnabled
        ? "always bounce: on"
        : "always bounce: off";
    }
    if (starBounceEnabled && starBounceAlwaysEnabled) syncStarBounceDuration();
    syncStarBounceClass();
  }

  function setBumpEnabled(nextEnabled) {
    bumpEnabled = Boolean(nextEnabled);
    if (bumpToggleBtn) {
      bumpToggleBtn.setAttribute(
        "aria-pressed",
        bumpEnabled ? "true" : "false",
      );
    }
    if (!bumpEnabled) {
      clearBumpUnderlineEnvelopes();
    }
    syncBumpModeClass();
  }

  function setBumpIntensity(nextIntensity) {
    bumpIntensity = clampNumber(
      Math.round(numberOrFallback(nextIntensity, bumpIntensity)),
      0,
      100,
    );

    if (bumpIntensityInput) bumpIntensityInput.value = String(bumpIntensity);
    if (bumpIntensityOut) bumpIntensityOut.value = String(bumpIntensity);

    const ratio = bumpIntensity / 100;
    const softness = 1 - ratio;
    const trackLift = 4 * ratio;
    const motionMs = Math.round(160 + softness * 180);
    const trackGhostOpacity = (0.1 + ratio * 0.24).toFixed(3);

    const root = document.documentElement;
    root.style.setProperty("--bump-track-lift", `${trackLift.toFixed(2)}px`);
    root.style.setProperty("--bump-motion-dur", `${motionMs}ms`);
    root.style.setProperty("--bump-track-ghost-opacity", trackGhostOpacity);
    applyBumpLetterHeightVars();
  }

  function applyBumpLetterHeightVars() {
    const intensityRatio = clampNumber(
      numberOrFallback(bumpIntensity, 50) / 100,
      0,
      1,
    );
    const heightRatio = clampNumber(
      numberOrFallback(bumpHeight, 0) / 100,
      0,
      1,
    );

    const liftScale = 1 + heightRatio * 2;
    const letterLift = 3 * intensityRatio * liftScale;

    const baseGhostOpacity = 0.42 + intensityRatio * 0.38;
    const ghostBoost = 1 + heightRatio * 0.75;
    const letterGhostOpacity = clampNumber(baseGhostOpacity * ghostBoost, 0, 1);

    const shadowSpread = 2 + 2 * heightRatio;

    const root = document.documentElement;
    root.style.setProperty("--bump-letter-lift", `${letterLift.toFixed(2)}px`);
    root.style.setProperty(
      "--bump-letter-ghost-opacity",
      letterGhostOpacity.toFixed(3),
    );
    root.style.setProperty(
      "--bump-letter-shadow-spread",
      `${shadowSpread.toFixed(2)}px`,
    );
  }

  function applyBumpConfigVars() {
    const root = document.documentElement;
    root.style.setProperty(
      "--bump-underline-length",
      String(BUMP_UNDERLINE_LENGTH),
    );
    root.style.setProperty(
      "--bump-ghost-opacity-scale-theme",
      BUMP_GHOST_OPACITY_SCALE_THEME.toFixed(3),
    );
    root.style.setProperty(
      "--bump-ghost-opacity-scale-nontheme",
      BUMP_GHOST_OPACITY_SCALE_NON_THEME.toFixed(3),
    );
  }

  function setBumpHeight(nextHeight) {
    bumpHeight = clampNumber(
      Math.round(numberOrFallback(nextHeight, bumpHeight)),
      0,
      100,
    );

    if (bumpHeightInput) bumpHeightInput.value = String(bumpHeight);
    if (bumpHeightOut) bumpHeightOut.value = String(bumpHeight);

    applyBumpLetterHeightVars();
  }

  function setBumpBounce(nextBounce) {
    bumpBounce = clampNumber(
      Math.round(numberOrFallback(nextBounce, bumpBounce)),
      0,
      100,
    );

    if (bumpBounceInput) bumpBounceInput.value = String(bumpBounce);
    if (bumpBounceOut) bumpBounceOut.value = String(bumpBounce);

    const r = bumpBounce / 100;
    const easeX1 = (0.18 + 0.08 * r).toFixed(3);
    const easeY1 = (0.86 + 0.1 * r).toFixed(3);
    const easeX2 = (0.26 + 0.12 * r).toFixed(3);
    const easeY2 = (1 + 0.55 * r).toFixed(3);
    document.documentElement.style.setProperty(
      "--bump-motion-ease",
      `cubic-bezier(${easeX1}, ${easeY1}, ${easeX2}, ${easeY2})`,
    );
  }

  function setAutoscrollEnabled(nextEnabled) {
    autoscrollEnabled = Boolean(nextEnabled);
    if (autoscrollToggleBtn) {
      autoscrollToggleBtn.setAttribute(
        "aria-pressed",
        autoscrollEnabled ? "true" : "false",
      );
      autoscrollToggleBtn.title = autoscrollEnabled
        ? "follow playhead: on"
        : "follow playhead: off";
    }
    if (!autoscrollEnabled) {
      followCenterLock = false;
    }
  }

  function syncGradientAnimationToggleVisibility() {
    if (!gradientAnimationRow) return;
    gradientAnimationRow.hidden = themeEnabled;
  }

  function setGradientAnimationEnabled(nextEnabled) {
    gradientAnimationEnabled = Boolean(nextEnabled);
    document.documentElement.classList.toggle(
      "is-gradient-animation-disabled",
      !gradientAnimationEnabled,
    );
    if (gradientAnimationToggleBtn) {
      gradientAnimationToggleBtn.setAttribute(
        "aria-pressed",
        gradientAnimationEnabled ? "true" : "false",
      );
      gradientAnimationToggleBtn.title = gradientAnimationEnabled
        ? "gradient animation: on"
        : "gradient animation: off";
    }
    syncGradientAnimationToggleVisibility();
  }

  function formatSeconds(seconds) {
    const s = Math.max(0, Number(seconds) || 0);
    if (s === 0) return "0s";
    return `${s.toFixed(3).replace(/0+$/, "").replace(/\.$/, "")}s`;
  }

  function applyAutoExpandSpeedVars(multiplier) {
    const m = clampNumber(numberOrFallback(multiplier, 1), 0, 2);
    const root = document.documentElement;
    root.style.setProperty(
      "--trackGridExpandHeightDur",
      formatSeconds(0.38 * m),
    );
    root.style.setProperty("--trackGridExpandFadeDur", formatSeconds(0.26 * m));
    root.style.setProperty(
      "--trackGridCollapseHeightDur",
      formatSeconds(0.38 * m),
    );
    root.style.setProperty(
      "--trackGridCollapseFadeDur",
      formatSeconds(0.22 * m),
    );
    root.style.setProperty("--trackGridCollapseDelay", formatSeconds(0.38 * m));
    root.style.setProperty("--trackGridPeekHeightDur", formatSeconds(0.58 * m));
    root.style.setProperty("--trackGridPeekFadeDur", formatSeconds(0.34 * m));
  }

  function setAutoExpandSpeed(nextSpeed) {
    autoExpandSpeed = clampNumber(
      Math.round(numberOrFallback(nextSpeed, autoExpandSpeed)),
      0,
      200,
    );

    if (autoExpandSpeedInput)
      autoExpandSpeedInput.value = String(autoExpandSpeed);
    if (autoExpandSpeedOut) autoExpandSpeedOut.value = String(autoExpandSpeed);

    applyAutoExpandSpeedVars(2 - autoExpandSpeed / 100);
  }

  function setSamplePadEnabled(nextEnabled) {
    samplePadEnabled = Boolean(nextEnabled);
    if (!samplePadEnabled) {
      stopSamplePadHold();
      stopSamplePadKeyHolds();
      pressedAlphaKeys.clear();
      samplePadTransportMode = false;
      setSamplePadEditEnabled(false);
    }
    if (samplePadToggleBtn) {
      samplePadToggleBtn.setAttribute(
        "aria-pressed",
        samplePadEnabled ? "true" : "false",
      );
      samplePadToggleBtn.title = samplePadEnabled
        ? "sample pad: on"
        : "sample pad: off";
    }
    syncSubtitlesUiVisibility();
    syncSamplePadToolbarVisibility();
    syncSamplePadEditor();
    rebuildTransportSubtitles();
    setSamplePadTransportMode(samplePadTransportMode);
    ensureSamplePadRollPatternShape();
    renderSamplePadGrid();
    renderSamplePadRoll();
  }

  function setSubtitlesEnabled(nextEnabled) {
    subtitlesEnabled = Boolean(nextEnabled);
    if (!subtitlesEnabled) {
      resetSubtitleMusicSpacing();
    }
    if (subtitlesToggleBtn) {
      subtitlesToggleBtn.setAttribute(
        "aria-pressed",
        subtitlesEnabled ? "true" : "false",
      );
      subtitlesToggleBtn.title = subtitlesEnabled
        ? "subtitles: on"
        : "subtitles: off";
    }
    if (subtitlesSpeedRow) {
      subtitlesSpeedRow.hidden = !subtitlesEnabled;
    }
    scheduleSettingsPanelLayout();
    syncSubtitlesUiVisibility();
    rebuildTransportSubtitles();
  }

  function setSubtitlesSpeed(nextSpeed) {
    subtitlesSpeed = clampNumber(
      Math.round(numberOrFallback(nextSpeed, subtitlesSpeed)),
      20,
      200,
    );
    if (subtitlesSpeedInput) subtitlesSpeedInput.value = String(subtitlesSpeed);
    if (subtitlesSpeedOut) subtitlesSpeedOut.value = String(subtitlesSpeed);
    if (subtitleCycleActive) {
      subtitleCycleToken += 1;
      clearSubtitleTimer();
      runSubtitleCycle(subtitleCycleToken);
    }
  }

  function setAutoExpandEnabled(nextEnabled) {
    autoExpandEnabled = Boolean(nextEnabled);
    document.documentElement.classList.toggle(
      "is-auto-expand",
      autoExpandEnabled,
    );

    if (autoExpandToggleBtn) {
      autoExpandToggleBtn.setAttribute(
        "aria-pressed",
        autoExpandEnabled ? "true" : "false",
      );
      autoExpandToggleBtn.title = autoExpandEnabled
        ? "auto expand: on"
        : "auto expand: off";
    }

    if (autoExpandSpeedRow) {
      autoExpandSpeedRow.hidden = !autoExpandEnabled;
    }

    scheduleSettingsPanelLayout();

    if (!autoExpandEnabled) {
      for (const track of tracks.values()) {
        if (track && track.el) track.el.classList.remove("is-hover-peek");
      }
    } else {
      for (const track of tracks.values()) {
        renderTrackControls(track);
      }
    }
  }

  setAutoExpandEnabled(autoExpandEnabled);
  setAutoExpandSpeed(autoExpandSpeed);
  setSamplePadRollLength(samplePadRollLength);
  updateSamplePadRollBeatStepsMax();
  setSamplePadRollBeatSteps(samplePadRollBeatSteps);
  setSamplePadEnabled(samplePadEnabled);
  setSamplePadTransportMode(samplePadTransportMode);
  setSubtitlesSpeed(subtitlesSpeed);
  setSubtitlesEnabled(subtitlesEnabled);
  setAutosaveInterval(autosaveIntervalMinutes);
  setAutosaveEnabled(autosaveEnabled);
  setAutoscrollEnabled(autoscrollEnabled);
  setGradientAnimationEnabled(gradientAnimationEnabled);
  setStarBounceEnabled(starBounceEnabled);
  setStarBounceAlwaysEnabled(starBounceAlwaysEnabled);
  setBumpHeight(bumpHeight);
  setBumpBounce(bumpBounce);
  setBumpIntensity(bumpIntensity);
  applyBumpConfigVars();
  setBumpEnabled(bumpEnabled);
  setSettingsOpen(false);
  setThemeEnabled(themeEnabled);
  syncSubtitlesUiVisibility();
  syncFloatingBarGeometry();
  syncFloatingScrollClearance();

  tempoInput.addEventListener("input", () => {
    tempo = Number(tempoInput.value);
    tempoOut.value = String(tempo);
    updateSamplePadKeyHolds();
    if (starBounceEnabled) syncStarBounceDuration();
  });

  tempoOut.addEventListener("input", () => {
    if (tempoOut.value === "") return;
    const draft = Number(tempoOut.value);
    if (!Number.isFinite(draft)) return;
    tempo = clampNumber(draft, 20, 360);
    tempoInput.value = String(tempo);
  });

  function normalizeTempoOut() {
    if (tempoOut.value === "") {
      tempoOut.value = String(tempo);
      return;
    }
    const next = clampNumber(numberOrFallback(tempoOut.value, tempo), 20, 360);
    tempo = next;
    tempoInput.value = String(next);
    tempoOut.value = String(next);
    updateSamplePadKeyHolds();
    if (starBounceEnabled) syncStarBounceDuration();
  }

  tempoOut.addEventListener("change", normalizeTempoOut);
  tempoOut.addEventListener("blur", normalizeTempoOut);

  globalSwingInput.addEventListener("input", () => {
    globalSwing = clampNumber(
      numberOrFallback(globalSwingInput.value, 0),
      0,
      127,
    );
    globalSwingOut.value = String(globalSwing);
  });

  globalSwingOut.addEventListener("input", () => {
    if (globalSwingOut.value === "") return;
    globalSwing = clampNumber(
      numberOrFallback(globalSwingOut.value, globalSwing),
      0,
      127,
    );
    globalSwingInput.value = String(globalSwing);
    globalSwingOut.value = String(globalSwing);
  });

  globalVolumeInput.addEventListener("input", () => {
    globalVolume = clampNumber(Number(globalVolumeInput.value), 0, 127);
    globalVolumeOut.value = String(globalVolume);

    if (master && audio) {
      master.gain.setTargetAtTime(
        clampNumber(globalVolume / 127, 0, 1),
        audio.currentTime,
        0.01,
      );
    }
  });

  globalVolumeOut.addEventListener("input", () => {
    if (globalVolumeOut.value === "") return;
    const next = clampNumber(
      numberOrFallback(globalVolumeOut.value, globalVolume),
      0,
      127,
    );
    globalVolume = next;
    globalVolumeInput.value = String(next);
    globalVolumeOut.value = String(next);

    if (master && audio) {
      master.gain.setTargetAtTime(
        clampNumber(globalVolume / 127, 0, 1),
        audio.currentTime,
        0.01,
      );
    }
  });

  stepsInput.addEventListener("input", () => {
    stepsOut.value = String(stepsInput.value);

    if (stepsRebuildTimer) window.clearTimeout(stepsRebuildTimer);
    stepsRebuildTimer = window.setTimeout(() => {
      stepsRebuildTimer = null;
      applyStepsCount(stepsInput.value);
    }, 120);
  });

  stepsInput.addEventListener("change", () => {
    if (stepsRebuildTimer) {
      window.clearTimeout(stepsRebuildTimer);
      stepsRebuildTimer = null;
    }
    applyStepsCount(stepsInput.value);
  });

  stepsOut.addEventListener("input", () => {
    if (stepsOut.value === "") return;
    stepsInput.value = String(stepsOut.value);

    if (stepsRebuildTimer) window.clearTimeout(stepsRebuildTimer);
    stepsRebuildTimer = window.setTimeout(() => {
      stepsRebuildTimer = null;
      applyStepsCount(stepsOut.value);
    }, 120);
  });

  stepsOut.addEventListener("change", () => {
    if (stepsRebuildTimer) {
      window.clearTimeout(stepsRebuildTimer);
      stepsRebuildTimer = null;
    }
    applyStepsCount(stepsOut.value);
  });

  if (beatStepsInput && beatStepsOut) {
    beatStepsInput.addEventListener("input", () => {
      beatStepsOut.value = String(beatStepsInput.value);
      applyBeatSteps(beatStepsInput.value);
    });

    beatStepsOut.addEventListener("input", () => {
      if (beatStepsOut.value === "") return;
      beatStepsInput.value = String(beatStepsOut.value);
      applyBeatSteps(beatStepsOut.value);
    });
  }

  function copyRangeAcrossTracks(range) {
    if (!range) return;
    const { start, end } = range;
    const len = end - start + 1;
    const insertAt = end + 1;
    for (const track of tracks.values()) {
      const state = getOrInitState(track.key);
      const pattern = normalizePattern(state.pattern).slice();
      const ties = normalizeNoteTies(state.noteTies, pattern).slice();
      const segment = pattern.slice(start, end + 1);
      const tieSegment = ties.slice(start, end + 1);
      for (let i = 0; i < len; i += 1) {
        const targetIndex = insertAt + i;
        if (targetIndex >= stepsCount) break;
        pattern[targetIndex] = clampNumber(
          Math.round(numberOrFallback(segment[i], 0)),
          0,
          NOTE_MASK_ALL,
        );
        ties[targetIndex] = clampNumber(
          Math.round(numberOrFallback(tieSegment[i], 0)),
          0,
          NOTE_MASK_ALL,
        );
      }
      state.pattern = pattern;
      state.noteTies = normalizeNoteTies(ties, pattern);
      renderTrackGrid(track);
    }
  }

  function duplicateRangeInsertAcrossTracks(range) {
    if (!range) return;
    const { start, end } = range;
    const len = end - start + 1;
    const oldSteps = stepsCount;
    const nextSteps = clampNumber(oldSteps + len, 4, MAX_STEPS);

    const snapshots = new Map();
    for (const track of tracks.values()) {
      const state = getOrInitState(track.key);
      const pattern = normalizePattern(state.pattern);
      const noteTies = normalizeNoteTies(state.noteTies, pattern);
      snapshots.set(track.key, { pattern, noteTies });
    }

    applyStepsCount(nextSteps);

    for (const [key, snapshot] of snapshots.entries()) {
      const pattern = snapshot.pattern;
      const noteTies = snapshot.noteTies;
      const segment = pattern.slice(start, end + 1);
      const tieSegment = noteTies.slice(start, end + 1);
      const prefix = pattern.slice(0, end + 1);
      const tiePrefix = noteTies.slice(0, end + 1);
      const suffix = pattern.slice(end + 1);
      const tieSuffix = noteTies.slice(end + 1);
      const nextPattern = prefix.concat(segment, suffix);
      const nextTies = tiePrefix.concat(tieSegment, tieSuffix);
      const state = getOrInitState(key);
      state.pattern = normalizePattern(nextPattern);
      state.noteTies = normalizeNoteTies(nextTies, state.pattern);
    }

    renderAllTrackGrids();
  }

  function deleteRangeAcrossTracks(range) {
    if (!range) return;
    const { start, end } = range;
    for (const track of tracks.values()) {
      const state = getOrInitState(track.key);
      const pattern = normalizePattern(state.pattern).slice();
      const ties = normalizeNoteTies(state.noteTies, pattern).slice();
      for (let i = start; i <= end; i += 1) pattern[i] = 0;
      state.pattern = pattern;
      state.noteTies = normalizeNoteTies(ties, pattern);
      renderTrackGrid(track);
    }
  }

  rangeFromInput.addEventListener("change", () => {
    normalizeRangeInputs();
    updateRangeButtons();
    refreshLoopFromRange();
  });
  rangeToInput.addEventListener("change", () => {
    normalizeRangeInputs();
    updateRangeButtons();
    refreshLoopFromRange();
  });

  rangeCopyBtn.addEventListener("click", () => {
    const range = readGlobalRange();
    if (!range) return;
    normalizeRangeInputs();
    copyRangeAcrossTracks(range);
  });

  rangeDeleteBtn.addEventListener("click", () => {
    const range = readGlobalRange();
    if (!range) return;
    normalizeRangeInputs();
    deleteRangeAcrossTracks(range);
  });

  rangeDuplicateBtn.addEventListener("click", () => {
    const range = readGlobalRange();
    if (!range) return;
    normalizeRangeInputs();
    duplicateRangeInsertAcrossTracks(range);
  });

  if (rangeLoopBtn) {
    rangeLoopBtn.addEventListener("click", () => {
      setLoopEnabled(!loopEnabled);
    });
  }

  if (songIo) {
    songIo.addEventListener("toggle", () => {
      if (songIo.open) updateSongJsonHighlight();
    });
  }

  if (songJson) {
    songJson.addEventListener("input", updateSongJsonHighlight);
    songJson.addEventListener("scroll", syncSongJsonScroll);
  }

  async function copySongJsonToClipboard(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setPresetStatus("", { busy: true });
    const song = getSongObject();
    const text = JSON.stringify(song, null, 2);
    showSongIo();
    songJson.value = text;
    updateSongJsonHighlight();
    songJson.focus();

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      // ignore clipboard failures
    }

    setPresetStatus("copied json");
  }

  function applySongJsonFromEditor(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    showSongIo();
    setPresetStatus("", { busy: true });
    updateSongJsonHighlight();
    const parsed = safeJsonParse(songJson.value);
    if (!parsed.ok) {
      console.warn("Invalid song JSON", parsed.error);
      setPresetStatus("invalid json", { ok: false });
      return;
    }

    const ok = applySongObject(parsed.value);
    if (!ok) {
      setPresetStatus("invalid song", { ok: false });
      return;
    }

    const nameFromSong =
      parsed.value && typeof parsed.value === "object"
        ? String(parsed.value.name || "").trim()
        : "";
    if (nameFromSong) {
      presetNameInput.value = nameFromSong;
    }
    refreshPresetSelect();
    setPresetStatus("applied json");
  }

  function downloadSongJsonFile(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setPresetStatus("", { busy: true });
    const song = getSongObject();
    if (!song || !Array.isArray(song.tracks) || song.tracks.length === 0) {
      setPresetStatus("nothing to download", { ok: false });
      return;
    }
    const text = JSON.stringify(song, null, 2);
    showSongIo();
    songJson.value = text;
    updateSongJsonHighlight();

    const sourceName = String(presetNameInput.value || song.name || "song");
    const filename = `${fileSafeStem(sourceName, "song")}.aelonyori-song.json`;
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setPresetStatus("downloaded json");
  }

  function requestSongJsonUpload(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!songJsonUploadInput) return;
    songJsonUploadInput.value = "";
    songJsonUploadInput.click();
  }

  async function handleSongJsonUploadInput() {
    if (!songJsonUploadInput) return;
    const file =
      songJsonUploadInput.files && songJsonUploadInput.files[0]
        ? songJsonUploadInput.files[0]
        : null;
    if (!file) return;

    setPresetStatus("", { busy: true });
    try {
      const text = await file.text();
      showSongIo();
      songJson.value = text;
      updateSongJsonHighlight();
      applySongJsonFromEditor();
      setPresetStatus("uploaded json");
    } catch (error) {
      console.warn("Unable to read uploaded JSON", error);
      setPresetStatus("upload failed", { ok: false });
    }
  }

  if (songJsonCopyBtn) {
    songJsonCopyBtn.addEventListener("click", copySongJsonToClipboard);
  }

  if (songJsonApplyBtn) {
    songJsonApplyBtn.addEventListener("click", applySongJsonFromEditor);
  }

  if (songJsonDownloadBtn) {
    songJsonDownloadBtn.addEventListener("click", downloadSongJsonFile);
  }

  if (songJsonUploadBtn) {
    songJsonUploadBtn.addEventListener("click", requestSongJsonUpload);
  }

  if (songJsonUploadInput) {
    songJsonUploadInput.addEventListener("change", () => {
      handleSongJsonUploadInput();
    });
  }

  if (autosaveToggleBtn) {
    autosaveToggleBtn.addEventListener("click", () => {
      setAutosaveEnabled(!autosaveEnabled);
    });
  }

  if (autosaveIntervalSelect) {
    autosaveIntervalSelect.addEventListener("change", () => {
      setAutosaveInterval(autosaveIntervalSelect.value);
    });
  }

  presetSaveBtn.addEventListener("click", () => {
    saveCurrentSongPreset({ statusLabel: "saved", showPresetStatus: true });
  });

  if (presetNewBtn) {
    presetNewBtn.addEventListener("click", () => {
      resetToFreshLanding();
    });
  }

  presetSelect.addEventListener("change", () => {
    const name = String(presetSelect.value || "").trim();
    if (name) presetNameInput.value = name;
  });

  presetLoadBtn.addEventListener("click", () => {
    const name = String(presetSelect.value || "").trim();
    if (!name) {
      setPresetStatus("no preset", { ok: false });
      return;
    }
    const song = getPreset(name);
    if (!song) {
      setPresetStatus("missing", { ok: false });
      return;
    }
    applySongObject(song);
    presetNameInput.value = name;
    setPresetStatus("loaded");
  });

  presetDefaultBtn.addEventListener("click", () => {
    const name = String(presetSelect.value || "").trim();
    if (!name) {
      setPresetStatus("no preset", { ok: false });
      return;
    }
    setDefaultPresetName(name);
    refreshPresetSelect();
    setPresetStatus("default");
  });

  window.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (isSamplerViewOpen()) return;
    if (!samplePadEnabled || settingsOpen || isTypingTarget(event.target))
      return;

    const key = String(event.key || "");
    if (!/^[a-z]$/i.test(key)) return;

    pressedAlphaKeys.add(key.toLowerCase());
    updateSamplePadKeyHolds();
    if (samplePadKeyHoldStates.size > 0) event.preventDefault();
  });

  window.addEventListener("keyup", (event) => {
    const key = String(event.key || "");
    if (!/^[a-z]$/i.test(key)) return;
    pressedAlphaKeys.delete(key.toLowerCase());
    updateSamplePadKeyHolds();
  });

  window.addEventListener("blur", () => {
    pressedAlphaKeys.clear();
    stopSamplePadKeyHolds();
  });

  window.addEventListener("pointerdown", (event) => {
    if (!event || event.pointerType === "mouse") return;
    if (isSamplerViewOpen()) return;
    if (!tracks.size || settingsOpen) return;
    if (isTypingTarget(event.target)) return;
    const startedNearRightEdge = event.clientX >= window.innerWidth - 28;
    if (
      event.target instanceof Element &&
      !startedNearRightEdge &&
      event.target.closest(
        "button, input, select, textarea, .transportBar, .settingsModal, .settingsPanel",
      )
    ) {
      return;
    }

    samplerSwipePointerId = event.pointerId;
    samplerSwipeStartX = event.clientX;
    samplerSwipeStartY = event.clientY;
    samplerSwipeStartAt = Date.now();
    samplerSwipeStartedFromRightEdge = startedNearRightEdge;
  });

  window.addEventListener("pointerup", (event) => {
    if (event.pointerId !== samplerSwipePointerId) return;

    const dx = event.clientX - samplerSwipeStartX;
    const dy = event.clientY - samplerSwipeStartY;
    const dt = Date.now() - samplerSwipeStartAt;

    samplerSwipePointerId = null;

    const horizontal = Math.abs(dx) >= 90 && Math.abs(dy) <= 55;
    const quickEnough = dt <= 700;
    const startedFromRightHalf = samplerSwipeStartX >= window.innerWidth * 0.45;
    const allowStart = startedFromRightHalf || samplerSwipeStartedFromRightEdge;
    samplerSwipeStartedFromRightEdge = false;

    if (horizontal && quickEnough && allowStart && dx <= -90) {
      setSamplerViewOpen(true);
    }
  });

  window.addEventListener("pointercancel", (event) => {
    if (event.pointerId !== samplerSwipePointerId) return;
    samplerSwipePointerId = null;
    samplerSwipeStartedFromRightEdge = false;
  });

  window.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (isSamplerViewOpen()) return;
    if (settingsOpen) return;
    if (isTypingTarget(event.target)) return;
    if (!isShortcutTarget(event.target)) return;

    const { key } = event;
    if (key >= "1" && key <= "9") {
      event.preventDefault();
      toggleIndex(Number(key) - 1);
      return;
    }

    if (key !== "ArrowLeft" && key !== "ArrowRight") return;
    event.preventDefault();

    const active = document.activeElement;
    let index = letters.indexOf(active);
    if (index === -1) index = 0;

    const delta = key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + delta + letters.length) % letters.length;

    if (tracks.size === 0) {
      toggleIndex(nextIndex);
    } else {
      focusLetter(nextIndex);
    }
  });

  updateDawVisibility();
  window.setSamplerViewOpen = setSamplerViewOpen;
  window.isSamplerViewOpen = isSamplerViewOpen;
  updateSoloSuppression();
  stepsOut.value = String(stepsCount);
  globalVolumeOut.value = String(globalVolume);
  tempoOut.value = String(tempo);
  globalSwingOut.value = String(globalSwing);

  populateRangeSelects({ oldSteps: stepsCount });
  updateRangeButtons();

  refreshPresetSelect();
})();
