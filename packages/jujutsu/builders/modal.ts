import Discord from "discord.js";
import { Bot } from "../src/index";

type ModalData = {
  placeholder?: string;
  options?: Array<{
    label: string;
    description?: string;
    value: string;
  }>;
  disabled?: boolean;
  maxValues?: number;
  minValues?: number;
};

export function ModalData(data: ModalData) {
  const select_menu = new Discord.SelectMenuBuilder(data);
  return select_menu.data;
}

export default abstract class Modal {
  abstract data: Partial<Discord.APISelectMenuComponent>;

  abstract run(
    interaction: Discord.SelectMenuInteraction,
    bot: Bot
  ): Promise<void>;
}
