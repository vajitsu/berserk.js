
import * as Discord from "discord.js";

export default {
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
  