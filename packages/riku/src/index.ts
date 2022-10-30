import * as _Discord from "discord.js";

import command from "src/managers/commands/command";
import commandManager from "./managers/commands";
import eventManager from "./managers/events";
import utils from "utils";
import button from "button";
import event from "event";

export type Config = {
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

export {
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
  command,
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
  event,
  button,
  utils,
};

export class bot {
  /**
   * An instance of the bot class - Can be used **without** initializing `bot` class
   */
  public static instance: bot;

  /**
   * Your Discord Application's Id - Can be used **without** initializing `bot` class
   */
  public appId: string;

  /**
   * The directory your bot is being run in
   */
  public directory = __dirname;

  /**
   * Instance of a Discord bot client
   */
  public client: _Discord.Client;

  /**
   * All-in-one event manager, without the hassle!
   */
  public eventManager: eventManager;

  /**
   * All-in-one s(slash) command manager, without the hassle!
   */
  public commandManager: commandManager;

  /**
   * If `ready` event has successfully executed
   */
  public ready = false;

  /**
   * Configuration of bot, defined when initiating `bot` class
   */
  public config: Config;

  constructor(
    /**
     * Configuration of bot, accessible at `config` when initiating `bot` class
     */
    configuration: Config
  ) {
    if (typeof configuration.presets.events === "undefined")
      configuration.presets.events = true;

    this.config = configuration;
    bot.instance = this;

    console.log(this.config);

    this.client = new Discord.Client(configuration.options);
    this.appId = this.client.application?.id as string;
    this.eventManager = new eventManager(this);
    this.commandManager = new commandManager(this);

    this.init();
  }

  /**
   * Login to your Discord bot
   */
  private async init() {
    console.log("Logging in to Discord...");
    await this.client.login(this.config.token);
  }

  /**
   * Runs the custom status loop if it is defined at `config.customStatus`
   */
  public async customStatusLoop() {
    if (!this.config.customStatus) return;

    this.client.user?.setPresence(this.config.customStatus);

    setTimeout(this.customStatusLoop.bind(this), 1000 * 60 * 15); // Update every 15 minutes
  }
}

export const Discord = {
  ..._Discord,
};
