import Discord from 'discord.js';

declare class SlashCommandManager$2 {
  private instance;
  private interactive;
  private running;
  private commands;
  private lastCommandUsage;
  constructor(instance: Bot$2);
  isRunning(id: string): boolean;
  run(interaction: Discord.ChatInputCommandInteraction): Promise<undefined>;
  registerCommand(command: SlashCommand$1): void;
  getCommand(name: string): SlashCommand$1;
  getCommands(): SlashCommand$1[];
  loadCommands(): void;
}

declare abstract class Event$1<T extends keyof Discord.ClientEvents> {
  protected instance: Bot$2;
  name: T;
  constructor(instance: Bot$2, name: T);
  abstract run(...args: Discord.ClientEvents[T]): Promise<void>;
}

declare class EventManager$2 {
  private instance;
  private events;
  constructor(instance: Bot$2);
  registerEvent(event: Event$1<keyof Discord.ClientEvents>): void;
  getEvent(name: string): Event$1<keyof Discord.ClientEvents>;
  getEvents(): Event$1<keyof Discord.ClientEvents>[];
}

declare abstract class InteractiveButton$2 {
  abstract data: Partial<Discord.APIButtonComponentWithCustomId>;
  abstract run(
    interaction: Discord.ButtonInteraction,
    client: Discord.Client
  ): Promise<void>;
}

declare class ButtonManager$1 {
  private instance;
  private buttons;
  constructor(instance: Bot$2);
  run(interaction: Discord.ButtonInteraction): Promise<undefined>;
  registerButton(button: InteractiveButton$2): void;
  getButton(name: string): InteractiveButton$2;
  getButtons(): InteractiveButton$2[];
}

declare class Bot$2 {
  /**
   * Configuration of bot, accessible at `config` when initiating `bot` class
   */
  config: DiscordConfig$2;
  /**
   * An instance of the bot class - Can be used **without** initializing `bot` class
   */
  static instance: Bot$2;
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
  eventManager: EventManager$2;
  /**
   * All-in-one slash command manager, without the hassle!
   */
  slashCommandManager: SlashCommandManager$2;

