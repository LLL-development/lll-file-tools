import { t } from "../i18n.js";
import {
  formatBytes, downloadBlob, fileIconSvg, trashIconSvg,
  splitExt, setupDropzone, showStatus, hideStatus,
} from "../utils.js";

let files = [];

function el(id) { return document.getElementById(id); }

function applyCase(str, mode) {
  if (mode === "lower") return str.toLowerCase();
  if (mode === "upper") return str.toUpperCase();
  if (mode === "title") {
    return str.replace(/[^\s_-]+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  }
  return str;
}

function pad(num, digits) {
  return String(num).padStart(digits, "0");
}

function computeNewName(file, index) {
  const { base, ext } = splitExt(file.name);
  const find = el("renameFind").value;
  const replace = el("renameReplace").value;
  const prefix = el("renamePrefix").value;
  const suffix = el("renameSuffix").value;
  const caseMode = el("renameCase").value;
  const numberingOn = el("renameNumberingOn").checked;
  const start = parseInt(el("renameStart").value, 10) || 0;
  const digits = Math.max(1, parseInt(el("renamePadding").value, 10) || 1);
  const pattern = el("renamePattern").value || "{name}_{n}{ext}";

  let processedBase = find ? base.split(find).join(replace) : base;
  processedBase = applyCase(processedBase, caseMode);
  const nameWithFixes = `${prefix}${processedBase}${suffix}`;

  if (numberingOn) {
    return pattern
      .replaceAll("{n}", pad(start + index, digits))
      .replaceAll("{name}", nameWithFixes)
      .replaceAll("{ext}", ext);
  }
  return `${nameWithFixes}${ext}`;
}

function render() {
  const list = el("renameList");
  const empty = el("renameEmpty");
  const controls = el("renameControls");

  list.innerHTML = "";
  if (!files.length) {
    empty.style.display = "block";
    controls.style.display = "none";
    return;
  }
  empty.style.display = "none";
  controls.style.display = "block";
  el("renameCount").textContent = `${files.length} ${t("common_files")}`;

  const newNames = files.map((f, i) => computeNewName(f, i));
  const counts = {};
  newNames.forEach((n) => (counts[n] = (counts[n] || 0) + 1));

  files.forEach((file, i) => {
    const newName = newNames[i];
    const conflict = counts[newName] > 1;
    const row = document.createElement("div");
    row.className = "file-row";
    row.innerHTML = `
      <span class="file-icon">${fileIconSvg()}</span>
      <div class="file-meta">
        <div class="name">${escapeHtml(file.name)}</div>
        <div class="sub">${formatBytes(file.size)}</div>
      </div>
      <span class="rename-arrow">→</span>
      <div class="file-meta">
        <div class="new-name ${conflict ? "conflict" : ""}">${escapeHtml(newName)}</div>
        ${conflict ? `<div class="sub">${t("rename_conflict")}</div>` : ""}
      </div>
      <div class="row-actions"><button class="btn btn-sm" data-remove="${i}">${trashIconSvg()}</button></div>
    `;
    list.appendChild(row);
  });

  list.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      files.splice(Number(btn.dataset.remove), 1);
      render();
    });
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

export function initRename() {
  setupDropzone(el("renameDrop"), el("renameInput"), (newFiles) => {
    files.push(...newFiles);
    render();
  });

  [
    "renameFind", "renameReplace", "renamePrefix", "renameSuffix", "renameCase",
    "renameNumberingOn", "renameStart", "renamePadding", "renamePattern",
  ].forEach((id) => {
    el(id).addEventListener("input", render);
    el(id).addEventListener("change", render);
  });

  el("renameClear").addEventListener("click", () => {
    files = [];
    render();
  });

  el("renameDownload").addEventListener("click", async () => {
    if (!files.length) return;
    const status = el("renameStatus");
    const progress = el("renameProgress");
    const bar = progress.querySelector(".progress-bar");
    progress.classList.add("active");
    hideStatus(status);

    try {
      const newNames = files.map((f, i) => computeNewName(f, i));
      const zip = new JSZip();
      files.forEach((file, i) => zip.file(newNames[i], file));
      const blob = await zip.generateAsync({ type: "blob" }, (meta) => {
        bar.style.width = `${Math.round(meta.percent)}%`;
      });
      downloadBlob(blob, "renamed-files.zip");
      showStatus(status, "✓", "success");
    } catch (err) {
      showStatus(status, err.message || String(err), "error");
    } finally {
      setTimeout(() => {
        progress.classList.remove("active");
        bar.style.width = "0%";
      }, 300);
    }
  });
}
