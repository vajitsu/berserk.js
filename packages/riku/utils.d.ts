import Discord from 'discord.js';

declare type GuildInteraction = Discord.CommandInteraction<Discord.CacheType>;
declare class permissions {
  static names: {
    [id in Discord.PermissionsString]: string;
  };
  static translate(permission: keyof Discord.PermissionFlags): string;
  static getIdentifiers(
    permission: Discord.PermissionResolvable
  ): Array<keyof typeof this$1.names>;
}
declare class utilities {
  static permissions: typeof permissions;
  static events: typeof Discord.Events;
}

export { GuildInteraction, utilities as default };
