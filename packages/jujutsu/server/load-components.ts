import { join as pathJoin } from 'path'
import Bot from '../discord/bot'
import { SERVER_DIRECTORY } from '../lib/constants'
import { traceGlobals } from '../trace/shared'
import { recursiveReadDirSync } from './lib/recursive-readdir-sync'
import { identifyBundle } from './lib/start-server'

export default function loadComponents({ distDir }: { distDir: string }) {
  const bot = traceGlobals.get('bot') as Bot

  if (!bot) return

  const files = recursiveReadDirSync(pathJoin(distDir, SERVER_DIRECTORY)).map(
    (file) => pathJoin(distDir, SERVER_DIRECTORY, file)
  )

  for (let pathname of files) {
    const filename = `bundle.${Buffer.from(pathname).toString('base64url')}.js`
    const filepath = pathJoin(distDir, SERVER_DIRECTORY, filename)

    const filetype = identifyBundle(
      filepath,
      pathJoin(distDir, SERVER_DIRECTORY)
    )

    if (filetype === 'command')
      bot.slashCommandManager.addCommand(require(filepath))
    else if (filetype === 'event')
      bot.eventManager.registerEvent(require(filepath))
  }
}
