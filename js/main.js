import { applyTranslations, getLang, setLang } from "./i18n.js";
import { initTheme } from "./theme.js";
import { initZipExtract } from "./tools/zipExtractor.js";
import { initZipCreate } from "./tools/zipCreator.js";
import { initRename } from "./tools/rename.js";
import { initHash } from "./tools/hash.js";
import { initMetadata } from "./tools/metadata.js";

function showView(name) {
  const home = document.getElementById("homeView");
  const panels = document.querySelectorAll("[data-panel]");

  if (!name) {
    home.style.display = "";
    panels.forEach((p) => p.classList.remove("active"));
    return;
  }

  home.style.display = "none";
  panels.forEach((p) => {
    p.classList.toggle("active", p.id === `panel-${name}`);
  });
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

function initRouter() {
  function routeFromHash() {
    const hash = location.hash.replace("#", "");
    showView(hash || null);
  }

  document.querySelectorAll(".tool-card").forEach((card) => {
    card.addEventListener("click", () => {
      location.hash = card.dataset.target;
    });
  });

  document.querySelectorAll("[data-back]").forEach((btn) => {
    btn.addEventListener("click", () => {
      location.hash = "";
    });
  });

  window.addEventListener("hashchange", routeFromHash);
  routeFromHash();
}

function initLangSwitcher() {
  const select = document.getElementById("langSelect");
  select.value = getLang();
  select.addEventListener("change", () => setLang(select.value));
}

function init() {
  applyTranslations();
  initTheme();
  initLangSwitcher();
  initRouter();

  initZipExtract();
  initZipCreate();
  initRename();
  initHash();
  initMetadata();

  window.addEventListener("langchange", () => applyTranslations());
}

init();
