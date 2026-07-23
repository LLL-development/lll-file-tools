import { t } from "../i18n.js";
import { formatBytes, formatDate, setupDropzone } from "../utils.js";

let items = []; // { file, extra: {} }

function el(id) { return document.getElementById(id); }

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function readImageDimensions(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      resolve(null);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

function readMediaDuration(file, isVideo) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const media = document.createElement(isVideo ? "video" : "audio");
    media.preload = "metadata";
    media.onloadedmetadata = () => {
      const result = {
        duration: media.duration,
        width: isVideo ? media.videoWidth : null,
        height: isVideo ? media.videoHeight : null,
      };
      resolve(result);
      URL.revokeObjectURL(url);
    };
    media.onerror = () => {
      resolve(null);
      URL.revokeObjectURL(url);
    };
    media.src = url;
  });
}

function formatDuration(seconds) {
  if (!isFinite(seconds)) return t("meta_unknown");
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

async function loadExtra(item) {
  const type = item.file.type;
  if (type.startsWith("image/")) {
    const dim = await readImageDimensions(item.file);
    if (dim) item.extra.dimensions = `${dim.width} × ${dim.height}`;
  } else if (type.startsWith("video/")) {
    const media = await readMediaDuration(item.file, true);
    if (media) {
      item.extra.duration = formatDuration(media.duration);
      if (media.width) item.extra.dimensions = `${media.width} × ${media.height}`;
    }
  } else if (type.startsWith("audio/")) {
    const media = await readMediaDuration(item.file, false);
    if (media) item.extra.duration = formatDuration(media.duration);
  }
  render();
}

function render() {
  const container = el("metadataResults");
  const empty = el("metadataEmpty");
  const toolbar = el("metadataToolbar");

  if (!items.length) {
    container.innerHTML = "";
    empty.style.display = "block";
    toolbar.style.display = "none";
    return;
  }
  empty.style.display = "none";
  toolbar.style.display = "flex";

  container.innerHTML = items.map((item, i) => {
    const f = item.file;
    const fields = [
      [t("meta_type"), f.type || t("meta_unknown")],
      [t("meta_size"), formatBytes(f.size)],
      [t("meta_modified"), formatDate(new Date(f.lastModified))],
    ];
    if (item.extra.dimensions) fields.push([t("meta_dimensions"), item.extra.dimensions]);
    if (item.extra.duration) fields.push([t("meta_duration"), item.extra.duration]);

    return `
      <div class="metadata-card">
        <h4>${escapeHtml(f.name)}</h4>
        <div class="metadata-grid">
          ${fields.map(([k, v]) => `<div><span class="k">${k}</span><span class="v">${escapeHtml(String(v))}</span></div>`).join("")}
        </div>
        <div style="margin-top:10px"><button class="btn btn-sm" data-remove="${i}">${t("common_remove")}</button></div>
      </div>
    `;
  }).join("");

  container.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      items.splice(Number(btn.dataset.remove), 1);
      render();
    });
  });
}

export function initMetadata() {
  setupDropzone(el("metadataDrop"), el("metadataInput"), (files) => {
    const newItems = files.map((file) => ({ file, extra: {} }));
    items.push(...newItems);
    render();
    newItems.forEach((item) => loadExtra(item));
  });

  el("metadataClear").addEventListener("click", () => {
    items = [];
    render();
  });
}
