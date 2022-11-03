import Discord from "discord.js";

/* Guild ModifiedTypes */
export type GuildInteraction = Discord.CommandInteraction<Discord.CacheType>;

/* Permissions */
class permissions {
  public static names: {
    [id in Discord.PermissionsString]: string;
  } = {
    CreateInstantInvite: "Create Instant Invite",
    KickMembers: "Kick Members",
    BanMembers: "Ban Members",
    Administrator: "Adiminstrator",
    ManageChannels: "Manage Channels",
    ManageGuild: "Manage Server",
    AddReactions: "Add Reactions",
    ViewAuditLog: "View Audit Log",
    PrioritySpeaker: "Priority Speaker",
    Stream: "Stream In Voice Chat",
    ViewChannel: "View Channel",
    SendMessages: "Send Messages",
    SendTTSMessages: "Send TTS Messages",
    ManageMessages: "Manage Messages",
    EmbedLinks: "Embed Links",
    AttachFiles: "Attach Files",
    ReadMessageHistory: "Read Message History",
    MentionEveryone: "Mention",
    UseExternalEmojis: "Use External Emojis",
    ViewGuildInsights: "View Server Insights",
    Connect: "Connect To Voice Chat",
    Speak: "Speak In Voice Chat",
    MuteMembers: "Mute Members",
    DeafenMembers: "Deafen Members",
    MoveMembers: "Move Members",
    UseVAD: "Use Voice-Activity-Detection",
    ChangeNickname: "Change Nicknames",
    ManageNicknames: "Manage Nicknames",
    ManageRoles: "Manage Roles",
    ManageWebhooks: "Manage Webhooks",
    ManageEmojisAndStickers: "Manage Emojis & Stickers",
    UseApplicationCommands: "Use Application Commands",
    RequestToSpeak: "Speak In Stage Channels",
    ManageEvents: "Manage Events",
    ManageThreads: "Manage Threads",
    CreatePublicThreads: "Create Public Threads",
    CreatePrivateThreads: "Create Private Threads",
    UseExternalStickers: "Use External Stickers",
    SendMessagesInThreads: "Send Messages In Threads",
    UseEmbeddedActivities: "Use Embedded ACtivities",
    ModerateMembers: "Moderate Members",
  };

  public static translate(permission: keyof Discord.PermissionFlags) {
    return this.names[permission];
  }

  public static getIdentifiers(
    permission: Discord.PermissionResolvable
  ): Array<keyof typeof this.names> {
    const permissions = new Discord.PermissionsBitField(permission);
    if (permissions.has(Discord.PermissionFlagsBits.Administrator))
      return ["Administrator"];
    return permissions.toArray();
  }
}

export default class utilities {
  public static permissions = permissions;
  public static events = Discord.Events;
}
