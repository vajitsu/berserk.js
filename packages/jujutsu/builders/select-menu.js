'use strict';

var Discord = require('discord.js');

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var SelectMenu = class {
  constructor() {
    this.selectMenu = new Discord.SelectMenuBuilder();
  }
  build() {
    this.selectMenu.setCustomId(this.id);
    this.selectMenu.setPlaceholder(this.placeholder);
    this.selectMenu.setDisabled(this.disabled || false);
    this.selectMenu.setOptions(...this.options);
    if (typeof this.maxValues === "number")
      this.selectMenu.setMaxValues(this.maxValues);
    if (typeof this.minValues === "number")
      this.selectMenu.setMinValues(this.minValues);
    return this.selectMenu;
  }
};
__name(SelectMenu, "SelectMenu");

module.exports = SelectMenu;
