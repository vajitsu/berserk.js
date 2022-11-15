import Discord from "discord.js";
import { Bot } from "../dist";

declare type ModalData = {
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
declare function ModalData(
  data: ModalData
): Partial<Discord.APISelectMenuComponent>;
declare abstract class Modal {
  abstract data: Partial<Discord.APISelectMenuComponent>;
  abstract run(
    interaction: Discord.SelectMenuInteraction,
    bot: Bot
  ): Promise<void>;
}

export { ModalData, Modal as default };
