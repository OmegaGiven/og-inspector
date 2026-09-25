# OG Inspector

A browser-based data inspector: paste or open **JSON, CSV, TSV or NDJSON**
and explore it as a tree, table, summary, raw text or chart — plus a
**JWT decoder**. Runs entirely in your browser; files are read locally
with `FileReader` and never uploaded.

**Live:** https://omegagiven.github.io/og-inspector/

This is the Inspector module of [OG TestDesk](https://github.com/OmegaGiven/OG-TestDesk)
(SQL client + HTTP client + inspector desktop app), pulled out as a
standalone page for people who only need the inspector.

## Features

- **Open / drop / paste** — `.json`, `.geojson`, `.har`, `.csv`, `.tsv`,
  `.ndjson` / `.jsonl`. Pasted text is auto-detected (or pick the format).
  CSV/TSV/NDJSON load as an array of row objects; CSV cells are typed
  (numbers, booleans, empty → `null`) only when that's lossless, so
  `007` or 20-digit IDs stay strings.
- **Tree** — expand/collapse, search keys and values with match count,
  selected-node detail panel (path, type, size, pretty value, copy, edit).
- **Table** — for arrays of objects; click a cell to edit it.
- **Summary** — depth, key count, type histogram, top-level keys.
- **Raw** — pretty-printed, go-to-line, edit in place.
- **Chart** — bar / line / pie from any array of objects, download as PNG.
- **Export** — JSON, or CSV when the data is tabular; copy to clipboard.
- **Decode JWT** — header + payload (with readable `exp`/`iat`/`nbf`
  timestamps and an `expired` flag). The signature is **not** verified.
- Light / dark / system theme.

## Develop

```sh
npm install
npm run dev      # http://localhost:5198
npm run build    # static site in build/
```

Stack: SvelteKit (static adapter) + Svelte 4 + Chart.js — the same as
OG TestDesk's frontend, so components can move between the two.

## Deploy

`.github/workflows/pages.yml` builds and publishes to GitHub Pages on
every push to `main`. One-time setup: **Settings → Pages → Build and
deployment → Source: GitHub Actions**. The workflow sets `BASE_PATH` to
`/<repo-name>` so asset URLs resolve under the project-site subpath.

## License

Apache-2.0 — see [LICENSE](LICENSE) and [NOTICE](NOTICE).
