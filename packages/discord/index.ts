import * as Discord from "discord.js"

// Managers
import eventManager from "./managers/events";

// discord.js Enums
export const gatewayIntent = Discord.GatewayIntentBits;
export const partials = Discord.Partials;

export class bot {
    public static instance: bot;

    public directory = __dirname;

    public client: Discord.Client;
    public eventManager: eventManager;

    public ready = false;
    public options: {
        token: string,
        presetEvents?: boolean,
        options: Discord.ClientOptions,
    };

    constructor(
        _options: {
            token: string,
            presetEvents?: boolean,
            options: Discord.ClientOptions,
        }
    ) {
        this.options = _options;
        if (typeof _options.presetEvents === "undefined") this.options.presetEvents = true;

        bot.instance = this;
        this.client = new Discord.Client(_options.options);
        this.eventManager = new eventManager(this);

        this.init();
    }

    private async init() {
        console.log("Logging in to Discord...");
        await this.client.login(this.options.token);
  }
}