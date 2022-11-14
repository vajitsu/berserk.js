import Discord from "discord.js";
import { Bot } from "../src/index";

type ModalData = {
  title: string;
  components: (
    | Discord.JSONEncodable<
        Discord.APIActionRowComponent<Discord.APIModalActionRowComponent>
      >
    | Discord.ActionRowData<Discord.ModalActionRowComponentData>
  )[];
};

export function ModalData(data: ModalData) {
  const modal = new Discord.ModalBuilder(data);
  return modal.data;
}

export default abstract class Modal {
  abstract data: Partial<Discord.APIModalInteractionResponseCallbackData>;

  abstract run(
    interaction: Discord.SelectMenuInteraction,
    bot: Bot
  ): Promise<void>;
}
