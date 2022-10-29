const riku = require("riku");
const config = require("config");

const dotenv = require("dotenv");
dotenv.config();

const bot = new riku.bot({
    ...config.get("discord.client"),
    presets: {
        events: true,
        commands: true,
    },
})

module.exports = bot;