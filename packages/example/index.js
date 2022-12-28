const { loadNative } = require("./bindings")
const nativeBindings = loadNative()

console.log(nativeBindings)

const JujutsuClient = nativeBindings.JujutsuClient
const client = new JujutsuClient()

client.login('abc')

console.log(client.token.length)