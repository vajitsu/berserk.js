import * as mizu from "mizu.js";
import * as config from "config";

/* Events */
import readyEvent from "./events/ready";

/* Setup ENV to change 'config' settings */
import * as dotenv from "dotenv";
dotenv.config();

/* Initialize Mizu Bot Instance */
const bot = new mizu.bot(config.get("discord.client"));

/* Load Custom Events */
bot.eventManager.registerEvent(new readyEvent(bot));

export default bot;
