// eslint-disable-next-line import/no-extraneous-dependencies
import { readFileSync } from 'fs-extra'
import { isAbsolute, join } from 'path'

export default function isFileEmpty(filepath: string, ignoreWhitespace = true) {
  const file = readFileSync(
    isAbsolute(filepath) ? filepath : join(process.cwd(), filepath)
  )

  const data = file.toString('utf8')

  return (
    file.length === 0 ||
    (!ignoreWhitespace && data.length === 0) ||
    (ignoreWhitespace && !!String(data).match(/^\s*$/))
  )
}
