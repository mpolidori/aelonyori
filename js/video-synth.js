(() => {
  const VIDEO_SYNTH_DEFAULTS_PATH = "configs/video/defaults.json";
  const VIDEO_SYNTH_PRESET_INDEX_KEY = "aelonyori.video-synth.preset.index";
  const VIDEO_SYNTH_PRESET_DEFAULT_KEY = "aelonyori.video-synth.preset.default";
  const VIDEO_SYNTH_PRESET_STORAGE_PREFIX = "aelonyori.video-synth.preset.";
  const VIDEO_SYNTH_AUTOSAVE_KEY = "aelonyori.video-synth.autosave";

  const shared = window.AelonyoriShared || {};
  const sharedClampNumber = shared.clampNumber || ((value, min, max) => Math.min(max, Math.max(min, value)));
  const sharedNumberOrFallback = shared.numberOrFallback || ((value, fallback) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  });
  const sharedSafeJsonParse = shared.safeJsonParse || ((text) => {
    try {
      return { ok: true, value: JSON.parse(text) };
    } catch (error) {
      return { ok: false, error };
    }
  });
  const sharedFileSafeStem = shared.fileSafeStem || ((value, fallback = "video-synth") => {
    const stem = String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-_ ]+/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
    return stem || fallback;
  });
  const sharedHighlightJson = shared.highlightJson || ((text) => String(text));
  const sharedIsQuotaExceededError = shared.isQuotaExceededError || ((error) => {
    if (!error) return false;
    const code = Number(error.code);
    const name = String(error.name || "");
    return (
      name === "QuotaExceededError" ||
      name === "NS_ERROR_DOM_QUOTA_REACHED" ||
      code === 22 ||
      code === 1014
    );
  });
  const sharedNormalizeIntervalChoice = shared.normalizeIntervalChoice || ((value, allowed, fallback) => {
    const options = Array.isArray(allowed) && allowed.length > 0
      ? allowed
      : [1, 5, 10, 15, 30, 60];
    const next = Math.round(sharedNumberOrFallback(value, fallback));
    if (options.includes(next)) return next;
    let best = options[0];
    let bestDist = Math.abs(next - best);
    for (let i = 1; i < options.length; i += 1) {
      const dist = Math.abs(next - options[i]);
      if (dist < bestDist) {
        best = options[i];
        bestDist = dist;
      }
    }
    return best;
  });
  const sharedMakeUniquePresetName = shared.makeUniquePresetName || ((base, existingNames, defaultBase) => {
    const baseName = String(base || "").trim() || String(defaultBase || "preset");
    const existing = new Set(existingNames);
    if (!existing.has(baseName)) return baseName;
    let i = 2;
    while (existing.has(`${baseName} ${i}`)) i += 1;
    return `${baseName} ${i}`;
  });
  const sharedTriggerBlobDownload = shared.triggerBlobDownload || ((data, filename, mimeType) => {
    const type = String(mimeType || "application/json");
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = String(filename || "download");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });

  class VideoSynthPlugin {
    constructor({ mount }) {
      this.mount = mount || null;
      this.shell = null;
      this.preview = null;
      this.canvas = null;
      this.hud = null;
      this.modeSelect = null;
      this.formulaSelect = null;
      this.fullscreenBtn = null;
      this.resetBtn = null;
      this.audioToggleBtn = null;
      this.invertToggleBtn = null;
      this.colorAInput = null;
      this.colorBInput = null;
      this.colorAHexInput = null;
      this.colorBHexInput = null;
      this.presetSelect = null;
      this.presetNameInput = null;
      this.presetStatus = null;
      this.presetNewBtn = null;
      this.presetSaveBtn = null;
      this.presetLoadBtn = null;
      this.presetDefaultBtn = null;
      this.autosaveToggleBtn = null;
      this.autosaveIntervalSelect = null;
      this.songIo = null;
      this.songJson = null;
      this.songJsonHighlight = null;
      this.songJsonCopyBtn = null;
      this.songJsonApplyBtn = null;
      this.songJsonDownloadBtn = null;
      this.songJsonUploadBtn = null;
      this.songJsonUploadInput = null;
      this.rangeInputs = new Map();
      this.logoVideoBackgroundBtn = null;
      this.logoVideoCropBtn = null;
      this.logoCropOverlay = null;
      this.logoCropRect = null;
      this.logoCropHandle = null;
      this.embeddedPresets = Object.create(null);
      this.embeddedDefaultPresetName = "";

      this.gl = null;
      this.program = null;
      this.positionBuffer = null;
      this.audioTexture = null;

      this.uTime = null;
      this.uResolution = null;
      this.uAudioTex = null;
      this.uMode = null;
      this.uFormula = null;
      this.uIntensity = null;
      this.uGlitch = null;
      this.uScan = null;
      this.uPixel = null;
      this.uHue = null;
      this.uDrift = null;
      this.uAudioMix = null;
      this.uAutoMix = null;
      this.uInvert = null;
      this.uGlitchLayer = null;
      this.uGlitchOffset = null;
      this.uSplit = null;
      this.uNoiseAmt = null;
      this.uColorA = null;
      this.uColorB = null;
      this.uTextTex = null;
      this.uTextEnabled = null;
      this.uTextMix = null;
      this.uTextColor = null;
      this.uTextFlipH = null;
      this.uTextFlipV = null;

      this.audioNode = null;
      this.analyser = null;
      this.audioFrame = null;
      this.audioTextureFrame = null;
      this.textCanvas = null;
      this.textCtx = null;
      this.textTexture = null;
      this.textTextureDirty = true;

      this.logoFeedActive = false;
      this.logoSampleCanvas = null;
      this.logoSampleCtx = null;

      this.textureSize = 256;
      this.rafId = null;
      this.active = false;
      this.initialized = false;
      this.playbackTimeSeconds = 0;
      this.lastFrameTimestampMs = null;
      this.autosaveTimerId = null;
      this.lastPresetSaveErrorMessage = "";
      this.logoVideoBackgroundEnabled = false;
      this.logoVideoCropX = 50;
      this.logoVideoCropY = 60;
      this.logoVideoCropSize = 88;
      this.logoCropModeActive = false;
      this.logoCropDragState = null;
      this.logoCropLastTapAtMs = 0;
      this.logoCropLastTapX = 0;
      this.logoCropLastTapY = 0;
      this.loadedDefaults = null;

      this.params = {
        mode: 0,
        formula: 0,
        intensity: 72,
        glitch: 58,
        glitchLayer: 54,
        glitchOffset: 58,
        split: 72,
        noiseAmt: 36,
        scan: 32,
        pixel: 14,
        hue: 0,
        drift: 44,
        videoSpeed: 70,
        audioMix: 62,
        autoMix: 68,
        audioReactive: true,
        invert: false,
        colorA: "#6600ff",
        colorB: "#ff0077",
        textContent: "",
        textSize: 62,
        textMix: 70,
        textColor: "#f4ecff",
        textFlipH: false,
        textFlipV: false,
      };

      const autosaveConfig = this.readAutosaveConfig();
      this.autosaveEnabled = Boolean(autosaveConfig.enabled);
      this.autosaveIntervalMinutes = autosaveConfig.intervalMinutes;

      this.onResize = this.resize.bind(this);
      this.onVisibilityChange = () => {
        if (document.hidden) {
          this.stop();
        } else if (this.shouldRun()) {
          this.start();
        }
      };
      this.onLogoVideoStateChange = (event) => {
        const detail = event?.detail || {};
        this.setLogoVideoBackgroundState(
          detail.enabled,
          detail.cropX,
          detail.cropY,
          detail.cropSize,
        );
      };
      this.onLogoCropPointerMove = (event) => {
        if (!this.logoCropDragState) return;
        if (event.cancelable) event.preventDefault();
        event.stopPropagation();
        const state = this.logoCropDragState;
        const dx = event.clientX - state.startPointerX;
        const dy = event.clientY - state.startPointerY;

        if (state.mode === "move") {
          const maxX = Math.max(0, state.previewW - state.startRectW);
          const maxY = Math.max(0, state.previewH - state.startRectH);
          const nextRectX = this.clampNumber(state.startRectX + dx, 0, maxX);
          const nextRectY = this.clampNumber(state.startRectY + dy, 0, maxY);
          const nextCropX = maxX > 0 ? (nextRectX / maxX) * 100 : state.startCropX;
          const nextCropY = maxY > 0 ? (nextRectY / maxY) * 100 : state.startCropY;
          this.emitLogoCropChange(nextCropX, nextCropY, state.startCropSize);
          return;
        }

        const desiredWFromX = state.startRectW + dx;
        const desiredWFromY = (state.startRectH + dy) * state.aspect;
        const desiredW = Math.abs(dx) >= Math.abs(dy * state.aspect)
          ? desiredWFromX
          : desiredWFromY;
        const boundW = Math.max(
          state.minRectW,
          Math.min(
            state.maxRectW,
            state.previewW - state.startRectX,
            (state.previewH - state.startRectY) * state.aspect,
          ),
        );
        const nextRectW = this.clampNumber(desiredW, state.minRectW, boundW);
        const nextCropSize = (nextRectW / state.maxRectW) * 100;
        this.emitLogoCropChange(state.startCropX, state.startCropY, nextCropSize);
      };
      this.onLogoCropPointerUp = (event) => {
        if (!this.logoCropDragState) return;
        const state = this.logoCropDragState;
        if (
          event
          && state.pointerId != null
          && event.pointerId != null
          && event.pointerId !== state.pointerId
        ) {
          return;
        }
        this.logoCropDragState = null;
        if (this.logoCropRect) {
          this.logoCropRect.classList.remove("is-dragging", "is-resizing");
        }
        if (
          state
          && state.captureTarget
          && typeof state.captureTarget.releasePointerCapture === "function"
          && state.pointerId != null
        ) {
          try {
            state.captureTarget.releasePointerCapture(state.pointerId);
          } catch {
            // ignore
          }
        }
        window.removeEventListener("pointermove", this.onLogoCropPointerMove);
        window.removeEventListener("pointerup", this.onLogoCropPointerUp);
        window.removeEventListener("pointercancel", this.onLogoCropPointerUp);
      };

      this.loadDefaults();
    }

    async loadDefaults() {
      try {
        const response = await fetch(VIDEO_SYNTH_DEFAULTS_PATH, { cache: "no-store" });
        if (!response.ok) return;
        const parsed = await response.json();
        if (!parsed || typeof parsed !== "object") return;
        this.loadedDefaults = this.normalizeParams(parsed, this.getDefaultParams());
        this.params = { ...this.loadedDefaults };
        this.syncParamInputs();
        this.textTextureDirty = true;
      } catch {
        // ignore and keep built-in defaults
      }
    }

    init() {
      if (this.initialized || !this.mount) return;

      this.mount.textContent = "";

      this.shell = document.createElement("section");
      this.shell.className = "videoSynthShell";

  const presetPanel = this.buildPresetPanel();


      this.preview = document.createElement("div");
      this.preview.className = "videoSynthPreview";

      this.canvas = document.createElement("canvas");
      this.canvas.className = "videoSynthCanvas";

      this.hud = document.createElement("div");
      this.hud.className = "videoSynthHud";
      this.hud.textContent = "waveform";

      this.logoCropOverlay = document.createElement("div");
      this.logoCropOverlay.className = "videoSynthCropOverlay";
      this.logoCropRect = document.createElement("div");
      this.logoCropRect.className = "videoSynthCropRect";
      this.logoCropHandle = document.createElement("div");
      this.logoCropHandle.className = "videoSynthCropHandle";
      this.logoCropHandle.setAttribute("aria-hidden", "true");
      this.logoCropRect.appendChild(this.logoCropHandle);
      this.logoCropOverlay.appendChild(this.logoCropRect);

      this.logoCropRect.addEventListener("pointerdown", (event) => {
        if (!this.logoCropModeActive) return;
        if (event.target === this.logoCropHandle) return;
        this.handleLogoCropPointerDown(event, "move");
      });
      this.logoCropHandle.addEventListener("pointerdown", (event) => {
        if (!this.logoCropModeActive) return;
        this.handleLogoCropPointerDown(event, "resize");
      });

      this.preview.appendChild(this.canvas);
      this.preview.appendChild(this.logoCropOverlay);
      this.preview.appendChild(this.hud);

      const controls = document.createElement("section");
      controls.className = "videoSynthControls";

      const controlsColA = document.createElement("div");
      controlsColA.className = "videoSynthControlColumn";

      const controlsColB = document.createElement("div");
      controlsColB.className = "videoSynthControlColumn";

      const modeField = document.createElement("label");
      modeField.className = "field videoSynthField";
      const modeLabel = document.createElement("span");
      modeLabel.className = "fieldLabel";
      modeLabel.textContent = "mode";
      this.modeSelect = document.createElement("select");
      this.modeSelect.className = "videoSynthSelect";
      [
        "wave",
        "noise field",
        "grid fold",
        "rings",
        "bars",
        "plasma",
      ].forEach((name, idx) => {
        const option = document.createElement("option");
        option.value = String(idx);
        option.textContent = name;
        this.modeSelect.appendChild(option);
      });
      this.modeSelect.value = String(this.params.mode);
      this.modeSelect.addEventListener("change", () => {
        this.params.mode = Number(this.modeSelect.value);
        this.syncHudLabel();
      });
      const modeSpacer = document.createElement("span");
      modeSpacer.setAttribute("aria-hidden", "true");
      modeField.appendChild(modeLabel);
      modeField.appendChild(this.modeSelect);
      modeField.appendChild(modeSpacer);
      controlsColA.appendChild(modeField);

      const formulaField = document.createElement("label");
      formulaField.className = "field videoSynthField";
      const formulaLabel = document.createElement("span");
      formulaLabel.className = "fieldLabel";
      formulaLabel.textContent = "formula";
      this.formulaSelect = document.createElement("select");
      this.formulaSelect.className = "videoSynthSelect";
      ["sine", "tangent", "fold", "pulse", "cheby", "xor"].forEach(
        (name, idx) => {
        const option = document.createElement("option");
        option.value = String(idx);
        option.textContent = name;
        this.formulaSelect.appendChild(option);
        },
      );
      this.formulaSelect.value = String(this.params.formula);
      this.formulaSelect.addEventListener("change", () => {
        this.params.formula = Number(this.formulaSelect.value);
      });
      const formulaSpacer = document.createElement("span");
      formulaSpacer.setAttribute("aria-hidden", "true");
      formulaField.appendChild(formulaLabel);
      formulaField.appendChild(this.formulaSelect);
      formulaField.appendChild(formulaSpacer);
      controlsColA.appendChild(formulaField);

      controlsColA.appendChild(
        this.makeRangeField({
          key: "videoSpeed",
          label: "video speed",
          min: 0,
          max: 100,
          step: 1,
        }),
      );

      controlsColA.appendChild(
        this.makeRangeField({
          key: "glitch",
          label: "glitch a",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      controlsColA.appendChild(
        this.makeRangeField({
          key: "glitchLayer",
          label: "glitch b",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      controlsColA.appendChild(
        this.makeRangeField({
          key: "glitchOffset",
          label: "offset",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      controlsColA.appendChild(
        this.makeRangeField({
          key: "split",
          label: "rgb split",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      controlsColA.appendChild(
        this.makeRangeField({
          key: "pixel",
          label: "pixel",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      controlsColA.appendChild(
        this.makeRangeField({
          key: "drift",
          label: "drift",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      controlsColA.appendChild(
        this.makeRangeField({
          key: "scan",
          label: "scan",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      controlsColA.appendChild(
        this.makeRangeField({
          key: "hue",
          label: "hue",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      controlsColB.appendChild(
        this.makeRangeField({
          key: "noiseAmt",
          label: "noise",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      controlsColB.appendChild(
        this.makeRangeField({
          key: "audioMix",
          label: "audio mix",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      controlsColB.appendChild(
        this.makeRangeField({
          key: "autoMix",
          label: "auto mix",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      controlsColB.appendChild(
        this.makeColorField({ key: "colorA", label: "color a" }),
      );
      controlsColB.appendChild(
        this.makeColorField({ key: "colorB", label: "color b" }),
      );
      controlsColB.appendChild(
        this.makeTextField({
          key: "textContent",
          label: "text",
          placeholder: "type text",
        }),
      );
      controlsColB.appendChild(
        this.makeColorField({ key: "textColor", label: "text color" }),
      );
      controlsColB.appendChild(
        this.makeRangeField({
          key: "textSize",
          label: "text size",
          min: 10,
          max: 160,
          step: 1,
        }),
      );
      controlsColB.appendChild(
        this.makeRangeField({
          key: "textMix",
          label: "text mix",
          min: 0,
          max: 100,
          step: 1,
        }),
      );

      const textFlipRow = document.createElement("div");
      textFlipRow.className = "videoSynthTextFlipRow";

      const textFlipHField = document.createElement("label");
      textFlipHField.className = "field videoSynthFlipToggleField";
      const textFlipHLabel = document.createElement("span");
      textFlipHLabel.className = "fieldLabel";
      textFlipHLabel.textContent = "flip horizontal";
      this.textFlipHBtn = document.createElement("button");
      this.textFlipHBtn.type = "button";
      this.textFlipHBtn.className = "switchToggle";
      this.textFlipHBtn.setAttribute("aria-label", "flip text horizontal");
      this.textFlipHBtn.setAttribute("aria-pressed", "false");
      this.textFlipHBtn.title = "flip text horizontal: off";
      this.textFlipHBtn.addEventListener("click", () => {
        this.params.textFlipH = !this.params.textFlipH;
        this.syncToggleButtons();
      });
      textFlipHField.appendChild(textFlipHLabel);
      textFlipHField.appendChild(this.textFlipHBtn);

      const textFlipVField = document.createElement("label");
      textFlipVField.className = "field videoSynthFlipToggleField";
      const textFlipVLabel = document.createElement("span");
      textFlipVLabel.className = "fieldLabel";
      textFlipVLabel.textContent = "flip vertical";
      this.textFlipVBtn = document.createElement("button");
      this.textFlipVBtn.type = "button";
      this.textFlipVBtn.className = "switchToggle";
      this.textFlipVBtn.setAttribute("aria-label", "flip text vertical");
      this.textFlipVBtn.setAttribute("aria-pressed", "false");
      this.textFlipVBtn.title = "flip text vertical: off";
      this.textFlipVBtn.addEventListener("click", () => {
        this.params.textFlipV = !this.params.textFlipV;
        this.syncToggleButtons();
      });
      textFlipVField.appendChild(textFlipVLabel);
      textFlipVField.appendChild(this.textFlipVBtn);

      textFlipRow.appendChild(textFlipHField);
      textFlipRow.appendChild(textFlipVField);
      controlsColB.appendChild(textFlipRow);

      controls.appendChild(controlsColA);
      controls.appendChild(controlsColB);

      const toggleRow = document.createElement("div");
      toggleRow.className = "videoSynthToggles";

      this.audioToggleBtn = document.createElement("button");
      this.audioToggleBtn.type = "button";
      this.audioToggleBtn.className = "btn btn-toggle";
      this.audioToggleBtn.textContent = "audio react";
      this.audioToggleBtn.addEventListener("click", () => {
        this.params.audioReactive = !this.params.audioReactive;
        this.syncToggleButtons();
      });

      this.invertToggleBtn = document.createElement("button");
      this.invertToggleBtn.type = "button";
      this.invertToggleBtn.className = "btn btn-toggle";
      this.invertToggleBtn.textContent = "invert";
      this.invertToggleBtn.addEventListener("click", () => {
        this.params.invert = !this.params.invert;
        this.syncToggleButtons();
      });

      this.logoVideoBackgroundBtn = document.createElement("button");
      this.logoVideoBackgroundBtn.type = "button";
      this.logoVideoBackgroundBtn.className = "btn btn-toggle";
      this.logoVideoBackgroundBtn.textContent = "video background";
      this.logoVideoBackgroundBtn.setAttribute("aria-pressed", "false");
      this.logoVideoBackgroundBtn.addEventListener("click", () => {
        const nextEnabled = !this.logoVideoBackgroundEnabled;
        document.dispatchEvent(
          new CustomEvent("video-synth:set-logo-video-background", {
            detail: { enabled: nextEnabled },
          }),
        );
      });

      this.logoVideoCropBtn = document.createElement("button");
      this.logoVideoCropBtn.type = "button";
      this.logoVideoCropBtn.className = "btn btn-toggle";
      this.logoVideoCropBtn.textContent = "crop";
      this.logoVideoCropBtn.setAttribute("aria-pressed", "false");
      this.logoVideoCropBtn.addEventListener("click", () => {
        if (!this.logoVideoBackgroundEnabled) {
          document.dispatchEvent(
            new CustomEvent("video-synth:set-logo-video-background", {
              detail: { enabled: true },
            }),
          );
        }
        this.setLogoCropModeActive(!this.logoCropModeActive);
      });

      toggleRow.appendChild(this.audioToggleBtn);
      toggleRow.appendChild(this.invertToggleBtn);
      toggleRow.appendChild(this.logoVideoBackgroundBtn);
      toggleRow.appendChild(this.logoVideoCropBtn);

      this.shell.appendChild(presetPanel);
      this.shell.appendChild(this.preview);
      this.shell.appendChild(controls);
      this.shell.appendChild(toggleRow);
      this.mount.appendChild(this.shell);

      this.syncHudLabel();
      this.syncToggleButtons();
      this.syncParamInputs();
      this.syncLogoVideoCropUi();

      const gl = this.canvas.getContext("webgl", {
        alpha: false,
        antialias: true,
        premultipliedAlpha: false,
      });
      if (!gl) {
        this.hud.textContent = "webgl unavailable";
        return;
      }
      this.gl = gl;

      if (!this.initGlResources()) {
        this.hud.textContent = "shader init failed";
        return;
      }

      this.initialized = true;
      this.resize();
      window.addEventListener("resize", this.onResize);
      document.addEventListener("visibilitychange", this.onVisibilityChange);
      document.addEventListener(
        "video-synth:logo-video-state",
        this.onLogoVideoStateChange,
      );
    }

    buildPresetPanel() {
      const panel = document.createElement("section");
      panel.className = "videoSynthLibrary";
      panel.setAttribute("aria-label", "video synth presets");

      const grid = document.createElement("div");
      grid.className = "videoSynthLibraryGrid";

      const presetField = document.createElement("label");
      presetField.className = "field videoSynthMetaField";
      const presetLabel = document.createElement("span");
      presetLabel.className = "fieldLabel";
      presetLabel.textContent = "preset";
      this.presetSelect = document.createElement("select");
      this.presetSelect.className = "videoSynthSelect videoSynthMetaInput";
      this.presetSelect.setAttribute("aria-label", "video synth preset select");
      this.presetSelect.addEventListener("change", () => {
        const name = String(this.presetSelect.value || "").trim();
        if (name && this.presetNameInput) this.presetNameInput.value = name;
      });
      presetField.appendChild(presetLabel);
      presetField.appendChild(this.presetSelect);

      const nameField = document.createElement("label");
      nameField.className = "field videoSynthMetaField videoSynthNameField";
      const nameLabel = document.createElement("span");
      nameLabel.className = "fieldLabel";
      nameLabel.textContent = "name";
      this.presetNameInput = document.createElement("input");
      this.presetNameInput.type = "text";
      this.presetNameInput.className = "videoSynthMetaInput videoSynthNameInput";
      this.presetNameInput.inputMode = "text";
      this.presetNameInput.autocomplete = "off";
      this.presetNameInput.spellcheck = false;
      this.presetNameInput.placeholder = "video synth";
      this.presetStatus = document.createElement("span");
      this.presetStatus.className = "status videoSynthPresetStatus";
      this.presetStatus.setAttribute("aria-live", "polite");
      nameField.appendChild(nameLabel);
      nameField.appendChild(this.presetNameInput);
      nameField.appendChild(this.presetStatus);

      const autosaveField = document.createElement("label");
      autosaveField.className = "field videoSynthMetaField videoSynthMetaFieldAutoSave";
      const autosaveLabel = document.createElement("span");
      autosaveLabel.className = "fieldLabel";
      autosaveLabel.textContent = "autosave";
      this.autosaveToggleBtn = document.createElement("button");
      this.autosaveToggleBtn.type = "button";
      this.autosaveToggleBtn.className = "switchToggle";
      this.autosaveToggleBtn.setAttribute("aria-label", "video synth autosave");
      this.autosaveToggleBtn.addEventListener("click", () => {
        this.setAutosaveEnabled(!this.autosaveEnabled);
      });
      this.autosaveIntervalSelect = document.createElement("select");
      this.autosaveIntervalSelect.className = "videoSynthSelect";
      this.autosaveIntervalSelect.setAttribute("aria-label", "video synth autosave interval");
      [1, 5, 10, 15, 30, 60].forEach((minutes) => {
        const option = document.createElement("option");
        option.value = String(minutes);
        option.textContent = `${minutes} min`;
        this.autosaveIntervalSelect.appendChild(option);
      });
      this.autosaveIntervalSelect.addEventListener("change", () => {
        this.setAutosaveInterval(this.autosaveIntervalSelect.value);
      });
      autosaveField.appendChild(autosaveLabel);
      autosaveField.appendChild(this.autosaveToggleBtn);
      autosaveField.appendChild(this.autosaveIntervalSelect);

      grid.appendChild(presetField);
      grid.appendChild(nameField);
      grid.appendChild(autosaveField);

      const actions = document.createElement("div");
      actions.className = "controls settingsRow videoSynthPresetActions";

      this.presetNewBtn = document.createElement("button");
      this.presetNewBtn.type = "button";
      this.presetNewBtn.className = "btn";
      this.presetNewBtn.textContent = "new";
      this.presetNewBtn.addEventListener("click", () => {
        this.resetSession();
        this.setPresetStatus("new");
      });

      this.presetSaveBtn = document.createElement("button");
      this.presetSaveBtn.type = "button";
      this.presetSaveBtn.className = "btn";
      this.presetSaveBtn.textContent = "save";
      this.presetSaveBtn.addEventListener("click", () => {
        this.saveCurrentPreset({ statusLabel: "saving", showPresetStatus: true });
      });

      this.presetLoadBtn = document.createElement("button");
      this.presetLoadBtn.type = "button";
      this.presetLoadBtn.className = "btn";
      this.presetLoadBtn.textContent = "load";
      this.presetLoadBtn.addEventListener("click", () => {
        const name = String(this.presetSelect?.value || "").trim();
        if (!name) {
          this.setPresetStatus("no preset", { ok: false });
          return;
        }
        this.loadPresetByName(name);
      });

      this.presetDefaultBtn = document.createElement("button");
      this.presetDefaultBtn.type = "button";
      this.presetDefaultBtn.className = "btn";
      this.presetDefaultBtn.textContent = "default";
      this.presetDefaultBtn.addEventListener("click", () => {
        const name = String(this.presetSelect?.value || "").trim();
        if (!name) {
          this.setPresetStatus("no preset", { ok: false });
          return;
        }
        this.setDefaultPresetName(name);
        this.refreshPresetSelect(name);
        this.setPresetStatus("default");
      });

      actions.appendChild(this.presetNewBtn);
      actions.appendChild(this.presetSaveBtn);
      actions.appendChild(this.presetLoadBtn);
      actions.appendChild(this.presetDefaultBtn);

      const utilActions = document.createElement("div");
      utilActions.className = "controls settingsRow videoSynthPresetActions";

      this.resetBtn = document.createElement("button");
      this.resetBtn.type = "button";
      this.resetBtn.className = "btn";
      this.resetBtn.textContent = "reset";
      this.resetBtn.addEventListener("click", () => this.resetParams());

      this.fullscreenBtn = document.createElement("button");
      this.fullscreenBtn.type = "button";
      this.fullscreenBtn.className = "btn";
      this.fullscreenBtn.textContent = "fullscreen";
      this.fullscreenBtn.addEventListener("click", () => {
        this.toggleFullscreen();
      });

      utilActions.appendChild(this.resetBtn);
      utilActions.appendChild(this.fullscreenBtn);

      this.songIo = document.createElement("details");
      this.songIo.className = "songIo videoSynthSongIo";

      const summary = document.createElement("summary");
      summary.className = "songIoSummary";
      summary.setAttribute("aria-label", "toggle video synth JSON");

      this.songJsonCopyBtn = document.createElement("button");
      this.songJsonCopyBtn.type = "button";
      this.songJsonCopyBtn.className = "btn";
      this.songJsonCopyBtn.textContent = "copy json";
      this.songJsonCopyBtn.addEventListener("click", (event) => {
        this.copySessionJsonToClipboard(event);
      });

      this.songJsonApplyBtn = document.createElement("button");
      this.songJsonApplyBtn.type = "button";
      this.songJsonApplyBtn.className = "btn";
      this.songJsonApplyBtn.textContent = "apply json";
      this.songJsonApplyBtn.addEventListener("click", (event) => {
        this.applySessionJsonFromEditor(event);
      });

      this.songJsonDownloadBtn = document.createElement("button");
      this.songJsonDownloadBtn.type = "button";
      this.songJsonDownloadBtn.className = "btn";
      this.songJsonDownloadBtn.textContent = "download json";
      this.songJsonDownloadBtn.addEventListener("click", (event) => {
        this.downloadSessionJsonFile(event);
      });

      this.songJsonUploadBtn = document.createElement("button");
      this.songJsonUploadBtn.type = "button";
      this.songJsonUploadBtn.className = "btn";
      this.songJsonUploadBtn.textContent = "upload json";
      this.songJsonUploadBtn.addEventListener("click", (event) => {
        this.requestSessionJsonUpload(event);
      });

      this.songJsonUploadInput = document.createElement("input");
      this.songJsonUploadInput.type = "file";
      this.songJsonUploadInput.accept = "application/json,.json";
      this.songJsonUploadInput.hidden = true;
      this.songJsonUploadInput.addEventListener("change", () => {
        this.handleSessionJsonUploadInput();
      });

      const toggle = document.createElement("span");
      toggle.className = "btn songIoToggle";
      toggle.textContent = "JSON";

      summary.appendChild(this.songJsonCopyBtn);
      summary.appendChild(this.songJsonApplyBtn);
      summary.appendChild(this.songJsonDownloadBtn);
      summary.appendChild(this.songJsonUploadBtn);
      summary.appendChild(this.songJsonUploadInput);
      summary.appendChild(toggle);

      const body = document.createElement("div");
      body.className = "songIoBody";
      const wrap = document.createElement("div");
      wrap.className = "songJsonWrap";
      this.songJsonHighlight = document.createElement("pre");
      this.songJsonHighlight.className = "songJsonHighlight";
      this.songJsonHighlight.setAttribute("aria-hidden", "true");
      this.songJson = document.createElement("textarea");
      this.songJson.className = "songJson";
      this.songJson.rows = 5;
      this.songJson.spellcheck = false;
      this.songJson.autocomplete = "off";
      this.songJson.autocapitalize = "off";
      this.songJson.setAttribute("aria-label", "video synth json");
      this.songJson.placeholder = "paste video synth JSON here";
      this.songJson.addEventListener("input", () => this.updateJsonHighlight());
      this.songJson.addEventListener("scroll", () => this.syncJsonScroll());
      wrap.appendChild(this.songJsonHighlight);
      wrap.appendChild(this.songJson);
      body.appendChild(wrap);

      this.songIo.appendChild(summary);
      this.songIo.appendChild(body);
      this.songIo.addEventListener("toggle", () => {
        if (this.songIo.open) this.syncJsonEditorFromSession();
      });

      panel.appendChild(grid);
      panel.appendChild(actions);
      panel.appendChild(utilActions);
      panel.appendChild(this.songIo);

      this.refreshPresetSelect();
      this.setAutosaveInterval(this.autosaveIntervalMinutes);
      this.setAutosaveEnabled(this.autosaveEnabled);

      return panel;
    }

    makeColorField({ key, label }) {
      const field = document.createElement("label");
      field.className = "field videoSynthField videoSynthColorField";

      const labelEl = document.createElement("span");
      labelEl.className = "fieldLabel";
      labelEl.textContent = label;

      const color = document.createElement("input");
      color.type = "color";
      color.className = "videoSynthColorInput";
      color.value = this.params[key];

      const hex = document.createElement("input");
      hex.className = "num videoSynthHexInput";
      hex.type = "text";
      hex.value = this.params[key];
      hex.maxLength = 7;

      const syncValue = (raw) => {
        const normalized = this.normalizeHexColor(raw, this.params[key]);
        this.params[key] = normalized;
        if (key === "textColor") this.textTextureDirty = true;
        color.value = normalized;
        hex.value = normalized;
      };

      color.addEventListener("input", () => syncValue(color.value));
      hex.addEventListener("input", () => syncValue(hex.value));

      if (key === "colorA") { this.colorAInput = color; this.colorAHexInput = hex; }
      if (key === "colorB") { this.colorBInput = color; this.colorBHexInput = hex; }
      if (key === "textColor") { this.textColorInput = color; this.textColorHexInput = hex; }

      field.appendChild(labelEl);
      field.appendChild(color);
      field.appendChild(hex);

      return field;
    }

    makeRangeField({ key, label, min, max, step }) {
      const field = document.createElement("label");
      field.className = "field videoSynthField";

      const labelEl = document.createElement("span");
      labelEl.className = "fieldLabel";
      labelEl.textContent = label;

      const range = document.createElement("input");
      range.type = "range";
      range.min = String(min);
      range.max = String(max);
      range.step = String(step);
      range.value = String(this.params[key]);

      const num = document.createElement("input");
      num.className = "num";
      num.type = "number";
      num.min = String(min);
      num.max = String(max);
      num.step = String(step);
      num.value = String(this.params[key]);

      const syncValue = (nextRaw) => {
        const next = Number(nextRaw);
        const safe = Number.isFinite(next)
          ? Math.max(min, Math.min(max, next))
          : this.params[key];
        this.params[key] = safe;
        if (key === "textSize" || key === "textMix") this.textTextureDirty = true;
        range.value = String(safe);
        num.value = String(safe);
      };

      range.addEventListener("input", () => syncValue(range.value));
      num.addEventListener("input", () => syncValue(num.value));

      this.rangeInputs.set(key, { range, num });

      field.appendChild(labelEl);
      field.appendChild(range);
      field.appendChild(num);

      return field;
    }

    makeTextField({ key, label, placeholder = "" }) {
      const field = document.createElement("label");
      field.className = "field videoSynthField videoSynthTextField";

      const labelEl = document.createElement("span");
      labelEl.className = "fieldLabel";
      labelEl.textContent = label;

      const input = document.createElement("input");
      input.type = "text";
      input.className = "videoSynthTextInput";
      input.placeholder = placeholder;
      input.autocomplete = "off";
      input.spellcheck = false;
      input.value = String(this.params[key] || "");

      input.addEventListener("input", () => {
        this.params[key] = String(input.value || "");
        this.textTextureDirty = true;
      });

      field.appendChild(labelEl);
      field.appendChild(input);
      return field;
    }

    setLogoVideoBackgroundState(nextEnabled, nextCropX, nextCropY, nextCropSize) {
      if (typeof nextEnabled === "boolean") {
        this.logoVideoBackgroundEnabled = nextEnabled;
      }
      if (Number.isFinite(Number(nextCropX))) {
        this.logoVideoCropX = this.clampNumber(Math.round(Number(nextCropX)), 0, 100);
      }
      if (Number.isFinite(Number(nextCropY))) {
        this.logoVideoCropY = this.clampNumber(Math.round(Number(nextCropY)), 0, 100);
      }
      if (Number.isFinite(Number(nextCropSize))) {
        this.logoVideoCropSize = this.clampNumber(
          Math.round(Number(nextCropSize)),
          30,
          100,
        );
      }
      if (!this.logoVideoBackgroundEnabled && this.logoCropModeActive) {
        this.setLogoCropModeActive(false);
      }
      this.syncLogoVideoCropUi();
    }

    syncLogoVideoCropUi() {
      if (this.logoVideoBackgroundBtn) {
        this.logoVideoBackgroundBtn.setAttribute(
          "aria-pressed",
          this.logoVideoBackgroundEnabled ? "true" : "false",
        );
      }
      if (this.logoVideoCropBtn) {
        this.logoVideoCropBtn.setAttribute(
          "aria-pressed",
          this.logoCropModeActive ? "true" : "false",
        );
      }
      this.updateLogoCropOverlay();
    }

    emitLogoCropChange(nextCropX, nextCropY, nextCropSize) {
      this.logoVideoCropX = this.clampNumber(Math.round(nextCropX), 0, 100);
      this.logoVideoCropY = this.clampNumber(Math.round(nextCropY), 0, 100);
      this.logoVideoCropSize = this.clampNumber(
        Math.round(nextCropSize),
        30,
        100,
      );
      this.updateLogoCropOverlay();
      document.dispatchEvent(
        new CustomEvent("video-synth:set-logo-video-crop", {
          detail: {
            cropX: this.logoVideoCropX,
            cropY: this.logoVideoCropY,
            cropSize: this.logoVideoCropSize,
          },
        }),
      );
    }

    getLogoAspectRatio() {
      const logo = document.querySelector(".logo");
      if (!logo) return 3;
      const rect = logo.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        return rect.width / rect.height;
      }
      return 3;
    }

    getLogoCropGeometry(previewW, previewH) {
      const w = Math.max(1, Number(previewW) || 1);
      const h = Math.max(1, Number(previewH) || 1);
      const targetAspect = this.getLogoAspectRatio();
      const previewAspect = w / h;

      let maxRectW = w;
      let maxRectH = h;
      if (previewAspect > targetAspect) {
        maxRectH = h;
        maxRectW = maxRectH * targetAspect;
      } else {
        maxRectW = w;
        maxRectH = maxRectW / targetAspect;
      }

      const sizeRatio = this.clampNumber(this.logoVideoCropSize, 30, 100) / 100;
      const rectW = Math.max(1, maxRectW * sizeRatio);
      const rectH = Math.max(1, maxRectH * sizeRatio);
      const maxX = Math.max(0, w - rectW);
      const maxY = Math.max(0, h - rectH);
      const rectX = maxX * (this.clampNumber(this.logoVideoCropX, 0, 100) / 100);
      const rectY = maxY * (this.clampNumber(this.logoVideoCropY, 0, 100) / 100);

      return {
        rectX,
        rectY,
        rectW,
        rectH,
        maxRectW,
        maxRectH,
        aspect: targetAspect,
      };
    }

    updateLogoCropOverlay() {
      if (!this.logoCropOverlay || !this.logoCropRect || !this.preview) return;
      const active = this.logoVideoBackgroundEnabled && this.logoCropModeActive;
      this.logoCropOverlay.classList.toggle("is-active", active);
      this.preview.classList.toggle("is-crop-active", active);
      if (!active) return;

      const previewRect = this.preview.getBoundingClientRect();
      const geo = this.getLogoCropGeometry(previewRect.width, previewRect.height);
      this.logoCropRect.style.left = `${geo.rectX}px`;
      this.logoCropRect.style.top = `${geo.rectY}px`;
      this.logoCropRect.style.width = `${geo.rectW}px`;
      this.logoCropRect.style.height = `${geo.rectH}px`;
    }

    setLogoCropModeActive(nextActive) {
      const active = Boolean(nextActive) && this.logoVideoBackgroundEnabled;
      this.logoCropModeActive = active;
      this.syncLogoVideoCropUi();
    }

    resetLogoCropToDefault() {
      this.emitLogoCropChange(50, 60, 88);
      this.setPresetStatus("crop reset");
    }

    handleLogoCropPointerDown(event, mode) {
      // Mobile affordance: quick double tap on crop box resets to default crop.
      if (mode === "move" && event.pointerType === "touch") {
        const now =
          typeof performance !== "undefined" && performance.now
            ? performance.now()
            : Date.now();
        const dt = now - this.logoCropLastTapAtMs;
        const dx = event.clientX - this.logoCropLastTapX;
        const dy = event.clientY - this.logoCropLastTapY;
        const distSq = (dx * dx) + (dy * dy);

        this.logoCropLastTapAtMs = now;
        this.logoCropLastTapX = event.clientX;
        this.logoCropLastTapY = event.clientY;

        if (dt > 0 && dt <= 320 && distSq <= (26 * 26)) {
          event.preventDefault();
          event.stopPropagation();
          this.resetLogoCropToDefault();
          return;
        }
      }

      this.beginLogoCropDrag(event, mode);
    }

    beginLogoCropDrag(event, mode) {
      if (!this.logoCropModeActive || !this.preview) return;
      if (event.button != null && event.button !== 0) return;

      event.preventDefault();
      event.stopPropagation();

      const previewRect = this.preview.getBoundingClientRect();
      const geo = this.getLogoCropGeometry(previewRect.width, previewRect.height);
      this.logoCropDragState = {
        mode,
        pointerId: event.pointerId,
        captureTarget:
          event.target && typeof event.target.setPointerCapture === "function"
            ? event.target
            : null,
        startPointerX: event.clientX,
        startPointerY: event.clientY,
        startRectX: geo.rectX,
        startRectY: geo.rectY,
        startRectW: geo.rectW,
        startRectH: geo.rectH,
        startCropX: this.logoVideoCropX,
        startCropY: this.logoVideoCropY,
        startCropSize: this.logoVideoCropSize,
        previewW: Math.max(1, previewRect.width),
        previewH: Math.max(1, previewRect.height),
        maxRectW: geo.maxRectW,
        maxRectH: geo.maxRectH,
        minRectW: geo.maxRectW * 0.3,
        aspect: geo.aspect,
      };
      if (
        this.logoCropDragState.captureTarget
        && this.logoCropDragState.pointerId != null
      ) {
        try {
          this.logoCropDragState.captureTarget.setPointerCapture(
            this.logoCropDragState.pointerId,
          );
        } catch {
          // ignore
        }
      }
      if (this.logoCropRect) {
        this.logoCropRect.classList.toggle("is-dragging", mode === "move");
        this.logoCropRect.classList.toggle("is-resizing", mode === "resize");
      }
      window.addEventListener("pointermove", this.onLogoCropPointerMove);
      window.addEventListener("pointerup", this.onLogoCropPointerUp);
      window.addEventListener("pointercancel", this.onLogoCropPointerUp);
    }

    clampNumber(value, min, max) {
      return sharedClampNumber(value, min, max);
    }

    numberOrFallback(value, fallback) {
      return sharedNumberOrFallback(value, fallback);
    }

    getDefaultParams() {
      if (this.loadedDefaults) {
        return { ...this.loadedDefaults };
      }
      return {
        mode: 0,
        formula: 0,
        intensity: 72,
        glitch: 58,
        glitchLayer: 54,
        glitchOffset: 58,
        split: 72,
        noiseAmt: 36,
        scan: 32,
        pixel: 14,
        hue: 0,
        drift: 44,
        videoSpeed: 70,
        audioMix: 62,
        autoMix: 68,
        audioReactive: true,
        invert: false,
        colorA: "#6600ff",
        colorB: "#ff0077",
        textContent: "",
        textSize: 62,
        textMix: 70,
        textColor: "#f4ecff",
        textFlipH: false,
        textFlipV: false,
      };
    }

    getCyberpunkParams() {
      return {
        mode: 0,
        formula: 0,
        intensity: 78,
        glitch: 66,
        glitchLayer: 62,
        glitchOffset: 66,
        split: 82,
        noiseAmt: 38,
        scan: 36,
        pixel: 12,
        hue: 0,
        drift: 48,
        videoSpeed: 74,
        audioMix: 68,
        autoMix: 72,
        audioReactive: true,
        invert: false,
        colorA: "#5500ff",
        colorB: "#ff0055",
        textContent: "",
        textSize: 66,
        textMix: 76,
        textColor: "#ffd8ff",
      };
    }

    normalizeParams(raw, fallback = this.getDefaultParams()) {
      const source = raw && typeof raw === "object" ? raw : {};
      const safeBase = fallback && typeof fallback === "object"
        ? fallback
        : this.getDefaultParams();
      return {
        mode: this.clampNumber(
          Math.round(this.numberOrFallback(source.mode, safeBase.mode)),
          0,
          5,
        ),
        formula: this.clampNumber(
          Math.round(this.numberOrFallback(source.formula, safeBase.formula)),
          0,
          5,
        ),
        intensity: this.clampNumber(
          Math.round(this.numberOrFallback(source.intensity, safeBase.intensity)),
          0,
          100,
        ),
        glitch: this.clampNumber(
          Math.round(this.numberOrFallback(source.glitch, safeBase.glitch)),
          0,
          100,
        ),
        glitchLayer: this.clampNumber(
          Math.round(this.numberOrFallback(source.glitchLayer, safeBase.glitchLayer)),
          0,
          100,
        ),
        glitchOffset: this.clampNumber(
          Math.round(this.numberOrFallback(source.glitchOffset, safeBase.glitchOffset)),
          0,
          100,
        ),
        split: this.clampNumber(
          Math.round(this.numberOrFallback(source.split, safeBase.split)),
          0,
          100,
        ),
        noiseAmt: this.clampNumber(
          Math.round(this.numberOrFallback(source.noiseAmt, safeBase.noiseAmt)),
          0,
          100,
        ),
        scan: this.clampNumber(
          Math.round(this.numberOrFallback(source.scan, safeBase.scan)),
          0,
          100,
        ),
        pixel: this.clampNumber(
          Math.round(this.numberOrFallback(source.pixel, safeBase.pixel)),
          0,
          100,
        ),
        hue: this.clampNumber(
          Math.round(this.numberOrFallback(source.hue, safeBase.hue)),
          0,
          100,
        ),
        drift: this.clampNumber(
          Math.round(this.numberOrFallback(source.drift, safeBase.drift)),
          0,
          100,
        ),
        videoSpeed: this.clampNumber(
          Math.round(this.numberOrFallback(source.videoSpeed, safeBase.videoSpeed)),
          0,
          100,
        ),
        audioMix: this.clampNumber(
          Math.round(this.numberOrFallback(source.audioMix, safeBase.audioMix)),
          0,
          100,
        ),
        autoMix: this.clampNumber(
          Math.round(this.numberOrFallback(source.autoMix, safeBase.autoMix)),
          0,
          100,
        ),
        audioReactive:
          typeof source.audioReactive === "boolean"
            ? source.audioReactive
            : Boolean(safeBase.audioReactive),
        invert:
          typeof source.invert === "boolean"
            ? source.invert
            : Boolean(safeBase.invert),
        colorA: this.normalizeHexColor(source.colorA, safeBase.colorA),
        colorB: this.normalizeHexColor(source.colorB, safeBase.colorB),
        textContent: String(source.textContent ?? safeBase.textContent ?? ""),
        textSize: this.clampNumber(
          Math.round(this.numberOrFallback(source.textSize, safeBase.textSize)),
          10,
          160,
        ),
        textMix: this.clampNumber(
          Math.round(this.numberOrFallback(source.textMix, safeBase.textMix)),
          0,
          100,
        ),
        textColor: this.normalizeHexColor(source.textColor, safeBase.textColor),
        textFlipH:
          typeof source.textFlipH === "boolean"
            ? source.textFlipH
            : Boolean(safeBase.textFlipH),
        textFlipV:
          typeof source.textFlipV === "boolean"
            ? source.textFlipV
            : Boolean(safeBase.textFlipV),
      };
    }

    applyParams(nextParams) {
      this.params = this.normalizeParams(nextParams, this.getDefaultParams());
      this.textTextureDirty = true;
      this.syncParamInputs();
    }

    syncToggleButtons() {
      if (this.audioToggleBtn) {
        this.audioToggleBtn.setAttribute(
          "aria-pressed",
          this.params.audioReactive ? "true" : "false",
        );
        this.audioToggleBtn.title = this.params.audioReactive
          ? "audio react: on"
          : "audio react: off";
      }
      if (this.invertToggleBtn) {
        this.invertToggleBtn.setAttribute(
          "aria-pressed",
          this.params.invert ? "true" : "false",
        );
        this.invertToggleBtn.title = this.params.invert
          ? "invert: on"
          : "invert: off";
      }
      if (this.textFlipHBtn) {
        this.textFlipHBtn.setAttribute(
          "aria-pressed",
          this.params.textFlipH ? "true" : "false",
        );
        this.textFlipHBtn.title = this.params.textFlipH
          ? "flip text horizontal: on"
          : "flip text horizontal: off";
      }
      if (this.textFlipVBtn) {
        this.textFlipVBtn.setAttribute(
          "aria-pressed",
          this.params.textFlipV ? "true" : "false",
        );
        this.textFlipVBtn.title = this.params.textFlipV
          ? "flip text vertical: on"
          : "flip text vertical: off";
      }
    }

    syncHudLabel() {
      if (!this.hud) return;
      const labels = [
        "waveform",
        "noise field",
        "grid fold",
        "rings",
        "bars",
        "plasma",
      ];
      const suffix = this.params.audioReactive ? " · audio" : " · auto";
      this.hud.textContent = `${labels[this.params.mode] || "video synth"}${suffix}`;
    }

    syncParamInputs() {
      if (this.modeSelect) this.modeSelect.value = String(this.params.mode);
      if (this.formulaSelect) {
        this.formulaSelect.value = String(this.params.formula);
      }
      for (const [key, pair] of this.rangeInputs.entries()) {
        if (!pair) continue;
        pair.range.value = String(this.params[key]);
        pair.num.value = String(this.params[key]);
      }
      if (this.colorAInput) this.colorAInput.value = this.params.colorA;
      if (this.colorAHexInput) this.colorAHexInput.value = this.params.colorA;
      if (this.colorBInput) this.colorBInput.value = this.params.colorB;
      if (this.colorBHexInput) this.colorBHexInput.value = this.params.colorB;
      if (this.textColorInput) this.textColorInput.value = this.params.textColor;
      if (this.textColorHexInput) this.textColorHexInput.value = this.params.textColor;

      const textInput = this.shell
        ? this.shell.querySelector(".videoSynthTextInput")
        : null;
      if (textInput) textInput.value = String(this.params.textContent || "");

      this.syncToggleButtons();
      this.syncHudLabel();
      if (this.songIo?.open) this.syncJsonEditorFromSession();
    }

    resetParams() {
      this.applyParams(this.getDefaultParams());
    }

    applyCyberpunkPreset() {
      this.applyParams(this.getCyberpunkParams());
    }

    sanitizePresetName(name) {
      return String(name || "").trim();
    }

    presetStorageKey(name) {
      return `${VIDEO_SYNTH_PRESET_STORAGE_PREFIX}${name}`;
    }

    readPresetIndex() {
      try {
        const raw = window.localStorage.getItem(VIDEO_SYNTH_PRESET_INDEX_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed
          .map((name) => this.sanitizePresetName(name))
          .filter((name) => name.length > 0);
      } catch {
        return [];
      }
    }

    writePresetIndex(names) {
      try {
        window.localStorage.setItem(
          VIDEO_SYNTH_PRESET_INDEX_KEY,
          JSON.stringify(names),
        );
      } catch {
        // ignore
      }
    }

    getDefaultPresetName() {
      try {
        const name = window.localStorage.getItem(VIDEO_SYNTH_PRESET_DEFAULT_KEY);
        return name ? this.sanitizePresetName(name) : "";
      } catch {
        return "";
      }
    }

    setDefaultPresetName(name) {
      const cleanName = this.sanitizePresetName(name);
      if (!cleanName) return;
      try {
        window.localStorage.setItem(VIDEO_SYNTH_PRESET_DEFAULT_KEY, cleanName);
      } catch {
        // ignore
      }
    }

    getLocalPreset(name) {
      const cleanName = this.sanitizePresetName(name);
      if (!cleanName) return null;
      try {
        const raw = window.localStorage.getItem(this.presetStorageKey(cleanName));
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === "object" ? parsed : null;
      } catch {
        return null;
      }
    }

    getPreset(name) {
      const cleanName = this.sanitizePresetName(name);
      if (!cleanName) return null;
      const localPreset = this.getLocalPreset(cleanName);
      if (localPreset) return localPreset;
      return Object.prototype.hasOwnProperty.call(this.embeddedPresets, cleanName)
        ? this.embeddedPresets[cleanName]
        : null;
    }

    getAllPresetNames() {
      const names = new Set(this.readPresetIndex());
      Object.keys(this.embeddedPresets).forEach((name) => names.add(name));
      return Array.from(names).sort((a, b) => a.localeCompare(b));
    }

    savePreset(name, state) {
      const cleanName = this.sanitizePresetName(name);
      if (!cleanName) return false;

      try {
        this.clearLastPresetSaveError();
        window.localStorage.setItem(
          this.presetStorageKey(cleanName),
          JSON.stringify(state),
        );
      } catch (error) {
        this.setLastPresetSaveError(error);
        return false;
      }

      const names = this.readPresetIndex();
      if (!names.includes(cleanName)) {
        names.push(cleanName);
        names.sort((a, b) => a.localeCompare(b));
        this.writePresetIndex(names);
      }

      if (!this.getDefaultPresetName()) this.setDefaultPresetName(cleanName);
      return true;
    }

    makeUniquePresetName(base) {
      return sharedMakeUniquePresetName(
        this.sanitizePresetName(base),
        this.getAllPresetNames(),
        "video synth",
      );
    }

    refreshPresetSelect(preferredValue = "") {
      if (!this.presetSelect) return;
      const localNames = this.readPresetIndex();
      const localSet = new Set(localNames);
      const localDefault = this.getDefaultPresetName();
      const embeddedDefault = this.embeddedDefaultPresetName;
      const selected = this.sanitizePresetName(preferredValue || this.presetSelect.value);

      this.presetSelect.innerHTML = "";
      const emptyOpt = document.createElement("option");
      emptyOpt.value = "";
      emptyOpt.textContent = "—";
      this.presetSelect.appendChild(emptyOpt);

      for (const name of this.getAllPresetNames()) {
        const opt = document.createElement("option");
        const isLocal = localSet.has(name);
        const isEmbedded = Object.prototype.hasOwnProperty.call(this.embeddedPresets, name);
        let label = name;
        if (name === localDefault) label += " (default)";
        else if (!isLocal && name === embeddedDefault) label += " (song default)";
        else if (isEmbedded && !isLocal) label += " [song]";
        opt.value = name;
        opt.textContent = label;
        this.presetSelect.appendChild(opt);
      }

      if (selected && this.getPreset(selected)) {
        this.presetSelect.value = selected;
      } else if (localDefault && this.getPreset(localDefault)) {
        this.presetSelect.value = localDefault;
      } else if (embeddedDefault && this.getPreset(embeddedDefault)) {
        this.presetSelect.value = embeddedDefault;
      } else {
        this.presetSelect.value = "";
      }
    }

    safeJsonParse(text) {
      return sharedSafeJsonParse(text);
    }

    fileSafeStem(value, fallback = "video-synth") {
      return sharedFileSafeStem(value, fallback);
    }

    highlightJson(text) {
      return sharedHighlightJson(text);
    }

    syncJsonScroll() {
      if (!this.songJson || !this.songJsonHighlight) return;
      this.songJsonHighlight.scrollTop = this.songJson.scrollTop;
      this.songJsonHighlight.scrollLeft = this.songJson.scrollLeft;
    }

    updateJsonHighlight() {
      if (!this.songJson || !this.songJsonHighlight) return;
      this.songJsonHighlight.innerHTML = this.highlightJson(this.songJson.value);
      this.syncJsonScroll();
    }

    syncJsonEditorFromSession() {
      if (!this.songJson) return;
      this.songJson.value = JSON.stringify(this.exportSession(), null, 2);
      this.updateJsonHighlight();
    }

    showSongIo() {
      if (!this.songIo) return;
      this.songIo.open = true;
      this.syncJsonEditorFromSession();
    }

    isQuotaExceededError(error) {
      return sharedIsQuotaExceededError(error);
    }

    setLastPresetSaveError(error) {
      if (this.isQuotaExceededError(error)) {
        this.lastPresetSaveErrorMessage = "save failed: storage full";
        return;
      }
      this.lastPresetSaveErrorMessage = "save failed";
    }

    clearLastPresetSaveError() {
      this.lastPresetSaveErrorMessage = "";
    }

    setPresetStatus(message, { busy = false, ok = true } = {}) {
      const hub = window.AelonyoriStatus;
      if (hub && typeof hub.set === "function") {
        hub.set(message, { busy, ok });
        return;
      }
    }

    normalizeAutosaveInterval(value) {
      const fallback = Number.isFinite(this.autosaveIntervalMinutes)
        ? this.autosaveIntervalMinutes
        : 5;
      return sharedNormalizeIntervalChoice(
        value,
        [1, 5, 10, 15, 30, 60],
        fallback,
      );
    }

    readAutosaveConfig() {
      try {
        const raw = window.localStorage.getItem(VIDEO_SYNTH_AUTOSAVE_KEY);
        if (!raw) {
          return { enabled: false, intervalMinutes: 5 };
        }
        const parsed = JSON.parse(raw);
        return {
          enabled: Boolean(parsed && parsed.enabled),
          intervalMinutes: this.normalizeAutosaveInterval(
            parsed && parsed.intervalMinutes,
          ),
        };
      } catch {
        return { enabled: false, intervalMinutes: 5 };
      }
    }

    writeAutosaveConfig() {
      try {
        window.localStorage.setItem(
          VIDEO_SYNTH_AUTOSAVE_KEY,
          JSON.stringify({
            enabled: Boolean(this.autosaveEnabled),
            intervalMinutes: Number(this.autosaveIntervalMinutes),
          }),
        );
      } catch {
        // ignore
      }
    }

    clearAutosaveTimer() {
      if (this.autosaveTimerId == null) return;
      window.clearInterval(this.autosaveTimerId);
      this.autosaveTimerId = null;
    }

    syncAutosaveTimer() {
      this.clearAutosaveTimer();
      if (!this.autosaveEnabled) return;
      this.autosaveTimerId = window.setInterval(
        () => this.runAutosave(),
        this.autosaveIntervalMinutes * 60 * 1000,
      );
    }

    setAutosaveInterval(nextIntervalMinutes) {
      this.autosaveIntervalMinutes = this.normalizeAutosaveInterval(nextIntervalMinutes);
      if (this.autosaveIntervalSelect) {
        this.autosaveIntervalSelect.value = String(this.autosaveIntervalMinutes);
      }
      this.writeAutosaveConfig();
      this.syncAutosaveTimer();
      if (this.songIo?.open) this.syncJsonEditorFromSession();
    }

    setAutosaveEnabled(nextEnabled) {
      this.autosaveEnabled = Boolean(nextEnabled);
      if (this.autosaveToggleBtn) {
        this.autosaveToggleBtn.setAttribute(
          "aria-pressed",
          this.autosaveEnabled ? "true" : "false",
        );
        this.autosaveToggleBtn.title = this.autosaveEnabled
          ? "autosave: on"
          : "autosave: off";
      }
      if (this.autosaveIntervalSelect) {
        this.autosaveIntervalSelect.disabled = !this.autosaveEnabled;
      }
      this.writeAutosaveConfig();
      this.syncAutosaveTimer();
      if (this.songIo?.open) this.syncJsonEditorFromSession();
    }

    saveCurrentPreset({ statusLabel = "saving", showPresetStatus = true } = {}) {
      if (showPresetStatus) this.setPresetStatus("", { busy: true });

      const state = this.exportState();
      const requestedName = this.sanitizePresetName(this.presetNameInput?.value);
      const selectedName = this.sanitizePresetName(this.presetSelect?.value);
      const name = requestedName || selectedName || this.makeUniquePresetName("video synth");

      const ok = this.savePreset(name, state);
      if (!ok) {
        if (showPresetStatus) {
          this.setPresetStatus(this.lastPresetSaveErrorMessage || "save failed", {
            ok: false,
          });
        }
        return false;
      }

      if (this.presetNameInput) this.presetNameInput.value = name;
      this.refreshPresetSelect(name);
      if (this.presetSelect) this.presetSelect.value = name;
      if (showPresetStatus) this.setPresetStatus(statusLabel);
      if (this.songIo?.open) this.syncJsonEditorFromSession();
      return true;
    }

    runAutosave() {
      if (!this.autosaveEnabled) return;
      const ok = this.saveCurrentPreset({
        statusLabel: "autosaving",
        showPresetStatus: true,
      });
      if (!ok) this.setPresetStatus("autosave failed", { ok: false });
    }

    loadPresetByName(name, { showStatus = true } = {}) {
      const cleanName = this.sanitizePresetName(name);
      if (!cleanName) {
        if (showStatus) this.setPresetStatus("no preset", { ok: false });
        return false;
      }
      const preset = this.getPreset(cleanName);
      if (!preset) {
        if (showStatus) this.setPresetStatus("missing", { ok: false });
        return false;
      }
      const ok = this.applyState(preset);
      if (!ok) {
        if (showStatus) this.setPresetStatus("invalid preset", { ok: false });
        return false;
      }
      if (this.presetNameInput) this.presetNameInput.value = cleanName;
      this.refreshPresetSelect(cleanName);
      if (this.presetSelect) this.presetSelect.value = cleanName;
      if (showStatus) this.setPresetStatus("loading");
      return true;
    }

    async copySessionJsonToClipboard(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.setPresetStatus("", { busy: true });
      const text = JSON.stringify(this.exportSession(), null, 2);
      this.showSongIo();
      if (this.songJson) {
        this.songJson.value = text;
        this.updateJsonHighlight();
        this.songJson.focus();
      }

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        }
      } catch {
        // ignore clipboard failures
      }

      this.setPresetStatus("copied json");
    }

    applySessionJsonFromEditor(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.showSongIo();
      this.setPresetStatus("", { busy: true });
      this.updateJsonHighlight();
      const parsed = this.safeJsonParse(this.songJson?.value || "");
      if (!parsed.ok) {
        console.warn("Invalid video synth JSON", parsed.error);
        this.setPresetStatus("invalid json", { ok: false });
        return;
      }

      const isSessionShape =
        parsed.value
        && typeof parsed.value === "object"
        && (
          parsed.value.currentState
          || parsed.value.presets
          || parsed.value.selectedPreset
          || parsed.value.currentName
        );

      const ok = isSessionShape
        ? this.importSession(parsed.value)
        : this.applyState(parsed.value);
      if (!ok) {
        this.setPresetStatus("invalid synth json", { ok: false });
        return;
      }
      if (!isSessionShape && this.songIo?.open) this.syncJsonEditorFromSession();
      this.setPresetStatus("applied json");
    }

    downloadSessionJsonFile(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.setPresetStatus("", { busy: true });
      const session = this.exportSession();
      const text = JSON.stringify(session, null, 2);
      this.showSongIo();
      if (this.songJson) {
        this.songJson.value = text;
        this.updateJsonHighlight();
      }

      const sourceName = this.sanitizePresetName(this.presetNameInput?.value)
        || this.sanitizePresetName(session.selectedPreset)
        || "video synth";
      const filename = `${this.fileSafeStem(sourceName)}.aelonyori-video-synth.json`;
      sharedTriggerBlobDownload(text, filename, "application/json");
      this.setPresetStatus("downloading json");
    }

    requestSessionJsonUpload(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      if (!this.songJsonUploadInput) return;
      this.songJsonUploadInput.value = "";
      this.songJsonUploadInput.click();
    }

    async handleSessionJsonUploadInput() {
      if (!this.songJsonUploadInput) return;
      const file = this.songJsonUploadInput.files?.[0] || null;
      if (!file) return;

      this.setPresetStatus("", { busy: true });
      try {
        const text = await file.text();
        this.showSongIo();
        if (this.songJson) {
          this.songJson.value = text;
          this.updateJsonHighlight();
        }
        this.applySessionJsonFromEditor();
        this.setPresetStatus("uploading json");
      } catch (error) {
        console.warn("Unable to read uploaded video synth JSON", error);
        this.setPresetStatus("upload failed", { ok: false });
      }
    }

    exportState() {
      return {
        version: 1,
        params: this.normalizeParams(this.params, this.getDefaultParams()),
      };
    }

    applyState(state) {
      if (!state || typeof state !== "object") return false;
      // Support plain params, { version, params } state format, and legacy
      // { currentState, presets, ... } session format for backward compat.
      const source =
        state.params && typeof state.params === "object"
          ? state.params
          : state.currentState && typeof state.currentState === "object"
            ? (state.currentState.params && typeof state.currentState.params === "object"
                ? state.currentState.params
                : state.currentState)
            : state;
      this.applyParams(source);
      return true;
    }

    exportSession() {
      const presets = {};
      for (const name of this.getAllPresetNames()) {
        const preset = this.getPreset(name);
        if (preset) presets[name] = preset;
      }
      return {
        version: 1,
        currentName: this.sanitizePresetName(this.presetNameInput?.value) || undefined,
        selectedPreset: this.sanitizePresetName(this.presetSelect?.value) || undefined,
        defaultPreset: this.getDefaultPresetName() || this.embeddedDefaultPresetName || undefined,
        autosaveEnabled: Boolean(this.autosaveEnabled),
        autosaveIntervalMinutes: Number(this.autosaveIntervalMinutes),
        currentState: this.exportState(),
        presets,
      };
    }

    importSession(session) {
      if (!session || typeof session !== "object") return false;

      const nextEmbeddedPresets = Object.create(null);
      const rawPresets = session.presets && typeof session.presets === "object"
        ? session.presets
        : {};

      for (const [rawName, value] of Object.entries(rawPresets)) {
        const name = this.sanitizePresetName(rawName);
        if (!name || !value || typeof value !== "object") continue;
        nextEmbeddedPresets[name] = value;
      }

      this.embeddedPresets = nextEmbeddedPresets;
      const embeddedDefault = this.sanitizePresetName(session.defaultPreset);
      this.embeddedDefaultPresetName = nextEmbeddedPresets[embeddedDefault]
        ? embeddedDefault
        : "";

      this.setAutosaveInterval(
        this.numberOrFallback(session.autosaveIntervalMinutes, this.autosaveIntervalMinutes),
      );
      this.setAutosaveEnabled(
        typeof session.autosaveEnabled === "boolean"
          ? session.autosaveEnabled
          : this.autosaveEnabled,
      );

      const selectedPreset = this.sanitizePresetName(session.selectedPreset);
      const currentName = this.sanitizePresetName(session.currentName);

      let applied = false;
      if (selectedPreset && this.getPreset(selectedPreset)) {
        applied = this.loadPresetByName(selectedPreset, { showStatus: false });
      }
      if (!applied && session.currentState) {
        applied = this.applyState(session.currentState);
      }
      if (!applied) {
        this.resetParams();
      }

      if (this.presetNameInput) {
        this.presetNameInput.value = currentName || selectedPreset || "";
      }
      this.refreshPresetSelect(selectedPreset);
      if (!selectedPreset && this.presetSelect) this.presetSelect.value = "";
      if (this.songIo?.open) this.syncJsonEditorFromSession();
      return true;
    }

    resetSession() {
      this.embeddedPresets = Object.create(null);
      this.embeddedDefaultPresetName = "";
      this.resetParams();
      if (this.presetNameInput) this.presetNameInput.value = "";
      this.refreshPresetSelect();
      if (this.presetSelect) this.presetSelect.value = "";
      if (this.songJson) {
        this.songJson.value = "";
        this.updateJsonHighlight();
      }
    }

    toggleFullscreen() {
      if (!this.preview) return;
      const doc = document;
      if (doc.fullscreenElement === this.preview) {
        doc.exitFullscreen?.();
        return;
      }
      this.preview.requestFullscreen?.();
    }

    setAudioSource(masterNode) {
      if (this.audioNode === masterNode) return;
      this.detachAudioTap();
      this.audioNode = masterNode || null;
      if (!this.audioNode || !this.audioNode.context) return;

      const analyser = this.audioNode.context.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.82;
      analyser.minDecibels = -95;
      analyser.maxDecibels = -5;

      this.audioNode.connect(analyser);
      this.analyser = analyser;
      this.audioFrame = new Uint8Array(analyser.fftSize);
      this.audioTextureFrame = new Uint8Array(this.textureSize);
    }

    setActive(nextActive) {
      this.active = Boolean(nextActive);
      this.syncPlaybackState();
    }

    setLogoFeedActive(nextEnabled) {
      this.logoFeedActive = Boolean(nextEnabled);
      this.syncPlaybackState();
    }

    syncPlaybackState() {
      if (!this.initialized) return;
      if (this.shouldRun()) this.start();
      else this.stop();
    }

    shouldRun() {
      return Boolean((this.active || this.logoFeedActive) && !document.hidden);
    }

    getVideoSpeedFactor() {
      const normalized = this.clampNumber(
        this.numberOrFallback(this.params.videoSpeed, 70) / 100,
        0,
        1,
      );
      // Use quadratic scaling to give finer control at very slow speeds.
      return 0.01 + normalized * normalized * 1.99;
    }

    start() {
      if (!this.initialized || this.rafId != null || !this.shouldRun()) return;
      this.lastFrameTimestampMs = null;
      this.rafId = window.requestAnimationFrame((ts) => this.frame(ts));
    }

    stop() {
      if (this.rafId == null) return;
      window.cancelAnimationFrame(this.rafId);
      this.rafId = null;
      this.lastFrameTimestampMs = null;
    }

    resize() {
      if (!this.gl || !this.canvas) return;
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const w = Math.max(1, Math.round(this.mount.clientWidth * dpr));
      const h = Math.max(1, Math.round(this.mount.clientHeight * dpr));
      if (this.canvas.width !== w || this.canvas.height !== h) {
        this.canvas.width = w;
        this.canvas.height = h;
      }
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      this.updateLogoCropOverlay();
    }

    frame(timestampMs) {
      this.rafId = null;
      if (!this.shouldRun() || !this.gl || !this.program) return;

      if (!Number.isFinite(this.lastFrameTimestampMs)) {
        this.lastFrameTimestampMs = timestampMs;
      }
      const dtSeconds = this.clampNumber(
        (timestampMs - this.lastFrameTimestampMs) / 1000,
        0,
        0.25,
      );
      this.lastFrameTimestampMs = timestampMs;
      this.playbackTimeSeconds += dtSeconds * this.getVideoSpeedFactor();

      this.resize();
      this.updateAudioTexture(this.playbackTimeSeconds);
      this.updateTextTexture();
      this.render(this.playbackTimeSeconds);
      this.rafId = window.requestAnimationFrame((ts) => this.frame(ts));
    }

    updateTextTexture() {
      if (!this.gl || !this.textTexture) return;
      if (!this.textTextureDirty && this.textCanvas) return;

      if (!this.textCanvas) {
        this.textCanvas = document.createElement("canvas");
        this.textCanvas.width = 1024;
        this.textCanvas.height = 512;
        this.textCtx = this.textCanvas.getContext("2d");
      }

      const ctx = this.textCtx;
      if (!ctx) return;

      const width = this.textCanvas.width;
      const height = this.textCanvas.height;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      const content = String(this.params.textContent || "").trim();
      if (content) {
        const sizePx = this.clampNumber(
          Math.round(this.numberOrFallback(this.params.textSize, 62)),
          10,
          160,
        );
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `700 ${sizePx}px sans-serif`;

        const lines = content.split(/\n+/).slice(0, 3);
        const lineGap = Math.max(10, Math.round(sizePx * 0.24));
        const totalHeight = lines.length * sizePx + (lines.length - 1) * lineGap;
        let y = (height - totalHeight) * 0.5 + sizePx * 0.52;
        for (const line of lines) {
          ctx.fillText(line, width * 0.5, y);
          y += sizePx + lineGap;
        }
      }

      const gl = this.gl;
      gl.bindTexture(gl.TEXTURE_2D, this.textTexture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.LUMINANCE,
        gl.LUMINANCE,
        gl.UNSIGNED_BYTE,
        this.textCanvas,
      );
      this.textTextureDirty = false;
    }

    updateAudioTexture(timeSeconds) {
      if (!this.gl || !this.audioTexture || !this.audioTextureFrame) return;

      const out = this.audioTextureFrame;
      const outLen = out.length;

      if (this.analyser && this.audioFrame) {
        this.analyser.getByteTimeDomainData(this.audioFrame);
        const src = this.audioFrame;
        const srcLen = src.length;
        for (let i = 0; i < outLen; i += 1) {
          const srcIndex = Math.floor((i / outLen) * srcLen);
          out[i] = src[srcIndex];
        }
      } else {
        for (let i = 0; i < outLen; i += 1) {
          const t = timeSeconds * 2.2 + (i / outLen) * Math.PI * 2;
          out[i] = Math.round(128 + Math.sin(t) * 46);
        }
      }

      const gl = this.gl;
      gl.bindTexture(gl.TEXTURE_2D, this.audioTexture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.LUMINANCE,
        outLen,
        1,
        0,
        gl.LUMINANCE,
        gl.UNSIGNED_BYTE,
        out,
      );
    }

    render(timeSeconds) {
      const gl = this.gl;
      gl.useProgram(this.program);

      const audioMix = this.params.audioReactive ? this.params.audioMix / 100 : 0;
      const colorA = this.hexToRgb01(this.params.colorA, [0.24, 0.45, 0.95]);
      const colorB = this.hexToRgb01(this.params.colorB, [0.96, 0.98, 1.0]);
      const textColor = this.hexToRgb01(this.params.textColor, [0.95, 0.92, 1.0]);
      const textEnabled = String(this.params.textContent || "").trim().length > 0;

      gl.uniform1f(this.uTime, timeSeconds);
      gl.uniform2f(this.uResolution, this.canvas.width, this.canvas.height);
      gl.uniform1f(this.uMode, this.params.mode);
      gl.uniform1f(this.uFormula, this.params.formula);
      gl.uniform1f(this.uIntensity, this.params.intensity / 100);
      gl.uniform1f(this.uGlitch, this.params.glitch / 100);
      gl.uniform1f(this.uGlitchLayer, this.params.glitchLayer / 100);
      gl.uniform1f(this.uGlitchOffset, this.params.glitchOffset / 100);
      gl.uniform1f(this.uSplit, this.params.split / 100);
      gl.uniform1f(this.uNoiseAmt, this.params.noiseAmt / 100);
      gl.uniform1f(this.uScan, this.params.scan / 100);
      gl.uniform1f(this.uPixel, this.params.pixel / 100);
      gl.uniform1f(this.uHue, this.params.hue / 100);
      gl.uniform1f(this.uDrift, this.params.drift / 100);
      gl.uniform1f(this.uAudioMix, audioMix);
      gl.uniform1f(this.uAutoMix, this.params.autoMix / 100);
      gl.uniform1f(this.uInvert, this.params.invert ? 1 : 0);
      gl.uniform3f(this.uColorA, colorA[0], colorA[1], colorA[2]);
      gl.uniform3f(this.uColorB, colorB[0], colorB[1], colorB[2]);
      gl.uniform1f(this.uTextEnabled, textEnabled ? 1 : 0);
      gl.uniform1f(this.uTextMix, this.params.textMix / 100);
      gl.uniform3f(this.uTextColor, textColor[0], textColor[1], textColor[2]);
      gl.uniform1f(this.uTextFlipH, this.params.textFlipH ? 1 : 0);
      gl.uniform1f(this.uTextFlipV, this.params.textFlipV ? 1 : 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.audioTexture);
      gl.uniform1i(this.uAudioTex, 0);

      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, this.textTexture);
      gl.uniform1i(this.uTextTex, 1);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    normalizeHexColor(raw, fallback) {
      const text = String(raw || "").trim();
      if (/^#[0-9a-f]{6}$/i.test(text)) return text.toLowerCase();
      if (/^[0-9a-f]{6}$/i.test(text)) return `#${text.toLowerCase()}`;
      return fallback;
    }

    hexToRgb01(hex, fallback) {
      const safe = this.normalizeHexColor(hex, "");
      if (!safe) return fallback;
      const n = parseInt(safe.slice(1), 16);
      if (!Number.isFinite(n)) return fallback;
      return [
        ((n >> 16) & 255) / 255,
        ((n >> 8) & 255) / 255,
        (n & 255) / 255,
      ];
    }

    initGlResources() {
      const gl = this.gl;
      const vertexSource = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

      const fragmentSource = `
precision mediump float;

varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_audioTex;
uniform float u_mode;
uniform float u_formula;
uniform float u_intensity;
uniform float u_glitch;
uniform float u_glitchLayer;
uniform float u_glitchOffset;
uniform float u_split;
uniform float u_noiseAmt;
uniform float u_scan;
uniform float u_pixel;
uniform float u_hue;
uniform float u_drift;
uniform float u_audioMix;
uniform float u_autoMix;
uniform float u_invert;
uniform vec3 u_colorA;
uniform vec3 u_colorB;
uniform sampler2D u_textTex;
uniform float u_textEnabled;
uniform float u_textMix;
uniform vec3 u_textColor;
uniform float u_textFlipH;
uniform float u_textFlipV;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 78.233);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

vec3 hueRotate(vec3 color, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  mat3 m = mat3(
    0.299 + 0.701 * c + 0.168 * s, 0.587 - 0.587 * c + 0.33 * s, 0.114 - 0.114 * c - 0.497 * s,
    0.299 - 0.299 * c - 0.328 * s, 0.587 + 0.413 * c + 0.035 * s, 0.114 - 0.114 * c + 0.292 * s,
    0.299 - 0.3 * c + 1.25 * s, 0.587 - 0.588 * c - 1.05 * s, 0.114 + 0.886 * c - 0.203 * s
  );
  return clamp(m * color, 0.0, 1.0);
}

float formulaWarp(float x) {
  if (u_formula < 0.5) {
    return sin(x);
  }
  if (u_formula < 1.5) {
    return tan(x * 0.52) * 0.72;
  }
  if (u_formula < 2.5) {
    return abs(fract(x * 0.15915) - 0.5) * 2.0 - 1.0;
  }
  if (u_formula < 3.5) {
    return sign(sin(x * 1.7));
  }
  if (u_formula < 4.5) {
    float s = sin(x * 0.85);
    return 2.0 * s * s - 1.0;
  }
  float q = floor(x * 14.0);
  float r = fract(x * 0.43 + 0.17);
  return mod(q, 2.0) == 0.0 ? r * 2.0 - 1.0 : 1.0 - r * 2.0;
}

float readWave(float x) {
  // Audio samples are uploaded from JS as a 1 x N texture each frame.
  // Shader-side sampling keeps this extensible for future pattern modules.
  float sampleV = texture2D(u_audioTex, vec2(clamp(x, 0.0, 1.0), 0.5)).r;
  return sampleV * 2.0 - 1.0;
}

float patternAt(vec2 p, float signal, float t, float aspect) {
  float pattern = 0.0;
  if (u_mode < 0.5) {
    float y = 0.5 + formulaWarp(p.x * 9.0 + t * 2.2 + signal * 3.2) * 0.18 + signal * 0.1;
    float d = abs(p.y - y);
    float line = smoothstep(0.02 + u_intensity * 0.02, 0.0, d);
    float glow = smoothstep(0.08, 0.0, d) * 0.45;
    pattern = max(line, glow * (0.2 + u_intensity * 0.8));
  } else if (u_mode < 1.5) {
    float n = noise(p * vec2(30.0, 26.0) + vec2(t * 4.0, -t * 3.0 + signal * 6.0));
    pattern = smoothstep(0.22, 0.95 - u_intensity * 0.38, n);
  } else if (u_mode < 2.5) {
    float gx = sin((p.x * 42.0 + t * 5.2) + signal * 9.0);
    float gy = cos((p.y * 36.0 - t * 4.1) - signal * 8.0);
    pattern = smoothstep(0.1, 1.0, abs(gx * gy));
  } else if (u_mode < 3.5) {
    vec2 q = (p - 0.5) * vec2(aspect, 1.0);
    float r = length(q);
    float rings = sin(r * 56.0 - t * 8.4 + signal * 15.0);
    pattern = smoothstep(0.12, 1.0, abs(rings));
  } else if (u_mode < 4.5) {
    float bars = sin((p.y * 84.0 + t * 9.0) + formulaWarp(p.x * 14.0 + signal * 12.0) * 8.0);
    pattern = smoothstep(0.0, 0.98, abs(bars));
  } else {
    float k = noise(p * vec2(18.0, 14.0) + vec2(t * 2.4, -t * 1.7));
    float q = sin((p.x + k * 0.45) * 20.0 + t * 3.4);
    float r = cos((p.y - k * 0.52) * 16.0 - t * 2.7);
    pattern = smoothstep(0.14, 1.0, abs(q + r) * 0.5);
  }
  return clamp(pattern, 0.0, 1.0);
}

void main() {
  vec2 uv = v_uv;
  float aspect = max(0.001, u_resolution.x / max(u_resolution.y, 1.0));

  float pix = mix(560.0, 36.0, u_pixel);
  uv = floor(uv * pix) / pix;

  float t = u_time * (0.2 + u_drift * 2.6);

  float audioSample = readWave(uv.x * 0.86 + 0.07);
  float autoSample = sin(uv.x * 8.0 + t * 2.5) * cos(uv.y * 6.0 - t * 2.1);
  float signal = autoSample * max(0.05, u_autoMix) + audioSample * u_audioMix;
  signal += (1.0 - max(u_autoMix, u_audioMix)) * autoSample * 0.35;

  float lineJitterA =
    (hash21(vec2(floor(uv.y * 144.0), floor(t * 9.0))) - 0.5) * u_glitch * 0.13;
  float lineJitterB =
    (hash21(vec2(floor(uv.y * 122.0), floor(t * 6.0 + u_glitchOffset * 14.0))) - 0.5)
    * u_glitchLayer
    * 0.19;
  uv.x += lineJitterA + lineJitterB;
  float blockA = step(0.935, hash21(vec2(floor(uv.y * 18.0), floor(t * 3.4))));
  float blockB = step(0.91, hash21(vec2(floor(uv.y * 12.0 + 9.0), floor(t * 2.1 + 7.0))));
  uv.y += blockA * u_glitch * 0.05 * sin(t * 15.0 + uv.x * 38.0);
  uv.y += blockB * u_glitchLayer * 0.08 * cos(t * 11.0 - uv.x * 31.0);

  float split = u_split * 0.014;
  vec2 splitVec = vec2(split * (0.8 + u_glitchOffset * 0.7), split * 0.26);

  vec2 textUv = clamp(uv + vec2(lineJitterA * 0.45, lineJitterB * 0.22), 0.0, 1.0);
  vec2 textSampleUv = vec2(
    mix(textUv.x, 1.0 - textUv.x, u_textFlipH),
    mix(1.0 - textUv.y, textUv.y, u_textFlipV)
  );
  float textMask = texture2D(u_textTex, textSampleUv).r * u_textEnabled;

  float patternCore = patternAt(uv, signal, t, aspect);
  float patternGhostA = patternAt(uv + splitVec, signal, t, aspect);
  float patternGhostB = patternAt(uv - splitVec, signal, t, aspect);

  patternCore += (noise(uv * vec2(260.0, 180.0) + t * 12.0) - 0.5) * u_noiseAmt * 0.45;
  patternGhostA += (noise((uv + splitVec) * vec2(180.0, 160.0) + t * 9.0) - 0.5) * u_noiseAmt * 0.35;
  patternGhostB += (noise((uv - splitVec) * vec2(180.0, 160.0) - t * 9.0) - 0.5) * u_noiseAmt * 0.35;

  patternCore = clamp(patternCore, 0.0, 1.0);
  patternGhostA = clamp(patternGhostA, 0.0, 1.0);
  patternGhostB = clamp(patternGhostB, 0.0, 1.0);

  float textBoost = textMask * (0.28 + u_textMix * 0.72);
  patternCore = clamp(max(patternCore, textBoost), 0.0, 1.0);
  patternGhostA = clamp(max(patternGhostA, textBoost * (0.4 + 0.4 * u_split)), 0.0, 1.0);
  patternGhostB = clamp(max(patternGhostB, textBoost * (0.5 + 0.5 * u_split)), 0.0, 1.0);

  float scan = 1.0 - u_scan * (0.25 + 0.4 * sin(uv.y * u_resolution.y * 1.1));

  vec3 baseA = vec3(0.02, 0.03, 0.05);
  vec3 baseB = vec3(0.07, 0.11, 0.16);
  vec3 bg = mix(baseA, baseB, uv.y + 0.15 * sin(t * 0.8 + uv.x * 5.0));
  vec3 color = bg;
  color += u_colorA * patternCore * (0.75 + u_intensity * 0.9);
  color += u_colorA * patternGhostA * (u_split * 0.45 + u_glitch * 0.12);
  color += u_colorB * patternGhostB * (u_split * 0.62 + u_glitchLayer * 0.2);
  color = mix(color, u_colorB * (0.18 + patternCore * 0.64), patternGhostB * 0.16);
  color = mix(color, u_textColor, textMask * u_textMix);

  color *= scan;

  color = hueRotate(color, u_hue * 6.28318);

  if (u_invert > 0.5) {
    color = vec3(1.0) - color;
  }

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}`;

      const program = this.createProgram(vertexSource, fragmentSource);
      if (!program) return false;
      this.program = program;

      this.positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          -1, -1,
          1, -1,
          -1, 1,
          -1, 1,
          1, -1,
          1, 1,
        ]),
        gl.STATIC_DRAW,
      );

      const aPosition = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(aPosition);
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

      this.uTime = gl.getUniformLocation(program, "u_time");
      this.uResolution = gl.getUniformLocation(program, "u_resolution");
      this.uAudioTex = gl.getUniformLocation(program, "u_audioTex");
      this.uMode = gl.getUniformLocation(program, "u_mode");
      this.uFormula = gl.getUniformLocation(program, "u_formula");
      this.uIntensity = gl.getUniformLocation(program, "u_intensity");
      this.uGlitch = gl.getUniformLocation(program, "u_glitch");
      this.uGlitchLayer = gl.getUniformLocation(program, "u_glitchLayer");
      this.uGlitchOffset = gl.getUniformLocation(program, "u_glitchOffset");
      this.uSplit = gl.getUniformLocation(program, "u_split");
      this.uNoiseAmt = gl.getUniformLocation(program, "u_noiseAmt");
      this.uScan = gl.getUniformLocation(program, "u_scan");
      this.uPixel = gl.getUniformLocation(program, "u_pixel");
      this.uHue = gl.getUniformLocation(program, "u_hue");
      this.uDrift = gl.getUniformLocation(program, "u_drift");
      this.uAudioMix = gl.getUniformLocation(program, "u_audioMix");
      this.uAutoMix = gl.getUniformLocation(program, "u_autoMix");
      this.uInvert = gl.getUniformLocation(program, "u_invert");
      this.uColorA = gl.getUniformLocation(program, "u_colorA");
      this.uColorB = gl.getUniformLocation(program, "u_colorB");
      this.uTextTex = gl.getUniformLocation(program, "u_textTex");
      this.uTextEnabled = gl.getUniformLocation(program, "u_textEnabled");
      this.uTextMix = gl.getUniformLocation(program, "u_textMix");
      this.uTextColor = gl.getUniformLocation(program, "u_textColor");
      this.uTextFlipH = gl.getUniformLocation(program, "u_textFlipH");
      this.uTextFlipV = gl.getUniformLocation(program, "u_textFlipV");

      this.audioTexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, this.audioTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      this.audioTextureFrame = new Uint8Array(this.textureSize);
      for (let i = 0; i < this.textureSize; i += 1) {
        this.audioTextureFrame[i] = 128;
      }

      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.LUMINANCE,
        this.textureSize,
        1,
        0,
        gl.LUMINANCE,
        gl.UNSIGNED_BYTE,
        this.audioTextureFrame,
      );

      this.textTexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, this.textTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const blankTextFrame = new Uint8Array([0]);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.LUMINANCE,
        1,
        1,
        0,
        gl.LUMINANCE,
        gl.UNSIGNED_BYTE,
        blankTextFrame,
      );

      return true;
    }

    sampleLogoAccentColors(count = 9) {
      const targetCount = this.clampNumber(Math.round(this.numberOrFallback(count, 9)), 1, 24);
      if (!this.canvas || this.canvas.width <= 0 || this.canvas.height <= 0) {
        return null;
      }

      if (!this.logoSampleCanvas) {
        this.logoSampleCanvas = document.createElement("canvas");
      }
      const targetW = Math.max(64, targetCount * 12);
      const targetH = 32;
      if (
        this.logoSampleCanvas.width !== targetW
        || this.logoSampleCanvas.height !== targetH
      ) {
        this.logoSampleCanvas.width = targetW;
        this.logoSampleCanvas.height = targetH;
      }
      if (!this.logoSampleCtx) {
        this.logoSampleCtx = this.logoSampleCanvas.getContext("2d", { willReadFrequently: true });
      }
      if (!this.logoSampleCtx) return null;

      this.logoSampleCtx.drawImage(this.canvas, 0, 0, targetW, targetH);
      const image = this.logoSampleCtx.getImageData(0, 0, targetW, targetH).data;
      const colors = [];
      for (let i = 0; i < targetCount; i += 1) {
        const x = this.clampNumber(Math.round(((i + 0.5) / targetCount) * (targetW - 1)), 0, targetW - 1);
        const y = Math.round(targetH * 0.5);
        const idx = (y * targetW + x) * 4;
        const r = image[idx] ?? 0;
        const g = image[idx + 1] ?? 0;
        const b = image[idx + 2] ?? 0;
        colors.push(`#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`);
      }
      return colors;
    }

    createProgram(vertexSource, fragmentSource) {
      const gl = this.gl;
      const vertexShader = this.createShader(gl.VERTEX_SHADER, vertexSource);
      const fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragmentSource);
      if (!vertexShader || !fragmentShader) return null;

      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("[video-synth] program link failed:", gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }

      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return program;
    }

    createShader(type, source) {
      const gl = this.gl;
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("[video-synth] shader compile failed:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    detachAudioTap() {
      if (this.audioNode && this.analyser) {
        try {
          this.audioNode.disconnect(this.analyser);
        } catch {
          // Ignore disconnect mismatches when graph is already torn down.
        }
      }
      this.analyser = null;
      this.audioFrame = null;
      this.audioTextureFrame = new Uint8Array(this.textureSize);
    }

    destroy() {
      this.stop();
      this.detachAudioTap();
      this.clearAutosaveTimer();

      document.removeEventListener("visibilitychange", this.onVisibilityChange);
      document.removeEventListener(
        "video-synth:logo-video-state",
        this.onLogoVideoStateChange,
      );
      window.removeEventListener("pointermove", this.onLogoCropPointerMove);
      window.removeEventListener("pointerup", this.onLogoCropPointerUp);
      window.removeEventListener("pointercancel", this.onLogoCropPointerUp);
      window.removeEventListener("resize", this.onResize);

      if (this.canvas && this.canvas.parentElement) {
        this.canvas.parentElement.removeChild(this.canvas);
      }
      if (this.hud && this.hud.parentElement) {
        this.hud.parentElement.removeChild(this.hud);
      }

      this.shell = null;
      this.preview = null;
      this.canvas = null;
      this.hud = null;
      this.presetSelect = null;
      this.presetNameInput = null;
      this.presetStatus = null;
      this.songIo = null;
      this.songJson = null;
      this.songJsonHighlight = null;
      this.logoVideoBackgroundBtn = null;
      this.logoVideoCropBtn = null;
      this.logoCropOverlay = null;
      this.logoCropRect = null;
      this.logoCropHandle = null;
      this.logoCropDragState = null;
      this.textCanvas = null;
      this.textCtx = null;
      this.textTexture = null;
      this.logoSampleCanvas = null;
      this.logoSampleCtx = null;
      this.rangeInputs.clear();
      this.program = null;
      this.gl = null;
      this.initialized = false;
    }
  }

  window.VideoSynthPlugin = VideoSynthPlugin;
})();
