'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Discord2 = require('discord.js');

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var Permissions = class {
  static translate(permission) {
    return this.names[permission];
  }
  static getIdentifiers(permission) {
    const permissions = new Discord2.PermissionsBitField(permission);
    if (permissions.has(Discord2.PermissionFlagsBits.Administrator))
      return ["Administrator"];
    return permissions.toArray();
  }
};
__name(Permissions, "Permissions");
Permissions.names = {
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
  ModerateMembers: "Moderate Members"
};
var Utilities = class {
};
__name(Utilities, "Utilities");
Utilities.Permissions = Permissions;
Utilities.Events = Discord2.Events;

// builders/slash-command.ts
function data({
  nameLocalizations,
  description,
  descriptionLocalizations,
  defaultMemberPermissions,
  dmPermission,
  subcommandGroups,
  subcommands
}) {
  const command = new Discord2.SlashCommandBuilder();
  command.setDescription(description);
  if (subcommands)
    for (const sub of subcommands)
      command.addSubcommand(sub);
  if (subcommandGroups)
    for (const sub of subcommandGroups)
      command.addSubcommandGroup(sub);
  if (nameLocalizations)
    command.setNameLocalizations(nameLocalizations);
  if (descriptionLocalizations)
    command.setDescriptionLocalizations(descriptionLocalizations);
  if (typeof dmPermission === "boolean")
    command.setDMPermission(dmPermission);
  if (typeof defaultMemberPermissions === "boolean")
    command.setDefaultMemberPermissions(defaultMemberPermissions);
  return command;
}
__name(data, "data");
var SlashCommand = class {
  constructor(instance, permissions) {
    this.instance = instance;
    this.vanished = false;
    this.interactive = false;
    this.permissions = [
      Discord2.PermissionFlagsBits.SendMessages,
      Discord2.PermissionFlagsBits.ViewChannel,
      Discord2.PermissionFlagsBits.EmbedLinks
    ];
    if (permissions)
      this.permissions = new Discord2.PermissionsBitField(this.permissions).bitfield | new Discord2.PermissionsBitField(permissions).bitfield;
  }
  calculatePermissions(interaction) {
    return this.permissions;
  }
  requireUserPemission(permission, member, interaction) {
    if (!member.permissions.has(permission)) {
      const missing = new Discord2.PermissionsBitField(permission);
      const identifiers = Utilities.Permissions.getIdentifiers(missing);
      interaction.reply(
        "> **Permissions Error!**\nYou are missing the following permissions\n" + identifiers.map(Utilities.Permissions.translate).map((name) => `- \`${name}\``).join("\n")
      );
    }
  }
};
__name(SlashCommand, "SlashCommand");

exports.data = data;
exports.default = SlashCommand;
