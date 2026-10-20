// Precios tomados de la tienda pública de Aquaenvio al armar la página (no desde el navegador).
// Solo se guarda id → precio; el token que devuelve la API no se usa ni se publica.
const API = 'https://aguas-del-parque.aquaenvio.com/api/publico/aguas-del-parque/';

export async function obtenerPrecios(): Promise<Record<number, number>> {
  try {
    const res = await fetch(API, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const precios: Record<number, number> = {};
    for (const p of data.productos ?? []) {
      if (typeof p.id === 'number' && typeof p.precio === 'number') precios[p.id] = p.precio;
    }
    return precios;
  } catch (e) {
    // Si Aquaenvio no responde, la página se arma igual, sin precios
    console.warn('No se pudieron traer los precios de Aquaenvio:', e);
    return {};
  }
}

export const formatoPrecio = (n: number) => `$${n.toLocaleString('es-AR')}`;
