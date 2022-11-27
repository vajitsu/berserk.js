const Utils = require('./dist/discord/lib/utils')

module.exports.Permissions = {
  names: Utils.default.Permissions.names,
  translate: Utils.default.Permissions.translate,
  getIdentifiers: Utils.default.Permissions.getIdentifiers,
}
