import { event, bot } from "riku";

export default class readyEvent extends event<"ready"> {
  constructor(protected instance: bot) {
    super(instance, "ready");
  }

  async run() {
    console.log("Hello World!");
  }
}
