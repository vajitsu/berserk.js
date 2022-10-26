import event from "./event";
import { bot } from "../../index"

// Preset Events
import readyEvent from "../../events/ready"

export default class eventManager {
    constructor(private instance: bot) {
        this.registerEvents();
    }

    private registerEvents() {
        if (
            typeof bot.instance.options.presetEvents === "boolean" 
            && bot.instance.options.presetEvents
        ) {
            this.registerEvent(new readyEvent(this.instance));
        }
    }

    private registerEvent(event: event<any>) {
        this.instance.client.on(event.name, event.run.bind(event));
    }
}