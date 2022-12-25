import Discord from 'discord.js'

export type SlashCommandError = {
  permission: number
  other: Error
}

export type JujutsuConfig = {
  distDir: string
  env?: string[]
  discord: DiscordConfig
}

export type DiscordConfig = {
  token: string
  application: {
    id: string
  }
  options: Discord.ClientOptions
  customStatus?: Discord.PresenceData
  onSlashCommandError?: <K extends keyof SlashCommandError>(
    type: K,
    err: SlashCommandError[K]
  ) => Promise<void>
}
