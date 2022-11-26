import { pathExists } from 'path-exists'
import fs from 'recursive-fs'
import path from 'path'

export type Entries = {
  [key: string]: {
    dirs: string[]
    files: string[]
  }
}

function find(cwd: string, ..._path: string[]) {
  const _dir = path.join(cwd, ..._path)
  const out = fs.sync.read(_dir)

  return out
}

async function findCommands(cwd: string) {
  const dir = path.join(cwd, 'commands')

  const exists = await pathExists(dir)

  if (!exists)
    return {
      dirs: [],
      files: [],
    }

  const out = find(cwd, 'commands')

  out.dirs = out.dirs
    .filter((d: string) => d !== dir)
    .map((d: string) => d.replace(dir, '').replace('/', ''))

  out.files = out.files
    .filter((f: string) => f.endsWith('.ts') || f.endsWith('.js'))
    .map((f: string) => f.replace(dir, '').replace('/', ''))

  return out
}

async function findEvents(cwd: string) {
  const dir = path.join(cwd, 'events')

  const exists = await pathExists(dir)

  if (!exists)
    return {
      dirs: [],
      files: [],
    }

  const out = find(cwd, 'events')

  out.dirs = out.dirs
    .filter((d: string) => d !== dir)
    .map((d: string) => d.replace(dir, '').replace('/', ''))

  out.files = out.files
    .filter((f: string) => f.endsWith('.ts') || f.endsWith('.js'))
    .map((f: string) => f.replace(dir, '').replace('/', ''))

  return out
}

async function findButtons(cwd: string) {
  const dir = path.join(cwd, 'interactions', 'buttons')

  const exists = await pathExists(dir)

  if (!exists)
    return {
      dirs: [],
      files: [],
    }

  const out = find(cwd, 'interactions', 'buttons')

  out.dirs = out.dirs
    .filter((d: string) => d !== dir)
    .map((d: string) => d.replace(dir, '').replace('/', ''))

  out.files = out.files
    .filter((f: string) => f.endsWith('.ts') || f.endsWith('.js'))
    .map((f: string) => f.replace(dir, '').replace('/', ''))

  return out
}

async function findModals(cwd: string) {
  const dir = path.join(cwd, 'modals')

  const exists = await pathExists(dir)

  if (!exists)
    return {
      dirs: [],
      files: [],
    }

  const out = find(cwd, 'modals')

  out.dirs = out.dirs
    .filter((d: string) => d !== dir)
    .map((d: string) => d.replace(dir, '').replace('/', ''))

  out.files = out.files
    .filter((f: string) => f.endsWith('.ts') || f.endsWith('.js'))
    .map((f: string) => f.replace(dir, '').replace('/', ''))

  return out
}

async function findContextMenus(cwd: string) {
  const dir = path.join(cwd, 'interactions', 'context-menus')

  const exists = await pathExists(dir)

  if (!exists)
    return {
      dirs: [],
      files: [],
    }

  const out = find(cwd, 'interactions', 'context-menus')

  out.dirs = out.dirs
    .filter((d: string) => d !== dir)
    .map((d: string) => d.replace(dir, '').replace('/', ''))

  out.files = out.files
    .filter((f: string) => f.endsWith('.ts') || f.endsWith('.js'))
    .map((f: string) => f.replace(dir, '').replace('/', ''))

  return out
}

async function findSelectMenus(cwd: string) {
  const dir = path.join(cwd, 'interactions', 'select-menus')

  const exists = await pathExists(dir)

  if (!exists)
    return {
      dirs: [],
      files: [],
    }

  const out = find(cwd, 'interactions', 'select-menus')

  out.dirs = out.dirs
    .filter((d: string) => d !== dir)
    .map((d: string) => d.replace(dir, '').replace('/', ''))

  out.files = out.files
    .filter((f: string) => f.endsWith('.ts') || f.endsWith('.js'))
    .map((f: string) => f.replace(dir, '').replace('/', ''))

  return out
}

export default async function findEntries(cwd: string): Promise<Entries> {
  const entries = {
    commands: await findCommands(cwd),
    events: await findEvents(cwd),
    buttons: await findButtons(cwd),
    modals: await findModals(cwd),
    contextMenus: await findContextMenus(cwd),
    selectMenus: await findSelectMenus(cwd),
  }

  return entries
}
