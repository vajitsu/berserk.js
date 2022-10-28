import * as Discord from "discord.js";

export default {
  discord: {
    client: {
      token:
        "MTAzNDU4NzQxODQ5MTM3NTc5MQ.G9SXXh.jLHDx4chwE4rrfDM_akyFlKb6q4hO6w0XTKPOw",
      application: {
        id: "1034587418491375791",
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
