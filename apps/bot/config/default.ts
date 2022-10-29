import * as Discord from "discord.js";

export default {
  discord: {
    client: {
      token:
        "",
      application: {
        id: "",
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
