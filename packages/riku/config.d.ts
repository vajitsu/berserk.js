import Discord from 'discord.js';

declare type config$1 = {
  /**
   * Environmental variables used within the Riku.js app directories/files
   */
  env?: string[];
  /**
   * Discord Configurations
   */
  discord: discordConfig;
};
/**
 * Configuration of bot, defined when initiating `bot` class
 */
declare type discordConfig = {
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

declare function config(options: config$1): config$1;

export { config as default };
