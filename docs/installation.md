---
description: Hello World
---

# Installation

## System Requirements

First, make sure your development environment meets the following requirements:

- [Node.js 14](https://nodejs.org/) or later.
- MacOS, Windows (including WSL), and Linux are supported.

## Automatic Installation

To automatically create a new Jujutsu.js project using the app directory:

```bash:Terminal
npx create-jujutsu-app@latest
# or
yarn create jujutsu-app
# or
pnpm create jujutsu-app
```

create-jujutsu-app now ships with TypeScript by default. See TypeScript for more information.

## Manual Installation

To create a new Jujutsu.js app, install the required packages:

```bash:Terminal
npm install jujutsu@latest discord.js@latest
# or
yarn add jujutsu@latest discord.js@latest
# or
pnpm update jujutsu@latest discord.js@latest
```

Open `package.json` and add the following `scripts`:

```json:package.json
{
  "scripts": {
    "dev": "jujutsu dev",
    "build": "jujutsu build",
    "start": "jujutsu start"
  }
}
```

> These scripts refer to the different stages of developing an application:
>
> - `dev`: runs `jujutsu dev` to start Jujutsu.js in development mode.
> - `build`: runs `jujutsu build` to build the application for production usage.
> - `start`: runs `jujutsu start` to start a Jujutsu.js production server.

Create an `command` folder and add a `command.js` file. This will be added to your bot's slash commands.

Add the following code to `command.js`:

```js:commands/command.js
export const descripiton = 'Welcome to Jujutsu.js'

export default function Command(interaction) {
  interaction.reply("Hello, Jujutsu.js!")
}
```

> Good to know: If you forget to export `description`, Jujutsu.js will automatically assign a blank string to the `descriptuon` export for you when running the development server.

Running the Development Server

1. Run `npm run dev` to start the development server.
2. Visit a Discord channel that the bot has access to.
3. Run `/command` and see the message it sends.
4. Edit `commands/command.js`, save, and run the command again to see the updated result.
