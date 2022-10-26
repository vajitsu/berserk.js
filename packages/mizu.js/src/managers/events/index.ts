import event from "./event";
import { bot } from "../.."

// Preset Events
import readyEvent from "presets/events/ready"

export default class eventManager {
    constructor(private instance: bot) {
        this.registerEvents();
    }

    private registerEvents() {
        if (
            typeof bot.instance.config.presets.events === "boolean" 
            && bot.instance.config.presets.events
        ) {
            this.registerEvent(new readyEvent(this.instance));
            // this.registerEvent()
        }
    }

    private registerEvent(event: event<any>) {
        this.instance.client.on(event.name, event.run.bind(event));
    }
}