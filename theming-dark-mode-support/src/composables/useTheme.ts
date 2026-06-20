import { ref, watch, readonly } from "vue";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "dashboard-theme";

function getSystemPreference(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(theme: Theme): "light" | "dark" {
  return theme === "system" ? getSystemPreference() : theme;
}

function applyToDOM(resolved: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", resolved);
}

const stored = (localStorage.getItem(STORAGE_KEY) as Theme) || "system";
const preference = ref<Theme>(stored);
const resolved = ref<"light" | "dark">(resolveTheme(stored));

applyToDOM(resolved.value);

const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
mediaQuery.addEventListener("change", () => {
  if (preference.value === "system") {
    resolved.value = getSystemPreference();
    applyToDOM(resolved.value);
  }
});

watch(preference, (next) => {
  localStorage.setItem(STORAGE_KEY, next);
  resolved.value = resolveTheme(next);
  applyToDOM(resolved.value);
});

export function useTheme() {
  function setTheme(theme: Theme) {
    preference.value = theme;
  }

  function toggleTheme() {
    const current = resolveTheme(preference.value);
    preference.value = current === "dark" ? "light" : "dark";
  }

  const isDark = ref(resolved.value === "dark");
  watch(resolved, (r) => {
    isDark.value = r === "dark";
  });

  return {
    preference: readonly(preference),
    resolved: readonly(resolved),
    isDark: readonly(isDark),
    setTheme,
    toggleTheme,
  };
}