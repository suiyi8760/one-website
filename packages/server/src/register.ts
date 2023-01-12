import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import mercurius from 'mercurius'
import AltairFastify from 'altair-fastify-plugin'
import { PrismaClient } from '@prisma/client'
import { now } from './utils/now'
import { mercuriusPlugin, prismaPlugin } from './plugins'

export interface IGqlContext {
  prisma: PrismaClient
  request: FastifyRequest,
  reply: FastifyReply,
  now: typeof now
}

export function install(fastify: FastifyInstance) {
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