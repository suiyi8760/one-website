import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import cors from '@fastify/cors'
import AltairFastify from 'altair-fastify-plugin'
import type { PrismaClient } from '@prisma/client'
import type { now } from './utils/now'
import { mercuriusPlugin, prismaPlugin } from './plugins'

export interface IGqlContext {
  prisma: PrismaClient
  request: FastifyRequest
  reply: FastifyReply
  now: typeof now
}

export function install(fastify: FastifyInstance) {
  // turn on CORS to allows request from cross-origin
  fastify.register(cors, {
    // put your options here
  })
  fastify.register(prismaPlugin)
  fastify.register(mercuriusPlugin)
  // a graphql debugger client https://altairgraphql.dev/
  fastify.register(AltairFastify, {
    path: '/altair',
    baseURL: '/altair/',
    // 'endpointURL' should be the same as the mercurius 'path'
    endpointURL: '/graphql'
  })
}
