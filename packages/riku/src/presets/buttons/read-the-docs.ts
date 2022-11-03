import Discord from "discord.js";
import button from "@/builders/button";

export default class readTheDocs extends button {
  label = "Read The Docs";
  url = "https://vajitsu.com/riku/docs";
  style = Discord.ButtonStyle.Link;
}
