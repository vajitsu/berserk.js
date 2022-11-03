import { bot } from "index";
import utils from "src/utils";
import event from "event";

export default class readyEvent extends event<"ready"> {
  constructor(instance: bot) {
    super(instance, utils.events.ClientReady);
  }

  private first = true;

  public async run() {
    console.log(`Logged in as ${this.instance?.client.user?.tag}`);

    if (this.instance.config.customStatus) this.instance.customStatusLoop();

    this.instance.ready = true;
    this.first = false;
  }
}
