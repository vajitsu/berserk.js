import type { Entries } from "./find-entries";
import fs from "recursive-fs";
import { camelCase } from "lodash";
import path from "path";

type CMD_Data = {
  [key: string]: {
    name: string;
    data?: string;
    execute?: string;
  };
};

type EV_Data = {
  [key: string]: {
    name: string;
    execute?: string;
  };
};

type BTN_Data = {
  [key: string]: {
    name: string;
    data?: string;
    execute?: string;
  };
};

export default function registerEntries(entries: Entries) {
  const entry_commands = entries["commands"];
  const entry_events = entries["events"];
  const entry_buttons = entries["buttons"];

  var commands: CMD_Data = {};
  var events: EV_Data = {};
  var buttons: BTN_Data = {};

  if (!!entry_commands) {
    for (let dir of entry_commands.dirs) {
      commands[dir] = {
        name: dir,
      };
    }

    for (let file of entry_commands.files) {
      const fileName = file.split("/").at(1);

      const removedEnding = fileName?.substring(0, fileName.length - 3);

      if (removedEnding) {
        const parentDir = file.split("/").at(0);

        if (parentDir) {
          if (removedEnding === "data") commands[parentDir].data = fileName;
          else if (removedEnding === "command")
            commands[parentDir].execute = fileName;
        }
      }
    }
  }

  if (!!entry_events) {
    for (let dir of entry_events.dirs) {
      events[dir] = {
        name: dir,
      };
    }

    for (let file of entry_events.files) {
      const _eventName = file;
      const eventName = camelCase(
        _eventName.substring(0, _eventName.length - 3)
      );

      events[eventName] = {
        name: eventName,
        execute: file,
      };
    }
  }

  if (!!entry_buttons) {
    for (let dir of entry_buttons.dirs) {
      buttons[dir] = {
        name: dir,
      };
    }

    for (let file of entry_buttons.files) {
      const fileName = file.split("/").at(1);

      const removedEnding = fileName?.substring(0, fileName.length - 3);

      if (removedEnding) {
        const parentDir = file.split("/").at(0);

        if (parentDir) {
          if (removedEnding === "data") buttons[parentDir].data = fileName;
          else if (removedEnding === "button")
            buttons[parentDir].execute = fileName;
        }
      }
    }
  }

  const json = {
    commands: Object.values(commands),
    events: Object.values(events),
    buttons: Object.values(buttons),
  };

  return json;
}
