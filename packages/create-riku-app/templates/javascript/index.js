const riku = require("riku");
const config = require("config");

const dotenv = require("dotenv");
dotenv.config();

/* Initialize Riku Bot Instance */
const bot = new riku.bot({
  ...config.get("discord.client"),
  presets: {
    events: true,
    commands: true
  },
});

export default bot;
