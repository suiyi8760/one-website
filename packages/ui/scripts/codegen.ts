import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: process.env.SCHEMA_PATH,
  documents: ['src/**/*.tsx', '!src/gql/**/*'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: []
    }
  }
}

export default config
