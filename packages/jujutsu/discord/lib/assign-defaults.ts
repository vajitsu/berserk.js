import { CommandComplete, EventCompelte } from '../../build/types'

export default function assignDefaults(
  type: 'command' | 'event',
  currentInfo: Partial<CommandComplete> | Partial<EventCompelte>
): CommandComplete | EventCompelte {
  const commandDefaults: CommandComplete = {
    name: '',
    description: '',
    dmPermission: false,
    nsfw: true,
    fn() {},
  }
  const eventDefaults: EventCompelte = {
    name: '',
    fn() {},
  }

  // eslint-disable-next-line default-case
  switch (type) {
    case 'command':
      return Object.fromEntries(
        Object.entries({ ...currentInfo, ...commandDefaults }).filter(
          (entry) =>
            entry[0] === 'name' ||
            entry[0] === 'fn' ||
            entry[0] === 'description' ||
            entry[0] === 'dmPermission' ||
            entry[0] === 'nsfw'
        )
      ) as any
    case 'event':
      return Object.fromEntries(
        Object.entries({
          ...currentInfo,
          ...eventDefaults,
        }).filter((entry) => entry[0] === 'name' || entry[0] === 'fn')
      ) as any
  }
}
