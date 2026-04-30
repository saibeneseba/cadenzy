# DECISIONS.md — Architecture Decision Records

> Cada decisión arquitectónica importante del proyecto se registra acá.
> El formato es ligero pero serio. Esto te va a servir un montón en entrevistas
> cuando te pregunten *"¿por qué elegiste X?"*.

---

## Cómo leer esto

Cada ADR (Architecture Decision Record) tiene:
- **Contexto:** qué problema o decisión enfrentamos
- **Decisión:** qué se eligió
- **Consecuencias:** qué implica esa decisión (lo bueno y lo malo)
- **Alternativas consideradas:** otras opciones evaluadas

---

## ADR-001 — React como framework frontend

**Fecha:** 2026-04-30
**Estado:** ✅ Aceptada

### Contexto
Hay que elegir framework frontend para Cadenzy. Las dos opciones serias son React y Angular. Hay también valor en aprender Angular para ampliar empleabilidad.

### Decisión
**React 19 + Vite** para Cadenzy. Angular se aborda en un proyecto separado posterior.

### Consecuencias
✅ Mercado más grande (~2.3x búsquedas laborales que Angular).
✅ Ecosistema con mejores libs para nuestro caso (dnd-kit, cmdk, Tiptap, Framer Motion).
✅ TanStack Query + Zustand permiten optimistic UI elegante con poco código.
✅ El dev ya conoce React, puede ir profundo en lugar de aprender básico.
❌ Pierde la oportunidad de mostrar Angular en este proyecto.

### Alternativas consideradas
- **Angular:** descartado por: curva empinada de RxJS sumada a aprender el resto, menos pulido visual disponible para Tracker-likes, mercado más enterprise (premio salarial pero menos puertas).
- **Monorepo con React + Angular en paralelo:** descartado por complejidad excesiva para junior.

---

## ADR-002 — Anthropic como proveedor de AI

**Fecha:** 2026-04-30
**Estado:** ✅ Aceptada

### Contexto
Cadenzy necesita un proveedor de LLM para sus 4 features de AI. Las opciones principales son Anthropic, OpenAI y Google.

### Decisión
**Anthropic (Claude Sonnet 4.6 + Haiku 4.5)** para todas las llamadas LLM. **Voyage AI** para embeddings (Anthropic no tiene modelo propio).

