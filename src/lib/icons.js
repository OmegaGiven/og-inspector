// Icon registry — inline Lucide SVGs (ISC-licensed), currentColor stroke
// so hover/theme color applies the same as text would.

// width/height in `em` so each icon scales with its container's font-size.
function svg(inner, viewBox = '0 0 24 24') {
  return (
    `<svg class="ico-svg" viewBox="${viewBox}" width="1em" height="1em" fill="none" stroke="currentColor" ` +
    `stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`
  );
}

export const ICONS = {
  help: { svg: svg('<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>'), label: 'Help' },
  themeDark: { svg: svg('<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>'), label: 'Theme: dark — click to cycle' },
  themeLight: { svg: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>'), label: 'Theme: light — click to cycle' },
  themeSystem: { svg: svg('<path d="M12 2v2"/><path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715"/><path d="M16 12a4 4 0 0 0-4-4"/><path d="m19 5-1.256 1.256"/><path d="M20 12h2"/>'), label: 'Theme: follows system — click to cycle' },
  closeTab: { svg: svg('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'), label: 'Close tab' },
  expandOpen: { svg: svg('<path d="m6 9 6 6 6-6"/>'), label: 'Expanded — click to collapse' },
  editCells: { svg: svg('<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>'), label: 'Inline-edit cells (view/export only)' },
  copy: { svg: svg('<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>'), label: 'Copy to clipboard' },
  download: { svg: svg('<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>'), label: 'Download' },
  openFile: { svg: svg('<path d="M12 3v12"/><path d="m17 8-5-5-5 5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>'), label: 'Open file' }
};
