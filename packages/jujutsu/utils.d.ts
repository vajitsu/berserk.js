import Discord from 'discord.js'

declare type GuildInteraction = Discord.CommandInteraction<Discord.CacheType>
declare class Permissions {
  static names: {
    [id in Discord.PermissionsString]: string
  }
  static translate(permission: keyof Discord.PermissionFlags): string
  static getIdentifiers(
    permission: Discord.PermissionResolvable
  ): Array<keyof typeof this.names>
}
declare class Utilities {
  static Permissions: typeof Permissions
  static Events: typeof Discord.Events
}

export { GuildInteraction, Utilities as default }
