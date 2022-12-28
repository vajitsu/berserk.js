import { CommandComplete, EventComplete } from '../../build/types'

export default function assignDefaults(
  type: 'command' | 'event',
  currentInfo: Partial<CommandComplete> | Partial<EventComplete>
): CommandComplete | EventComplete {
  const commandDefaults: CommandComplete = {
    name: '',
    description: '',
    dmPermission: false,
    nsfw: false,
    defaultMemberPermission: null,
    subcommands: [],
    fn() {},
  }
  const eventDefaults: EventComplete = {
    name: '',
    fn() {},
  }

  // eslint-disable-next-line default-case
  switch (type) {
    case 'command':
      return { ...commandDefaults, ...currentInfo } as any
    case 'event':
      return Object.fromEntries(
        Object.entries({
          ...eventDefaults,
          ...currentInfo,
        }).filter((entry) => entry[0] === 'name' || entry[0] === 'fn')
      ) as any
  }
}
