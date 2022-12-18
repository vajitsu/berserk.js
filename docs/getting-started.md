---
description: Get started with Beserk.js in the official documentation, and learn more about all our features!
---

# Getting Started

Welcome to the Beserk.js documentation!

If you're new to Beserk.js, we recommend starting with the [learn course](/learn/basics/create-jujutsujs-app). The interactive course with quizzes will guide you through everything you need to know to use Beserk.js.

If you have questions about anything related to Beserk.js, you're always welcome to ask our community on [GitHub Discussions](https://github.com/vajitsu/berserk.js/discussions).

## Creating a Discord Application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click on the `"New Application"` button
3. Fill out the popup, then click `"Create"`

Your Discord application has now been created!

## Creating a Discord bot

Now that a Discord application has been initialized, we need to create a Discord bot.

1. Select the `Bot` tab on the sidebar
2. Click the `Add Bot` and select the confirmation button in the popup

The token should now appear under the username input area.

## Implementing Discord Token

If you have already created a `berserk.config.js`, add the token to the `discord.token` property.

If not, create a `berserk.config.js` and add the following:

```js:berserk.config.js
/** @type {import('berserk').JujutsuConfig} */
const jujutsuConfig = {
  discord: {
    token: 'your-token-goes-here'
  }
}

module.exports = jujutsuConfig
```

> **Never** share the token with anybody. If you accidentally share your bot's token, immediately reset it in the [`Discord Developer Portal`](https://discord.com/developers/applications) . Make sure to update your token in your Beserk.js project.
