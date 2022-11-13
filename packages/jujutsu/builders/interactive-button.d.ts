import Discord from 'discord.js';

declare type URLButton = {
    label: string;
    style: "link";
    disabled?: boolean;
    emoji?: Discord.ComponentEmojiResolvable;
    url: string;
};
declare type ButtonData = {
    customId: string;
    label: string;
    style: "primary" | "secondary" | "success" | "danger";
    disabled?: boolean;
    emoji?: Discord.ComponentEmojiResolvable;
};
declare function ButtonData(data: ButtonData): Partial<Discord.APIButtonComponentWithCustomId>;
declare abstract class InteractiveButton {
    abstract data: Partial<Discord.APIButtonComponentWithCustomId>;
    abstract run(interaction: Discord.ButtonInteraction, client: Discord.Client): Promise<void>;
}

export { ButtonData, URLButton, InteractiveButton as default };
