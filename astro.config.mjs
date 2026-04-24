import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Si ASTRO_BASE está definido (ej: /adplanding), la landing se publica bajo ese path.
// Para GitHub Pages tipo usuario.github.io/adplanding → setear ASTRO_BASE=/adplanding
// Para custom domain o usuario.github.io raíz → dejarlo sin definir
const base = process.env.ASTRO_BASE || '/';

export default defineConfig({
  site: 'https://aguasdelparque.com.ar',
  base,
  trailingSlash: 'ignore',
  integrations: [tailwind()],
  compressHTML: true,
});
