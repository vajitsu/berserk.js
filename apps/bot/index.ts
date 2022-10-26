import * as mizu from "mizu.js";
import * as config from "config";

import * as dotenv from "dotenv";
dotenv.config();

export default new mizu.bot(config.get("discord.client"));