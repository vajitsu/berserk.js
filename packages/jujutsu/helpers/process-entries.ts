import chalk from "chalk";
import _ from "lodash";
import Discord from "discord.js";
import { msg } from "../src/helpers/chalk";

export default function processEntries(unfiltered: {
  commands: {
    name: string;
    data?: string | undefined;
    execute?: string | undefined;
  }[];
  events: {
    name: string;
    execute?: string | undefined;
  }[];
}) {
  const validEvents = Object.values(Discord.Events) as string[];

  for (const entry of unfiltered.commands) {
    if (!entry.data && !entry.execute) {
      console.log(
        msg.warn(
          `Skipping command ${chalk.bold(
            entry.name
          )}, missing *data.js* or *command.js*`
        )
      );
    } else if (!entry.data) {
      console.log(
        msg.warn(
          `Skipping command ${chalk.bold(entry.name)}, missing *data.js*`
        )
      );
    } else if (!entry.execute) {
      console.log(
        msg.warn(
          `Skipping command ${chalk.bold(entry.name)}, missing *command.js*`
        )
      );
    }
  }

  for (const entry of unfiltered.events) {
    if (!entry.execute) {
      console.log(
        msg.error(
          `Skipping event ${chalk.bold(entry.name)}}, missing *event.js*`
        )
      );
    } else if (!validEvents.includes(entry.name)) {
      console.log(
        msg.warn(
          `Skipping event \"${chalk.bold(entry.name)}\", not a valid event name`
        )
      );
    }
  }

  const filtered_commands = unfiltered.commands.filter(
    (c) => c.data && c.execute
  ) as {
    name: string;
    data: string;
    execute: string;
  }[];

  const filtered_events = unfiltered.events.filter(
    (e) => e.execute && validEvents.includes(e.name)
  ) as {
    name: string;
    data: string;
    execute: string;
  }[];

  return {
    commands: filtered_commands,
    events: filtered_events,
  };
}
