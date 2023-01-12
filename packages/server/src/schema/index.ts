export const schema = `
type Mutation {
  createDraft(body: String!, title: String!): Post
  publish(draftId: Int!): Post
}

type Post {
  body: String
  id: Int
  published: Boolean
  title: String
}

type Query {
  drafts: [Post]
  posts: [Post]
}
`

export const resolvers = {
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
          body: args.body,
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