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
    console.log(`\
  🚀 Server ready at: http://localhost:3000/graphiql
  ⭐️ Graphql client running at: http://localhost:3000/altair
  `)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()