### Consecuencias
✅ Tool Use de Claude es el mejor del mercado para function calling complejo (crítico para feature #1).
✅ Output con XML estructurado es más confiable.
✅ Context window de 200k tokens permite mandar todo el workspace sin truncar.
✅ Diferenciación en CV: 80% de proyectos AI usan OpenAI, usar Anthropic muestra criterio.
✅ Anthropic crece fuerte en enterprise; experiencia con su SDK abre búsquedas.
❌ No hay modelo de embeddings propio (hay que sumar Voyage AI).
❌ Si necesitamos voice/imágenes en futuro, hay que sumar otro proveedor.

### Alternativas consideradas
- **OpenAI (GPT):** Tool Use menos confiable en cadenas largas, ecosistema saturado en proyectos junior.
- **Google Gemini:** menos maduro para tool use a la fecha.
- **Modelos open source (Llama, Mistral via Together AI):** más barato pero más overhead, no necesario para MVP.

---

## ADR-003 — Estrategia mixta de modelos AI (Sonnet + Haiku)

**Fecha:** 2026-04-30
**Estado:** ✅ Aceptada

### Contexto
Las features de AI tienen distinta complejidad. Usar Sonnet (caro) para todo desperdicia recursos. Usar Haiku (barato) para todo da calidad insuficiente en tareas complejas.

### Decisión
**Routing por complejidad de tarea:**
- **Sonnet 4.6:** comando natural con tool use (#1), resumen semanal (#2)
- **Haiku 4.5:** auto-clasificación (#4), validación final de duplicados (#3)
- **Voyage AI:** embeddings (#3 etapa de filtrado)

### Consecuencias
✅ Costo 3-5x menor que usando Sonnet para todo.
✅ Demuestra pensamiento de producto (no solo código).
✅ "Implementé model routing" suma puntos en CV.
❌ Más complejidad arquitectónica (router en backend que decide qué modelo).

### Alternativas consideradas
- **Solo Sonnet:** simple pero caro.
- **Solo Haiku:** barato pero falla en feature #1 (tool use complejo).
- **Opus 4.7 para feature #1:** overkill, 5x más caro que Sonnet sin ganancia perceptible.

---

## ADR-004 — Auth propia (sin BaaS)

**Fecha:** 2026-04-30
**Estado:** ✅ Aceptada

### Contexto
Hay que decidir si usar Auth0/Clerk/Supabase Auth o construir autenticación desde cero.

### Decisión
**Auth propia con JWT + refresh tokens.** Email + password, recuperación por email, verificación de email al registrarse.

### Consecuencias
✅ Aprender auth real es de las mejores cosas en CV junior.
✅ Sin dependencia externa de pricing/disponibilidad.
✅ Demuestra entendimiento de seguridad (hashing de passwords, rotación de tokens, etc.).
❌ Más superficie de bugs/seguridad para mantener.
❌ Más tiempo de desarrollo inicial (1-2 semanas vs 1-2 días con BaaS).

### Alternativas consideradas
- **Auth0:** estándar enterprise, pero "no construiste nada" desde perspectiva de CV.
- **Clerk:** muy bonito, mismo problema.
- **Supabase Auth:** convoluciona el proyecto si solo se usa para auth.

---

## ADR-005 — Postgres + pgvector como única base de datos

**Fecha:** 2026-04-30
**Estado:** ✅ Aceptada

### Contexto
Necesitamos almacenar datos relacionales (users, tickets, etc.) y vectores (embeddings de tickets para búsqueda semántica).

### Decisión
**Una sola base de datos Postgres** con la extensión **pgvector** para búsqueda vectorial.

### Consecuencias
✅ Menos infraestructura: una DB en lugar de dos.
✅ Menos costos.
✅ "Implementé búsqueda semántica con pgvector" es muy valorado en CV.
✅ Una sola transacción puede tocar datos relacionales + vectores.
❌ Menos performance que Pinecone/Weaviate a escala enterprise (no relevante para nuestra escala).

### Alternativas consideradas
- **Pinecone (vector DB dedicada):** más performante a escala pero costo y complejidad innecesarios.
- **Weaviate / Qdrant:** mismo problema.
- **Solo Postgres sin pgvector:** búsqueda semántica imposible.

---

## ADR-006 — Redis para Pub/Sub + cache + rate limiting

**Fecha:** 2026-04-30
**Estado:** ✅ Aceptada

### Contexto
Para que WebSockets funcionen con múltiples instancias del backend (escalado horizontal), necesitamos un mensajero entre instancias. También necesitamos cache y rate limiting.

### Decisión
**Redis** para los tres usos: Pub/Sub (Socket.io adapter), cache, y rate limiting.

### Consecuencias
✅ La app puede escalar horizontalmente desde día 1.
✅ Demuestra entendimiento de sistemas distribuidos.
✅ Una sola tecnología cubre 3 necesidades.
❌ Una pieza más que mantener en infra.
❌ Para 1 sola instancia el Pub/Sub es overkill (lo dejamos preparado igual).

### Alternativas consideradas
- **In-memory (no Redis):** funciona con 1 instancia pero rompe el día que escalás.
- **PostgreSQL LISTEN/NOTIFY:** alternativa elegante pero menos performante para WebSocket scaling.

---

## ADR-007 — Fastify en lugar de Express

**Fecha:** 2026-04-30
**Estado:** ✅ Aceptada (provisional, confirmable en Capa 4)

### Contexto
Necesitamos framework HTTP para Node. Express es el clásico, Fastify es el moderno.

### Decisión
**Fastify** para Cadenzy.

### Consecuencias
✅ ~2-3x más rápido que Express en benchmarks.
✅ TypeScript-first (Express requiere @types/express y muchos hacks).
✅ Validación de schema integrada (Zod-friendly).
✅ Plugin system más limpio.
❌ Comunidad más chica (todavía menor que Express).
❌ Menos tutoriales en español para juniors.

### Alternativas consideradas
- **Express:** estándar legacy, pero el proyecto se merece algo más moderno.
- **NestJS:** opinionado, más estructurado, pero overhead innecesario para este alcance.
- **Hono:** muy moderno pero menos maduro para servidor tradicional con WebSockets.

---

## ADR-008 — Nombre del proyecto: Cadenzy

**Fecha:** 2026-04-30
**Estado:** ✅ Aceptada

### Contexto
El nombre original era "Tracker", muy genérico. Necesitábamos un nombre único, disponible (dominio + GitHub + npm), pronunciable en inglés y español, y conceptualmente alineado.

### Decisión
**Cadenzy** — variante moderna de "cadence" (cadencia, ritmo del equipo).

### Consecuencias
✅ Concepto fuerte: cadence = ritmo del equipo, encarna la propuesta del producto.
✅ Disponible: npm libre, GitHub probablemente libre, dominios `.app`/`.dev`/`.io` aparentemente libres.
✅ Único: no hay producto/empresa con este nombre.
✅ Pronunciable en inglés y español.
✅ Sin baggage de marca registrada en software.
❌ Requiere micro-explicación ("variant of cadence") la primera vez.

### Alternativas consideradas
- **Cordada:** semánticamente perfecto (cordada = grupo de escaladores) pero `.com` tomado por fintech chilena. Podría ser confusión.
- **Cortex:** descartado, hay competencia directa muy grande (cortex.io, EngOps).
- **Synto, Cogent, Lumel:** todos tomados por productos AI o software existentes.
- **Tempoly:** segunda opción, descartada por sonar derivado de "Tempo" (time tracking en Jira).

---

## ADR-009 — React 19 en lugar de React 18

**Fecha:** 2026-04-30
**Estado:** ✅ Aceptada
**Reemplaza parcialmente:** ADR-001

### Contexto
ADR-001 estableció "React 18" como framework. Al ejecutar `npm create vite@latest` en abril 2026, Vite generó por default React 19.2.5. Hubo que decidir si forzar a React 18 (fidelidad al plan) o adoptar 19.

### Decisión
**React 19.2** como versión de producción de Cadenzy.

### Consecuencias
✅ Versión madura y default de la herramienta de scaffolding en 2026 — alineado con la industria.
✅ Acceso al hook `use()`, mejor concurrent rendering, y mejoras de hidration.
✅ Todas las libs del stack (TanStack Query, dnd-kit, Tiptap, cmdk, Framer Motion) son compatibles con React 19 desde 2024-2025.
✅ "Construido en React 19" se ve más actual en CV que "React 18".
❌ Algún tutorial viejo de React 18 puede tener leves diferencias (ref como prop, etc.).
❌ Vite 8 también es nuevo, podemos tener bugs de bordes.

### Alternativas consideradas
- **Forzar React 18:** descartado. Elegir activamente una versión vieja para un proyecto nuevo no es defendible en entrevista, y pelearíamos con Vite cada actualización.

## Plantilla para nuevos ADRs

```markdown
## ADR-XXX — [Título]

**Fecha:** YYYY-MM-DD
**Estado:** [Propuesta / Aceptada / Reemplazada por ADR-YYY]

### Contexto
[Qué problema enfrentamos]

### Decisión
[Qué se decidió]

### Consecuencias
✅ [Algo bueno]
❌ [Algo malo]

### Alternativas consideradas
- **Alternativa A:** [por qué se descartó]
```