  buttonManager: ButtonManager$1;
  /**
   * If `ready` event has successfully executed
   */
  ready: boolean;
  constructor(
    /**
     * Configuration of bot, accessible at `config` when initiating `bot` class
     */
    config: DiscordConfig$2
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
declare type SlashCommandError$2 = {
  permission: number;
  other: Error;
};
/**
 * Configuration of bot, defined when initiating `Bot` instance
 */
declare type DiscordConfig$2 = {
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
  onSlashCommandError?: <K extends keyof SlashCommandError$2>(
    type: K,
    err: SlashCommandError$2[K]
  ) => Promise<void>;
};
declare abstract class SlashCommand$2 {
  protected instance: Bot$2;
  abstract data: Discord.RESTPostAPIChatInputApplicationCommandsJSONBody;
  vanished: boolean;
  interactive: false | string;
  private permissions;
  constructor(instance: Bot$2, permissions?: Discord.PermissionResolvable);
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

declare class SlashCommandManager$1 {
    private instance;
    private interactive;
    private running;
    private commands;
    private lastCommandUsage;
    constructor(instance: Bot);
    isRunning(id: string): boolean;
    run(interaction: Discord.ChatInputCommandInteraction): Promise<undefined>;
    registerCommand(command: SlashCommand$2): void;
    getCommand(name: string): SlashCommand$2;
    getCommands(): SlashCommand$2[];
    loadCommands(): void;
}

declare abstract class SlashCommand {
  protected instance: Bot$1;
  abstract data: Discord.RESTPostAPIChatInputApplicationCommandsJSONBody;
  vanished: boolean;
  interactive: false | string;
  private permissions;
  constructor(instance: Bot$1, permissions?: Discord.PermissionResolvable);
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

declare class SlashCommandManager {
  private instance;
  private interactive;
  private running;
  private commands;
  private lastCommandUsage;
  constructor(instance: Bot$1);
  isRunning(id: string): boolean;
  run(interaction: Discord.ChatInputCommandInteraction): Promise<undefined>;
  registerCommand(command: SlashCommand): void;
  getCommand(name: string): SlashCommand;
  getCommands(): SlashCommand[];
  loadCommands(): void;
}

declare class EventManager$1 {
  private instance;
  private events;
  constructor(instance: Bot$1);
  registerEvent(event: Event<keyof Discord.ClientEvents>): void;
  getEvent(name: string): Event<keyof Discord.ClientEvents>;
  getEvents(): Event<keyof Discord.ClientEvents>[];
}

declare abstract class InteractiveButton$1 {
  abstract data: Partial<Discord.APIButtonComponentWithCustomId>;
  abstract run(
    interaction: Discord.ButtonInteraction,
    client: Discord.Client
  ): Promise<void>;
}

declare class InteractiveButtonManager {
  private instance;
  private buttons;
  constructor(instance: Bot$1);
  run(interaction: Discord.ButtonInteraction): Promise<undefined>;
  registerButton(button: InteractiveButton$1): void;
  getButton(name: string): InteractiveButton$1;
  getButtons(): InteractiveButton$1[];
}

declare class Bot$1 {
  /**
   * Configuration of bot, accessible at `config` when initiating `bot` class
   */
  config: DiscordConfig$1;
  /**
   * An instance of the bot class - Can be used **without** initializing `bot` class
   */
  static instance: Bot$1;
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
  eventManager: EventManager$1;
  /**
   * All-in-one slash command manager, without the hassle!
   */
  slashCommandManager: SlashCommandManager;
  /**
   * Execute tasks when a user clicks a button
   */
  buttonManager: InteractiveButtonManager;
  /**
   * If `ready` event has successfully executed
   */
  ready: boolean;
  constructor(
    /**
     * Configuration of bot, accessible at `config` when initiating `bot` class
     */
    config: DiscordConfig$1
  );
  /**
   * Login to your Discord bot
   */
  init(): Promise<void>;
  /**
   * Runs the custom status loop if it is defined at `config.customStatus`
   */
  customStatusLoop(): Promise<void>;
}
declare type SlashCommandError$1 = {
  permission: number;
  other: Error;
};
/**
 * Configuration of bot, defined when initiating `Bot` instance
 */
declare type DiscordConfig$1 = {
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
  onSlashCommandError?: <K extends keyof SlashCommandError$1>(
    type: K,
    err: SlashCommandError$1[K]
  ) => Promise<void>;
};

declare abstract class Event<T extends keyof Discord.ClientEvents> {
  protected instance: Bot$1;
  name: T;
  constructor(instance: Bot$1, name: T);
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
    abstract run(interaction: Discord.ButtonInteraction, client: Discord.Client): Promise<void>;
}

declare class ButtonManager {
    private instance;
    private buttons;
    constructor(instance: Bot);
    run(interaction: Discord.ButtonInteraction): Promise<undefined>;
    registerButton(button: InteractiveButton): void;
    getButton(customId: string): InteractiveButton;
    buildButton(customId: string): Discord.ButtonBuilder;
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
    slashCommandManager: SlashCommandManager$1;
    buttonManager: ButtonManager;
    /**
     * If `ready` event has successfully executed
     */
    ready: boolean;
    constructor(
    /**
     * Configuration of bot, accessible at `config` when initiating `bot` class
     */
    config: DiscordConfig);
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
    onSlashCommandError?: <K extends keyof SlashCommandError>(type: K, err: SlashCommandError[K]) => Promise<void>;
};

declare type ModalData = {
    placeholder?: string;
    options?: Array<{
        label: string;
        description?: string;
        value: string;
    }>;
    disabled?: boolean;
    maxValues?: number;
    minValues?: number;
};
declare function ModalData(data: ModalData): Partial<Discord.APISelectMenuComponent>;
declare abstract class Modal {
    abstract data: Partial<Discord.APISelectMenuComponent>;
    abstract run(interaction: Discord.SelectMenuInteraction, bot: Bot): Promise<void>;
}

export { ModalData, Modal as default };
