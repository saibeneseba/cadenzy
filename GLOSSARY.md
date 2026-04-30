# GLOSSARY.md — Glosario técnico de Cadenzy

> Términos técnicos que aparecen en el proyecto, explicados para que no quede ningún concepto suelto.
> Si encontrás un término en cualquier doc del proyecto que no entendés del todo, vení a buscarlo acá.

---

## A

### ADR (Architecture Decision Record)
Documento corto que registra una decisión arquitectónica importante: contexto, decisión, consecuencias y alternativas. Vivimos en `DECISIONS.md`.

### Agentic AI
AI que **ejecuta acciones** en lugar de solo responder texto. Cadenzy usa AI agéntica vía Tool Use de Anthropic.

---

## B

### BaaS (Backend-as-a-Service)
Servicios como Supabase, Firebase, Auth0, Clerk que proveen backend "listo". Cadenzy NO usa BaaS para auth ni datos core (ver ADR-004).

### BullMQ
Librería de Node.js para manejar colas de jobs en background, montada sobre Redis. La usamos para tareas asíncronas como calcular embeddings de tickets sin bloquear el API.

---

## C

### Cadence
Cadencia. Ritmo. En música, el patrón de tiempos; en militar, el paso del equipo en formación. Es el origen del nombre del proyecto.

### CI/CD (Continuous Integration / Continuous Deployment)
Pipeline automatizado que corre tests cada vez que pusheás código y deploya automáticamente cuando pasa. Lo implementaremos con GitHub Actions.

### Command Palette
Modal que se abre con `⌘K` (Mac) o `Ctrl+K` (Windows/Linux) y permite buscar/ejecutar comandos rápido. Lo popularizó Notion/Linear/VS Code.

### CRDT (Conflict-free Replicated Data Type)
Estructuras de datos para edición colaborativa offline con resolución automática de conflictos. **No** lo usamos en el MVP de Cadenzy, sería para una eventual feature offline-first.

### CRUD
Create, Read, Update, Delete. Las 4 operaciones básicas sobre datos.

---

## D

### dnd-kit
Librería moderna de React para drag-and-drop. Estándar de oro 2026, reemplazo de `react-beautiful-dnd` (deprecado).

---

## E

### Embeddings
Representación numérica (vectorial) de un texto. Permite búsqueda semántica: encontrar cosas "parecidas" en significado, no solo idénticas en texto. Cadenzy los usa para detectar tickets duplicados.

---

## F

### Fastify
Framework HTTP para Node.js. Más rápido y moderno que Express. Lo usamos en `apps/api` (ver ADR-007).

### Function Calling
Ver Tool Use.

---

## G

### GDPR / LGPD / Ley 25.326
Regulaciones de protección de datos (Europa, Brasil, Argentina respectivamente). No son foco del MVP pero las menciono porque cualquier app con auth real las debe considerar.

---

## H

### Helmet
Plugin de Fastify (también para Express) que setea headers HTTP de seguridad por defecto. Mitigación básica contra varios ataques.

---

## J

### JWT (JSON Web Token)
Token firmado que prueba autenticación del usuario. Tiene 3 partes (header.payload.signature) en base64. **No** está cifrado por defecto, solo firmado — no metas secrets adentro.

### JWT Refresh Token vs Access Token
- **Access Token:** corto (ej. 15 min). Lo mandás en cada request.
- **Refresh Token:** largo (ej. 7-30 días). Lo usás solo para pedir un nuevo Access Token cuando expira.

Esta separación permite expirar sesiones rápido sin pedirle al user que se loguee constantemente.

---

## M

### Monorepo
Repositorio que contiene múltiples proyectos (frontend, backend, packages compartidos). Cadenzy es monorepo con `apps/web`, `apps/api`, `packages/shared`.

### Multi-tenant
Sistema donde múltiples "inquilinos" (workspaces, organizaciones, equipos) coexisten aislados en la misma infraestructura. Cada workspace en Cadenzy es un tenant.

---

## O

### Optimistic UI
Patrón donde la UI cambia **inmediatamente** cuando el usuario actúa, asumiendo que el servidor confirmará. Si el servidor rechaza, se revierte el cambio. Cadenzy lo usa en drag-and-drop del Kanban.

### ORM (Object-Relational Mapping)
Librería que traduce entre objetos de tu lenguaje (TS) y filas de la base de datos (SQL). Cadenzy usa **Prisma** como ORM.

---

## P

### pgvector
Extensión de PostgreSQL para almacenar y buscar vectores (embeddings). Permite búsqueda semántica sin sumar otra base de datos (ver ADR-005).

### Pino / Pino-Pretty
Logger de Node.js (Pino) y formateador legible para desarrollo (Pino-Pretty). Estándar moderno, mucho más rápido que `console.log`.

