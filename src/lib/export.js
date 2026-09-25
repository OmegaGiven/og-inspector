// Export helpers — plain browser downloads + clipboard.

/** Download `text` as a file. Returns true if the download was started. */
export async function downloadText(filename, text, mime = 'text/plain') {
  return downloadBlob(filename, new Blob([text], { type: mime }));
}

export function downloadBlob(filename, blob) {
  try {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    return true;
  } catch {
    return false;
  }
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function cell(v) {
  if (v === null || v === undefined) return '';
  return typeof v === 'object' ? JSON.stringify(v) : String(v);
}

/** cols: [{name}], rows: any[][]. delim ',' or '\t'. withHeaders=false
 * omits the header row entirely. */
export function rowsToDelimited(cols, rows, delim = ',', withHeaders = true) {
  const esc = (s) => {
    s = cell(s);
    if (delim === ',' && /[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    if (delim === '\t') return s.replace(/[\t\n\r]/g, ' ');
    return s;
  };
  const body = rows.map((r) => r.map(esc).join(delim)).join('\n');
  if (!withHeaders) return body;
  const head = cols.map((c) => esc(c.name)).join(delim);
  return body ? `${head}\n${body}` : head;
}
