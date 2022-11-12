const discord = require("discord.js");
const config = require("riku/config");

module.exports = config({
  discord: {
    token: "your-token-goes-here",
    application: {
      id: "your-application-id-goes-here",
    },
    options: {
      intents: [
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildMessages,
      ],
    }
  },
});
