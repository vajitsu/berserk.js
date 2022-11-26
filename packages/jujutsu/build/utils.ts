import { LocalizationMap as localizationMap } from 'jujutsu/dist/compiled/discord.js'
import getGzipSize from 'jujutsu/dist/compiled/gzip-size'
import textTable from 'jujutsu/dist/compiled/text-table'
import chalk from 'jujutsu/dist/compiled/chalk'
import { promises as fs } from 'fs'
import path from 'path'
import { SLASH_COMMAND_REGEX } from '../lib/constants'

const fileGzipStats: { [k: string]: Promise<number> | undefined } = {}
const fsStatGzip = (file: string) => {
  const cached = fileGzipStats[file]
  if (cached) return cached
  return (fileGzipStats[file] = getGzipSize.file(file))
}

const fileSize = async (file: string) => (await fs.stat(file)).size

const fileStats: { [k: string]: Promise<number> | undefined } = {}
const fsStat = (file: string) => {
  const cached = fileStats[file]
  if (cached) return cached
  return (fileStats[file] = fileSize(file))
}

export function unique<T>(main: ReadonlyArray<T>, sub: ReadonlyArray<T>): T[] {
  return [...new Set([...main, ...sub])]
}

export function difference<T>(
  main: ReadonlyArray<T> | ReadonlySet<T>,
  sub: ReadonlyArray<T> | ReadonlySet<T>
): T[] {
  const a = new Set(main)
  const b = new Set(sub)
  return [...a].filter((x) => !b.has(x))
}

/**
 * Return an array of the items shared by both arrays.
 */
function intersect<T>(main: ReadonlyArray<T>, sub: ReadonlyArray<T>): T[] {
  const a = new Set(main)
  const b = new Set(sub)
  return [...new Set([...a].filter((x) => b.has(x)))]
}

function sum(a: ReadonlyArray<number>): number {
  return a.reduce((size, stat) => size + stat, 0)
}

export interface CommandInfo {
  name: string
  description?: string
  localizations?: {
    name: Array<localizationMap>
    descripton: Array<localizationMap>
  }
}

export function isInvalidCommandName(command: string) {
  return !SLASH_COMMAND_REGEX.test(command)
}

export function isInvalidEventName(eventname: string) {
  //return !isCamel
}