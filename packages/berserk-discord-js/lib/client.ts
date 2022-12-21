import {
  close_code,
  connect,
  identify_close,
  parse_payload,
  send_heartbeat,
  send_identify,
} from './gateway'
import { prefixes } from './log'
import { print_and_exit, unpack } from './utils'
import { z } from '@berserk/discord-js/dist/compiled/zod'
import { EventEmitter, WebSocket } from '@berserk/discord-js/dist/compiled/ws'

interface client_options {
  intents: number[]
}

interface client_events {
  ready: {
    fn: (arg_0: client) => void
    args: [client]
  }
}

class client {
  private token?: string

  private events = new EventEmitter()

  // Gateway related values
  private gateway?: WebSocket
  private gateway_encoding: 'etf' | 'json' = 'json'
  private api_version: 9 | 10 = 10
  private heartbeat_interval: number = 0
  private resume_gateway_url?: string
  private session_id?: string
  private can_reconnect: boolean = false
  private heartbeats_ack: number = 0
  private sequence_num: number | null = 0
  private handle_gateway = {
    close: () => {
      if (!this.gateway) return void 0

      this.gateway.on('close', (code, buf: Buffer | string) => {
        let reason = ''
        if (this.gateway_encoding === 'etf' && buf instanceof Buffer)
          reason = unpack(buf)
        else reason = buf.toString('utf8')

        let info = identify_close(code as close_code)

        if (info) {
          this.can_reconnect = info.reconnect
          console.log(`${prefixes.error} ${info.message}`)
        } else {
          console.log(
            `${prefixes.error} Connection has been closed${
              reason
                ? ', ' + (reason as string).toLowerCase()
                : ' for an unknown reason.'
            } [${code}]`
          )
        }
      })
    },
    message: () => {
      if (!this.gateway) return void 0

      this.gateway.on('message', async (data) => {
        if (this.gateway_encoding === 'etf' && data instanceof Buffer)
          data = unpack(data)
        else data = JSON.parse(data.toString('utf8'))

        const {
          sequence,
          event_name,
          op: { name: op_name },
          data: payload_data,
        } = parse_payload(data as any, this.api_version)

        this.sequence_num = sequence

        switch (op_name) {
          case 'hello':
            if (this.gateway)
              send_heartbeat(this.gateway, {
                encoding: this.gateway_encoding,
                sequence: this.sequence_num,
                heartbeats_ack: this.heartbeats_ack,
              })
            break
          case 'heartbeat_ack':
            this.heartbeats_ack++
            if (this.heartbeats_ack === 1 && this.token && this.gateway)
              send_identify(this.gateway, {
                encoding: this.gateway_encoding,
                token: this.token,
                intents: this.intents,
              })
            break
          case 'dispatch':
            switch (event_name) {
              case 'ready':
                if (
                  typeof payload_data.user.bot === 'boolean' &&
                  !payload_data.user.bot
                )
                  print_and_exit(
                    `${prefixes.error} Logged in with a account that is not a bot, you must login with a bot account.`
                  )
                this.resume_gateway_url = payload_data.session_id
                this.session_id = payload_data.session_id
                this.emit(event_name, this)
                break
              default:
                break
            }
            break
          default:
            break
        }
      })
    },
    error: () => {
      if (!this.gateway) return void 0
      this.gateway.on('error', (error) => {
        console.error(error)
      })
    },
    all() {
      this.message()
      this.error()
      this.close()
    },
  }

  readonly intents: number = 0
  readonly debug: boolean = false

  constructor(options: client_options) {
    this.intents = options.intents.reduce((a, b) => a + b, 0)
  }

  private validate_login_parameters({
    token,
    encoding,
    version,
  }: {
    token: string
    encoding: 'etf' | 'json'
    version: 9 | 10
  }) {
    const loginSchema = z.object({
      token: z.string(),
      version: z
        .number()
        .min(9, {
          message: `${prefixes.error} Must be a version equal to or above 9.`,
        })
        .max(10, {
          message: `${prefixes.error} Must be a version equal to or less than 10.`,
        })
        .optional()
        .default(10),
      encoding: z
        .enum(['json', 'etf'], {
          invalid_type_error: `${prefixes.error} Expected 'json' or 'etf' from \`encoding]\` parameter.`,
        })
        .default('json'),
    })

    token = z.coerce.string().parse(token)
    encoding = z.coerce.string().parse(encoding) as 'etf' | 'json'
    version = z.coerce
      .number()
      .min(9, {
        message: `${prefixes.error} Must be a version equal to or above 9.`,
      })
      .max(10, {
        message: `${prefixes.error} Must be a version equal to or less than 10.`,
      })
      .parse(version) as 9 | 10

    return loginSchema.safeParse({
      token,
      encoding,
      version,
    }).success
  }

  public login(
    token: string,
    encoding: 'etf' | 'json' = 'json',
    version: 9 | 10 = 10
  ) {
    const invalid = !this.validate_login_parameters({
      token,
      encoding,
      version,
    })

    if (invalid) {
      if (!token)
        print_and_exit(
          `${prefixes.error} - \`token\` parameter is misisng from login function.`
        )
      else if (typeof token !== 'string')
        print_and_exit(`${prefixes.error} \`token\` parameter is not a string.`)
      else if (encoding !== 'etf' && encoding !== 'json') {
        print_and_exit(
          `${prefixes.error} Expected 'json' or 'etf' from \`encoding\` parameter.`
        )
      } else if (version !== 10 && version !== 9) {
        print_and_exit(
          `${prefixes.error} Expected 9 or 10 from \`version\` parameter.`
        )
      }
    }

    const gateway = connect(
      {
        encoding,
        version,
      },
      this.resume_gateway_url
    )

    this.token = token
    this.gateway = gateway
    this.gateway_encoding = encoding
    this.api_version = version

    this.handle_gateway.all()

    return token
  }

  public destroy() {
    this.gateway?.close(4006)
  }

  public reconnect() {
    if (!this.can_reconnect)
      print_and_exit(
        `${prefixes.error} Can't reconnect to gateway, must login again.`
      )
  }

  public once<
    EventName extends keyof client_events,
    Listener extends client_events[EventName]['fn']
  >(name: EventName, listener: Listener) {
    this.events.once(name, listener)
  }

  public on<
    EventName extends keyof client_events,
    Listener extends client_events[EventName]['fn']
  >(name: EventName, listener: Listener) {
    if (!name || !listener)
      print_and_exit(
        `${prefixes.warn} Missing event ${
          !name && !listener ? `name and listener` : !name ? `name` : `listener`
        } while trying to set an event, skipping \`${
          name ? name : 'unknown'
        }\` event.`
      )

    this.events.on(name, listener)
  }

  public emit<
    EventName extends keyof client_events,
    Args extends client_events[EventName]['args']
  >(name: EventName, ...args: Args) {
    this.events.emit(name, ...args)
  }
}

// Support commonjs `require`
module.exports = client
exports = module.exports

// Support esm `import`
export default client
