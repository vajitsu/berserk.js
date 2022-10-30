import * as _sapphire_snowflake from '@sapphire/snowflake';
import * as _Discord from 'discord.js';
import _Discord__default, { SlashCommandBuilder, ClientEvents } from 'discord.js';

declare type GuildInteraction = _Discord.CommandInteraction<_Discord.CacheType>;
declare class permissions {
    static names: {
        [id in _Discord.PermissionsString]: string;
    };
    static translate(permission: keyof _Discord.PermissionFlags): string;
    static getIdentifiers(permission: _Discord.PermissionResolvable): Array<keyof typeof this$1.names>;
}
declare class utilities {
    static permissions: typeof permissions;
    static events: typeof _Discord.Events;
}

declare abstract class command {
    protected instance: bot;
    abstract name: string;
    abstract data: SlashCommandBuilder;
    vanished: boolean;
    interactive: false | string;
    private permissions;
    constructor(instance: bot, permissions?: _Discord.PermissionResolvable);
    abstract run(interaction: _Discord.ChatInputCommandInteraction & GuildInteraction, id: string, unhookInteraction: () => void): Promise<void>;
    calculatePermissions(interaction: _Discord.ChatInputCommandInteraction & GuildInteraction): Promise<_Discord.PermissionResolvable>;
    protected requireUserPemission(permission: _Discord.PermissionResolvable, member: _Discord.GuildMember, interaction: _Discord.ChatInputCommandInteraction & GuildInteraction): void;
}

declare class commandManager {
    private instance;
    private interactive;
    private running;
    private commands;
    private lastCommandUsage;
    constructor(instance: bot);
    isRunning(id: string): boolean;
    run(interaction: _Discord.ChatInputCommandInteraction & GuildInteraction): Promise<undefined>;
    private registerCommands;
    private _registerCommand;
    registerCommand(command: command): void;
    getCommand(name: string): command;
    getCommands(): command[];
    private loadCommands;
}

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
    abstract readonly style: _Discord__default.ButtonStyle;
    /** Whether or not users will be able to interact with the button -
     * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId#disabled)
     */
    readonly disabled?: boolean;
    /**
     * Attachs an emoji to the left side of your button -
     * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId#emoji)
     */
    readonly emoji?: _Discord__default.ComponentEmojiResolvable;
    readonly url?: string;
    private button;
    /**
     * Builds your button and returns the output -
     * [Learn More](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId)
     */
    build(): _Discord__default.ButtonBuilder;
}

