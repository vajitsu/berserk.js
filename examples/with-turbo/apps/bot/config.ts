import { Discord, Config } from "riku";

import * as dotenv from "dotenv";
dotenv.config();

export default {
  token: process.env.DISCORD_TOKEN,
  application: {
    id: "your-application-id-goes-here",
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
} as Config;
