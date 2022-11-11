import Discord from 'discord.js';

declare type SlashCommandError = {
    permission: number;
    other: Error;
};
declare type JujutsuConfig = {
    /**
     * Environmental variables used within the Jujutsu.js app directories/files
     */
    env?: string[];
    /**
     * Discord Configurations
     */
    discord: DiscordConfig;
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

declare function defineConfig(options: JujutsuConfig): JujutsuConfig;

export { defineConfig as default };
