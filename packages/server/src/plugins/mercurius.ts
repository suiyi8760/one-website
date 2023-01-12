import fp from 'fastify-plugin'
import mercurius from 'mercurius'
import codegenMercurius, { CodegenMercuriusOptions, loadSchemaFiles } from 'mercurius-codegen'
import { buildSchema } from 'graphql'
import { resolvers } from '../schema/resolvers'
import { PrismaClient } from '@prisma/client'
import { FastifyRequest, FastifyReply } from 'fastify'
import { now } from '../utils/now'
import path from 'path'

export interface IGqlContext {
  prisma: PrismaClient
  request: FastifyRequest,
  reply: FastifyReply,
  now: typeof now
}

declare module 'mercurius' {
  interface MercuriusContext
    extends IGqlContext { }
}

const codegenMercuriusOptions: CodegenMercuriusOptions = {
  targetPath: path.join(__dirname, '../schema/generated.ts'),
  operationsGlob: path.join(__dirname, '../schema/operations/*.gql'),
  watchOptions: {
    enabled: process.env.NODE_ENV === 'development',
  },
}

export const mercuriusPlugin = fp(async (server, options) => {
  const { schema } = loadSchemaFiles(path.join(__dirname, '../schema/**/*.gql'), {
    watchOptions: {
      enabled: process.env.NODE_ENV === 'development',
      onChange(schema) {
        server.graphql.replaceSchema(buildSchema(schema.join('\n')))
        server.graphql.defineResolvers(resolvers)

        codegenMercurius(server, codegenMercuriusOptions).catch(console.error)
      },
    },
  })

  server.register(mercurius, {
    schema,
    resolvers,
    path: '/graphql',
    graphiql: false,
    context: (request: FastifyRequest, reply: FastifyReply): IGqlContext => {
      return {
        prisma: server.prisma,
        request,
        reply,
        now
      }
    },
  })

  codegenMercurius(server, codegenMercuriusOptions).catch(console.error)
})