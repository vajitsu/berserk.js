---
description: Hello World
---

# Installation

## System Requirements

First, make sure your development environment meets the following requirements:

- [Node.js 14](https://nodejs.org/) or later.
- MacOS, Windows (including WSL), and Linux are supported.

## Automatic Installation

To automatically create a new Beserk.js project using the app directory:

```bash:Terminal
npx create-berserk-app@latest
# or
yarn create berserk-app
# or
pnpm create berserk-app
```

create-berserk-app now ships with TypeScript by default. See TypeScript for more information.

## Manual Installation

To create a new Beserk.js app, install the required packages:

```bash:Terminal
npm install berserk@latest discord.js@latest
# or
yarn add berserk@latest discord.js@latest
# or
pnpm update berserk@latest discord.js@latest
```

Open `package.json` and add the following `scripts`:

```json:package.json
{
  "scripts": {
    "dev": "berserk dev",
    "build": "berserk build",
    "start": "berserk start"
  }
}
```

> These scripts refer to the different stages of developing an application:
>
> - `dev`: runs `berserk dev` to start Beserk.js in development mode.
> - `build`: runs `berserk build` to build the application for production usage.
> - `start`: runs `berserk start` to start a Beserk.js production server.

Create an `command` folder and add a `command.js` file. This will be added to your bot's slash commands.

Add the following code to `command.js`:

```js:commands/command.js
export const descripiton = 'Welcome to Beserk.js'

export default function Command(interaction) {
  interaction.reply("Hello, Beserk.js!")
}
```

> Good to know: If you forget to export `description`, Beserk.js will automatically assign a blank string to the `descriptuon` export for you when running the development server.

Running the Development Server

1. Run `npm run dev` to start the development server.
2. Visit a Discord channel that the bot has access to.
3. Run `/command` and see the message it sends.
4. Edit `commands/command.js`, save, and run the command again to see the updated result.
