'use strict';

var Discord = require('discord.js');

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var Button = class {
  constructor() {
    this.disabled = false;
    this.emoji = void 0;
    this.url = void 0;
    this.button = new Discord.ButtonBuilder();
  }
  build() {
    this.button.setLabel(this.label);
    if (this.disabled)
      this.button.setDisabled(this.disabled);
    if (this.emoji)
      this.button.setEmoji(this.emoji);
    if (this.url)
      this.button.setURL(this.url);
    else
      this.button.setCustomId(this.id);
    switch (this.style) {
      case "primary":
        this.button.setStyle(1);
        break;
      case "secondary":
        this.button.setStyle(2);
        break;
      case "success":
        this.button.setStyle(3);
        break;
      case "danger":
        this.button.setStyle(4);
        break;
      case "link":
        this.button.setStyle(5);
        break;
    }
    return this.button;
  }
};
__name(Button, "Button");

module.exports = Button;
