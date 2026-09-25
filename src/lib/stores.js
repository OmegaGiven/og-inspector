import { writable } from 'svelte/store';

/* ------------------------------------------------------------------ toasts */

export const toasts = writable([]);
let toastId = 0;
export function toast(message, kind = 'info', ttl = 4000) {
  const id = ++toastId;
  toasts.update((t) => [...t, { id, message, kind }]);
  if (ttl) setTimeout(() => dismissToast(id), ttl);
  return id;
}
export function dismissToast(id) {
  toasts.update((t) => t.filter((x) => x.id !== id));
}
export function toastError(e) {
  toast(typeof e === 'string' ? e : e?.message || String(e), 'error', 7000);
}

/* ------------------------------------------------------------------ theme */

const THEME_KEY = 'oginspector.theme';

function initialTheme() {
  try {
    const t = localStorage.getItem(THEME_KEY);
    if (t === 'light' || t === 'dark' || t === 'system') return t;
  } catch {}
  return 'system';
}

export const theme = writable(initialTheme()); // 'system' | 'light' | 'dark'

export function applyTheme(t) {
  const root = document.documentElement;
  if (t === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', t);
}

theme.subscribe((t) => {
  if (typeof document === 'undefined') return;
  applyTheme(t);
  try {
    localStorage.setItem(THEME_KEY, t);
  } catch {}
});

/* -------------------------------------------------------------- inspector */

// The one thing everything in the inspector reads from. `at` is a stamp
// so views can tell "a new payload arrived" apart from "the same payload
// was edited in place".
export const inspectorPayload = writable(null); // { source, label, json, meta, at }

export function sendToInspector(source, label, json, meta = null) {
  inspectorPayload.set({ source, label, json, meta, at: Date.now() });
}
