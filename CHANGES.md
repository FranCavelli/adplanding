# Secciones destacadas agregadas

Se añadieron **tres secciones nuevas** a la landing para diferenciarla. Están
como **componentes independientes**, así es fácil borrar las que no te
convenzan después.

---

## Orden actual de la página

```
Hero
Instagram
Products
Calculator        ← NUEVO (B)
Services
Process           ← NUEVO (A)
HowItWorks
WhyUs
EcoWall           ← NUEVO (C)
Contact
Footer
```

---

## Opción A — `Process.astro` · "De la fuente a tu casa"

**Dónde**: entre `Services` y `HowItWorks`.

**Qué hace**: cuenta el proceso completo de cómo se envasa el agua, en **6 pasos**:

1. Captación
2. Filtración multietapa
3. Análisis físico-químico
4. Envasado en planta propia
5. Sellado y control final
6. A tu puerta

**Animaciones**:
- Línea vertical central que se **va llenando** (gradiente marca) mientras
  scrolleás, sincronizada con la posición del scroll.
- Cada paso entra con fade + translación al aparecer en viewport.
- Los íconos hacen un "pop" con `back.out` easing (escala desde 60% con rotación).
- Los pasos alternan lado izquierdo/derecho en desktop (zigzag).

**Por qué destaca**: ningún competidor local muestra su proceso. Aprovecha
exactamente lo que ya publicás en IG ("habilitación nacional", "producción
propia", "análisis aprobados") y lo convierte en narrativa visual.

**Para borrarla**:
- Eliminá `src/components/Process.astro`
- Quitá `import Process` y `<Process />` de `src/pages/index.astro`

---

## Opción B — `Calculator.astro` · "¿Cuánta agua necesitás?"

**Dónde**: entre `Products` y `Services`.

**Qué hace**: calculadora interactiva. El usuario elige:
- **Tipo de uso** (Hogar 2L/día, Oficina 2.5L/día, Gym 3.5L/día) — botones
- **Cantidad de personas** — slider 1 a 30

Y ve en tiempo real:
- **Litros al mes** recomendados (OMS)
- **Cantidad de bidones de 20L** necesarios
- **Botellas plásticas evitadas** (vs. 500ml descartables)

**Animaciones**:
- Un **bidón SVG** a la derecha que se **llena en vivo** (altura + olita
  animada) conforme movés el slider. Incluso las burbujas son parte del SVG.
- Los 3 cards de resultado cuentan desde el valor anterior al nuevo con GSAP.
- Porcentaje de llenado flotando a la izquierda del bidón.

**Botón CTA**: "Pedir estos N bidones por WhatsApp" con el mensaje pre-cargado
que incluye personas, consumo y cantidad calculada.

**Por qué destaca**: es **utilidad pura**, nadie más en el rubro ofrece esto.
Te deja de lado-a-lado con marcas de agua premium, ayuda a la conversión
("ya sabe cuántos necesita, le hacemos fácil pedir exactamente eso").

**Para borrarla**:
- Eliminá `src/components/Calculator.astro`
- Quitá `import Calculator` y `<Calculator />` de `src/pages/index.astro`

---

## Opción C — `EcoWall.astro` · "Nuestro impacto"

**Dónde**: entre `WhyUs` y `Instagram` / `Contact`.

**Qué hace**: dos bloques:

1. **4 contadores eco/impacto** que cuentan desde 0 cuando entran en viewport:
   - +5.000.000 botellas plásticas evitadas
   - 2.500.000 L entregados
   - +5.000 familias hidratadas
   - +20 años en Lincoln

2. **"Pared de reseñas" como burbujas flotantes** (6 testimonios):
   - Cada tarjeta flota arriba/abajo con CSS keyframe (delays distintos para
     que no floten sincronizadas).
   - Hover: pausa el flote y la card crece ligeramente + sube z-index.
   - Avatar con la inicial del cliente, rating de 5 estrellas, gradiente de
     marca en cada una.

**Nota**: los números de stats y los textos de las reseñas son **estimados**.
Los edités en `src/components/EcoWall.astro` (arrays `stats` y `reviews`).

**Por qué destaca**: prueba social visualmente distinta (no grid estático).
Los contadores de impacto dan legitimidad y conectan con el mensaje de
retornable/sustentable.

**Para borrarla**:
- Eliminá `src/components/EcoWall.astro`
- Quitá `import EcoWall` y `<EcoWall />` de `src/pages/index.astro`

---

## Cambios técnicos globales

- `src/pages/index.astro`: imports y posicionamiento de los 3 nuevos
  componentes.
- **No tocó**: navbar (para no saturarlo con 3 links más). Si querés que
  alguna quede en el menú, se agregan los `href="#proceso"`, `#calculadora`
  o `#impacto` en `src/components/Navbar.astro`.

---

## Recomendación para decidir

- Si querés **UNA sola**: andá con **A (Process)** — es la que mejor
  diferencia una marca de agua seria de un revendedor.
- Si querés **DOS**: **A + B**. Process cuenta quién sos, Calculator
  convierte al visitante.
- Si querés **LAS TRES**: la página queda densa pero muy "trabajada". Ideal
  si el tráfico es cliente nuevo que todavía no te conoce.
