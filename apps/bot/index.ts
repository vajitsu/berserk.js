import * as discord from "discord";
import * as config from "config";

import * as dotenv from "dotenv";
dotenv.config();

export default new discord.bot(config.get("discord.client"));