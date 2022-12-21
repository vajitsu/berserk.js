/* eslint-disable @typescript-eslint/no-use-before-define */
import WebSocket from '@berserk/discord-js/dist/compiled/ws'
import lodash from '@berserk/discord-js/dist/compiled/lodash'
import { platform } from 'os'
import { prefixes } from './log'
import { stdout } from 'process'
import { pack } from './utils'

export function connect<T extends connect_params>(
  { version, encoding, compress }: T,
  reconnect_gateway_url?: string
) {
  if (version <= 8) {
    version = 10
    stdout.write(
      `${prefixes.warn} - Version provided is below the supported. Defaulting to version 10.`
    )
  } else if (version >= 11) {
    version = 10
    stdout.write(
      `${prefixes.warn} - Version provided is above the current version. Defaulting to version 10.`
    )
  }

  return new WebSocket(
    `${
      reconnect_gateway_url || 'wss://gateway.discord.gg'
    }/?v=${version}&encoding=${encoding}${
      compress === 'zlib-stream' ? `&compress=${compress}` : ''
    }`
  )
}

export async function send_identify<T extends identify_params>(
  gateway: WebSocket,
  params: T
) {
  let payload: identify_payload | Buffer | string = {
    op: gateway_opcodes.name_to_code.identify,
    d: {
      token: params.token,
      intents: params.intents,
      properties: {
        os: platform(),
        browser: 'berserk_discord',
        device: 'berserk_discord',
      },
    },
  }

  if (params.encoding === 'etf') payload = pack(payload)
  else payload = JSON.stringify(payload)

  gateway.send(payload)
}

export function send_heartbeat<T extends WebSocket>(
  gateway: T,
  params: {
    encoding: 'json' | 'etf'
    sequence: null | number
    heartbeats_ack: number
  }
) {
  let payload: heartbeat_payload | Buffer | string = {
    op: gateway_opcodes.name_to_code.heartbeat,
    d: params.heartbeats_ack,
    s: params.sequence,
  }

  if (params.encoding === 'etf') payload = pack(payload)
  else payload = JSON.stringify(payload)

  gateway.send(payload)
}

export function parse_payload<
  T extends gateway_payload,
  Version extends number
>(payload: T, api_version: Version): parsed_payload {
  // Remove trace (only needed for debugging purposes)
  if (payload.d && payload.d['_trace']) delete payload.d['_trace']

  const api_types =
    api_version === 10
      ? (require('discord-api-types/v10') as typeof import('discord-api-types/v10'))
      : (require('discord-api-types/v9') as typeof import('discord-api-types/v9'))

  const gateway_opcodes = Object.entries(api_types.GatewayOpcodes)
    .filter((opcode) => isNaN(Number(opcode[0])))
    .map((opcode) => [lodash.snakeCase(opcode[0]), opcode[1]])

  let data = {
    op: {
      code: gateway_opcodes
        .find((opcode) => opcode[1] === payload.op)
        ?.at(1) as op_code,
      name: gateway_opcodes
        .find((opcode) => opcode[1] === payload.op)
        ?.at(0) as op_name,
    },
    event_name: payload?.t?.toLowerCase(),
    sequence: payload.s,
    data: payload.d,
  } as const

  return data
}

export function identify_op_name<T extends op_code>(code: T): op_name {
  return gateway_opcodes.code_to_name[code]
}

export function identify_op_code<T extends op_name>(name: T): op_code {
  return gateway_opcodes.name_to_code[name]
}

export function identify_close<T extends close_code>(
  code: T
): typeof gateway_close_codes.code_to_info[keyof typeof gateway_close_codes.code_to_info] {
  if ((code as number) === 4006)
    return {
      name: 'forced close',
      message:
        'Your session has been closed by force. Reconnect and start a new one.',
      reconnect: false,
    }
  else return gateway_close_codes.code_to_info[code]
}

export const gateway_opcodes = {
  name_to_code: {
    /**
     * An event was dispatched
     */
    dispatch: 0,
    /**
     * A bidirectional opcode to maintain an active gateway connection.
     * Fired periodically by the client, or fired by the gateway to request an immediate heartbeat from the client.
     */
    heartbeat: 1,
    /**
     * Starts a new session during the initial handshake
     */
    identify: 2,
    /**
     * Update the client's presence
     */
    presence_update: 3,
    /**
     * Used to join/leave or move between voice channels
     */
    voice_state_update: 4,
    /**
     * Resume a previous session that was disconnected
     */
    resume: 6,
    /**
     * You should attempt to reconnect and resume immediately
     */
    reconnect: 7,
    /**
     * Request information about offline guild members in a large guild
     */
    request_guild_members: 8,
    /**
     * The session has been invalidated. You should reconnect and identify/resume accordingly
     */
    invalid_session: 9,
    /**
     * Sent immediately after connecting, contains the `heartbeat_interval` to use
     */
    hello: 10,
    /**
     * Sent in response to receiving a heartbeat to acknowledge that it has been received
     */
    heartbeat_ack: 11,
  } as const,
  code_to_name: {
    0: 'dispatch',
    1: 'heartbeat',
    2: 'identify',
    3: 'presence_update',
    4: 'voice_state_update',
    6: 'resume',
    7: 'reconnect',
    8: 'request_guild_members',
    9: 'invalid_session',
    10: 'hello',
    11: 'heartbeat_ack',
  } as const,
}

