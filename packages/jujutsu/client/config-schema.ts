import { JujutsuConfig } from './config'
import type { JSONSchemaType } from 'ajv'

const configSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    cleanDistDir: {
      type: 'boolean',
    },
    commandExtensions: {
      minItems: 1,
      type: 'array',
    },
    eventExtensions: {
      minItems: 1,
      type: 'array',
    },
    compress: {
      type: 'boolean',
    },
    distDir: {
      minLength: 1,
      type: 'string',
      nullable: true,
    },
    env: {
      type: 'object',
    },
    swcMinify: {
      type: 'boolean',
    },
    typescript: {
      additionalProperties: false,
      properties: {
        ignoreBuildErrors: {
          type: 'boolean',
        },
        tsconfigPath: {
          minLength: 1,
          type: 'string',
        },
      },
      type: 'object',
    },
    discord: {
      additionalProperties: false,
      properties: {
        token: {
          minLength: 1,
          type: 'string',
        },
        applicationId: {
          minLength: 1,
          type: 'string',
        },
        options: {
          type: 'object',
          additionalProperties: true,
        },
      },
      type: 'object',
    },
  },
} as JSONSchemaType<JujutsuConfig>

// module.exports is used to get around an export bug with TypeScript
// and the Ajv automatic typing
module.exports = {
  configSchema,
}
