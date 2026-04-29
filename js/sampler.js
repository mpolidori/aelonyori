(() => {
  const samplerRoot = document.getElementById("samplerRoot");
  if (!samplerRoot) return;

  const NUM_PADS = 16;
  const DEFAULT_STEPS = 16;

  const navToDawBtn = document.getElementById("navToDawBtn");

  const bpmInput = document.getElementById("samplerBpm");
  const bpmOut = document.getElementById("samplerBpmOut");
  const stepsInput = document.getElementById("samplerSteps");
  const stepsOut = document.getElementById("samplerStepsOut");
  const beatInput = document.getElementById("samplerBeat");
  const beatOut = document.getElementById("samplerBeatOut");
  const ratchetBtn = document.getElementById("samplerRatchetBtn");

  const tabs = Array.from(document.querySelectorAll(".samplerTab"));
  const padsView = document.getElementById("samplerPadsView");
  const composeView = document.getElementById("samplerComposeView");
  const padGrid = document.getElementById("samplerPadGrid");
  const composeGrid = document.getElementById("samplerComposeGrid");

  const padEditorLabel = document.getElementById("samplerPadEditorLabel");
  const padRatchetPanel = document.getElementById("samplerPadRatchetPanel");
  const padRatchetQuarterInputs = [
    document.getElementById("samplerPadRatchetQ1"),
    document.getElementById("samplerPadRatchetQ2"),
    document.getElementById("samplerPadRatchetQ3"),
    document.getElementById("samplerPadRatchetQ4"),
  ];

  const recordFab = document.getElementById("samplerRecordFab");
  const playFab = document.getElementById("samplerPlayFab");
  const samplerRecordStatus = document.getElementById("samplerRecordStatus");
  const composeRatchetPicker = document.getElementById(
    "samplerComposeRatchetPicker",
  );

  const buffers = new Array(NUM_PADS).fill(null);
  const padStates = Array.from({ length: NUM_PADS }, (_, idx) => ({
    index: idx,
    isLoaded: false,
    isPlaying: false,
    isRecording: false,
    quarterRatchets: [1, 1, 1, 1],
  }));

  let pattern = Array.from({ length: NUM_PADS }, () =>
    Array(DEFAULT_STEPS).fill(null),
  );

  let audioCtx = null;
  let mediaRecorder = null;
  let mediaStream = null;
  let recordingPadIndex = null;
  let isPadHoldRecording = false;
  let chunks = [];

  let bpm = 120;
  let stepsCount = DEFAULT_STEPS;
  let beatSteps = 4;
  let isRecordingMode = false;
  let isPlaying = false;
  let activeTab = "pads";
  let currentStep = 0;
  let timerId = null;
  let selectedPad = 0;
  let isRatchetEditOpen = false;

  let swipePointerId = null;
  let swipeStartX = 0;
  let swipeStartY = 0;
  let swipeStartAt = 0;
  let swipeStartedFromLeftEdge = false;

  let composeCellLongPressTimer = null;
  let composeCellLongPressTarget = null;
  let composeCellWasLongPress = false;
  let composeCellLongPressAnchorRect = null;

  function numberOrFallback(value, fallback) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function clampNumber(value, min, max) {
    return Math.max(min, Math.min(max, numberOrFallback(value, min)));
  }

  function sanitizeRatchet(value) {
    const n = numberOrFallback(value, 1);
    if (n <= 0) return 1;
    return clampNumber(n, 0.25, 5);
  }

  function syncRecordingStatus() {
    if (!samplerRecordStatus) return;
    samplerRecordStatus.hidden = !isPadHoldRecording;
  }

  function syncRecordFabPulse() {
    if (!recordFab) return;
    const beatMs = Math.max(
      300,
      Math.round((60 / clampNumber(bpm, 60, 200)) * 1000),
    );
    recordFab.style.setProperty("--sampler-record-pulse-dur", `${beatMs}ms`);
  }

  function formatRatchet(value) {
    const n = sanitizeRatchet(value);
    if (Math.abs(n - 0.3333) < 0.01) return "1/3";
    if (Math.abs(n - 0.6667) < 0.01) return "2/3";
    if (Math.abs(n - 0.25) < 0.01) return "1/4";
    if (Math.abs(n - 0.5) < 0.01) return "1/2";
    return String(n).replace(/\.0$/, "");
  }

  function formatCornerLabel(cornerIndex) {
    const c = clampNumber(Math.round(numberOrFallback(cornerIndex, 0)), 0, 3);
    if (c === 0) return "top left";
    if (c === 1) return "top right";
    if (c === 2) return "bottom left";
    return "bottom right";
  }

  function getCellRatchet(row, cell) {
    if (!cell || !cell.on) return 1;
    if (Number.isFinite(cell.corner)) {
      const corner = clampNumber(Math.round(cell.corner), 0, 3);
      return sanitizeRatchet(padStates[row].quarterRatchets[corner]);
    }
    return sanitizeRatchet(cell.ratchet);
  }

  function ensureAudio() {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) throw new Error("Audio unavailable");
      audioCtx = new Ctx();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function flashPad(index, durationMs = 95) {
    const pad = padStates[index];
    if (!pad) return;
    pad.isPlaying = true;
    renderPads();
    window.setTimeout(() => {
      pad.isPlaying = false;
      renderPads();
    }, durationMs);
  }

  function playPadWithRatchet(index, ratchetValue) {
    const pad = padStates[index];
    if (!pad || !buffers[index]) return;

    ensureAudio();

    const ratchet = sanitizeRatchet(ratchetValue);
    const repeats = ratchet >= 1 ? Math.max(1, Math.round(ratchet)) : 1;
    const stepDuration = 60 / clampNumber(bpm, 60, 200) / 4;
    const repeatInterval = stepDuration / repeats;

    for (let i = 0; i < repeats; i += 1) {
      const source = audioCtx.createBufferSource();
      source.buffer = buffers[index];
      source.connect(audioCtx.destination);
      source.start(audioCtx.currentTime + i * repeatInterval);
    }

    flashPad(
      index,
      Math.max(85, Math.min(170, Math.round(120 / Math.max(1, repeats)))),
    );
  }

  function scheduleRatchetedPlay(index, quarterIndex = 0) {
    const pad = padStates[index];
    if (!pad) return;
    const q = clampNumber(Math.round(numberOrFallback(quarterIndex, 0)), 0, 3);
    playPadWithRatchet(index, pad.quarterRatchets[q]);
  }

  async function startRecording(index) {
    ensureAudio();
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      window.alert("Microphone access unavailable in this browser.");
      return;
    }

    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(mediaStream);
      recordingPadIndex = index;
      chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) chunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const data = await blob.arrayBuffer();
        try {
          const decoded = await audioCtx.decodeAudioData(data);
          buffers[recordingPadIndex] = decoded;
          padStates[recordingPadIndex].isLoaded = true;
        } catch {
          // ignore failed decode
        }

        padStates[recordingPadIndex].isRecording = false;
        recordingPadIndex = null;
        renderPads();
        renderCompose();

        if (mediaStream) {
          for (const track of mediaStream.getTracks()) {
            track.stop();
          }
          mediaStream = null;
        }
      };

      padStates[index].isRecording = true;
      isPadHoldRecording = true;
      renderPads();
      syncRecordingStatus();
      mediaRecorder.start();
    } catch {
      window.alert("Microphone permission is required to record pads.");
    }
  }

  function stopRecording() {
    if (!mediaRecorder || mediaRecorder.state === "inactive") return;
    isPadHoldRecording = false;
    syncRecordingStatus();
    mediaRecorder.stop();
  }

  function setRecordingMode(nextEnabled) {
    isRecordingMode = Boolean(nextEnabled);
    if (recordFab) {
      recordFab.setAttribute(
        "aria-pressed",
        isRecordingMode ? "true" : "false",
      );
      recordFab.title = isRecordingMode ? "recording: on" : "recording: off";
    }
    syncRecordFabPulse();
  }

  function stopPlayback() {
    isPlaying = false;
    currentStep = 0;
    if (timerId != null) {
      window.clearInterval(timerId);
      timerId = null;
    }
    if (playFab) {
      playFab.setAttribute("aria-pressed", "false");
      playFab.title = "play";
    }
    renderCompose();
  }

  function startPlayback() {
    if (timerId != null) {
      window.clearInterval(timerId);
      timerId = null;
    }

    isPlaying = true;
    if (playFab) {
      playFab.setAttribute("aria-pressed", "true");
      playFab.title = "stop";
    }

    const stepMs = (60 / clampNumber(bpm, 60, 200) / 4) * 1000;
    timerId = window.setInterval(() => {
      currentStep = (currentStep + 1) % stepsCount;
      for (let row = 0; row < NUM_PADS; row += 1) {
        const cell = pattern[row] && pattern[row][currentStep];
        if (cell && cell.on) {
          playPadWithRatchet(row, getCellRatchet(row, cell));
        }
      }
      renderCompose();
    }, stepMs);
  }

  function setPlaying(nextPlaying) {
    if (!nextPlaying) {
      stopPlayback();
      return;
    }
    startPlayback();
  }

  function setBpm(nextBpm) {
    bpm = clampNumber(Math.round(numberOrFallback(nextBpm, bpm)), 20, 360);
    if (bpmInput) bpmInput.value = String(bpm);
    if (bpmOut) bpmOut.value = String(bpm);
    syncRecordFabPulse();
    if (isPlaying) startPlayback();
  }

  function setSteps(nextSteps) {
    const clamped = clampNumber(
      Math.round(numberOrFallback(nextSteps, stepsCount)),
      4,
      256,
    );
    stepsCount = clamped;

    pattern = pattern.map((row) => {
      if (!Array.isArray(row)) row = [];
      if (row.length < stepsCount) {
        return row.concat(new Array(stepsCount - row.length).fill(null));
      }
      return row.slice(0, stepsCount);
    });

    currentStep = currentStep % stepsCount;

    if (stepsInput) stepsInput.value = String(stepsCount);
    if (stepsOut) stepsOut.value = String(stepsCount);

    if (isPlaying) startPlayback();
    renderCompose();
  }

  function setBeat(nextBeat) {
    beatSteps = clampNumber(
      Math.round(numberOrFallback(nextBeat, beatSteps)),
      1,
      16,
    );
    if (beatInput) beatInput.value = String(beatSteps);
    if (beatOut) beatOut.value = String(beatSteps);
    renderCompose();
  }
  function setPadRatchetPanelOpen(nextOpen) {
    isRatchetEditOpen = Boolean(nextOpen);
    if (padRatchetPanel) padRatchetPanel.hidden = true;
    if (ratchetBtn) {
      ratchetBtn.setAttribute(
        "aria-pressed",
        isRatchetEditOpen ? "true" : "false",
      );
    }
    renderPads();
  }

  function setSelectedPad(index) {
    selectedPad = clampNumber(
      Math.round(numberOrFallback(index, 0)),
      0,
      NUM_PADS - 1,
    );
    if (padEditorLabel) {
      padEditorLabel.textContent = `pad ${selectedPad + 1}`;
    }
    for (let q = 0; q < padRatchetQuarterInputs.length; q += 1) {
      const selectEl = padRatchetQuarterInputs[q];
      if (!selectEl) continue;
      selectEl.value = String(padStates[selectedPad].quarterRatchets[q]);
    }
  }

  function setActiveTab(nextTab) {
    activeTab = nextTab === "compose" ? "compose" : "pads";

    for (const tab of tabs) {
      const active = tab.dataset.tab === activeTab;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-pressed", active ? "true" : "false");
    }

    if (padsView) padsView.hidden = activeTab !== "pads";
    if (composeView) composeView.hidden = activeTab !== "compose";
    if (ratchetBtn) ratchetBtn.hidden = activeTab !== "pads";
    if (recordFab) recordFab.hidden = activeTab !== "pads";
    if (playFab) playFab.hidden = activeTab !== "compose";

    closeComposeRatchetPicker();

    if (activeTab === "compose") {
      renderCompose();
    }
  }

  function syncComposeLayout() {
    if (!composeGrid || !composeView || composeView.hidden) return;

    const gridStyles = window.getComputedStyle(composeGrid);
    const paddingX =
      parseFloat(gridStyles.paddingLeft || "0") +
      parseFloat(gridStyles.paddingRight || "0");
    const paddingY =
      parseFloat(gridStyles.paddingTop || "0") +
      parseFloat(gridStyles.paddingBottom || "0");
    const rowGap = parseFloat(gridStyles.gap || "0");
    const cellGap = 3;
    const beatGap = 3;
    const sideGap = 0.42 * 16;
    const beatStarts = Math.floor((stepsCount - 1) / beatSteps);

    const availableWidth = Math.max(
      0,
      composeGrid.clientWidth - paddingX - sideGap - cellGap * (stepsCount - 1) - beatGap * beatStarts,
    );
    const availableHeight = Math.max(
      0,
      composeGrid.clientHeight - paddingY - rowGap * NUM_PADS,
    );

    const cellFromWidth = availableWidth / (stepsCount + 1);
    const cellFromHeight = availableHeight / (NUM_PADS + 1);
    const nextCell = Math.max(18, Math.floor(Math.min(cellFromWidth, cellFromHeight) || 32));

    composeGrid.style.setProperty("--compose-cell", `${nextCell}px`);
    composeGrid.style.setProperty("--compose-label", `${nextCell}px`);
  }

  function toggleStep(row, col) {
    if (!pattern[row]) return;
    const existing = pattern[row][col];
    if (!existing) {
      pattern[row][col] = {
        on: true,
        corner: 0,
        ratchet: sanitizeRatchet(padStates[row].quarterRatchets[0]),
      };
    } else {
      pattern[row][col] = null;
    }
    renderCompose();
  }

  function showComposeRatchetPicker(targetEl, row, col, currentCorner) {
    if (!composeRatchetPicker) return;

    const fallbackRect = targetEl ? targetEl.getBoundingClientRect() : null;
    const rect = composeCellLongPressAnchorRect || fallbackRect;
    if (!rect) return;
    composeRatchetPicker.innerHTML = "";
    composeRatchetPicker.dataset.row = String(row);
    composeRatchetPicker.dataset.col = String(col);

    const options = [
      { corner: 0, icon: "↖", label: "top left" },
      { corner: 1, icon: "↗", label: "top right" },
      { corner: 2, icon: "↙", label: "bottom left" },
      { corner: 3, icon: "↘", label: "bottom right" },
    ];
    const selectedCorner = clampNumber(
      Math.round(numberOrFallback(currentCorner, 0)),
      0,
      3,
    );

    for (const option of options) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "samplerComposeRatchetOption";
      btn.dataset.corner = String(option.corner);
      btn.textContent = option.icon;
      btn.title = option.label;
      btn.setAttribute("aria-label", option.label);
      if (option.corner === selectedCorner) {
        btn.style.fontWeight = "700";
      }
      composeRatchetPicker.appendChild(btn);
    }

    const top = Math.max(8, Math.round(rect.top - 42));
    const left = Math.max(8, Math.round(rect.left - 8));
    composeRatchetPicker.style.top = `${top}px`;
    composeRatchetPicker.style.left = `${left}px`;
    composeRatchetPicker.hidden = false;
  }

  function closeComposeRatchetPicker() {
    if (!composeRatchetPicker) return;
    composeRatchetPicker.hidden = true;
    composeRatchetPicker.innerHTML = "";
    composeRatchetPicker.dataset.row = "";
    composeRatchetPicker.dataset.col = "";
    composeCellLongPressAnchorRect = null;
  }

  function resolvePadQuarterFromEvent(event, element) {
    if (!event || !element) return 0;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const right = x >= rect.width * 0.5;
    const bottom = y >= rect.height * 0.5;
    if (!right && !bottom) return 0;
    if (right && !bottom) return 1;
    if (!right && bottom) return 2;
    return 3;
  }

  function renderPads() {
    if (!padGrid) return;
    const frag = document.createDocumentFragment();

    for (const pad of padStates) {
      const padEl = document.createElement(
        isRatchetEditOpen ? "div" : "button",
      );
      if (!isRatchetEditOpen) {
        padEl.type = "button";
      }
      padEl.className = "samplerPad";
      if (pad.isLoaded) padEl.classList.add("is-loaded");
      if (pad.isPlaying) padEl.classList.add("is-playing");
      if (pad.isRecording) padEl.classList.add("is-recording");

      const numberEl = document.createElement("span");
      numberEl.className = "samplerPadNum";
      numberEl.textContent = String(pad.index + 1);
      padEl.appendChild(numberEl);

      if (!isRatchetEditOpen) {
        const q0El = document.createElement("span");
        q0El.className = "samplerPadQuarterVal samplerPadQ0";
        q0El.textContent = formatRatchet(pad.quarterRatchets[0]);
        padEl.appendChild(q0El);

        const q1El = document.createElement("span");
        q1El.className = "samplerPadQuarterVal samplerPadQ1";
        q1El.textContent = formatRatchet(pad.quarterRatchets[1]);
        padEl.appendChild(q1El);

        const q2El = document.createElement("span");
        q2El.className = "samplerPadQuarterVal samplerPadQ2";
        q2El.textContent = formatRatchet(pad.quarterRatchets[2]);
        padEl.appendChild(q2El);

        const q3El = document.createElement("span");
        q3El.className = "samplerPadQuarterVal samplerPadQ3";
        q3El.textContent = formatRatchet(pad.quarterRatchets[3]);
        padEl.appendChild(q3El);
      } else {
        const editContainerEl = document.createElement("div");
        editContainerEl.className = "samplerPadEditContainer";

        for (let q = 0; q < 4; q += 1) {
          const selectEl = document.createElement("select");
          selectEl.className = `samplerPadEditSelect samplerPadEditQ${q}`;
          selectEl.setAttribute(
            "aria-label",
            `pad ${pad.index + 1} quarter ${q + 1} repeat`,
          );

          const options = [0.25, 0.3333, 0.5, 0.6667, 1, 2, 3, 4, 5];
          for (const value of options) {
            const opt = document.createElement("option");
            opt.value = String(value);
            opt.textContent = formatRatchet(value);
            if (Math.abs(value - pad.quarterRatchets[q]) < 0.01) {
              opt.selected = true;
            }
            selectEl.appendChild(opt);
          }

          selectEl.addEventListener("input", () => {
            const next = sanitizeRatchet(selectEl.value);
            padStates[pad.index].quarterRatchets[q] = next;
            renderPads();
            renderCompose();
          });

          editContainerEl.appendChild(selectEl);
        }

        padEl.appendChild(editContainerEl);
      }

      const quarters = document.createElement("span");
      quarters.className = "samplerPadQuarterLines";
      padEl.appendChild(quarters);

      if (!isRatchetEditOpen) {
        padEl.addEventListener("click", () => {
          setSelectedPad(pad.index);
        });

        padEl.addEventListener("pointerdown", (event) => {
          if (event.button != null && event.button !== 0) return;
          event.preventDefault();

          setSelectedPad(pad.index);
          const quarterIndex = resolvePadQuarterFromEvent(event, padEl);

          if (isRecordingMode) {
            startRecording(pad.index);
          } else {
            scheduleRatchetedPlay(pad.index, quarterIndex);
          }

          try {
            padEl.setPointerCapture(event.pointerId);
          } catch {
            // ignore capture errors
          }
        });

        padEl.addEventListener("contextmenu", (event) => {
          event.preventDefault();
        });

        padEl.addEventListener("dragstart", (event) => {
          event.preventDefault();
        });

        const onRelease = () => {
          if (isRecordingMode) stopRecording();
        };

        padEl.addEventListener("pointerup", onRelease);
        padEl.addEventListener("pointercancel", onRelease);
        padEl.addEventListener("pointerleave", onRelease);
      }

      frag.appendChild(padEl);
    }

    padGrid.innerHTML = "";
    padGrid.appendChild(frag);
  }

  function renderCompose() {
    if (!composeGrid) return;

    syncComposeLayout();

    const frag = document.createDocumentFragment();

    const header = document.createElement("div");
    header.className = "samplerStepHeader";

    const headerSpacer = document.createElement("div");
    header.appendChild(headerSpacer);

    const headerNums = document.createElement("div");
    headerNums.className = "samplerStepNumbers";

    for (let col = 0; col < stepsCount; col += 1) {
      const num = document.createElement("div");
      num.className = "samplerStepNumber";
      if (col > 0 && col % beatSteps === 0) num.classList.add("is-beat-start");
      if (col % beatSteps === 0) {
        num.textContent = String(Math.floor(col / beatSteps) + 1);
        num.classList.add("is-beat");
      }
      headerNums.appendChild(num);
    }

    header.appendChild(headerNums);
    frag.appendChild(header);

    for (let row = 0; row < NUM_PADS; row += 1) {
      const rowEl = document.createElement("div");
      rowEl.className = "samplerComposeRow";

      const rowPadBtn = document.createElement("button");
      rowPadBtn.type = "button";
      rowPadBtn.className = "samplerRowPadIndex";
      rowPadBtn.textContent = String(row + 1);
      rowPadBtn.setAttribute("aria-label", `play pad ${row + 1}`);
      rowPadBtn.addEventListener("click", () => {
        if (!padStates[row].isLoaded) return;
        playPadWithRatchet(row, 1);
      });
      rowEl.appendChild(rowPadBtn);

      const stepsEl = document.createElement("div");
      stepsEl.className = "samplerRowSteps";

      for (let col = 0; col < stepsCount; col += 1) {
        const stepBtn = document.createElement("button");
        stepBtn.type = "button";
        stepBtn.className = "samplerStep";
        if (col > 0 && col % beatSteps === 0) {
          stepBtn.classList.add("is-beat-start");
        }

        const cell = pattern[row] && pattern[row][col];
        if (cell && cell.on) stepBtn.classList.add("is-on");
        if (isPlaying && col === currentStep)
          stepBtn.classList.add("is-current");

        stepBtn.setAttribute("aria-label", `pad ${row + 1} step ${col + 1}`);
        if (cell && cell.on) {
          const resolvedRatchet = getCellRatchet(row, cell);
          stepBtn.dataset.ratchet = String(resolvedRatchet);
          if (Number.isFinite(cell.corner)) {
            const corner = clampNumber(Math.round(cell.corner), 0, 3);
            stepBtn.title = `${formatCornerLabel(corner)} (${formatRatchet(resolvedRatchet)})`;
          } else {
            stepBtn.title = `ratchet ${formatRatchet(resolvedRatchet)}`;
          }
        }

        stepBtn.addEventListener("pointerdown", (event) => {
          if (event.button != null && event.button !== 0) return;
          stepBtn._pointerDownTime = event.timeStamp;
          composeCellWasLongPress = false;
          composeCellLongPressTarget = stepBtn;
          const rect = stepBtn.getBoundingClientRect();
          composeCellLongPressAnchorRect = {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          };

          if (composeCellLongPressTimer != null) {
            window.clearTimeout(composeCellLongPressTimer);
            composeCellLongPressTimer = null;
          }

          composeCellLongPressTimer = window.setTimeout(() => {
            composeCellLongPressTimer = null;
            const target = composeCellLongPressTarget;
            composeCellLongPressTarget = null;
            if (!target) return;

            const c = pattern[row] && pattern[row][col];
            if (!c || !c.on) return;

            composeCellWasLongPress = true;
            showComposeRatchetPicker(
              target,
              row,
              col,
              numberOrFallback(c.corner, 0),
            );
          }, 420);
        });

        const clearComposePress = () => {
          if (composeCellLongPressTimer != null) {
            window.clearTimeout(composeCellLongPressTimer);
            composeCellLongPressTimer = null;
          }
          composeCellLongPressTarget = null;
          if (!composeCellWasLongPress) {
            composeCellLongPressAnchorRect = null;
          }
        };

        stepBtn.addEventListener("pointerup", clearComposePress);
        stepBtn.addEventListener("pointercancel", clearComposePress);

        stepBtn.addEventListener("click", (event) => {
          if (composeCellWasLongPress) {
            composeCellWasLongPress = false;
            return;
          }
          if (isPlaying && event.timeStamp - (stepBtn._pointerDownTime || 0) < 50) {
            return;
          }
          closeComposeRatchetPicker();
          toggleStep(row, col);
        });

        stepsEl.appendChild(stepBtn);
      }

      rowEl.appendChild(stepsEl);
      frag.appendChild(rowEl);
    }

    composeGrid.innerHTML = "";
    composeGrid.appendChild(frag);
  }

  function closeSamplerView() {
    if (typeof window.setSamplerViewOpen === "function") {
      window.setSamplerViewOpen(false);
    } else {
      document.body.classList.remove("is-sampler-view");
    }
    closeComposeRatchetPicker();
  }

  function bindSwipeBack() {
    window.addEventListener("pointerdown", (event) => {
      if (!document.body.classList.contains("is-sampler-view")) return;
      if (!event || event.pointerType === "mouse") return;
      if (
        event.target instanceof Element &&
        event.clientX > 28 &&
        event.target.closest(
          "button, input, select, textarea, .settingsModal, .settingsPanel",
        )
      ) {
        return;
      }

      swipePointerId = event.pointerId;
      swipeStartX = event.clientX;
      swipeStartY = event.clientY;
      swipeStartAt = Date.now();
      swipeStartedFromLeftEdge = event.clientX <= 28;
    });

    window.addEventListener("pointerup", (event) => {
      if (event.pointerId !== swipePointerId) return;

      const dx = event.clientX - swipeStartX;
      const dy = event.clientY - swipeStartY;
      const dt = Date.now() - swipeStartAt;
      swipePointerId = null;

      const horizontal = Math.abs(dx) >= 90 && Math.abs(dy) <= 55;
      const quickEnough = dt <= 700;
      const startedFromLeftHalf = swipeStartX <= window.innerWidth * 0.55;
      const allowStart = startedFromLeftHalf || swipeStartedFromLeftEdge;
      swipeStartedFromLeftEdge = false;

      if (horizontal && quickEnough && allowStart && dx >= 90) {
        closeSamplerView();
      }
    });

    window.addEventListener("pointercancel", (event) => {
      if (event.pointerId !== swipePointerId) return;
      swipePointerId = null;
      swipeStartedFromLeftEdge = false;
    });
  }

  if (navToDawBtn) {
    navToDawBtn.addEventListener("click", closeSamplerView);
  }

  window.addEventListener("resize", () => {
    if (activeTab === "compose") {
      renderCompose();
    }
  });

  samplerRoot.addEventListener("contextmenu", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (target && target.closest(".samplerPad, .samplerStep")) {
      event.preventDefault();
    }
  });

  for (const tab of tabs) {
    tab.addEventListener("click", () => {
      const next = tab.dataset.tab === "compose" ? "compose" : "pads";
      setActiveTab(next);
    });
  }

  if (recordFab) {
    recordFab.addEventListener("click", () => {
      setRecordingMode(!isRecordingMode);
    });
  }

  if (playFab) {
    playFab.addEventListener("click", () => {
      setPlaying(!isPlaying);
    });
  }

  if (ratchetBtn) {
    ratchetBtn.addEventListener("click", () => {
      setPadRatchetPanelOpen(!isRatchetEditOpen);
    });
  }

  if (bpmInput) {
    bpmInput.addEventListener("input", () => {
      setBpm(bpmInput.value);
    });
  }

  if (bpmOut) {
    bpmOut.addEventListener("input", () => {
      if (bpmOut.value === "") return;
      const val = Number(bpmOut.value);
      if (Number.isFinite(val) && val >= 20 && val <= 360) {
        setBpm(val);
      }
    });
    bpmOut.addEventListener("blur", () => {
      setBpm(bpmOut.value);
    });
  }

  if (stepsInput) {
    stepsInput.addEventListener("input", () => {
      setSteps(stepsInput.value);
    });
  }

  if (stepsOut) {
    stepsOut.addEventListener("input", () => {
      if (stepsOut.value === "") return;
      setSteps(stepsOut.value);
    });
  }

  if (beatInput) {
    beatInput.addEventListener("input", () => {
      setBeat(beatInput.value);
    });
  }

  if (beatOut) {
    beatOut.addEventListener("input", () => {
      if (beatOut.value === "") return;
      setBeat(beatOut.value);
    });
  }

  for (let q = 0; q < padRatchetQuarterInputs.length; q += 1) {
    const selectEl = padRatchetQuarterInputs[q];
    if (!selectEl) continue;
    selectEl.addEventListener("input", () => {
      const next = sanitizeRatchet(selectEl.value);
      padStates[selectedPad].quarterRatchets[q] = next;
      renderPads();
      renderCompose();
    });
  }

  if (composeRatchetPicker) {
    composeRatchetPicker.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const btn = target
        ? target.closest(".samplerComposeRatchetOption")
        : null;
      if (!btn) return;

      const row = clampNumber(
        numberOrFallback(composeRatchetPicker.dataset.row, 0),
        0,
        NUM_PADS - 1,
      );
      const col = clampNumber(
        numberOrFallback(composeRatchetPicker.dataset.col, 0),
        0,
        Math.max(0, stepsCount - 1),
      );
      const corner = clampNumber(
        Math.round(numberOrFallback(btn.dataset.corner, 0)),
        0,
        3,
      );

      const cell = pattern[row] && pattern[row][col];
      if (cell && cell.on) {
        cell.corner = corner;
        cell.ratchet = sanitizeRatchet(padStates[row].quarterRatchets[corner]);
      }
      closeComposeRatchetPicker();
      renderCompose();
    });

    document.addEventListener(
      "pointerdown",
      (event) => {
        if (!composeRatchetPicker || composeRatchetPicker.hidden) return;
        if (!composeRatchetPicker.contains(event.target)) {
          closeComposeRatchetPicker();
        }
      },
      { capture: true },
    );
  }

  document.addEventListener("sampler:view-open", () => {
    if (bpmOut && bpmOut.value === "") bpmOut.value = String(bpm);
    if (stepsOut && stepsOut.value === "") stepsOut.value = String(stepsCount);
  });

  window.addEventListener("beforeunload", () => {
    stopRecording();
    if (mediaStream) {
      for (const track of mediaStream.getTracks()) track.stop();
    }
    if (timerId != null) {
      window.clearInterval(timerId);
      timerId = null;
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!document.body.classList.contains("is-sampler-view")) return;
    closeSamplerView();
  });

  setBpm(bpm);
  setSteps(stepsCount);
  setBeat(beatSteps);
  setRecordingMode(false);
  setPadRatchetPanelOpen(false);
  setActiveTab("pads");
  setSelectedPad(0);
  renderPads();
  renderCompose();
  syncRecordFabPulse();
  syncRecordingStatus();
  bindSwipeBack();
})();
