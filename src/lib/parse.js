// Turns pasted text or an opened file into a JS value the inspector can
// show. JSON loads as-is; CSV / TSV / NDJSON load as an array of row
// objects (the same shape a SQL result has), so Table and Chart modes
// work on them directly.

export const FORMATS = {
  json: 'JSON',
  ndjson: 'NDJSON',
  csv: 'CSV',
  tsv: 'TSV'
};

/** Guess a format from a file name, or null if the extension says nothing. */
export function formatFromName(name = '') {
  const ext = name.toLowerCase().split('.').pop();
  if (ext === 'json' || ext === 'geojson' || ext === 'har') return 'json';
  if (ext === 'ndjson' || ext === 'jsonl') return 'ndjson';
  if (ext === 'csv') return 'csv';
  if (ext === 'tsv' || ext === 'tab') return 'tsv';
  return null;
}

/** Best guess at what `text` is. JSON wins if it parses, then NDJSON
 * (every non-blank line is JSON), then TSV/CSV by which delimiter shows
 * up consistently on the first few lines. */
export function detectFormat(text) {
  const t = text.trim();
  if (!t) return null;
  try {
    JSON.parse(t);
    return 'json';
  } catch {}
  const lines = t.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length > 1 && lines.every((l) => isJsonLine(l))) return 'ndjson';
  const sample = lines.slice(0, 5);
  const tabs = sample.map((l) => l.split('\t').length);
  if (tabs[0] > 1 && tabs.every((n) => n === tabs[0])) return 'tsv';
  const commas = sample.map((l) => splitDelimited(l, ',')[0]?.length ?? 0);
  if (commas[0] > 1) return 'csv';
  if (sample.length > 1 && tabs[0] > 1) return 'tsv';
  return 'json'; // fall through so the JSON error message is what the user sees
}

function isJsonLine(l) {
  const s = l.trim();
  if (!/^[[{]/.test(s)) return false;
  try {
    JSON.parse(s);
    return true;
  } catch {
    return false;
  }
}

/**
 * @param {string} text
 * @param {string|null} format one of FORMATS' keys, or null to auto-detect
 * @param {{ inferTypes?: boolean }} opts
 * @returns {{ value: any, format: string }}
 * @throws with a readable message when the text can't be parsed as `format`
 */
export function parseText(text, format = null, opts = {}) {
  const fmt = format || detectFormat(text) || 'json';
  const inferTypes = opts.inferTypes !== false;
  switch (fmt) {
    case 'json':
      return { value: JSON.parse(text), format: fmt };
    case 'ndjson':
      return { value: parseNdjson(text), format: fmt };
    case 'csv':
      return { value: rowsToObjects(splitDelimited(text, ','), inferTypes), format: fmt };
    case 'tsv':
      return { value: rowsToObjects(splitDelimited(text, '\t'), inferTypes), format: fmt };
    default:
      throw new Error(`Unknown format: ${fmt}`);
  }
}

function parseNdjson(text) {
  const out = [];
  text.split(/\r?\n/).forEach((line, i) => {
    if (!line.trim()) return;
    try {
      out.push(JSON.parse(line));
    } catch (e) {
      throw new Error(`Line ${i + 1}: ${e.message}`);
    }
  });
  return out;
}

/** RFC 4180-style splitter: quoted fields may contain the delimiter,
 * newlines, and "" escaped quotes. Returns rows of raw string cells. */
export function splitDelimited(text, delim) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  let i = 0;
  if (text.charCodeAt(0) === 0xfeff) i = 1; // strip BOM
  for (; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else quoted = false;
      } else field += c;
    } else if (c === '"' && field === '') {
      quoted = true;
    } else if (c === delim) {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else field += c;
  }
  if (quoted) throw new Error('Unterminated quoted field');
  if (field !== '' || row.length) {
    row.push(field);
    rows.push(row);
  }
  // drop fully blank lines (trailing newline, blank separators)
  return rows.filter((r) => !(r.length === 1 && r[0] === ''));
}

function rowsToObjects(rows, inferTypes) {
  if (!rows.length) return [];
  const header = uniqueHeaders(rows[0]);
  return rows.slice(1).map((r) => {
    const o = {};
    header.forEach((h, i) => {
      const raw = r[i] ?? '';
      o[h] = inferTypes ? infer(raw) : raw;
    });
    // extra cells past the header get positional names instead of vanishing
    for (let i = header.length; i < r.length; i++) o[`column_${i + 1}`] = inferTypes ? infer(r[i]) : r[i];
    return o;
  });
}

function uniqueHeaders(cells) {
  const seen = {};
  return cells.map((c, i) => {
    let name = c.trim() || `column_${i + 1}`;
    if (seen[name]) name = `${name}_${++seen[name]}`;
    else seen[name] = 1;
    return name;
  });
}

// Numbers only when they round-trip cleanly — "007", "1e400" and
// 20-digit IDs stay strings so nothing is silently changed.
const NUM_RE = /^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?$/;
function infer(s) {
  const t = s.trim();
  if (t === '') return null;
  if (t === 'true' || t === 'TRUE' || t === 'True') return true;
  if (t === 'false' || t === 'FALSE' || t === 'False') return false;
  if (t === 'null' || t === 'NULL') return null;
  if (NUM_RE.test(t)) {
    const n = Number(t);
    if (Number.isFinite(n) && (Number.isSafeInteger(n) || !/^-?\d+$/.test(t))) return n;
  }
  return s;
}