### Prisma
ORM moderno de TypeScript. Schema declarativo, migraciones automáticas, type-safe queries. Estándar 2026.

### Prompt Caching
Feature de Anthropic API que cachea partes del prompt repetidas (system prompts, contexto largo) y aplica **90% de descuento** en esas partes. Optimización crítica para Cadenzy.

### Pub/Sub (Publish-Subscribe)
Patrón de mensajería donde "publicadores" emiten mensajes a un canal y "suscriptores" los reciben. Redis tiene Pub/Sub built-in y Cadenzy lo usa para sincronizar WebSockets entre instancias.

---

## R

### RBAC (Role-Based Access Control)
Sistema de permisos basado en roles. En Cadenzy: admin / member / viewer.

### Rate Limiting
Limitar cuántas requests puede hacer un user en un período. Crítico para AI features (cada call cuesta plata).

### Redis
Base de datos en memoria, ultrarrápida. La usamos para Pub/Sub, cache y rate limiting (ver ADR-006).

### REST (Representational State Transfer)
Estilo arquitectónico para APIs HTTP. Verbs (GET/POST/PUT/PATCH/DELETE) + URLs jerárquicas. Cadenzy expone REST + WebSocket.

### RxJS
Librería de programación reactiva. Es central en Angular pero **no** la usamos en Cadenzy (usamos React, donde TanStack Query cubre necesidades similares con menor curva).

---

## S

### Schema Validation
Validar que los datos que llegan a tu API tienen la forma esperada. Cadenzy usa **Zod** para esto, en frontend y backend (mismo schema).

### Sentry
Servicio de error tracking. Cuando un user encuentra un bug en producción, Sentry te avisa con stack trace, browser, etc. Usamos free tier.

### Server-Sent Events (SSE)
Protocolo HTTP para streaming server → cliente unidireccional. Más simple que WebSockets cuando solo necesitás push del server. Lo usamos para streaming de respuestas AI.

### Socket.io
Librería para WebSockets con fallbacks (long-polling) si WS falla. Maduro, soporta múltiples instancias con Redis adapter.

### shadcn/ui
Colección de componentes React + Tailwind copy-paste (no es una librería instalable). Usamos su filosofía.

### SPA (Single Page Application)
App web donde toda la navegación ocurre en JavaScript sin recargar la página. Cadenzy frontend es SPA.

### SSR (Server-Side Rendering)
Renderizar HTML en el servidor antes de mandarlo al browser. **No** lo usamos en Cadenzy MVP (hacemos SPA pura), pero podríamos sumar Next.js si fuera necesario.

---

## T

### TanStack Query (antes React Query)
Librería de React para manejar **server state**: cache, sincronización, mutations, optimistic updates. Estándar 2026.

### Tiptap
Editor de texto rico (rich text editor) basado en ProseMirror. Lo que usa Notion. Lo usamos para descripciones de tickets.

### Tool Use / Function Calling
Capacidad del LLM de invocar funciones/herramientas que el desarrollador define. La AI no responde texto, ejecuta acciones reales. Es el corazón de la feature #1 de Cadenzy.

### Turborepo
Tool para acelerar builds en monorepos cacheando lo que ya se construyó. **No** lo necesitamos al inicio, podemos sumarlo después.

---

## V

### Vector Search
Buscar items por similitud semántica usando embeddings. Diferente a búsqueda por keyword. Cadenzy lo usa con pgvector.

### Vite
Bundler moderno de JS, mucho más rápido que Webpack. Estándar para nuevos proyectos React.

### Voyage AI
Proveedor de modelos de embeddings, partner recomendado de Anthropic. Cadenzy lo usa para embeddings de tickets.

---

## W

### WebSocket / WSS
Protocolo de comunicación bidireccional persistente entre cliente y servidor. Permite que el server "empuje" mensajes al cliente sin que el cliente pregunte. Cadenzy lo usa para tiempo real.

### Workspace (en Cadenzy)
Tenant del sistema. Un user puede pertenecer a varios workspaces. Workspaces no comparten datos entre sí.

### Workspace (en npm)
Sub-proyecto dentro de un monorepo. Cadenzy tiene workspaces: `apps/web`, `apps/api`, `packages/shared`.

---

## Z

### Zod
Librería de validación de schemas en TypeScript con type inference automática. Definís un schema → obtenés el tipo TS gratis. Lo usamos para validar requests/responses en API y formularios en frontend.

### Zustand
Store de estado para React, ultraliviano (~1KB). Sin boilerplate de Redux. Lo usamos para **client state** (lo que TanStack Query no maneja: estado UI, preferencias, etc.).
