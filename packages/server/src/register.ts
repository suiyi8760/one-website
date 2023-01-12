import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import mercurius from 'mercurius'
import AltairFastify from 'altair-fastify-plugin'
import { PrismaClient } from '@prisma/client'
import prismaPlugin from './plugins/prisma'

export interface IGqlContext {
  prisma: PrismaClient
  request: FastifyRequest, 
  reply: FastifyReply
}

export function install(fastify: FastifyInstance) {
  fastify.register(prismaPlugin)
  // mercurius a graphql adapter for fastify
  fastify.register(mercurius, {
    // schema,
    path: '/graphql',
    graphiql: false,
    context: (request: FastifyRequest, reply: FastifyReply) => {
      return {
        prisma: fastify.prisma,
        request,
        reply,
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