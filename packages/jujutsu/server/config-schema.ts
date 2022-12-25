import { JujutsuConfig } from './config'
import type { JSONSchemaType } from 'ajv'

const configSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    cleanDistDir: {
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
        library: {
          type: 'string',
          default: 'discord.js',
        },
        options: {
          type: 'object',
          additionalProperties: true,
          properties: {
            intents: {
              minItems: 1,
              type: 'array',
            },
          },
        },
      },
      type: 'object',
    },
    experimental: {
      additionalProperties: false,
      properties: {
        swcMinify: {
          type: 'boolean',
        },
        compress: {
          type: 'boolean',
        },
        appDir: {
          type: 'boolean',
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