export const gateway_close_codes = {
  name_to_code: {
    unknown_error: 4000,
    unknown_opcode: 4001,
    decode_error: 4002,
    not_authenticated: 4003,
    authentication_failed: 4004,
    already_authenticated: 4005,
    invalid_seq: 4007,
    rate_limited: 4008,
    session_timed_out: 4009,
    invalid_shard: 4010,
    sharding_required: 4011,
    invalid_api_version: 4012,
    invalid_intents: 4013,
    disallowed_intents: 4014,
  },
  code_to_name: {
    4000: 'unknown_error',
    4001: 'unknown_opcode',
    4002: 'decode_error',
    4003: 'not_authenticated',
    4004: 'authentication_failed',
    4005: 'already_authenticated',
    4007: 'invalid_seq',
    4008: 'rate_limited',
    4009: 'session_timed_out',
    4010: 'invalid_shard',
    4011: 'sharding_required',
    4012: 'invalid_api_version',
    4013: 'invalid_intents',
    4014: 'disallowed_intents',
  },
  code_to_info: {
    4000: {
      name: 'unknown error',
      message: "We're not sure what went wrong. Try reconnecting?",
      reconnect: true,
    },
    4001: {
      name: 'unknown opcode',
      message: `You sent an invalid Gateway opcode or an invalid payload for an opcode. Don't do that! Learn more https://discord.com/developers/docs/topics/gateway-events#payload-structure`,
      reconnect: true,
    },
    4002: {
      name: 'decode error',
      message: `You sent an invalid payload to us. Don't do that! Learn more https://discord.com/developers/docs/topics/gateway-events#identify`,
      reconnect: true,
    },
    4003: {
      name: 'not authenticated',
      message: `You sent us a payload prior to identifying. Learn more https://discord.com/developers/docs/topics/gateway-events#identify`,
      reconnect: true,
    },
    4004: {
      name: 'authentication failed',
      message: `The account token sent with your identify payload is incorrect. Learn more https://discord.com/developers/docs/topics/gateway-events#identify`,
      reconnect: false,
    },
    4005: {
      name: 'already authenticated',
      message: `You sent more than one identify payload. Don't do that!`,
      reconnect: true,
    },
    4007: {
      name: 'invalid seq',
      message: `The sequence sent when resuming the session was invalid. Reconnect and start a new session. Learn more https://discord.com/developers/docs/topics/gateway-events#resume`,
      reconnect: true,
    },
    4008: {
      name: 'rate limited',
      message: `Woah nelly! You're sending payloads to us too quickly. Slow it down! You will be disconnected on receiving this`,
      reconnect: true,
    },
    4009: {
      name: 'session timed out',
      message: `Your session timed out. Reconnect and start a new one.`,
      reconnect: true,
    },
    4010: {
      name: 'invalid shard',
      message: `You sent us an invalid shard when identifying. Learn more https://discord.com/developers/docs/topics/gateway#sharding`,
      reconnect: false,
    },
    4011: {
      name: 'sharding required',
      message: `The session would have handled too many guilds - you are required to shard your connection in order to connect. Learn more https://discord.com/developers/docs/topics/gateway#sharding`,
      reconnect: false,
    },
    4012: {
      name: 'invalid api version',
      message: `You sent an invalid version for the gateway.`,
      reconnect: false,
    },
    4013: {
      name: 'invalid intents',
      message: `You sent an invalid intent for a Gateway Intent. You may have incorrectly calculated the bitwise value. Learn more https://discord.com/developers/docs/topics/gateway#gateway-intents`,
      reconnect: false,
    },
    4014: {
      name: 'disallowed intents',
      message: `You sent a disallowed intent for a Gateway Intent. You may have tried to specify an intent that you have not enabled or are not whitelisted for. Learn more https://discord.com/developers/docs/topics/gateway#gateway-intents, https://discord.com/developers/docs/topics/gateway#privileged-intents`,
      reconnect: false,
    },
  },
}

export type op_name =
  | 'dispatch'
  | 'heartbeat'
  | 'identify'
  | 'presence_update'
  | 'voice_state_update'
  | 'resume'
  | 'reconnect'
  | 'request_guild_members'
  | 'invalid_session'
  | 'hello'
  | 'heartbeat_ack'

export type op_code = 0 | 1 | 2 | 3 | 4 | 6 | 7 | 8 | 9 | 10 | 11

