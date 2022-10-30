const riku = require("riku");

const bot = new riku.bot({
  token: "your-token-goes-here",
  application: {
    id: "your-app-id-goes-here",
  },
  options: {
    intents: [
      riku.Discord.GatewayIntentBits.Guilds,
      riku.Discord.GatewayIntentBits.GuildMessages,
    ],
  },
  presets: {
    events: true,
    commands: true,
  },
});

module.exports = bot;
