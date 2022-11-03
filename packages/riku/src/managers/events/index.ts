import chalk from "chalk";
import event from "event";
import { bot } from "index";

// Preset Events
import readyEvent from "@/presets/events/ready";
import interactionCreate from "@/presets/events/interaction-create";

export default class eventManager {
  private events: { [name: string]: event<any> } = {};

  constructor(private instance: bot) {
    if (
      typeof bot.instance.config.presets.events === "boolean" &&
      bot.instance.config.presets.events
    )
      this.registerEvents();
  }

  private registerEvents() {
    this._registerEvent(new readyEvent(this.instance));
    this._registerEvent(new interactionCreate(this.instance));
  }

  private _registerEvent(event: event<any>) {
    this.events[event.name] = event;
    this.instance.client.on(event.name, event.run.bind(event));
  }

  public registerEvent(event: event<any>) {
    if (
      typeof bot.instance.config.presets.events === "boolean" &&
      bot.instance.config.presets.events
    ) {
      console.warn(
        `${chalk.black.bgYellow(" WARNING ")} ${chalk.red(
          `Add events by opting-out of the event preset`
        )}`
      );
      return;
    }
    if (
      event.name !== "interactionCreate" &&
      !this.getEvent("interactionCreate") &&
      typeof bot.instance.config.presets.commands === "boolean" &&
      bot.instance.config.presets.commands
    )
      console.warn(
        `${chalk.black.bgYellow(" WARNING ")} ${chalk.red(
          `The 'interactionCreate' event is missing\nThis is required to use preset slash commands\nPlease create or opt-in to preset events`
        )}`
      );
    this.events[event.name] = event;
    this.instance.client.on(event.name, event.run.bind(event));
  }

  public getEvent(name: string) {
    return this.events[name];
  }

  public getEvents() {
    return Object.values(this.events);
  }
}
