export function printAndExit(message: string, code = 1) {
  if (code === 0) {
    console.log(message)
  } else {
    console.error(message)
  }

  process.exit(code)
}

export function getNodeOptionsWithoutInspect() {
  const NODE_INSPECT_RE = /--inspect(-brk)?(=\S+)?( |$)/
  return (process.env.NODE_OPTIONS || '').replace(NODE_INSPECT_RE, '')
}

export class CommandNotFoundError extends Error {
  code: string

  constructor(page: string) {
    super()
    this.code = 'ENOENT'
    this.message = `Cannot find module for command: ${page}`
  }
}

export class EventNotFoundError extends Error {
  code: string

  constructor(page: string) {
    super()
    this.code = 'ENOENT'
    this.message = `Cannot find module for event: ${page}`
  }
}
