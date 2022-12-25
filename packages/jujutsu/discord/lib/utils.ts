/* eslint-disable import/no-extraneous-dependencies */
import Discord from 'jujutsu/dist/compiled/discord.js'
import { words } from 'jujutsu/dist/compiled/lodash'

class Permissions {
  static names = Object.fromEntries(
    Object.keys(Discord.PermissionFlagsBits).map((p) => [p, words(p).join(' ')])
  )

  static translate(permission: keyof Discord.PermissionFlags) {
    return this.names[permission]
  }

  static getIdentifiers(
    permission: Discord.PermissionResolvable
  ): Discord.PermissionsString[] {
    const permissions = new Discord.PermissionsBitField(permission)
    if (permissions.has(Discord.PermissionFlagsBits.Administrator))
      return ['Administrator']
    return permissions.toArray()
  }
}

export default class Utilities {
  static Permissions = Permissions
}
