// @ts-ignore This path is generated at build time and conflicts otherwise
import { JujutsuConfig } from '../dist/client/config'
import { ChatInputCommandInteraction as DiscordJsInteraction } from 'discord.js'

// eslint-disable-next-line no-shadow
enum Partials {
  User,
  Channel,
  GuildMember,
  Message,
  Reaction,
}

// eslint-disable-next-line no-shadow
enum GatewayIntentBits {
  Guilds = 1,
  GuildMembers = 2,
  GuildBans = 4,
  GuildEmojisAndStickers = 8,
  GuildIntegrations = 16,
  GuildWebhooks = 32,
  GuildInvites = 64,
  GuildVoiceStates = 128,
  GuildPresences = 256,
  GuildMessages = 512,
  GuildMessageReactions = 1024,
  GuildMessageTyping = 2048,
  DirectMessages = 4096,
  DirectMessageReactions = 8192,
  DirectMessageTyping = 16384,
  MessageContent = 32768,
  GuildScheduledEvents = 65536,
  AutoModerationConfiguration = 1048576,
  AutoModerationExecution = 2097152,
}

type GatewayIntentsString = keyof typeof GatewayIntentBits

interface JujutsuClientOptions {
  intents: Integer
  partials: Partials[]
  intents: BitField<GatewayIntentsString>
}

interface JujutsuClient {
  new (options): {
    destroy(): void
    login(token: string): void
    events: EventEmitter
    options: JujutsuClientOptions
  }
}

export { JujutsuConfig, JujutsuClient, DiscordJsInteraction }
