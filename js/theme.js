const THEME_KEY = "fileToolkit.theme";

function systemPrefersDark() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function currentTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return systemPrefersDark() ? "dark" : "light";
}

function updateIcons(theme) {
  const sun = document.getElementById("iconSun");
  const moon = document.getElementById("iconMoon");
  if (!sun || !moon) return;
  sun.style.display = theme === "dark" ? "none" : "block";
  moon.style.display = theme === "dark" ? "block" : "none";
}

export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  updateIcons(theme);
}

export function initTheme() {
  applyTheme(currentTheme());

  const toggle = document.getElementById("themeToggle");
  toggle.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });

  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? "dark" : "light");
      }
    });
  }
}
