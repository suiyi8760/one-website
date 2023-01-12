import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import mercurius from 'mercurius'
import AltairFastify from 'altair-fastify-plugin'
import { PrismaClient } from '@prisma/client'
import prismaPlugin from './plugins/prisma'
import { resolvers, schema } from './schema'
import { now } from './utils/now'

export interface IGqlContext {
  prisma: PrismaClient
  request: FastifyRequest,
  reply: FastifyReply,
  now: typeof now
}

export function install(fastify: FastifyInstance) {
  fastify.register(prismaPlugin)
  // mercurius a graphql adapter for fastify
  fastify.register(mercurius, {
    schema,
    resolvers,
    path: '/graphql',
    graphiql: false,
    context: (request: FastifyRequest, reply: FastifyReply): IGqlContext => {
      return {
        prisma: fastify.prisma,
        request,
        reply,
        now
      }
    },
  })
  // a graphql debugger client https://altairgraphql.dev/
  fastify.register(AltairFastify, {
    path: '/altair',
    baseURL: '/altair/',
    // 'endpointURL' should be the same as the mercurius 'path'
    endpointURL: '/graphql'
  })
}