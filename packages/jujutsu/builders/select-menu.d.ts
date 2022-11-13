import Discord from 'discord.js';

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

export { SelectMenu as default };
