import * as Discord from "discord.js";
import { GuildInteraction } from "utils";
import Command from "./command";
import * as uuid from "uuid";
import { bot } from "index";

// Preset Commands
import helloCommand from "@/presets/commands/hello";
import chalk from "chalk";

export default class commandManager {
  private interactive: {
    [id: string]: (() => void | Promise<void>) | void;
  } = {};
  private running: Array<string> = [];
  private commands: { [name: string]: Command } = {};
  private lastCommandUsage: { [key: string]: number } = {};

  constructor(private instance: bot) {
    if (
      typeof this.instance.config.presets.commands === "boolean" &&
      this.instance.config.presets.commands
    ) {
      this.registerCommands();
    } else if (this.getCommands().length > 0) {
      this.loadCommands();
    } else
      console.warn(
        `${chalk.black.bgYellow(" WARNING ")} ${chalk.red(
          `No slash commands added, shuting down command manager...`
        )}`
      );
  }
  public isRunning(id: string) {
    return this.running.includes(id);
  }
  public async run(
    interaction: Discord.ChatInputCommandInteraction & GuildInteraction
  ) {
    if (
      !interaction.user ||
      interaction.user.bot ||
      !interaction.guild ||
      !interaction.channel ||
      !interaction.channel.isTextBased()
    )
      return;

    const command = this.getCommand(interaction.commandName);
    if (!command) return;

    const channel = interaction.channel;

    const requiredPermissions = new Discord.PermissionsBitField(
      await command.calculatePermissions(interaction)
    );
    const channelPermissions = !channel.isDMBased()
      ? channel.permissionsFor(String(this.instance.client.user?.id)) ||
        new Discord.PermissionsBitField()
      : null;

    const missing = channelPermissions
      ? (requiredPermissions.bitfield as any) &
        ~(channelPermissions.bitfield as any)
      : null;

    if (missing) {
      if (channelPermissions?.has(Discord.PermissionFlagsBits.SendMessages)) {
        return void (await interaction.reply(
          "> **Permissions Error!**\n" +
            "This bot is missing the required permissions to run this command."
        ));
      } else {
        return void (await interaction.user.send(
          "> **Permissions Error!**\n" +
            "Grant this bot `Send Messages` to execute commands."
        ));
      }
    }

    const id = uuid.v4();
    const unhookInteraction = () => {
      const index = this.running.indexOf(id);
      if (index > -1) {
        this.running.splice(index, 1);
        this.interactive[interaction.user.id] = void 0;
      }
    };

    try {
      const interactive = this.interactive[interaction.user.id];
      if (interactive) {
        try {
          await interactive();
        } catch (error) {}
        this.interactive[interaction.user.id] = void 0;
        return;
      }
      if (command.interactive) {
        this.running.push(id);
        this.interactive[interaction.user.id] = async () => {
          const index = this.running.indexOf(id);
          if (index > -1) this.running.splice(index, 1);
          await channel.send(`> ${command.interactive}`);
        };
      }

      await command.run(interaction, id, unhookInteraction);
    } catch (error) {
      await interaction.reply("> **Command Error!**\n" + `${error}`);
      console.error(`Catched error while command execution!`, error);
    } finally {
      unhookInteraction();
    }
  }

  private registerCommands() {
    if (
      typeof this.instance.config.presets.commands === "boolean" &&
      this.instance.config.presets.commands
    ) {
      this._registerCommand(new helloCommand(this.instance));
    }

    this.loadCommands();
  }

  private _registerCommand(command: Command) {
    this.commands[command.data.toJSON().name.toLowerCase()] = command;
  }

  public registerCommand(command: Command) {
    if (
      typeof bot.instance.config.presets.commands === "boolean" &&
      bot.instance.config.presets.commands
    ) {
      console.warn(
        `${chalk.black.bgYellow(" WARNING ")} ${chalk.red(
          `Add commands by opting-out of the comand preset`
        )}`
      );
      return;
    }
    this.commands[command.data.toJSON().name.toLowerCase()] = command;
  }

  public getCommand(name: string) {
    let command: Command | undefined = this.commands[name.toLowerCase()];
    return command;
  }

  public getCommands() {
    return Object.values(this.commands);
  }

  private loadCommands() {
    const rest = new Discord.REST().setToken(this.instance.config.token);

    const _commands = this.getCommands();
    var commands: Discord.RESTPostAPIChatInputApplicationCommandsJSONBody[] =
      [];

    _commands.forEach((command) => {
      commands.push(command.data.toJSON());
    });

    (async () => {
      try {
        console.log(
          `Refreshing ${commands.length} application (slash) commands.`
        );
        const data = (await rest.put(
          Discord.Routes.applicationCommands(
            this.instance.config.application.id
          ),
          { body: commands }
        )) as Discord.RESTPutAPIApplicationCommandsResult;
        console.log(
          `Successfully reloaded ${data.length} application (slash) commands.`
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }
}
