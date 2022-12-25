// ESM supported out of the box without having enabling it (dont worry, CommonJS is still supported)

export const description = 'Say hello!'

export default function Hello(interaction) {
  interaction.reply(`Hello, ${interaction.user?.tag}`)
}
