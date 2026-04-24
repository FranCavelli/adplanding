import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Auto-detect base path:
//  1) Si ASTRO_BASE está definido a mano → se usa ese
//  2) Si corre en GitHub Actions (GITHUB_REPOSITORY=owner/repo)
//     y el repo NO es del tipo "owner.github.io" → base = /repo
//  3) Resto (local dev, custom domain, repo "owner.github.io") → /
function detectBase() {
  if (process.env.ASTRO_BASE) return process.env.ASTRO_BASE;
  const repoFull = process.env.GITHUB_REPOSITORY;
  if (!repoFull) return '/';
  const [owner, repo] = repoFull.split('/');
  if (!repo) return '/';
  if (repo.toLowerCase() === `${owner.toLowerCase()}.github.io`) return '/';
  return `/${repo}`;
}

// Normalizo: que siempre termine con "/" para que las concatenaciones
// `${import.meta.env.BASE_URL}foo.png` funcionen sin pegarse.
let base = detectBase();
if (!base.endsWith('/')) base += '/';

export default defineConfig({
  site: 'https://aguasdelparque.com.ar',
  base,
  trailingSlash: 'ignore',
  integrations: [tailwind()],
  compressHTML: true,
});
