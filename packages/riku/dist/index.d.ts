import * as Discord from 'discord.js';
import { ClientEvents, SlashCommandBuilder } from 'discord.js';

declare abstract class event<T extends keyof ClientEvents> {
    protected instance: bot;
    name: T;
    constructor(instance: bot, name: T);
    abstract run(...args: ClientEvents[T]): Promise<void>;
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

declare type GuildInteraction = Discord.CommandInteraction<Discord.CacheType>;

declare abstract class command {
    protected instance: bot;
    abstract name: string;
    abstract data: SlashCommandBuilder;
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

declare type Config = {
    token: string;
    application: {
        id: string;
    };
    presets: {
        events: boolean;
        commands: boolean;
    };
    options: Discord.ClientOptions;
    customStatus?: Discord.PresenceData;
};

declare class bot {
    static instance: bot;
    appId: string;
    directory: string;
    client: Discord.Client;
    eventManager: eventManager;
    commandManager: commandManager;
    ready: boolean;
    config: Config;
    constructor(configuration: Config);
    private init;
    customStatusLoop(): Promise<void>;
}

export { Config, bot, command, event };
