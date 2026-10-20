// Trae los precios de Aquaenvio desde esta PC (a los servidores de GitHub Aquaenvio les da 403)
// y, si cambiaron, los sube a main para que la web se republique sola.
// Lo corre una tarea programada de Windows una vez por día.
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const raiz = fileURLToPath(new URL('..', import.meta.url));
const archivo = fileURLToPath(new URL('../src/data/precios.json', import.meta.url));
const API = 'https://aguas-del-parque.aquaenvio.com/api/publico/aguas-del-parque/';

const res = await fetch(API, { signal: AbortSignal.timeout(15000) });
if (!res.ok) throw new Error(`Aquaenvio respondió HTTP ${res.status}`);
const data = await res.json();

// Solo id → precio; el token de la API no se guarda
const precios = {};
for (const p of data.productos ?? []) {
  if (typeof p.id === 'number' && typeof p.precio === 'number') precios[p.id] = p.precio;
}
if (!Object.keys(precios).length) throw new Error('Aquaenvio no devolvió precios');

const nuevo = JSON.stringify(precios, null, 2) + '\n';
let viejo = '';
try { viejo = readFileSync(archivo, 'utf8'); } catch {}
if (nuevo === viejo) {
  console.log('Precios sin cambios');
  process.exit(0);
}

writeFileSync(archivo, nuevo);
const git = (c) => execSync(`git ${c}`, { cwd: raiz, stdio: 'inherit' });
git('pull --rebase --autostash -q origin main');
git('add src/data/precios.json');
git('commit -q -m "Precios de Aquaenvio actualizados"');
git('push -q origin main');
console.log('Precios actualizados y subidos');
