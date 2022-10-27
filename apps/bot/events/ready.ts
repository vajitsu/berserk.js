import { event, bot } from "mizu.js";

export default class readyEvent extends event<"ready"> {
  constructor(protected instance: bot) {
    super(instance, "ready");
  }

  async run() {
    console.log("Hello World!");
  }
}
