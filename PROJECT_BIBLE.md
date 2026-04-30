# Cadenzy — Project Bible

> **Documento vivo.** Última actualización: 30 de abril de 2026.
> Este documento es la fuente de verdad del proyecto. Cualquier decisión que no esté acá, no es decisión.

---

## Tabla de contenidos

1. [Resumen ejecutivo](#1-resumen-ejecutivo)
2. [Objetivos del proyecto](#2-objetivos-del-proyecto)
3. [Análisis competitivo](#3-análisis-competitivo)
4. [Capa 1 — Dominio](#capa-1--dominio)
5. [Capa 2 — Producto (MVP)](#capa-2--producto-mvp)
6. [Capa 3 — Arquitectura (en progreso)](#capa-3--arquitectura-en-progreso)
7. [Stack tecnológico](#stack-tecnológico)
8. [Decisiones pendientes](#decisiones-pendientes)
9. [Roadmap de capas](#roadmap-de-capas)

---

## 1. Resumen ejecutivo

**Cadenzy** es una herramienta de project management para equipos de software, donde múltiples personas pueden gestionar tickets en tiempo real, con el pulido y velocidad de Linear, y donde la AI **ejecuta el trabajo** en lugar de solo sugerirlo.

### Origen del nombre

"Cadenzy" es una variante moderna de *cadence* (cadencia) — el ritmo que un equipo encuentra cuando trabaja en sincronía. Como en música, cada miembro contribuye un beat — juntos hacen la cadencia.

### Frase de producto (la que va al CV / LinkedIn / README)

> **Cadenzy is an AI-native PM tool where the AI executes work, not just suggests it. Speak — the AI acts — your team sees it in real-time.**

### Por qué este proyecto

Este es un proyecto de portfolio orientado a demostrar capacidades de desarrollo full-stack moderno (con foco frontend) e integración AI nativa. **No tiene objetivo comercial**: el éxito se mide en impacto en CV y oportunidades laborales, no en facturación.

### El "wow moment"

> Pestaña 1 (usuario A): abre command palette (`⌘K`), escribe en lenguaje natural *"creá un sprint para implementar OAuth con Google: research, backend, frontend, tests. Asignámelos a mí, prioridad alta"*.
>
> Pestaña 2 (usuario B): ve cómo aparecen los 4 tickets en el tablero **uno tras otro**, animados, en tiempo real, con el avatar del bot AI indicando quién los creó.

---

## 2. Objetivos del proyecto

### Objetivos primarios

- Construir un proyecto que demuestre nivel **mid-junior técnico** (no junior promedio).
- Posicionar al desarrollador como **frontend Jr con visión fullstack**, con experiencia AI-native.
- Tener un proyecto deployado, terminado, demoable en entrevistas y compartible en LinkedIn.

### Objetivos secundarios

- Profundizar React de forma seria (más allá de "saber hooks").
- Aprender integración con AI APIs (Anthropic SDK, Tool Use, embeddings, streaming).
- Aprender backend serio desde cero (Node + Postgres + Redis + WebSockets + auth propia).
- Aprender testing, CI/CD, deploys reales.

### No-objetivos (lo que NO buscamos)

- Generar revenue ni adquirir usuarios reales.
- Competir con Linear/Jira/Asana en cantidad de features.
- Reemplazar a un PM tool comercial en uso real.

---

## 3. Análisis competitivo

### Panorama 2026

| Tool | Posicionamiento | Fortaleza | Debilidad |
|---|---|---|---|
| **Linear** | Equipos software modernos | UX impecable, atajos, velocidad, opinionado | Solo devs, poco flexible |
| **Jira** | Enterprise grande | Power tool, integraciones masivas | Complejo, lento, "odiado" por usuarios |
| **Asana** | Cross-funcional | Flexibilidad, AI integrada | No optimizado para devs |
| **Trello** | Equipos chicos | Simplicidad, curva 0 | Estancado, no escala |
| **Notion** | Docs + tareas livianas | Flexibilidad extrema | Hay que armarlo todo manualmente |

### Posicionamiento de Cadenzy

**Cadenzy se inspira en Linear** (UX y velocidad) y **Trello** (modelo Kanban visual), pero es un proyecto educativo open-source que demuestra cómo se implementa colaboración en tiempo real, multi-tenant, RBAC y AI nativa **desde cero, sin depender de servicios BaaS**.

### Lo que Cadenzy hace que la competencia NO hace bien

1. **Tiempo real real** (WebSockets puros, no polling con delay como Trello/Asana).
2. **Open source y auto-hosteable** (vs Linear/Jira/Asana cerrados).
3. **AI nativa con tool use real** (no "AI pegada" como la mayoría hace en 2026).
4. **Construido desde cero, sin BaaS** (auth propia, WebSockets propios, todo).

### Lo que NO compite con la competencia

- ❌ NO compite con Jira en cantidad de features.
- ❌ NO compite con Linear en pulido visual (tienen un equipo de diseño top).
- ❌ NO compite con Asana en flexibilidad cross-funcional.
- ✅ **SÍ compite en demostrar que un dev solo puede construir el corazón técnico de estos productos.**

### Referencias técnicas (open source para inspirarse, NO copiar)

- [Plane.so](https://plane.so) — open source PM, tipo Linear/Jira.
- [Huly.io](https://huly.io) — todo-en-uno open source.
- [Cal.com](https://cal.com) — referencia de cómo se ve un proyecto SaaS open source profesional.

---

## Capa 1 — Dominio

### Usuario objetivo

**Equipos de desarrollo de software** de 3-15 personas. Tomadores de decisión: desarrolladores, tech leads, product managers que prefieren herramientas opinionadas sobre tools genéricos.

**No es para:** equipos de marketing, ventas, agencias creativas, ni consumidores finales.

### Dolor que resuelve

- Equipos que sienten que Jira es demasiado pesado y Trello demasiado simple.
- Equipos que valoran velocidad y atajos de teclado.
- Equipos curiosos por AI integrada de forma útil (no como gimmick).

### Decisión de alcance

Dado que el proyecto es para portfolio (no para vender), **el dominio es decoración**. Lo que importa es la calidad técnica del producto.

---

## Capa 2 — Producto (MVP)

### Las 11 capacidades del MVP

#### Producto base

**1. Workspaces multi-tenant**
Un usuario puede pertenecer a múltiples workspaces. Cada workspace es aislado.

**2. Roles y permisos (RBAC)**
Admin (todo), Member (crea/edita), Viewer (solo lee). Permisos chequeados en backend.

**3. Proyectos y tickets**
Cada workspace tiene proyectos. Cada proyecto tiene tickets con: título, descripción rica (markdown/editor), estado (backlog/todo/in progress/done/cancelled), prioridad, asignado, etiquetas, fecha límite, comentarios.

**4. Tablero Kanban con drag-and-drop optimista**
Vista por estado. Optimistic UI: el ticket se mueve antes de que el server confirme; si falla, vuelve atrás.

**5. Tiempo real (WebSockets)**
Sincronización entre usuarios con presencia (avatares de quienes están viendo el mismo proyecto ahora).

**6. Atajos de teclado y command palette (⌘K)**
Búsqueda y comandos. Atajos: C para crear ticket, E para editar, etc.

**7. Autenticación propia**
Email + password, JWT + refresh tokens, recuperación de password por email, verificación de email. **NO se usan Auth0/Supabase Auth/Clerk.**

#### Capa AI nativa

**8. Comando natural con Tool Use (feature estrella)**
Modelo: Claude Sonnet 4.6.
La AI ejecuta acciones reales en lenguaje natural:
- *"Creá 3 tickets para OAuth: research, backend, frontend, prioridad alta"* → la AI llama a `createTicket` 3 veces.
- *"Movéme todos los tickets de Juan a Pedro"* → bulk action.

**9. Resumen semanal del workspace**
Modelo: Claude Sonnet 4.6.
Brief inteligente del estado del workspace.

**10. Detección de duplicados con embeddings**
Modelos: Voyage AI + pgvector + Haiku 4.5.
Compara semánticamente con tickets existentes mientras escribís.

**11. Auto-clasificación al crear ticket**
Modelo: Claude Haiku 4.5.
Sugiere prioridad, etiquetas, descripción mejorada, asignados.

### Lo que NO hace el MVP

- ❌ Vista timeline/Gantt
- ❌ Sub-tareas
- ❌ Adjuntos/archivos
- ❌ Notificaciones por email
- ❌ Integraciones (Slack, GitHub)
- ❌ Time tracking
- ❌ Reportes/analytics avanzados
- ❌ Mobile app nativa (responsive básico sí)
- ❌ Modo oscuro (decisión pendiente)
- ❌ Onboarding interactivo
- ❌ Billing / planes pagos
- ❌ OAuth con Google/GitHub
- ❌ Generación de imágenes / DALL-E / voice / Whisper
- ❌ AI que escribe código
- ❌ Modelos locales / Ollama

### Criterios de "terminado"

El proyecto está listo para portfolio cuando cumple TODO esto:

1. ☐ Está deployado y se puede usar en vivo.
2. ☐ Tiene un dominio propio (no `*.vercel.app`).
3. ☐ Tiene una landing page de aterrizaje.
4. ☐ README profesional con capturas, GIF demo, decisiones técnicas.
5. ☐ Cobertura de tests >70% en backend, >60% en frontend.
6. ☐ CI/CD funcionando.
7. ☐ Sin errores en consola, sin warnings de React.
8. ☐ Lighthouse >90 en performance y accesibilidad.
9. ☐ Funciona con 2-3 usuarios simultáneos sin lag.
10. ☐ Hay seed data: el visitante puede entrar con un usuario demo.

---

## Capa 3 — Arquitectura (en progreso)

### 3.1 — El sistema completo en una vista

Cadenzy es un sistema distribuido con 6 grandes piezas:

```
┌─────────────────────────────────────────────────────────────────┐
│                        USUARIO (browser)                         │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS / WSS
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  ① FRONTEND (React + Vite)                                      │
│     └─ Vercel / Netlify                                          │
│     └─ cadenzy.app  (dominio propio)                             │
└────────┬──────────────────────────────────────┬─────────────────┘
         │ REST                                 │ WebSocket
         ▼                                      ▼
┌─────────────────────────────────────────────────────────────────┐
│  ② BACKEND API (Node + Fastify)                                 │
│     └─ Railway / Render                                          │
│     └─ api.cadenzy.app                                           │
│                                                                  │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────────┐  │
│  │  Auth      │ │  REST API  │ │ WebSocket  │ │  AI Module   │  │
│  │  (JWT)     │ │  (CRUD)    │ │  (Socket)  │ │  (Anthropic) │  │
│  └────────────┘ └────────────┘ └────────────┘ └──────────────┘  │
└────────┬──────────────────────────┬─────────────────┬───────────┘
         ▼                          ▼                 ▼
┌─────────────────────┐ ┌─────────────────────┐ ┌──────────────────┐
│ ③ POSTGRES          │ │ ④ REDIS             │ │ ⑤ ANTHROPIC API  │
│   + pgvector        │ │   - Pub/Sub WS      │ │   - Sonnet 4.6   │
│   - Datos           │ │   - Cache           │ │   - Haiku 4.5    │
│   - Embeddings      │ │   - Rate limiting   │ │   - Tool Use     │
└─────────────────────┘ └─────────────────────┘ └──────────────────┘
                                                          │
                                                          ▼
                                              ┌──────────────────┐
                                              │  ⑥ VOYAGE AI     │
                                              │   - Embeddings   │
                                              └──────────────────┘
```

#### ① Frontend
Renderiza UI, drag-and-drop, escucha WebSockets, hace fetch. Vive en Vercel/Netlify. **No toca DB ni Anthropic directamente** (security).

#### ② Backend API
Recibe requests, verifica JWT, verifica permisos, lee/escribe Postgres, cachea en Redis, mantiene WebSockets, llama a Anthropic. Vive en Railway/Render (necesita servidor "siempre encendido" para WebSockets).

#### ③ Postgres + pgvector
Almacena permanentemente todo: usuarios, workspaces, proyectos, tickets, comentarios, embeddings.

#### ④ Redis
Tres usos: Pub/Sub para WebSockets multi-instancia, cache, rate limiting.

#### ⑤ Anthropic API
Procesa las 4 features AI. Servicio externo con costos.

#### ⑥ Voyage AI
Embeddings para búsqueda semántica.

### Flujo de vida — caso real

**Usuario A arrastra un ticket de "Todo" a "In Progress":**

1. Frontend (React): detecta drag-end. Optimistic UI — actualiza estado local inmediatamente.
2. Frontend → Backend: `PATCH /tickets/:id { status: 'in_progress' }`.
3. Backend: verifica JWT → verifica permiso → `UPDATE tickets` → publica evento en Redis → `200 OK`.
4. Redis Pub/Sub: evento llega a todas las instancias del backend.
5. WebSocket: transmite a clientes conectados al workspace (excepto al originador).
6. Frontend del Usuario B: recibe evento, actualiza estado, ticket se mueve solo.

**Tiempo total: ~50-150ms.** Si falla el paso 3, el frontend de A revierte el movimiento.

### 3.2 — Frontend interno

> ⏳ **Pendiente.** Próxima sesión.

### 3.3 — Backend interno

> ⏳ **Pendiente.** Próxima sesión.

### 3.4 — Comunicación entre piezas

> ⏳ **Pendiente.** Próxima sesión.

### 3.5 — Decisiones críticas y por qué

> ⏳ **Pendiente.** Próxima sesión.

---

## Stack tecnológico

### Frontend

| Categoría | Decisión | Por qué |
|---|---|---|
| Framework | React 18 + Vite | Mercado dominante, mejores libs, ya conocido |
| Lenguaje | TypeScript estricto | Sin `any`, genéricos donde corresponda |
| Estado server | TanStack Query | Estándar de oro 2026 |
| Estado cliente | Zustand | Liviano, sin boilerplate |
| Estilos | Tailwind CSS | A confirmar en Capa 4 |
| Drag & drop | dnd-kit | Estándar de oro |
| Editor rico | Tiptap | Lo que usa Notion |
| Command palette | cmdk (Vercel) | Estándar |
| Animaciones | Framer Motion | Cuando se justifique |
| Testing | Vitest + RTL + Playwright | — |

### Backend

| Categoría | Decisión | Por qué |
|---|---|---|
| Runtime | Node.js | Stack JS unificado |
| Framework | Fastify | Más rápido que Express, TS-first |
| Lenguaje | TypeScript estricto | — |
| ORM | Prisma | Estándar moderno, type-safe |
| DB | PostgreSQL + pgvector | Una sola DB |
| Cache / Pub-Sub | Redis | Necesario para WebSocket scaling |
| WebSockets | Socket.io | Maduro, fallbacks |
| Auth | Custom (JWT + refresh) | NO BaaS |
| Validación | Zod | Tipos compartidos FE↔BE |
| Background jobs | BullMQ | Tareas async (embeddings, emails) |
| Testing | Vitest + Supertest | — |

### AI

| Categoría | Decisión | Por qué |
|---|---|---|
| Proveedor LLM | Anthropic | Mejor tool use, output XML, diferenciación CV |
| Modelo principal | Claude Sonnet 4.6 ($3/M in · $15/M out) | Caballo de batalla |
| Modelo barato | Claude Haiku 4.5 ($1/M in · $5/M out) | Clasificación y validación |
| Embeddings | Voyage AI (`voyage-3`) | Partner de Anthropic, ~$0.06/M |
| Vector store | pgvector | Sin DB extra |
| Optimizaciones | Prompt caching (90% off), streaming, model routing | — |

### Infra y deploy

| Categoría | Decisión | Por qué |
|---|---|---|
| Frontend hosting | Vercel | CDN global, free tier |
| Backend hosting | Railway | Soporta WebSockets, Postgres y Redis incluidos |
| CI/CD | GitHub Actions | Estándar |
| Observabilidad | Logs estructurados + Sentry | — |
| Dominio | `cadenzy.app` o `cadenzy.dev` (~$15-20/año) | Profesional para portfolio |

### Costos estimados

- Desarrollo: $5-15 USD/mes en APIs Anthropic.
- Demo público: $10-30 USD/mes.
- Anthropic: $5 USD de crédito al crear cuenta.
- Hosting: free tier inicial, ~$5-10 USD/mes después.
- Dominio: ~$15-20 USD/año.

**Inversión total estimada para el MVP: ~$50-100 USD.**

---

## Decisiones pendientes

| # | Decisión | Estado |
|---|---|---|
| 1 | Modo oscuro: ¿día 1 o v2? | Abierta |
| 2 | Sistema de estilos: Tailwind vs CSS Modules | Pendiente Capa 4 |
| 3 | Hosting backend: Railway vs Render vs Fly.io | Pendiente Capa 4 |
| 4 | Provider Postgres: Railway/Supabase/Neon | Pendiente Capa 4 |
| 5 | Estructura monorepo (Turborepo) vs polyrepo | Pendiente Capa 4 |

---

## Roadmap de capas

| Capa | Descripción | Estado |
|---|---|---|
| 1 | Dominio (problema, usuario) | ✅ Completa |
| 2 | Producto (MVP, qué SÍ y qué NO) | ✅ Completa |
| 3 | Arquitectura | 🚧 En progreso (3.1 lista, faltan 3.2-3.5) |
| 4 | Stack detallado y razones de cada elección | ⏳ Pendiente |
| 5 | Modelo de datos (entidades, relaciones, schema Prisma) | ⏳ Pendiente |
| 6 | Roadmap de construcción semana a semana | ⏳ Pendiente |
| 7 | Código (recién acá se empieza a programar) | ⏳ Pendiente |

---

**Siguiente paso:** Capa 3.2 — Frontend interno.
