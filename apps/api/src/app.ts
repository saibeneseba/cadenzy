import Fastify, { type FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'

import { env } from './config/env.js'
import { healthRoute } from './routes/health.js'

/**
 * Builds and configures a Fastify instance.
 *
 * Kept separate from server.ts (which calls .listen) so tests can
 * import buildApp(), call app.inject({...}), and assert on responses
 * without ever binding to a port.
 */
export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: {
      level: env.LOG_LEVEL,
      // pino-pretty in dev/test for human-readable logs;
      // production keeps raw JSON for log aggregators.
      ...(env.NODE_ENV !== 'production' && {
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:MM:ss.l',
            ignore: 'pid,hostname',
          },
        },
      }),
    },
  })

  // Security headers (CSP, X-Frame-Options, etc.)
  await app.register(helmet, {
    // We'll tighten CSP once we know exactly which origins serve assets.
    contentSecurityPolicy: false,
  })

  // CORS — only allow origins listed in CORS_ORIGINS env var.
  await app.register(cors, {
    origin: env.CORS_ORIGINS,
    credentials: true,
  })

  // Routes
  await app.register(healthRoute)

  return app
}
