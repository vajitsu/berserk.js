export function print_and_exit(message: string, code = 1) {
  if (code === 0) {
    console.log(message)
  } else {
    console.error(message)
  }

  process.exit(code)
}

export function unpack(buffer: Buffer) {
  return (
    buffer.length > 0 &&
    require('@berserk/discord-js/dist/compiled/erlpack').unpack(buffer)
  )
}

export function pack(subject: any) {
  return (
    subject &&
    require('@berserk/discord-js/dist/compiled/erlpack').pack(subject)
  )
}
