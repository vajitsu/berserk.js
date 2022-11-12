import Discord from 'discord.js';

declare abstract class ActionRow {
    abstract components: Array<Discord.AnyComponentBuilder>;
    private row;
    build(): Discord.APIActionRowComponent<Discord.APIMessageActionRowComponent> | Discord.JSONEncodable<Discord.APIActionRowComponent<Discord.APIMessageActionRowComponent>> | Discord.ActionRowData<Discord.MessageActionRowComponentBuilder | Discord.MessageActionRowComponentData>;
}

declare abstract class SelectMenu {
    abstract id: string;
    abstract placeholder: string;
    disabled?: boolean;
    maxValues?: number;
    minValues?: number;
    abstract options: Discord.RestOrArray<Discord.SelectMenuComponentOptionData | Discord.APISelectMenuOption | Discord.SelectMenuOptionBuilder>;
    private selectMenu;
    build(): Discord.SelectMenuBuilder;
}

declare abstract class InteractiveButton {
    abstract data: Partial<Discord.APIButtonComponentWithCustomId>;
    abstract run(interaction: Discord.ButtonInteraction, client: Discord.Client): Promise<void>;
}

declare abstract class Button {
    abstract id: string;
    /**
     * The text display on your button -
     * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId#label)
     */
    abstract label: string;
    /**
     * Esstentially the background color of your button -
     * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/enum/ButtonStyle)
     */
    abstract style: "primary" | "secondary" | "success" | "danger" | "link";
    /** Whether or not users will be able to interact with the button -
     * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId#disabled)
     */
    disabled?: boolean;
    /**
     * Attachs an emoji to the left side of your button -
     * [Discord API Type](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId#emoji)
     */
    emoji?: Discord.ComponentEmojiResolvable;
    url?: string;
    private button;
    /**
     * Builds your button and returns the output -
     * [Learn More](https://discord-api-types.dev/api/discord-api-types-v10/interface/APIButtonComponentWithCustomId)
     */
    build(): Discord.ButtonBuilder;
}

declare const UI: {
    ActionRow: typeof ActionRow;
    SelectMenu: typeof SelectMenu;
    Button: typeof Button;
    InteractiveButton: typeof InteractiveButton;
};

export { UI as default };
