# Deploy a GitHub Pages — paso a paso

Esta landing es 100% estática. Se publica gratis en GitHub Pages con un
workflow ya configurado en `.github/workflows/deploy.yml`. Cada `git push` a
`main` redeploya automáticamente.

---

## 1. Crear el repo en GitHub

1. Entrá a <https://github.com/new>
2. **Repository name**: `adplanding` (o el que quieras — guardalo)
3. **Visibility**: Public *(GitHub Pages free requiere público; con Pro podés Private)*
4. **No** marques "Add a README" ni licencias — el repo se inicializa vacío.
5. Tocá **Create repository**.

GitHub te muestra una pantalla con instrucciones; ignorala, usá las que están
abajo.

---

## 2. Subir el proyecto

Abrí una terminal en la carpeta del proyecto
(`C:\Users\FranC\OneDrive\Escritorio\adplanding`) y corré:

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/TUUSUARIO/adplanding.git
git push -u origin main
```

(Reemplazá `TUUSUARIO` por tu usuario de GitHub.)

> ⚠ Si te pide login, GitHub ya no acepta password — usá un **Personal Access
> Token** desde <https://github.com/settings/tokens> o instalá GitHub CLI
> (`winget install GitHub.cli` y `gh auth login`).

---

## 3. Activar GitHub Pages

1. En GitHub, andá a tu repo → **Settings** → **Pages** (en la barra
   izquierda).
2. **Source**: seleccioná **"GitHub Actions"** (NO "Deploy from a branch").
3. Listo. La primera vez que hagas push a `main`, el workflow corre solo.

---

## 4. Configurar el `base` URL

Tu sitio va a quedar en `https://TUUSUARIO.github.io/adplanding/` (con el
nombre del repo en el path). Para que Astro genere los links correctos:

1. En el repo en GitHub: **Settings** → **Secrets and variables** → **Actions**
   → tab **Variables** → **New repository variable**.
2. **Name**: `ASTRO_BASE`
3. **Value**: `/adplanding` *(con la barra al inicio, sin barra al final;
   reemplazá `adplanding` por el nombre real de tu repo).*
4. Tocá **Add variable**.

> Si después usás un **custom domain** (paso 6), borrá esta variable.

---

## 5. Trigger del primer deploy

Si ya hiciste `git push` antes de configurar el secret, hacé un push vacío
para re-disparar el workflow:

```bash
git commit --allow-empty -m "trigger deploy"
git push
```

O entrá a la solapa **Actions** del repo → workflow "Deploy to GitHub Pages"
→ tocá **Run workflow** → **Run workflow** (verde).

Esperá 1–2 min. Cuando el job termina (✅), tu sitio está en:

```
https://TUUSUARIO.github.io/adplanding/
```

---

## 6. (Opcional) Custom domain — `aguasdelparque.com.ar`

1. En tu proveedor de DNS (NIC.ar, Cloudflare, etc.), creá:
   - **CNAME** `www` → `TUUSUARIO.github.io`
   - **A records** del root (`@`) apuntando a las IPs de GitHub Pages:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
2. En el repo: **Settings** → **Pages** → **Custom domain** → poné
   `aguasdelparque.com.ar` → **Save**.
3. Marcá **Enforce HTTPS** (cuando aparezca, puede tardar 15–30 min).
4. Borrá la variable `ASTRO_BASE` en Variables (ya no hace falta porque ahora
   el sitio está en la raíz del dominio).
5. Editá `astro.config.mjs` y cambiá `site:` a `https://aguasdelparque.com.ar`.
6. Hacé un push para redeploy.

---

## 7. Cómo actualizar la landing

Cualquier cambio que hagas localmente:

```bash
git add .
git commit -m "lo que cambiaste"
git push
```

GitHub Actions corre el build y publica. **Nunca** edites archivos
directamente en GitHub web — perdés la sincronización con tu copia local.

---

## 8. Probar localmente antes de pushear

```bash
npm run dev      # dev server con hot reload
npm run build    # build de producción a dist/
npm run preview  # ver el dist/ servido localmente
```

---

## 9. Troubleshooting

- **404 en assets** (logo, fotos): casi siempre es el `ASTRO_BASE` mal
  seteado. Si tu URL es `usuario.github.io/adplanding/`, el secret debe ser
  `/adplanding`. Si es custom domain, **no debe estar definido**.
- **El workflow falla en "npm ci"**: borrá `package-lock.json` localmente,
  hacé `npm install`, commiteá el lock nuevo y pusheá.
- **Cambios no aparecen**: GitHub Pages cachea. Esperá 2–3 min, hacé hard
  refresh (Ctrl+Shift+R) o probá en incógnito.
- **Workflow no se dispara**: chequeá que el archivo esté en
  `.github/workflows/deploy.yml` (con dos puntos en `.github`) y que
  pushaste a la rama `main`.
