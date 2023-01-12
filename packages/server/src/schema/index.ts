import { readFileSync } from 'fs';
import { Resolvers } from '../generated/graphql';

export const schema = readFileSync(__dirname + '/schema.graphql', { encoding: 'utf-8' })

export const resolvers: Resolvers = {
  Query: {
    posts: async (_parent, args, ctx) => {
      return ctx.prisma.post.findMany({
        where: {
          published: true
        }
      })
    },
    drafts: async (_parent, args, ctx) => {
      return ctx.prisma.post.findMany({
        where: {
          published: false
        }
      })
    },
  },
  Mutation: {
    createDraft: async (_parent, args, ctx) => {
      return ctx.prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          createdAt: ctx.now(),
          // 创建的时候创建时间就是修改时间
          updatedAt: ctx.now()
        }
      })
    },
    publish: async (_parent, args, ctx) => {
      return ctx.prisma.post.update({
        where: { id: args.draftId },
        data: { published: true }
      })
    },
  }
}