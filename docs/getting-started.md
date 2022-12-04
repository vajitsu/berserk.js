---
description: Hello World
---

# Getting Started

> 🏗️ The `app` directory is currently in beta and is subject to change at any given time

## Creating a Discord Application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) 
2. Click on the `New Application` button
3. Fill out the popup, then click "Create"

Your Discord application has now been created!

## Creating a Discord bot

Now that a Discord application has been initialized, we need to create a Discord bot.

1. Select the `Bot` tab on the sidebar
2. Click the `Add Bot` and select the confirmation button in the popup

The token should now appear under the username input area

## Implementing Discord Token

If you have already created a `jujutsu.config.js`, add the token to the `discord.token` property

If not, create a `jujutsu.config.js` and add the following:

```js:jujutsu.config.js
/** @type {import('jujutsu').JujutsuConfig} */
const jujutsuConfig = {
  discord: {
    token: 'your-token-goes-here'
  }
}

module.exports = jujutsuConfig
```

> **Never** share the token with anybody. If you accidentally share your bot's token, immediately reset it in the Developer Portal. Make sure to update your token in your Jujutsu.js project.

_This page is still being written_ - [Contribute to this page](https://github.com/vajitsu/jujutsu.js/blob/canary/docs/getting-started.md)
