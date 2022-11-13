import Discord from 'discord.js';

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

export { Button as default };
