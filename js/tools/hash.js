import { t } from "../i18n.js";
import { formatBytes, copyIconSvg, setupDropzone, showStatus, hideStatus } from "../utils.js";

let items = []; // { file, hashes: {alg: value}, computing: bool }

function el(id) { return document.getElementById(id); }

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sha(file, algo) {
  const buffer = await file.arrayBuffer();
  const digest = await crypto.subtle.digest(algo, buffer);
  return bufferToHex(digest);
}

function md5(file) {
  return new Promise((resolve, reject) => {
    const chunkSize = 2 * 1024 * 1024;
    const chunks = Math.ceil(file.size / chunkSize);
    const spark = new SparkMD5.ArrayBuffer();
    const reader = new FileReader();
    let current = 0;

    reader.onload = (e) => {
      spark.append(e.target.result);
      current++;
      if (current < chunks) {
        loadNext();
      } else {
        resolve(spark.end());
      }
    };
    reader.onerror = () => reject(reader.error);

    function loadNext() {
      const start = current * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      reader.readAsArrayBuffer(file.slice(start, end));
    }
    loadNext();
  });
}

function selectedAlgorithms() {
  const list = [];
  if (el("algMd5").checked) list.push("MD5");
  if (el("algSha1").checked) list.push("SHA-1");
  if (el("algSha256").checked) list.push("SHA-256");
  if (el("algSha512").checked) list.push("SHA-512");
  return list;
}

async function computeHashes(item) {
  const algos = selectedAlgorithms();
  item.computing = true;
  item.hashes = item.hashes || {};
  render();

  for (const algo of algos) {
    if (item.hashes[algo]) continue;
    item.hashes[algo] = algo === "MD5" ? await md5(item.file) : await sha(item.file, algo);
    render();
  }
  item.computing = false;
  render();
}

function checkMatch(item) {
  const compareEl = el("hashCompare");
  const expected = compareEl.value.trim().toLowerCase();
  if (!expected) return null;
  return Object.values(item.hashes || {}).some((v) => v.toLowerCase() === expected);
}

function render() {
  const container = el("hashResults");
  const empty = el("hashEmpty");
  const controls = el("hashControls");

  if (!items.length) {
    container.innerHTML = "";
    empty.style.display = "block";
    controls.style.display = "none";
    return;
  }
  empty.style.display = "none";
  controls.style.display = "block";

  container.innerHTML = items.map((item, i) => {
    const match = checkMatch(item);
    const rows = Object.entries(item.hashes || {}).map(([alg, val]) => `
      <tr>
        <td>${alg}</td>
        <td><div class="hash-value"><span>${val}</span>
          <button class="copy-btn" data-copy="${escapeHtml(val)}" title="${t("hash_copy")}">${copyIconSvg()}</button>
        </div></td>
      </tr>
    `).join("");

    return `
      <div class="metadata-card">
        <h4>${escapeHtml(item.file.name)}
          ${match === true ? `<span style="color:var(--success);font-size:0.8rem;font-weight:600;">✓ ${t("hash_match")}</span>` : ""}
          ${match === false ? `<span style="color:var(--danger);font-size:0.8rem;font-weight:600;">✕ ${t("hash_noMatch")}</span>` : ""}
        </h4>
        <div class="sub" style="color:var(--text-muted);font-size:0.8rem;margin-bottom:6px;">${formatBytes(item.file.size)}</div>
        ${item.computing ? `<div class="empty-state">${t("hash_computing")}</div>` : `
        <table class="data-table">
          <thead><tr><th style="width:110px">${t("hash_algorithms")}</th><th></th></tr></thead>
          <tbody>${rows}</tbody>
        </table>`}
        <div style="margin-top:8px"><button class="btn btn-sm" data-remove="${i}">${t("common_remove")}</button></div>
      </div>
    `;
  }).join("");

  container.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await navigator.clipboard.writeText(btn.dataset.copy);
      const original = btn.innerHTML;
      btn.innerHTML = "✓";
      setTimeout(() => (btn.innerHTML = original), 1000);
    });
  });

  container.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      items.splice(Number(btn.dataset.remove), 1);
      render();
    });
  });
}

export function initHash() {
  setupDropzone(el("hashDrop"), el("hashInput"), (files) => {
    const newItems = files.map((file) => ({ file, hashes: {}, computing: false }));
    items.push(...newItems);
    render();
    newItems.forEach((item) => computeHashes(item).catch((err) => {
      showStatus(el("hashStatus"), err.message || String(err), "error");
    }));
  });

  ["algMd5", "algSha1", "algSha256", "algSha512"].forEach((id) => {
    el(id).addEventListener("change", () => {
      items.forEach((item) => {
        item.hashes = {};
        computeHashes(item).catch((err) => showStatus(el("hashStatus"), err.message || String(err), "error"));
      });
    });
  });

  el("hashCompare").addEventListener("input", render);

  el("hashClear").addEventListener("click", () => {
    items = [];
    hideStatus(el("hashStatus"));
    render();
  });
}
