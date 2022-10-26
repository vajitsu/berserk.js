import event from "../managers/events/event"
import { bot } from "../";

export default class readyEvent extends event<"ready"> {
    constructor(instance: bot) {
        super(instance, "ready");
    }

    private first = true;

    public async run() {
        console.log(`Logged in as ${this.instance?.client.user?.tag}`);

        this.instance.ready = true;
        this.first = false;
    }
}