import type { CodegenConfig } from '@graphql-codegen/cli'
import { addTypenameSelectionDocumentTransform, preset as client } from '@graphql-codegen/client-preset'

const config: CodegenConfig = {
  schema: 'http://localhost:54321/graphql/v1', // Using the local endpoint, update if needed
  documents: 'src/**/!(*.d).{ts,tsx}',
  overwrite: true,
  ignoreNoDocuments: true,
  generates: {
    'src/gql/': {
      preset: client,
      documentTransforms: [addTypenameSelectionDocumentTransform],
      plugins: [],
      config: {
        scalars: {
          UUID: 'string',
          Date: 'string',
          Time: 'string',
          Datetime: 'string',
          JSON: 'string',
          BigInt: 'string',
          BigFloat: 'string',
          Opaque: 'any',
        },
        avoidOptionals: true,
        nullability: {
          errorHandlingClient: true,
        },
      },
    },
    './schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true
      }
    }
  },
}

export default config