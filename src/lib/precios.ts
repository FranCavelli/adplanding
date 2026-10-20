// Precios de Aquaenvio. Los guarda en src/data/precios.json scripts/actualizar-precios.mjs,
// que corre en la PC de la oficina: a los servidores de GitHub Aquaenvio les responde 403.
import guardados from '../data/precios.json';

export function obtenerPrecios(): Record<number, number> {
  return Object.fromEntries(Object.entries(guardados).map(([id, precio]) => [Number(id), precio]));
}

export const formatoPrecio = (n: number) => `$${n.toLocaleString('es-AR')}`;
