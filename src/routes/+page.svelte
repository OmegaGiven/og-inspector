<script>
  import InspectorView from '$lib/components/InspectorView.svelte';
  import Toasts from '$lib/components/Toasts.svelte';
  import { theme } from '$lib/stores.js';
  import { ICONS } from '$lib/icons.js';

  const NEXT = { system: 'light', light: 'dark', dark: 'system' };
  $: themeIcon = $theme === 'dark' ? ICONS.themeDark : $theme === 'light' ? ICONS.themeLight : ICONS.themeSystem;
</script>

<div class="app">
  <header class="top">
    <div class="brand">
      <span class="logo" aria-hidden="true">{'{ }'}</span>
      <span class="name">OG Inspector</span>
      <span class="tag">JSON · CSV · TSV · NDJSON · JWT</span>
    </div>
    <span style="flex:1" />
    <a class="btn ghost sm" href="https://github.com/OmegaGiven/og-inspector" target="_blank" rel="noopener">GitHub</a>
    <a
      class="btn ghost sm"
      href="https://github.com/OmegaGiven/OG-TestDesk"
      target="_blank"
      rel="noopener"
      title="The full desktop app: SQL client + HTTP client + this inspector">Get OG TestDesk</a
    >
    <button class="icon-btn" title={themeIcon.label} on:click={() => theme.set(NEXT[$theme])}>
      {@html themeIcon.svg}
    </button>
  </header>
  <main>
    <InspectorView />
  </main>
</div>
<Toasts />

<style>
  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    height: 100dvh;
  }
  .top {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: var(--surface-1);
    border-bottom: 2px solid var(--tool-inspector-text);
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }
  .logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    background: var(--tool-inspector-tint);
    color: var(--tool-inspector-text);
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 11px;
  }
  .name {
    font-weight: 700;
    font-size: 14px;
    color: var(--tool-inspector-text);
  }
  .tag {
    font-size: 11px;
    color: var(--text-muted);
    white-space: nowrap;
  }
  a.btn {
    text-decoration: none;
  }
  main {
    flex: 1;
    min-height: 0;
  }
  @media (max-width: 760px) {
    .tag {
      display: none;
    }
  }
</style>
