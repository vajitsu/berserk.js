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
  buttons: {
    name: string;
    data?: string | undefined;
    execute?: string | undefined;
  }[];
  events: {
    name: string;
    execute?: string | undefined;
  }[];
  modals: {
    name: string;
    data?: string | undefined;
    execute?: string | undefined;
  }[];
  selectMenus: {
    name: string;
    data?: string | undefined;
    execute?: string | undefined;
  }[];
  contextMenus: {
    name: string;
    data?: string | undefined;
    execute?: string | undefined;
  }[];
}) {
  const validEvents = Object.values(Discord.Events) as string[];

  for (const entry of unfiltered.commands) {
    if (!entry.data && !entry.execute) {
      console.log(
        msg.warn(
          `Skipping command "${chalk.bold(
            entry.name
          )}", missing *data.js* or *command.js*`
        )
      );
    } else if (!entry.data) {
      console.log(
        msg.warn(
          `Skipping command "${chalk.bold(entry.name)}", missing *data.js*`
        )
      );
    } else if (!entry.execute) {
      console.log(
        msg.warn(
          `Skipping command "${chalk.bold(entry.name)}", missing *command.js*`
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

  for (const entry of unfiltered.buttons) {
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
          `Skipping button "${chalk.bold(entry.name)}", missing *data.js*`
        )
      );
    } else if (!entry.execute) {
      console.log(
        msg.warn(
          `Skipping button "${chalk.bold(entry.name)}", missing *button.js*`
        )
      );
    }
  }

  for (const entry of unfiltered.modals) {
    if (!entry.data && !entry.execute) {
      console.log(
        msg.warn(
          `Skipping modal "${chalk.bold(
            entry.name
          )}", missing *data.js* or *modal.js*`
        )
      );
    } else if (!entry.data) {
      console.log(
        msg.warn(
          `Skipping modal "${chalk.bold(entry.name)}", missing *data.js*`
        )
      );
    } else if (!entry.execute) {
      console.log(
        msg.warn(
          `Skipping modal "${chalk.bold(entry.name)}", missing *modal.js*`
        )
      );
    }
  }
  for (const entry of unfiltered.selectMenus) {
    if (!entry.data && !entry.execute) {
      console.log(
        msg.warn(
          `Skipping select menu "${chalk.bold(
            entry.name
          )}", missing *data.js* or *menu.js*`
        )
      );
    } else if (!entry.data) {
      console.log(
        msg.warn(
          `Skipping select menu "${chalk.bold(entry.name)}", missing *data.js*`
        )
      );
    } else if (!entry.execute) {
      console.log(
        msg.warn(
          `Skipping select menu "${chalk.bold(entry.name)}", missing *menu.js*`
        )
      );
    }
  }
  for (const entry of unfiltered.contextMenus) {
    if (!entry.data && !entry.execute) {
      console.log(
        msg.warn(
          `Skipping context menu "${chalk.bold(
            entry.name
          )}", missing *data.js* or *menu.js*`
        )
      );
    } else if (!entry.data) {
      console.log(
        msg.warn(
          `Skipping context menu "${chalk.bold(entry.name)}", missing *data.js*`
        )
      );
    } else if (!entry.execute) {
      console.log(
        msg.warn(
          `Skipping context menu "${chalk.bold(entry.name)}", missing *menu.js*`
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

  const filtered_buttons = unfiltered.buttons.filter(
    (b) => b.data && b.execute
  ) as {
    name: string;
    data: string;
    execute: string;
  }[];

  const filtered_modals = unfiltered.modals.filter(
    (b) => b.data && b.execute
  ) as {
    name: string;
    data: string;
    execute: string;
  }[];

  const filtered_contextMenus = unfiltered.contextMenus.filter(
    (b) => b.data && b.execute
  ) as {
    name: string;
    data: string;
    execute: string;
  }[];

  const filtered_selectMenus = unfiltered.selectMenus.filter(
    (b) => b.data && b.execute
  ) as {
    name: string;
    data: string;
    execute: string;
  }[];

  return {
    commands: filtered_commands,
    events: filtered_events,
    buttons: filtered_buttons,
    modals: filtered_modals,
    context_menus: filtered_contextMenus,
    select_menus: filtered_selectMenus,
  };
}
