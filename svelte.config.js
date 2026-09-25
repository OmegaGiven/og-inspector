import adapter from '@sveltejs/adapter-static';

// GitHub Pages serves a project site from /<repo>/, not the domain root.
// The Pages workflow sets BASE_PATH=/og-inspector; local dev leaves it
// empty so the app runs from /.
const base = process.env.BASE_PATH || '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html'
    }),
    paths: { base }
  }
};

export default config;
