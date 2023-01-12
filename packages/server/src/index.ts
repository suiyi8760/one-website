import Fastify from 'fastify'
import { install } from './register'
const fastify = Fastify({
  logger: true
})

install(fastify)

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()