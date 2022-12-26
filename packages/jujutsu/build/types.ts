export interface CommandComplete {
  name: string
  description: string
  nsfw: boolean
  dmPermission: boolean
  fn: () => Promise<void> | void
}

export interface EventCompelte {
  name: string
  fn: () => Promise<void> | void
}
