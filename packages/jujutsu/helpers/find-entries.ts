import { pathExists } from "path-exists";
import fs from "recursive-fs";
import path from "path";

export type Entries = {
  [key: string]: {
    dirs: string[];
    files: string[];
  };
};

function find(cwd: string, ..._path: string[]) {
  const _dir = path.join(cwd, ..._path);
  const out = fs.sync.read(_dir);

  return out;
}

function findCommands(cwd: string) {
  const dir = path.join(cwd, "commands");

  if (!pathExists(dir))
    return {
      dirs: [],
      files: [],
    };

  const out = find(cwd, "commands");

  out.dirs = out.dirs
    .filter((d: string) => d !== dir)
    .map((d: string) => d.replace(dir, "").replace("/", ""));

  out.files = out.files
    .filter((f: string) => f.endsWith(".ts") || f.endsWith(".js"))
    .map((f: string) => f.replace(dir, "").replace("/", ""));

  return out;
}

function findEvents(cwd: string) {
  const dir = path.join(cwd, "events");

  if (!pathExists(dir))
    return {
      dirs: [],
      files: [],
    };

  const out = find(cwd, "events");

  out.dirs = out.dirs
    .filter((d: string) => d !== dir)
    .map((d: string) => d.replace(dir, "").replace("/", ""));

  out.files = out.files
    .filter((f: string) => f.endsWith(".ts") || f.endsWith(".js"))
    .map((f: string) => f.replace(dir, "").replace("/", ""));

  return out;
}

function findButtons(cwd: string) {
  const dir = path.join(cwd, "interactions", "buttons");

  if (!pathExists(dir))
    return {
      dirs: [],
      files: [],
    };

  const out = find(cwd, "interactions", "buttons");

  out.dirs = out.dirs
    .filter((d: string) => d !== dir)
    .map((d: string) => d.replace(dir, "").replace("/", ""));

  out.files = out.files
    .filter((f: string) => f.endsWith(".ts") || f.endsWith(".js"))
    .map((f: string) => f.replace(dir, "").replace("/", ""));

  return out;
}

function findModals(cwd: string) {
  const dir = path.join(cwd, "modals");

  if (!pathExists(dir))
    return {
      dirs: [],
      files: [],
    };

  const out = find(cwd, "modals");

  out.dirs = out.dirs
    .filter((d: string) => d !== dir)
    .map((d: string) => d.replace(dir, "").replace("/", ""));

  out.files = out.files
    .filter((f: string) => f.endsWith(".ts") || f.endsWith(".js"))
    .map((f: string) => f.replace(dir, "").replace("/", ""));

  return out;
}

function findContextMenus(cwd: string) {
  const dir = path.join(cwd, "interactions", "context-menus");

  if (!pathExists(dir))
    return {
      dirs: [],
      files: [],
    };

  const out = find(cwd, "interactions", "context-menus");

  out.dirs = out.dirs
    .filter((d: string) => d !== dir)
    .map((d: string) => d.replace(dir, "").replace("/", ""));

  out.files = out.files
    .filter((f: string) => f.endsWith(".ts") || f.endsWith(".js"))
    .map((f: string) => f.replace(dir, "").replace("/", ""));

  return out;
}

function findSelectMenus(cwd: string) {
  const dir = path.join(cwd, "interactions", "select-menus");

  if (!pathExists(dir))
    return {
      dirs: [],
      files: [],
    };

  const out = find(cwd, "interactions", "select-menus");

  out.dirs = out.dirs
    .filter((d: string) => d !== dir)
    .map((d: string) => d.replace(dir, "").replace("/", ""));

  out.files = out.files
    .filter((f: string) => f.endsWith(".ts") || f.endsWith(".js"))
    .map((f: string) => f.replace(dir, "").replace("/", ""));

  return out;
}

export default function findEntries(cwd: string): Entries {
  const entries = {
    commands: findCommands(cwd),
    events: findEvents(cwd),
    buttons: findButtons(cwd),
    modals: findModals(cwd),
    contextMenus: findContextMenus(cwd),
    selectMenus: findSelectMenus(cwd),
  };

  return entries;
}
