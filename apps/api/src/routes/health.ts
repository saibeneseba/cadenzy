import type { FastifyPluginAsync } from 'fastify'

/**
 * Health check endpoint.
 *
 * Used by:
 * - Local devs to confirm the server is up
 * - Hosting platforms (Railway, Render) for liveness probes
 * - CI smoke tests
 *
 * Returns the current timestamp and service identifier.
 * In future iterations we'll extend this to check DB and Redis connectivity.
 */
export const healthRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/health', async () => {
    return {
      status: 'ok',
      service: 'cadenzy-api',
      timestamp: new Date().toISOString(),
    }
  })
}
