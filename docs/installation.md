# Installation

## System Requirements

First, make sure your development environment meets the following requirements:

- [Node.js 14](https://nodejs.org/) or later.

## Automatic Installation

To automatically create a new Jujutsu.js project using the app directory:

```bash:Terminal
npm install jujutsu@latest discord.js@latest
```

## Manual Installation

To create a new Jujutsu.js app, install the required packages:

```bash:Terminal
npm install jujutsu@latest discord.js@latest
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
>   Create an `commands` folder and add a `hello.js` file. This will be added to your bot's slash commands.

Add the following code to `hello.js`:

```javascript:commands/hello.js
export const descripiton = 'Welcome to Jujutsu.js'
export default function Hello({ interaction }) {
  interaction.reply(`Hello, ${interaction.user?.tag}!`)
}
```

> ESM supported out of the box without having enabling it (dont worry, CommonJS is still supported)
> Running the Development Server

1. Run `npm run dev` to start the development server.
2. Visit a Discord channel that the bot has access to.
3. Run `/hello` and see the message it sends.
4. Edit `commands/hello.js`, save, and run the command again to see the updated result.