declare type Config = {
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
    options: _Discord.ClientOptions;
    /**
     * Set a custom status for your Discord bot -
     * [Learn more](https://vajitsu.com/riku/docs/configuration#custom_status)
     */
    customStatus?: _Discord.PresenceData;
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
    client: _Discord.Client;
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
    config: Config;
    constructor(
    /**
     * Configuration of bot, accessible at `config` when initiating `bot` class
     */
    configuration: Config);
    /**
     * Login to your Discord bot
     */
    private init;
    /**
     * Runs the custom status loop if it is defined at `config.customStatus`
     */
    customStatusLoop(): Promise<void>;
}
declare const Discord: {
    basename(path: string, ext?: string | undefined): string;
    cleanContent(str: string, channel: _Discord.TextBasedChannel): string;
    discordSort<K, V extends {
        rawPosition: number;
        id: string;
    }>(collection: _Discord.Collection<K, V>): _Discord.Collection<K, V>;
    escapeMarkdown(text: string, options?: _Discord.EscapeMarkdownOptions | undefined): string;
    escapeCodeBlock(text: string): string;
    escapeInlineCode(text: string): string;
    escapeBold(text: string): string;
    escapeItalic(text: string): string;
    escapeUnderline(text: string): string;
    escapeStrikethrough(text: string): string;
    escapeSpoiler(text: string): string;
    escapeEscape(text: string): string;
    escapeHeading(text: string): string;
    escapeBulletedList(text: string): string;
    escapeNumberedList(text: string): string;
    escapeMaskedLink(text: string): string;
    cleanCodeBlockContent(text: string): string;
    fetchRecommendedShardCount(token: string, options?: _Discord.FetchRecommendedShardCountOptions | undefined): Promise<number>;
    flatten(obj: unknown, ...props: Record<string, string | boolean>[]): unknown;
    makeError(obj: _Discord.MakeErrorOptions): Error;
    makePlainError(err: Error): _Discord.MakeErrorOptions;
    mergeDefault(def: unknown, given: unknown): unknown;
    moveElementInArray(array: unknown[], element: unknown, newIndex: number, offset?: boolean | undefined): number;
    parseEmoji(text: string): {
        animated: boolean;
        name: string;
        id: string | null;
    } | null;
    resolveColor(color: _Discord.ColorResolvable): number;
    resolvePartialEmoji(emoji: _Discord.EmojiIdentifierResolvable): Partial<_Discord.APIPartialEmoji> | null;
    verifyString(data: string, error?: ErrorConstructor | undefined, errorMessage?: string | undefined, allowEmpty?: boolean | undefined): string;
    setPosition<T extends _Discord.Channel | _Discord.Role>(item: T, position: number, relative: boolean, sorted: _Discord.Collection<string, T>, client: _Discord.Client<true>, route: string, reason?: string | undefined): Promise<{
        id: string;
        position: number;
    }[]>;
    parseWebhookURL(url: string): _Discord.WebhookClientDataIdWithToken | null;
    createChannel(client: _Discord.Client<true>, data: _Discord.APIChannel, options?: _Discord.CreateChannelOptions | undefined): _Discord.Channel;
    createComponent<T_1 extends keyof _Discord.MappedComponentTypes>(data: _Discord.APIMessageComponent & {
        type: T_1;
    }): _Discord.MappedComponentTypes[T_1];
    createComponent<C extends _Discord.Component<_Discord.AnyComponent>>(data: C): C;
    createComponent(data: _Discord.APIMessageComponent | _Discord.Component<_Discord.AnyComponent>): _Discord.Component<_Discord.AnyComponent>;
    createComponentBuilder<T_2 extends keyof _Discord.MappedComponentBuilderTypes>(data: _Discord.APIMessageComponent & {
        type: T_2;
    }): _Discord.MappedComponentBuilderTypes[T_2];
    createComponentBuilder<C_1 extends _Discord.ComponentBuilder<_Discord.APIBaseComponent<_Discord.ComponentType>>>(data: C_1): C_1;
    createComponentBuilder(data: _Discord.APIMessageComponent | _Discord.ComponentBuilder<_Discord.APIBaseComponent<_Discord.ComponentType>>): _Discord.ComponentBuilder<_Discord.APIBaseComponent<_Discord.ComponentType>>;
    DiscordjsErrorMixin<T_3, N extends string>(Base: _Discord.Constructable<T_3>, name: N): _Discord.Constructable<T_3 & _Discord.DiscordjsErrorFields<N>>;
    PartialTextBasedChannel<T_4>(Base?: _Discord.Constructable<T_4> | undefined): _Discord.Constructable<T_4 & _Discord.PartialTextBasedChannelFields<false>>;
    TextBasedChannelMixin<T_5, InGuild extends boolean = boolean, I extends keyof _Discord.TextBasedChannelFields<InGuild> = never>(Base?: _Discord.Constructable<T_5> | undefined, inGuild?: InGuild | undefined, ignore?: I[] | undefined): _Discord.Constructable<T_5 & Omit<_Discord.TextBasedChannelFields<InGuild>, I>>;
    PartialWebhookMixin<T_6>(Base?: _Discord.Constructable<T_6> | undefined): _Discord.Constructable<T_6 & _Discord.PartialWebhookFields>;
    WebhookMixin<T_7>(Base?: _Discord.Constructable<T_7> | undefined): _Discord.Constructable<T_7 & _Discord.WebhookFields>;
    Activity: typeof _Discord.Activity;
    ActionRowBuilder: typeof _Discord.ActionRowBuilder;
    ActionRow: typeof _Discord.ActionRow;
    ActivityFlagsBitField: typeof _Discord.ActivityFlagsBitField;
    AnonymousGuild: typeof _Discord.AnonymousGuild;
    Application: typeof _Discord.Application;
    ApplicationCommand: typeof _Discord.ApplicationCommand;
    ApplicationFlagsBitField: typeof _Discord.ApplicationFlagsBitField;
    Base: typeof _Discord.Base;
    BaseClient: typeof _Discord.BaseClient;
    CommandInteraction: typeof _Discord.CommandInteraction;
    InteractionResponse: typeof _Discord.InteractionResponse;
    BaseGuild: typeof _Discord.BaseGuild;
    BaseGuildEmoji: typeof _Discord.BaseGuildEmoji;
    BaseGuildTextChannel: typeof _Discord.BaseGuildTextChannel;
    BaseGuildVoiceChannel: typeof _Discord.BaseGuildVoiceChannel;
    BitField: typeof _Discord.BitField;
    ButtonInteraction: typeof _Discord.ButtonInteraction;
    Component: typeof _Discord.Component;
    ButtonComponent: typeof _Discord.ButtonComponent;
    ButtonBuilder: typeof _Discord.ButtonBuilder;
    SelectMenuBuilder: typeof _Discord.SelectMenuBuilder;
    SelectMenuOptionBuilder: typeof _Discord.SelectMenuOptionBuilder;
    ModalBuilder: typeof _Discord.ModalBuilder;
    TextInputBuilder: typeof _Discord.TextInputBuilder;
    TextInputComponent: typeof _Discord.TextInputComponent;
    SelectMenuComponent: typeof _Discord.SelectMenuComponent;
    EmbedBuilder: typeof _Discord.EmbedBuilder;
    Embed: typeof _Discord.Embed;
    CategoryChannel: typeof _Discord.CategoryChannel;
    ChannelFlagsBitField: typeof _Discord.ChannelFlagsBitField;
    BaseChannel: typeof _Discord.BaseChannel;
    Client: typeof _Discord.Client;
    ClientApplication: typeof _Discord.ClientApplication;
    ClientPresence: typeof _Discord.ClientPresence;
    ClientUser: typeof _Discord.ClientUser;
    Options: typeof _Discord.Options;
    ClientVoiceManager: typeof _Discord.ClientVoiceManager;
    Collection: typeof _Discord.Collection;
    Collector: typeof _Discord.Collector;
    ChatInputCommandInteraction: typeof _Discord.ChatInputCommandInteraction;
    AutocompleteInteraction: typeof _Discord.AutocompleteInteraction;
    CommandInteractionOptionResolver: typeof _Discord.CommandInteractionOptionResolver;
    ContextMenuCommandInteraction: typeof _Discord.ContextMenuCommandInteraction;
    DataResolver: typeof _Discord.DataResolver;
    DMChannel: typeof _Discord.DMChannel;
    Emoji: typeof _Discord.Emoji;
    Guild: typeof _Discord.Guild;
    GuildAuditLogs: typeof _Discord.GuildAuditLogs;
    GuildAuditLogsEntry: typeof _Discord.GuildAuditLogsEntry;
    GuildBan: typeof _Discord.GuildBan;
    GuildChannel: typeof _Discord.GuildChannel;
    GuildEmoji: typeof _Discord.GuildEmoji;
    GuildMember: typeof _Discord.GuildMember;
    GuildPreview: typeof _Discord.GuildPreview;
    GuildScheduledEvent: typeof _Discord.GuildScheduledEvent;
    GuildTemplate: typeof _Discord.GuildTemplate;
    GuildPreviewEmoji: typeof _Discord.GuildPreviewEmoji;
    Integration: typeof _Discord.Integration;
    IntegrationApplication: typeof _Discord.IntegrationApplication;
    IntentsBitField: typeof _Discord.IntentsBitField;
    BaseInteraction: typeof _Discord.BaseInteraction;
    InteractionCollector: typeof _Discord.InteractionCollector;
    InteractionWebhook: typeof _Discord.InteractionWebhook;
    Invite: typeof _Discord.Invite;
    InviteStageInstance: typeof _Discord.InviteStageInstance;
    InviteGuild: typeof _Discord.InviteGuild;
    LimitedCollection: typeof _Discord.LimitedCollection;
    Message: typeof _Discord.Message;
    AttachmentBuilder: typeof _Discord.AttachmentBuilder;
    Attachment: typeof _Discord.Attachment;
    MessageCollector: typeof _Discord.MessageCollector;
    MessageComponentInteraction: typeof _Discord.MessageComponentInteraction;
    MessageContextMenuCommandInteraction: typeof _Discord.MessageContextMenuCommandInteraction;
    MessageFlagsBitField: typeof _Discord.MessageFlagsBitField;
    MessageMentions: typeof _Discord.MessageMentions;
    MessagePayload: typeof _Discord.MessagePayload;
    MessageReaction: typeof _Discord.MessageReaction;
    ModalSubmitFields: typeof _Discord.ModalSubmitFields;
    ModalSubmitInteraction: typeof _Discord.ModalSubmitInteraction;
    NewsChannel: typeof _Discord.NewsChannel;
    OAuth2Guild: typeof _Discord.OAuth2Guild;
    PartialGroupDMChannel: typeof _Discord.PartialGroupDMChannel;
    ForumChannel: typeof _Discord.ForumChannel;
    PermissionOverwrites: typeof _Discord.PermissionOverwrites;
    PermissionsBitField: typeof _Discord.PermissionsBitField;
    Presence: typeof _Discord.Presence;
    ReactionCollector: typeof _Discord.ReactionCollector;
    ReactionEmoji: typeof _Discord.ReactionEmoji;
    RichPresenceAssets: typeof _Discord.RichPresenceAssets;
    Role: typeof _Discord.Role;
    SelectMenuInteraction: typeof _Discord.SelectMenuInteraction;
    Shard: typeof _Discord.Shard;
    ShardClientUtil: typeof _Discord.ShardClientUtil;
    ShardingManager: typeof _Discord.ShardingManager;
    SnowflakeUtil: _sapphire_snowflake.Snowflake;
    StageChannel: typeof _Discord.StageChannel;
    DirectoryChannel: typeof _Discord.DirectoryChannel;
    StageInstance: typeof _Discord.StageInstance;
    Sticker: typeof _Discord.Sticker;
    StickerPack: typeof _Discord.StickerPack;
    Sweepers: typeof _Discord.Sweepers;
    SystemChannelFlagsBitField: typeof _Discord.SystemChannelFlagsBitField;
    Team: typeof _Discord.Team;
    TeamMember: typeof _Discord.TeamMember;
    TextChannel: typeof _Discord.TextChannel;
    ThreadChannel: typeof _Discord.ThreadChannel;
    ThreadMember: typeof _Discord.ThreadMember;
    ThreadMemberFlagsBitField: typeof _Discord.ThreadMemberFlagsBitField;
    Typing: typeof _Discord.Typing;
    User: typeof _Discord.User;
    UserContextMenuCommandInteraction: typeof _Discord.UserContextMenuCommandInteraction;
    UserFlagsBitField: typeof _Discord.UserFlagsBitField;
    Formatters: typeof _Discord.Formatters;
    VoiceChannel: typeof _Discord.VoiceChannel;
    VoiceRegion: typeof _Discord.VoiceRegion;
    VoiceState: typeof _Discord.VoiceState;
    Webhook: typeof _Discord.Webhook;
    WebhookClient: typeof _Discord.WebhookClient;
    WebSocketManager: typeof _Discord.WebSocketManager;
    WebSocketShard: typeof _Discord.WebSocketShard;
    Widget: typeof _Discord.Widget;
    WidgetMember: typeof _Discord.WidgetMember;
    WelcomeChannel: typeof _Discord.WelcomeChannel;
    WelcomeScreen: typeof _Discord.WelcomeScreen;
    Constants: {
        SweeperKeys: (keyof _Discord.SweeperDefinitions)[];
        NonSystemMessageTypes: _Discord.NonSystemMessageType[];
        TextBasedChannelTypes: (_Discord.ChannelType.GuildText | _Discord.ChannelType.DM | _Discord.ChannelType.GuildVoice | _Discord.ChannelType.GuildAnnouncement | _Discord.ChannelType.AnnouncementThread | _Discord.ChannelType.PublicThread | _Discord.ChannelType.PrivateThread)[];
        ThreadChannelTypes: _Discord.ThreadChannelType[];
        VoiceBasedChannelTypes: (_Discord.ChannelType.GuildVoice | _Discord.ChannelType.GuildStageVoice)[];
    };
    version: string;
    DiscordjsErrorCodes: typeof _Discord.DiscordjsErrorCodes;
    DiscordjsError: typeof _Discord.DiscordjsError;
    DiscordjsTypeError: typeof _Discord.DiscordjsTypeError;
    DiscordjsRangeError: typeof _Discord.DiscordjsRangeError;
    BaseManager: typeof _Discord.BaseManager;
    DataManager: typeof _Discord.DataManager;
    CachedManager: typeof _Discord.CachedManager;
    ApplicationCommandManager: typeof _Discord.ApplicationCommandManager;
    ApplicationCommandPermissionsManager: typeof _Discord.ApplicationCommandPermissionsManager;
    BaseGuildEmojiManager: typeof _Discord.BaseGuildEmojiManager;
    CategoryChannelChildManager: typeof _Discord.CategoryChannelChildManager;
    ChannelManager: typeof _Discord.ChannelManager;
    GuildApplicationCommandManager: typeof _Discord.GuildApplicationCommandManager;
    GuildChannelManager: typeof _Discord.GuildChannelManager;
    GuildEmojiManager: typeof _Discord.GuildEmojiManager;
    GuildEmojiRoleManager: typeof _Discord.GuildEmojiRoleManager;
    GuildManager: typeof _Discord.GuildManager;
    GuildMemberManager: typeof _Discord.GuildMemberManager;
    GuildBanManager: typeof _Discord.GuildBanManager;
    GuildInviteManager: typeof _Discord.GuildInviteManager;
    GuildScheduledEventManager: typeof _Discord.GuildScheduledEventManager;
    GuildStickerManager: typeof _Discord.GuildStickerManager;
    GuildMemberRoleManager: typeof _Discord.GuildMemberRoleManager;
    MessageManager: typeof _Discord.MessageManager;
    PermissionOverwriteManager: typeof _Discord.PermissionOverwriteManager;
    PresenceManager: typeof _Discord.PresenceManager;
    ReactionManager: typeof _Discord.ReactionManager;
    ReactionUserManager: typeof _Discord.ReactionUserManager;
    RoleManager: typeof _Discord.RoleManager;
    StageInstanceManager: typeof _Discord.StageInstanceManager;
    ThreadManager: typeof _Discord.ThreadManager;
    GuildTextThreadManager: typeof _Discord.GuildTextThreadManager;
    GuildForumThreadManager: typeof _Discord.GuildForumThreadManager;
    ThreadMemberManager: typeof _Discord.ThreadMemberManager;
    UserManager: typeof _Discord.UserManager;
    VoiceStateManager: typeof _Discord.VoiceStateManager;
    Colors: {
        Default: 0;
        White: 16777215;
        Aqua: 1752220;
        Green: 5763719;
        Blue: 3447003;
        Yellow: 16705372;
        Purple: 10181046;
        LuminousVividPink: 15277667;
        Fuchsia: 15418782;
        Gold: 15844367;
        Orange: 15105570;
        Red: 15548997;
        Grey: 9807270;
        Navy: 3426654;
        DarkAqua: 1146986;
        DarkGreen: 2067276;
        DarkBlue: 2123412;
        DarkPurple: 7419530;
        DarkVividPink: 11342935;
        DarkGold: 12745742;
        DarkOrange: 11027200;
        DarkRed: 10038562;
        DarkGrey: 9936031;
        DarkerGrey: 8359053;
        LightGrey: 12370112;
        DarkNavy: 2899536;
        Blurple: 5793266;
        Greyple: 10070709;
        DarkButNotBlack: 2895667;
        NotQuiteBlack: 2303786;
    };
    Events: typeof _Discord.Events;
    ShardEvents: typeof _Discord.ShardEvents;
    WebSocketShardEvents: typeof _Discord.WebSocketShardEvents;
    Status: typeof _Discord.Status;
    Partials: typeof _Discord.Partials;
    Utils: typeof _Discord.Utils;
    GatewayVersion: "10";
    GatewayOpcodes: typeof _Discord.GatewayOpcodes;
    GatewayCloseCodes: typeof _Discord.GatewayCloseCodes;
    GatewayIntentBits: typeof _Discord.GatewayIntentBits;
    GatewayDispatchEvents: typeof _Discord.GatewayDispatchEvents;
    FormattingPatterns: {
        readonly User: RegExp;
        readonly UserWithNickname: RegExp;
        readonly UserWithOptionalNickname: RegExp;
        readonly Channel: RegExp;
        readonly Role: RegExp;
        readonly SlashCommand: RegExp;
        readonly Emoji: RegExp;
        readonly AnimatedEmoji: RegExp;
        readonly StaticEmoji: RegExp;
        readonly Timestamp: RegExp;
        readonly DefaultStyledTimestamp: RegExp;
        readonly StyledTimestamp: RegExp;
    };
    PermissionFlagsBits: {
        readonly CreateInstantInvite: bigint;
        readonly KickMembers: bigint;
        readonly BanMembers: bigint;
        readonly Administrator: bigint;
        readonly ManageChannels: bigint;
        readonly ManageGuild: bigint;
        readonly AddReactions: bigint;
        readonly ViewAuditLog: bigint;
        readonly PrioritySpeaker: bigint;
        readonly Stream: bigint;
        readonly ViewChannel: bigint; /**
         * Get a simple `ready` and `interactionCreate` event bootstrapped with your Riku.js app -
         * [Learn more](https://vajitsu.com/riku/docs/configuration#presets_events)
         */
        readonly SendMessages: bigint;
        readonly SendTTSMessages: bigint;
        readonly ManageMessages: bigint;
        readonly EmbedLinks: bigint;
        readonly AttachFiles: bigint;
        readonly ReadMessageHistory: bigint;
        readonly MentionEveryone: bigint;
        readonly UseExternalEmojis: bigint;
        readonly ViewGuildInsights: bigint;
        readonly Connect: bigint;
        readonly Speak: bigint;
        readonly MuteMembers: bigint;
        readonly DeafenMembers: bigint;
        readonly MoveMembers: bigint;
        readonly UseVAD: bigint;
        readonly ChangeNickname: bigint;
        readonly ManageNicknames: bigint;
        readonly ManageRoles: bigint;
        readonly ManageWebhooks: bigint;
        readonly ManageEmojisAndStickers: bigint;
        readonly UseApplicationCommands: bigint;
        readonly RequestToSpeak: bigint;
        readonly ManageEvents: bigint;
        readonly ManageThreads: bigint;
        readonly CreatePublicThreads: bigint;
        readonly CreatePrivateThreads: bigint;
        readonly UseExternalStickers: bigint;
        readonly SendMessagesInThreads: bigint;
        readonly UseEmbeddedActivities: bigint;
        readonly ModerateMembers: bigint;
    };
    ApplicationFlags: typeof _Discord.ApplicationFlags;
    AuditLogEvent: typeof _Discord.AuditLogEvent;
    AuditLogOptionsType: typeof _Discord.AuditLogOptionsType;
    AutoModerationRuleTriggerType: typeof _Discord.AutoModerationRuleTriggerType;
    AutoModerationRuleKeywordPresetType: typeof _Discord.AutoModerationRuleKeywordPresetType;
    AutoModerationRuleEventType: typeof _Discord.AutoModerationRuleEventType;
    AutoModerationActionType: typeof _Discord.AutoModerationActionType;
    SortOrderType: typeof _Discord.SortOrderType;
    ChannelType: typeof _Discord.ChannelType;
    VideoQualityMode: typeof _Discord.VideoQualityMode;
    MessageType: typeof _Discord.MessageType;
    MessageActivityType: typeof _Discord.MessageActivityType;
    MessageFlags: typeof _Discord.MessageFlags;
    OverwriteType: typeof _Discord.OverwriteType;
    ThreadAutoArchiveDuration: typeof _Discord.ThreadAutoArchiveDuration;
    ThreadMemberFlags: typeof _Discord.ThreadMemberFlags;
    EmbedType: typeof _Discord.EmbedType;
    AllowedMentionsTypes: typeof _Discord.AllowedMentionsTypes;
    ComponentType: typeof _Discord.ComponentType;
    ButtonStyle: typeof _Discord.ButtonStyle;
    TextInputStyle: typeof _Discord.TextInputStyle;
    ChannelFlags: typeof _Discord.ChannelFlags;
    PresenceUpdateStatus: typeof _Discord.PresenceUpdateStatus;
    ActivityPlatform: typeof _Discord.ActivityPlatform;
    ActivityType: typeof _Discord.ActivityType;
    ActivityFlags: typeof _Discord.ActivityFlags;
    GuildDefaultMessageNotifications: typeof _Discord.GuildDefaultMessageNotifications;
    GuildExplicitContentFilter: typeof _Discord.GuildExplicitContentFilter;
    GuildMFALevel: typeof _Discord.GuildMFALevel;
    GuildNSFWLevel: typeof _Discord.GuildNSFWLevel;
    GuildVerificationLevel: typeof _Discord.GuildVerificationLevel;
    GuildPremiumTier: typeof _Discord.GuildPremiumTier;
    GuildHubType: typeof _Discord.GuildHubType;
    GuildSystemChannelFlags: typeof _Discord.GuildSystemChannelFlags;
    GuildFeature: typeof _Discord.GuildFeature;
    IntegrationExpireBehavior: typeof _Discord.IntegrationExpireBehavior;
    GuildWidgetStyle: typeof _Discord.GuildWidgetStyle;
    MembershipScreeningFieldType: typeof _Discord.MembershipScreeningFieldType;
    GuildScheduledEventEntityType: typeof _Discord.GuildScheduledEventEntityType;
    GuildScheduledEventStatus: typeof _Discord.GuildScheduledEventStatus;
    GuildScheduledEventPrivacyLevel: typeof _Discord.GuildScheduledEventPrivacyLevel; /**
     * Runs the custom status loop if it is defined at `config.customStatus`
     */
    ApplicationCommandType: typeof _Discord.ApplicationCommandType;
    ApplicationCommandOptionType: typeof _Discord.ApplicationCommandOptionType;
    ApplicationCommandPermissionType: typeof _Discord.ApplicationCommandPermissionType;
    APIApplicationCommandPermissionsConstant: {
        Everyone: (guildId: string | bigint) => string;
        AllChannels: (guildId: string | bigint) => string;
    };
    InteractionType: typeof _Discord.InteractionType;
    InteractionResponseType: typeof _Discord.InteractionResponseType;
    InviteTargetType: typeof _Discord.InviteTargetType;
    OAuth2Scopes: typeof _Discord.OAuth2Scopes;
    StageInstancePrivacyLevel: typeof _Discord.StageInstancePrivacyLevel;
    StickerType: typeof _Discord.StickerType;
    StickerFormatType: typeof _Discord.StickerFormatType;
    TeamMemberMembershipState: typeof _Discord.TeamMemberMembershipState;
    UserFlags: typeof _Discord.UserFlags;
    UserPremiumType: typeof _Discord.UserPremiumType;
    ConnectionService: typeof _Discord.ConnectionService;
    ConnectionVisibility: typeof _Discord.ConnectionVisibility;
    WebhookType: typeof _Discord.WebhookType;
    APIVersion: "10";
    Routes: {
        guildAutoModerationRules(guildId: string): `/guilds/${string}/auto-moderation/rules`;
        guildAutoModerationRule(guildId: string, ruleId: string): `/guilds/${string}/auto-moderation/rules/${string}`;
        guildAuditLog(guildId: string): `/guilds/${string}/audit-logs`;
        channel(channelId: string): `/channels/${string}`;
        channelMessages(channelId: string): `/channels/${string}/messages`;
        channelMessage(channelId: string, messageId: string): `/channels/${string}/messages/${string}`;
        channelMessageCrosspost(channelId: string, messageId: string): `/channels/${string}/messages/${string}/crosspost`;
        channelMessageOwnReaction(channelId: string, messageId: string, emoji: string): `/channels/${string}/messages/${string}/reactions/${string}/@me`;
        channelMessageUserReaction(channelId: string, messageId: string, emoji: string, userId: string): `/channels/${string}/messages/${string}/reactions/${string}/${string}`;
        channelMessageReaction(channelId: string, messageId: string, emoji: string): `/channels/${string}/messages/${string}/reactions/${string}`;
        channelMessageAllReactions(channelId: string, messageId: string): `/channels/${string}/messages/${string}/reactions`;
        channelBulkDelete(channelId: string): `/channels/${string}/messages/bulk-delete`;
        channelPermission(channelId: string, overwriteId: string): `/channels/${string}/permissions/${string}`;
        channelInvites(channelId: string): `/channels/${string}/invites`;
        channelFollowers(channelId: string): `/channels/${string}/followers`;
        channelTyping(channelId: string): `/channels/${string}/typing`;
        channelPins(channelId: string): `/channels/${string}/pins`;
        channelPin(channelId: string, messageId: string): `/channels/${string}/pins/${string}`;
        channelRecipient(channelId: string, userId: string): `/channels/${string}/recipients/${string}`;
        guildEmojis(guildId: string): `/guilds/${string}/emojis`;
        guildEmoji(guildId: string, emojiId: string): `/guilds/${string}/emojis/${string}`;
        guilds(): "/guilds";
        guild(guildId: string): `/guilds/${string}`;
        guildPreview(guildId: string): `/guilds/${string}/preview`;
        guildChannels(guildId: string): `/guilds/${string}/channels`;
        guildMember(guildId: string, userId?: string | undefined): `/guilds/${string}/members/${string}`;
        guildMembers(guildId: string): `/guilds/${string}/members`;
        guildMembersSearch(guildId: string): `/guilds/${string}/members/search`;
        guildCurrentMemberNickname(guildId: string): `/guilds/${string}/members/@me/nick`;
        guildMemberRole(guildId: string, memberId: string, roleId: string): `/guilds/${string}/members/${string}/roles/${string}`;
        guildMFA(guildId: string): `/guilds/${string}/mfa`;
        guildBans(guildId: string): `/guilds/${string}/bans`;
        guildBan(guildId: string, userId: string): `/guilds/${string}/bans/${string}`;
        guildRoles(guildId: string): `/guilds/${string}/roles`;
        guildRole(guildId: string, roleId: string): `/guilds/${string}/roles/${string}`;
        guildPrune(guildId: string): `/guilds/${string}/prune`;
        guildVoiceRegions(guildId: string): `/guilds/${string}/regions`;
        guildInvites(guildId: string): `/guilds/${string}/invites`;
        guildIntegrations(guildId: string): `/guilds/${string}/integrations`;
        guildIntegration(guildId: string, integrationId: string): `/guilds/${string}/integrations/${string}`;
        guildWidgetSettings(guildId: string): `/guilds/${string}/widget`;
        guildWidgetJSON(guildId: string): `/guilds/${string}/widget.json`;
        guildVanityUrl(guildId: string): `/guilds/${string}/vanity-url`;
        guildWidgetImage(guildId: string): `/guilds/${string}/widget.png`;
        invite(code: string): `/invites/${string}`;
        template(code: string): `/guilds/templates/${string}`;
        guildTemplates(guildId: string): `/guilds/${string}/templates`;
        guildTemplate(guildId: string, code: string): `/guilds/${string}/templates/${string}`;
        threads(parentId: string, messageId?: string | undefined): `/channels/${string}/threads` | `/channels/${string}/messages/${string}/threads`;
        guildActiveThreads(guildId: string): `/guilds/${string}/threads/active`;
        channelThreads(channelId: string, archivedStatus: "public" | "private"): `/channels/${string}/threads/archived/public` | `/channels/${string}/threads/archived/private`;
        channelJoinedArchivedThreads(channelId: string): `/channels/${string}/users/@me/threads/archived/private`;
        threadMembers(threadId: string, userId?: string | undefined): `/channels/${string}/thread-members` | `/channels/${string}/thread-members/${string}`;
        user(userId?: string | undefined): `/users/${string}`;
        userGuilds(): "/users/@me/guilds";
        userGuildMember(guildId: string): `/users/@me/guilds/${string}/member`;
        userGuild(guildId: string): `/users/@me/guilds/${string}`;
        userChannels(): "/users/@me/channels";
        userConnections(): "/users/@me/connections";
        voiceRegions(): "/voice/regions";
        channelWebhooks(channelId: string): `/channels/${string}/webhooks`;
        guildWebhooks(guildId: string): `/guilds/${string}/webhooks`;
        webhook(webhookId: string, webhookToken?: string | undefined): `/webhooks/${string}` | `/webhooks/${string}/${string}`;
        webhookMessage(webhookId: string, webhookToken: string, messageId?: string | undefined): `/webhooks/${string}/${string}/messages/${string}`;
        webhookPlatform(webhookId: string, webhookToken: string, platform: "github" | "slack"): `/webhooks/${string}/${string}/github` | `/webhooks/${string}/${string}/slack`;
        gateway(): "/gateway";
        gatewayBot(): "/gateway/bot";
        oauth2CurrentApplication(): "/oauth2/applications/@me";
        oauth2CurrentAuthorization(): "/oauth2/@me";
        oauth2Authorization(): "/oauth2/authorize";
        oauth2TokenExchange(): "/oauth2/token";
        oauth2TokenRevocation(): "/oauth2/token/revoke";
        applicationCommands(applicationId: string): `/applications/${string}/commands`;
        applicationCommand(applicationId: string, commandId: string): `/applications/${string}/commands/${string}`;
        applicationGuildCommands(applicationId: string, guildId: string): `/applications/${string}/guilds/${string}/commands`;
        applicationGuildCommand(applicationId: string, guildId: string, commandId: string): `/applications/${string}/guilds/${string}/commands/${string}`;
        interactionCallback(interactionId: string, interactionToken: string): `/interactions/${string}/${string}/callback`;
        guildMemberVerification(guildId: string): `/guilds/${string}/member-verification`;
        guildVoiceState(guildId: string, userId?: string | undefined): `/guilds/${string}/voice-states/${string}`;
        guildApplicationCommandsPermissions(applicationId: string, guildId: string): `/applications/${string}/guilds/${string}/commands/permissions`;
        applicationCommandPermissions(applicationId: string, guildId: string, commandId: string): `/applications/${string}/guilds/${string}/commands/${string}/permissions`;
        guildWelcomeScreen(guildId: string): `/guilds/${string}/welcome-screen`;
        stageInstances(): "/stage-instances";
        stageInstance(channelId: string): `/stage-instances/${string}`;
        sticker(stickerId: string): `/stickers/${string}`;
        nitroStickerPacks(): "/sticker-packs";
        guildStickers(guildId: string): `/guilds/${string}/stickers`;
        guildSticker(guildId: string, stickerId: string): `/guilds/${string}/stickers/${string}`;
        guildScheduledEvents(guildId: string): `/guilds/${string}/scheduled-events`;
        guildScheduledEvent(guildId: string, guildScheduledEventId: string): `/guilds/${string}/scheduled-events/${string}`;
        guildScheduledEventUsers(guildId: string, guildScheduledEventId: string): `/guilds/${string}/scheduled-events/${string}/users`;
    };
    StickerPackApplicationId: "710982414301790216";
    CDNRoutes: {
        emoji(emojiId: string, format: _Discord.EmojiFormat): `/emojis/${string}.jpeg` | `/emojis/${string}.png` | `/emojis/${string}.webp` | `/emojis/${string}.gif`;
        guildIcon(guildId: string, guildIcon: string, format: _Discord.GuildIconFormat): `icons/${string}/${string}.jpeg` | `icons/${string}/${string}.png` | `icons/${string}/${string}.webp` | `icons/${string}/${string}.gif`;
        guildSplash(guildId: string, guildSplash: string, format: _Discord.GuildSplashFormat): `/splashes/${string}/${string}.jpeg` | `/splashes/${string}/${string}.png` | `/splashes/${string}/${string}.webp`;
        guildDiscoverySplash(guildId: string, guildDiscoverySplash: string, format: _Discord.GuildDiscoverySplashFormat): `/discovery-splashes/${string}/${string}.jpeg` | `/discovery-splashes/${string}/${string}.png` | `/discovery-splashes/${string}/${string}.webp`;
        guildBanner(guildId: string, guildBanner: string, format: _Discord.GuildBannerFormat): `/banners/${string}/${string}.jpeg` | `/banners/${string}/${string}.png` | `/banners/${string}/${string}.webp` | `/banners/${string}/${string}.gif`;
        userBanner(userId: string, userBanner: string, format: _Discord.UserBannerFormat): `/banners/${string}/${string}.jpeg` | `/banners/${string}/${string}.png` | `/banners/${string}/${string}.webp` | `/banners/${string}/${string}.gif`;
        defaultUserAvatar(userDiscriminator: _Discord.DefaultUserAvatarAssets): "/embed/avatars/0.png" | "/embed/avatars/2.png" | "/embed/avatars/1.png" | "/embed/avatars/3.png" | "/embed/avatars/4.png" | "/embed/avatars/5.png";
        userAvatar(userId: string, userAvatar: string, format: _Discord.UserAvatarFormat): `/avatars/${string}/${string}.jpeg` | `/avatars/${string}/${string}.png` | `/avatars/${string}/${string}.webp` | `/avatars/${string}/${string}.gif`;
        guildMemberAvatar(guildId: string, userId: string, memberAvatar: string, format: _Discord.GuildMemberAvatarFormat): `/guilds/${string}/users/${string}/avatars/${string}.jpeg` | `/guilds/${string}/users/${string}/avatars/${string}.png` | `/guilds/${string}/users/${string}/avatars/${string}.webp` | `/guilds/${string}/users/${string}/avatars/${string}.gif`;
        applicationIcon(applicationId: string, applicationIcon: string, format: _Discord.ApplicationIconFormat): `/app-icons/${string}/${string}.jpeg` | `/app-icons/${string}/${string}.png` | `/app-icons/${string}/${string}.webp`;
        applicationCover(applicationId: string, applicationCoverImage: string, format: _Discord.ApplicationCoverFormat): `/app-icons/${string}/${string}.jpeg` | `/app-icons/${string}/${string}.png` | `/app-icons/${string}/${string}.webp`;
        applicationAsset(applicationId: string, applicationAssetId: string, format: _Discord.ApplicationAssetFormat): `/app-icons/${string}/${string}.jpeg` | `/app-icons/${string}/${string}.png` | `/app-icons/${string}/${string}.webp`;
        achievementIcon(applicationId: string, achievementId: string, achievementIconHash: string, format: _Discord.AchievementIconFormat): `/app-assets/${string}/achievements/${string}/icons/${string}.jpeg` | `/app-assets/${string}/achievements/${string}/icons/${string}.png` | `/app-assets/${string}/achievements/${string}/icons/${string}.webp`;
        stickerPackBanner(stickerPackBannerAssetId: string, format: _Discord.StickerPackBannerFormat): `/app-assets/710982414301790216/store/${string}.jpeg` | `/app-assets/710982414301790216/store/${string}.png` | `/app-assets/710982414301790216/store/${string}.webp`;
        teamIcon(teamId: string, teamIcon: string, format: _Discord.TeamIconFormat): `/team-icons/${string}/${string}.jpeg` | `/team-icons/${string}/${string}.png` | `/team-icons/${string}/${string}.webp`;
        sticker(stickerId: string, format: _Discord.StickerFormat): `/stickers/${string}.png` | `/stickers/${string}.json`;
        roleIcon(roleId: string, roleIcon: string, format: _Discord.RoleIconFormat): `/role-icons/${string}/${string}.jpeg` | `/role-icons/${string}/${string}.png` | `/role-icons/${string}/${string}.webp`;
        guildScheduledEventCover(guildScheduledEventId: string, guildScheduledEventCoverImage: string, format: _Discord.GuildScheduledEventCoverFormat): `/guild-events/${string}/${string}.jpeg` | `/guild-events/${string}/${string}.png` | `/guild-events/${string}/${string}.webp`;
        guildMemberBanner(guildId: string, userId: string, guildMemberBanner: string, format: _Discord.GuildMemberBannerFormat): `/guilds/${string}/users/${string}/banners/${string}.jpeg` | `/guilds/${string}/users/${string}/banners/${string}.png` | `/guilds/${string}/users/${string}/banners/${string}.webp` | `/guilds/${string}/users/${string}/banners/${string}.gif`;
    };
    ImageFormat: typeof _Discord.ImageFormat;
    RouteBases: {
        readonly api: "https://discord.com/api/v10";
        readonly cdn: "https://cdn.discordapp.com";
        readonly invite: "https://discord.gg";
        readonly template: "https://discord.new";
        readonly gift: "https://discord.gift";
        readonly scheduledEvent: "https://discord.com/events";
    };
    OAuth2Routes: {
        readonly authorizationURL: "https://discord.com/api/v10/oauth2/authorize";
        readonly tokenURL: "https://discord.com/api/v10/oauth2/token";
        readonly tokenRevocationURL: "https://discord.com/api/v10/oauth2/token/revoke";
    };
    RESTJSONErrorCodes: typeof _Discord.RESTJSONErrorCodes;
    Locale: typeof _Discord.Locale;
    RPCErrorCodes: typeof _Discord.RPCErrorCodes;
    RPCCloseEventCodes: typeof _Discord.RPCCloseEventCodes;
    ApplicationCommandNumericOptionMinMaxValueMixin: typeof _Discord.ApplicationCommandNumericOptionMinMaxValueMixin;
    ApplicationCommandOptionBase: typeof _Discord.ApplicationCommandOptionBase;
    ApplicationCommandOptionChannelTypesMixin: typeof _Discord.ApplicationCommandOptionChannelTypesMixin;
    ApplicationCommandOptionWithChoicesAndAutocompleteMixin: typeof _Discord.ApplicationCommandOptionWithChoicesAndAutocompleteMixin;
    ComponentAssertions: typeof _Discord.ComponentAssertions;
    ComponentBuilder: typeof _Discord.ComponentBuilder;
    ContextMenuCommandAssertions: typeof _Discord.ContextMenuCommandAssertions;
    ContextMenuCommandBuilder: typeof _Discord.ContextMenuCommandBuilder;
    EmbedAssertions: typeof _Discord.EmbedAssertions;
    Faces: typeof _Discord.Faces;
    ModalAssertions: typeof _Discord.ModalAssertions;
    SharedNameAndDescription: typeof _Discord.SharedNameAndDescription;
    SharedSlashCommandOptions: typeof _Discord.SharedSlashCommandOptions;
    SlashCommandAssertions: typeof _Discord.SlashCommandAssertions;
    SlashCommandAttachmentOption: typeof _Discord.SlashCommandAttachmentOption;
    SlashCommandBooleanOption: typeof _Discord.SlashCommandBooleanOption;
    SlashCommandBuilder: typeof _Discord.SlashCommandBuilder;
    SlashCommandChannelOption: typeof _Discord.SlashCommandChannelOption;
    SlashCommandIntegerOption: typeof _Discord.SlashCommandIntegerOption;
    SlashCommandMentionableOption: typeof _Discord.SlashCommandMentionableOption;
    SlashCommandNumberOption: typeof _Discord.SlashCommandNumberOption;
    SlashCommandRoleOption: typeof _Discord.SlashCommandRoleOption;
    SlashCommandStringOption: typeof _Discord.SlashCommandStringOption;
    SlashCommandSubcommandBuilder: typeof _Discord.SlashCommandSubcommandBuilder;
    SlashCommandSubcommandGroupBuilder: typeof _Discord.SlashCommandSubcommandGroupBuilder;
    SlashCommandUserOption: typeof _Discord.SlashCommandUserOption;
    TextInputAssertions: typeof _Discord.TextInputAssertions;
    TimestampStyles: {
        readonly ShortTime: "t";
        readonly LongTime: "T";
        readonly ShortDate: "d";
        readonly LongDate: "D";
        readonly ShortDateTime: "f";
        readonly LongDateTime: "F";
        readonly RelativeTime: "R";
    };
    blockQuote: typeof _Discord.blockQuote;
    bold: typeof _Discord.bold;
    channelLink: typeof _Discord.channelLink;
    channelMention: typeof _Discord.channelMention;
    chatInputApplicationCommandMention: typeof _Discord.chatInputApplicationCommandMention;
    codeBlock: typeof _Discord.codeBlock;
    disableValidators: () => boolean;
    embedLength: typeof _Discord.embedLength;
    enableValidators: () => boolean;
    formatEmoji: typeof _Discord.formatEmoji;
    hideLinkEmbed: typeof _Discord.hideLinkEmbed;
    hyperlink: typeof _Discord.hyperlink;
    inlineCode: typeof _Discord.inlineCode;
    isValidationEnabled: () => boolean;
    italic: typeof _Discord.italic;
    messageLink: typeof _Discord.messageLink;
    normalizeArray: typeof _Discord.normalizeArray;
    quote: typeof _Discord.quote;
    roleMention: typeof _Discord.roleMention;
    spoiler: typeof _Discord.spoiler;
    strikethrough: typeof _Discord.strikethrough;
    time: typeof _Discord.time;
    underscore: typeof _Discord.underscore;
    userMention: typeof _Discord.userMention;
    isEquatable: typeof _Discord.isEquatable;
    isJSONEncodable: typeof _Discord.isJSONEncodable;
    lazy: typeof _Discord.lazy;
    range: typeof _Discord.range;
    ALLOWED_EXTENSIONS: readonly ["webp", "png", "jpg", "jpeg", "gif"];
    ALLOWED_SIZES: readonly [16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
    ALLOWED_STICKER_EXTENSIONS: readonly ["png", "json"];
    CDN: typeof _Discord.CDN;
    DefaultRestOptions: Required<_Discord.RESTOptions>;
    DefaultUserAgent: "DiscordBot (https://discord.js.org, [VI]{{inject}}[/VI])";
    DiscordAPIError: typeof _Discord.DiscordAPIError;
    HTTPError: typeof _Discord.HTTPError;
    REST: typeof _Discord.REST;
    RESTEvents: typeof _Discord.RESTEvents;
    RateLimitError: typeof _Discord.RateLimitError;
    RequestManager: typeof _Discord.RequestManager;
    RequestMethod: typeof _Discord.RequestMethod;
    makeURLSearchParams: typeof _Discord.makeURLSearchParams;
    parseResponse: typeof _Discord.parseResponse;
};

export { Config, Discord, bot, button, command, event, utilities as utils };
