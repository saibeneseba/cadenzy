# GETTING_STARTED.md — Cómo arrancar Cadenzy hoy

> Esta guía te lleva de **cero a "tengo el repo listo y la estructura base"** en una sesión de 2-3 horas.
> NO vamos a codear features todavía. Estamos preparando el terreno bien.

---

## Antes de empezar

### Lo que necesitás instalado

Verificá que tenés:

```bash
node --version    # Ideal: v20+ (mínimo v18)
npm --version     # Ideal: v10+
git --version     # Cualquier versión moderna
```

Si no tenés Node 20+, instalalo desde [nodejs.org](https://nodejs.org).

### Cuentas que vas a necesitar

Estas las podés crear ahora o cuando sea necesario:

- ✅ **GitHub** (ya tenés: `saibeneseba`)
- ⏳ **Anthropic** ([console.anthropic.com](https://console.anthropic.com)) — para API key, $5 USD de crédito gratis al registrarte
- ⏳ **Voyage AI** ([voyageai.com](https://www.voyageai.com)) — para embeddings, free tier generoso
- ⏳ **Vercel** ([vercel.com](https://vercel.com)) — para deploy frontend, free tier
- ⏳ **Railway** ([railway.app](https://railway.app)) — para deploy backend + Postgres + Redis
- ⏳ **Sentry** ([sentry.io](https://sentry.io)) — error tracking, free tier

**Hoy solo necesitás GitHub.** El resto se irá creando cuando toquen.

---

## Paso 1 — Crear el repo en GitHub (5 min)

### 1.1 Crear la organización (recomendado)

Tener una org es más profesional que un repo bajo tu user. Es gratis.

1. Andá a https://github.com/organizations/new
2. Plan: **Free**
3. Organization name: `cadenzy`
4. Contact email: el tuyo
5. This organization belongs to: **My personal account**

> ⚠️ Si "cadenzy" no está disponible como org, probá `cadenzy-app` o usá tu user `saibeneseba` directamente. Verificalo entrando a `https://github.com/cadenzy` — si da 404, está libre.

### 1.2 Crear el repo

1. Dentro de la org (o tu user), https://github.com/new
2. Repository name: `cadenzy`
3. Description: `AI-native project management where the AI executes work, not just suggests it.`
4. Public ✅
5. Add a README file ✅ (vamos a reemplazarlo después)
6. Add .gitignore: **Node**
7. License: **MIT**
8. Click **Create repository**

### 1.3 Clonar el repo localmente

```bash
cd ~/Projects   # o donde guardes tus proyectos
git clone https://github.com/cadenzy/cadenzy.git
cd cadenzy
```

---

## Paso 2 — Estructura inicial del repo (15 min)

### 2.1 Decidir: monorepo vs polyrepo

Te recomiendo **monorepo** desde el inicio. Es lo que usan todos los proyectos modernos serios (Vercel, Linear, Plane, Cal.com). Razones:

- Frontend y backend comparten tipos TypeScript (Zod schemas, types de la API).
- Un solo `git clone`, un solo CI/CD.
- Más fácil de presentar.

Vamos a usar **npm workspaces** (no necesitás Turborepo todavía, podés sumarlo después).

### 2.2 Estructura de carpetas

Adentro de `cadenzy/`, creá esta estructura:

```
cadenzy/
├── apps/
│   ├── web/              # Frontend React + Vite
│   └── api/              # Backend Node + Fastify
├── packages/
│   ├── shared/           # Types, schemas Zod compartidos
│   └── ui/               # Componentes UI compartidos (futuro)
├── docs/                 # Toda la documentación del proyecto
├── .github/
│   └── workflows/        # GitHub Actions (CI/CD)
├── .gitignore
├── .nvmrc                # Versión de Node
├── package.json          # Workspaces config
├── README.md             # El que ven los visitantes
├── PROJECT_BIBLE.md      # Doc maestro
├── DECISIONS.md          # ADRs
├── GETTING_STARTED.md    # Este archivo
├── GLOSSARY.md           # Glosario técnico
└── LICENSE
```

Comandos para crearla rápido:

```bash
mkdir -p apps/{web,api} packages/{shared,ui} docs .github/workflows
touch .nvmrc
echo "20" > .nvmrc
```

### 2.3 Configurar npm workspaces

Reemplazá el contenido de `package.json` (en la raíz) con:

```json
{
  "name": "cadenzy",
  "version": "0.0.1",
  "private": true,
  "description": "AI-native project management",
  "license": "MIT",
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev:web": "npm run dev --workspace=apps/web",
    "dev:api": "npm run dev --workspace=apps/api",
    "build": "npm run build --workspaces --if-present",
    "test": "npm run test --workspaces --if-present",
    "lint": "npm run lint --workspaces --if-present"
  },
  "engines": {
    "node": ">=20.0.0"
  }
}
```

---

## Paso 3 — Sumar la documentación (10 min)

Los archivos que te generé van en la raíz del repo:

```bash
# Asumiendo que descargaste los .md a tu carpeta Downloads
cp ~/Downloads/README.md .
cp ~/Downloads/PROJECT_BIBLE.md .
cp ~/Downloads/DECISIONS.md .
cp ~/Downloads/GETTING_STARTED.md .
cp ~/Downloads/GLOSSARY.md .
```

Después:

```bash
git add .
git commit -m "docs: initial project documentation"
git push
```

Andá a tu repo en GitHub. Ya se ve profesional.

---

## Paso 4 — Setup del frontend (apps/web) (30 min)

### 4.1 Crear el proyecto Vite + React + TS

```bash
cd apps/web
npm create vite@latest . -- --template react-ts
```

Te va a preguntar si querés sobreescribir. Decí que sí.

### 4.2 Limpiar el boilerplate

Borrá:
- `src/App.css`
- `src/assets/react.svg`
- Todo el contenido de `src/App.tsx` excepto el componente vacío

Reemplazá `src/App.tsx` con algo mínimo:

```tsx
function App() {
  return (
    <div>
      <h1>Cadenzy</h1>
      <p>The team that finds its cadence ships faster.</p>
    </div>
  )
}

export default App
```

### 4.3 TypeScript estricto desde día 1

En `apps/web/tsconfig.json`, asegurate de tener:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noPropertyAccessFromIndexSignature": false
  }
}
```

### 4.4 Verificar que corre

```bash
cd apps/web
npm install
npm run dev
```

Abrí http://localhost:5173. Tenés que ver "Cadenzy" en pantalla.

---

## Paso 5 — Setup del backend (apps/api) (45 min)

### 5.1 Inicializar el proyecto

```bash
cd apps/api
npm init -y
```

### 5.2 Instalar deps base

```bash
npm install fastify @fastify/cors @fastify/helmet zod
npm install -D typescript @types/node tsx vitest
```

### 5.3 Configurar TypeScript

Crear `apps/api/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"]
}
```

### 5.4 Server mínimo

Crear `apps/api/src/server.ts`:

```ts
import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'

const fastify = Fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty'
    }
  }
})

await fastify.register(helmet)
await fastify.register(cors, { origin: true })

fastify.get('/health', async () => {
  return { status: 'ok', service: 'cadenzy-api', timestamp: new Date().toISOString() }
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
    fastify.log.info('🎵 Cadenzy API running on http://localhost:3000')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
```

Instalar también `pino-pretty` para logs lindos:

```bash
npm install -D pino-pretty
```

### 5.5 Scripts en package.json

En `apps/api/package.json` agregá:

```json
{
  "name": "@cadenzy/api",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "vitest"
  }
}
```

### 5.6 Verificar que corre

```bash
cd apps/api
npm run dev
```

En otra terminal:

```bash
curl http://localhost:3000/health
```

Tenés que ver: `{"status":"ok","service":"cadenzy-api",...}`

---

## Paso 6 — Setup del shared package (15 min)

Acá van los tipos TypeScript que comparten frontend y backend (schemas Zod, tipos de API, etc.).

```bash
cd packages/shared
npm init -y
```

Editar `packages/shared/package.json`:

```json
{
  "name": "@cadenzy/shared",
  "version": "0.0.1",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "type": "module",
  "scripts": {
    "build": "tsc"
  },
  "dependencies": {
    "zod": "^3.23.0"
  }
}
```

Crear `packages/shared/src/index.ts`:

```ts
// Cadenzy shared types and schemas
export const VERSION = '0.0.1'

// Acá iremos sumando schemas Zod compartidos cuando los necesitemos.
```

```bash
npm install
```

---

## Paso 7 — Commit final del setup (5 min)

```bash
cd ~/Projects/cadenzy
git add .
git commit -m "chore: initial monorepo setup with web, api, shared packages"
git push
```

---

## ¡Listo! ¿Qué tenés ahora?

Después de seguir todos los pasos, tenés:

- ✅ Repo en GitHub con docs profesionales
- ✅ Monorepo con `apps/web`, `apps/api`, `packages/shared`
- ✅ Frontend React + Vite + TypeScript estricto corriendo en `:5173`
- ✅ Backend Fastify + TypeScript con health check corriendo en `:3000`
- ✅ Estructura preparada para sumar features sin reorganizar después

---

## ¿Qué NO hicimos hoy?

A propósito, dejamos para sesiones futuras (en orden):

1. **Capa 3.2-3.5:** terminar arquitectura (frontend interno, backend interno, comunicación, decisiones)
2. **Capa 4:** stack detallado y confirmar decisiones pendientes
3. **Capa 5:** modelo de datos (schema Prisma completo)
4. **Setup de Postgres + Prisma + Redis** (en Capa 5)
5. **Setup de Tailwind + shadcn-style components** (en Capa 4)
6. **Auth desde cero** (primer feature técnico real)
7. **CI/CD con GitHub Actions** (después del primer feature)

---

## Si te trabás

- **El proyecto no compila:** revisá versión de Node con `node --version` (debe ser >= 20).
- **Vite no arranca:** borrá `node_modules` y reinstalá: `rm -rf node_modules package-lock.json && npm install`.
- **Workspaces no encuentra los paquetes:** correr `npm install` desde la raíz del repo, no desde adentro de un workspace.

---

> *"La parte aburrida del setup es la inversión más barata que vas a hacer. Cuanto mejor está armado, más fácil va a ser sumar features sin pelearte con la infraestructura."*
