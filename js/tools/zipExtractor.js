import { t } from "../i18n.js";
import {
  formatBytes, downloadBlob, fileIconSvg, folderIconSvg,
  downloadIconSvg, setupDropzone, showStatus, hideStatus,
} from "../utils.js";

let currentZip = null;
let currentFileName = "archive.zip";
let entries = []; // { path, name, dir, size, zipObj }

function el(id) { return document.getElementById(id); }

function renderList() {
  const list = el("zipExtractList");
  const empty = el("zipExtractEmpty");
  const toolbar = el("zipExtractToolbar");

  list.innerHTML = "";

  if (!entries.length) {
    empty.style.display = "block";
    toolbar.style.display = "none";
    return;
  }
  empty.style.display = "none";
  toolbar.style.display = "flex";
  el("zipExtractCount").textContent = `${entries.length} ${t("zipExtract_entries")}`;

  entries.forEach((entry, i) => {
    const row = document.createElement("div");
    row.className = "file-row";
    row.innerHTML = `
      ${entry.dir ? "" : `<input type="checkbox" class="entry-check" data-i="${i}" />`}
      <span class="file-icon">${entry.dir ? folderIconSvg() : fileIconSvg()}</span>
      <div class="file-meta">
        <div class="name">${escapeHtml(entry.path)}</div>
        <div class="sub">${entry.dir ? t("zipExtract_folder") : formatBytes(entry.size)}</div>
      </div>
      ${entry.dir ? "" : `<div class="row-actions"><button class="btn btn-sm" data-download="${i}">${downloadIconSvg()}</button></div>`}
    `;
    list.appendChild(row);
  });

  list.querySelectorAll("[data-download]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const idx = Number(btn.dataset.download);
      const entry = entries[idx];
      const blob = await entry.zipObj.async("blob");
      downloadBlob(blob, entry.name);
    });
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

async function loadZipFile(file) {
  const status = el("zipExtractStatus");
  const progress = el("zipExtractProgress");
  const bar = progress.querySelector(".progress-bar");

  showStatus(status, t("zipExtract_loading"), "info");
  progress.classList.add("active");
  bar.style.width = "10%";

  try {
    currentFileName = file.name;
    currentZip = await JSZip.loadAsync(file);
    bar.style.width = "70%";

    entries = [];
    currentZip.forEach((relPath, zipObj) => {
      entries.push({
        path: relPath,
        name: relPath.split("/").filter(Boolean).pop() || relPath,
        dir: zipObj.dir,
        size: zipObj._data ? zipObj._data.uncompressedSize : 0,
        zipObj,
      });
    });
    entries.sort((a, b) => a.path.localeCompare(b.path));

    bar.style.width = "100%";
    hideStatus(status);
    renderList();
  } catch (err) {
    showStatus(status, err.message || String(err), "error");
  } finally {
    setTimeout(() => {
      progress.classList.remove("active");
      bar.style.width = "0%";
    }, 300);
  }
}

export function initZipExtract() {
  setupDropzone(el("zipExtractDrop"), el("zipExtractInput"), (files) => {
    if (files[0]) loadZipFile(files[0]);
  });

  el("zipExtractSelectAll").addEventListener("click", () => {
    const boxes = document.querySelectorAll(".entry-check");
    const allChecked = Array.from(boxes).every((b) => b.checked);
    boxes.forEach((b) => (b.checked = !allChecked));
  });

  el("zipExtractDownloadAll").addEventListener("click", async () => {
    if (!currentZip) return;
    const blob = await currentZip.generateAsync({ type: "blob" });
    downloadBlob(blob, currentFileName);
  });

  el("zipExtractDownloadSelected").addEventListener("click", async () => {
    const checked = Array.from(document.querySelectorAll(".entry-check:checked"));
    if (!checked.length) return;

    if (checked.length === 1) {
      const entry = entries[Number(checked[0].dataset.i)];
      const blob = await entry.zipObj.async("blob");
      downloadBlob(blob, entry.name);
      return;
    }

    const zip = new JSZip();
    for (const box of checked) {
      const entry = entries[Number(box.dataset.i)];
      const content = await entry.zipObj.async("arraybuffer");
      zip.file(entry.path, content);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    downloadBlob(blob, "selected.zip");
  });
}
