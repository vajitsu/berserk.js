const Discord = require("discord.js")

module.exports = {
  discord: {
    client: {
      token: "token",
      application: {
        id: "application_id",
      },
      options: {
        intents: [
          Discord.GatewayIntentBits.Guilds,
          Discord.GatewayIntentBits.GuildMessages
        ],
      },
    },
  },
};
