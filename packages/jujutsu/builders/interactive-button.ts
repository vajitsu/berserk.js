import Discord from "discord.js";

type RegularButton = {
  customId: string;
  label: string;
  style: "primary" | "secondary" | "success" | "danger";
  disabled?: boolean;
  emoji?: Discord.ComponentEmojiResolvable;
};

type URLButton = {
  label: string;
  style: "link";
  disabled?: boolean;
  emoji?: Discord.ComponentEmojiResolvable;
  url: string;
};

type ButtonData = RegularButton;

export function ButtonData(
  data: ButtonData
): Partial<Discord.APIButtonComponent> {
  const button = new Discord.ButtonBuilder();

  switch (data.style) {
    case "primary":
      button.setStyle(1);
      break;
    case "secondary":
      button.setStyle(2);
      break;
    case "success":
      button.setStyle(3);
      break;
    case "danger":
      button.setStyle(4);
      break;
    // case "link":
    //   button.setStyle(5);
    //   break;
  }

  button.setLabel(data.label);

  if (data.emoji) button.setEmoji(data.emoji);
  if (typeof data.disabled === "boolean") button.setDisabled(data.disabled);

  //if (data.style === "link") button.setURL(data.url);
  /*else*/ button.setCustomId(data.customId);

  return button.data;
}

export default abstract class InteractiveButton {
  abstract data: Partial<Discord.APIButtonComponentWithCustomId>;

  abstract run(
    interaction: Discord.ButtonInteraction,
    client: Discord.Client
  ): Promise<void>;
}