export type close_code =
  | 4000
  | 4001
  | 4002
  | 4003
  | 4004
  | 4005
  | 4007
  | 4008
  | 4009
  | 4010
  | 4011
  | 4012
  | 4013
  | 4014

/**
 * Reference: [Opcodes and Status Codes](https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes)
 */
// eslint-disable-next-line no-shadow
export enum gateway_opcode_enums {
  /**
   * An event was dispatched
   */
  dispatch,
  /**
   * A bidirectional opcode to maintain an active gateway connection.
   * Fired periodically by the client, or fired by the gateway to request an immediate heartbeat from the client.
   */
  heartbeat,
  /**
   * Starts a new session during the initial handshake
   */
  identify,
  /**
   * Update the client's presence
   */
  presence_update,
  /**
   * Used to join/leave or move between voice channels
   */
  voice_state_update,
  /**
   * Resume a previous session that was disconnected
   */
  resume = 6,
  /**
   * You should attempt to reconnect and resume immediately
   */
  reconnect,
  /**
   * Request information about offline guild members in a large guild
   */
  request_guild_members,
  /**
   * The session has been invalidated. You should reconnect and identify/resume accordingly
   */
  invalid_session,
  /**
   * Sent immediately after connecting, contains the `heartbeat_interval` to use
   */
  hello,
  /**
   * Sent in response to receiving a heartbeat to acknowledge that it has been received
   */
  heartbeat_ack,
}

/**
 * Reference: [Opcodes and Status Codes](https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-close-event-codes)
 */
// eslint-disable-next-line no-shadow
export enum gateway_close_code_enum {
  /**
   * We're not sure what went wrong. Try reconnecting?
   */
  unknown_error = 4000,
  /**
   * You sent an invalid Gateway opcode or an invalid payload for an opcode. Don't do that!
   *
   * See https://discord.com/developers/docs/topics/gateway-events#payload-structure
   */
  unknown_opcode,
  /**
   * You sent an invalid payload to us. Don't do that!
   *
   * See https://discord.com/developers/docs/topics/gateway#sending-events
   */
  decode_error,
  /**
   * You sent us a payload prior to identifying
   *
   * See https://discord.com/developers/docs/topics/gateway-events#identify
   */
  not_authenticated,
  /**
   * The account token sent with your identify payload is incorrect
   *
   * See https://discord.com/developers/docs/topics/gateway-events#identify
   */
  authentication_failed,
  /**
   * You sent more than one identify payload. Don't do that!
   */
  already_authenticated,
  /**
   * The sequence sent when resuming the session was invalid. Reconnect and start a new session
   *
   * See https://discord.com/developers/docs/topics/gateway-events#resume
   */
  invalid_seq = 4007,
  /**
   * Woah nelly! You're sending payloads to us too quickly. Slow it down! You will be disconnected on receiving this
   */
  rate_limited,
  /**
   * Your session timed out. Reconnect and start a new one
   */
  session_timed_out,
  /**
   * You sent us an invalid shard when identifying
   *
   * See https://discord.com/developers/docs/topics/gateway#sharding
   */
  invalid_shard,
  /**
   * The session would have handled too many guilds - you are required to shard your connection in order to connect
   *
   * See https://discord.com/developers/docs/topics/gateway#sharding
   */
  sharding_required,
  /**
   * You sent an invalid version for the gateway
   */
  invalid_api_version,
  /**
   * You sent an invalid intent for a Gateway Intent. You may have incorrectly calculated the bitwise value
   *
   * See https://discord.com/developers/docs/topics/gateway#gateway-intents
   */
  invalid_intents,
  /**
   * You sent a disallowed intent for a Gateway Intent. You may have tried to specify an intent that you have not
   * enabled or are not whitelisted for
   *
   * See https://discord.com/developers/docs/topics/gateway#gateway-intents
   *
   * See https://discord.com/developers/docs/topics/gateway#privileged-intents
   */
  disallowed_intents,
}

export interface heartbeat_payload {
  op: 1
  s: number | null
  d: number
}

export interface parsed_payload {
  sequence: null | number
  event_name?: string
  op: {
    code: op_code
    name: op_name
  }
  data: {
    [key: string]: any
  }
}

export interface gateway_payload {
  /**
   * Opcode of the event
   */
  op: op_code
  /**
   * Date of the event
   */
  d: {
    _trace?: string[]
    [key: string]: any
  }
  /**
   * Sequence number of the event
   */
  s: number
  /**
   * Name of the event
   */
  t?: string
}

export interface identify_params {
  token: string
  intents: number
  encoding: 'json' | 'etf'
}

export interface identify_payload {
  op: 2
  d: {
    token: string
    intents: number
    properties: {
      os: NodeJS.Platform
      browser: 'berserk_discord'
      device: 'berserk_discord'
    }
  }
}

export interface connect_params {
  version: 9 | 10
  encoding: 'json' | 'etf'
  compress?: 'zlib-stream'
}
