import * as riku from "riku";
import * as config from "config";

import * as dotenv from "dotenv";
dotenv.config();

/* Initialize Riku Bot Instance */
const bot = new riku.bot({
  ...config.get("discord.client"),
  presets: {
    events: true,
    commands: true,
  },
});

export default bot;
