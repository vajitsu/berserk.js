const { Discord } = require("riku");

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  token: process.env.DISCORD_TOKEN,
  application: {
    id: "your-app-id-goes-here",
  },
  options: {
    intents: [
      Discord.GatewayIntentBits.Guilds,
      Discord.GatewayIntentBits.GuildMessages,
    ],
  },
  presets: {
    events: true,
    commands: true,
  },
};
