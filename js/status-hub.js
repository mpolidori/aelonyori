(() => {
  const host = document.getElementById("autosaveStatus");
  if (!host) {
    window.AelonyoriStatus = {
      set() {},
      flash() {},
      clear() {},
    };
    return;
  }

  let timerId = null;
  let busySince = null;

  function clearTimer() {
    if (timerId == null) return;
    window.clearTimeout(timerId);
    timerId = null;
  }

  function clearNow() {
    clearTimer();
    host.classList.remove("is-busy", "is-ok", "is-error");
    host.textContent = "";
    host.title = "";
    host.hidden = true;
    busySince = null;
  }

  function set(message, {
    busy = false,
    ok = true,
    minBusyMs = 520,
    holdOkMs = 1700,
    holdErrMs = 3200,
  } = {}) {
    clearTimer();

    const label = String(message || "").trim();
    const now =
      typeof performance !== "undefined" && performance.now
        ? performance.now()
        : Date.now();

    host.hidden = false;
    host.textContent = label;
    host.title = !ok && label ? label : "";
    host.classList.toggle("is-ok", Boolean(ok) && !busy);
    host.classList.toggle("is-error", !ok && !busy);

    if (busy) {
      busySince = now;
      host.classList.add("is-busy");
      return;
    }

    if (busySince == null) {
      busySince = now;
      host.classList.add("is-busy");
    }

    const elapsed = now - busySince;
    const remaining = Math.max(0, Math.round(minBusyMs) - elapsed);
    const holdMs = ok ? Math.max(0, Math.round(holdOkMs)) : Math.max(0, Math.round(holdErrMs));

    timerId = window.setTimeout(() => {
      clearNow();
    }, remaining + holdMs);
  }

  function flash(message, {
    ok = true,
    busy = true,
    durationMs = 3000,
  } = {}) {
    clearTimer();
    host.hidden = false;
    host.textContent = String(message || "saving").trim();
    host.title = ok ? "" : String(message || "").trim();
    host.classList.toggle("is-ok", Boolean(ok));
    host.classList.toggle("is-error", !ok);
    host.classList.toggle("is-busy", Boolean(busy));
    busySince = null;

    timerId = window.setTimeout(() => {
      clearNow();
    }, Math.max(0, Math.round(durationMs)));
  }

  window.AelonyoriStatus = {
    set,
    flash,
    clear: clearNow,
  };
})();
