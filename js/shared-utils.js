(() => {
  const TOKEN_RE = /("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\btrue\b|\bfalse\b|\bnull\b|-?\d+(?:\.\d+)?(?:[eE][+\-]?\d+)?)/g;

  function numberOrFallback(value, fallback) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function clampNumber(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function clampNumberSafe(value, min, max) {
    return clampNumber(numberOrFallback(value, min), min, max);
  }

  function safeJsonParse(text) {
    try {
      return { ok: true, value: JSON.parse(text) };
    } catch (error) {
      return { ok: false, error };
    }
  }

  function fileSafeStem(value, fallback) {
    const stem = String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-_ ]+/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
    return stem || String(fallback || "file");
  }

  function escapeHtml(text) {
    return String(text)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function highlightJson(text) {
    const escaped = escapeHtml(text);
    return escaped.replace(TOKEN_RE, (match) => {
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

  function normalizeIntervalChoice(value, allowed, fallback) {
    const options = Array.isArray(allowed) && allowed.length > 0
      ? allowed.map((n) => Math.round(numberOrFallback(n, 0))).filter((n) => Number.isFinite(n))
      : [1, 5, 10, 15, 30, 60];

    const next = Math.round(numberOrFallback(value, fallback));
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
  }

  function makeUniquePresetName(base, existingNames, defaultBase) {
    const baseName = String(base || "").trim() || String(defaultBase || "preset");
    const existing = new Set(existingNames);
    if (!existing.has(baseName)) return baseName;
    let i = 2;
    while (existing.has(`${baseName} ${i}`)) i += 1;
    return `${baseName} ${i}`;
  }

  function triggerBlobDownload(data, filename, mimeType) {
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
  }

  window.AelonyoriShared = {
    numberOrFallback,
    clampNumber,
    clampNumberSafe,
    safeJsonParse,
    fileSafeStem,
    escapeHtml,
    highlightJson,
    isQuotaExceededError,
    normalizeIntervalChoice,
    makeUniquePresetName,
    triggerBlobDownload,
  };
})();
