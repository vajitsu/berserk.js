import * as Discord from 'discord.js';
export { Discord as discord };

declare type GuildInteraction = Discord.CommandInteraction<Discord.CacheType>;
declare class permissions {
    static names: {
        [id in Discord.PermissionsString]: string;
    };
    static translate(permission: keyof Discord.PermissionFlags): string;
    static getIdentifiers(permission: Discord.PermissionResolvable): Array<keyof typeof this$1.names>;
}
declare class utilities {
    static permissions: typeof permissions;
    static events: typeof Discord.Events;
}

/**
 * Create a `command` instance that can be used within the **Riku.js** command manager
 *
 * ```js
 * class ping extends command {
 *   name: "ping";
 *   data: new riku.Discord.SlashCommandBuiler()
 *     .setName("ping")
 *     .setDescription("Recieve a 'pong'");
 *   async run(i) {
 *     i.reply("pong")
 *   }
 * }
 * ```
 */
declare abstract class command {
    protected instance: bot;
    abstract name: string;
    abstract data: Discord.SlashCommandBuilder;
    vanished: boolean;
    interactive: false | string;
    private permissions;
    constructor(instance: bot, permissions?: Discord.PermissionResolvable);
    abstract run(interaction: Discord.ChatInputCommandInteraction & GuildInteraction, id: string, unhookInteraction: () => void): Promise<void>;
    calculatePermissions(interaction: Discord.ChatInputCommandInteraction & GuildInteraction): Promise<Discord.PermissionResolvable>;
    protected requireUserPemission(permission: Discord.PermissionResolvable, member: Discord.GuildMember, interaction: Discord.ChatInputCommandInteraction & GuildInteraction): void;
}

declare class commandManager {
    private instance;
    private interactive;
    private running;
    private commands;
    private lastCommandUsage;
    constructor(instance: bot);
    isRunning(id: string): boolean;
    run(interaction: Discord.ChatInputCommandInteraction & GuildInteraction): Promise<undefined>;
    private registerCommands;
    private _registerCommand;
    registerCommand(command: command): void;
    getCommand(name: string): command;
    getCommands(): command[];
    private loadCommands;
}

/**
   * Create a `command` instance that can be used within the **Riku.js** command manager
   *
   * ```js
   * class ready extends event<"ready"> {
   *   constructor(instance: bot) { super(instance, riku.Discord.Events.ClientReady) }
   *   public async run() {
   *     console.log(`Logged in as ${this.instance?.client.user?.tag}`);
   *   }
   * }
   * ```
   */
declare abstract class event<T extends keyof Discord.ClientEvents> {
    protected instance: bot;
    name: T;
    constructor(instance: bot, name: T);
    abstract run(...args: Discord.ClientEvents[T]): Promise<void>;
}

declare class eventManager {
    private instance;
    private events;
    constructor(instance: bot);
    private registerEvents;
    private _registerEvent;
    registerEvent(event: event<any>): void;
    getEvent(name: string): event<any>;
    getEvents(): event<any>[];
}

declare abstract class actionRow {
    abstract components: Array<Discord.AnyComponentBuilder>;
    private row;
    build(): any;
}

declare abstract class button {
    /**
     * Automatically generated id using UUID (v4) -
     * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId#custom_id)
     */
    readonly id: string;
    /**
     * The text display on your button -
     * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId#label)
     */
    abstract readonly label: string;
    /**
     * Esstentially the background color of your button -
     * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/enum/ButtonStyle)
     */
    abstract readonly style: Discord.ButtonStyle;
    /** Whether or not users will be able to interact with the button -
     * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId#disabled)
     */
    readonly disabled?: boolean;
    /**
     * Attachs an emoji to the left side of your button -
     * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId#emoji)
     */
    readonly emoji?: Discord.ComponentEmojiResolvable;
    readonly url?: string;
    private button;
    /**
     * Builds your button and returns the output -
     * [Learn More](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId)
     */
    build(): Discord.ButtonBuilder;
}

/**
 * Configuration of bot, defined when initiating `bot` class
 */
declare type config = {
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
     * Get the basic events and/or commands bootstrapped with your Riku.js app -
     * [Learn more](https://vajitsu.com/riku/docs/configuration#presets)
     */
    presets: {
        /**
         * Get a simple `ready` and `interactionCreate` event bootstrapped with your Riku.js app -
         * [Learn more](https://vajitsu.com/riku/docs/configuration#presets_events)
         */
        events: boolean;
        /**
         * Get a `/hello` slash command bootstrapped with your Riku.js app -
         * [Learn more](https://vajitsu.com/riku/docs/configuration#presets_commands)
         */
        commands: boolean;
    };
    /**
     * Options used when initializing Discord Client -
     * [Learn more](https://vajitsu.com/riku/docs/configuration#options)
     */
    options: Discord.ClientOptions;
    /**
     * Set a custom status for your Discord bot -
     * [Learn more](https://vajitsu.com/riku/docs/configuration#custom_status)
     */
    customStatus?: Discord.PresenceData;
};
declare class bot {
    /**
     * An instance of the bot class - Can be used **without** initializing `bot` class
     */
    static instance: bot;
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
    eventManager: eventManager;
    /**
     * All-in-one s(slash) command manager, without the hassle!
     */
    commandManager: commandManager;
    /**
     * If `ready` event has successfully executed
     */
    ready: boolean;
    /**
     * Configuration of bot, defined when initiating `bot` class
     */
    config: config;
    constructor(
    /**
     * Configuration of bot, accessible at `config` when initiating `bot` class
     */
    configuration: config);
    /**
     * Login to your Discord bot
     */
    private init;
    /**
     * Runs the custom status loop if it is defined at `config.customStatus`
     */
    customStatusLoop(): Promise<void>;
}

declare const components: {
    actionRow: typeof actionRow;
    utils: typeof utilities;
    button: typeof button;
    event: typeof event;
    command: typeof command;
};
declare type EnvConfig<T, U> = T extends true ? U : null;
declare type UserConfig = {
    /**
     * Environmental variables used within the Riku.js app directories/files
     */
    env: EnvConfig<boolean, string[]>;
};

export { UserConfig, bot, components, config };
