import Discord from 'discord.js';

declare class SlashCommandManager {
  private instance;
  private interactive;
  private running;
  private commands;
  private lastCommandUsage;
  constructor(instance: Bot);
  isRunning(id: string): boolean;
  run(interaction: Discord.ChatInputCommandInteraction): Promise<undefined>;
  registerCommand(command: SlashCommand$1): void;
  getCommand(name: string): SlashCommand$1;
  getCommands(): SlashCommand$1[];
  loadCommands(): void;
}

declare abstract class Event<T extends keyof Discord.ClientEvents> {
  protected instance: Bot;
  name: T;
  constructor(instance: Bot, name: T);
  abstract run(...args: Discord.ClientEvents[T]): Promise<void>;
}

declare class EventManager {
  private instance;
  private events;
  constructor(instance: Bot);
  registerEvent(event: Event<keyof Discord.ClientEvents>): void;
  getEvent(name: string): Event<keyof Discord.ClientEvents>;
  getEvents(): Event<keyof Discord.ClientEvents>[];
}

declare abstract class InteractiveButton {
  abstract data: Partial<Discord.APIButtonComponentWithCustomId>;
  abstract run(
    interaction: Discord.ButtonInteraction,
    client: Discord.Client
  ): Promise<void>;
}

declare class ButtonManager {
  private instance;
  private buttons;
  constructor(instance: Bot);
  run(interaction: Discord.ButtonInteraction): Promise<undefined>;
  registerButton(button: InteractiveButton): void;
  getButton(name: string): InteractiveButton;
  getButtons(): InteractiveButton[];
}

declare class Bot {
  /**
   * Configuration of bot, accessible at `config` when initiating `bot` class
   */
  config: DiscordConfig;
  /**
   * An instance of the bot class - Can be used **without** initializing `bot` class
   */
  static instance: Bot;
  /**
   * Your Discord Application's Id - Can be used **without** initializing `bot` class
   */
  appId: string;
  /**
   * The directory your bot is being run in
   */
  directory: string;
  /**
   * Instance of a Discord bot client
   */
  client: Discord.Client;
  /**
   * All-in-one event manager, without the hassle!
   */
  eventManager: EventManager;
  /**
   * All-in-one slash command manager, without the hassle!
   */
  slashCommandManager: SlashCommandManager;

  buttonManager: ButtonManager;
  /**
   * If `ready` event has successfully executed
   */
  ready: boolean;
  constructor(
    /**
     * Configuration of bot, accessible at `config` when initiating `bot` class
     */
    config: DiscordConfig
  );
  /**
   * Login to your Discord bot
   */
  private init;
  /**
   * Runs the custom status loop if it is defined at `config.customStatus`
   */
  customStatusLoop(): Promise<void>;
}
declare type SlashCommandError = {
  permission: number;
  other: Error;
};
/**
 * Configuration of bot, defined when initiating `Bot` instance
 */
declare type DiscordConfig = {
  /**
   * Your Dicsord Bot's Token -
   * [Learn more](https://vajitsu.com/riku/docs/configuration#discord_token)
   */
  token: string;
  application: {
    /**
     * Your Discord Application's Id -
     * [Learn more](https://vajitsu.com/riku/docs/configuration#application_id)
     */
    id: string;
  };
  /**
   * Options used when initializing Discord Client -
   * [Learn more](https://vajitsu.com/riku/docs/configuration#options)
   */
  options: Discord.ClientOptions;
  /**
   * Set a custom status for your Discord bot -
   * [Learn more](https://vajitsu.com/riku/docs/basics#custom_status)
   */
  customStatus?: Discord.PresenceData;
  /**
   * Run a function when command errors occur
   * - Catches permission errors (sends missing permssions)
   * - Catches errors with your code
   * - May catch issues with `Riku.js` itself → create an issue on our [Github](https://github.com/vajitsu/riku.js/issues) <3
   */
  onSlashCommandError?: <K extends keyof SlashCommandError>(
    type: K,
    err: SlashCommandError[K]
  ) => Promise<void>;
};

declare type SlashCommandData = {
  nameLocalizations?: Discord.LocalizationMap;
  description: string;
  descriptionLocalizations?: Discord.LocalizationMap;
  defaultMemberPermissions?: Discord.Permissions | null;
  dmPermission?: boolean;
  subcommands?: Array<Discord.SlashCommandSubcommandBuilder>;
  subcommandGroups?: Array<Discord.SlashCommandSubcommandGroupBuilder>;
};
declare function data({
  nameLocalizations,
  description,
  descriptionLocalizations,
  defaultMemberPermissions,
  dmPermission,
  subcommandGroups,
  subcommands,
}: SlashCommandData): Discord.SlashCommandBuilder;
declare abstract class SlashCommand {
  protected instance: Bot;
  abstract data: Discord.RESTPostAPIChatInputApplicationCommandsJSONBody;
  vanished: boolean;
  interactive: false | string;
  private permissions;
  constructor(instance: Bot, permissions?: Discord.PermissionResolvable);
  abstract run(
    interaction: Discord.ChatInputCommandInteraction,
    bot: Discord.Client<true>,
    id?: string,
    unhookInteraction?: () => void
  ): Promise<void>;
  calculatePermissions(
    interaction: Discord.ChatInputCommandInteraction
  ): Discord.PermissionResolvable;
  protected requireUserPemission(
    permission: Discord.PermissionResolvable,
    member: Discord.GuildMember,
    interaction: Discord.ChatInputCommandInteraction
  ): void;
}

export { data, SlashCommand as default };
