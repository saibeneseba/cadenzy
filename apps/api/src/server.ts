import { buildApp } from './app.js'
import { env } from './config/env.js'

/**
 * Starts the HTTP server.
 *
 * Handles graceful shutdown on SIGINT / SIGTERM so in-flight
 * requests get to finish and we close the logger cleanly.
 */
async function start(): Promise<void> {
  const app = await buildApp()

  try {
    await app.listen({ port: env.PORT, host: env.HOST })
    app.log.info(
      `🎵 Cadenzy API listening on http://${env.HOST}:${env.PORT} (${env.NODE_ENV})`,
    )
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }

  const shutdown = async (signal: string): Promise<void> => {
    app.log.info(`Received ${signal}, closing server gracefully...`)
    try {
      await app.close()
      process.exit(0)
    } catch (err) {
      app.log.error(err, 'Error during shutdown')
      process.exit(1)
    }
  }

  process.on('SIGINT', () => void shutdown('SIGINT'))
  process.on('SIGTERM', () => void shutdown('SIGTERM'))
}

start()
