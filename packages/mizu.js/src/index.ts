import * as Discord from "discord.js"

// Managers
import eventManager from "./managers/events";
import commandManager from "./managers/commands";

interface Config {
    token: string,
    application: {
        id: string
    },
    presets: {
        events: boolean,
        commands: boolean
    },
    options: Discord.ClientOptions,
};

export class bot {
    public static instance: bot;
    public appId: string;

    public directory = __dirname;

    public client: Discord.Client;
    public eventManager: eventManager;
    public commandManager: commandManager;

    public ready = false;
    public config: Config;

    constructor(configuration: Config) {
        if (typeof configuration.presets.events === "undefined") configuration.presets.events = true;

        this.config = configuration;
        bot.instance = this;

        this.client = new Discord.Client(configuration.options);
        this.appId = this.client.application?.id as string;
        this.eventManager = new eventManager(this);
        this.commandManager = new commandManager(this);

        this.init();
    }

    private async init() {
        console.log("Logging in to Discord...");
        await this.client.login(this.config.token);
  }
}