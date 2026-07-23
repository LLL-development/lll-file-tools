import { t } from "../i18n.js";
import {
  formatBytes, downloadBlob, fileIconSvg, trashIconSvg,
  setupDropzone, showStatus, hideStatus,
} from "../utils.js";

let files = [];

function el(id) { return document.getElementById(id); }

function render() {
  const list = el("zipCreateList");
  const empty = el("zipCreateEmpty");
  const toolbar = el("zipCreateToolbar");

  list.innerHTML = "";
  if (!files.length) {
    empty.style.display = "block";
    toolbar.style.display = "none";
    return;
  }
  empty.style.display = "none";
  toolbar.style.display = "flex";
  el("zipCreateCount").textContent = `${files.length} ${t("zipCreate_count")}`;

  files.forEach((file, i) => {
    const row = document.createElement("div");
    row.className = "file-row";
    row.innerHTML = `
      <span class="file-icon">${fileIconSvg()}</span>
      <div class="file-meta">
        <div class="name">${escapeHtml(file.name)}</div>
        <div class="sub">${formatBytes(file.size)}</div>
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

export function initZipCreate() {
  setupDropzone(el("zipCreateDrop"), el("zipCreateInput"), (newFiles) => {
    files.push(...newFiles);
    render();
  });

  el("zipCreateClear").addEventListener("click", () => {
    files = [];
    render();
  });

  el("zipCreateBuild").addEventListener("click", async () => {
    if (!files.length) return;
    const status = el("zipCreateStatus");
    const progress = el("zipCreateProgress");
    const bar = progress.querySelector(".progress-bar");
    progress.classList.add("active");
    hideStatus(status);

    try {
      const zip = new JSZip();
      for (const file of files) {
        zip.file(file.name, file);
      }
      const blob = await zip.generateAsync({ type: "blob" }, (meta) => {
        bar.style.width = `${Math.round(meta.percent)}%`;
      });
      const name = (el("zipCreateName").value || "archive").replace(/\.zip$/i, "");
      downloadBlob(blob, `${name}.zip`);
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
