(() => {
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
      this.cyberpunkBtn = null;
      this.audioToggleBtn = null;
      this.invertToggleBtn = null;
      this.colorAInput = null;
      this.colorBInput = null;
      this.colorAHexInput = null;
      this.colorBHexInput = null;
      this.rangeInputs = new Map();

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

      this.audioNode = null;
      this.analyser = null;
      this.audioFrame = null;
      this.audioTextureFrame = null;

      this.textureSize = 256;
      this.rafId = null;
      this.active = false;
      this.initialized = false;

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
        audioMix: 62,
        autoMix: 68,
        audioReactive: true,
        invert: false,
        colorA: "#6600ff",
        colorB: "#ff0077",
      };

      this.onResize = this.resize.bind(this);
      this.onVisibilityChange = () => {
        if (document.hidden) {
          this.stop();
        } else if (this.active) {
          this.start();
        }
      };
    }

    init() {
      if (this.initialized || !this.mount) return;

      this.mount.textContent = "";

      this.shell = document.createElement("section");
      this.shell.className = "videoSynthShell";

      const topBar = document.createElement("header");
      topBar.className = "videoSynthTopBar";

      const title = document.createElement("h2");
      title.className = "videoSynthTitle";
      title.textContent = "video synth";

      const actions = document.createElement("div");
      actions.className = "videoSynthActions";

      this.resetBtn = document.createElement("button");
      this.resetBtn.type = "button";
      this.resetBtn.className = "btn";
      this.resetBtn.textContent = "reset";
      this.resetBtn.addEventListener("click", () => this.resetParams());

      this.cyberpunkBtn = document.createElement("button");
      this.cyberpunkBtn.type = "button";
      this.cyberpunkBtn.className = "btn";
      this.cyberpunkBtn.textContent = "cyberpunk";
      this.cyberpunkBtn.addEventListener("click", () => this.applyCyberpunkPreset());

      this.fullscreenBtn = document.createElement("button");
      this.fullscreenBtn.type = "button";
      this.fullscreenBtn.className = "btn";
      this.fullscreenBtn.textContent = "fullscreen";
      this.fullscreenBtn.addEventListener("click", () => {
        this.toggleFullscreen();
      });

      actions.appendChild(this.resetBtn);
      actions.appendChild(this.cyberpunkBtn);
      actions.appendChild(this.fullscreenBtn);

      topBar.appendChild(title);
      topBar.appendChild(actions);

      this.preview = document.createElement("div");
      this.preview.className = "videoSynthPreview";

      this.canvas = document.createElement("canvas");
      this.canvas.className = "videoSynthCanvas";

      this.hud = document.createElement("div");
      this.hud.className = "videoSynthHud";
      this.hud.textContent = "waveform";

      this.preview.appendChild(this.canvas);
      this.preview.appendChild(this.hud);

      const controls = document.createElement("section");
      controls.className = "videoSynthControls";

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
      controls.appendChild(modeField);

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
      controls.appendChild(formulaField);

      controls.appendChild(
        this.makeRangeField({
          key: "intensity",
          label: "intensity",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      const glitchGroup = document.createElement("div");
      glitchGroup.className = "videoSynthGroup videoSynthGroup-glitch";
      glitchGroup.appendChild(
        this.makeRangeField({
          key: "glitch",
          label: "glitch a",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      glitchGroup.appendChild(
        this.makeRangeField({
          key: "glitchLayer",
          label: "glitch b",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      controls.appendChild(glitchGroup);
      controls.appendChild(
        this.makeRangeField({
          key: "glitchOffset",
          label: "offset",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      controls.appendChild(
        this.makeRangeField({
          key: "split",
          label: "rgb split",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      controls.appendChild(
        this.makeRangeField({
          key: "noiseAmt",
          label: "noise",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      controls.appendChild(
        this.makeRangeField({
          key: "scan",
          label: "scan",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      controls.appendChild(
        this.makeRangeField({
          key: "pixel",
          label: "pixel",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      controls.appendChild(
        this.makeRangeField({
          key: "hue",
          label: "hue",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      controls.appendChild(
        this.makeRangeField({
          key: "drift",
          label: "drift",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      controls.appendChild(
        this.makeRangeField({
          key: "audioMix",
          label: "audio mix",
          min: 0,
          max: 100,
          step: 1,
        }),
      );
      controls.appendChild(
        this.makeRangeField({
          key: "autoMix",
          label: "auto mix",
          min: 0,
          max: 100,
          step: 1,
        }),
      );

      const colorGroup = document.createElement("div");
      colorGroup.className = "videoSynthGroup videoSynthGroup-colors";
      colorGroup.appendChild(
        this.makeColorField({ key: "colorA", label: "color a" }),
      );
      colorGroup.appendChild(
        this.makeColorField({ key: "colorB", label: "color b" }),
      );
      controls.appendChild(colorGroup);

      const hint = document.createElement("p");
      hint.className = "videoSynthHint";
      hint.textContent = "a/b colors tint the main image and ghost split. glitch a/b control two distortion layers, while rgb split offsets color ghosts.";

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

      toggleRow.appendChild(this.audioToggleBtn);
      toggleRow.appendChild(this.invertToggleBtn);

      this.shell.appendChild(topBar);
      this.shell.appendChild(this.preview);
      this.shell.appendChild(controls);
      this.shell.appendChild(hint);
      this.shell.appendChild(toggleRow);
      this.mount.appendChild(this.shell);

      this.syncHudLabel();
      this.syncToggleButtons();

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
        color.value = normalized;
        hex.value = normalized;
      };

      color.addEventListener("input", () => syncValue(color.value));
      hex.addEventListener("input", () => syncValue(hex.value));

      if (key === "colorA") { this.colorAInput = color; this.colorAHexInput = hex; }
      if (key === "colorB") { this.colorBInput = color; this.colorBHexInput = hex; }

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

    syncToggleButtons() {
      if (this.audioToggleBtn) {
        this.audioToggleBtn.setAttribute(
          "aria-pressed",
          this.params.audioReactive ? "true" : "false",
        );
      }
      if (this.invertToggleBtn) {
        this.invertToggleBtn.setAttribute(
          "aria-pressed",
          this.params.invert ? "true" : "false",
        );
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

    resetParams() {
      this.params.mode = 0;
      this.params.formula = 0;
      this.params.intensity = 72;
      this.params.glitch = 58;
      this.params.glitchLayer = 54;
      this.params.glitchOffset = 58;
      this.params.split = 72;
      this.params.noiseAmt = 36;
      this.params.scan = 32;
      this.params.pixel = 14;
      this.params.hue = 0;
      this.params.drift = 44;
      this.params.audioMix = 62;
      this.params.autoMix = 68;
      this.params.audioReactive = true;
      this.params.invert = false;
      this.params.colorA = "#6600ff";
      this.params.colorB = "#ff0077";

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
      this.syncToggleButtons();
      this.syncHudLabel();
    }

    applyCyberpunkPreset() {
      this.params.mode = 0;
      this.params.formula = 0;
      this.params.intensity = 78;
      this.params.glitch = 66;
      this.params.glitchLayer = 62;
      this.params.glitchOffset = 66;
      this.params.split = 82;
      this.params.noiseAmt = 38;
      this.params.scan = 36;
      this.params.pixel = 12;
      this.params.hue = 0;
      this.params.drift = 48;
      this.params.audioMix = 68;
      this.params.autoMix = 72;
      this.params.audioReactive = true;
      this.params.invert = false;
      this.params.colorA = "#5500ff";
      this.params.colorB = "#ff0055";

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
      this.syncToggleButtons();
      this.syncHudLabel();
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
      if (!this.initialized) return;
      if (this.active) this.start();
      else this.stop();
    }

    start() {
      if (!this.initialized || this.rafId != null) return;
      this.rafId = window.requestAnimationFrame((ts) => this.frame(ts));
    }

    stop() {
      if (this.rafId == null) return;
      window.cancelAnimationFrame(this.rafId);
      this.rafId = null;
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
    }

    frame(timestampMs) {
      this.rafId = null;
      if (!this.active || !this.gl || !this.program) return;

      this.resize();
      this.updateAudioTexture(timestampMs * 0.001);
      this.render(timestampMs * 0.001);
      this.rafId = window.requestAnimationFrame((ts) => this.frame(ts));
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

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.audioTexture);
      gl.uniform1i(this.uAudioTex, 0);

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

  float patternCore = patternAt(uv, signal, t, aspect);
  float patternGhostA = patternAt(uv + splitVec, signal, t, aspect);
  float patternGhostB = patternAt(uv - splitVec, signal, t, aspect);

  patternCore += (noise(uv * vec2(260.0, 180.0) + t * 12.0) - 0.5) * u_noiseAmt * 0.45;
  patternGhostA += (noise((uv + splitVec) * vec2(180.0, 160.0) + t * 9.0) - 0.5) * u_noiseAmt * 0.35;
  patternGhostB += (noise((uv - splitVec) * vec2(180.0, 160.0) - t * 9.0) - 0.5) * u_noiseAmt * 0.35;

  patternCore = clamp(patternCore, 0.0, 1.0);
  patternGhostA = clamp(patternGhostA, 0.0, 1.0);
  patternGhostB = clamp(patternGhostB, 0.0, 1.0);

  float scan = 1.0 - u_scan * (0.25 + 0.4 * sin(uv.y * u_resolution.y * 1.1));

  vec3 baseA = vec3(0.02, 0.03, 0.05);
  vec3 baseB = vec3(0.07, 0.11, 0.16);
  vec3 bg = mix(baseA, baseB, uv.y + 0.15 * sin(t * 0.8 + uv.x * 5.0));
  vec3 color = bg;
  color += u_colorA * patternCore * (0.75 + u_intensity * 0.9);
  color += u_colorA * patternGhostA * (u_split * 0.45 + u_glitch * 0.12);
  color += u_colorB * patternGhostB * (u_split * 0.62 + u_glitchLayer * 0.2);
  color = mix(color, u_colorB * (0.18 + patternCore * 0.64), patternGhostB * 0.16);

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

      return true;
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

      document.removeEventListener("visibilitychange", this.onVisibilityChange);
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
      this.rangeInputs.clear();
      this.program = null;
      this.gl = null;
      this.initialized = false;
    }
  }

  window.VideoSynthPlugin = VideoSynthPlugin;
})();
